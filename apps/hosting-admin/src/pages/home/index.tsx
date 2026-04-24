import { CanAccess, Col, Row, Title } from "../../components";
import { useNavigate } from "react-router-dom";
import styled, { css } from "styled-components";
import {
  faBoxesPacking,
  faClipboardUser,
  faFileLines,
  faUsers,
  faWrench,
} from "@fortawesome/free-solid-svg-icons";
import { AssistanceMonitor } from "../../components/layout/AssistanceMonitor.tsx";
import ShortcutCard from "./ShortcutCard.tsx";

export function Home() {
  const navigate = useNavigate();

  const shortcuts = [
    {
      title: "Usuarios",
      icon: faUsers,
      path: "/users",
      newPath: "/users/new",
      color: "#F43F5E",
      permission: "users_view_list",
    },
    {
      title: "Cotizaciones",
      icon: faFileLines,
      path: "/quotations",
      newPath: "/quotations/new",
      color: "#FFC107",
      permission: "quotes_view_all",
    },
    {
      title: "Solicitud de Servicios",
      icon: faWrench,
      path: "/services-requests",
      newPath: "",
      color: "#0EA5E9",
      permission: "service_view_all",
    },
    {
      title: "Asistencias",
      icon: faClipboardUser,
      path: "/assistances",
      newPath: "/assistances/assistance",
      color: "#10B981",
      permission: "assist_view_all",
    },
    {
      title: "Proveedores",
      icon: faBoxesPacking,
      path: "/suppliers",
      newPath: "/suppliers/new",
      color: "#8B5CF6",
      permission: "suppliers_view_all",
    },
  ];

  return (
    <Row gutter={[16, 32]}>
      <Col span={24}>
        <SectionHeader>
          <Title level={4} style={{ margin: 0 }}>
            Accesos directos
          </Title>
          <p className="description">
            Gestión de módulos y creación de registros
          </p>
        </SectionHeader>

        <Row gutter={[16, 16]}>
          {shortcuts.map((item, index) => (
            <Col xs={24} sm={12} lg={8} xl={6} key={index}>
              <CanAccess permission={item.permission}>
                <ShortcutCard
                  item={item}
                  onList={() => navigate(item.path)}
                  onCreate={() => navigate(item.newPath)}
                />
              </CanAccess>
            </Col>
          ))}
        </Row>
      </Col>

      <Col span={24}>
        <SectionHeader style={{ marginTop: "1rem" }}>
          <Title level={4} style={{ margin: 0 }}>
            Monitoreo de actividad
          </Title>
          <p className="description">
            Estado del personal técnico en tiempo real
          </p>
        </SectionHeader>
        <AssistanceMonitor />
      </Col>
    </Row>
  );
}

const SectionHeader = styled.div`
  ${({ theme }) => css`
    margin-bottom: ${theme.spacing.md};

    h4 {
      color: ${theme.colors.fontPrimary};
      font-weight: ${theme.font_weight.large} !important;
    }

    .description {
      color: ${theme.colors.fontSecondary};
      font-size: ${theme.font_sizes.sm};
      margin: ${theme.spacing.xs} 0 0 0;
      opacity: 0.8;
    }
  `}
`;
