import React, { useEffect, useMemo, useState } from "react";
import {
  Button,
  DatePicker,
  Divider,
  Input,
  Space,
  Title,
} from "../../components";
import styled from "styled-components";
import dayjs from "dayjs";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCalculator,
  faClock,
  faCoins,
  faEraser,
} from "@fortawesome/free-solid-svg-icons";
import type { Assistance } from "../../globalTypes";
import type { User } from "./index";
import { round } from "lodash";

interface UserAssistancesTableProps {
  selectedUser: User | null;
  loadingAssistances: boolean;
  userAssistances: Assistance[];
}

export const UserAssistancesTable: React.FC<UserAssistancesTableProps> = ({
  selectedUser,
  loadingAssistances,
  userAssistances,
}) => {
  const [startDate, setStartDate] = useState<dayjs.Dayjs | null>(null);
  const [endDate, setEndDate] = useState<dayjs.Dayjs | null>(null);

  const [totalMinutes, setTotalMinutes] = useState<number | null>(null);
  const [multiplier, setMultiplier] = useState<number | string>("");
  const [result, setResult] = useState<number | null>(null);
  const [lunchTrueCount, setLunchTrueCount] = useState(0);
  const [lunchFalseCount, setLunchFalseCount] = useState(0);
  const [lunchBonus, setLunchBonus] = useState<number | null>(null);
  const [grandTotal, setGrandTotal] = useState<number | null>(null);

  useEffect(() => {
    const { lastSunday, lastFriday } = getLastSundayAndFriday();

    setStartDate(lastSunday.startOf("day"));
    setEndDate(lastFriday.endOf("day"));
  }, []);

  useEffect(() => {
    setTotalMinutes(null);
    setMultiplier("");
    setResult(null);
  }, [selectedUser]);

  const getLastSundayAndFriday = () => {
    const today = dayjs();

    const lastFriday =
      today.day() >= 5 ? today.day(5) : today.day(5).subtract(7, "day");

    const lastSunday = lastFriday.subtract(5, "day");

    return { lastSunday, lastFriday };
  };

  useEffect(() => {
    if (selectedUser?.payPerMinute && totalMinutes !== null) {
      const autoResult = round(totalMinutes * selectedUser.payPerMinute, 2);
      setMultiplier(selectedUser.payPerMinute);
      setResult(autoResult);
    }
  }, [selectedUser?.payPerMinute, totalMinutes]);

  useEffect(() => {
    if (result !== null && lunchBonus !== null) {
      setGrandTotal(result + lunchBonus);
    } else {
      setGrandTotal(null);
    }
  }, [result, lunchBonus]);

  const filteredAssistances = useMemo(() => {
    if (!startDate && !endDate) return userAssistances;

    const startMs = startDate ? startDate.startOf("day").valueOf() : 0;
    const endMs = endDate ? endDate.endOf("day").valueOf() : Infinity;

    return userAssistances.filter((a) => {
      const date =
        a.createAt?.toMillis?.() ?? new Date(a.createAtString ?? "").getTime();
      return date >= startMs && date <= endMs;
    });
  }, [userAssistances, startDate, endDate]);

  const handleCalculateTotal = () => {
    const total = filteredAssistances.reduce(
      (sum, a) => sum + (a.minutesWorked || 0),
      0
    );
    setTotalMinutes(total);

    const tCount = filteredAssistances.filter(
      (a) => a.orderLunch === true
    ).length;
    const fCount = filteredAssistances.filter(
      (a) => a.orderLunch === false
    ).length;

    setLunchTrueCount(tCount);
    setLunchFalseCount(fCount);

    let bono = null;
    if (selectedUser?.foodVoucher) {
      bono = fCount * selectedUser.foodVoucher;
      setLunchBonus(bono);
    } else {
      setLunchBonus(null);
    }

    if (result !== null && bono !== null) {
      setGrandTotal(result + bono);
    } else {
      setGrandTotal(null);
    }
  };

  const handleMultiplierChange = (value: string) => {
    setMultiplier(value);
    const num = parseFloat(value);
    if (!isNaN(num) && totalMinutes !== null) {
      setResult(round(totalMinutes * num, 2));
    } else {
      setResult(null);
    }
  };

  const clearFilters = () => {
    setStartDate(null);
    setEndDate(null);
    setTotalMinutes(null);
    setMultiplier("");
    setResult(null);
  };

  return (
    <Container>
      <Divider />
      <Title level={3}>
        Asistencias de {selectedUser?.firstName} {selectedUser?.paternalSurname}
      </Title>

      <FilterContainer>
        <Space wrap>
          <DatePicker
            placeholder="Fecha inicial"
            format="DD/MM/YYYY"
            value={startDate}
            onChange={(date) => setStartDate(date)}
            allowClear
          />
          <DatePicker
            placeholder="Fecha final"
            format="DD/MM/YYYY"
            value={endDate}
            onChange={(date) => setEndDate(date)}
            allowClear
          />
          <Button
            onClick={clearFilters}
            icon={<FontAwesomeIcon icon={faEraser} />}
          >
            Limpiar
          </Button>
        </Space>
      </FilterContainer>

      {startDate &&
        endDate &&
        (() => {
          const start = startDate.locale("es");
          const end = endDate.locale("es");
          const sameMonth = start.month() === end.month();
          const sameYear = start.year() === end.year();

          let rangeText = "";

          if (sameMonth && sameYear) {
            rangeText = `Del ${start.format("dddd D")} al ${end.format("dddd D [de] MMMM [de] YYYY")}`;
          } else if (!sameMonth && sameYear) {
            rangeText = `Del ${start.format("dddd D [de] MMMM")} al ${end.format("dddd D [de] MMMM [de] YYYY")}`;
          } else {
            rangeText = `Del ${start.format("dddd D [de] MMMM [de] YYYY")} al ${end.format("dddd D [de] MMMM [de] YYYY")}`;
          }

          return <RangeText>{rangeText}</RangeText>;
        })()}

      {loadingAssistances ? (
        <LoadingText>Cargando asistencias...</LoadingText>
      ) : filteredAssistances.length === 0 ? (
        <EmptyText>
          No hay asistencias registradas para este usuario en el rango
          seleccionado.
        </EmptyText>
      ) : (
        <>
          <TableContainer>
            <TableAssistances>
              <thead>
                <tr>
                  <th>Fecha</th>
                  <th>Entrada</th>
                  <th>Salida</th>
                  <th>Minutos</th>
                  <th>Lugar</th>
                  <th>¿Pidió almuerzo?</th>
                </tr>
              </thead>
              <tbody>
                {filteredAssistances.map((a) => (
                  <tr key={a.id}>
                    <td>{a.createAtString || "-"}</td>
                    <td>{a.entry?.date || "-"}</td>
                    <td>{a.outlet?.date || "-"}</td>
                    <td>{a.minutesWorked || 0}</td>
                    <td>{a?.workPlace || "-"}</td>{" "}
                    <td>
                      {a.orderLunch === true
                        ? "Sí"
                        : a.orderLunch === false
                          ? "No"
                          : "-"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </TableAssistances>
          </TableContainer>

          <ActionsContainer>
            <Button
              type="primary"
              onClick={handleCalculateTotal}
              icon={<FontAwesomeIcon icon={faCalculator} />}
            >
              Calcular minutos
            </Button>

            {totalMinutes !== null && (
              <TotalCard>
                <TotalTitle>
                  <FontAwesomeIcon icon={faClock} /> Total trabajado
                </TotalTitle>
                <TotalText>
                  <strong>{totalMinutes}</strong> minutos (
                  {(totalMinutes / 60).toFixed(2)} horas)
                </TotalText>

                <MultiplierContainer>
                  <FontAwesomeIcon icon={faCoins} color="#00ff88" />
                  {selectedUser?.payPerMinute ? (
                    <>
                      <label>
                        Tarifa: S/
                        {selectedUser.payPerMinute} por minuto
                      </label>
                    </>
                  ) : (
                    <>
                      <label>Multiplicar por:</label>
                      <StyledInput
                        type="number"
                        step="any"
                        value={multiplier}
                        onChange={(e) => handleMultiplierChange(e.target.value)}
                      />
                    </>
                  )}
                </MultiplierContainer>

                {result !== null && (
                  <ResultText>
                    Resultado: <strong>S/{result.toFixed(2)}</strong>
                  </ResultText>
                )}
                {lunchBonus !== null && (
                  <ResultText>
                    Bono de almuerzo:{" "}
                    <strong>
                      {lunchFalseCount} × S/{selectedUser?.foodVoucher} = S/
                      {lunchBonus.toFixed(2)}
                    </strong>
                  </ResultText>
                )}
                {grandTotal !== null && (
                  <TotalTitle>
                    Total: <strong>S/{grandTotal.toFixed(2)}</strong>
                  </TotalTitle>
                )}
              </TotalCard>
            )}
          </ActionsContainer>
        </>
      )}
    </Container>
  );
};

const Container = styled.div`
  width: 100%;
  padding: 1rem 1.5rem;
  box-sizing: border-box;

  @media (max-width: 768px) {
    padding: 1rem;
  }
`;

const FilterContainer = styled.div`
  display: flex;
  align-items: center;
  margin: 1.5rem 0;
  gap: 1rem;
  flex-wrap: wrap;
  font-size: 1rem;

  svg {
    margin-right: 0.5rem;
  }

  button {
    border-radius: 6px;
    white-space: nowrap;
  }

  @media (max-width: 600px) {
    flex-direction: column;
    align-items: stretch;

    button {
      width: 100%;
    }
  }
`;

const TableContainer = styled.div`
  width: 100%;
  overflow-x: auto;
  margin-top: 1rem;

  &::-webkit-scrollbar {
    height: 8px;
  }

  &::-webkit-scrollbar-thumb {
    background: #444;
    border-radius: 4px;
  }
`;

const TableAssistances = styled.table`
  width: 100%;
  border-collapse: collapse;
  font-size: 0.95rem;
  color: #fff;
  background: #1e1e1e;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 0 10px #00000040;
  min-width: 600px;

  th,
  td {
    border: 1px solid #333;
    padding: 0.75rem;
    text-align: center;
  }

  th {
    background: #121212;
    color: #00c3ff;
    font-weight: 600;
  }

  tr:nth-child(even) {
    background: #252525;
  }

  tr:hover {
    background: #2e2e2e;
  }

  @media (max-width: 480px) {
    font-size: 0.8rem;
    th,
    td {
      padding: 0.5rem;
    }
  }
`;

const RangeText = styled.p`
  color: #ccc;
  margin-top: 0.75rem;
  font-size: 1.5rem;
  font-style: italic;

  @media (max-width: 480px) {
    font-size: 0.85rem;
  }
`;

const ActionsContainer = styled.div`
  margin-top: 2rem;
  display: flex;
  flex-direction: column;
  gap: 1.25rem;

  @media (min-width: 768px) {
    max-width: 600px;
  }
`;

const TotalCard = styled.div`
  background: #101010;
  border: 1px solid #333;
  border-radius: 10px;
  padding: 1rem 1.25rem;
  color: #fff;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  box-shadow: 0 0 12px #00000050;

  @media (max-width: 480px) {
    padding: 0.8rem 1rem;
  }
`;

const TotalTitle = styled.h4`
  font-size: 1.1rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: #00c3ff;

  @media (max-width: 480px) {
    font-size: 1rem;
  }
`;

const TotalText = styled.p`
  font-size: 1rem;

  @media (max-width: 480px) {
    font-size: 0.9rem;
  }
`;

const MultiplierContainer = styled.div`
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 0.6rem;

  label {
    color: #aaa;
  }

  @media (max-width: 480px) {
    flex-direction: column;
    align-items: flex-start;
  }
`;

const StyledInput = styled(Input)`
  width: 120px;
  padding: 0.4rem 0.5rem;
  border-radius: 6px;
  border: 1px solid #444;
  background: #1c1c1c;
  color: #fff;
  font-size: 0.95rem;

  &:focus {
    border-color: #00c3ff;
    box-shadow: 0 0 6px #00c3ff40;
  }

  @media (max-width: 480px) {
    width: 100%;
  }
`;

const ResultText = styled.p`
  font-size: 1.05rem;
  color: #00ff88;
  font-weight: bold;

  @media (max-width: 480px) {
    font-size: 0.95rem;
  }
`;

const LoadingText = styled.p`
  color: #aaa;
  font-style: italic;
`;

const EmptyText = styled.p`
  color: #888;
  font-style: italic;
`;
