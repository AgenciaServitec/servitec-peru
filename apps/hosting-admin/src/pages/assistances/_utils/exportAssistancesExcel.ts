import ExcelJS from "exceljs";
import { saveAs } from "file-saver";
import type { Assistance } from "../globalTypes";

export async function exportAssistancesExcel(assistances: Assistance[]) {
  const workbook = new ExcelJS.Workbook();
  const worksheet = workbook.addWorksheet("Asistencias");

  const headerRow = worksheet.addRow([
    "Fecha",
    "Nombre",
    "Lugar de trabajo",
    "Hora entrada",
    "Hora salida",
    "Horas trabajadas",
    "Minutos trabajados",
  ]);

  headerRow.eachCell((cell) => {
    cell.font = { bold: true, color: { argb: "FFFFFFFF" } };
    cell.fill = {
      type: "pattern",
      pattern: "solid",
      fgColor: { argb: "FF0077CC" },
    };
    cell.border = {
      top: { style: "thin" },
      left: { style: "thin" },
      bottom: { style: "thin" },
      right: { style: "thin" },
    };
    cell.alignment = { vertical: "middle", horizontal: "center" };
  });

  assistances.forEach((a) => {
    const entry = a.entry?.date || "-";
    const outlet = a.outlet?.date || "-";

    const hours =
      a.minutesWorked != null ? Math.floor(a.minutesWorked / 60) : "-";
    const minutes = a.minutesWorked != null ? a.minutesWorked % 60 : "-";
    const minutesWorked = a.minutesWorked != null ? a.minutesWorked : "-";

    const row = worksheet.addRow([
      a.createAt.toDate().toLocaleDateString(),
      a.user.firstName,
      a.workPlace,
      entry,
      outlet,
      hours === "-" ? "-" : `${hours} h ${minutes} m`,
      minutes === "-" ? "-" : `${minutesWorked}`,
    ]);

    row.eachCell((cell) => {
      cell.border = {
        top: { style: "thin" },
        left: { style: "thin" },
        bottom: { style: "thin" },
        right: { style: "thin" },
      };
      cell.alignment = { vertical: "middle", horizontal: "center" };
    });
  });

  worksheet.columns.forEach((column) => {
    let maxLength = 10;
    column.eachCell({ includeEmpty: true }, (cell) => {
      const val = cell.value ? cell.value.toString().length : 10;
      if (val > maxLength) maxLength = val;
    });
    column.width = maxLength + 4;
  });

  const buffer = await workbook.xlsx.writeBuffer();
  saveAs(
    new Blob([buffer], {
      type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    }),
    `asistencias_${Date.now()}.xlsx`
  );
}
