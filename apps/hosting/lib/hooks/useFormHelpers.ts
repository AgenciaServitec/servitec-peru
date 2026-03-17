import { useFormContext } from "react-hook-form";
import * as z from "zod";

export const useFormHelpers = (name: string, schema: z.ZodObject<any>) => {
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

  const getFieldSchema = (name: string, schema: z.ZodObject<any>) => {
    const parts = name.split(".");
    let currentSchema: any = schema;

    for (const part of parts) {
      const target = currentSchema._def?.schema || currentSchema;
      if (target.shape && target.shape[part]) {
        currentSchema = target.shape[part];
      }
    }
    return currentSchema;
  };

  const fieldSchema = getFieldSchema(name, schema);

  const isRequired = fieldSchema
    ? !(fieldSchema instanceof z.ZodOptional)
    : false;

  return {
    error,
    success: isTouched && !error && hasValue,
    required: isRequired,
  };
};
