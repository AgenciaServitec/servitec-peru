import { useState, useEffect } from "react";
import { Input, Row, Col } from "../../components/ui";

interface AssistancesNameFilterProps {
  onSearch: (text: string) => void;
}

export function AssistancesNameFilter({
  onSearch,
}: AssistancesNameFilterProps) {
  const [value, setValue] = useState("");

  useEffect(() => {
    onSearch(value.trim());
  }, [value]);

  return (
    <Row gutter={[16, 16]} align="middle">
      <Col span={24}>
        <Input
          placeholder="Buscar por nombre..."
          value={value}
          onChange={(e) => setValue(e.target.value)}
          allowClear
        />
      </Col>
    </Row>
  );
}
