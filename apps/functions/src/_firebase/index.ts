import { getApps, initializeApp } from "firebase-admin/app";
import { getAuth } from "firebase-admin/auth";
import { FieldValue, getFirestore, Timestamp } from "firebase-admin/firestore";
import { getStorage } from "firebase-admin/storage";

if (!getApps().length) {
  initializeApp();
}

// eslint-disable-next-line turbo/no-undeclared-env-vars
const projectId = process.env.GCLOUD_PROJECT;

const currentEnvironment =
  projectId === "servitec-peru" ? "production" : "development";

export const isProduction = currentEnvironment === "production";

export const bucketAtFunction = projectId + ".appspot.com";

export const firestore = getFirestore();
export const storage = getStorage();
export const auth = getAuth();
export const firestoreFieldValue = FieldValue;
export const firestoreTimestamp = Timestamp;

export * from "./firestore";
