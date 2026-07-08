import { fetchCollection, fetchDocument } from "../firestore";
import { firestore, setDocument } from "../index";

export interface QrCode {
  id: string;
  type: "static" | "dynamic";
  domain: string | null;
  shortId: string | null;
  destinationUrl: string;
  shortUrl: string | null;
  title: string;
  description: string | null;
  status: "active" | "paused" | "expired";
  analytics: {
    clicks: number;
  };
  userId: string;
  isDeleted: boolean;
  createdAt: any;
  updatedAt: any;
}

export const qrCodesRef = firestore.collection("qrCodes");

export const getQrCodeId = (): string => qrCodesRef.doc().id;

export const fetchQrCode = async (qrId: string): Promise<QrCode | undefined> =>
  fetchDocument<QrCode>(qrCodesRef.doc(qrId));

export const fetchQrCodeByShortId = async (
  shortId: string
): Promise<QrCode | undefined> => {
  try {
    const snapshot = await qrCodesRef
      .where("shortId", "==", shortId)
      .where("isDeleted", "==", false)
      .limit(1)
      .get();

    if (snapshot.empty) {
      console.log(
        `「ShortId Check」No documents found for shortId: ${shortId}`
      );
      return undefined;
    }

    const doc = snapshot.docs[0];
    return { id: doc.id, ...doc.data() } as QrCode;
  } catch (error) {
    console.error(
      "「Firestore Query Error」Falta índice o error en base de datos:",
      error
    );
    throw error;
  }
};

export const addQrCode = async (
  qrCode: QrCode
): Promise<FirebaseFirestore.WriteResult> =>
  setDocument<QrCode>(qrCodesRef.doc(qrCode.id), qrCode);

export const fetchQrCodes = async (): Promise<QrCode[] | undefined> =>
  fetchCollection(qrCodesRef.where("isDeleted", "==", false));

export const updateQrCode = (qrId: string, qrCode: Partial<QrCode>) =>
  qrCodesRef.doc(qrId).update(qrCode);
