import { useNavigate, type NavigateFunction } from "react-router-dom";
import { useCollectionData } from "react-firebase-hooks/firestore";
import { firestore } from "../../firebase";
import { Row, Col, Button, Title } from "../../components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { SuppliersTable } from "./SuppliersTable";
import type { Supplier } from "../../globalTypes";

interface QuotationsProps {
  navigate: NavigateFunction;
  suppliers: Supplier[];
  suppliersLoading: boolean | undefined;
}

export function SuppliersIntegration() {
  const navigate = useNavigate();

  const [suppliers = [], suppliersLoading, suppliersError] =
    useCollectionData<Supplier>(
      firestore.collection("suppliers").where("isDeleted", "==", false)
    );

  if (suppliersError) {
    console.error("Error cargando proveedores:", suppliersError);
  }

  return (
    <Quotations
      suppliers={suppliers as Supplier[]}
      navigate={navigate}
      suppliersLoading={suppliersLoading}
    />
  );
}

function Quotations({
  navigate,
  suppliers,
  suppliersLoading,
}: QuotationsProps) {
  return (
    <Row>
      <Col>
        <Button
          type="primary"
          size="large"
          onClick={() => navigate("/suppliers/new")}
        >
          <FontAwesomeIcon icon={faPlus} />
          Agregar Proveedor
        </Button>
      </Col>
      <Col span={24}>
        <Title level={2}>Proveedores ({suppliers.length})</Title>
      </Col>
      <Col span={24}>
        <SuppliersTable
          suppliers={suppliers}
          suppliersLoading={suppliersLoading}
        />
      </Col>
    </Row>
  );
}
