import dayjs from "dayjs";
import { IconAction, Table, Tag } from "../../components";
import type { Assistance } from "../../globalTypes.ts";
import { useUpdateMinutesWorked } from "./_utils";
import { useEffect } from "react";
import lodash from "lodash";
import {
  faBowlRice,
  faCheck,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
import type { ColumnsType } from "antd/es/table";
import { theme } from "../../styles";

interface AssistancesTableProps {
  assistancesLoading: boolean;
  assistances: Assistance[];
  onShowSubmitOrderLunch: (assistance: Assistance) => void;
}

const { orderBy } = lodash;

export const AssistancesTable = ({
  assistances,
  onShowSubmitOrderLunch,
  assistancesLoading,
}: AssistancesTableProps) => {
  const { updateMinutesWorked } = useUpdateMinutesWorked();
  useEffect(() => {
    assistances?.forEach((assistance: Assistance) => {
      const hasEntry = assistance?.entry?.date;
      const hasOutlet = assistance?.outlet?.date;

      if (hasEntry && hasOutlet) {
        const start = dayjs(assistance?.entry?.date, "DD-MM-YYYY HH:mm");
        const end = dayjs(assistance?.outlet?.date, "DD-MM-YYYY HH:mm");
        const newMinutes = end.diff(start, "minute");

        if (assistance.minutesWorked !== newMinutes) {
          updateMinutesWorked(assistance);
        }
      }
    });
  }, [assistances, updateMinutesWorked]);

  const columns: ColumnsType<Assistance> = [
    {
      key: "createAt",
      dataIndex: "createAt",
      title: "Fecha",
      align: "center",
      width: 100,
      render: (_, assistance) =>
        dayjs(assistance.createAt.toDate()).format("DD/MM/YYYY"),
    },
    {
      key: "fullName",
      dataIndex: "fullName",
      title: "Apellidos y Nombres",
      align: "center",
      width: 100,
      render: (_, assistance) => assistance.user.firstName,
    },
    {
      key: "workPlace",
      dataIndex: "workPlace",
      title: "Lugar de Trabajo",
      align: "center",
      width: 100,
      render: (_, assistance) => assistance.workPlace,
    },
    {
      key: "orderLunch",
      dataIndex: "orderLunch",
      title: "Pidió Almuerzo?",
      align: "center",
      width: 100,
      render: (_, assistance) => {
        const hasValue =
          assistance.orderLunch === true || assistance.orderLunch === false;

        return (
          <span
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              gap: "0.4rem",
            }}
          >
            <IconAction
              tooltipTitle="Almuerzo"
              icon={faBowlRice}
              iconStyles={{
                color: () => theme.colors.info,
              }}
              onClick={() => onShowSubmitOrderLunch(assistance)}
            />

            {hasValue && (
              <IconAction
                tooltipTitle={assistance.orderLunch ? "Sí pidió" : "No pidió"}
                icon={assistance.orderLunch ? faCheck : faXmark}
                iconStyles={{
                  color: () =>
                    assistance.orderLunch
                      ? theme.colors.success
                      : theme.colors.error,
                }}
                onClick={() => {}}
              />
            )}
          </span>
        );
      },
    },

    {
      key: "entry",
      dataIndex: "entry",
      title: "Hora entrada",
      align: "center",
      width: 100,
      render: (_, assistance) =>
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
      key: "outlet",
      dataIndex: "outlet",
      title: "Hora salida",
      align: "center",
      width: 100,
      render: (_, assistance) =>
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
    {
      key: "hoursWorked",
      dataIndex: "hoursWorked",
      title: "Horas trabajadas",
      align: "center",
      width: 100,
      render: (_, assistance) => {
        if (assistance.minutesWorked == null) return "-";

        const hours = Math.floor(assistance.minutesWorked / 60);
        const minutes = assistance.minutesWorked % 60;

        return (
          <Tag color="blue">
            {hours > 0 ? `${hours}h ` : ""}
            {minutes} minutos
          </Tag>
        );
      },
    },
    {
      key: "minutesWorked",
      dataIndex: "minutesWorked",
      title: "Minutos trabajados",
      align: "center",
      width: 100,
      render: (_, assistance) =>
        assistance.minutesWorked != null ? (
          <Tag color="purple">{assistance.minutesWorked} min</Tag>
        ) : (
          "-"
        ),
    },
  ];

  const dataSource: Assistance[] = orderBy(
    assistances,
    (a) => dayjs(a.createAtString, "DD-MM-YYYY HH:mm").toDate().getTime(),
    "desc"
  );

  return (
    <Table
      bordered
      virtual
      loading={assistancesLoading}
      dataSource={dataSource}
      columns={columns}
      size="small"
      scroll={{ x: 1200 }}
      pagination={false}
    />
  );
};
