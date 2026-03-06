import { NextFunction, Request, Response } from "express";

import { updateWebServiceRequest } from "../../../_firebase/collections";
import { WebServiceRequest } from "../../../globalTypes";
import { defaultFirestoreProps } from "../../../utils";

type Params = { webServiceRequestId: string };

const { assignUpdateProps } = defaultFirestoreProps();

export const putWebServiceRequest = async (
  req: Request<Params, unknown, WebServiceRequest, unknown>,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const {
    body: webServiceRequest,
    params: { webServiceRequestId },
  } = req;

  console.log(webServiceRequestId, "「Update webServiceRequest」Initialize", {
    params: req.params,
    body: req.body,
  });

  try {
    await updateWebServiceRequest(
      webServiceRequestId,
      assignUpdateProps(webServiceRequest)
    );
    res.sendStatus(200).end();
  } catch (e) {
    console.error(e);
  }
};
