import { Request, Response } from "express";
import { addEntry, getEntryId } from "../../../_firebase/collections/entries";
import { Entry } from "../../../globalTypes";
import { defaultFirestoreProps } from "../../../utils";
import { z } from "zod";
import { fetchSiteByHostname } from "../../../_firebase/collections";

const ClientSchema = z.object({
  fullName: z.string(),
  firstName: z.string().optional(),
  paternalSurname: z.string().optional(),
  maternalSurname: z.string().optional(),
  email: z.string().email(),
  phone: z.object({
    prefix: z.string().default("+51"),
    number: z.string().min(7),
  }),
  document: z.object({
    type: z.enum(["DNI", "RUC", "CE"]),
    number: z.string().min(8),
  }),
});

const BaseFields = {
  hostname: z.string(),
  message: z.string().min(1),
  client: ClientSchema,
};

const EntrySchema = z.discriminatedUnion("category", [
  z.object({
    category: z.literal("contact"),
    subject: z.string().optional(),
    ...BaseFields,
  }),
  z.object({
    category: z.literal("suggestion"),
    area: z.enum(["web", "service", "product"]),
    ...BaseFields,
  }),
  z.object({
    category: z.literal("claim"),
    orderId: z.string().optional(),
    ...BaseFields,
  }),
  z.object({
    category: z.literal("complaints_book"),
    details: z.object({
      type: z.enum(["queja", "reclamo"]),
      isMinor: z.boolean(),
      parentDocument: z.string().optional(),
      claimedAmount: z.number().nonnegative(),
      consumerRequest: z.string(),
    }),
    ...BaseFields,
  }),
]);

export const postEntry = async (req: Request, res: Response) => {
  const { body } = req;
  const { assignCreateProps } = defaultFirestoreProps();

  try {
    const validatedData = EntrySchema.parse(body);
    const entryId = getEntryId();

    const site = await fetchSiteByHostname(validatedData.hostname);

    const newEntry = {
      ...validatedData,
      id: entryId,
      status: "pending",
      siteId: site?.id,
    };

    console.log(
      `「New Entry」ID: ${entryId} | Site: ${newEntry.hostname} | Category: ${newEntry.category}`
    );

    await addEntry(assignCreateProps(newEntry) as Entry);

    res.status(201).json({
      success: true,
      message: "Entry successfully logged.",
    });
  } catch (e) {
    if (e instanceof z.ZodError) {
      return res.status(400).json({
        success: false,
        error: "Invalid data for this category",
        details: e.errors,
      });
    }

    console.error("「Entry Error」", e);
    return res.status(500).json({
      success: false,
      error: "Internal failure to register the entry.",
    });
  }
};
