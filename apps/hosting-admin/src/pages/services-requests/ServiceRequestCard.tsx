import React, { useCallback } from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCalendarAlt,
  faTools,
  faExternalLinkAlt,
  faLocationArrow,
} from "@fortawesome/free-solid-svg-icons";
import { Card, Tag, Typography, Button, Space } from "../../components";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import "dayjs/locale/es";
import { ServiceRequestsStatus } from "../../data-list";
import { getDevice } from "../../utils";
import type { ServiceRequest } from "../../globalTypes.ts";
import { useNavigate } from "react-router-dom";

dayjs.extend(relativeTime);
dayjs.locale("es");
const { Text, Title } = Typography;

const COLORS = {
  cardBg: "#0d0d0d",
  innerBox: "#161616",
  border: "#222222",
  textPrimary: "#ffffff",
  textSecondary: "#777777",
  accent: "#fadb14",
  accentDark: "#c4a706",
};

const StyledCard = styled(Card)`
  background: ${COLORS.cardBg} !important;
  border-radius: 24px !important;
  border: 1px solid ${COLORS.border} !important;
  box-shadow: 0 12px 40px rgba(0, 0, 0, 0.6) !important;
  overflow: hidden;
  transition: all 0.3s cubic-bezier(0.19, 1, 0.22, 1) !important;

  &:hover {
    transform: translateY(-10px);
    border-color: ${COLORS.accent} !important;
    box-shadow: 0 0 20px rgba(250, 219, 20, 0.15) !important;
  }

  .ant-card-cover {
    position: relative;
    height: 190px;
    overflow: hidden;
    filter: saturate(1.2) brightness(0.85);
  }
`;

const MapOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(
    180deg,
    rgba(13, 13, 13, 0.2) 0%,
    rgba(13, 13, 13, 0.9) 100%
  );
`;

const GlassTag = styled.div`
  background: rgba(0, 0, 0, 0.7);
  backdrop-filter: blur(12px);
  padding: 8px 16px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  gap: 10px;
  color: ${COLORS.accent};
  font-size: 11px;
  font-weight: 800;
  letter-spacing: 0.8px;
  border: 1px solid rgba(250, 219, 20, 0.3);
`;

const ClientBox = styled.div`
  background: ${COLORS.innerBox};
  border-radius: 20px;
  padding: 16px;
  margin-bottom: 24px;
  border: 1px solid ${COLORS.border};
  display: flex;
  align-items: center;
  gap: 14px;
`;

const Avatar = styled.div`
  width: 44px;
  height: 44px;
  border-radius: 14px;
  background: ${COLORS.accent};
  display: flex;
  justify-content: center;
  align-items: center;
  color: #000;
  font-weight: 900;
  font-size: 16px;
  box-shadow: 0 4px 15px rgba(250, 219, 20, 0.4);
  flex-shrink: 0;
`;

const ActionButton = styled(Button)`
  border-radius: 16px !important;
  height: 52px !important;
  font-weight: 700 !important;
  background: transparent !important;
  border: 2px solid ${COLORS.border} !important;
  color: ${COLORS.textPrimary} !important;
  transition: all 0.2s !important;

  &:hover {
    border-color: ${COLORS.textSecondary} !important;
    transform: scale(1.05);
  }
`;

const QuoteButton = styled(Button)`
  flex: 1;
  border-radius: 16px !important;
  height: 52px !important;
  font-weight: 800 !important;
  background: ${COLORS.accent} !important;
  color: #000 !important;
  border: none !important;
  box-shadow: 0 6px 20px rgba(250, 219, 20, 0.3) !important;
  font-size: 15px !important;
  letter-spacing: 0.5px;

  &:hover {
    background: #fff !important;
    transform: scale(1.02);
    box-shadow: 0 8px 25px rgba(255, 255, 255, 0.2) !important;
  }
`;

interface ServiceRequestCardProps {
  request: ServiceRequest;
  onShowServiceDetail: (request: ServiceRequest) => void;
}

export const ServicesRequestCard: React.FC<ServiceRequestCardProps> = ({
  request,
  onShowServiceDetail,
}) => {
  const navigate = useNavigate();

  const handleNavigateQuote = useCallback(
    (request: ServiceRequest) => {
      navigate(`/quotations/new`, { state: { serviceRequest: request } });
    },
    [navigate]
  );

  const statusConfig =
    ServiceRequestsStatus[
      request.status as keyof typeof ServiceRequestsStatus
    ] || ServiceRequestsStatus.pending;

  const isRuc = request.client?.document?.type === "ruc";

  const clientDisplayName = isRuc
    ? request.client?.companyName
    : `${request.client?.firstName} ${request.client?.paternalSurname}`;

  const initials = isRuc
    ? request.client?.companyName?.charAt(0) || "R"
    : `${request.client?.firstName?.charAt(0) || ""}${request.client?.paternalSurname?.charAt(0) || ""}`;

  const date = request.createAt?.toDate
    ? request.createAt.toDate()
    : request.createAt;

  const staticMapUrl = `https://static-maps.yandex.ru/1.x/?lang=es_PE&ll=${request.location?.geoPoint?.lng},${request.location?.geoPoint?.lat}&z=14&l=map&size=450,250&pt=${request.location?.geoPoint?.lng},${request.location?.geoPoint?.lat},pm2rdm`;

  return (
    <StyledCard
      hoverable
      bodyStyle={{ padding: "24px" }}
      cover={
        <>
          <img
            alt="map"
            src={staticMapUrl}
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
          />
          <MapOverlay />
          <div style={{ position: "absolute", top: "15px", left: "15px" }}>
            <Tag
              style={{
                borderRadius: "8px",
                border: "none",
                fontWeight: 900,
                padding: "4px 12px",
                fontSize: "11px",
                background: statusConfig.color,
                color: "#000",
                textTransform: "uppercase",
              }}
            >
              {statusConfig.text}
            </Tag>
          </div>
          <div style={{ position: "absolute", bottom: "15px", left: "15px" }}>
            <GlassTag>
              <FontAwesomeIcon icon={faLocationArrow} />

              <span>DISTRITO IDENTIFICADO</span>
            </GlassTag>
          </div>{" "}
        </>
      }
    >
      <div style={{ marginBottom: "20px" }}>
        <Title
          level={4}
          style={{
            margin: "0 0 4px 0",
            fontSize: "20px",
            fontWeight: 900,
            color: COLORS.textPrimary,
            letterSpacing: "-0.5px",
          }}
        >
          <FontAwesomeIcon
            icon={faTools}
            style={{ marginRight: "12px", color: COLORS.accent }}
          />
          {getDevice(request?.device) || "Equipo"}
        </Title>
        <Space
          style={{
            fontSize: "12px",
            color: COLORS.textSecondary,
            fontWeight: 500,
          }}
        >
          <FontAwesomeIcon icon={faCalendarAlt} />

          <span>SOLICITADO {dayjs(date).fromNow().toUpperCase()}</span>
        </Space>
      </div>

      <ClientBox>
        <Avatar>{initials.toUpperCase()}</Avatar>
        <div style={{ flex: 1, minWidth: 0 }}>
          <Text
            strong
            style={{
              display: "block",
              fontSize: "15px",
              color: COLORS.textPrimary,
            }}
            ellipsis
          >
            {clientDisplayName}
          </Text>
          <Text
            style={{
              fontSize: "12px",
              color: COLORS.textSecondary,
              display: "block",
            }}
            ellipsis
          >
            {request.location?.address}
          </Text>
        </div>
      </ClientBox>

      <div style={{ display: "flex", gap: "12px" }}>
        <ActionButton onClick={() => onShowServiceDetail(request)}>
          <FontAwesomeIcon icon={faExternalLinkAlt} size="lg" />
        </ActionButton>

        <QuoteButton
          type="primary"
          onClick={() => handleNavigateQuote(request)}
        >
          COTIZAR AHORA
        </QuoteButton>
      </div>
    </StyledCard>
  );
};
