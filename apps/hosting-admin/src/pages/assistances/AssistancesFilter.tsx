import { useState, useEffect } from "react";
import { Row, Col, DatePicker } from "../../components/ui";
import dayjs, { Dayjs } from "dayjs";
import type { DateFilter } from "./types";

export function AssistancesFilter({
  onFilter,
  resetSignal,
}: {
  onFilter: (filter: DateFilter) => void;
  resetSignal: number;
}) {
  const today = dayjs();

  const [startDate, setStartDate] = useState<Dayjs | null>(today);
  const [endDate, setEndDate] = useState<Dayjs | null>(today);

  useEffect(() => {
    setStartDate(today);
    setEndDate(today);

    onFilter({
      startDate: today.startOf("day").toDate(),
      endDate: today.endOf("day").toDate(),
    });
  }, [resetSignal]);

  useEffect(() => {
    onFilter({
      startDate: startDate ? startDate.startOf("day").toDate() : null,
      endDate: endDate ? endDate.endOf("day").toDate() : null,
    });
  }, [startDate, endDate]);

  return (
    <Row gutter={[16, 16]} align="middle">
      <Col>
        <DatePicker
          value={startDate}
          onChange={(date) => setStartDate(date)}
          format="DD/MM/YYYY"
          placeholder="Fecha inicial"
          allowClear
        />
      </Col>
      <Col>
        <DatePicker
          value={endDate}
          onChange={(date) => setEndDate(date)}
          format="DD/MM/YYYY"
          placeholder="Fecha final"
          allowClear
        />
      </Col>
    </Row>
  );
}
