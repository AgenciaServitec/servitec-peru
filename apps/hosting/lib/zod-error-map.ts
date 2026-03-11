import * as z from "zod";
import { msg } from "./error-utils";

export const customErrorMap: z.ZodErrorMap = (issue, ctx) => {
  // 1. Manejo de longitudes (too_small)
  if (issue.code === "too_small") {
    // Al entrar aquí, TypeScript sabe que es un error de tamaño.
    // Usamos el tipo específico para que WebStorm detecte 'type'
    const i = issue as z.ZodIssueTooSmall;
    return { message: msg.too_small(i.minimum as number, i.type) };
  }

  // 2. Manejo de formatos (invalid_format)
  if (issue.code === "invalid_format") {
    return { message: msg.invalid_email };
  }

  // 3. Manejo de campos obligatorios (invalid_type)
  if (issue.code === "invalid_type") {
    // Forzamos el tipo específico para leer 'received' sin errores
    const i = issue as z.ZodInvalidTypeIssue;
    if (i.received === "undefined" || i.received === "null") {
      return { message: msg.required };
    }
  }

  return { message: ctx.defaultError };
};
