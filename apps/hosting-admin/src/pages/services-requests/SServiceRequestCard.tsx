import React, { useState } from "react";
import {
  Avatar,
  Button,
  Card,
  Divider,
  Select,
  Space,
  Tag,
  Tooltip,
  Typography,
} from "antd";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowUpRightFromSquare,
  faChevronRight,
  faCircle,
  faClock,
  faEnvelope,
  faEye,
  faHashtag,
  faHouseSignal,
  faLaptopMedical,
  faLocationDot,
  faMapLocationDot,
  faMobileScreen,
  faTriangleExclamation,
  faUser,
  faUserGear,
} from "@fortawesome/free-solid-svg-icons";
import { faWhatsapp } from "@fortawesome/free-brands-svg-icons";
import { ServiceDetailsDrawer } from "./ServiceDetailsDrawer.tsx";

const { Text, Title, Paragraph } = Typography;

// --- Mock Data Técnicos ---
const TECHNICIANS = [
  { label: "Carlos Mendoza", value: "T001", status: "Disponible" },
  { label: "Ricardo Palma", value: "T002", status: "En servicio" },
  { label: "Sofía Loli", value: "T003", status: "Disponible" },
  { label: "Marcos Ruiz", value: "T004", status: "Fuera de turno" },
];

const MOCK_DATA = {
  id: "SR-2026-0482",
  source: "Web Portal",
  client: {
    fullName: "Dany Diana Da Silva",
    email: "dany.dasilva@email.com",
    document: { type: "dni", number: "74859612" },
    phone: { prefix: "+51", number: "987654321" },
  },
  device: {
    brand: "Samsung",
    model: "Galaxy S23 Ultra",
    category: "Smartphone",
  },
  status: "pending",
  priority: "high",
  issueDescription:
    "El dispositivo sufrió una caída leve. Ahora la pantalla presenta parpadeos constantes y una línea verde vertical en el lado derecho. El táctil responde intermitentemente.",
  serviceMode: "home-service",
  location: {
    district: "Chorrillos",
    exactAddress: "Av. Fernando Terán 123",
  },
};

// --- Styled Components ---

const MapContainer = styled.div`
  height: 140px;
  background-color: #141414;
  position: relative;
  background-image: url("https://api.mapbox.com/styles/v1/mapbox/dark-v10/static/-77.022,-12.164,15/440x140?access_token=YOUR_TOKEN");
  background-size: cover;
  background-position: center;
`;

const Content = styled.div`
  padding: 20px;
`;

const InfoRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 20px;
`;

const MetaGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
  margin: 20px 0;
`;

const DescriptionArea = styled.div`
  background: ${({ theme }) => theme.colors.bgPrimary};
  padding: 16px;
  border-radius: 8px;
  border: 1px solid ${({ theme }) => theme.colors.border};
  margin-bottom: 20px;
`;

const AssignArea = styled.div`
  margin-bottom: 24px;
`;

const ActionCircle = styled(Button)`
  width: 32px !important;
  height: 32px !important;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50% !important;
  border: 1px solid ${({ theme }) => theme.colors.border} !important;
  background: transparent !important;
  color: ${({ theme }) => theme.colors.fontSecondary} !important;

  &:hover {
    color: ${({ theme }) => theme.colors.primary} !important;
    border-color: ${({ theme }) => theme.colors.primary} !important;
  }

  &.whatsapp:hover {
    color: #25d366 !important;
    border-color: #25d366 !important;
  }
`;

const DataLabel = ({ icon, title, value, extra }: any) => (
  <div>
    <Space size={6} style={{ marginBottom: 4 }}>
      <FontAwesomeIcon
        icon={icon}
        style={{ fontSize: "11px", color: "#8c8c8c" }}
      />
      <Text
        type="secondary"
        style={{ fontSize: "11px", fontWeight: 600, letterSpacing: "0.3px" }}
      >
        {title.toUpperCase()}
      </Text>
    </Space>
    <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
      <Text strong style={{ fontSize: "13px" }}>
        {value}
      </Text>
      {extra}
    </div>
  </div>
);

export const ServiceRequestCard: React.FC<any> = ({
  data = MOCK_DATA,
  timeAgo = "HACE 12 MIN",
  onOpenModal,
  onOpenPage,
}) => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false); // <--- ESTADO NUEVO
  const [selectedTech, setSelectedTech] = useState<string | null>(null);

  const isHigh = data.priority === "high";
  const waLink = `https://wa.me/${data.client.phone.prefix.replace("+", "")}${data.client.phone.number}`;
  const mailLink = `mailto:${data.client.email}`;

  const techName = TECHNICIANS.find((t) => t.value === selectedTech)?.label;

  return (
    <>
      <Card
        style={{ width: 440, padding: 0, overflow: "hidden" }}
        bodyStyle={{ padding: 0 }}
        hoverable={false}
      >
        <MapContainer>
          <div
            style={{
              position: "absolute",
              top: 12,
              left: 12,
              display: "flex",
              gap: 8,
            }}
          >
            <Tag
              color="default"
              style={{
                background: "#000",
                color: "#fff",
                border: "none",
                fontWeight: 600,
              }}
            >
              <FontAwesomeIcon
                icon={faCircle}
                style={{ fontSize: 7, marginRight: 6, color: "#faad14" }}
              />
              PENDIENTE
            </Tag>
            {isHigh && (
              <Tag color="error" style={{ fontWeight: 600 }}>
                URGENTE
              </Tag>
            )}
          </div>

          <Button
            type="primary"
            icon={<FontAwesomeIcon icon={faMapLocationDot} />}
            style={{
              position: "absolute",
              bottom: 12,
              right: 12,
              height: 40,
              width: 40,
            }}
          />
        </MapContainer>

        <Content>
          <InfoRow>
            <Space direction="vertical" size={0}>
              <Title level={4} style={{ margin: 0, fontSize: 18 }}>
                {data.client.fullName}
              </Title>
              <Space
                split={<Divider type="vertical" />}
                style={{ marginTop: 4 }}
              >
                <Text type="secondary" style={{ fontSize: 12 }}>
                  <FontAwesomeIcon icon={faUser} style={{ marginRight: 6 }} />
                  {data.client.document.number}
                </Text>
                <a href={waLink} target="_blank" rel="noreferrer">
                  <Text strong style={{ fontSize: 12, color: "#25d366" }}>
                    {data.client.phone.number}
                  </Text>
                </a>
              </Space>
            </Space>

            {/* Botones de Acción Rápida actualizados */}
            <Space size={8} style={{ marginTop: 4 }}>
              <Tooltip title="Vista Rápida">
                <ActionCircle
                  icon={
                    <FontAwesomeIcon icon={faEye} style={{ fontSize: 13 }} />
                  }
                  onClick={() => setIsDrawerOpen(true)}
                />
              </Tooltip>
              <Tooltip title="Ver en nueva página">
                <ActionCircle
                  icon={
                    <FontAwesomeIcon
                      icon={faArrowUpRightFromSquare}
                      style={{ fontSize: 12 }}
                    />
                  }
                  onClick={onOpenPage}
                />
              </Tooltip>
              <Tooltip title="WhatsApp">
                <ActionCircle
                  className="whatsapp"
                  icon={<FontAwesomeIcon icon={faWhatsapp} />}
                  href={waLink}
                  target="_blank"
                />
              </Tooltip>
              <Tooltip title="Email">
                <ActionCircle
                  icon={
                    <FontAwesomeIcon
                      icon={faEnvelope}
                      style={{ fontSize: 13 }}
                    />
                  }
                  href={mailLink}
                />
              </Tooltip>
            </Space>
          </InfoRow>

          <Divider style={{ margin: "0 0 20px 0" }} />

          <MetaGrid>
            <DataLabel
              icon={faMobileScreen}
              title="Equipo"
              value={`${data.device.brand} ${data.device.model}`}
              extra={
                <Tag
                  style={{
                    fontSize: "9px",
                    lineHeight: "14px",
                    margin: 0,
                    borderRadius: "4px",
                  }}
                >
                  {data.device.category.toUpperCase()}
                </Tag>
              }
            />
            <DataLabel icon={faClock} title="Recibido" value={timeAgo} />
            <DataLabel
              icon={faHouseSignal}
              title="Servicio"
              value={
                data.serviceMode === "home-service"
                  ? "A Domicilio"
                  : "En Tienda"
              }
            />
            <DataLabel
              icon={faLocationDot}
              title="Distrito"
              value={data.location.district}
            />
            <div style={{ gridColumn: "span 2" }}>
              <DataLabel
                icon={faLocationDot}
                title="Dirección Exacta"
                value={data.location.exactAddress}
              />
            </div>
          </MetaGrid>

          <DescriptionArea>
            <Space size={8} style={{ marginBottom: 8 }}>
              <FontAwesomeIcon
                icon={faTriangleExclamation}
                style={{ color: "#faad14", fontSize: 12 }}
              />
              <Text strong style={{ fontSize: 11 }}>
                SÍNTOMAS DEL EQUIPO
              </Text>
            </Space>
            <Paragraph
              style={{
                margin: 0,
                fontSize: 13,
                color: "rgba(255,255,255,0.8)",
              }}
              ellipsis={{ rows: 2, expandable: true, symbol: "Ver más" }}
            >
              {data.issueDescription}
            </Paragraph>
          </DescriptionArea>

          <AssignArea>
            <Space size={6} style={{ marginBottom: 8 }}>
              <FontAwesomeIcon
                icon={faUserGear}
                style={{ fontSize: "11px", color: "#8c8c8c" }}
              />
              <Text
                type="secondary"
                style={{
                  fontSize: "11px",
                  fontWeight: 600,
                  letterSpacing: "0.3px",
                }}
              >
                ASIGNAR TÉCNICO
              </Text>
            </Space>
            <Select
              placeholder="Seleccionar técnico encargado"
              style={{ width: "100%" }}
              size="large"
              onChange={(val) => setSelectedTech(val)}
              options={TECHNICIANS.map((t) => ({
                label: (
                  <Space>
                    <Avatar
                      size="small"
                      style={{
                        backgroundColor: "#faad14",
                        color: "#000",
                        fontSize: 10,
                      }}
                    >
                      {t.label.charAt(0)}
                    </Avatar>
                    {t.label}{" "}
                    <Text type="secondary" style={{ fontSize: 10 }}>
                      ({t.status})
                    </Text>
                  </Space>
                ),
                value: t.value,
              }))}
            />
          </AssignArea>

          <Button
            type="primary"
            block
            size="large"
            style={{
              height: 52,
              fontSize: 15,
              fontWeight: 700,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 12,
              transition: "all 0.3s ease",
            }}
          >
            {selectedTech
              ? `ASIGNAR A ${techName?.toUpperCase()}`
              : "ACEPTAR Y COTIZAR"}
            <FontAwesomeIcon
              icon={selectedTech ? faLaptopMedical : faChevronRight}
              style={{ fontSize: 12 }}
            />
          </Button>

          <div
            style={{
              display: "flex",
              justifyContent: "center",
              marginTop: "14px",
              gap: "16px",
            }}
          >
            <Text type="secondary" style={{ fontSize: "10px" }}>
              <FontAwesomeIcon
                icon={faHashtag}
                style={{ marginRight: "4px" }}
              />
              {data.id}
            </Text>
            <Text type="secondary" style={{ fontSize: "10px" }}>
              ORIGEN: {data.source.toUpperCase()}
            </Text>
          </div>
        </Content>
      </Card>
      <ServiceDetailsDrawer
        open={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        data={data}
      />
    </>
  );
};
