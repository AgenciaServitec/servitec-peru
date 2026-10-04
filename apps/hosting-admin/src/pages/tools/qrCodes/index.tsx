import styled, { css } from "styled-components";
import { Button, Col, IconAction, Row, Title } from "../../../components";
import { Dropdown, type MenuProps, message, Tag } from "antd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChartSimple,
  faCopy,
  faDownload,
  faEllipsisVertical,
  faEye,
  faGlobe,
  faLink,
  faPen,
  faPlus,
  faQrcode,
  faTrashCan,
} from "@fortawesome/free-solid-svg-icons";
import { type QrCode, qrCodesRef } from "../../../firebase/collections";
import { useCollectionData } from "react-firebase-hooks/firestore";
import { useNavigate } from "react-router-dom";
import { theme } from "../../../styles";
import { QRCode as QrGenerator } from "qrcode-generator-ts";

interface QrsListProps {
  onDelete?: (id: string) => void;
}

export const QrsGeneratorIntegration = ({ onDelete }: QrsListProps) => {
  const navigate = useNavigate();

  const [qrCodes, qrCodesLoading] = useCollectionData(
    qrCodesRef.where("isDeleted", "==", false)
  );

  const handleCopy = (url: string) => {
    navigator.clipboard.writeText(url);
    message.success("Enlace copiado al portapapeles");
  };

  const handleDownloadQr = (
    type: "png" | "jpg" | "svg",
    value: string,
    title: string
  ) => {
    try {
      const canvas = document.createElement("canvas");
      const size = 300;
      const padding = 24;
      const finalSize = size + padding * 2;

      canvas.width = finalSize;
      canvas.height = finalSize;

      const ctx = canvas.getContext("2d");
      if (!ctx) throw new Error("No se pudo obtener el contexto 2D");

      ctx.fillStyle = "#FFFFFF";
      ctx.fillRect(0, 0, finalSize, finalSize);

      const qr = new QrGenerator();
      qr.setTypeNumber(4);
      qr.setErrorCorrectLevel(3);
      qr.addData(value, 4);
      qr.make();

      const moduleCount = qr.getModuleCount();
      const cellSize = size / moduleCount;

      for (let row = 0; row < moduleCount; row++) {
        for (let col = 0; col < moduleCount; col++) {
          ctx.fillStyle = qr.isDark(row, col) ? "#000000" : "#FFFFFF";
          ctx.fillRect(
            padding + col * cellSize,
            padding + row * cellSize,
            cellSize,
            cellSize
          );
        }
      }

      const fileName = `${title.replace(/\s+/g, "_")}_${type}`;
      const downloadLink = document.createElement("a");

      if (type === "svg") {
        let svgContent = `<svg xmlns="http://www.w3.org/2000/svg" width="${finalSize}" height="${finalSize}" viewBox="0 0 ${finalSize} ${finalSize}"><rect width="100%" height="100%" fill="#ffffff"/>`;
        for (let row = 0; row < moduleCount; row++) {
          for (let col = 0; col < moduleCount; col++) {
            if (qr.isDark(row, col)) {
              svgContent += `<rect x="${padding + col * cellSize}" y="${padding + row * cellSize}" width="${cellSize}" height="${cellSize}" fill="#000000"/>`;
            }
          }
        }
        svgContent += `</svg>`;

        const blob = new Blob([svgContent], {
          type: "image/svg+xml;charset=utf-8",
        });
        downloadLink.href = URL.createObjectURL(blob);
        downloadLink.download = `${fileName}.svg`;
      } else {
        downloadLink.href = canvas.toDataURL(
          type === "png" ? "image/png" : "image/jpeg"
        );
        downloadLink.download = `${fileName}.${type}`;
      }

      document.body.appendChild(downloadLink);
      downloadLink.click();
      document.body.removeChild(downloadLink);

      message.success(`Formato ${type.toUpperCase()} generado con éxito.`);
    } catch (error) {
      console.error("Error descargando el código QR:", error);
      message.error("No se pudo procesar la descarga de la imagen.");
    }
  };

  const getDropdownItems = (qr: QrCode): MenuProps["items"] => [
    {
      key: "edit",
      label: "Editar",
      icon: <FontAwesomeIcon icon={faPen} />,
      onClick: () => navigate(`/tools/qr-generator/${qr.id}`),
    },
    {
      key: "analytics",
      label: "Estadísticas",
      icon: <FontAwesomeIcon icon={faChartSimple} />,
      disabled: qr.type === "static",
      onClick: () => navigate(`/tools/qr-generator/${qr.id}?tab=analytics`),
    },
    {
      type: "divider",
    },
    {
      key: "delete",
      label: "Eliminar",
      danger: true,
      icon: <FontAwesomeIcon icon={faTrashCan} />,
      onClick: () => onDelete?.(qr.id),
    },
  ];

  const getDownloadOptions = (
    qr: QrCode,
    targetUrl: string
  ): MenuProps["items"] => [
    {
      key: "png",
      label: "Descargar PNG",
      onClick: () => handleDownloadQr("png", targetUrl, qr.title),
    },
    {
      key: "jpg",
      label: "Descargar JPG",
      onClick: () => handleDownloadQr("jpg", targetUrl, qr.title),
    },
    {
      key: "svg",
      label: "Descargar SVG",
      onClick: () => handleDownloadQr("svg", targetUrl, qr.title),
    },
  ];

  return (
    <Row gutter={[16, 16]}>
      <Col span={24}>
        <Row gutter={[16, 16]} justify="space-between" align="middle">
          <Col>
            <Title level={2}>Lista de Códigos QR</Title>
          </Col>
          <Col>
            <Button
              type="primary"
              icon={<FontAwesomeIcon icon={faPlus} />}
              size="large"
              onClick={() => navigate("/tools/qr-generator/new")}
            >
              Crear Código QR
            </Button>
          </Col>
        </Row>
      </Col>
      <Col span={24}>
        <Row gutter={[16, 16]}>
          {qrCodes?.map((qr) => {
            const targetUrl =
              qr.type === "dynamic" ? qr.shortUrl || "" : qr.destinationUrl;

            return (
              <Col xs={24} sm={12} lg={8} key={qr.id}>
                <QrCard>
                  <CardHeader>
                    <IconWrapper type={qr.type}>
                      <FontAwesomeIcon
                        icon={qr.type === "dynamic" ? faGlobe : faQrcode}
                      />
                    </IconWrapper>

                    <BadgeGroup>
                      <StyledTag
                        color={qr.type === "dynamic" ? "gold" : "default"}
                      >
                        {qr.type === "dynamic" ? "Dinámico" : "Estático"}
                      </StyledTag>
                      <StyledTag
                        color={qr.status === "active" ? "success" : "error"}
                      >
                        {qr.status === "active" ? "Activo" : "Pausado"}
                      </StyledTag>
                    </BadgeGroup>

                    <ActionGroup>
                      <IconAction
                        tooltipTitle="Copiar enlace"
                        size={28}
                        icon={faCopy}
                        onClick={() => handleCopy(targetUrl)}
                        iconStyles={{ color: () => theme.colors.fontSecondary }}
                      />

                      <Dropdown
                        menu={{ items: getDownloadOptions(qr, targetUrl) }}
                        trigger={["click"]}
                      >
                        <div>
                          <IconAction
                            tooltipTitle="Descargar"
                            size={28}
                            icon={faDownload}
                            onClick={() => {}}
                            iconStyles={{ color: () => theme.colors.primary }}
                          />
                        </div>
                      </Dropdown>

                      <Dropdown
                        menu={{ items: getDropdownItems(qr) }}
                        trigger={["click"]}
                      >
                        <Button
                          type="text"
                          size="small"
                          icon={<FontAwesomeIcon icon={faEllipsisVertical} />}
                          style={{ color: theme.colors.fontSecondary }}
                        />
                      </Dropdown>
                    </ActionGroup>
                  </CardHeader>

                  <CardBody>
                    <QrTitle>{qr.title}</QrTitle>
                    {qr.description && (
                      <QrDescription>{qr.description}</QrDescription>
                    )}
                  </CardBody>

                  <CardFooter>
                    <UrlContainer>
                      <FontAwesomeIcon icon={faLink} className="url-icon" />
                      <span className="url-text" title={qr.destinationUrl}>
                        {targetUrl}
                      </span>
                    </UrlContainer>

                    {qr.type === "dynamic" && (
                      <AnalyticsBadge>
                        <FontAwesomeIcon icon={faEye} />
                        <span>{qr.analytics?.clicks || 0} clics</span>
                      </AnalyticsBadge>
                    )}
                  </CardFooter>
                </QrCard>
              </Col>
            );
          })}
        </Row>
      </Col>
    </Row>
  );
};

const QrCard = styled.div`
  ${({ theme }) => css`
    background: ${theme.colors.bgSecondary};
    border: 1px solid ${theme.colors.border};
    border-radius: ${theme.border_radius.lg};
    padding: ${theme.spacing.lg};
    display: flex;
    flex-direction: column;
    gap: ${theme.spacing.md};
    transition: border-color ${theme.transitions.fast};

    &:hover {
      border-color: ${theme.colors.borderHover};
    }
  `}
`;

const CardHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
`;

const IconWrapper = styled.div<{ type: "static" | "dynamic" }>`
  ${({ theme, type }) => css`
    width: 36px;
    height: 36px;
    border-radius: ${theme.border_radius.sm};
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 16px;
    background: ${type === "dynamic"
      ? theme.colors.primaryAlpha
      : theme.colors.bgHover};
    color: ${type === "dynamic"
      ? theme.colors.primary
      : theme.colors.fontSecondary};
  `}
`;

const BadgeGroup = styled.div`
  ${({ theme }) => css`
    display: flex;
    gap: ${theme.spacing.xs};
    flex: 1;
    margin-left: ${theme.spacing.sm};
  `}
`;

const ActionGroup = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
`;

const StyledTag = styled(Tag)`
  font-size: 10px;
  font-weight: 600;
  text-transform: uppercase;
  border-radius: 4px;
  padding: 0 6px;
`;

const CardBody = styled.div`
  ${({ theme }) => css`
    display: flex;
    flex-direction: column;
    gap: ${theme.spacing.xs};
    flex: 1;
  `}
`;

const QrTitle = styled.h4`
  ${({ theme }) => css`
    margin: 0;
    font-size: ${theme.font_sizes.md};
    font-weight: ${theme.font_weight.large};
    color: ${theme.colors.fontPrimary};
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  `}
`;

const QrDescription = styled.p`
  ${({ theme }) => css`
    margin: 0;
    font-size: ${theme.font_sizes.xs};
    color: ${theme.colors.fontTertiary};
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
    text-overflow: ellipsis;
    line-height: 1.4;
  `}
`;

const CardFooter = styled.div`
  ${({ theme }) => css`
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding-top: ${theme.spacing.md};
    border-top: 1px solid ${theme.colors.divider};
    gap: ${theme.spacing.md};
  `}
`;

const UrlContainer = styled.div`
  ${({ theme }) => css`
    display: flex;
    align-items: center;
    gap: ${theme.spacing.xs};
    color: ${theme.colors.fontSecondary};
    font-size: ${theme.font_sizes.xs};
    overflow: hidden;
    flex: 1;

    .url-icon {
      color: ${theme.colors.fontTertiary};
      flex-shrink: 0;
    }

    .url-text {
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
  `}
`;

const AnalyticsBadge = styled.div`
  ${({ theme }) => css`
    display: flex;
    align-items: center;
    gap: 6px;
    font-size: 11px;
    font-weight: ${theme.font_weight.medium};
    color: ${theme.colors.success};
    background: rgba(16, 185, 129, 0.1);
    padding: 2px 8px;
    border-radius: ${theme.border_radius.full};
    flex-shrink: 0;
  `}
`;
