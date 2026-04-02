import * as z from "zod";
import { customErrorMap } from "@/lib/zod-error-map";

z.setErrorMap(customErrorMap);

const imageSchema = z.object({
  name: z.string(),
  uid: z.string(),
  url: z.string().url("Debe ser una URL válida"),
});

const dniFields = {
  fullName: z.string().min(1, "El nombre completo es obligatorio para DNI"),
  names: z.string().optional(),
  paternalSurname: z.string().optional(),
  maternalSurname: z.string().optional(),
};

const rucFields = {
  companyName: z.string().min(1, "La razón social es obligatoria para RUC"),
};

const clientSchema = z.union([
  z.object({
    document: z.object({
      type: z.literal("dni"),
      number: z
        .string()
        .length(8, "El DNI debe tener 8 dígitos")
        .regex(/^\d+$/),
    }),
    ...dniFields,
    email: z.string().email("Email inválido"),
    phone: z.object({
      prefix: z.string(),
      number: z.string().min(9, "Mínimo 9 dígitos"),
    }),
  }),

  z.object({
    document: z.object({
      type: z.literal("ruc"),
      number: z
        .string()
        .length(11, "El RUC debe tener 11 dígitos")
        .regex(/^\d+$/),
    }),
    ...rucFields,
    email: z.string().email("Email inválido"),
    phone: z.object({
      prefix: z.string(),
      number: z.string().min(9, "Mínimo 9 dígitos"),
    }),
  }),
]);

export const baseSchema = z.object({
  client: clientSchema,
  device: z.object({
    category: z.string().optional(),
    brand: z.string().min(1, "Marca obligatoria"),
    model: z.string().min(1, "Modelo obligatorio"),
    serialNumber: z.string().optional(),
  }),
  status: z.enum(["pending"]),
  priority: z.enum(["low", "medium", "high"]),
  issueDescription: z.string().min(10, "Describe mejor el problema"),
});

const serviceModeSchema = z.discriminatedUnion("serviceMode", [
  z.object({
    serviceMode: z.literal("store-visit"),
    location: z.object({
      district: z
        .string()
        .min(1, "El distrito es obligatorio para visitas a tienda"),
      department: z.string().optional().default("Lima"),
      province: z.string().optional().default("Lima"),
      exactAddress: z.string().optional().default(""),
      interior: z.string().optional().default(""),
      reference: z.string().optional().default(""),
    }),
  }),

  z.object({
    serviceMode: z.literal("home-service"),
    location: z.object({
      department: z.string().min(1, "El departamento es obligatorio"),
      province: z.string().min(1, "La provincia es obligatoria"),
      district: z.string().min(1, "El distrito es obligatorio"),
      exactAddress: z
        .string()
        .min(5, "La dirección es obligatoria para visitas a domicilio"),
      interior: z.string().optional().default(""),
      reference: z.string().optional().default(""),
      lat: z.number().nullable().optional(),
      lng: z.number().nullable().optional(),
    }),
  }),
]);

export const serviceRequestSchema = z.intersection(
  baseSchema,
  serviceModeSchema
);

export type ServiceRequestFormData = z.infer<typeof serviceRequestSchema>;
