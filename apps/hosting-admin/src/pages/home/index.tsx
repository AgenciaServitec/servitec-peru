import { Row, Col } from "../../components";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFileLines,
  faWrench,
  faBoxesPacking,
  faClipboardUser,
  faUsers,
  faPlus,
  faListUl,
} from "@fortawesome/free-solid-svg-icons";
import { useAuthentication } from "../../providers";
import { AssistanceMonitor } from "../../components/layout/AssistanceMonitor.tsx";

export function Home() {
  const navigate = useNavigate();
  const { authUser } = useAuthentication();

  const shortcuts = [
    {
      title: "Cotizaciones",
      icon: faFileLines,
      path: "/quotations",
      newPath: "/quotations/new",
      color: "#ffc107",
    },
    {
      title: "Servicios",
      icon: faWrench,
      path: "/services-requests",
      newPath: "/services-requests/new",
      color: "#17a2b8",
    },
    {
      title: "Asistencias",
      icon: faClipboardUser,
      path: "/assistances",
      newPath: "/assistances/assistance",
      color: "#28a745",
    },
    {
      title: "Proveedores",
      icon: faBoxesPacking,
      path: "/suppliers",
      newPath: "/suppliers/new",
      color: "#6f42c1",
    },
  ];

  const isAdmin = [
    "XfQXaMRZD7Gro2kPaIvU",
    "fRiTn5k6TP5TJvpXZeLS",
    "woc2g3M8EO4RYtXFap6n",
  ].includes(authUser?.id);
  if (isAdmin) {
    shortcuts.push({
      title: "Usuarios",
      icon: faUsers,
      path: "/users",
      newPath: "/users/new",
      color: "#dc3545",
    });
  }

  return (
    <HomeContainer>
      <WelcomeHeader>
        <h1>
          Servitec <span>Work</span>
        </h1>
        <p>Gestión de infraestructura y personal técnico</p>
      </WelcomeHeader>

      <GridWrapper>
        <Row gutter={[20, 20]}>
          {shortcuts.map((item, index) => (
            <Col xs={24} md={12} lg={8} key={index}>
              <ModernCard $color={item.color}>
                <CardBody>
                  <IconContainer $color={item.color}>
                    <FontAwesomeIcon icon={item.icon} />
                  </IconContainer>
                  <div className="info">
                    <h3>{item.title}</h3>
                    <span>Módulo de gestión</span>
                  </div>
                </CardBody>

                <LightningActions $color={item.color}>
                  <button
                    className="list-action"
                    onClick={() => navigate(item.path)}
                  >
                    <FontAwesomeIcon icon={faListUl} />
                    <span>Lista</span>
                  </button>
                  <button
                    className="create-action"
                    onClick={() => navigate(item.newPath)}
                  >
                    <FontAwesomeIcon icon={faPlus} />
                    <span>Crear</span>
                  </button>
                </LightningActions>
              </ModernCard>
            </Col>
          ))}
        </Row>
      </GridWrapper>
      <AssistanceMonitor />
    </HomeContainer>
  );
}

const HomeContainer = styled.div``;

const WelcomeHeader = styled.div`
  margin-bottom: 48px;
  h1 {
    font-size: 2.2rem;
    font-weight: 900;
    color: #fff;
    letter-spacing: -1px;
    span {
      color: ${({ theme }) => theme.colors.primary || "#007bff"};
    }
  }
  p {
    color: rgba(255, 255, 255, 0.4);
    font-size: 1rem;
    margin-top: 4px;
  }
`;

const GridWrapper = styled.div`
  margin: 0 auto;
`;

const ModernCard = styled.div<{ $color: string }>`
  background: #121212;
  border-radius: 20px;
  border: 1px solid rgba(255, 255, 255, 0.06);
  transition: all 0.4s cubic-bezier(0.23, 1, 0.32, 1);
  position: relative;
  overflow: hidden;

  &:hover {
    transform: translateY(-6px);
    border-color: ${({ $color }) => $color};
    background: #161616;
    box-shadow:
      0 20px 40px rgba(0, 0, 0, 0.4),
      0 0 20px ${({ $color }) => $color}10;
  }
`;

const CardBody = styled.div`
  padding: 24px;
  display: flex;
  align-items: center;
  gap: 20px;

  .info {
    h3 {
      color: #fff;
      margin: 0;
      font-size: 1.2rem;
      font-weight: 700;
      letter-spacing: -0.3px;
    }
    span {
      color: rgba(255, 255, 255, 0.3);
      font-size: 0.7rem;
      text-transform: uppercase;
      font-weight: 600;
    }
  }
`;

const IconContainer = styled.div<{ $color: string }>`
  width: 52px;
  height: 52px;
  border-radius: 14px;
  background: ${({ $color }) => $color}10;
  color: ${({ $color }) => $color};
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1.4rem;
  border: 1px solid ${({ $color }) => $color}20;
`;

const LightningActions = styled.div<{ $color: string }>`
  display: grid;
  grid-template-columns: 1fr 1fr;
  height: 64px;
  background: rgba(255, 255, 255, 0.02);
  border-top: 1px solid rgba(255, 255, 255, 0.04);

  button {
    border: none;
    cursor: pointer;
    background: transparent;
    color: rgba(255, 255, 255, 0.4);
    font-weight: 700;
    font-size: 0.8rem;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 10px;
    transition: all 0.3s;
    text-transform: uppercase;

    span {
      letter-spacing: 0.5px;
    }
    &:hover {
      color: #fff;
      background: rgba(255, 255, 255, 0.03);
    }
  }

  .list-action {
    clip-path: polygon(0 0, 100% 0, 80% 100%, 0% 100%);
    border-right: 1px solid rgba(255, 255, 255, 0.05);
    &:hover {
      background: ${({ $color }) => $color}15;
      color: ${({ $color }) => $color};
    }
  }

  .create-action {
    clip-path: polygon(17% 0, 100% 0, 100% 100%, 0% 100%);
    margin-left: -18%;
    padding-left: 12%;
    &:hover {
      background: rgba(255, 255, 255, 0.08);
    }
  }

  @media (max-width: 767px) {
    height: 56px;
    .list-action {
      clip-path: polygon(0 0, 100% 0, 85% 100%, 0% 100%);
    }
    .create-action {
      margin-left: -12%;
    }
  }
`;
