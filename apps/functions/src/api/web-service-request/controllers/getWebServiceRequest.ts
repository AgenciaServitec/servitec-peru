import { NextFunction, Request, Response } from "express";
import { fetchWebServiceRequest } from "../../../_firebase/collections";

interface Params {
  webServiceRequestId: string;
}

export const getWebServiceRequest = async (
  req: Request<Params>,
  res: Response
): Promise<void> => {
  try {
    const { webServiceRequestId } = req.params;
    const webServiceRequest = await fetchWebServiceRequest(webServiceRequestId);

    if (!webServiceRequest) {
      res.status(404).json({ message: "Not found" });
      return;
    }

    res.json(webServiceRequest);
  } catch (e) {
    // @ts-ignore
    res.status(500).json({ error: e.message });
  }
};
