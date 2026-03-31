import React, { useState } from "react";
import { Button, Card, Select, Space, Tag, Typography } from "antd";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBolt,
  faCalendarCheck,
  faChevronRight,
  faClock,
  faEnvelope,
  faEye,
  faHouseSignal,
  faLaptopMedical,
  faMapLocationDot,
  faTriangleExclamation,
} from "@fortawesome/free-solid-svg-icons";
import { faWhatsapp } from "@fortawesome/free-brands-svg-icons";
import { ServiceDetailsDrawer } from "./ServiceDetailsDrawer.tsx";
import { IconAction } from "../../components";
import { theme } from "../../styles";
import dayjs from "dayjs";

const { Text, Title, Paragraph } = Typography;

const TECHNICIANS = [
  { label: "Carlos Mendoza", value: "T001", status: "Disponible" },
  { label: "Ricardo Palma", value: "T002", status: "En servicio" },
  { label: "Sofía Loli", value: "T003", status: "Disponible" },
  { label: "Marcos Ruiz", value: "T004", status: "Fuera de turno" },
];

const MOCK_DATA = {
  id: "SR-2026-0482",
  requestTime: "12:35 PM",
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

const MapContainer = styled.div`
  height: 115px;
  background-color: #141414;
  position: relative;
  background-image:
    linear-gradient(rgba(0, 0, 0, 0.1), rgba(0, 0, 0, 0.4)),
    url("https://www.google.com/maps/about/images/mymaps/mymaps-desktop-16x9.png");
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
`;

const Content = styled.div`
  padding: 16px;
`;

const CompactGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 8px;
  background: rgba(255, 255, 255, 0.02);
  padding: 10px;
  border-radius: 8px;
  margin: 12px 0;
  border: 1px solid ${({ theme }) => theme.colors.border};
`;

const DataItem = ({ label, value, icon }: any) => (
  <Space direction="vertical" size={0}>
    <Text
      type="secondary"
      style={{ fontSize: "9px", fontWeight: 700, letterSpacing: "0.3px" }}
    >
      {label.toUpperCase()}
    </Text>
    <Space size={4}>
      {icon && (
        <FontAwesomeIcon
          icon={icon}
          style={{ fontSize: "10px", color: "#8c8c8c" }}
        />
      )}
      <Text strong style={{ fontSize: "11.5px" }}>
        {value}
      </Text>
    </Space>
  </Space>
);

export const ServiceRequestCard: React.FC<any> = ({
  data = MOCK_DATA,
  onOpenPage,
}) => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [selectedTech, setSelectedTech] = useState<string | null>(null);

  const isHigh = data.priority === "high";
  const waLink = `https://wa.me/${data.client.phone.prefix.replace("+", "")}${data.client.phone.number}`;
  const techName = TECHNICIANS.find((t) => t.value === selectedTech)?.label;

  const formattedTime = data.createAt
    ? dayjs(data.createAt.toDate()).format("hh:mm A")
    : data.requestTime || "--:--";

  return (
    <>
      <Card
        style={{
          width: 345,
          padding: 0,
          overflow: "hidden",
        }}
        bodyStyle={{ padding: 0 }}
      >
        <MapContainer>
          <div
            style={{
              position: "absolute",
              top: 10,
              left: 10,
              display: "flex",
              gap: 6,
            }}
          >
            <Tag
              color="default"
              style={{
                background: "rgba(0,0,0,0.8)",
                color: "#fff",
                border: "1px solid rgba(255,255,255,0.2)",
                fontSize: 10,
                display: "flex",
                alignItems: "center",
              }}
            >
              <FontAwesomeIcon
                icon={faClock}
                style={{ fontSize: 9, marginRight: 5, color: "#faad14" }}
              />
              PENDIENTE
            </Tag>
            {isHigh && (
              <Tag
                color="error"
                style={{
                  fontWeight: 700,
                  fontSize: 10,
                  display: "flex",
                  alignItems: "center",
                  boxShadow: "0 2px 4px rgba(0,0,0,0.3)",
                }}
              >
                <FontAwesomeIcon
                  icon={faBolt}
                  style={{ fontSize: 9, marginRight: 5 }}
                />
                URGENTE
              </Tag>
            )}
          </div>

          <Button
            type="primary"
            size="small"
            icon={<FontAwesomeIcon icon={faMapLocationDot} />}
            style={{
              position: "absolute",
              bottom: 10,
              right: 10,
              width: 34,
              height: 34,
              borderRadius: "8px",
            }}
          />
        </MapContainer>

        <Content>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "flex-start",
            }}
          >
            <Space direction="vertical" size={0}>
              <Title
                level={5}
                style={{ margin: 0, fontSize: 16, letterSpacing: "-0.3px" }}
              >
                {data.client.fullName}
              </Title>
              <Text
                strong
                style={{ fontSize: 12, color: theme.colors.success }}
              >
                {data.client.phone.number}
              </Text>
            </Space>

            <Space size={4}>
              <IconAction
                tooltipTitle="Vista rápida"
                onClick={() => setIsDrawerOpen(true)}
                size={24}
                icon={faEye}
                iconStyles={{ color: () => theme.colors.info }}
              />
              <IconAction
                tooltipTitle="WhatsApp"
                onClick={() => window.open(waLink, "_blank")}
                size={24}
                icon={faWhatsapp}
                iconStyles={{ color: () => theme.colors.success }}
              />
              <IconAction
                tooltipTitle="Email"
                onClick={() => ""}
                size={24}
                icon={faEnvelope}
                iconStyles={{ color: () => theme.colors.warning }}
              />
              {/*<IconAction*/}
              {/*  tooltipTitle="Nueva Página"*/}
              {/*  onClick={onOpenPage}*/}
              {/*  size={24}*/}
              {/*  icon={faArrowUpRightFromSquare}*/}
              {/*  iconStyles={{ color: () => theme.colors.error }}*/}
              {/*/>*/}
            </Space>
          </div>

          <CompactGrid>
            <DataItem label="Equipo" value={data.device.model} />
            <DataItem
              label="Distrito"
              value={data.location.district}
              icon={faHouseSignal}
            />
            <DataItem label="Prioridad" value={isHigh ? "ALTA" : "NORMAL"} />
          </CompactGrid>

          <div style={{ marginBottom: 16 }}>
            <Space size={6} style={{ marginBottom: 4 }}>
              <FontAwesomeIcon
                icon={faTriangleExclamation}
                style={{ color: "#faad14", fontSize: 10 }}
              />
              <Text strong style={{ fontSize: 10, color: "#8c8c8c" }}>
                SÍNTOMAS REPORTADOS
              </Text>
            </Space>
            <Paragraph
              ellipsis={{ rows: 1 }}
              style={{
                margin: 0,
                fontSize: 12,
                color: "rgba(255,255,255,0.85)",
              }}
            >
              {data.issueDescription}
            </Paragraph>
          </div>

          <Space direction="vertical" style={{ width: "100%" }} size={10}>
            <Select
              placeholder="Asignar técnico encargado"
              style={{ width: "100%" }}
              size="middle"
              onChange={(val) => setSelectedTech(val)}
              options={TECHNICIANS.map((t) => ({
                label: t.label,
                value: t.value,
              }))}
            />
            <Button
              type="primary"
              block
              icon={
                <FontAwesomeIcon
                  icon={selectedTech ? faLaptopMedical : faChevronRight}
                />
              }
              style={{ height: 38, fontWeight: 700, borderRadius: "6px" }}
            >
              {selectedTech
                ? `ASIGNAR A ${techName?.split(" ")[0].toUpperCase()}`
                : "ACEPTAR SOLICITUD"}
            </Button>
          </Space>

          <div
            style={{
              marginTop: 14,
              textAlign: "center",
              borderTop: `1px solid rgba(255,255,255,0.05)`,
              paddingTop: 10,
            }}
          >
            <Text
              type="secondary"
              style={{
                fontSize: 9,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: 4,
              }}
            >
              <FontAwesomeIcon icon={faCalendarCheck} style={{ fontSize: 8 }} />
              SOLICITUD RECIBIDA A LAS {formattedTime}
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
