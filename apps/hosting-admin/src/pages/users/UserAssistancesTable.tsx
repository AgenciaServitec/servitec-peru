import { useMemo, useState, useEffect } from "react";
import dayjs from "dayjs";
import { Title, Button } from "../../components";
import {
  AssistancesTable,
  calcularTotales,
  Filters,
  RangeLabel,
  TotalCard,
} from "./_utils";

const getDefaultRange = () => {
  const today = dayjs();

  const lastFriday =
    today.day() >= 5 ? today.day(5) : today.day(5).subtract(7, "day");

  const previousSunday = lastFriday.subtract(5, "day");

  return { previousSunday, lastFriday };
};

export const UserAssistancesTable = ({
  selectedUser,
  loadingAssistances,
  userAssistances,
}) => {
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [totales, setTotales] = useState(null);

  useEffect(() => {
    const { previousSunday, lastFriday } = getDefaultRange();
    setStartDate(previousSunday);
    setEndDate(lastFriday);
  }, []);

  useEffect(() => {
    setTotales(null);
  }, [endDate, startDate, selectedUser]);

  const filtered = useMemo(() => {
    if (!startDate || !endDate) return userAssistances;
    const start = startDate.startOf("day").valueOf();
    const end = endDate.endOf("day").valueOf();
    return userAssistances.filter((a) => {
      const date =
        a.createAt?.toMillis?.() ?? new Date(a.createAtString ?? "").getTime();
      return date >= start && date <= end;
    });
  }, [startDate, endDate, userAssistances]);

  const handleCalc = () => {
    setTotales(calcularTotales(filtered, selectedUser));
  };

  return (
    <>
      <Title level={3}>Asistencias de {selectedUser?.firstName}</Title>

      <Filters
        startDate={startDate}
        endDate={endDate}
        setStartDate={setStartDate}
        setEndDate={setEndDate}
        clear={() => {
          const { previousSunday, lastFriday } = getDefaultRange();
          setStartDate(previousSunday);
          setEndDate(lastFriday);
          setTotales(null);
        }}
      />

      <RangeLabel startDate={startDate} endDate={endDate} />

      {loadingAssistances ? (
        <p>Cargando...</p>
      ) : (
        <>
          <AssistancesTable assistances={filtered} />

          <Button type="primary" onClick={handleCalc}>
            Calcular
          </Button>

          {totales && (
            <TotalCard {...totales} foodVoucher={selectedUser?.foodVoucher} />
          )}
        </>
      )}
    </>
  );
};
