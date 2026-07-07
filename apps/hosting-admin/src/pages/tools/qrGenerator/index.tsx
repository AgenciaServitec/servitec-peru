import styled, { css } from "styled-components";
import { Button, Col, Row, Title } from "../../../components";
import { Dropdown, type MenuProps, message, Tag } from "antd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCopy,
  faEllipsisVertical,
  faEye,
  faGlobe,
  faLink,
  faQrcode,
  faTrashCan,
} from "@fortawesome/free-solid-svg-icons";
import { type QrCode, qrCodesRef } from "../../../firebase/collections";
import { useCollectionData } from "react-firebase-hooks/firestore";

interface QrsListProps {
  onDelete?: (id: string) => void;
}

export const QrsGeneratorIntegration = ({ onDelete }: QrsListProps) => {
  const [qrCodes, qrCodesLoading] = useCollectionData(
    qrCodesRef.where("isDeleted", "==", false)
  );

  const handleCopy = (url: string) => {
    navigator.clipboard.writeText(url);
    message.success("Enlace copiado al portapapeles");
  };

  const getDropdownItems = (qr: QrCode): MenuProps["items"] => [
    {
      key: "copy",
      label: "Copiar enlace",
      icon: <FontAwesomeIcon icon={faCopy} />,
      onClick: () =>
        handleCopy(
          qr.type === "dynamic" ? qr.shortUrl || "" : qr.destinationUrl
        ),
    },
    {
      key: "delete",
      label: "Eliminar",
      danger: true,
      icon: <FontAwesomeIcon icon={faTrashCan} />,
      onClick: () => onDelete?.(qr.id),
    },
  ];

  return (
    <Row gutter={[16, 16]}>
      <Col span={24}>
        <Title level={2}>Lista de Códigos QR</Title>
      </Col>
      <Col span={24}>
        <Row gutter={[16, 16]}>
          {qrCodes?.map((qr) => (
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

                  <Dropdown
                    menu={{ items: getDropdownItems(qr) }}
                    trigger={["click"]}
                  >
                    <Button
                      type="text"
                      icon={<FontAwesomeIcon icon={faEllipsisVertical} />}
                    />
                  </Dropdown>
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
                      {qr.type === "dynamic" ? qr.shortUrl : qr.destinationUrl}
                    </span>
                  </UrlContainer>

                  {qr.type === "dynamic" && (
                    <AnalyticsBadge>
                      <FontAwesomeIcon icon={faEye} />
                      <span>{qr.analytics.clicks} escaneos</span>
                    </AnalyticsBadge>
                  )}
                </CardFooter>
              </QrCard>
            </Col>
          ))}
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

const StyledTag = styled(Tag)`
  font-size: 11px;
  font-weight: 500;
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
