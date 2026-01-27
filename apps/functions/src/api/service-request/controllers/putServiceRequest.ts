import { NextFunction, Request, Response } from "express";

import { updateServiceRequest } from "../../../_firebase/collections";
import { ServiceRequest } from "../../../globalTypes";
import { defaultFirestoreProps } from "../../../utils";

type Params = { serviceRequestId: string };

const { assignUpdateProps } = defaultFirestoreProps();

export const putServiceRequest = async (
  req: Request<Params, unknown, ServiceRequest, unknown>,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const {
    body: serviceRequest,
    params: { serviceRequestId },
  } = req;

  console.log(serviceRequestId, "「Update serviceRequest」Initialize", {
    params: req.params,
    body: req.body,
  });

  try {
    await updateServiceRequest(
      serviceRequestId,
      assignUpdateProps(serviceRequest)
    );
    res.sendStatus(200).end();
  } catch (e) {
    console.error(e);
  }
};
