import { useFormContext } from "react-hook-form";
import * as z from "zod";

// 1. Cambiamos a z.ZodTypeAny para aceptar Uniones e Intersecciones
export const useFormHelpers = (name: string, schema: z.ZodTypeAny) => {
  const {
    watch,
    formState: { errors, touchedFields },
  } = useFormContext();

  const fieldValue = watch(name);

  const getNestedValue = (obj: any, path: string) => {
    return path.split(".").reduce((acc, part) => acc && acc[part], obj);
  };

  const errorEntry = getNestedValue(errors, name);
  const error = errorEntry?.message as string | undefined;
  const isTouched = !!getNestedValue(touchedFields, name);
  const hasValue =
    fieldValue !== undefined && fieldValue !== null && fieldValue !== "";

  // 2. Refactorizamos para que navegue por Uniones y Objetos
  const getFieldSchema = (
    path: string,
    currentSchema: any
  ): z.ZodTypeAny | undefined => {
    const parts = path.split(".");
    let target = currentSchema;

    for (const part of parts) {
      // Si es una Unión Discriminada, buscamos en sus opciones
      if (target instanceof z.ZodDiscriminatedUnion) {
        // Buscamos en la primera opción que tenga la propiedad (asumimos estructura similar)
        target = target.options.find(
          (opt: any) => opt.shape && opt.shape[part]
        );
      }

      // Si es un objeto o el resultado de una unión, extraemos el campo
      if (target && "shape" in target) {
        target = target.shape[part];
      } else if (target && "_def" in target && target._def.shape) {
        target = target._def.shape[part];
      } else {
        return undefined;
      }
    }
    return target;
  };

  const fieldSchema = getFieldSchema(name, schema);

  // 3. Verificamos si es opcional de forma segura
  const isRequired = fieldSchema
    ? !(
        fieldSchema instanceof z.ZodOptional ||
        fieldSchema instanceof z.ZodNullable
      )
    : false;

  return {
    error,
    success: isTouched && !error && hasValue,
    required: isRequired,
  };
};