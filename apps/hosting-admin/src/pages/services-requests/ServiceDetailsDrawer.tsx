import {
  Button,
  Divider,
  Drawer,
  message,
  Space,
  Tag,
  Tooltip,
  Typography,
} from "antd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircleInfo,
  faCopy,
  faEnvelope,
  faHistory,
  faHouseSignal,
  faIdCard,
  faMapMarkerAlt,
  faMicrochip,
  faPhone,
  faPrint,
  faShareNodes,
  faShieldHalved,
  faStore,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import styled, { css } from "styled-components";
import { Title } from "../../components";
import dayjs from "dayjs";
import { SERVICE_REQUEST_STATUS } from "../../data-list/serviceRequestStatus.ts";
import { PRIORITY_LEVELS } from "../../data-list/serviceRequestPriorityLevels.ts";

const { Text, Paragraph } = Typography;

const SectionTitle = styled(Space)`
  ${({ theme }) => css`
    margin-bottom: ${theme.spacing.md};
    width: 100%;

    .ant-typography {
      letter-spacing: 0.3px;
      color: ${theme.colors.fontPrimary} !important;
    }
  `}
`;

const SpecItem = styled.div`
  ${({ theme }) => css`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: ${theme.spacing.sm};
    border-bottom: 1px solid ${theme.colors.divider};
    padding-bottom: 8px;

    .ant-typography:last-child {
      color: ${theme.colors.fontPrimary} !important;
    }
  `}
`;

const ContactGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px;
  margin-bottom: 24px;
`;

const InfoBlock = styled.div<{ $variant?: "gold" | "blue" | "default" }>`
  ${({ theme, $variant }) => css`
    padding: 18px;
    border-radius: ${theme.border_radius.md};
    margin-bottom: 32px;
    transition: all ${theme.transitions.fast};

    ${$variant === "gold" &&
    css`
      background: ${theme.colors.primaryAlpha};
      border: 1px solid ${theme.colors.primary}40;
    `}

    ${$variant === "blue" &&
    css`
      background: ${theme.colors.info}15;
      border: 1px solid ${theme.colors.info}40;
    `}

    ${$variant === "default" &&
    css`
      background: ${theme.colors.bgTertiary};
      border: 1px solid ${theme.colors.border};
    `}
  `}
`;

const StyledDrawer = styled(Drawer)`
  ${({ theme }) => css`
    .ant-drawer-content {
      background: ${theme.colors.bgSecondary} !important;
    }
    .ant-drawer-header {
      background: ${theme.colors.bgPrimary} !important;
      border-bottom: 1px solid ${theme.colors.divider} !important;
    }
    .ant-drawer-title .ant-typography {
      color: ${theme.colors.fontPrimary} !important;
    }
    .ant-drawer-close {
      color: ${theme.colors.fontSecondary};
    }
  `}
`;

export const ServiceDetailsDrawer = ({ open, onClose, data }: any) => {
  if (!data) return null;

  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    message.success(`${label} copiado`);
  };

  const formattedTime = data.createAt
    ? dayjs(data.createAt.toDate()).format("hh:mm A")
    : data.requestTime || "--:--";

  const formattedDate = data.createAt
    ? dayjs(data.createAt.toDate()).format("D [de] MMMM, YYYY")
    : data.requestTime || "--:--";

  const statusInfo =
    SERVICE_REQUEST_STATUS.find((s) => s.value === data.status) ||
    SERVICE_REQUEST_STATUS[0];

  const priorityInfo =
    PRIORITY_LEVELS.find((p) => p.value === data.priority) ||
    PRIORITY_LEVELS[0];

  return (
    <StyledDrawer
      title={
        <Space>
          <FontAwesomeIcon icon={faCircleInfo} style={{ color: "#faad14" }} />
          <Text style={{ fontSize: 16, fontWeight: 500 }}>
            Solicitud {data.id}
          </Text>
        </Space>
      }
      placement="right"
      onClose={onClose}
      open={open}
      width={520}
      extra={
        <Space>
          <Tooltip title="Imprimir Orden">
            <Button type="text" icon={<FontAwesomeIcon icon={faPrint} />} />
          </Tooltip>
          <Tooltip title="Compartir con Cliente">
            <Button
              type="text"
              icon={<FontAwesomeIcon icon={faShareNodes} />}
            />
          </Tooltip>
        </Space>
      }
    >
      <div
        style={{
          marginBottom: 32,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",
        }}
      >
        <Space direction="vertical" size={8}>
          <Space>
            {/* TAGS CON ESTILO DINAMICO PARA CLARO/OSCURO */}
            <Tag
              icon={
                <FontAwesomeIcon
                  icon={statusInfo.icon}
                  style={{ fontSize: 9 }}
                />
              }
              style={{
                margin: 0,
                fontSize: 11,
                background: `${statusInfo.color}15`,
                color: statusInfo.color,
                borderColor: `${statusInfo.color}40`,
                textTransform: "uppercase",
              }}
            >
              {statusInfo.label}
            </Tag>
            <Tag
              icon={
                <FontAwesomeIcon
                  icon={priorityInfo.icon}
                  style={{ fontSize: 9 }}
                />
              }
              style={{
                margin: 0,
                fontSize: 11,
                background: `${priorityInfo.color}15`,
                color: priorityInfo.color,
                borderColor: `${priorityInfo.color}40`,
                textTransform: "uppercase",
              }}
            >
              {priorityInfo.label}
            </Tag>
          </Space>
          <Text type="secondary" style={{ fontSize: 11 }}>
            Ingresado vía servitecperu.com
          </Text>
        </Space>

        <div style={{ textAlign: "right" }}>
          <Text style={{ display: "block", fontSize: 14, fontWeight: 500 }}>
            {formattedTime}
          </Text>
          <Text type="secondary" style={{ fontSize: 11 }}>
            {formattedDate}
          </Text>
        </div>
      </div>

      <SectionTitle>
        <FontAwesomeIcon
          icon={faUser}
          style={{ color: "#faad14", fontSize: 13 }}
        />
        <Text style={{ fontSize: 13, fontWeight: 500 }}>
          Información del cliente
        </Text>
      </SectionTitle>

      <InfoBlock $variant="gold">
        <Title
          level={5}
          style={{
            margin: "0 0 16px 0",
            fontWeight: 500,
            textTransform: "capitalize",
          }}
        >
          {data.client.fullName || data.client.companyName}
        </Title>

        <ContactGrid>
          <Space direction="vertical" size={2}>
            <Text type="secondary" style={{ fontSize: 11 }}>
              <FontAwesomeIcon icon={faIdCard} style={{ marginRight: 6 }} />
              {data.client.document.type.toUpperCase()}
            </Text>
            <Space size={4}>
              <Text style={{ fontSize: 13 }}>
                {data.client.document.number}
              </Text>
              <Button
                type="text"
                size="small"
                icon={
                  <FontAwesomeIcon icon={faCopy} style={{ fontSize: 10 }} />
                }
                onClick={() =>
                  copyToClipboard(data.client.document.number, "Documento")
                }
              />
            </Space>
          </Space>

          <Space direction="vertical" size={2}>
            <Text type="secondary" style={{ fontSize: 11 }}>
              <FontAwesomeIcon icon={faPhone} style={{ marginRight: 6 }} />{" "}
              Teléfono
            </Text>
            <Text style={{ fontSize: 13, color: "#52c41a", fontWeight: 600 }}>
              {data.client.phone.prefix} {data.client.phone.number}
            </Text>
          </Space>

          <Space direction="vertical" size={2}>
            <Text type="secondary" style={{ fontSize: 11 }}>
              <FontAwesomeIcon icon={faEnvelope} style={{ marginRight: 6 }} />{" "}
              Correo
            </Text>
            <Text
              ellipsis={{ tooltip: data.client.email }}
              style={{ fontSize: 13 }}
            >
              {data.client.email}
            </Text>
          </Space>

          <Space direction="vertical" size={2}>
            <Text type="secondary" style={{ fontSize: 11 }}>
              <FontAwesomeIcon
                icon={
                  data.serviceMode === "home-service" ? faHouseSignal : faStore
                }
                style={{ marginRight: 6 }}
              />
              Tipo de servicio
            </Text>
            <Tag
              style={{
                margin: 0,
                fontSize: 10,
                borderRadius: 3,
                background:
                  data.serviceMode === "home-service"
                    ? "#1890ff15"
                    : "#b37feb15",
                color:
                  data.serviceMode === "home-service" ? "#1890ff" : "#b37feb",
                borderColor:
                  data.serviceMode === "home-service"
                    ? "#1890ff40"
                    : "#b37feb40",
              }}
            >
              {data.serviceMode === "home-service"
                ? "A DOMICILIO"
                : "EN TIENDA"}
            </Tag>
          </Space>
        </ContactGrid>

        <Divider style={{ margin: "12px 0" }} />

        <Space align="start">
          <FontAwesomeIcon
            icon={faMapMarkerAlt}
            style={{ color: "#ff4d4f", marginTop: 4, fontSize: 12 }}
          />
          <div>
            <Text style={{ fontSize: 13 }}>{data.location.district}</Text>
            <br />
            <Text type="secondary" style={{ fontSize: 12 }}>
              {data.location.exactAddress}
            </Text>
          </div>
        </Space>
      </InfoBlock>

      <SectionTitle>
        <FontAwesomeIcon
          icon={faMicrochip}
          style={{ color: "#8c8c8c", fontSize: 13 }}
        />
        <Text style={{ fontSize: 13, fontWeight: 500 }}>Datos del equipo</Text>
      </SectionTitle>

      <InfoBlock $variant="default">
        <SpecItem>
          <Text type="secondary" style={{ fontSize: 13 }}>
            Categoría
          </Text>
          <Text style={{ fontSize: 13 }}>{data.device.category}</Text>
        </SpecItem>
        <SpecItem>
          <Text type="secondary" style={{ fontSize: 13 }}>
            Marca / Modelo
          </Text>
          <Text style={{ fontSize: 13 }}>
            {data.device.brand} {data.device.model}
          </Text>
        </SpecItem>
        <SpecItem
          style={{ borderBottom: "none", marginBottom: 0, paddingBottom: 0 }}
        >
          <Text type="secondary" style={{ fontSize: 13 }}>
            IMEI / Serie
          </Text>
          <Text code style={{ fontSize: 13 }}>
            358492XXXXX4821
          </Text>
        </SpecItem>
      </InfoBlock>

      <SectionTitle>
        <FontAwesomeIcon
          icon={faHistory}
          style={{ color: "#8c8c8c", fontSize: 13 }}
        />
        <Text style={{ fontSize: 13, fontWeight: 500 }}>
          Descripción del fallo
        </Text>
      </SectionTitle>

      <InfoBlock $variant="default">
        <Paragraph style={{ fontSize: 13, lineHeight: "1.6", margin: 0 }}>
          {data.issueDescription}
        </Paragraph>
      </InfoBlock>

      <InfoBlock $variant="blue" style={{ marginTop: 40, marginBottom: 0 }}>
        <Space>
          <FontAwesomeIcon
            icon={faShieldHalved}
            style={{ color: "#1890ff", fontSize: 14 }}
          />
          <Text style={{ fontSize: 12, color: "#1890ff", fontWeight: 500 }}>
            Solicitud validada internamente. Listo para asignación técnica.
          </Text>
        </Space>
      </InfoBlock>
    </StyledDrawer>
  );
};
