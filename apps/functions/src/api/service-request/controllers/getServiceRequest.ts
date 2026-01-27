import { NextFunction, Request, Response } from "express";
import { fetchServiceRequest } from "../../../_firebase/collections";

interface Params {
  serviceRequestId: string;
}

export const getServiceRequest = async (
  req: Request<Params, unknown, unknown, unknown>,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const {
    params: { serviceRequestId },
  } = req;

  console.log("「Get serviceRequest data」Initialize", {
    params: req.params,
  });

  try {
    const serviceRequest = await fetchServiceRequest(serviceRequestId);

    res.json(serviceRequest);
  } catch (e) {
    console.error(e);
  }
};
