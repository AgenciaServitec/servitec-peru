import express, { Router } from "express";

import {
  getQuotation,
  getQuotations,
  postQuotation,
  putQuotation,
} from "../controllers/index.js";

const router: Router = express.Router();

router.get("/", getQuotations);
router.get("/:quotationId", getQuotation);
router.post("/", postQuotation);
router.put("/:quotationId", putQuotation);

export default router;
