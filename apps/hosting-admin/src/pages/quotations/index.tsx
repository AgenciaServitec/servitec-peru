import { useCallback, useMemo, useState } from "react";
import { debounce } from "lodash";
import { Input } from "antd";
import { QuotationTable } from "./QuotationTable.tsx";
import { useCollectionData } from "react-firebase-hooks/firestore";
import { firestore } from "../../firebase";
import { Button, Col, Row, Title } from "../../components";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faSearch } from "@fortawesome/free-solid-svg-icons";

export function QuotationsIntegrations() {
  const navigate = useNavigate();
  const [searchText, setSearchText] = useState("");

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
    const search = searchText.toLowerCase().trim();
    if (!search) return quotations;

    return quotations.filter((q: any) => {
      const { client = {}, contractNumber = "" } = q;
      const {
        document,
        phone,
        companyName,
        firstName,
        paternalSurname,
        maternalSurname,
      } = client;

      const searchableString = `
        ${document?.number || ""} 
        ${phone?.number || ""} 
        ${companyName || ""} 
        ${firstName || ""} 
        ${paternalSurname || ""} 
        ${maternalSurname || ""} 
        ${contractNumber}
      `.toLowerCase();

      return searchableString.includes(search);
    });
  }, [searchText, quotations]);

  return (
    <Row gutter={[16, 16]}>
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
        <Input
          placeholder="Buscar por DNI/RUC, Celular, Cliente o Contrato..."
          prefix={
            <FontAwesomeIcon icon={faSearch} style={{ color: "#bfbfbf" }} />
          }
          onChange={(e) => handleSearch(e.target.value)}
          allowClear
          size="large"
          style={{ width: "100%", marginBottom: "8px" }}
        />
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
