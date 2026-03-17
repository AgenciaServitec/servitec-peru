import errors from "./i18n/errors.json";

type ErrorDoc = typeof errors;

export const getErrorMessage = (
  code: string,
  params?: { min?: number | string; max?: number | string; field?: string }
): string => {
  const field = params?.field;

  if (field && field in errors.fields) {
    const fieldErrors = (errors.fields as any)[field];
    if (code in fieldErrors) {
      return parseMessage(fieldErrors[code], params);
    }
  }

  const genericErrors = errors.generic as Record<string, string>;
  const message = genericErrors[code] || genericErrors["invalid_format"];

  return parseMessage(message, params);
};

const parseMessage = (msg: string, params?: any): string => {
  if (!params) return msg;
  return msg
    .replace("{{min}}", String(params.min ?? ""))
    .replace("{{max}}", String(params.max ?? ""))
    .replace("{{field}}", String(params.field ?? ""));
};
