import React from "react";
import styled from "styled-components";
import {
  Button,
  IconAction,
  Input,
  Space,
  Table,
  Tag,
  Typography,
} from "../../components";
import {
  faEdit,
  faPlus,
  faSearch,
  faShield,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { theme } from "../../styles";
import { Col, Row } from "antd";

const { Title } = Typography;

interface RoleData {
  key: string;
  name: string;
  description: string;
  userCount: number;
  permissions: string[];
  color: string;
}

const HeaderSection = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const staticRoles: RoleData[] = [
  {
    key: "1",
    name: "Super Administrador",
    description:
      "Acceso total al sistema, configuración de red y base de datos.",
    userCount: 2,
    permissions: ["all_access", "manage_roles", "delete_records"],
    color: "#FFC107",
  },
  {
    key: "2",
    name: "Administrador",
    description: "Gestión de usuarios, visualización de reportes y auditoría.",
    userCount: 5,
    permissions: ["view_reports", "edit_users", "manage_inventory"],
    color: "#10B981",
  },
  {
    key: "3",
    name: "Técnico",
    description: "Acceso a módulos de soporte técnico y mantenimiento.",
    userCount: 12,
    permissions: ["view_tasks", "edit_tickets", "view_reports"],
    color: "#0EA5E9",
  },
  {
    key: "4",
    name: "Practicante",
    description: "Solo lectura de sus propios datos y registro de asistencias.",
    userCount: 8,
    permissions: ["view_profile", "register_attendance"],
    color: "#666666",
  },
];

export const RolesList: React.FC = () => {
  const columns = [
    {
      title: "Rol",
      dataIndex: "name",
      key: "name",
      render: (text: string, record: RoleData) => (
        <Space>
          <FontAwesomeIcon icon={faShield} style={{ color: record.color }} />
          <p>{text}</p>
        </Space>
      ),
    },
    {
      title: "Descripción",
      dataIndex: "description",
      key: "description",
      width: "30%",
      render: (text: string) => <p>{text}</p>,
    },
    {
      title: "Permisos Destacados",
      dataIndex: "permissions",
      key: "permissions",
      render: (perms: string[]) => (
        <>
          {perms.slice(0, 3).map((p) => (
            <Tag key={p} color="processing">
              {p}
            </Tag>
          ))}
          {perms.length > 3 && <p>+{perms.length - 3}</p>}
        </>
      ),
    },
    {
      title: "Usuarios",
      dataIndex: "userCount",
      key: "userCount",
      align: "center" as const,
      render: (count: number) => <Tag color="default">{count} usuarios</Tag>,
    },
    {
      title: "Acciones",
      key: "action",
      align: "right" as const,
      render: () => (
        <Space size="middle">
          <IconAction
            tooltipTitle="Editar"
            onClick={() => ""}
            size={30}
            icon={faEdit}
          />
          <IconAction
            tooltipTitle="Eliminar"
            onClick={() => ""}
            size={30}
            icon={faTrash}
            iconStyles={{ color: () => theme.colors.error }}
          />
        </Space>
      ),
    },
  ];

  return (
    <Row gutter={[16, 16]}>
      <Col span={24}>
        <Button
          type="primary"
          icon={<FontAwesomeIcon icon={faPlus} />}
          size="large"
          style={{ borderRadius: "8px" }}
        >
          Agregar Rol
        </Button>
        <Title level={2} style={{ margin: 0 }}>
          Roles y Permisos
        </Title>
      </Col>
      <Col span={24}>
        <div style={{ marginBottom: "1rem", display: "flex", gap: "1rem" }}>
          <Input
            placeholder="Buscar rol..."
            prefix={<FontAwesomeIcon icon={faSearch} />}
          />
        </div>

        <Table columns={columns} dataSource={staticRoles} pagination={false} />
      </Col>
    </Row>
  );
};
