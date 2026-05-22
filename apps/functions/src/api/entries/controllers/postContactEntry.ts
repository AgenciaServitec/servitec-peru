import { Request, Response } from "express";
import { addEntry, getEntryId } from "../../../_firebase/collections/entries";
import { defaultFirestoreProps } from "../../../utils";
import { fetchSiteByHostname } from "../../../_firebase/collections";
import {
  sendMailAdminContactEntry,
  sendMailContactEntry,
} from "../../../mailer/servitec-peru";
import { ContactEntry } from "../../../globalTypes";

export const postContactEntry = async (req: Request, res: Response) => {
  const { body } = req;
  const { assignCreateProps } = defaultFirestoreProps();

  try {
    const entryId = getEntryId();

    const site = await fetchSiteByHostname(body.hostname);

    const newEntry = {
      ...body,
      id: entryId,
      status: "pending",
      siteId: site?.id,
    };

    console.log(
      `「New Contact Entry」ID: ${entryId} | Site: ${newEntry.hostname} | Category: ${newEntry.category}`
    );

    await addEntry(assignCreateProps(newEntry) as ContactEntry);

    await Promise.all([
      sendMailContactEntry(newEntry),
      sendMailAdminContactEntry(newEntry),
    ]).catch((emailError) => {
      console.error("「Background Mail Error」", emailError);
    });

    res.status(201).json({
      success: true,
      message: "Entry successfully logged.",
    });
  } catch (e) {
    console.error("「Entry Error」", e);
    return res.status(500).json({
      success: false,
      error: "Internal failure to register the contact entry.",
    });
  }
};
