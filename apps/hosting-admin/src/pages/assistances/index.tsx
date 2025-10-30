import { useEffect } from "react";
import {
  Button,
  Col,
  notification,
  Row,
  Spinner,
  Title,
} from "../../components/ui";
import { useCollectionData } from "react-firebase-hooks/firestore";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSignInAlt } from "@fortawesome/free-solid-svg-icons";
import { AssistancesTable } from "./Assistances.Table";
import { useNavigate } from "react-router-dom";
import { assistancesRef } from "../../firebase/collections";
import { useAuthentication } from "../../providers";

export function AssistancesIntegration() {
  const navigate = useNavigate();
  const { authUser } = useAuthentication();

  const [assistances, assistancesLoading, assistancesError] = useCollectionData(
    assistancesRef.where("isDeleted", "==", false)
  );

  useEffect(() => {
    if (assistancesError) {
      notification({ type: "error", message: "Error al cargar asistencias" });
    }
  }, [assistancesError]);

  const onNavigateGoTo = (pathname = "/") => navigate(pathname);

  return (
    <>
      {assistancesLoading ? (
        <Spinner height="40svh" size="4x" />
      ) : (
        <Row gutter={[16, 16]}>
          <Col span={24} md={12}>
            <Button
              onClick={() => onNavigateGoTo("/assistances/assistance")}
              type="primary"
              size="large"
              block
            >
              <FontAwesomeIcon icon={faSignInAlt} />
              Marcar mi asistencia
            </Button>
          </Col>
          <Col span={24} md={12}>
            <Button
              onClick={() => onNavigateGoTo("/assistances/register")}
              size="large"
              block
            >
              <FontAwesomeIcon icon={faSignInAlt} />
              Registrar mi rostro
            </Button>
          </Col>
          <Col span={24}>
            <Title level={2}>Lista de Asistencias</Title>
          </Col>
          <Col span={24}>
            <AssistancesTable
              assistances={assistances || []}
              user={authUser}
              loading={assistancesLoading}
            />
          </Col>
        </Row>
      )}
    </>
  );
}
