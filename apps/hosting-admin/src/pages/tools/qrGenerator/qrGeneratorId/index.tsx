import { useEffect, useRef, useState } from "react";
import styled, { css } from "styled-components";
import {
  Button,
  Col,
  Input,
  Radio,
  Row,
  Select,
  TextArea,
  Title,
} from "../../../../components";
import { message } from "antd";
import { QRCodeCanvas } from "qrcode.react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDownload, faLink } from "@fortawesome/free-solid-svg-icons";
import { useCollectionData } from "react-firebase-hooks/firestore";
import {
  addQrCode,
  getQrCodeId,
  sitesRef,
} from "../../../../firebase/collections";
import { useDefaultFirestoreProps } from "../../../../hooks";
import { useAuthentication } from "../../../../providers";

export const QrGeneratorIntegration = () => {
  const [qrMode, setQrMode] = useState<"static" | "dynamic">("static");
  const [destinationUrl, setDestinationUrl] = useState(
    "https://servitecperu.com"
  );
  const [selectedDomain, setSelectedDomain] = useState("servitecperu.com");
  const [dynamicId, setDynamicId] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [isSaving, setIsSaving] = useState(false);

  const qrRef = useRef<HTMLDivElement>(null);

  const { assignCreateProps } = useDefaultFirestoreProps();
  const { authUser } = useAuthentication();

  const [sites, sitesLoading] = useCollectionData(
    sitesRef.where("isDeleted", "==", false)
  );

  const DOMAINS_LIST =
    sites?.map((site) => ({
      value: site.hostname,
      label: site.hostname,
    })) || [];

  useEffect(() => {
    if (qrMode === "dynamic" && !dynamicId) {
      const shortId = getQrCodeId().substring(0, 6).toUpperCase();
      setDynamicId(shortId);
    }
  }, [qrMode, dynamicId]);

  const qrValue =
    qrMode === "static"
      ? destinationUrl
      : `https://${selectedDomain}/q/${dynamicId}`;

  const handleDomainChange = (value: string) => {
    setSelectedDomain(value);
    setDestinationUrl(`https://${value}`);
  };

  const handleSaveAndDownload = async () => {
    try {
      setIsSaving(true);

      const mapQrCode = {
        id: getQrCodeId(),
        type: qrMode,
        domain: qrMode === "dynamic" ? selectedDomain : null,
        destinationUrl: destinationUrl,
        shortUrl:
          qrMode === "dynamic"
            ? `https://${selectedDomain}/q/${dynamicId}`
            : null,
        title:
          title.trim() || `QR para ${destinationUrl.replace("https://", "")}`,
        description: description.trim() || null,
        status: "active" as const,
        analytics: {
          clicks: 0,
        },
        userId: authUser?.id || "",
      };

      await addQrCode(assignCreateProps(mapQrCode));

      const originalCanvas = qrRef.current?.querySelector("canvas");
      if (!originalCanvas) throw new Error("No se pudo generar el canvas");

      const padding = 24;
      const finalSize = originalCanvas.width + padding * 2;

      const exportCanvas = document.createElement("canvas");
      exportCanvas.width = finalSize;
      exportCanvas.height = finalSize;

      const ctx = exportCanvas.getContext("2d");
      if (!ctx) throw new Error("Contexto 2D no soportado");

      ctx.fillStyle = "#FFFFFF";
      ctx.fillRect(0, 0, finalSize, finalSize);
      ctx.drawImage(originalCanvas, padding, padding);

      const pngUrl = exportCanvas.toDataURL("image/png");
      const downloadLink = document.createElement("a");
      downloadLink.href = pngUrl;
      downloadLink.download = `QR_${qrMode}_${Date.now()}.png`;
      downloadLink.click();

      message.success(
        "Código QR generado, guardado y descargado correctamente."
      );

      if (qrMode === "dynamic") {
        setDynamicId("");
      }
      setTitle("");
      setDescription("");
    } catch (error) {
      console.error("Error guardando el QR:", error);
      message.error("Hubo un error al guardar y descargar el QR.");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <Row gutter={[16, 16]}>
      <Col>
        <Title level={2}>Generador de Códigos QR</Title>
      </Col>
      <Col span={24}>
        <Row gutter={[16, 16]}>
          <Col lg={16}>
            <ConfigSection>
              <Card>
                <Button type="primary" icon={<FontAwesomeIcon icon={faLink} />}>
                  Enlace
                </Button>
              </Card>

              <Card>
                <StepTitle>
                  <Badge>1</Badge> Completa el contenido
                </StepTitle>

                <FormGroup>
                  <label>Tipo de Código QR</label>
                  <Radio.Group
                    value={qrMode}
                    onChange={(e) => setQrMode(e.target.value)}
                    optionType="button"
                    buttonStyle="solid"
                  >
                    <Radio.Button value="static">
                      Estático (Permanente)
                    </Radio.Button>
                    <Radio.Button value="dynamic">
                      Dinámico (Rastreable / Editable)
                    </Radio.Button>
                  </Radio.Group>
                </FormGroup>

                {qrMode === "dynamic" && (
                  <FormGroup>
                    <label>Dominio de Redirección</label>
                    <Select
                      value={selectedDomain}
                      onChange={handleDomainChange}
                      options={DOMAINS_LIST}
                      loading={sitesLoading}
                      disabled={sitesLoading}
                      style={{ width: "100%" }}
                    />
                    <span className="hint-text">
                      El QR generado apuntará a:{" "}
                      <strong>
                        {selectedDomain}/q/{dynamicId}
                      </strong>
                    </span>
                  </FormGroup>
                )}

                <FormGroup>
                  <Input
                    label="Título del Código QR"
                    size="large"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                  />
                </FormGroup>

                <FormGroup>
                  <TextArea
                    label="Descripción (Opcional)"
                    rows={2}
                    placeholder="Agrega una breve nota sobre este código QR..."
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                  />
                </FormGroup>

                <FormGroup>
                  <label>URL de Destino Real</label>
                  <Input
                    size="large"
                    placeholder="https://tudominio.com"
                    value={destinationUrl}
                    onChange={(e) => setDestinationUrl(e.target.value)}
                  />
                </FormGroup>
              </Card>
            </ConfigSection>
          </Col>
          <Col lg={8}>
            <PreviewSection>
              <Card className="preview-card">
                <StepTitle>
                  <Badge>2</Badge> Vista Previa
                </StepTitle>

                <QrWrapper ref={qrRef}>
                  <QRCodeCanvas
                    value={qrValue || "https://servitecperu.com"}
                    size={220}
                    bgColor={"#ffffff"}
                    fgColor={"#000000"}
                    level={"H"}
                    includeMargin={false}
                  />
                </QrWrapper>

                <Button
                  type="primary"
                  size="large"
                  block
                  icon={<FontAwesomeIcon icon={faDownload} />}
                  onClick={handleSaveAndDownload}
                  disabled={!destinationUrl || isSaving}
                  loading={isSaving}
                >
                  GUARDAR Y DESCARGAR
                </Button>
              </Card>
            </PreviewSection>
          </Col>
        </Row>
      </Col>
    </Row>
  );
};

const ConfigSection = styled.div`
  ${({ theme }) => css`
    display: flex;
    flex-direction: column;
    gap: ${theme.spacing.md};
  `}
`;

const PreviewSection = styled.div`
  position: sticky;
  top: 24px;
`;

const Card = styled.div`
  ${({ theme }) => css`
    width: 100%;
    background: ${theme.colors.bgSecondary};
    border: 1px solid ${theme.colors.border};
    border-radius: ${theme.border_radius.lg};
    padding: ${theme.spacing.lg};

    &.preview-card {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: ${theme.spacing.lg};
    }
  `}
`;

const StepTitle = styled.h3`
  ${({ theme }) => css`
    display: flex;
    align-items: center;
    gap: ${theme.spacing.sm};
    font-size: ${theme.font_sizes.lg};
    margin-bottom: ${theme.spacing.lg};
    margin-top: 0;
    color: ${theme.colors.fontPrimary};
    width: 100%;
  `}
`;

const Badge = styled.span`
  ${({ theme }) => css`
    background: ${theme.colors.primary};
    color: ${theme.colors.bgPrimary};
    width: 24px;
    height: 24px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
    font-size: ${theme.font_sizes.sm};
    font-weight: ${theme.font_weight.large};
  `}
`;

const FormGroup = styled.div`
  ${({ theme }) => css`
    display: flex;
    flex-direction: column;
    gap: ${theme.spacing.sm};
    margin-bottom: ${theme.spacing.lg};

    label {
      color: ${theme.colors.fontSecondary};
      font-weight: ${theme.font_weight.medium};
      font-size: ${theme.font_sizes.sm};
    }

    .hint-text {
      color: ${theme.colors.fontTertiary};
      font-size: ${theme.font_sizes.xs};
      margin-top: 4px;
    }
  `}
`;

const QrWrapper = styled.div`
  ${({ theme }) => css`
    background: #ffffff;
    padding: 16px;
    border-radius: ${theme.border_radius.md};
    box-shadow: ${theme.shadows.md};
    display: flex;
    align-items: center;
    justify-content: center;
  `}
`;
