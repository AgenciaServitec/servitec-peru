import { NextFunction, Request, Response } from "express";

import { addServiceRequest } from "../../../_firebase/collections";
import { defaultFirestoreProps } from "../../../utils";

const { assignCreateProps } = defaultFirestoreProps();

export const postServiceRequest = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const { body: serviceRequest } = req;

  console.log("「Add serviceRequest」Initialize", serviceRequest, {
    params: req.params,
    body: req.body,
  });

  try {
    await addServiceRequest(assignCreateProps(serviceRequest));
    res.sendStatus(200).end();
  } catch (e) {
    console.error(e);
  }
};
