import dayjs from "dayjs";
import { IconAction, Table, Tag } from "../../components";
import type { Assistance } from "../../globalTypes.ts";
import { useUpdateMinutesWorked } from "./_utils";
import { useEffect } from "react";
import { orderBy } from "lodash";
import {
  faBowlRice,
  faCheck,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";

interface AssistancesTableProps {
  loading: boolean;
  assistances: Assistance[];
  onShowSubmitOrderLunch: (assistance: Assistance) => void;
}

export const AssistancesTable = ({
  loading,
  assistances,
  onShowSubmitOrderLunch,
}: AssistancesTableProps) => {
  const { updateMinutesWorked } = useUpdateMinutesWorked();
  useEffect(() => {
    assistances?.forEach((assistance: Assistance) => {
      const hasEntry = assistance?.entry?.date;
      const hasOutlet = assistance?.outlet?.date;

      if (hasEntry && hasOutlet) {
        const start = dayjs(assistance.entry.date, "DD-MM-YYYY HH:mm");
        const end = dayjs(assistance.outlet.date, "DD-MM-YYYY HH:mm");
        const newMinutes = end.diff(start, "minute");

        if (assistance.minutesWorked !== newMinutes) {
          updateMinutesWorked(assistance);
        }
      }
    });
  }, [assistances, updateMinutesWorked]);

  const columns = [
    {
      title: "Fecha",
      align: "center",
      width: ["3rem", "100%"],
      render: (assistance: Assistance) =>
        dayjs(assistance.createAt.toDate()).format("DD/MM/YYYY"),
    },
    {
      title: "Apellidos y Nombres",
      align: "center",
      width: ["15rem", "100%"],
      render: (assistance: Assistance) => assistance.user.firstName,
    },
    {
      title: "Lugar de Trabajo",
      align: "center",
      width: ["15rem", "100%"],
      render: (assistance: Assistance) => assistance.workPlace,
    },
    {
      title: "Pidió Almuerzo?",
      align: "center",
      width: ["10rem", "100%"],
      render: (assistance: Assistance) => {
        const hasValue =
          assistance.orderLunch === true || assistance.orderLunch === false;

        return (
          <span
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              gap: "0.4rem",
              width: "100%",
            }}
          >
            <IconAction
              tooltipTitle="Almuerzo"
              icon={faBowlRice}
              styled={{
                color: (theme) => theme.colors.info,
                fontSize: "1.2rem",
              }}
              onClick={() => onShowSubmitOrderLunch(assistance)}
            />

            {hasValue && (
              <IconAction
                tooltipTitle={assistance.orderLunch ? "Sí pidió" : "No pidió"}
                icon={assistance.orderLunch ? faCheck : faXmark}
                styled={{
                  color: (theme) =>
                    assistance.orderLunch
                      ? theme.colors.success
                      : theme.colors.error,
                  fontSize: "1.2rem",
                }}
                onClick={() => {}}
              />
            )}
          </span>
        );
      },
    },

    {
      title: "Hora entrada",
      align: "center",
      width: ["7rem", "100%"],
      render: (assistance: Assistance) =>
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
      render: (assistance: Assistance) =>
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
      title: "Horas trabajadas",
      align: "center" as const,
      width: ["6rem", "100%"] as const,
      render: (assistance: Assistance) => {
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
      title: "Minutos trabajados",
      align: "center" as const,
      width: ["6rem", "100%"] as const,
      render: (assistance: Assistance) =>
        assistance.minutesWorked != null ? (
          <Tag color="purple">{assistance.minutesWorked} min</Tag>
        ) : (
          "-"
        ),
    },
  ];

  return (
    <Table
      loading={loading}
      dataSource={orderBy(
        assistances,
        (a) => dayjs(a.createAtString, "DD-MM-YYYY HH:mm").toDate().getTime(),
        "asc"
      )}
      columns={columns}
      scroll={{ x: "max-content" }}
    />
  );
};
