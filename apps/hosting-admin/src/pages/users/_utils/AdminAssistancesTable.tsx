import type { Assistance } from "../../../globalTypes.ts";
import React, { useEffect, useState } from "react";
import type { ColumnsType } from "antd/es/table";
import dayjs from "dayjs";
import { Table, Tag, Modal, DatePicker, Button } from "../../../components";
import { orderBy } from "lodash";
import styled, { css } from "styled-components";
import { theme } from "../../../styles";
import { updateAssistance } from "../../../firebase/collections";
import { useUpdateMinutesWorked } from "../../assistances/_utils";
import moment from "moment-timezone";

interface AssistancesTableProps {
  assistances: Assistance[];
}

interface TableAssistance extends Assistance {
  key: string;
}

export const AdminAssistancesTable: React.FC<AssistancesTableProps> = ({
  assistances,
}) => {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState<any>(null);
  const [newDate, setNewDate] = useState<any>(null);
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

  const openEditor = (type: "entry" | "outlet", assistance: Assistance) => {
    setSelected({ assistance, type });
    const dateString = assistance[type]?.date;
    if (!dateString) {
      const baseDate = dayjs(assistance?.entry.date, "DD-MM-YYYY HH:mm");
      setNewDate(baseDate);
      setOpen(true);
      return;
    }

    setNewDate(dayjs(dateString, "DD-MM-YYYY HH:mm"));
    setOpen(true);

    setOpen(true);
  };

  const handleSave = async () => {
    if (!selected || !newDate) return;
    const { assistance, type } = selected;
    const formatted = newDate.format("DD-MM-YYYY HH:mm");
    const timestamp = moment(formatted, "DD-MM-YYYY HH:mm")
      .tz("America/Lima")
      .toDate();
    const updateObj = {
      [type]: {
        date: formatted,
        dateTimestamp: timestamp,
      },
      createAtString: assistance.createAtString,
    };
    await updateAssistance(assistance.id, updateObj);
    setOpen(false);
    setSelected(null);
  };

  const updateOrderLunch = async (assistance: Assistance, value: boolean) => {
    await updateAssistance(assistance.id, {
      orderLunch: value,
    });
  };

  const columns: ColumnsType<TableAssistance> = [
    {
      title: "Fecha",
      dataIndex: "createAtString",
      key: "createAtString",
      width: 180,
      align: "center",
      render: (_, assistance) =>
        assistance.createAtString ? assistance.createAtString : "-",
    },
    {
      title: "Entrada",
      width: 180,
      align: "center",
      render: (assistance) =>
        assistance?.entry ? (
          <Tag
            color="green"
            style={{ cursor: "pointer" }}
            onClick={() => openEditor("entry", assistance)}
          >
            {dayjs(assistance.entry.date, "DD-MM-YYYY HH:mm").format(
              "DD/MM/YYYY HH:mm A"
            )}
          </Tag>
        ) : (
          "-"
        ),
    },
    {
      title: "Salida",
      width: 180,
      align: "center",
      render: (assistance) =>
        assistance?.outlet ? (
          <Tag
            color="red"
            style={{ cursor: "pointer" }}
            onClick={() => openEditor("outlet", assistance)}
          >
            {dayjs(assistance.outlet.date, "DD-MM-YYYY HH:mm").format(
              "DD/MM/YYYY HH:mm A"
            )}
          </Tag>
        ) : (
          <Button size="small" onClick={() => openEditor("outlet", assistance)}>
            Agregar salida
          </Button>
        ),
    },
    {
      title: "Minutos Trabajados",
      width: 180,
      align: "center",
      render: (_, assistance) =>
        assistance?.minutesWorked ? assistance.minutesWorked : "-",
    },
    {
      title: "Lugar de Trabajo",
      width: 180,
      align: "center",
      render: (_, assistance) =>
        assistance?.workPlace ? assistance.workPlace : "-",
    },
    {
      title: "Pidió Almuerzo?",
      width: 180,
      align: "center",
      render: (_, assistance) => {
        const val = assistance.orderLunch;

        return (
          <div
            style={{ display: "flex", gap: "0.5rem", justifyContent: "center" }}
          >
            <Button
              size="small"
              type={val === true ? "primary" : "default"}
              onClick={() => updateOrderLunch(assistance, true)}
            >
              Sí
            </Button>

            <Button
              size="small"
              danger={val === false}
              type={val === false ? "primary" : "default"}
              onClick={() => updateOrderLunch(assistance, false)}
            >
              No
            </Button>
          </div>
        );
      },
    },
  ];

  const dataSource: TableAssistance[] = orderBy(
    assistances,
    ["createAt"],
    ["desc"]
  ).map((assistance) => ({
    ...assistance,
    key: assistance.id,
  }));

  return (
    <>
      <TableContainer>
        <Table
          columns={columns}
          dataSource={dataSource}
          pagination={{
            pageSize: 10,
            showSizeChanger: true,
            showTotal: (total) => `Total: ${total} asistencias`,
          }}
          scroll={{ x: 1200 }}
        />
      </TableContainer>

      <Modal
        open={open}
        onCancel={() => setOpen(false)}
        title={`Editar ${selected?.type === "entry" ? "Entrada" : "Salida"}`}
        footer={[
          <Button key="cancel" onClick={() => setOpen(false)}>
            Cancelar
          </Button>,
          <Button key="save" type="primary" onClick={handleSave}>
            Guardar
          </Button>,
        ]}
      >
        {selected && (
          <p
            style={{
              marginBottom: "1rem",
              fontSize: "1rem",
              fontWeight: "bold",
              color: "#ccc",
            }}
          >
            Fecha:
            {dayjs(
              selected.assistance[selected.type]?.date ??
                selected.assistance.entry.date,
              "DD-MM-YYYY HH:mm"
            ).format("DD/MM/YYYY")}
          </p>
        )}

        <DatePicker.TimePicker
          format="HH:mm"
          value={newDate}
          style={{ width: "130px" }}
          onChange={(time) => {
            if (!time || !selected) return;

            const originalDate = dayjs(
              selected.assistance[selected.type]?.date ??
                selected.assistance.entry.date,
              "DD-MM-YYYY HH:mm"
            );

            const updated = originalDate
              .hour(time.hour())
              .minute(time.minute());

            setNewDate(updated);
          }}
        />
      </Modal>
    </>
  );
};

const TableContainer = styled.div`
  margin-top: 2em;
  ${() => css`
    .ant-table {
      background: ${theme.colors.secondary};
      border-radius: ${theme.border_radius.medium};

      .ant-table-thead > tr > th {
        background: ${theme.colors.dark};
        color: ${theme.colors.font1};
        font-weight: ${theme.font_weight.bold};
        border-bottom: 2px solid ${theme.colors.primary};
      }

      .ant-table-tbody > tr > td {
        background: ${theme.colors.secondary};
        color: ${theme.colors.font1};
      }
    }
  `}
`;
