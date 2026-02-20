import { HttpsOptions, onRequest } from "firebase-functions/v2/https";
import { app } from "./api";
import {
  DocumentOptions,
  onDocumentCreated,
  onDocumentUpdated,
} from "firebase-functions/v2/firestore";
import {
  onTriggerServiceRequestCreated,
  onTriggerServiceRequestUpdated,
} from "./triggers";

const httpsOptions = (httpsOptions?: Partial<HttpsOptions>): HttpsOptions => ({
  timeoutSeconds: 540,
  memory: "256MiB",
  maxInstances: 10,
  ...httpsOptions,
});

const triggersOptions = (
  document: string,
  triggerOptions?: Partial<DocumentOptions>
): DocumentOptions => ({
  document,
  timeoutSeconds: 540,
  memory: "256MiB",
  ...triggerOptions,
});

exports.api = onRequest(httpsOptions(), app);

exports.onTriggerServiceRequestCreated = onDocumentCreated(
  triggersOptions("services-requests/{serviceRequestId}"),
  onTriggerServiceRequestCreated
);

exports.onTriggerServiceRequestUpdated = onDocumentUpdated(
  triggersOptions("services-requests/{serviceRequestId}"),
  onTriggerServiceRequestUpdated
);
