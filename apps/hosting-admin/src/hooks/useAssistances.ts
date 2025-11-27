import { useCallback, useEffect, useState } from "react";
import dayjs from "dayjs";
import { useUserLocation } from "./useUserLocation";
import {
  addAssistance,
  fetchTodayAssistancesByUserId,
  fetchUserByDni,
  getAssistanceId,
  updateAssistance,
} from "../firebase/collections";
import { Timestamp } from "firebase/firestore";
import { useNotification } from "../components";
import { useNavigate } from "react-router-dom";
import { useAuthentication } from "../providers";

export const useAssistance = (assignCreateProps) => {
  const navigate = useNavigate();
  const { notification } = useNotification();

  const [dni, setDni] = useState("");
  const [user, setUser] = useState(null);
  const [buttons, setButtons] = useState({ entry: false, outlet: false });
  const [feedback, setFeedback] = useState({ show: false, type: "" });
  const [assistanceSaved, setAssistanceSaved] = useState(false);
  const [isGeofenceValid, setIsGeofenceValidState] = useState(false);
  const [autoLoginDisabled, setAutoLoginDisabled] = useState(false);

  const { authUser } = useAuthentication();

  const {
    location,
    loading: loadingLocation,
    error: locationError,
    refreshLocation,
  } = useUserLocation((valid) => setIsGeofenceValidState(valid));

  const isToday = (dateStr) =>
    !!dateStr && dayjs(dateStr, "DD-MM-YYYY HH:mm").isSame(dayjs(), "day");

  const fetchToday = useCallback(async () => {
    if (!user) return [];
    const result = await fetchTodayAssistancesByUserId(user.id);
    return result || [];
  }, [user]);

  const hasMarked = useCallback(
    async (type) => {
      const list = await fetchToday();
      return list.some((a) => a[type]?.date && isToday(a[type].date));
    },
    [fetchToday]
  );

  const updateButtons = useCallback(async () => {
    const [markedEntry, markedOutlet] = await Promise.all([
      hasMarked("entry"),
      hasMarked("outlet"),
    ]);

    setButtons({
      entry: !markedEntry && isGeofenceValid,
      outlet: !markedOutlet && markedEntry && isGeofenceValid,
    });
  }, [hasMarked, isGeofenceValid]);

  useEffect(() => {
    if (user || assistanceSaved || isGeofenceValid) {
      updateButtons();
    }
  }, [user, assistanceSaved, isGeofenceValid, updateButtons]);

  const searchUser = useCallback(async () => {
    if (!dni)
      return notification({ type: "warning", description: "Digite su DNI" });

    try {
      const found = await fetchUserByDni([
        ["document.number", "==", dni.toString()],
        ["isDeleted", "==", false],
      ]);

      if (found.length) {
        setUser(found[0]);
        notification({ type: "success", description: "Usuario encontrado" });
      } else {
        setUser(null);
        notification({
          type: "warning",
          description: "Usuario no encontrado",
        });
      }
    } catch {
      notification({
        type: "error",
        description: "Error en la búsqueda de usuario",
      });
    }
  }, [dni]);

  const resetUser = useCallback(() => {
    setAutoLoginDisabled(true);
    setDni("");
    setUser(null);
  }, []);

  useEffect(() => {
    if (!authUser) return;
    if (autoLoginDisabled) return;

    const autoDni = authUser.document?.number;
    if (!autoDni) return;

    if (!user) {
      setDni(autoDni);
      searchUser();
    }
  }, [authUser, user, autoLoginDisabled, setDni, searchUser]);

  const saveAssistance = useCallback(
    async (type) => {
      if (!user)
        return notification({
          type: "warning",
          description: "Debe buscar un usuario antes de marcar asistencia",
        });

      if (!isGeofenceValid)
        return notification({
          type: "warning",
          description: "No estás dentro de tu lugar de trabajo",
        });

      if (type === "entry" && (await hasMarked("entry"))) {
        return notification({
          type: "warning",
          description: "Ya ha marcado su ingreso hoy",
        });
      }

      try {
        const date = dayjs().format("DD-MM-YYYY HH:mm");
        const todayList = await fetchToday();
        const existing = todayList.find((a) => isToday(a.createAtString)) || {};

        const data = {
          ...existing,
          id: existing.id || getAssistanceId(),
          userId: user.id,
          createAtString: existing.createAtString || date,
          entry:
            type === "entry"
              ? { date, dateTimestamp: Timestamp.now() }
              : existing.entry
                ? {
                    ...existing.entry,
                    dateTimestamp:
                      existing.entry.dateTimestamp || Timestamp.now(),
                  }
                : null,

          outlet:
            type === "outlet" && existing.entry ? { date } : existing.outlet,
          workPlace: "Servitec",
          user,
        };

        if (type === "entry") {
          await addAssistance(assignCreateProps(data));
        } else {
          if (!existing.id) {
            return notification({
              type: "error",
              description:
                "No existe una asistencia previa para registrar salida",
            });
          }

          await updateAssistance(existing.id, assignCreateProps(data));
        }

        notification({
          type: "success",
          title: `Ha marcado su ${
            type === "entry" ? "entrada" : "salida"
          } correctamente`,
        });

        setFeedback({ show: true, type });
        setTimeout(() => setFeedback((f) => ({ ...f, show: false })), 4000);
        setAssistanceSaved(true);
      } catch {
        notification({
          type: "error",
          description: "Error al guardar asistencia",
        });
      }
    },
    [user, isGeofenceValid, hasMarked, fetchToday, assignCreateProps]
  );

  const goTo = useCallback((path) => navigate(path), [navigate]);

  return {
    dni,
    setDni,
    user,
    buttons,
    feedback,
    loadingLocation,
    locationError,
    location,
    searchUser,
    resetUser,
    saveAssistance,
    goTo,
    refreshLocation,
    setIsGeofenceValid: setIsGeofenceValidState,
    isGeofenceValid,
  };
};
