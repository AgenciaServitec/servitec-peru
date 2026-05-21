import express, { Router } from "express";
import {
  postClaimEntry,
  postComplaintsBookEntry,
  postContactEntry,
  postSuggestionEntry,
} from "../controllers";

const router: Router = express.Router();

router.post("/contact", postContactEntry);
router.post("/suggestion", postSuggestionEntry);
router.post("/claim", postClaimEntry);
router.post("/complaints-book", postComplaintsBookEntry);

export default router;
