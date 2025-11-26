import React from "react";
import { IconAction, Space, Table } from "../../components";
import { faCalendar, faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import { capitalize, orderBy } from "lodash";
import dayjs from "dayjs";
import { theme } from "../../styles";
import { Tag } from "antd";
import type { ColumnsType } from "antd/es/table";

export interface Phone {
  prefix: string;
  number: string;
}

export interface User {
  key: string;
  id: string;
  email: string;
  firstName: string;
  paternalSurname: string;
  maternalSurname: string;
  document: {
    type: string;
    number: string;
  };
  phone?: Phone;
  secondaryEmail?: string;
  workPlace?: string;
  createAt: string;
}

interface UsersTableProps {
  users: User[];
  onEditUser: (user: User) => void;
  onRemoveUser: (user: User) => void;
  onViewAssistances: (user: User) => void;
}

export const UsersTable: React.FC<UsersTableProps> = ({
  users,
  onEditUser,
  onRemoveUser,
  onViewAssistances,
}) => {
  const columns: ColumnsType<User> = [
    {
      title: "Fecha de Creación",
      dataIndex: "createAt",
      key: "createAt",
      width: 40,
      align: "center",
      render: (_, user) =>
        user.createAt
          ? dayjs(user.createAt.toDate()).format("DD/MM/YYYY HH:mm")
          : "-",
    },
    {
      title: "Nombres",
      dataIndex: "firstName",
      key: "firstName",
      width: 50,
      render: (_, user) => capitalize(user.firstName || ""),
    },
    {
      title: "Apellido Paterno",
      dataIndex: "paternalSurname",
      key: "paternalSurname",
      width: 50,
      render: (_, user) => capitalize(user.paternalSurname || ""),
    },
    {
      title: "Apellido Materno",
      dataIndex: "maternalSurname",
      key: "maternalSurname",
      width: 50,
      render: (_, user) => capitalize(user.maternalSurname || ""),
    },
    {
      title: "DNI / CE",
      dataIndex: "dniCe",
      key: "dniCe",
      width: 40,
      align: "center",
      render: (_, user) => <Tag color="warning">{user.document.number}</Tag>,
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
      width: 100,
      render: (_, user) => user.email,
    },
    {
      title: "Acciones",
      key: "actions",
      width: 50,
      align: "center",
      fixed: "right",
      render: (_, user) => (
        <Space size="small">
          <IconAction
            tooltipTitle="Ver asistencias"
            icon={faCalendar}
            onClick={() => onViewAssistances(user)}
          />
          <IconAction
            tooltipTitle="Editar"
            icon={faEdit}
            onClick={() => onEditUser(user)}
          />
          <IconAction
            tooltipTitle="Eliminar"
            iconStyles={{ color: () => theme.colors.error }}
            icon={faTrash}
            onClick={() => onRemoveUser(user)}
          />
        </Space>
      ),
    },
  ];

  const dataSource: User[] = orderBy(users, ["createAt"], ["desc"]);

  return (
    <Table
      bordered
      virtual
      columns={columns}
      dataSource={dataSource}
      size="small"
      scroll={{ x: 1200 }}
      pagination={false}
    />
  );
};
