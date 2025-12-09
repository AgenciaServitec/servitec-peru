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

    const dateMillis =
      a.createAt?.toMillis?.() ??
      dayjs(a.createAtString ?? "", "DD-MM-YYYY HH:mm").valueOf();

    if (!dateMillis || Number.isNaN(dateMillis)) return;

    if (dayjs(dateMillis).day() === 0) sundayMinutes += mins;
  });

  const sundayPayment = round(sundayMinutes * 0.08333, 2);

  const lunchTrueCount = asistencias.filter((a) => {
    if (a.orderLunch !== true) return false;

    const dateMillis =
      a.createAt?.toMillis?.() ??
      dayjs(a.createAtString ?? "", "DD-MM-YYYY HH:mm").valueOf();

    if (!dateMillis || Number.isNaN(dateMillis)) return false;

    return dayjs(dateMillis).day() !== 0;
  }).length;

  const lunchFalseCount = asistencias.filter((a) => {
    if (a.orderLunch !== false) return false;

    const dateMillis =
      a.createAt?.toMillis?.() ??
      dayjs(a.createAtString ?? "", "DD-MM-YYYY HH:mm").valueOf();

    if (!dateMillis || Number.isNaN(dateMillis)) return false;

    return dayjs(dateMillis).day() !== 0;
  }).length;

  const voucher =
    typeof usuario?.foodVoucher === "number" ? usuario!.foodVoucher : 0;
  const lunchBonus = round(lunchFalseCount * voucher, 2);

  const normalMinutes = Math.max(0, total - sundayMinutes);
  const normalPay = round(normalMinutes * (usuario?.payPerMinute ?? 0), 2);

  const grandTotal = round(normalPay + sundayPayment + lunchBonus, 2);

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
