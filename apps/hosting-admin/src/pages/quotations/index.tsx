import { QuotationTable } from "./QuotationTable.tsx";
import { useCollectionData } from "react-firebase-hooks/firestore";
import { firestore } from "../../firebase";
import { Button, Col, Row, Title } from "../../components";
import { useNavigate } from "react-router-dom";

export function QuotationsIntegrations() {
  const navigate = useNavigate();

  const [quotations = [], quotationsLoading, quotationsError] =
    useCollectionData(
      firestore.collection("quotations").where("isDeleted", "==", false)
    );

  return (
    <Row gutter={[16, 16]}>
      <Col span={24}>
        <Button type="primary" onClick={() => navigate("/quotations/new")}>
          Agregar Cotización
        </Button>
      </Col>
      <Col span={24}>
        <Title level={2}>Cotizaciones ({quotations.length})</Title>
      </Col>
      <Col span={24}>
        <QuotationTable
          quotations={quotations}
          quotationsLoading={quotationsLoading}
        />
      </Col>
    </Row>
  );
}
