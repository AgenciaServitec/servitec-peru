import dayjs from "dayjs";
import { updateAssistance } from "../../../firebase/collections";
import type { Assistance } from "../../../globalTypes.ts";
import { useDefaultFirestoreProps } from "../../../hooks";

export function useUpdateMinutesWorked() {
  const { assignUpdateProps } = useDefaultFirestoreProps();

  const updateMinutesWorked = async (assistance: Assistance): Promise<void> => {
    if (!assistance?.entry?.date || !assistance?.outlet?.date) {
      return;
    }

    const start = dayjs(assistance.entry.date, "DD-MM-YYYY HH:mm");
    const end = dayjs(assistance.outlet.date, "DD-MM-YYYY HH:mm");

    const minutes = end.diff(start, "minute");

    const updatedAssistance: Assistance = {
      ...assistance,
      minutesWorked: minutes,
    };

    try {
      await updateAssistance(
        assistance.id,
        assignUpdateProps(updatedAssistance)
      );
    } catch (err) {
      console.error("Error actualizando asistencia: ", err);
    }
  };

  return { updateMinutesWorked };
}
