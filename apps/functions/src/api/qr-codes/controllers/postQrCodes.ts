import { Request, Response } from "express";
import { firestore } from "firebase-admin";
import { defaultFirestoreProps } from "../../../utils";
import {
  fetchQrCodeByShortId,
  updateQrCode,
} from "../../../_firebase/collections/qrCodes";

export const postResolveQrCode = async (req: Request, res: Response) => {
  const { body } = req;
  const { assignUpdateProps } = defaultFirestoreProps();

  if (!body.domain || !body.qrId) {
    return res.status(400).json({
      success: false,
      error: "BAD_REQUEST",
      message: "Faltan parámetros obligatorios: domain y qrId.",
    });
  }

  try {
    console.log(
      `「QR Query」Buscando shortId: ${body.qrId} para el dominio: ${body.domain}`
    );

    const qrData = await fetchQrCodeByShortId(body.qrId);

    console.log("qrData: ", qrData);

    if (!qrData) {
      console.log(`「QR Error」No se encontró shortId: ${body.qrId}`);
      return res.status(404).json({
        success: false,
        error: "NOT_FOUND",
        message: "El código QR solicitado no existe o fue eliminado.",
      });
    }

    if (qrData.domain !== body.domain) {
      console.log(
        `「QR Forbidden」El código ${body.qrId} pertenece a ${qrData.domain}, no a ${body.domain}`
      );
      return res.status(403).json({
        success: false,
        error: "DOMAIN_MISMATCH",
        message: "Este código QR no está autorizado para este dominio.",
      });
    }

    if (qrData.status !== "active") {
      return res.status(403).json({
        success: false,
        error: "QR_INACTIVE",
        message: "El código QR se encuentra temporalmente inactivo.",
      });
    }

    await updateQrCode(
      qrData.id,
      assignUpdateProps({
        "analytics.clicks": firestore.FieldValue.increment(1),
      } as any)
    );

    console.log(
      `「QR Success」Redirección autorizada para ${body.qrId} -> ${qrData.destinationUrl}`
    );

    return res.status(200).json({
      success: true,
      destinationUrl: qrData.destinationUrl,
      message: "Redirección autorizada correctamente.",
    });
  } catch (e) {
    console.error("「QR Resolve Error」", e);
    return res.status(500).json({
      success: false,
      error: "INTERNAL_SERVER_ERROR",
      message: "Fallo interno en el servidor al resolver el QR.",
    });
  }
};
