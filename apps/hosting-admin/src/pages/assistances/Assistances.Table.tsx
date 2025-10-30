import dayjs from "dayjs";
import { Table, Tag } from "../../components";

export const AssistancesTable = ({ loading, assistances }) => {
  const columns = [
    {
      title: "Fecha",
      align: "center",
      width: ["3rem", "100%"],
      render: (assistance) =>
        dayjs(assistance.createAt.toDate()).format("DD/MM/YYYY"),
    },
    {
      title: "Apellidos y Nombres",
      align: "center",
      width: ["15rem", "100%"],
      render: (assistance) => assistance.user.firstName,
    },
    {
      title: "Lugar de Trabajo",
      align: "center",
      width: ["15rem", "100%"],
      render: (assistance) => assistance.workPlace,
    },
    {
      title: "Hora entrada",
      align: "center",
      width: ["7rem", "100%"],
      render: (assistance) =>
        assistance?.entry ? (
          <Tag color="green">
            {dayjs(assistance?.entry.date, "DD-MM-YYYY HH:mm").format(
              "DD/MM/YYYY HH:mm A"
            )}
          </Tag>
        ) : (
          "-"
        ),
    },
    {
      title: "Hora salida",
      align: "center",
      width: ["7rem", "100%"],
      render: (assistance) =>
        assistance?.outlet ? (
          <Tag color="red">
            {dayjs(assistance?.outlet.date, "DD-MM-YYYY HH:mm").format(
              "DD/MM/YYYY HH:mm A"
            )}
          </Tag>
        ) : (
          "-"
        ),
    },
  ];

  return (
    <Table
      loading={loading}
      dataSource={assistances}
      columns={columns}
      scroll={{ x: "max-content" }}
    />
  );
};
