import type { FC } from "react";
import {
  Button,
  Col,
  IconAction,
  Row,
  Space,
  Table,
  Tag,
  Typography,
  useModalConfirm,
} from "../../components";
import { faEdit, faPlus, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { theme } from "../../styles";
import { useCollectionData } from "react-firebase-hooks/firestore";
import {
  deleteRole,
  rolesRef,
} from "../../firebase/collections/rolesAndPermissons.ts";
import { useNavigate } from "react-router-dom";

const { Title } = Typography;

export const RolesList: FC = () => {
  const navigate = useNavigate();
  const { modalConfirm } = useModalConfirm();

  const [roles] = useCollectionData(rolesRef.where("isDeleted", "==", false));

  const onConfirmRemoveRole = (role): void => {
    modalConfirm({
      content: "El rol se eliminará",
      onOk: async () => {
        await deleteRole(role.id, role);
      },
    });
  };

  const columns = [
    {
      title: "Rol",
      dataIndex: "name",
      key: "name",
      render: (text: string) => text,
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
      render: (role) => (
        <Space size="middle">
          <IconAction
            tooltipTitle="Editar"
            onClick={() => navigate(`/roles-and-permissions/${role.id}`)}
            icon={faEdit}
          />
          <IconAction
            tooltipTitle="Eliminar"
            onClick={() => onConfirmRemoveRole(role)}
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
        <Row gutter={[16, 16]} justify="space-between" align="middle">
          <Col>
            <Title level={2} style={{ margin: 0 }}>
              Roles y Permisos
            </Title>
          </Col>
          <Col>
            <Button
              type="primary"
              icon={<FontAwesomeIcon icon={faPlus} />}
              size="large"
              onClick={() => navigate("/roles-and-permissions/new")}
            >
              Agregar Rol
            </Button>
          </Col>
        </Row>
      </Col>
      <Col span={24}>
        <Table
          columns={columns}
          dataSource={roles}
          pagination={false}
          size="small"
          scroll={{ x: 1200 }}
        />
      </Col>
    </Row>
  );
};
