import * as z from "zod";

export const documentSchema = z.object({
  type: z.enum(["dni", "ruc"]),
  number: z.string().min(8).max(11),
});

export const phoneSchema = z.object({
  prefix: z.string(),
  number: z.string().length(9).regex(/^9/),
});

export const optionalString = z.string().optional().or(z.literal(""));

// export type Document = z.infer<typeof documentSchema>;
// export type Phone = z.infer<typeof phoneSchema>;
