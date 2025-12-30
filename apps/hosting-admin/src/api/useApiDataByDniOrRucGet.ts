import { useCallback } from "react";
import { useApi } from "./useApi";

export const useApiDataByDniOrRucGet = (documentType: string) => {
  const { loading, get, response } = useApi(`/identities/${documentType}`);

  const getDataByDniOrRuc = useCallback(
    async (documentNumber: string = "") => {
      return await get(documentNumber);
    },
    [get]
  );

  return {
    getDataByDniOrRuc,
    getDataByDniOrRucLoading: loading,
    getDataByDniOrRucResponse: response,
  };
};
