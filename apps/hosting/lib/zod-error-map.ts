import * as z from "zod";
import { getErrorMessage } from "./error-utils";

export const customErrorMap: z.ZodErrorMap = (issue, ctx) => {
  const fieldName = issue.path[issue.path.length - 1]?.toString() || "campo";

  switch (issue.code) {
    case "invalid_enum_value":
    case "invalid_type": {
      if (
        issue.code === "invalid_enum_value" ||
        issue.received === "undefined" ||
        issue.received === "null"
      ) {
        return { message: getErrorMessage("required", { field: fieldName }) };
      }
      return { message: ctx.defaultError };
    }

    case "invalid_string": {
      const code =
        issue.validation === "email" ? "invalid_email" : "invalid_string";
      return { message: getErrorMessage(code, { field: fieldName }) };
    }

    case "too_small": {
      const tooSmallIssue = issue as z.ZodTooSmallIssue;

      if (tooSmallIssue.minimum === 1) {
        return { message: getErrorMessage("required", { field: fieldName }) };
      }

      return {
        message: getErrorMessage("too_small", {
          min: tooSmallIssue.minimum.toString(),
          field: fieldName,
        }),
      };
    }

    default:
      return { message: ctx.defaultError };
  }
};
