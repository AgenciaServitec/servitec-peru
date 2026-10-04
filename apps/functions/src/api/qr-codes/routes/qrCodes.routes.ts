import express, { Router } from "express";
import { postResolveQrCode } from "../controllers/postQrCodes";

const router: Router = express.Router();

router.post("/resolve", postResolveQrCode);

export default router;
