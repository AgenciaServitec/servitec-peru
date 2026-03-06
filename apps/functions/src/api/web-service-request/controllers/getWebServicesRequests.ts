import { NextFunction, Request, Response } from "express";

import { fetchWebServiceRequests } from "../../../_firebase/collections";

export const getWebServicesRequests = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  console.log("「Get webServicesRequests data」Initialize");

  try {
    const webServicesRequests = await fetchWebServiceRequests();

    res.json(webServicesRequests);
  } catch (e) {
    console.error(e);
  }
};
