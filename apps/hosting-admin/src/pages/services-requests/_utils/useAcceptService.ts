import { useState } from "react";
import { updateServiceRequest } from "../../../firebase/collections";
import { useDefaultFirestoreProps } from "../../../hooks";

export const useAcceptService = () => {
  const [isAccepting, setIsAccepting] = useState(false);
  const { assignUpdateProps } = useDefaultFirestoreProps();

  const acceptRequest = async (requestId: string, userId: string) => {
    setIsAccepting(true);
    try {
      await updateServiceRequest(
        requestId,
        assignUpdateProps({
          status: "inProgress",
          assignment: userId,
          technicianLocation: {
            lat: null,
            lng: null,
          },
        })
      );
      return true;
    } catch (error) {
      console.error("Error al aceptar la solicitud:", error);
      return false;
    } finally {
      setIsAccepting(false);
    }
  };

  return { acceptRequest, isAccepting };
};
