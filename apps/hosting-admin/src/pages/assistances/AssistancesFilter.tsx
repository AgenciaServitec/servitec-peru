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

  const [range, setRange] = useState<[Dayjs | null, Dayjs | null]>([
    today,
    today,
  ]);

  useEffect(() => {
    const newRange: [Dayjs, Dayjs] = [today, today];
    setRange(newRange);

    onFilter({
      startDate: today.startOf("day").toDate(),
      endDate: today.endOf("day").toDate(),
    });
  }, [resetSignal]);

  useEffect(() => {
    const [start, end] = range;

    onFilter({
      startDate: start ? start.startOf("day").toDate() : null,
      endDate: end ? end.endOf("day").toDate() : null,
    });
  }, [range]);

  return (
    <Row gutter={[16, 16]} align="middle">
      <Col>
        <DatePicker.RangePicker
          value={range}
          onChange={(values) =>
            setRange(values as [Dayjs | null, Dayjs | null])
          }
          format="DD/MM/YYYY"
        />
      </Col>
    </Row>
  );
}
