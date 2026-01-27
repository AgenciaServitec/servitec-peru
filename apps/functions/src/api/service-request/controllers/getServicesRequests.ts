import { NextFunction, Request, Response } from "express";

import { fetchServiceRequests } from "../../../_firebase/collections";

export const getServicesRequests = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  console.log("「Get servicesRequests data」Initialize");

  try {
    const servicesRequests = await fetchServiceRequests();

    res.json(servicesRequests);
  } catch (e) {
    console.error(e);
  }
};
