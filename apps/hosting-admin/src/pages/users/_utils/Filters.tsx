import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEraser } from "@fortawesome/free-solid-svg-icons";
import { DatePicker, Space, Button } from "../../../components";

export const Filters = ({
  startDate,
  endDate,
  setStartDate,
  setEndDate,
  clear,
}) => (
  <Space wrap>
    <DatePicker
      placeholder="Fecha inicial"
      format="DD/MM/YYYY"
      value={startDate}
      onChange={setStartDate}
      allowClear
    />
    <DatePicker
      placeholder="Fecha final"
      format="DD/MM/YYYY"
      value={endDate}
      onChange={setEndDate}
      allowClear
    />
    <Button onClick={clear} icon={<FontAwesomeIcon icon={faEraser} />}>
      Limpiar
    </Button>
  </Space>
);
