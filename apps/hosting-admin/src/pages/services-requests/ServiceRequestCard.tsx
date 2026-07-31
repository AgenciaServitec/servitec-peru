import React, { useState } from "react";
import {
  Button,
  CanAccess,
  Card,
  IconAction,
  Select,
  Space,
  Tag,
  Typography,
} from "../../components";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCalendarCheck,
  faChevronRight,
  faEnvelope,
  faEye,
  faHouseSignal,
  faLaptopMedical,
  faMapLocationDot,
  faTriangleExclamation,
} from "@fortawesome/free-solid-svg-icons";
import { faWhatsapp } from "@fortawesome/free-brands-svg-icons";
import { ServiceDetailsDrawer } from "./ServiceDetailsDrawer.tsx";
import { theme } from "../../styles";
import dayjs from "dayjs";
import {
  updateMobileServiceRequest,
  updateServiceRequest,
} from "../../firebase/collections";
import { useDefaultFirestoreProps } from "../../hooks";
import { SERVICE_REQUEST_STATUS } from "../../data-list/serviceRequestStatus.ts";
import { PRIORITY_LEVELS } from "../../data-list/serviceRequestPriorityLevels.ts";
import { useNavigate } from "react-router-dom";
import { capitalize } from "lodash";
import { DISTRICTS } from "../../data-list";

const { Text, Title, Paragraph } = Typography;

const MapContainer = styled.div<{ $bgImage: string }>`
  height: 115px;
  position: relative;
  background-image:
    linear-gradient(rgba(0, 0, 0, 0.1), rgba(0, 0, 0, 0.4)),
    url(${(props) => props.$bgImage});
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
  transition: background-image 0.3s ease;
`;

const Content = styled.div`
  padding: 16px;
`;

const CompactGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(85px, 1fr));
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
        {value || "-"}
      </Text>
    </Space>
  </Space>
);

export const ServiceRequestCard: React.FC<any> = ({
  users,
  user,
  data,
  source,
}) => {
  const navigate = useNavigate();
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [selectedTech, setSelectedTech] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const { assignUpdateProps } = useDefaultFirestoreProps();

  const technicians = users?.map((u) => ({
    label: `${capitalize(u.firstName)} ${capitalize(u.paternalSurname)} ${capitalize(u.maternalSurname || "")}`,
    value: u.id,
  }));

  const isHigh = data.priority === "high";
  const waLink = `https://wa.me/${data.client?.phone?.prefix?.replace("+", "") || "51"}${data.client?.phone?.number}`;
  const mailto = `mailto:${data.client?.email}`;
  const techName = technicians?.find((t) => t.value === selectedTech)?.label;

  const formattedTime = data.createAt
    ? dayjs(data.createAt.toDate()).format("hh:mm A DD/MM/YYYY")
    : data.requestTime || "--:--";

  const onServiceRequestAccepted = async (serviceRequest) => {
    try {
      setLoading(true);
      const finalTechId = selectedTech || user.id;

      if (!finalTechId) return;

      const updateData = assignUpdateProps({
        technicalId: finalTechId,
        status: "inProgress",
      });

      if (source === "web") {
        await updateServiceRequest(serviceRequest.id, updateData);
      } else {
        await updateMobileServiceRequest(serviceRequest.id, updateData);
      }

      setSelectedTech(null);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(true);
      setTimeout(() => setLoading(false), 500);
    }
  };

  const onRequestQuotation = (serviceRequest) => {
    navigate(`/quotation/new`, {
      state: { quotationData: JSON.stringify(serviceRequest) },
    });
  };

  const getStatusInfo = (statusValue: string) => {
    return (
      SERVICE_REQUEST_STATUS.find((s) => s.value === statusValue) ||
      SERVICE_REQUEST_STATUS[0]
    );
  };

  const getPriorityInfo = (priorityValue: string) => {
    return (
      PRIORITY_LEVELS.find((p) => p.value === priorityValue) ||
      PRIORITY_LEVELS[1]
    );
  };

  const statusInfo = getStatusInfo(data.status);
  const priorityInfo = getPriorityInfo(data.priority);

  const lat = data.location?.lat || data.location?.geoPoint?.lat;
  const lng = data.location?.lng || data.location?.geoPoint?.lng;
  const addressString =
    data.location?.exactAddress || data.location?.address || "";

  const googleApiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;

  const mapUrl =
    lat && lng
      ? `https://maps.googleapis.com/maps/api/staticmap?center=${lat},${lng}&zoom=15&size=400x150&markers=color:red%7C${lat},${lng}&key=${googleApiKey}`
      : "https://placehold.co/400x150/141414/8c8c8c?text=Ubicación+no+disponible";

  const findDistrict = (district) =>
    DISTRICTS.find(
      (_district) => _district.value?.toLowerCase() === district?.toLowerCase()
    );

  return (
    <>
      <Card
        style={{ width: 345, padding: 0, overflow: "hidden" }}
        bodyStyle={{ padding: 0 }}
      >
        <MapContainer $bgImage={mapUrl}>
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
              style={{
                border: `1px solid ${statusInfo.color}`,
                fontSize: 10,
                display: "flex",
                alignItems: "center",
              }}
            >
              <FontAwesomeIcon
                icon={statusInfo.icon}
                style={{ fontSize: 9, marginRight: 5, color: statusInfo.color }}
              />
              {statusInfo.label.toUpperCase()}
            </Tag>
            <Tag
              style={{
                fontSize: 10,
                display: "flex",
                alignItems: "center",
                border: `1px solid ${priorityInfo.color}`,
              }}
            >
              <FontAwesomeIcon
                icon={priorityInfo.icon}
                style={{
                  fontSize: 9,
                  marginRight: 5,
                  color: priorityInfo.color,
                }}
              />
              {priorityInfo.label.toUpperCase()}
            </Tag>
          </div>

          <Button
            type="primary"
            size="small"
            icon={<FontAwesomeIcon icon={faMapLocationDot} />}
            onClick={() => {
              const destination =
                lat && lng
                  ? `${lat},${lng}`
                  : encodeURIComponent(`${addressString}, Lima, Peru`);
              window.open(
                `https://www.google.com/maps/dir/?api=1&destination=${destination}`,
                "_blank"
              );
            }}
            style={{
              position: "absolute",
              bottom: 10,
              right: 10,
              width: 34,
              height: 34,
              borderRadius: "8px",
              backgroundColor: lat && lng ? theme.colors.info : "#595959",
              borderColor: lat && lng ? theme.colors.info : "#595959",
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
            <Space
              direction="vertical"
              size={0}
              style={{ flex: 1, marginRight: 8 }}
            >
              <Title
                level={5}
                style={{
                  margin: 0,
                  fontSize: 15,
                  letterSpacing: "-0.3px",
                  textTransform: "capitalize",
                }}
              >
                {data.client?.fullName ||
                  data.client?.companyName ||
                  data.client?.names}
              </Title>
              <Text
                strong
                style={{ fontSize: 12, color: theme.colors.success }}
              >
                {data.client?.phone?.number}
              </Text>
            </Space>

            <Space size={4}>
              <CanAccess permission="service_quick_view">
                <IconAction
                  tooltipTitle="Vista rápida"
                  onClick={() => setIsDrawerOpen(true)}
                  size={30}
                  icon={faEye}
                  iconStyles={{ color: () => theme.colors.info }}
                />
              </CanAccess>
              <IconAction
                tooltipTitle="WhatsApp"
                onClick={() => window.open(waLink, "_blank")}
                size={30}
                icon={faWhatsapp}
                iconStyles={{ color: () => theme.colors.success }}
              />
              <IconAction
                tooltipTitle="Email"
                onClick={() => (window.location.href = mailto)}
                size={30}
                icon={faEnvelope}
                iconStyles={{ color: () => theme.colors.warning }}
              />
            </Space>
          </div>

          <CompactGrid>
            <DataItem
              label="Equipo"
              value={data.device?.model || data.device}
            />
            <DataItem
              label="Distrito"
              value={
                findDistrict(data.location?.district)?.label ||
                data.location?.district
              }
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
              style={{ margin: 0, fontSize: 12 }}
            >
              {data.issueDescription || data.problemDescription}
            </Paragraph>
          </div>

          <Space direction="vertical" style={{ width: "100%" }} size={10}>
            <CanAccess permission="service_assign_tech">
              {!data?.technicalId && (
                <Select
                  placeholder="Asignar técnico encargado"
                  style={{ width: "100%" }}
                  size="middle"
                  onChange={(val) => setSelectedTech(val)}
                  options={technicians}
                />
              )}
            </CanAccess>
            <CanAccess permission="service_accept">
              {!data?.technicalId ? (
                <Button
                  type="primary"
                  block
                  danger={!!selectedTech}
                  icon={
                    <FontAwesomeIcon
                      icon={selectedTech ? faLaptopMedical : faChevronRight}
                    />
                  }
                  style={{
                    height: 38,
                    fontWeight: 700,
                    borderRadius: "6px",
                    backgroundColor: selectedTech ? "#52c41a" : "",
                    borderColor: selectedTech ? "#52c41a" : "",
                  }}
                  onClick={() => onServiceRequestAccepted(data)}
                  loading={loading}
                >
                  {selectedTech
                    ? `ASIGNAR A ${techName?.split(" ")[0].toUpperCase()}`
                    : "ACEPTAR SOLICITUD"}
                </Button>
              ) : (
                <Button
                  type="primary"
                  block
                  icon={<FontAwesomeIcon icon={faChevronRight} />}
                  style={{ height: 38, fontWeight: 700, borderRadius: "6px" }}
                  onClick={() => onRequestQuotation(data)}
                >
                  COTIZAR
                </Button>
              )}
            </CanAccess>
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
                fontSize: 12,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: 4,
              }}
            >
              <FontAwesomeIcon
                icon={faCalendarCheck}
                style={{ fontSize: 10 }}
              />
              SOLICITUD RECIBIDA A LAS
              <span
                style={{
                  color: "#04FFF7",
                }}
              >
                {formattedTime}
              </span>
            </Text>
          </div>
        </Content>
      </Card>

      <ServiceDetailsDrawer
        open={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        data={data}
        source={source}
      />
    </>
  );
};
