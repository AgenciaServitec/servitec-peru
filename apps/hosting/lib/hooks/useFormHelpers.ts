import { useFormContext } from "react-hook-form";

export const useFormHelpers = (name: string) => {
  const {
    watch,
    formState: { errors, touchedFields },
  } = useFormContext();

  const fieldValue = watch(name);

  const error = errors[name]?.message as string | undefined;
  const isTouched = !!(touchedFields as any)[name];

  const hasValue =
    fieldValue !== undefined && fieldValue !== null && fieldValue !== "";

  return {
    error,
    success: isTouched && !error && hasValue,
  };
};
