import { Request, Response } from "express";
import { addEntry, getEntryId } from "../../../_firebase/collections/entries";
import { defaultFirestoreProps } from "../../../utils";
import { fetchSiteByHostname } from "../../../_firebase/collections";
import {
  sendMailAdminContactEntry,
  sendMailContactEntry,
} from "../../../mailer/servitec-peru";
import { Contact, ContactEntry } from "../../../globalTypes";
import {
  addContact,
  fetchContactByEmail,
  getContactId,
  updateContact,
} from "../../../_firebase/collections/contacts";

export const postContactEntry = async (req: Request, res: Response) => {
  const { body } = req;
  const { assignCreateProps, assignUpdateProps } = defaultFirestoreProps();

  try {
    const entryId = getEntryId();

    const site = await fetchSiteByHostname(body.hostname);

    let contactId: string;

    const incomingEmail = body.client?.email;
    const incomingPhone = body.client?.phone.number;

    const existingContact = await fetchContactByEmail(body.client?.email);

    if (existingContact) {
      contactId = existingContact.id;

      if (incomingPhone && incomingPhone !== existingContact.phone.number) {
        const currentSecondaryPhones = existingContact.secondaryPhones || [];

        if (!currentSecondaryPhones.includes(incomingPhone)) {
          const newSecondaryPhones = [...currentSecondaryPhones, incomingPhone];

          await updateContact(
            contactId,
            assignUpdateProps({ secondaryPhones: newSecondaryPhones })
          );

          console.log(
            `「Contact Updated」ID: ${contactId} | Added Secondary Phone: ${incomingPhone}`
          );
        }
      }
    } else {
      contactId = getContactId();

      const newContact = {
        id: contactId,
        email: incomingEmail,
        fullName: body.client.fullName || "",
        firstName: body.client.firstName || "",
        paternalSurname: body.client.paternalSurname || "",
        maternalSurname: body.client.maternalSurname || "",
        phone: {
          prefix: body.client.phone.prefix || "",
          number: body.client.phone.number,
        },
        secondaryPhones: [],
        siteId: site?.id,
        updateBy: "",
      };

      await addContact(assignCreateProps(newContact) as Contact);
      console.log(
        `「New Contact Created」ID: ${contactId} | Email: ${body.client.email}`
      );
    }

    const newEntry = {
      ...body,
      id: entryId,
      contactId,
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
      error: "Internal failure to register the contacts entry.",
    });
  }
};
