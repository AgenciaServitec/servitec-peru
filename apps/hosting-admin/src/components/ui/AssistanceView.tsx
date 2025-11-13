import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMapMarkerAlt,
  faSignInAlt,
  faSignOutAlt,
} from "@fortawesome/free-solid-svg-icons";
import {
  Button,
  Col,
  Form,
  Input,
  Row,
  Space,
  Spinner,
  Title,
  UserLocationMap,
} from "../ui";
import { useFaceApiModels, useVideoStream } from "../../hooks";
import * as faceapi from "face-api.js";

interface AssistanceViewProps {
  dni: string;
  setDni: (dni: string) => void;
  user: { id: string; firstName: string; faceDescriptor: Float32Array } | null;
  buttons: { entry: boolean; outlet: boolean };
  feedback: { show: boolean; type: "entry" | "outlet" | "" };
  location: { lat: number; lng: number } | null;
  loadingLocation: boolean;
  locationError: string | null;
  refreshLocation: () => void;
  searchUser: () => void;
  resetUser: () => void;
  saveAssistance: (type: "entry" | "outlet") => void;
  goTo: (path: string) => void;
  setIsGeofenceValid: (valid: boolean) => void;
}

export const AssistanceView: React.FC<AssistanceViewProps> = ({
  dni,
  setDni,
  user,
  buttons,
  feedback,
  location,
  loadingLocation,
  locationError,
  refreshLocation,
  searchUser,
  resetUser,
  saveAssistance,
  goTo,
  setIsGeofenceValid,
}) => {
  const exists = !!user;
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [status, setStatus] = useState({
    message: "Esperando acción...",
    type: "info",
  });
  const [videoLoading, setVideoLoading] = useState(false);
  const [successAnimation, setSuccessAnimation] = useState(false);

  const [toast, setToast] = useState<{
    show: boolean;
    message: string;
    type: string;
  }>({
    show: false,
    message: "",
    type: "info",
  });

  const { loading } = useFaceApiModels();
  const { stream, startVideo, stopVideo } = useVideoStream(
    videoRef,
    (msg, type) => setStatus({ message: msg, type })
  );

  useEffect(() => {
    if (exists) startCamera();
    else stopVideo();
  }, [exists]);

  const startCamera = async () => {
    setVideoLoading(true);
    await startVideo();
    setVideoLoading(false);
  };

  const showToast = (
    message: string,
    type: string = "info",
    duration = 1500
  ) => {
    setToast({ show: true, message, type });
    setTimeout(
      () => setToast({ show: false, message: "", type: "info" }),
      duration
    );
  };

  const captureFace = async (): Promise<Float32Array | null> => {
    setStatus({ message: "Capturando rostro...", type: "info" });
    try {
      const detection = await faceapi
        .detectSingleFace(
          videoRef.current!,
          new faceapi.TinyFaceDetectorOptions()
        )
        .withFaceLandmarks()
        .withFaceDescriptor();

      if (!detection) {
        setStatus({
          message: "No se detectó rostro, intenta de nuevo.",
          type: "error",
        });
        return null;
      }

      return detection.descriptor;
    } catch (err) {
      console.error(err);
      setStatus({ message: "Error durante la captura facial", type: "error" });
      return null;
    }
  };

  const calculateEuclideanDistance = (
    desc1: Float32Array,
    desc2: Float32Array
  ): number => {
    return Math.sqrt(
      desc1.reduce((sum, val, i) => sum + (val - desc2[i]) ** 2, 0)
    );
  };

  const handleSaveAssistance = async (type: "entry" | "outlet") => {
    showToast("Capturando rostro...");
    const currentDescriptor = await captureFace();
    if (!currentDescriptor)
      return showToast("No se detectó rostro, intenta de nuevo.", "error");

    if (!user) return showToast("No hay usuario cargado.", "error");

    const distance = calculateEuclideanDistance(
      currentDescriptor,
      new Float32Array(user.faceDescriptor)
    );

    if (distance < 0.6) {
      showToast("Rostro verificado correctamente.", "success");
      saveAssistance(type);

      setSuccessAnimation(true);

      setTimeout(() => setSuccessAnimation(false), 1500);
    } else {
      showToast("Rostro no coincide. Intenta nuevamente.", "error");
    }
  };

  return (
    <Container>
      <Row gutter={[16, 16]}>
        <Col span={24}>
          <Button
            type="primary"
            size="large"
            onClick={() => goTo("/assistances")}
          >
            <FontAwesomeIcon icon={faSignInAlt} /> Ver mis Asistencias
          </Button>
        </Col>
        <Col span={24}>
          <Title level={2} align="center">
            <FontAwesomeIcon icon={faMapMarkerAlt} /> Registro de Asistencia
          </Title>

          {!exists ? (
            <div className="form-wrapper">
              <Form
                onSubmit={(e) => {
                  e.preventDefault();
                  searchUser();
                }}
              >
                <Row gutter={[16, 16]}>
                  <Col span={24}>
                    <Input
                      label="Ingrese DNI"
                      value={dni}
                      onChange={(e) => setDni(e.target.value)}
                      maxLength={8}
                      size="large"
                    />
                  </Col>
                  <Col span={12}>
                    <Button
                      type="primary"
                      onClick={searchUser}
                      block
                      size="large"
                    >
                      Buscar
                    </Button>
                  </Col>
                  <Col span={12}>
                    <Button onClick={resetUser} block size="large">
                      Limpiar
                    </Button>
                  </Col>
                </Row>
              </Form>
            </div>
          ) : (
            <Row gutter={[16, 16]}>
              <Col span={24}>
                <div className="user-name">
                  <h2 className="form-text">
                    👋 Bienvenido/a, <span>{user.firstName}</span>!
                  </h2>
                  <p>¡Esperamos que tengas un buen día! 😊</p>
                </div>
                <Button onClick={resetUser} size="large" block>
                  Cancelar
                </Button>
              </Col>
              <Col span={24}>
                <div className="video-controls">
                  <video
                    ref={videoRef}
                    autoPlay
                    muted
                    width="480"
                    height="360"
                    className="video"
                  />
                  {feedback.show && (
                    <FeedbackOverlay type={feedback.type}>
                      <div className="feedback-content">
                        <FontAwesomeIcon
                          icon={
                            feedback.type === "entry"
                              ? faSignInAlt
                              : faSignOutAlt
                          }
                        />
                        <p>
                          {feedback.type === "entry"
                            ? "Entrada registrada correctamente"
                            : "Salida registrada correctamente"}
                        </p>
                      </div>
                    </FeedbackOverlay>
                  )}
                  <Space>
                    <Button
                      size="large"
                      onClick={startVideo}
                      disabled={!!stream}
                    >
                      Encender cámara
                    </Button>
                    <Button
                      type="primary"
                      size="large"
                      onClick={stopVideo}
                      disabled={!stream}
                    >
                      Apagar cámara
                    </Button>
                  </Space>
                </div>
              </Col>
              <Col span={24}>
                <div className="content">
                  <div className="left-panel">
                    <div className="btn-group">
                      <button
                        className="entry-btn"
                        onClick={() => handleSaveAssistance("entry")}
                        // disabled={!buttons.entry}
                      >
                        <FontAwesomeIcon icon={faSignInAlt} /> Marcar Entrada
                      </button>
                      <button
                        className="outlet-btn"
                        onClick={() => handleSaveAssistance("outlet")}
                        // disabled={!buttons.outlet}
                      >
                        <FontAwesomeIcon icon={faSignOutAlt} /> Marcar Salida
                      </button>
                    </div>
                  </div>

                  <div className="right-panel">
                    <UserLocationMap
                      location={location}
                      //onValidateGeofence={setIsGeofenceValid}
                    />
                  </div>
                </div>
              </Col>
            </Row>
          )}

          {loadingLocation && <Spinner height="40svh" size="4x" />}
          {locationError && (
            <div style={{ textAlign: "center", padding: 20, color: "red" }}>
              <p>{locationError}</p>
              <button onClick={refreshLocation}>🔄 Reintentar ubicación</button>
            </div>
          )}

          {toast.show && <Toast type={toast.type}>{toast.message}</Toast>}
          {videoLoading && (
            <LoadingOverlay>
              <Spinner size="3x" />
              <p>Encendiendo cámara...</p>
            </LoadingOverlay>
          )}
        </Col>
      </Row>
    </Container>
  );
};

const Container = styled.div`
  --color-primary: #facc15;
  --color-primary-dark: #ca8a04;
  --color-muted: #9ca3af;
  --color-bg-dark: #0f172a;

  display: flex;
  flex-direction: column;
  gap: 32px;
  padding: 32px 24px;
  min-height: 100vh;
  color: #f9fafb;
  font-family: "Segoe UI", Roboto, sans-serif;

  .form-wrapper {
    max-width: 30em;
    margin: 2em auto auto auto;
    background: rgba(255, 255, 255, 0.05);
    padding: 2rem 1rem;
    border-radius: 12px;
  }

  .form-text {
    color: var(--color-primary);
  }

  .content {
    display: flex;
    gap: 32px;
    flex-wrap: wrap;
    justify-content: center;
  }

  .video-controls {
    position: relative;
    .video {
      border-radius: 0.75rem;
      border: 2px solid var(--color-primary);
      box-shadow: 0 0 18px rgba(250, 204, 21, 0.15);
      max-width: 100%;
      margin: auto;
      transform: scaleX(-1);
    }
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 2rem;
    flex-wrap: wrap;
  }

  .user-name {
    text-align: center;
    h2 {
      font-size: 1.5rem;
      margin: 0;
      span {
        color: var(--color-primary);
      }
    }
    p {
      font-size: 1rem;
      margin: 0.25rem 0 0.75rem;
      color: var(--color-muted);
    }
  }

  .left-panel {
    flex: 1;
    min-width: 280px;
    max-width: 400px;
    background: rgba(255, 255, 255, 0.05);
    border: 1px solid rgba(250, 204, 21, 0.3);
    border-radius: 16px;
    padding: 24px;
    backdrop-filter: blur(10px);
    transition: all 0.3s ease;

    &:hover {
      transform: translateY(-4px);
      box-shadow: 0 0 20px rgba(250, 204, 21, 0.15);
    }
  }

  .btn-group {
    display: flex;
    flex-direction: column;
    gap: 16px;
    width: 100%;
    height: 100%;
  }

  .btn-group button {
    padding: 18px 20px;
    font-size: 18px;
    font-weight: 700;
    letter-spacing: 0.5px;
    border: none;
    border-radius: 10px;
    cursor: pointer;
    color: #111827;
    background: linear-gradient(135deg, #fde047, #facc15);
    transition: all 0.3s ease;
    box-shadow: 0 4px 10px rgba(250, 204, 21, 0.15);

    &:hover {
      transform: scale(1.03);
      filter: brightness(1.05);
    }
    &:first-child {
      flex: 1;
    }
    &:last-child {
      flex: 1;
    }
  }

  .entry-btn {
    background: linear-gradient(135deg, #facc15, #eab308);
  }

  .outlet-btn {
    background: linear-gradient(135deg, #fde047, #facc15);
  }

  .right-panel {
    flex: 2;
    min-width: 400px;
    border-radius: 20px;
    overflow: hidden;
    background: rgba(17, 24, 39, 0.6);
    border: 1px solid rgba(250, 204, 21, 0.25);
  }

  @media (max-width: 768px) {
    .content {
      flex-direction: column;
      align-items: center;
    }

    .right-panel {
      width: 100%;
      min-width: 0;
    }

    .left-panel {
      max-width: 100%;
    }
  }
`;

const Toast = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: ${({ type }) =>
    type === "success" ? "#16a34a" : type === "error" ? "#dc2626" : "#334155"};
  color: white;
  padding: 14px 28px;
  border-radius: 12px;
  font-size: 17px;
  font-weight: bold;
  text-align: center;
  z-index: 1200;
  opacity: 0.95;
  box-shadow: 0 6px 18px rgba(0, 0, 0, 0.3);
  animation:
    fadeIn 0.3s ease-in-out,
    fadeOut 0.3s ease-in-out 2.7s;

  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: translate(-50%, -60%);
    }
    to {
      opacity: 0.95;
      transform: translate(-50%, -50%);
    }
  }

  @keyframes fadeOut {
    from {
      opacity: 0.95;
      transform: translate(-50%, -50%);
    }
    to {
      opacity: 0;
      transform: translate(-50%, -40%);
    }
  }
`;

const LoadingOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.4);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-size: 1.2rem;
  color: #ffffff;
  z-index: 999;
`;

const FeedbackOverlay = styled.div<{ type: "entry" | "outlet" }>`
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.45);
  display: flex;
  align-items: center;
  justify-content: center;
  animation: fadeIn 0.3s ease-in-out;
  z-index: 1200;

  .feedback-content {
    background: ${({ type }) =>
      type === "entry"
        ? "linear-gradient(135deg, #22c55e, #15803d)"
        : "linear-gradient(135deg, #3b82f6, #1d4ed8)"};
    color: white;
    padding: 40px 60px;
    border-radius: 20px;
    text-align: center;
    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.3);
    animation: popIn 0.4s ease-out;
    font-size: 1.25rem;
    font-weight: 600;
  }

  @keyframes popIn {
    0% {
      transform: scale(0.8);
      opacity: 0;
    }
    100% {
      transform: scale(1);
      opacity: 1;
    }
  }

  @keyframes fadeIn {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }

  @keyframes pulse {
    0% {
      transform: scale(1);
      opacity: 0.8;
    }
    50% {
      transform: scale(1.1);
      opacity: 1;
    }
    100% {
      transform: scale(1);
      opacity: 0.8;
    }
  }
`;
