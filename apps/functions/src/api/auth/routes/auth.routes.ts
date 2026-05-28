import { Router } from "express";
import { postSendVerificationCode, postVerifyCode } from "../controllers";

const router = Router();

router.post("/verification-code/send", postSendVerificationCode);
router.post("/verification-code/verify", postVerifyCode);

export default router;
