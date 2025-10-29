import { useEffect } from "react";
import { notification, Spinner, Row, Col, Button } from "../../components/ui";
import { useCollectionData } from "react-firebase-hooks/firestore";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSignInAlt } from "@fortawesome/free-solid-svg-icons";
import { AssistancesTable } from "./Assistances.Table";
import styled from "styled-components";
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
    <Wrapper>
      {assistancesLoading ? (
        <Spinner height="40svh" size="4x" />
      ) : (
        <Row gutter={[24, 24]}>
          <Col span={24}>
            <Actions>
              <Button
                onClick={() => onNavigateGoTo("/assistances/assistance")}
                type="primary"
                size="large"
              >
                <FontAwesomeIcon icon={faSignInAlt} />
                Marcar mi asistencia
              </Button>
              <Button
                onClick={() => onNavigateGoTo("/assistances/register")}
                size="large"
              >
                <FontAwesomeIcon icon={faSignInAlt} />
                Registrar mi rostro
              </Button>
            </Actions>
          </Col>

          <Col span={24}>
            <Header>
              <h2>Lista de Asistencias</h2>
            </Header>
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
    </Wrapper>
  );
}

const Wrapper = styled.div`
  margin: 0 auto;
  padding: 2rem 1rem;
  font-family: "Segoe UI", Roboto, sans-serif;
  color: #f5f5f5;
`;

const Actions = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  margin-bottom: 1.5rem;

  button {
    flex: 1 1 200px;
    font-size: 0.95rem;
    padding: 0.75rem 1rem;
    border-radius: 6px;
    transition:
      background 0.2s,
      transform 0.2s;

    &:hover {
      transform: translateY(-2px);
    }
  }
`;

const Header = styled.div`
  margin-bottom: 1rem;
  > h2 {
    font-size: 1.75rem !important;
  }
`;
