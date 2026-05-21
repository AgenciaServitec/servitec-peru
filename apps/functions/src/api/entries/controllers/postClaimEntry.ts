import { Request, Response } from "express";
import { getEntryId } from "../../../_firebase/collections/entries";
import { fetchSiteByHostname } from "../../../_firebase/collections";

export const postClaimEntry = async (req: Request, res: Response) => {
  const { body } = req;

  try {
    const entryId = getEntryId();

    const site = await fetchSiteByHostname(body.hostname);

    const newEntry = {
      ...body,
      id: entryId,
      status: "pending",
      siteId: site?.id,
    };

    console.log(
      `「New Claim Entry」ID: ${entryId} | Site: ${newEntry.hostname} | Category: ${newEntry.category}`
    );

    res.status(201).json({
      success: true,
      message: "Claim Entry successfully logged.",
    });
  } catch (e) {
    console.error("「Entry Error」", e);
    return res.status(500).json({
      success: false,
      error: "Internal failure to register the claim entry.",
    });
  }
};
