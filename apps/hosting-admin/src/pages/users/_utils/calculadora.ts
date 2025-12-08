import dayjs from "dayjs";
import { round } from "lodash";
import type { Assistance } from "../../../globalTypes";
import type { User } from "..";

export function calcularTotales(
  asistencias: Assistance[],
  usuario: User | null
) {
  let total = 0;
  let sundayMinutes = 0;

  asistencias.forEach((a) => {
    const mins = a.minutesWorked || 0;
    total += mins;

    const date =
      a.createAt?.toMillis?.() ?? new Date(a.createAtString ?? "").getTime();

    if (dayjs(date).day() === 0) sundayMinutes += mins;
  });

  const sundayPayment = round(sundayMinutes * 0.08333, 2);

  const lunchTrueCount = asistencias.filter(
    (a) => a.orderLunch === true
  ).length;
  const lunchFalseCount = asistencias.filter(
    (a) => a.orderLunch === false
  ).length;

  const lunchBonus = usuario?.foodVoucher
    ? lunchFalseCount * usuario.foodVoucher
    : 0;

  const normalMinutes = total - sundayMinutes;
  const normalPay = round(normalMinutes * (usuario?.payPerMinute ?? 0), 2);

  const grandTotal = normalPay + sundayPayment + lunchBonus;

  return {
    total,
    sundayMinutes,
    sundayPayment,
    lunchTrueCount,
    lunchFalseCount,
    lunchBonus,
    normalPay,
    grandTotal,
    normalMinutes,
  };
}
