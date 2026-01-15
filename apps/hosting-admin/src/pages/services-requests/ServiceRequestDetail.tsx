import React, { useMemo, useEffect } from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTools,
  faMapMarkerAlt,
  faUser,
  faPhoneAlt,
  faEnvelope,
  faClipboardList,
  faClock,
  faIdCard,
  faRoute,
} from "@fortawesome/free-solid-svg-icons";
import {
  Typography,
  Tag,
  Row,
  Col,
  Divider,
  Space,
  Button,
} from "../../components";
import { MapContainer, TileLayer, Marker, useMap } from "react-leaflet";
import L from "leaflet";
import dayjs from "dayjs";
import "leaflet/dist/leaflet.css";
import { getDevice } from "../../utils";

const { Title, Text, Paragraph } = Typography;

const DefaultIcon = L.icon({
  iconUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

const RecenterMap = ({ coords }: { coords: [number, number] }) => {
  const map = useMap();
  useEffect(() => {
    setTimeout(() => {
      map.invalidateSize();
      map.setView(coords, 16);
    }, 250);
  }, [map, coords]);
  return null;
};

const ModalContainer = styled.div`
  background: #0a0a0a;
  color: #fff;
  border-radius: 28px;
  overflow: hidden;
  border: 1px solid #1a1a1a;
`;

const MapWrapper = styled.div`
  width: 100%;
  height: 280px;
  position: relative;
  border-bottom: 1px solid #1a1a1a;

  .leaflet-container {
    height: 100%;
    width: 100%;
    background: #0d0d0d;
    filter: invert(100%) hue-rotate(180deg) brightness(95%) contrast(85%);
  }
`;

const NavButton = styled(Button)`
  position: absolute;
  top: 20px;
  right: 20px;
  z-index: 1000;
  background: #fadb14 !important;
  color: #000 !important;
  border: none !important;
  font-weight: 800 !important;
  border-radius: 12px !important;
  height: 40px !important;
  box-shadow: 0 4px 15px rgba(250, 219, 20, 0.4) !important;

  &:hover {
    transform: scale(1.05);
    background: #fff !important;
  }
`;

const SectionBox = styled.div`
  background: #111111;
  border-radius: 24px;
  padding: 24px;
  border: 1px solid #1a1a1a;
  height: 100%;
`;

const InfoItem = React.memo(
  ({ icon, label, value, color = "#fadb14" }: any) => (
    <div style={{ marginBottom: "18px", display: "flex", gap: "16px" }}>
      <div
        style={{
          color,
          minWidth: "32px",
          height: "32px",
          background: `${color}15`,
          borderRadius: "10px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: "14px",
        }}
      >
        <FontAwesomeIcon icon={icon} />
      </div>
      <div style={{ flex: 1 }}>
        <Text
          style={{
            color: "#444",
            fontSize: "10px",
            display: "block",
            fontWeight: 800,
            textTransform: "uppercase",
            letterSpacing: "1px",
          }}
        >
          {label}
        </Text>
        <Text style={{ color: "#ddd", fontSize: "14px", fontWeight: 500 }}>
          {value || "---"}
        </Text>
      </div>
    </div>
  )
);

export const ServiceRequestDetail: React.FC<any> = ({ serviceRequest }) => {
  const memoizedData = useMemo(() => {
    if (!serviceRequest) return null;

    const date = serviceRequest.createAt?.toDate
      ? serviceRequest.createAt.toDate()
      : serviceRequest.createAt;
    const lat = parseFloat(serviceRequest.location?.geoPoint?.lat || "0");
    const lng = parseFloat(serviceRequest.location?.geoPoint?.lng || "0");

    return {
      position: [lat, lng] as [number, number],
      timeAgo: dayjs(date).fromNow(),
      clientName: `${serviceRequest.client?.firstName} ${serviceRequest.client?.paternalSurname}`,
      companyName: `${serviceRequest.client?.companyName}`,
    };
  }, [serviceRequest]);

  const handleOpenMaps = () => {
    if (!memoizedData) return;
    const [lat, lng] = memoizedData.position;

    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

    if (isMobile) {
      window.open(
        `https://www.google.com/maps/search/?api=1&query=${lat},${lng}`,
        "_blank"
      );
    } else {
      window.open(`https://www.google.com/maps?q=${lat},${lng}`, "_blank");
    }
  };

  if (!memoizedData || !serviceRequest) return null;

  return (
    <ModalContainer>
      <MapWrapper>
        <NavButton
          onClick={handleOpenMaps}
          icon={<FontAwesomeIcon icon={faRoute} />}
        >
          VER EN GOOGLE MAPS
        </NavButton>
        <MapContainer
          center={memoizedData.position}
          zoom={16}
          scrollWheelZoom={true}
          zoomControl={false}
          attributionControl={false}
        >
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
          <Marker position={memoizedData.position} icon={DefaultIcon} />
          <RecenterMap coords={memoizedData.position} />
        </MapContainer>
        <div
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            height: "40px",
            background: "linear-gradient(to top, #0a0a0a, transparent)",
            zIndex: 1000,
            pointerEvents: "none",
          }}
        />
      </MapWrapper>

      <div style={{ padding: "32px 28px" }}>
        <Row gutter={[24, 24]}>
          <Col span={24}>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Space size={16}>
                <div
                  style={{
                    background: "#fadb14",
                    width: "48px",
                    height: "48px",
                    borderRadius: "14px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <FontAwesomeIcon
                    icon={faTools}
                    style={{ color: "#000", fontSize: "20px" }}
                  />
                </div>
                <div>
                  <Title
                    level={5}
                    style={{
                      color: "#fff",
                      margin: 0,
                      fontWeight: 900,
                      lineHeight: 1.2,
                    }}
                  >
                    {getDevice(serviceRequest?.device) || "-"}
                  </Title>
                </div>
              </Space>
            </div>
            <Tag
              color="gold"
              style={{
                borderRadius: "8px",
                fontWeight: 800,
                border: "none",
                padding: "6px 16px",
                marginTop: "0.8em",
                textTransform: "uppercase",
              }}
            >
              {serviceRequest.status}
            </Tag>
          </Col>

          <Col xs={24} md={13}>
            <SectionBox>
              <div
                style={{
                  marginBottom: "20px",
                  display: "flex",
                  alignItems: "center",
                  gap: "10px",
                }}
              >
                <FontAwesomeIcon
                  icon={faClipboardList}
                  style={{ color: "#fadb14" }}
                />
                <Text
                  style={{
                    color: "#fadb14",
                    fontWeight: 800,
                    fontSize: "12px",
                    letterSpacing: "1px",
                  }}
                >
                  DESCRIPCIÓN DEL REPORTE
                </Text>
              </div>
              <Paragraph
                style={{
                  color: "#999",
                  fontSize: "15px",
                  lineHeight: "1.7",
                  margin: 0,
                }}
              >
                {serviceRequest.problemDescription}
              </Paragraph>

              <Divider style={{ borderColor: "#1a1a1a", margin: "24px 0" }} />

              <InfoItem
                icon={faMapMarkerAlt}
                label="Dirección de Atención"
                value={serviceRequest.location?.address}
              />
              <Button
                type="link"
                onClick={handleOpenMaps}
                style={{
                  color: "#fadb14",
                  padding: 0,
                  fontSize: "13px",
                  fontWeight: 700,
                }}
              >
                Abrir en Google Maps / Waze
              </Button>
            </SectionBox>
          </Col>

          <Col xs={24} md={11}>
            <SectionBox>
              <div
                style={{
                  marginBottom: "24px",
                  display: "flex",
                  alignItems: "center",
                  gap: "10px",
                }}
              >
                <FontAwesomeIcon icon={faUser} style={{ color: "#fadb14" }} />
                <Text
                  style={{
                    color: "#fadb14",
                    fontWeight: 800,
                    fontSize: "12px",
                    letterSpacing: "1px",
                  }}
                >
                  INFORMACIÓN DEL CLIENTE
                </Text>
              </div>
              {serviceRequest.client?.document.type === "dni" ? (
                <InfoItem
                  icon={faUser}
                  label="Cliente"
                  value={memoizedData?.clientName}
                />
              ) : (
                <InfoItem
                  icon={faUser}
                  label="Cliente"
                  value={memoizedData?.companyName}
                />
              )}

              <InfoItem
                icon={faIdCard}
                label={serviceRequest.client?.document?.type}
                value={serviceRequest.client?.document?.number}
              />
              <InfoItem
                icon={faPhoneAlt}
                label="Celular"
                value={`${serviceRequest.client?.phone?.prefix} ${serviceRequest.client?.phone?.number}`}
                color="#52c41a"
              />
              <InfoItem
                icon={faEnvelope}
                label="Correo"
                value={serviceRequest.client?.email}
              />
              <InfoItem
                icon={faClock}
                label="Hace cuanto"
                value={memoizedData.timeAgo}
              />
            </SectionBox>
          </Col>
        </Row>
      </div>
    </ModalContainer>
  );
};
