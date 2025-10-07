import { useState, useEffect, useCallback } from 'react';
import dayjs from 'dayjs';
import { useUserLocation } from './useUserLocation';
import {
  addAssistance,
  fetchTodayAssistancesByUserId,
  // fetchUsersByDni,
  getAssistanceId,
  updateAssistance,
} from '../firebase/collections';
import { Timestamp } from 'firebase/firestore';
import { notification } from '../components/ui';
import { useNavigate } from 'react-router-dom';

export const useAssistance = (assignCreateProps) => {
  const navigate = useNavigate();

  const [dni, setDni] = useState('');
  // const [user, setUser] = useState(null);
  const [buttons, setButtons] = useState({
    entry: false,
    outlet: false,
  });
  const [feedback, setFeedback] = useState({
    show: false,
    type: '',
  });
  const [assistanceSaved, setAssistanceSaved] = useState(false);

  const [isGeofenceValid, setIsGeofenceValidState] = useState(false);

  const {
    location,
    method,
    loading: loadingLocation,
    error: locationError,
    refreshLocation,
    setIsGeofenceValid,
  } = useUserLocation((valid) => setIsGeofenceValidState(valid));

  const isToday = (dateStr) =>
    !!dateStr && dayjs(dateStr, 'DD-MM-YYYY HH:mm').isSame(dayjs(), 'day');

  const fetchToday = useCallback(async () => {
    // if (!user) return []; // 🔹 Comentado por ahora
    // return fetchTodayAssistancesByUserId(user.id);
    return []; // temporal mientras user está comentado
  }, []);

  const hasMarked = useCallback(
    async (type) => {
      const list = await fetchToday();
      return list.some((a) => a[type]?.date && isToday(a[type].date));
    },
    [fetchToday]
  );

  const updateButtons = useCallback(async () => {
    const [markedEntry, markedOutlet] = await Promise.all([
      hasMarked('entry'),
      hasMarked('outlet'),
    ]);
    setButtons({
      entry: !markedEntry && isGeofenceValid,
      outlet: !markedOutlet && markedEntry && isGeofenceValid,
    });
  }, [hasMarked, isGeofenceValid]);

  useEffect(() => {
    if (/* user || */ assistanceSaved || isGeofenceValid) {
      updateButtons();
    }
  }, [/* user, */ assistanceSaved, isGeofenceValid, updateButtons]);

  // 🔹 Por ahora dejamos la búsqueda por DNI comentada
  /*
  const searchUser = useCallback(async () => {
    if (!dni) return notification({ type: 'warning', description: 'Digite su DNI' });
    try {
      const found = await fetchUsersByDni(dni.toString());
      if (found.length) return setUser(found[0]);
      setUser(null);
      notification({ type: 'warning', description: 'Usuario no encontrado' });
    } catch {
      notification({ type: 'error', description: 'Error en la búsqueda de usuario' });
    }
  }, [dni]);
  */

  const resetUser = useCallback(() => {
    setDni('');
    // setUser(null); // 🔹 Comentado por ahora
  }, []);

  const saveAssistance = useCallback(
    async (type) => {
      // if (!user) return; // 🔹 Comentado por ahora
      if (!isGeofenceValid)
        return notification({
          type: 'warning',
          description: 'No estás dentro de tu lugar de trabajo',
        });
      if (await hasMarked(type))
        return notification({
          type: 'warning',
          description: `Ya ha marcado su ${type === 'entry' ? 'ingreso' : 'salida'} hoy`,
        });

      try {
        const date = dayjs().format('DD-MM-YYYY HH:mm');
        const todayList = await fetchToday();
        const existing = todayList.find((a) => isToday(a.createAtString)) || {};

        const data = {
          ...existing,
          id: existing.id || getAssistanceId(),
          // userId: user?.id, // 🔹 Comentado
          createAtString: existing.createAtString || date,
          entry:
            existing.entry ||
            (type === 'entry' && {
              date,
              dateTimestamp: Timestamp.now(),
            }),
          outlet: type === 'outlet' && existing.entry ? { date } : existing.outlet,
          // user, // 🔹 Comentado
        };

        if (type === 'entry') {
          await addAssistance(assignCreateProps(data));
        } else {
          await updateAssistance(existing.id, assignCreateProps(data));
        }

        notification({
          type: 'success',
          title: `Ha marcado su ${type === 'entry' ? 'entrada' : 'salida'} correctamente`,
        });
        setFeedback({ show: true, type });
        setTimeout(() => setFeedback((f) => ({ ...f, show: false })), 4000);
        setAssistanceSaved(true);
      } catch {
        notification({ type: 'error', description: 'Error al guardar asistencia' });
      }
    },
    [/* user, */ isGeofenceValid, hasMarked, fetchToday, assignCreateProps]
  );

  const goTo = useCallback((path) => navigate(path), [navigate]);

  return {
    dni,
    setDni,
    // user, // 🔹 Comentado por ahora
    buttons,
    feedback,
    loadingLocation,
    locationError,
    location,
    // searchUser,  // 🔹 Comentado por ahora
    resetUser,
    saveAssistance,
    goTo,
    refreshLocation,
    setIsGeofenceValid: setIsGeofenceValidState,
  };
};
