import express, { Router } from "express";

import {
  getWebServiceRequest,
  getWebServicesRequests,
  postWebServiceRequest,
  putWebServiceRequest,
} from "../controllers";

const router: Router = express.Router();

router.get("/", getWebServicesRequests);
router.get("/:webServiceRequestId", getWebServiceRequest);
router.post("/", postWebServiceRequest);
router.put("/:webServiceRequestId", putWebServiceRequest);

export default router;
