import * as z from "zod";
import { customErrorMap } from "@/lib/zod-error-map";

z.setErrorMap(customErrorMap);

export const serviceRequestSchema = z.object({
  client: z.object({
    fullName: z.string().min(3),
    email: z.string().email(),
    document: z.object({
      type: z.string(),
      number: z.string().min(8),
    }),
    phone: z.object({
      prefix: z.string(),
      number: z.string().min(9),
    }),
  }),
  device: z.object({
    category: z.string(),
    brand: z.string().min(1),
    model: z.string().min(1),
    serialNumber: z.string().optional(),
  }),
  issueDescription: z.string().min(10),
  serviceMode: z.string(),
  department: z.string(),
  province: z.string(),
  district: z.string().min(1),
  exactAddress: z.string().optional(),
  interior: z.string().optional(),
  reference: z.string().optional(),
});

export type ServiceRequestFormData = z.infer<typeof serviceRequestSchema>;
