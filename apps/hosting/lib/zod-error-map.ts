import * as z from "zod";
import { getErrorMessage } from "./error-utils";

export const customErrorMap: z.ZodErrorMap = (issue, ctx) => {
  const fieldName = issue.path[0]?.toString();

  // 1. Manejo de errores de longitud (Too Small)
  // Al usar este 'if', TypeScript garantiza que dentro existen 'minimum' y 'type'
  if (issue.code === z.ZodIssueCode.too_small) {
    return {
      message: getErrorMessage("too_small", {
        min: issue.minimum as number,
        field: fieldName,
      }),
    };
  }

  // 2. Manejo de formatos de String (como Email)
  // Aquí TypeScript ya sabe que 'validation' existe gracias al chequeo del código
  if (issue.code === z.ZodIssueCode.invalid_string) {
    if (issue.validation === "email") {
      return {
        message: getErrorMessage("invalid_email", { field: fieldName }),
      };
    }
  }

  // 3. Manejo de campos requeridos (Tipos inválidos)
  // Validamos si el motor de Zod recibió 'undefined' o 'null'
  if (issue.code === z.ZodIssueCode.invalid_type) {
    if (issue.received === "undefined" || issue.received === "null") {
      return { message: getErrorMessage("required", { field: fieldName }) };
    }
  }

  // Fallback: Si no mapeamos el error, devolvemos el original de Zod en español si es posible
  return { message: ctx.defaultError };
};

z.setErrorMap(customErrorMap);
