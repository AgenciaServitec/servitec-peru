import { Col, Row, Title } from "../../components";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import {
  faBoxesPacking,
  faClipboardUser,
  faFileLines,
  faUsers,
  faWrench,
} from "@fortawesome/free-solid-svg-icons";
import { useAuthentication } from "../../providers";
import { AssistanceMonitor } from "../../components/layout/AssistanceMonitor.tsx";
import ShortcutCard from "./ShortcutCard.tsx";

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
      title: "Solicitud de Servicios",
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
    <Row gutter={[16, 40]}>
      <Col span={24}>
        <SectionHeader>
          <Title level={4} style={{ margin: 0, fontWeight: 500 }}>
            Accesos directos
          </Title>
          <p>Gestión de módulos y creación de registros</p>
        </SectionHeader>
        <Row gutter={[16, 16]}>
          {shortcuts.map((item, index) => (
            <Col xs={24} md={12} lg={8} key={index}>
              <ShortcutCard
                item={item}
                onList={() => navigate(item.path)}
                onCreate={() => navigate(item.newPath)}
              />
            </Col>
          ))}
        </Row>
      </Col>

      <Col span={24}>
        <SectionHeader>
          <Title level={4} style={{ margin: 0, fontWeight: 500 }}>
            Monitoreo de actividad
          </Title>
          <p>Estado del personal técnico en tiempo real</p>
        </SectionHeader>
        <AssistanceMonitor />
      </Col>
    </Row>
  );
}

const SectionHeader = styled.div`
  margin-bottom: 20px;
  p {
    color: #8c8c8c;
    font-size: 0.85rem;
    margin: 4px 0 0 0;
  }
`;
