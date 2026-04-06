import { useEffect, useState } from "react";
import styled, { css } from "styled-components";
import { Card, Progress, Spin } from "antd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faClock,
  faSignOutAlt,
  faUsers,
} from "@fortawesome/free-solid-svg-icons";
import type { Assistance } from "../../globalTypes.ts";
import { fetchTodayAllAssistances } from "../../firebase/collections";

export const AssistanceMonitor = () => {
  const [assistances, setAssistances] = useState<Assistance[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTodayAllAssistances().then((data) => {
      setAssistances(data || []);
      setLoading(false);
    });
  }, []);

  const workingNow = assistances.filter((a) => a.entry && !a.outlet?.date);
  const finishedToday = assistances.filter((a) => a.outlet?.date);
  const total = assistances.length || 1;
  const percentActive = Math.round((workingNow.length / total) * 100);

  if (loading) {
    return (
      <LoadingWrapper>
        <Spin tip="Sincronizando personal..." />
      </LoadingWrapper>
    );
  }

  return (
    <MonitorCard>
      <HeaderGroup>
        <div className="title-section">
          <SectionTitle>Estado del personal (Hoy)</SectionTitle>
          <div className="summary-info">
            <FontAwesomeIcon icon={faUsers} />
            <span>
              {workingNow.length} activos de {assistances.length} registros
            </span>
          </div>
        </div>
        <ProgressContainer>
          <div className="progress-label">
            <span>Productividad</span>
            <span className="percent">{percentActive}%</span>
          </div>
          <Progress
            percent={percentActive}
            showInfo={false}
            strokeColor="#10B981" // Tu color success del theme
            trailColor="rgba(255,255,255,0.05)"
            size="small"
          />
        </ProgressContainer>
      </HeaderGroup>

      <div className="status-grid">
        <StatusColumn>
          <div className="column-header">
            <h4 className="active">En turno</h4>
            <span className="count-badge active">{workingNow.length}</span>
          </div>
          <div className="user-list">
            {workingNow.length > 0 ? (
              workingNow.map((a) => (
                <UserCard key={a.id}>
                  <div className="avatar-mini">{a.user.firstName[0]}</div>
                  <div className="user-info">
                    <p className="name">
                      {a.user.firstName} {a.user.paternalSurname}
                    </p>
                    <div className="time-row">
                      <FontAwesomeIcon icon={faClock} />
                      <span>Entrada: {a.entry.date.split(" ")[1]}</span>
                    </div>
                  </div>
                  <StatusDot />
                </UserCard>
              ))
            ) : (
              <EmptyState>No hay personal operativo actualmente</EmptyState>
            )}
          </div>
        </StatusColumn>

        <StatusColumn>
          <div className="column-header">
            <h4 className="offline">Finalizaron</h4>
            <span className="count-badge">{finishedToday.length}</span>
          </div>
          <div className="user-list">
            {finishedToday.length > 0 ? (
              finishedToday.map((a) => (
                <UserCard key={a.id} className="finished">
                  <div className="avatar-mini gray">{a.user.firstName[0]}</div>
                  <div className="user-info">
                    <p className="name">{a.user.firstName}</p>
                    <span className="time">
                      Salió: {a.outlet.date.split(" ")[1]}
                    </span>
                  </div>
                  <FontAwesomeIcon icon={faSignOutAlt} className="out-icon" />
                </UserCard>
              ))
            ) : (
              <EmptyState>Nadie ha finalizado turno aún</EmptyState>
            )}
          </div>
        </StatusColumn>
      </div>
    </MonitorCard>
  );
};

const MonitorCard = styled(Card)`
  ${({ theme }) => css`
    background: ${theme.colors.bgSecondary};
    border: 1px solid ${theme.colors.border};
    border-radius: ${theme.border_radius.lg};

    .ant-card-body {
      padding: ${theme.spacing.lg};
    }

    .status-grid {
      display: grid;
      grid-template-columns: 1.2fr 0.8fr; /* Prioridad visual a los que están trabajando */
      gap: ${theme.spacing.xl};
    }

    @media (max-width: 992px) {
      .status-grid {
        grid-template-columns: 1fr;
        gap: ${theme.spacing.lg};
      }
    }
  `}
`;

const HeaderGroup = styled.div`
  ${({ theme }) => css`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: ${theme.spacing.xl};
    padding-bottom: ${theme.spacing.md};
    border-bottom: 1px solid ${theme.colors.divider};

    .title-section {
      .summary-info {
        display: flex;
        align-items: center;
        gap: ${theme.spacing.xs};
        color: ${theme.colors.fontTertiary};
        font-size: ${theme.font_sizes.xs};
        margin-top: ${theme.spacing.xs};
      }
    }
  `}
`;

const ProgressContainer = styled.div`
  ${({ theme }) => css`
    width: 160px;
    .progress-label {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: ${theme.spacing.xs};
      font-size: 11px;
      color: ${theme.colors.fontTertiary};
      letter-spacing: 0.5px;

      .percent {
        color: ${theme.colors.success};
        font-weight: ${theme.font_weight.large};
      }
    }
  `}
`;

const SectionTitle = styled.h2`
  ${({ theme }) => css`
    color: ${theme.colors.fontPrimary};
    font-size: ${theme.font_sizes.md};
    margin: 0;
    font-weight: ${theme.font_weight.large};
  `}
`;

const StatusColumn = styled.div`
  ${({ theme }) => css`
    .column-header {
      display: flex;
      align-items: center;
      gap: ${theme.spacing.sm};
      margin-bottom: ${theme.spacing.md};

      h4 {
        font-size: ${theme.font_sizes.sm};
        font-weight: ${theme.font_weight.medium};
        margin: 0;
        letter-spacing: 0.5px;

        &.active {
          color: ${theme.colors.success};
        }
        &.offline {
          color: ${theme.colors.fontTertiary};
        }
      }

      .count-badge {
        font-size: 10px;
        padding: 2px 8px;
        border-radius: ${theme.border_radius.xs};
        background: ${theme.colors.bgTertiary};
        color: ${theme.colors.fontTertiary};

        &.active {
          background: ${theme.colors.success}15;
          color: ${theme.colors.success};
        }
      }
    }

    .user-list {
      display: flex;
      flex-direction: column;
      gap: ${theme.spacing.sm};
    }
  `}
`;

const UserCard = styled.div`
  ${({ theme }) => css`
    display: flex;
    align-items: center;
    padding: ${theme.spacing.md};
    background: ${theme.colors.bgTertiary};
    border-radius: ${theme.border_radius.md};
    gap: ${theme.spacing.md};
    border: 1px solid transparent;
    transition: all ${theme.transitions.fast};

    &:hover {
      border-color: ${theme.colors.borderHover};
      background: ${theme.colors.bgHover};
      transform: translateX(4px);
    }

    &.finished {
      background: transparent;
      border: 1px dashed ${theme.colors.border};
      opacity: 0.6;

      &:hover {
        transform: none;
        border-color: ${theme.colors.fontTertiary};
      }
    }

    .avatar-mini {
      width: 36px;
      height: 36px;
      background: ${theme.colors.primaryAlpha};
      color: ${theme.colors.primary};
      border-radius: ${theme.border_radius.full};
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: ${theme.font_sizes.sm};
      font-weight: ${theme.font_weight.large};
      border: 1px solid ${theme.colors.primary}30;

      &.gray {
        background: ${theme.colors.bgHover};
        color: ${theme.colors.fontTertiary};
        border-color: ${theme.colors.border};
      }
    }

    .user-info {
      flex: 1;
      .name {
        color: ${theme.colors.fontPrimary};
        font-size: ${theme.font_sizes.sm};
        margin: 0;
        font-weight: ${theme.font_weight.medium};
      }
      .time-row {
        display: flex;
        align-items: center;
        gap: ${theme.spacing.xs};
        color: ${theme.colors.fontTertiary};
        font-size: ${theme.font_sizes.xs};
        margin-top: 2px;
      }
      .time {
        color: ${theme.colors.fontTertiary};
        font-size: ${theme.font_sizes.xs};
      }
    }

    .out-icon {
      font-size: 12px;
      color: ${theme.colors.fontDisabled};
    }
  `}
`;

const StatusDot = styled.div`
  ${({ theme }) => css`
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background: ${theme.colors.success};
    box-shadow: 0 0 10px ${theme.colors.success}40;
    animation: pulse 2s infinite;

    @keyframes pulse {
      0% {
        transform: scale(1);
        opacity: 1;
      }
      50% {
        transform: scale(1.2);
        opacity: 0.7;
      }
      100% {
        transform: scale(1);
        opacity: 1;
      }
    }
  `}
`;

const LoadingWrapper = styled.div`
  padding: 100px 0;
  text-align: center;
`;

const EmptyState = styled.div`
  ${({ theme }) => css`
    color: ${theme.colors.fontDisabled};
    font-size: ${theme.font_sizes.xs};
    border: 1px dashed ${theme.colors.border};
    padding: ${theme.spacing.lg};
    border-radius: ${theme.border_radius.md};
    text-align: center;
    background: ${theme.colors.bgPrimary}40;
  `}
`;
