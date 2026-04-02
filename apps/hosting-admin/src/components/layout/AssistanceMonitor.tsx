import { useEffect, useState } from "react";
import styled from "styled-components";
import { Card, Progress } from "antd";
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

  if (loading) return <LoadingText>Cargando monitor...</LoadingText>;

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
            strokeColor="#52c41a"
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
              <EmptyState>No hay personal en turno</EmptyState>
            )}
          </div>
        </StatusColumn>

        <StatusColumn>
          <div className="column-header">
            <h4 className="offline">Finalizaron</h4>
            <span className="count-badge">{finishedToday.length}</span>
          </div>
          <div className="user-list">
            {finishedToday.map((a) => (
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
            ))}
          </div>
        </StatusColumn>
      </div>
    </MonitorCard>
  );
};

const MonitorCard = styled(Card)`
  margin-top: 32px;
  background: #141414;
  border: 1px solid rgba(255, 255, 255, 0.08);
  .ant-card-body {
    padding: 24px;
  }
  .status-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 40px;
  }
  @media (max-width: 768px) {
    .status-grid {
      grid-template-columns: 1fr;
      gap: 32px;
    }
  }
`;

const HeaderGroup = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 32px;
  .title-section {
    .summary-info {
      display: flex;
      align-items: center;
      gap: 8px;
      color: #595959;
      font-size: 0.8rem;
      margin-top: 4px;
    }
  }
`;

const ProgressContainer = styled.div`
  width: 140px;
  .progress-label {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 6px;
    font-size: 0.7rem;
    color: #595959;
    .percent {
      color: #52c41a;
      font-weight: 600;
    }
  }
`;

const SectionTitle = styled.h2`
  color: #fafafa;
  font-size: 1rem;
  margin: 0;
  font-weight: 500;
`;

const StatusColumn = styled.div`
  .column-header {
    display: flex;
    align-items: center;
    gap: 10px;
    margin-bottom: 20px;
    h4 {
      font-size: 0.85rem;
      font-weight: 500;
      margin: 0;
      &.active {
        color: #52c41a;
      }
      &.offline {
        color: #8c8c8c;
      }
    }
    .count-badge {
      font-size: 0.7rem;
      padding: 1px 6px;
      border-radius: 4px;
      background: rgba(255, 255, 255, 0.03);
      color: #595959;
      &.active {
        background: rgba(82, 196, 26, 0.1);
        color: #52c41a;
      }
    }
  }
  .user-list {
    display: flex;
    flex-direction: column;
    gap: 8px;
  }
`;

const UserCard = styled.div`
  display: flex;
  align-items: center;
  padding: 12px;
  background: #1a1a1a;
  border-radius: 8px;
  gap: 12px;
  border: 1px solid rgba(255, 255, 255, 0.02);
  transition: all 0.2s;

  &:hover {
    border-color: rgba(255, 255, 255, 0.1);
    background: #1e1e1e;
  }

  &.finished {
    background: transparent;
    border-color: rgba(255, 255, 255, 0.04);
    opacity: 0.5;
  }

  .avatar-mini {
    width: 32px;
    height: 32px;
    background: #051b22;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
    font-size: 0.8rem;
    border: 1px solid rgba(255, 255, 255, 0.05);
  }

  .user-info {
    flex: 1;

    .name {
      color: #eeeeee;
      font-size: 0.85rem;
      margin: 0;
      font-weight: 500;
    }

    .time-row {
      display: flex;
      align-items: center;
      gap: 6px;
      color: #595959;
      font-size: 0.75rem;
      margin-top: 2px;
    }

    .time {
      color: #595959;
      font-size: 0.75rem;
    }
  }

  .out-icon {
    font-size: 11px;
    color: #434343;
  }
`;

const StatusDot = styled.div`
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: #52c41a;
  box-shadow: 0 0 10px rgba(82, 196, 26, 0.2);
`;

const LoadingText = styled.p`
  color: #595959;
  font-size: 0.85rem;
  margin-top: 24px;
`;

const EmptyState = styled.div`
  color: #434343;
  font-size: 0.8rem;
  border: 1px dashed rgba(255, 255, 255, 0.05);
  padding: 16px;
  border-radius: 8px;
  text-align: center;
`;
