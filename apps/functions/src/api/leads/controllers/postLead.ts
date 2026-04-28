import { Request, Response } from "express";
import { addLead, getLeadId } from "../../../_firebase/collections/leads";
import { Lead } from "../../../globalTypes";
import { defaultFirestoreProps } from "../../../utils";

export const postLead = async (req: Request, res: Response) => {
  const { body } = req;
  const { assignCreateProps } = defaultFirestoreProps();

  try {
    const leadId = getLeadId();

    const newLead: Lead = {
      ...body,
      id: leadId,
      status: "pending",
      priority: body.priority || "medium",
    };

    console.log(
      `「New Lead Created」ID: ${leadId} | Site: ${newLead.hostname}`
    );

    await addLead(assignCreateProps(newLead));

    res.status(201).json({
      success: true,
      message: "Lead registrado correctamente",
      id: leadId,
    });
  } catch (e) {
    console.error("「Lead Error」", e);
    res.status(500).json({ error: "Fallo interno al registrar el lead" });
  }
};
