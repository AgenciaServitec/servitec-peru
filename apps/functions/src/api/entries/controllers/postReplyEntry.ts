import { Request, Response } from "express";
import {
  addReplyToEntry,
  getReplyId,
  updateEntry,
} from "../../../_firebase/collections/entries";
import { defaultFirestoreProps } from "../../../utils";

export const postReplyEntry = async (req: Request, res: Response) => {
  const { body } = req;
  const { assignCreateProps, assignUpdateProps } = defaultFirestoreProps();

  try {
    const replyId = getReplyId(body.entryId);

    const newReply = {
      id: replyId,
      message: body.message,
      subject: body.subject,
      from: body.from,
      to: body.to,
      attachment: body.attachment || null,
      type: "outbound_email",
    };

    console.log(`「New Reply」To Entry ID: ${body.entryId} | To: ${body.to}`);

    await addReplyToEntry(body.entryId, assignCreateProps(newReply));

    if (body.entryId) {
      await updateEntry(
        body.entryId,
        assignUpdateProps({ status: "attended" })
      );
      console.log(`「Entry Updated」ID: ${body.entryId} | Status: attended`);
    }

    // await sendMailReply(newReply).catch((emailError) => {
    //   console.error("「Background Mail Error」", emailError);
    // });

    res.status(201).json({
      success: true,
      message: "Respuesta guardada en la subcolección y correo enviado.",
    });
  } catch (e) {
    console.error("「Reply Error」", e);
    return res.status(500).json({
      success: false,
      error: "Fallo interno al enviar la respuesta.",
    });
  }
};
