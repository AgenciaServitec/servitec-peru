import { useEffect, useState } from "react";
import styled, { css, keyframes } from "styled-components";
import { Segmented, Spin } from "antd";
import { CheckCircle2, Clock, LogOut, UserCheck, Users } from "lucide-react";
import type { Assistance } from "../../globalTypes";
import { fetchTodayAllAssistances } from "../../firebase/collections";

export const AssistanceMonitor = () => {
  const [assistances, setAssistances] = useState<Assistance[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<"working" | "finished" | "all">(
    "working"
  );

  useEffect(() => {
    fetchTodayAllAssistances()
      .then((data) => {
        setAssistances(data || []);
      })
      .catch(() => {
        setAssistances([]);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const workingNow = assistances.filter((a) => a.entry && !a.outlet?.date);
  const finishedToday = assistances.filter((a) => a.outlet?.date);
  const total = assistances.length;
  const percentActive =
    total > 0 ? Math.round((workingNow.length / total) * 100) : 0;

  const formatTime = (dateStr?: string) => {
    if (!dateStr) return "--:--";
    const parts = dateStr.split(" ");
    return parts[1] || dateStr;
  };

  // Filtrado según el tab seleccionado
  const filteredList =
    filter === "working"
      ? workingNow
      : filter === "finished"
        ? finishedToday
        : assistances;

  if (loading) {
    return (
      <LoadingCard>
        <Spin tip="Cargando estado del personal..." size="small" />
      </LoadingCard>
    );
  }

  return (
    <MonitorWrapper>
      {/* 1. KPIs Superiores en Barra Discreta */}
      <KpiMetricsBar>
        <KpiItem>
          <div className="icon-badge active">
            <UserCheck size={16} />
          </div>
          <div className="data">
            <span className="label">En Turno</span>
            <span className="val highlight">{workingNow.length}</span>
          </div>
        </KpiItem>

        <KpiDivider />

        <KpiItem>
          <div className="icon-badge gray">
            <CheckCircle2 size={16} />
          </div>
          <div className="data">
            <span className="label">Finalizados</span>
            <span className="val">{finishedToday.length}</span>
          </div>
        </KpiItem>

        <KpiDivider />

        <KpiItem>
          <div className="icon-badge primary">
            <Users size={16} />
          </div>
          <div className="data">
            <span className="label">Total Asistencias</span>
            <span className="val">{total}</span>
          </div>
        </KpiItem>

        <KpiProgressArea>
          <div className="info">
            <span>Operatividad</span>
            <strong>{percentActive}%</strong>
          </div>
          <BarTrack>
            <BarFill $percent={percentActive} />
          </BarTrack>
        </KpiProgressArea>
      </KpiMetricsBar>

      {/* 2. Control de Selección y Filtro */}
      <FilterBar>
        <Segmented
          value={filter}
          onChange={(val) => setFilter(val as any)}
          options={[
            { label: `En Turno (${workingNow.length})`, value: "working" },
            {
              label: `Finalizados (${finishedToday.length})`,
              value: "finished",
            },
            { label: `Todos (${total})`, value: "all" },
          ]}
        />
      </FilterBar>

      {/* 3. Grid Responsiva de Personal */}
      {filteredList.length > 0 ? (
        <CardsGrid>
          {filteredList.map((a) => {
            const isWorking = a.entry && !a.outlet?.date;
            const initial = a.user?.firstName?.[0] || "U";
            const fullName =
              `${a.user?.firstName || ""} ${a.user?.paternalSurname || ""}`.trim();

            return (
              <TechnicianCard key={a.id} $isWorking={isWorking}>
                <CardHeader>
                  <Avatar $isWorking={isWorking}>{initial}</Avatar>
                  <UserInfo>
                    <h5 className="name">{fullName || "Técnico"}</h5>
                    <span className="role-tag">Técnico Operativo</span>
                  </UserInfo>
                  <StatusBadge $isWorking={isWorking}>
                    {isWorking ? (
                      <>
                        <DotLive /> Activo
                      </>
                    ) : (
                      "Salida"
                    )}
                  </StatusBadge>
                </CardHeader>

                <CardFooter>
                  <TimeBlock>
                    <Clock size={13} />
                    <span>In: {formatTime(a.entry?.date)}</span>
                  </TimeBlock>

                  {a.outlet?.date && (
                    <TimeBlock $off>
                      <LogOut size={13} />
                      <span>Out: {formatTime(a.outlet?.date)}</span>
                    </TimeBlock>
                  )}
                </CardFooter>
              </TechnicianCard>
            );
          })}
        </CardsGrid>
      ) : (
        <CleanEmptyState>
          <p>No se encontraron registros de personal para esta categoría.</p>
        </CleanEmptyState>
      )}
    </MonitorWrapper>
  );
};

/* --- ESTILOS MODERNOS UI/UX SIN TÍTULOS DUPICADOS --- */

const pulseLive = keyframes`
  0% { transform: scale(1); opacity: 1; }
  50% { transform: scale(1.25); opacity: 0.6; }
  100% { transform: scale(1); opacity: 1; }
`;

const MonitorWrapper = styled.div`
  ${({ theme }) => css`
    display: flex;
    flex-direction: column;
    gap: ${theme.spacing.md};
    width: 100%;
  `}
`;

const LoadingCard = styled.div`
  ${({ theme }) => css`
    background: ${theme.colors.bgSecondary};
    border: 1px solid ${theme.colors.border};
    border-radius: ${theme.border_radius.lg};
    padding: ${theme.spacing.xl};
    text-align: center;
  `}
`;

/* KPI Metrics Top Bar */
const KpiMetricsBar = styled.div`
  ${({ theme }) => css`
    background: ${theme.colors.bgSecondary};
    border: 1px solid ${theme.colors.border};
    border-radius: ${theme.border_radius.lg};
    padding: ${theme.spacing.md};
    display: flex;
    align-items: center;
    gap: ${theme.spacing.lg};
    flex-wrap: wrap;
  `}
`;

const KpiItem = styled.div`
  ${({ theme }) => css`
    display: flex;
    align-items: center;
    gap: ${theme.spacing.sm};

    .icon-badge {
      width: 34px;
      height: 34px;
      border-radius: ${theme.border_radius.md};
      display: flex;
      align-items: center;
      justify-content: center;

      &.active {
        background: ${theme.colors.success}1A;
        color: ${theme.colors.success};
      }
      &.gray {
        background: ${theme.colors.bgHover};
        color: ${theme.colors.fontTertiary};
      }
      &.primary {
        background: ${theme.colors.primaryAlpha};
        color: ${theme.colors.primary};
      }
    }

    .data {
      display: flex;
      flex-direction: column;

      .label {
        font-size: 11px;
        color: ${theme.colors.fontTertiary};
        line-height: 1.1;
      }
      .val {
        font-size: ${theme.font_sizes.md};
        font-weight: ${theme.font_weight.semibold};
        color: ${theme.colors.fontPrimary};

        &.highlight {
          color: ${theme.colors.success};
        }
      }
    }
  `}
`;

const KpiDivider = styled.div`
  ${({ theme }) => css`
    width: 1px;
    height: 28px;
    background: ${theme.colors.border};
  `}
`;

const KpiProgressArea = styled.div`
  ${({ theme }) => css`
    margin-left: auto;
    width: 160px;
    display: flex;
    flex-direction: column;
    gap: 4px;

    .info {
      display: flex;
      justify-content: space-between;
      font-size: 11px;
      color: ${theme.colors.fontTertiary};

      strong {
        color: ${theme.colors.success};
      }
    }
  `}
`;

const BarTrack = styled.div`
  ${({ theme }) => css`
    width: 100%;
    height: 5px;
    background: ${theme.colors.bgTertiary};
    border-radius: ${theme.border_radius.full};
    overflow: hidden;
  `}
`;

const BarFill = styled.div<{ $percent: number }>`
  ${({ theme, $percent }) => css`
    height: 100%;
    width: ${$percent}%;
    background: ${theme.colors.success};
    border-radius: ${theme.border_radius.full};
    transition: width 0.4s ease;
  `}
`;

/* Filter Segmented Control */
const FilterBar = styled.div`
  display: flex;
  justify-content: flex-start;

  .ant-segmented {
    background: ${({ theme }) => theme.colors.bgSecondary};
    border: 1px solid ${({ theme }) => theme.colors.border};
    padding: 2px;
    border-radius: ${({ theme }) => theme.border_radius.md};
  }
`;

/* Grid Responsivo de Tarjetas de Técnico */
const CardsGrid = styled.div`
  ${({ theme }) => css`
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
    gap: ${theme.spacing.md};
  `}
`;

const TechnicianCard = styled.div<{ $isWorking: boolean }>`
  ${({ theme, $isWorking }) => css`
    background: ${theme.colors.bgSecondary};
    border: 1px solid ${$isWorking ? theme.colors.border : theme.colors.border};
    border-radius: ${theme.border_radius.lg};
    padding: ${theme.spacing.md};
    display: flex;
    flex-direction: column;
    gap: ${theme.spacing.md};
    transition: all ${theme.transitions.fast};
    opacity: ${$isWorking ? 1 : 0.75};

    &:hover {
      border-color: ${$isWorking
        ? theme.colors.primary
        : theme.colors.borderHover};
      transform: translateY(-2px);
      box-shadow: ${theme.shadows.sm};
    }
  `}
`;

const CardHeader = styled.div`
  ${({ theme }) => css`
    display: flex;
    align-items: center;
    gap: ${theme.spacing.sm};
  `}
`;

const Avatar = styled.div<{ $isWorking: boolean }>`
  ${({ theme, $isWorking }) => css`
    width: 36px;
    height: 36px;
    border-radius: ${theme.border_radius.full};
    background: ${$isWorking
      ? theme.colors.primaryAlpha
      : theme.colors.bgHover};
    color: ${$isWorking ? theme.colors.primary : theme.colors.fontTertiary};
    border: 1px solid
      ${$isWorking ? `${theme.colors.primary}40` : theme.colors.border};
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: ${theme.font_sizes.xs};
    font-weight: ${theme.font_weight.semibold};
  `}
`;

const UserInfo = styled.div`
  ${({ theme }) => css`
    flex: 1;
    overflow: hidden;

    .name {
      margin: 0;
      font-size: ${theme.font_sizes.sm};
      font-weight: ${theme.font_weight.medium};
      color: ${theme.colors.fontPrimary};
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    .role-tag {
      font-size: 11px;
      color: ${theme.colors.fontTertiary};
      display: block;
    }
  `}
`;

const StatusBadge = styled.div<{ $isWorking: boolean }>`
  ${({ theme, $isWorking }) => css`
    display: inline-flex;
    align-items: center;
    gap: 4px;
    font-size: 11px;
    font-weight: ${theme.font_weight.medium};
    padding: 2px 8px;
    border-radius: ${theme.border_radius.full};
    background: ${$isWorking
      ? `${theme.colors.success}1A`
      : theme.colors.bgHover};
    color: ${$isWorking ? theme.colors.success : theme.colors.fontTertiary};
    border: 1px solid
      ${$isWorking ? `${theme.colors.success}30` : theme.colors.border};
  `}
`;

const DotLive = styled.span`
  ${({ theme }) => css`
    width: 6px;
    height: 6px;
    border-radius: 50%;
    background: ${theme.colors.success};
    animation: ${pulseLive} 2s infinite ease-in-out;
  `}
`;

const CardFooter = styled.div`
  ${({ theme }) => css`
    display: flex;
    align-items: center;
    gap: ${theme.spacing.md};
    padding-top: ${theme.spacing.xs};
    border-top: 1px solid ${theme.colors.divider};
  `}
`;

const TimeBlock = styled.div<{ $off?: boolean }>`
  ${({ theme, $off }) => css`
    display: flex;
    align-items: center;
    gap: 4px;
    font-size: ${theme.font_sizes.xs};
    color: ${$off ? theme.colors.fontTertiary : theme.colors.fontSecondary};

    svg {
      color: ${$off ? theme.colors.fontDisabled : theme.colors.primary};
    }
  `}
`;

const CleanEmptyState = styled.div`
  ${({ theme }) => css`
    background: ${theme.colors.bgSecondary};
    border: 1px dashed ${theme.colors.border};
    border-radius: ${theme.border_radius.lg};
    padding: ${theme.spacing.xl};
    text-align: center;
    color: ${theme.colors.fontTertiary};
    font-size: ${theme.font_sizes.sm};
  `}
`;
