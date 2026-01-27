import express, { Router } from "express";

import {
  getServiceRequest,
  getServicesRequests,
  postServiceRequest,
  putServiceRequest,
} from "../controllers";

const router: Router = express.Router();

router.get("/", getServicesRequests);
router.get("/:serviceRequestId", getServiceRequest);
router.post("/", postServiceRequest);
router.put("/:serviceRequestId", putServiceRequest);

export default router;
