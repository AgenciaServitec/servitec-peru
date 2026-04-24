import { useCallback } from "react";
import { useApi } from "./useApi";

export interface IdentityResponse {
  firstName?: string;
  paternalSurname?: string;
  maternalSurname?: string;
  companyName?: string;
  address?: string;
}

export const useApiDataByDniOrRucGet = (documentType: string) => {
  const { loading, get, response } = useApi(`/identities/${documentType}`);

  const getDataByDniOrRuc = useCallback(
    async (documentNumber: string = ""): Promise<IdentityResponse> => {
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
