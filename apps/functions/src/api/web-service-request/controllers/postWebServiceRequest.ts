import { NextFunction, Request, Response } from "express";

import {
  addWebServiceRequest,
  getWebServiceRequestId,
} from "../../../_firebase/collections";
import { defaultFirestoreProps } from "../../../utils";

const { assignCreateProps } = defaultFirestoreProps();

export const postWebServiceRequest = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const data = req.body;
    const newRequest = assignCreateProps({
      ...data,
      id: data.id || getWebServiceRequestId(),
    });

    await addWebServiceRequest(newRequest);
    res.status(201).json({ message: "Created", id: newRequest.id });
  } catch (e) {
    console.error(e);
    res.status(500).send("Internal Server Error");
  }
};
