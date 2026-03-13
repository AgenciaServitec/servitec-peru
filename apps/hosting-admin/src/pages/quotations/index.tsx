import { useCallback, useMemo, useState } from "react";
import { debounce } from "lodash";
import { DatePicker, Flex, Input, Typography } from "antd";
import { QuotationTable } from "./QuotationTable.tsx";
import { useCollectionData } from "react-firebase-hooks/firestore";
import { firestore } from "../../firebase";
import { Button, Col, Row, Title } from "../../components";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCalendarAlt,
  faPlus,
  faSearch,
} from "@fortawesome/free-solid-svg-icons";
import dayjs from "dayjs";

const { RangePicker } = DatePicker;
const { Text } = Typography;

export function QuotationsIntegrations() {
  const navigate = useNavigate();
  const [searchText, setSearchText] = useState("");
  const [dateRange, setDateRange] = useState<
    [dayjs.Dayjs | null, dayjs.Dayjs | null] | null
  >(null);

  const [quotations = [], quotationsLoading] = useCollectionData(
    firestore.collection("quotations").where("isDeleted", "==", false)
  );

  const handleSearch = useCallback(
    debounce((value: string) => {
      setSearchText(value);
    }, 300),
    []
  );

  const filteredQuotations = useMemo(() => {
    let result = [...quotations];

    const search = searchText.toLowerCase().trim();
    if (search) {
      result = result.filter((q: any) => {
        const client = q.client || {};
        const searchableString = `
          ${client.document?.number || ""} 
          ${client.phone?.number || ""} 
          ${client.companyName || ""} 
          ${client.firstName || ""} 
          ${client.paternalSurname || ""} 
          ${client.maternalSurname || ""} 
          ${q.contractNumber || ""}
        `.toLowerCase();
        return searchableString.includes(search);
      });
    }

    if (dateRange && dateRange[0] && dateRange[1]) {
      const start = dateRange[0].startOf("day");
      const end = dateRange[1].endOf("day");

      result = result.filter((q: any) => {
        if (!q.createAt) return false;
        const dateRaw = q.createAt?.seconds ? q.createAt.toDate() : q.createAt;
        const quoteDate = dayjs(dateRaw);
        return (
          (quoteDate.isAfter(start) || quoteDate.isSame(start)) &&
          (quoteDate.isBefore(end) || quoteDate.isSame(end))
        );
      });
    }

    return result;
  }, [searchText, dateRange, quotations]);

  return (
    <Row gutter={[16, 24]}>
      {/* Estilos para forzar la visibilidad del placeholder si el tema falla */}
      <style>
        {`
          .custom-search-input ::placeholder,
          .custom-range-picker .ant-picker-input > input::placeholder {
            color: rgba(255, 255, 255, 0.45) !important;
            opacity: 1;
          }
        `}
      </style>

      <Col span={24}>
        <Button
          type="primary"
          size="large"
          onClick={() => navigate("/quotations/new")}
        >
          <FontAwesomeIcon icon={faPlus} />
          &nbsp; Agregar Cotización
        </Button>
      </Col>

      <Col span={24}>
        <Flex gap="middle" align="flex-end" wrap="wrap">
          {/* Input con clase personalizada y variante para mejor contraste */}
          <Flex vertical style={{ flex: 2, minWidth: "300px" }}>
            <Text strong style={{ marginBottom: 8, display: "block" }}>
              <FontAwesomeIcon icon={faSearch} /> Búsqueda general
            </Text>
            <Input
              className="custom-search-input"
              placeholder="DNI, RUC, Celular, Cliente o Contrato..."
              onChange={(e) => handleSearch(e.target.value)}
              allowClear
              size="large"
            />
          </Flex>

          <Flex vertical style={{ flex: 1, minWidth: "280px" }}>
            <Text strong style={{ marginBottom: 8, display: "block" }}>
              <FontAwesomeIcon icon={faCalendarAlt} /> Rango de fechas
            </Text>
            <RangePicker
              className="custom-range-picker"
              size="large"
              onChange={(dates) => setDateRange(dates as any)}
              placeholder={["Desde", "Hasta"]}
              style={{ width: "100%" }}
            />
          </Flex>
        </Flex>
      </Col>

      <Col span={24}>
        <Title level={2}>Cotizaciones ({filteredQuotations.length})</Title>
      </Col>

      <Col span={24}>
        <QuotationTable
          quotations={filteredQuotations}
          quotationsLoading={quotationsLoading}
        />
      </Col>
    </Row>
  );
}
