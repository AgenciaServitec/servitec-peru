import express, { Router } from "express";
import { getLead, getLeads, postLead, putLeadStatus } from "../controllers";

const router: Router = express.Router();

router.get("/", getLeads);

router.get("/:leadId", getLead);

router.post("/", postLead);

router.put("/:leadId/status", putLeadStatus);

export default router;
