import { QuotationTable } from "./QuotationTable.tsx";
import { useCollectionData } from "react-firebase-hooks/firestore";
import { firestore } from "../../firebase";
import { Col, Row } from "antd";
import { Title } from "../../components";

export function QuotationsIntegrations() {
  const [quotations = [], quotationsLoading, quotationsError] =
    useCollectionData(
      firestore.collection("quotations").where("isDeleted", "==", false)
    );

  return (
    <Row gutter={[16, 16]}>
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
