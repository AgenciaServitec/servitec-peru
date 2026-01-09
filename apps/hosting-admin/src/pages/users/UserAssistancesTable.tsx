import { useEffect, useMemo, useState } from "react";
import dayjs from "dayjs";
import { Button, Col, Row, Title } from "../../components";
import {
  AdminAssistancesTable,
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
  }, [endDate, startDate, selectedUser, userAssistances]);

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
    <Row gutter={[16, 16]}>
      <Col span={24}>
        <Title level={3}>Asistencias de {selectedUser?.firstName}</Title>
      </Col>
      <Col span={24}>
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
      </Col>
      <Col span={24}>
        <RangeLabel startDate={startDate} endDate={endDate} />
      </Col>
      <Col span={24}>
        {loadingAssistances ? (
          <p>Cargando...</p>
        ) : (
          <>
            <AdminAssistancesTable assistances={filtered} />

            <Button type="primary" onClick={handleCalc}>
              Calcular
            </Button>

            {totales && (
              <TotalCard
                {...totales}
                foodVoucher={selectedUser?.foodVoucher}
                accountNumber={selectedUser?.accountNumber}
                payPerMinute={selectedUser?.payPerMinute}
              />
            )}
          </>
        )}
      </Col>
    </Row>
  );
};
