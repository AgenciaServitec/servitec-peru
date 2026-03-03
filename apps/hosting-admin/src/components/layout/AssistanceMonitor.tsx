import { useEffect, useState } from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSignOutAlt } from "@fortawesome/free-solid-svg-icons";
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

  if (loading) return <p style={{ color: "gray" }}>Cargando monitor...</p>;

  return (
    <MonitorWrapper>
      <SectionTitle>Estado del Personal (Hoy)</SectionTitle>
      <div className="status-grid">
        <StatusColumn>
          <h4 className="active">En Turno ({workingNow.length})</h4>
          <div className="user-list">
            {workingNow.length > 0 ? (
              workingNow.map((a) => (
                <UserItem key={a.id}>
                  <div className="avatar-mini">
                    {a.user.firstName[0].toUpperCase()}
                  </div>
                  <div className="user-info">
                    <p className="name">
                      {a.user.firstName} {a.user.paternalSurname}
                    </p>
                    <span className="time">
                      Entró: {a.entry.date.split(" ")[1]}
                    </span>
                  </div>
                  <StatusDot $active={true} />
                </UserItem>
              ))
            ) : (
              <EmptyState>No hay personal activo</EmptyState>
            )}
          </div>
        </StatusColumn>
        <StatusColumn>
          <h4 className="offline">Finalizaron ({finishedToday.length})</h4>
          <div className="user-list">
            {finishedToday.map((a) => (
              <UserItem key={a.id} className="finished">
                <div className="avatar-mini gray">
                  {a.user.firstName[0].toUpperCase()}
                </div>
                <div className="user-info">
                  <p className="name">{a.user.firstName}</p>
                  <span className="time">
                    Salió: {a.outlet.date.split(" ")[1]}
                  </span>
                </div>
                <FontAwesomeIcon
                  icon={faSignOutAlt}
                  style={{ fontSize: "10px", color: "#666" }}
                />
              </UserItem>
            ))}
          </div>
        </StatusColumn>
      </div>
    </MonitorWrapper>
  );
};

const MonitorWrapper = styled.div`
  margin-top: 40px;
  background: #121212;
  border-radius: 20px;
  padding: 24px;
  border: 1px solid rgba(255, 255, 255, 0.05);

  .status-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 24px;
  }

  @media (max-width: 768px) {
    .status-grid {
      grid-template-columns: 1fr;
    }
  }
`;

const SectionTitle = styled.h2`
  color: #fff;
  font-size: 1.2rem;
  margin-bottom: 20px;
  font-weight: 700;
`;

const StatusColumn = styled.div`
  h4 {
    font-size: 0.8rem;
    text-transform: uppercase;
    letter-spacing: 1px;
    margin-bottom: 15px;
    display: flex;
    align-items: center;
    gap: 8px;
    &.active {
      color: #28a745;
    }
    &.offline {
      color: #666;
    }
  }
  .user-list {
    display: flex;
    flex-direction: column;
    gap: 12px;
  }
`;

const UserItem = styled.div`
  display: flex;
  align-items: center;
  background: rgba(255, 255, 255, 0.03);
  padding: 10px 14px;
  border-radius: 12px;
  gap: 12px;

  &.finished {
    opacity: 0.6;
  }

  .avatar-mini {
    width: 32px;
    height: 32px;
    background: ${({ theme }) => theme.colors.primary};
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    color: black;
    font-weight: 800;
    font-size: 0.7rem;
    &.gray {
      background: #333;
      color: #888;
    }
  }

  .user-info {
    flex: 1;
    .name {
      color: #fff;
      font-size: 0.85rem;
      margin: 0;
      text-transform: capitalize;
    }
    .time {
      color: rgba(255, 255, 255, 0.3);
      font-size: 0.7rem;
    }
  }
`;

const StatusDot = styled.div<{ $active: boolean }>`
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: #28a745;
  box-shadow: 0 0 8px #28a745;
  animation: pulse 2s infinite;

  @keyframes pulse {
    0% {
      opacity: 1;
    }
    50% {
      opacity: 0.4;
    }
    100% {
      opacity: 1;
    }
  }
`;

const EmptyState = styled.div`
  color: #444;
  font-size: 0.8rem;
  font-style: italic;
`;
