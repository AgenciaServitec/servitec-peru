import { type NavigateFunction, useNavigate } from "react-router-dom";
import { useCollectionData } from "react-firebase-hooks/firestore";
import { firestore } from "../../firebase";
import { Button, CanAccess, Col, Row, Title } from "../../components";
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
    <Suppliers
      suppliers={suppliers as Supplier[]}
      navigate={navigate}
      suppliersLoading={suppliersLoading}
    />
  );
}

function Suppliers({ navigate, suppliers, suppliersLoading }: QuotationsProps) {
  return (
    <Row gutter={[16, 16]}>
      <Col span={24}>
        <Row gutter={[16, 16]} justify="space-between" align="middle">
          <Col>
            <Title level={2} style={{ margin: 0 }}>
              Proveedores ({suppliers.length})
            </Title>
          </Col>
          <Col>
            <Button
              type="primary"
              icon={<FontAwesomeIcon icon={faPlus} />}
              size="large"
              onClick={() => navigate("/roles-and-permissions/new")}
            >
              Agregar Proveedor
            </Button>
          </Col>
        </Row>
      </Col>
      <Col span={24}>
        <CanAccess permission="suppliers_view_all">
          <SuppliersTable
            suppliers={suppliers}
            suppliersLoading={suppliersLoading}
          />
        </CanAccess>
      </Col>
    </Row>
  );
}
