import { useCallback, useState } from "react";

export const useApiDataByDniOrRucGet = (documentType: string) => {
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState<any>(null);
  const [error, setError] = useState<any>(null);

  const getDataByDniOrRuc = useCallback(
    async (documentNumber: string = "") => {
      if (!documentNumber) return;

      setLoading(true);
      setError(null);

      try {
        const url = `https://api-servitec-peru.web.app/identities/${documentType.toLowerCase()}/${documentNumber}`;

        const res = await fetch(url, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (!res.ok) {
          throw new Error(`Error: ${res.status} - No se encontró el documento`);
        }

        const data = await res.json();
        setResponse(data);
        return data; // Retornamos la data para poder usarla con el setValue del form
      } catch (err: any) {
        setError(err.message);
        console.error("Error en getDataByDniOrRuc:", err);
        return null;
      } finally {
        setLoading(false);
      }
    },
    [documentType]
  );

  return {
    getDataByDniOrRuc,
    getDataByDniOrRucLoading: loading,
    getDataByDniOrRucResponse: response,
    getDataByDniOrRucError: error,
  };
};
