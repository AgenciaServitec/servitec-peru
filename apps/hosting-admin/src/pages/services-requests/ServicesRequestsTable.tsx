import { Button, Space, Table, Tag, Typography } from "antd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import dayjs from "dayjs";
import { faEye } from "@fortawesome/free-solid-svg-icons";
import { SERVICE_REQUEST_STATUS } from "../../data-list/serviceRequestStatus.ts";
import { PRIORITY_LEVELS } from "../../data-list/serviceRequestPriorityLevels.ts";

const { Text } = Typography;

export const ServicesRequestsTable = ({
  requests,
  loading,
  onShowDetail,
  user,
}: any) => {
  const getStatusInfo = (statusValue: string) => {
    return (
      SERVICE_REQUEST_STATUS.find((s) => s.value === statusValue) ||
      SERVICE_REQUEST_STATUS[0]
    );
  };

  const getPriorityInfo = (priorityValue: string) => {
    return (
      PRIORITY_LEVELS.find((p) => p.value === priorityValue) ||
      PRIORITY_LEVELS[1]
    );
  };

  const columns = [
    {
      title: "Cliente",
      dataIndex: ["client", "fullName"],
      key: "name",
      render: (text: string, record: any) => (
        <Space direction="vertical" size={0}>
          <Text strong style={{ textTransform: "capitalize" }}>
            {text}
          </Text>
          <Text type="secondary">{record.client.phone.number}</Text>
        </Space>
      ),
    },
    {
      title: "Equipo",
      dataIndex: ["device", "model"],
      key: "device",
    },
    {
      title: "Estado",
      dataIndex: "status",
      key: "status",
      render: (status: string) => {
        const info = getStatusInfo(status);
        return (
          <Tag
            color={info.color}
            icon={
              <FontAwesomeIcon icon={info.icon} style={{ marginRight: 5 }} />
            }
          >
            {info.label.toUpperCase()}
          </Tag>
        );
      },
    },
    {
      title: "Prioridad",
      dataIndex: "priority",
      key: "priority",
      render: (priority: string) => {
        const info = getPriorityInfo(priority);
        return (
          <Tag
            color={info.color}
            icon={
              <FontAwesomeIcon icon={info.icon} style={{ marginRight: 5 }} />
            }
          >
            {info.label.toUpperCase()}
          </Tag>
        );
      },
    },
    {
      title: "Fecha",
      dataIndex: "createAt",
      key: "date",
      render: (date: any) =>
        date ? dayjs(date.toDate()).format("DD/MM/YYYY HH:mm") : "---",
    },
    {
      title: "Acciones",
      key: "actions",
      align: "right" as const,
      render: (record: any) => (
        <Space>
          <Button
            type="text"
            icon={<FontAwesomeIcon icon={faEye} style={{ color: "#1890ff" }} />}
            onClick={() => onShowDetail(record)}
          />
        </Space>
      ),
    },
  ];

  return (
    <Table
      dataSource={requests}
      columns={columns}
      loading={loading}
      rowKey="id"
      scroll={{ x: 1200 }}
    />
  );
};
