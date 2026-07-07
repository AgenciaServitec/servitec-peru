import { firestore } from "../index";
import {
  fetchCollection,
  fetchDocument,
  setDocument,
  updateDocument,
  type WhereClauses,
} from "../firestore";

export interface QrCode {
  id: string;
  type: "static" | "dynamic";
  domain: string | null;
  destinationUrl: string;
  shortUrl: string | null;
  title?: string;
  status: "active" | "paused" | "expired";
  analytics: {
    clicks: number;
  };
  userId: string;
  createdAt: string;
  updatedAt: string;
}

export const qrCodesRef = firestore.collection("qrCodes");

export const getQrCodeId = (): string => qrCodesRef.doc().id;

export const fetchQrCodes = async (
  whereClauses?: WhereClauses<QrCode>[]
): Promise<QrCode[]> => fetchCollection<QrCode>(qrCodesRef, whereClauses);

export const fetchQrCode = async (qrId: string): Promise<QrCode | undefined> =>
  fetchDocument<QrCode>(qrCodesRef.doc(qrId));

export const addQrCode = async (qrCode: QrCode): Promise<void> =>
  setDocument<QrCode>(qrCodesRef.doc(qrCode.id), qrCode);

export const updateQrCode = async (
  qrId: string,
  qrCode: Partial<QrCode>
): Promise<void> =>
  updateDocument<Partial<QrCode>>(qrCodesRef.doc(qrId), qrCode);

export const deleteQrCode = async (
  qrId: string,
  qrCode: Partial<QrCode>
): Promise<void> =>
  updateDocument<Partial<QrCode>>(qrCodesRef.doc(qrId), qrCode);
