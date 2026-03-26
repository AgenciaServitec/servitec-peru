import * as z from "zod";
import { customErrorMap } from "@/lib/zod-error-map";

z.setErrorMap(customErrorMap);

const imageSchema = z.object({
  name: z.string(),
  uid: z.string(),
  url: z.string().url("Debe ser una URL válida"),
});

const documentSchema = z
  .object({
    type: z.enum(["dni", "ruc"]),
    number: z.string(),
  })
  .superRefine((data, ctx) => {
    if (data.type === "dni" && data.number.length !== 8) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "El DNI debe tener exactamente 8 dígitos",
        path: ["number"],
      });
    }

    if (data.type === "ruc" && data.number.length !== 11) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "El RUC debe tener exactamente 11 dígitos",
        path: ["number"],
      });
    }

    if (!/^\d+$/.test(data.number)) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "El número debe contener solo dígitos",
        path: ["number"],
      });
    }
  });

export const serviceRequestSchema = z
  .object({
    client: z.object({
      names: z.string().nullish().or(z.literal("")),
      paternalSurname: z.string().nullish().or(z.literal("")),
      maternalSurname: z.string().nullish().or(z.literal("")),
      fullName: z.string().min(1, "El nombre es obligatorio"),
      email: z.string().email("Email inválido"),
      document: documentSchema,
      phone: z.object({
        prefix: z.string().default("+51"),
        number: z.string().min(9, "Mínimo 9 dígitos"),
      }),
    }),
    device: z.object({
      category: z.string(),
      brand: z.string().min(1, "Marca obligatoria"),
      model: z.string().min(1, "Modelo obligatorio"),
      serialNumber: z.string().nullish().or(z.literal("")),
    }),
    serviceMode: z.string(),
    location: z.object({
      department: z.string().default("Lima"),
      province: z.string().default("Lima"),
      district: z.string().nullish().or(z.literal("")),
      exactAddress: z.string().nullish().or(z.literal("")),
      interior: z.string().nullish().or(z.literal("")),
      reference: z.string().nullish().or(z.literal("")),
    }),
    priority: z.enum(["low", "medium", "high"]),
    status: z.string().optional().default("pending"),
    issueDescription: z
      .string()
      .min(10, "Describe mejor el problema (mín. 10 caracteres)"),
  })
  .superRefine((data, ctx) => {
    if (data.serviceMode === "home-service") {
      if (!data.location.district || data.location.district.length < 1) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Selecciona tu distrito",
          path: ["location", "district"],
        });
      }
      if (
        !data.location.exactAddress ||
        data.location.exactAddress.length < 5
      ) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "La dirección es obligatoria para visitas a domicilio",
          path: ["location", "exactAddress"],
        });
      }
      if (!data.location.reference || data.location.reference.length < 3) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Ingresa una referencia para ayudar al técnico",
          path: ["location", "reference"],
        });
      }
    }
  });

export type ServiceRequestFormData = z.infer<typeof serviceRequestSchema>;
