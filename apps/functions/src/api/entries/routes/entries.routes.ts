import express, { Router } from "express";
import { getEntries, getEntry, postEntry, putEntry } from "../controllers";

const router: Router = express.Router();

router.get("/", getEntries);

router.get("/:entryId", getEntry);

router.post("/", postEntry);

router.put("/:entryId/status", putEntry);

export default router;
