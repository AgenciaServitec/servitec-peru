import { NextFunction, Request, Response } from "express";

import { updateQuotation } from "../../../_firebase/collections/index.js";
import { Quotation } from "../../../globalTypes.js";
import { defaultFirestoreProps } from "../../../utils/index.js";

type Params = { quotationId: string };

const { assignUpdateProps } = defaultFirestoreProps();

export const putQuotation = async (
  req: Request<Params, unknown, Quotation, unknown>,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const {
    body: quotation,
    params: { quotationId },
  } = req;

  console.log(quotationId, "「Update quotation」Initialize", {
    params: req.params,
    body: req.body,
  });

  try {
    await updateQuotation(quotationId, assignUpdateProps(quotation));
    res.sendStatus(200).end();
  } catch (e) {
    console.error(e);
  }
};
