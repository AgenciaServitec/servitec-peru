import * as z from "zod";

export const reclamacionesSchema = z.object({
  fullName: z.string().min(3, "Nombre requerido"),
  documentNumber: z.string().min(8, "Documento inválido"),
  email: z.string().email("Email inválido"),
  phone: z.string().min(9, "Teléfono inválido"),
  address: z.string().min(5, "Dirección requerida"),
  guardian: z.string().optional(),
  branch: z.string().min(1, "Selecciona una sede"),
  orderNumber: z.string().min(1, "N° de Orden requerido"),
  amount: z.string().optional(),
  type: z.enum(["RECLAMO", "QUEJA"]),
  description: z.string().min(10, "Describe lo sucedido"),
  solution: z.string().min(10, "Indica una solución"),
});

export type ReclamacionesFormData = z.infer<typeof reclamacionesSchema>;
