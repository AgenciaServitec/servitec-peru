import * as z from "zod";
import { customErrorMap } from "@/lib/zod-error-map";
import { documentSchema, phoneSchema } from "@/lib/validations/common";

z.setErrorMap(customErrorMap);

export const contactSchema = z.object({
  fullName: z.string().min(1),
  document: documentSchema,
  phone: phoneSchema,
  email: z.string().email(),
  message: z.string().optional(),
});

export type ContactFormData = z.infer<typeof contactSchema>;

export interface ContactResponse {
  success: boolean;
  message: string;
  ticketId?: string;
}
