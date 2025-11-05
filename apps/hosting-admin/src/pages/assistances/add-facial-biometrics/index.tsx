import React, { useRef, useState } from "react";
import styled from "styled-components";
import * as faceapi from "face-api.js";
import {
  useAssistance,
  useDefaultFirestoreProps,
  useFaceApiModels,
  useVideoStream,
} from "../../../hooks";
import { Button, Col, Form, Row, InputNumber } from "../../../components/ui";
import { useNavigate } from "react-router-dom";
import { fetchUser, updateUser } from "../../../firebase/collections";

export const FaceRegistration: React.FC = () => {
  const { assignCreateProps } = useDefaultFirestoreProps();
  const assistance = useAssistance(assignCreateProps);

  return <View {...assistance} />;
};

interface Status {
  message: string;
  type: "info" | "success" | "error" | "warning";
}

const View: React.FC = ({ user, searchUser, dni, setDni, resetUser }) => {
  const navigate = useNavigate();

  const onNavigateGoTo = (pathname = "/") => navigate(pathname);

  const exists = !!user;

  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [status, setStatus] = useState<Status>({
    message: "Esperando acción...",
    type: "info",
  });

  const updateStatus = (message: string, type: Status["type"] = "info") =>
    setStatus({ message, type });

  const { loading } = useFaceApiModels();
  const { stream, startVideo, stopVideo } = useVideoStream(
    videoRef,
    updateStatus
  );

  const captureFace = async () => {
    if (!user) {
      updateStatus("Por favor, busca primero un usuario por DNI.", "warning");
      return;
    }

    updateStatus("Capturando rostro...", "info");
    try {
      const detection = await faceapi
        .detectSingleFace(
          videoRef.current as HTMLVideoElement,
          new faceapi.TinyFaceDetectorOptions()
        )
        .withFaceLandmarks()
        .withFaceDescriptor();

      if (!detection) {
        updateStatus("No se detectó rostro. Intenta nuevamente.", "error");
        return;
      }

      const descriptorArray = Array.from(detection.descriptor);
      await saveDescriptorToFirestore(descriptorArray);
    } catch (err) {
      updateStatus("Error durante la captura facial.", "error");
      console.error(err);
    }
  };

  const saveDescriptorToFirestore = async (descriptorArray) => {
    try {
      const userId = user.id;
      if (!userId) throw new Error("Usuario no autenticado");

      const userData = await fetchUser(userId);
      if (!userData) {
        updateStatus("Usuario no encontrado.", "error");
        return;
      }

      await updateUser(userId, { faceDescriptor: descriptorArray });
      updateStatus("✅ Registro facial guardado con éxito.", "success");
    } catch (err) {
      updateStatus("❌ Error al guardar el descriptor facial.", "error");
      console.error(err);
    }
  };

  return (
    <Container>
      {!exists ? (
        <div className="form-wrapper">
          <Form
            onSubmit={(e) => {
              e.preventDefault();
              searchUser();
            }}
            style={{ width: "100%" }}
          >
            <Row gutter={[16, 16]}>
              <Col span={24}>
                <h3 className="label">Documento de Identidad</h3>
                <InputNumber
                  placeholder="Ingrese número de DNI"
                  value={dni}
                  onChange={(value) => setDni(value)}
                  style={{ width: "100%" }}
                />
              </Col>
              <Col span={12}>
                <Button type="primary" onClick={searchUser} block size="large">
                  Buscar
                </Button>
              </Col>
              <Col span={12}>
                <Button type="default" onClick={resetUser} block size="large">
                  Limpiar
                </Button>
              </Col>
            </Row>
          </Form>
        </div>
      ) : (
        <>
          <div className="user-header">
            <h2>
              Registro Facial de <span>{user.firstName}</span>
            </h2>
            <Button danger onClick={resetUser}>
              Cancelar
            </Button>
          </div>

          <div className="status-box">
            <p className={`status ${status.type}`}>{status.message}</p>
          </div>

          <video
            ref={videoRef}
            autoPlay
            muted
            width="480"
            height="360"
            className="video"
          />

          <div className="controls">
            <button onClick={startVideo} disabled={!!stream}>
              Iniciar Cámara
            </button>
            <button onClick={stopVideo} disabled={!stream}>
              Detener Cámara
            </button>
            <button onClick={captureFace} disabled={loading || !stream}>
              Registrar Rostro
            </button>
          </div>
        </>
      )}
    </Container>
  );
};

const Container = styled.div`
  color: #f5f5f5;
  border-radius: 1rem;
  max-width: 720px;
  margin: 2rem auto;
  font-family: "Segoe UI", sans-serif;
  justify-items: center;

  .label {
    font-size: 1rem;
    color: #ffcc00;
    margin-bottom: 0.5rem;
  }

  h2 {
    color: #fff;
    text-align: center;
    margin-bottom: 1rem;

    span {
      color: #ffcc00;
    }
  }

  .status-box {
    margin-top: 1rem;
    text-align: center;

    .status {
      padding: 0.6rem 1rem;
      border-radius: 0.5rem;
      font-weight: 500;

      &.info {
        background: rgba(255, 255, 0, 0.1);
        color: #ffcc00;
      }
      &.success {
        background: rgba(0, 255, 0, 0.1);
        color: #00cc44;
      }
      &.error {
        background: rgba(255, 0, 0, 0.1);
        color: #ff5555;
      }
      &.warning {
        background: rgba(255, 165, 0, 0.1);
        color: #ffb400;
      }
    }
  }

  .video {
    margin-top: 1rem;
    border: 2px solid #ffcc00;
    border-radius: 0.75rem;
    box-shadow: 0 0 15px rgba(255, 204, 0, 0.2);
    width: 100%;
    max-width: 480px;
    display: block;
    margin-left: auto;
    margin-right: auto;
    transform: scaleX(-1);
  }

  .controls {
    display: flex;
    gap: 1rem;
    justify-content: center;
    flex-wrap: wrap;
    margin-top: 1.5rem;

    button {
      background-color: #ffcc00;
      color: #000;
      border: none;
      padding: 0.6rem 1.4rem;
      font-weight: 600;
      border-radius: 0.4rem;
      cursor: pointer;
      transition: all 0.25s ease-in-out;

      &:hover {
        background-color: #e6b800;
      }

      &:disabled {
        background-color: #555;
        color: #ccc;
        cursor: not-allowed;
      }
    }
  }

  .form-wrapper {
    background: rgba(255, 255, 255, 0.04);
    padding: 1.5rem;
    border-radius: 0.8rem;
    border: 1px solid rgba(255, 204, 0, 0.3);
  }

  .user-header {
    text-align: center;
    margin-bottom: 1.5rem;
  }
`;
