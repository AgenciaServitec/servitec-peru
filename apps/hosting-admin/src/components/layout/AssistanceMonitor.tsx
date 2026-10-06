import { useEffect, useState } from "react";
import styled, { css, keyframes } from "styled-components";
import { Avatar, Spin } from "antd";
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
      {/* 1. KPIs Superiores con Iconos Sólidos */}
      <KpiMetricsBar>
        <KpiItem>
          <div className="icon-badge solid-success">
            <UserCheck size={16} />
          </div>
          <div className="data">
            <span className="label">En Turno</span>
            <span className="val highlight">{workingNow.length}</span>
          </div>
        </KpiItem>

        <KpiDivider />

        <KpiItem>
          <div className="icon-badge solid-neutral">
            <CheckCircle2 size={16} />
          </div>
          <div className="data">
            <span className="label">Finalizados</span>
            <span className="val">{finishedToday.length}</span>
          </div>
        </KpiItem>

        <KpiDivider />

        <KpiItem>
          <div className="icon-badge solid-primary">
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

      {/* 2. Filtro de Pestañas Limpio */}
      <FilterTabs>
        <TabButton
          type="button"
          $active={filter === "working"}
          onClick={() => setFilter("working")}
        >
          En Turno ({workingNow.length})
        </TabButton>
        <TabButton
          type="button"
          $active={filter === "finished"}
          onClick={() => setFilter("finished")}
        >
          Finalizados ({finishedToday.length})
        </TabButton>
        <TabButton
          type="button"
          $active={filter === "all"}
          onClick={() => setFilter("all")}
        >
          Todos ({total})
        </TabButton>
      </FilterTabs>

      {/* 3. Grid Responsiva de Personal */}
      {filteredList.length > 0 ? (
        <CardsGrid>
          {filteredList.map((a) => {
            const isWorking = !!(a.entry && !a.outlet?.date);
            const fullName =
              `${a.user?.firstName || ""} ${a.user?.paternalSurname || ""}`.trim();

            return (
              <TechnicianCard key={a.id} $isWorking={isWorking}>
                <CardHeader>
                  <Avatar
                    src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${a.user?.firstName}`}
                  />
                  <UserInfo>
                    <h5 className="name">{fullName || "Técnico"}</h5>
                    <span className="role-tag">Técnico Operativo</span>
                  </UserInfo>
                  <SolidStatusBadge $isWorking={isWorking}>
                    {isWorking ? (
                      <>
                        <DotLive /> Activo
                      </>
                    ) : (
                      "Salida"
                    )}
                  </SolidStatusBadge>
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

/* --- ESTILOS CORREGIDOS ALINEADOS A TU THEME --- */

const pulseLive = keyframes`
  0% { transform: scale(1); opacity: 1; }
  50% { transform: scale(1.2); opacity: 0.8; }
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
      width: 36px;
      height: 36px;
      border-radius: ${theme.border_radius.md};
      display: flex;
      align-items: center;
      justify-content: center;
      box-shadow: ${theme.shadows.sm};

      /* FIX: Uso seguro de theme.mode */
      &.solid-success {
        background: ${theme.colors.success};
        color: ${theme.mode === "dark" ? "#000000" : "#ffffff"};
      }
      &.solid-neutral {
        background: ${theme.colors.borderHover};
        color: ${theme.colors.fontPrimary};
      }
      &.solid-primary {
        background: ${theme.colors.primary};
        color: ${theme.mode === "dark" ? "#000000" : "#ffffff"};
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
    width: 150px;
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
    height: 6px;
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
    transition: width ${theme.transitions.slow};
  `}
`;

/* BARRA DE FILTROS PESTAÑAS */
const FilterTabs = styled.div`
  ${({ theme }) => css`
    display: inline-flex;
    align-items: center;
    background: ${theme.colors.bgSecondary};
    border: 1px solid ${theme.colors.border};
    border-radius: ${theme.border_radius.md};
    padding: 3px;
    gap: 4px;
    width: fit-content;
  `}
`;

const TabButton = styled.button<{ $active: boolean }>`
  ${({ theme, $active }) => css`
    border: none;
    background: ${$active ? theme.colors.bgHover : "transparent"};
    color: ${$active ? theme.colors.fontPrimary : theme.colors.fontSecondary};
    font-size: ${theme.font_sizes.xs};
    font-weight: ${$active
      ? theme.font_weight.semibold
      : theme.font_weight.medium};
    padding: 6px 14px;
    border-radius: ${theme.border_radius.xs};
    cursor: pointer;
    transition: all ${theme.transitions.fast};

    &:hover {
      color: ${theme.colors.fontPrimary};
      background: ${$active ? theme.colors.bgHover : theme.colors.bgTertiary};
    }
  `}
`;

/* Grid Responsivo */
const CardsGrid = styled.div`
  ${({ theme }) => css`
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
    gap: ${theme.spacing.md};
  `}
`;

const TechnicianCard = styled.div<{ $isWorking: boolean }>`
  ${({ theme, $isWorking }) => css`
    background: ${theme.colors.bgSecondary};
    border: 1px solid ${theme.colors.border};
    border-radius: ${theme.border_radius.lg};
    padding: ${theme.spacing.md};
    display: flex;
    flex-direction: column;
    gap: ${theme.spacing.md};
    transition: all ${theme.transitions.fast};
    opacity: ${$isWorking ? 1 : 0.8};

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

/* FIX: Tipado de $isWorking y lectura limpia de theme.mode */
const SolidStatusBadge = styled.div<{ $isWorking: boolean }>`
  ${({ theme, $isWorking }) => css`
    display: inline-flex;
    align-items: center;
    gap: 4px;
    font-size: 11px;
    font-weight: ${theme.font_weight.semibold};
    padding: 3px 9px;
    border-radius: ${theme.border_radius.full};
    background: ${$isWorking ? theme.colors.success : theme.colors.bgTertiary};
    color: ${$isWorking
      ? theme.mode === "dark"
        ? "#000000"
        : "#ffffff"
      : theme.colors.fontSecondary};
    border: 1px solid ${$isWorking ? theme.colors.success : theme.colors.border};
  `}
`;

const DotLive = styled.span`
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: currentColor;
  animation: ${pulseLive} 2s infinite ease-in-out;
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
