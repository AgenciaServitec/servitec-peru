import { useState } from "react";
import { updateServiceRequest } from "../../../firebase/collections";
import { useDefaultFirestoreProps } from "../../../hooks";

export const useCancelService = () => {
  const [isCanceling, setIsCanceling] = useState(false);
  const { assignUpdateProps } = useDefaultFirestoreProps();

  const cancelRequest = async (requestId: string) => {
    setIsCanceling(true);
    try {
      await updateServiceRequest(
        requestId,
        assignUpdateProps({
          status: "pending",
          assignment: "",
          technicianLocation: {
            lat: null,
            lng: null,
          },
        })
      );
      return true;
    } catch (error) {
      console.error("Error al cancelar la solicitud:", error);
      return false;
    } finally {
      setIsCanceling(false);
    }
  };

  return { cancelRequest, isCanceling };
};
