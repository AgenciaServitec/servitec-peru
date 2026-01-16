import React, { useCallback, useMemo } from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCalendarAlt,
  faTools,
  faExternalLinkAlt,
  faLocationArrow,
  faCheck,
  faX,
} from "@fortawesome/free-solid-svg-icons";
import { Card, Tag, Typography, Button } from "../../components";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import "dayjs/locale/es";
import { ServiceRequestsStatus } from "../../data-list";
import { getDevice } from "../../utils";
import type { ServiceRequest } from "../../globalTypes.ts";
import { useAcceptService, useCancelService } from "./_utils";
import { useNavigate } from "react-router-dom";
import { useAuthentication } from "../../providers";

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
  success: "#52c41a",
  cancel: "#ef0a0a",
};

const StyledCard = styled(Card)`
  background: ${COLORS.cardBg} !important;
  border-radius: 28px !important;
  border: 1px solid ${COLORS.border} !important;
  box-shadow: 0 12px 40px rgba(0, 0, 0, 0.6) !important;
  overflow: hidden;
  transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275) !important;

  &:hover {
    transform: translateY(-8px);
    border-color: ${COLORS.accent}66 !important;
  }
`;

const AcceptFloatingButton = styled.button`
  position: absolute;
  top: 15px;
  right: 15px;
  z-index: 10;
  background: ${COLORS.success};
  color: white;
  border: none;
  padding: 8px 16px;
  border-radius: 12px;
  font-weight: 800;
  font-size: 12px;
  display: flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
  box-shadow: 0 4px 15px rgba(82, 196, 26, 0.4);
  transition: all 0.2s ease;

  &:hover {
    transform: scale(1.05);
    background: #73d13d;
    box-shadow: 0 6px 20px rgba(82, 196, 26, 0.6);
  }

  &:active {
    transform: scale(0.95);
  }
`;

const CancelFloatingButton = styled.button`
  position: absolute;
  top: 15px;
  right: 15px;
  z-index: 10;
  background: ${COLORS.success};
  color: white;
  border: none;
  padding: 8px 16px;
  border-radius: 12px;
  font-weight: 800;
  font-size: 12px;
  display: flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
  box-shadow: 0 4px 15px rgba(154, 0, 0, 0.4);
  transition: all 0.2s ease;

  &:hover {
    transform: scale(1.05);
    background: #ff4949;
    box-shadow: 0 6px 20px rgba(151, 13, 13, 0.6);
  }

  &:active {
    transform: scale(0.95);
  }
`;

const GlassTag = styled.div`
  background: rgba(0, 0, 0, 0.6);
  backdrop-filter: blur(8px);
  padding: 6px 14px;
  border-radius: 10px;
  display: flex;
  align-items: center;
  gap: 8px;
  color: ${COLORS.accent};
  font-size: 10px;
  font-weight: 700;
  border: 1px solid rgba(255, 255, 255, 0.1);
`;

const ClientBox = styled.div`
  background: ${COLORS.innerBox};
  border-radius: 18px;
  padding: 14px;
  margin-bottom: 20px;
  border: 1px solid ${COLORS.border};
  display: flex;
  align-items: center;
  gap: 12px;
`;

const Avatar = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 12px;
  background: linear-gradient(135deg, ${COLORS.accent} 0%, #f1c40f 100%);
  display: flex;
  justify-content: center;
  align-items: center;
  color: #000;
  font-weight: 900;
  flex-shrink: 0;
`;

const QuoteButton = styled(Button)`
  flex: 1;
  border-radius: 14px !important;
  height: 48px !important;
  font-weight: 800 !important;
  background: ${COLORS.accent} !important;
  color: #000 !important;
  border: none !important;
  font-size: 14px !important;
  text-transform: uppercase;
  letter-spacing: 0.5px;

  &:hover {
    background: #fff !important;
    box-shadow: 0 0 20px ${COLORS.accent}44 !important;
  }
`;

const DetailIconBtn = styled(Button)`
  width: 48px !important;
  height: 48px !important;
  border-radius: 14px !important;
  background: ${COLORS.innerBox} !important;
  border: 1px solid ${COLORS.border} !important;
  color: ${COLORS.textSecondary} !important;

  &:hover {
    color: ${COLORS.accent} !important;
    border-color: ${COLORS.accent} !important;
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

  const { authUser } = useAuthentication();

  const { acceptRequest, isAccepting } = useAcceptService();
  const { cancelRequest, isCanceling } = useCancelService();

  const handleAcceptClick = async (e: React.MouseEvent) => {
    e.stopPropagation();
    await acceptRequest(request.id, authUser.id);
  };
  const handleCancelClick = async (e: React.MouseEvent) => {
    e.stopPropagation();
    await cancelRequest(request.id);
  };

  const handleNavigateQuote = useCallback(() => {
    navigate(`/quotations/new`, { state: { serviceRequest: request } });
  }, [navigate, request]);

  const clientInfo = useMemo(() => {
    const isRuc = request.client?.document?.type === "ruc";
    return {
      name: isRuc
        ? request.client?.companyName
        : `${request.client?.firstName} ${request.client?.paternalSurname}`,
      initials:
        (isRuc
          ? request.client?.companyName?.charAt(0)
          : `${request.client?.firstName?.charAt(0)}${request.client?.paternalSurname?.charAt(0)}`) ||
        "S",
      date: request.createAt?.toDate
        ? request.createAt.toDate()
        : request.createAt,
    };
  }, [request]);

  const statusConfig =
    ServiceRequestsStatus[
      request.status as keyof typeof ServiceRequestsStatus
    ] || ServiceRequestsStatus.pending;

  return (
    <StyledCard
      bodyStyle={{ padding: "20px" }}
      cover={
        <div style={{ position: "relative", height: "180px" }}>
          <img
            alt="location"
            src={`https://static-maps.yandex.ru/1.x/?lang=es_PE&ll=${request.location?.geoPoint?.lng},${request.location?.geoPoint?.lat}&z=14&l=map&size=450,250&pt=${request.location?.geoPoint?.lng},${request.location?.geoPoint?.lat},pm2rdm`}
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
          />
          <div
            style={{
              position: "absolute",
              inset: 0,
              background:
                "linear-gradient(to bottom, rgba(0,0,0,0.3), rgba(13,13,13,1))",
            }}
          />

          {request.status === "pending" ? (
            <AcceptFloatingButton
              onClick={handleAcceptClick}
              disabled={isAccepting}
              style={{
                background: isAccepting ? COLORS.border : COLORS.success,
                cursor: isAccepting ? "not-allowed" : "pointer",
              }}
            >
              <FontAwesomeIcon icon={faCheck} spin={isAccepting} />
              {isAccepting ? "ACEPTANDO..." : "ACEPTAR"}
            </AcceptFloatingButton>
          ) : (
            <CancelFloatingButton
              onClick={handleCancelClick}
              disabled={isAccepting}
              style={{
                background: isAccepting ? COLORS.border : COLORS.cancel,
                cursor: isAccepting ? "not-allowed" : "pointer",
              }}
            >
              <FontAwesomeIcon icon={faX} spin={isCanceling} />
              {isCanceling ? "CANCELANDO..." : "CANCELAR"}
            </CancelFloatingButton>
          )}

          <div style={{ position: "absolute", top: "15px", left: "15px" }}>
            <Tag
              color={statusConfig.color}
              style={{
                borderRadius: "6px",
                fontWeight: 800,
                border: "none",
                color: "#000",
              }}
            >
              {statusConfig.text.toUpperCase()}
            </Tag>
          </div>

          <div style={{ position: "absolute", bottom: "10px", left: "15px" }}>
            <GlassTag>
              <FontAwesomeIcon icon={faLocationArrow} />
              <span>UBICACIÓN</span>
            </GlassTag>
          </div>
        </div>
      }
    >
      <div style={{ marginBottom: "16px" }}>
        <Title level={5} style={{ color: "white", margin: 0, fontWeight: 800 }}>
          <FontAwesomeIcon
            icon={faTools}
            style={{ color: COLORS.accent, marginRight: "10px" }}
          />
          {getDevice(request?.device)}
        </Title>
        <Text
          style={{
            fontSize: "11px",
            color: COLORS.textSecondary,
            textTransform: "uppercase",
          }}
        >
          <FontAwesomeIcon
            icon={faCalendarAlt}
            style={{ marginRight: "6px" }}
          />
          {dayjs(clientInfo.date).fromNow()}
        </Text>
      </div>

      <ClientBox>
        <Avatar>{clientInfo.initials.toUpperCase()}</Avatar>
        <div style={{ flex: 1, minWidth: 0 }}>
          <Text
            strong
            style={{ color: "white", fontSize: "14px", display: "block" }}
            ellipsis
          >
            {clientInfo.name}
          </Text>
          <Text
            style={{
              color: COLORS.textSecondary,
              fontSize: "11px",
              display: "block",
            }}
            ellipsis
          >
            {request.location?.address}
          </Text>
        </div>
      </ClientBox>

      <div style={{ display: "flex", gap: "10px" }}>
        <DetailIconBtn onClick={() => onShowServiceDetail(request)}>
          <FontAwesomeIcon icon={faExternalLinkAlt} />
        </DetailIconBtn>

        <QuoteButton onClick={handleNavigateQuote}>
          Cotizar Servicio
        </QuoteButton>
      </div>
    </StyledCard>
  );
};
