import { useEffect } from "react";
import { updateServiceRequest } from "../../../firebase/collections";

export const useTrackTechnicianLocation = (
  requestId: string,
  isActive: boolean
) => {
  useEffect(() => {
    if (!isActive || !requestId) return;

    const watchId = navigator.geolocation.watchPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;

        try {
          await updateServiceRequest(requestId, {
            technicianLocation: {
              lat: latitude,
              lng: longitude,
            },
          });
        } catch (error) {
          console.error("Error actualizando ubicación:", error);
        }
      },
      (error) => console.error("Error de GPS:", error),
      { enableHighAccuracy: true, distanceFilter: 10 }
    );

    return () => navigator.geolocation.clearWatch(watchId);
  }, [requestId, isActive]);
};
