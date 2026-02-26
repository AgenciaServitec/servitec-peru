import { Change, FirestoreEvent } from "firebase-functions/v2/firestore";
import * as admin from "firebase-admin";
import { firestore } from "firebase-admin";
import { Expo } from "expo-server-sdk";
import { ServiceRequest } from "../globalTypes";
import DocumentSnapshot = firestore.DocumentSnapshot;
import QueryDocumentSnapshot = firestore.QueryDocumentSnapshot;

const expo = new Expo();

export type OnDocumentUpdated = (
  event: FirestoreEvent<Change<DocumentSnapshot> | undefined>
) => void | Promise<void>;

export type OnDocumentCreated = (
  event: FirestoreEvent<QueryDocumentSnapshot | undefined>
) => void | Promise<void>;

const SERVICE_TYPE_LABELS: Record<string, string> = {
  carry_in: "Revisión en Taller",
  remote_support: "Soporte Remoto",
  pickup_delivery: "Recojo y Entrega",
  on_site_standard: "Visita Domiciliaria",
};

const DEVICE_LABELS: Record<string, string> = {
  cellPhone: "Celular",
  tablet: "Tablet",
  laptop: "Laptop",
  desktop: "PC de Escritorio",
  all_in_one: "PC Todo en Uno",
  cpu: "CPU",
  monitor: "Monitor",
  printer: "Impresora",
  projector: "Proyector",
  camera: "Cámara",
  tv: "TV",
  server: "Servidor",
  network_device: "Dispositivo de Red",
  hard_drive: "Disco Duro",
  ssd: "SSD",
  ups: "UPS",
  scanner: "Escáner",
  audio_device: "Dispositivo de Audio",
  gaming_console: "Consola de Juegos",
  wearable: "Wearable",
  accessory: "Accesorio",
  software: "Software",
  web_page: "Página Web",
  antivirus_update: "Antivirus / Actualización",
  cctv_camera: "Cámara de Seguridad / CCTV",
  dvr_nvr: "DVR / NVR (Grabador de Video)",
  network_cabling: "Punto de Red / Cableado",
  data_recovery: "Recuperación de Datos",
  smart_home: "Domótica (Alexa, Google Home)",
  other: "Otros",
};

export const onTriggerServiceRequestCreated: OnDocumentCreated = async (
  event
) => {
  if (!event.data) return;

  const requestData = event.data.data() as ServiceRequest;

  const serviceType = (requestData as any).serviceType || "general";
  const serviceTypeLabel =
    SERVICE_TYPE_LABELS[serviceType] || "Nueva Solicitud";

  const deviceLabel =
    DEVICE_LABELS[requestData.device] ||
    requestData.device ||
    "Equipo/Servicio";

  try {
    const techniciansSnapshot = await admin
      .firestore()
      .collection("users")
      .where("role", "==", "technician")
      .where("isDeleted", "==", false)
      .get();

    const messages: any[] = [];

    techniciansSnapshot.forEach((doc) => {
      const techData = doc.data();

      if (techData.pushToken && Expo.isExpoPushToken(techData.pushToken)) {
        messages.push({
          to: techData.pushToken,
          sound: "default",
          title: "¡Nuevo trabajo disponible! 🛠️",
          body: `${serviceTypeLabel} - ${deviceLabel}\nFalla: ${requestData.problemDescription?.substring(0, 40)}...`,
          data: {
            serviceRequestId: event.params.serviceRequestId,
            type: "NEW_SERVICE_REQUEST",
          },
        });
      }
    });

    if (messages.length === 0) {
      console.log("No hay técnicos con tokens para notificar.");
      return;
    }

    const chunks = expo.chunkPushNotifications(messages);
    for (const chunk of chunks) {
      try {
        await expo.sendPushNotificationsAsync(chunk);
      } catch (error) {
        console.error("Error enviando chunk a Expo:", error);
      }
    }

    console.log(`Notificaciones enviadas a ${messages.length} técnicos.`);
  } catch (error) {
    console.error("Error en onServiceRequestCreatedTrigger:", error);
  }
};

export const onTriggerServiceRequestUpdated: OnDocumentUpdated = async (
  event
) => {
  if (!event.data) return;

  const beforeData = event.data.before.data() as ServiceRequest;
  const afterData = event.data.after.data() as ServiceRequest;

  const isNewlyAssigned = !beforeData.assignment && afterData.assignment;

  if (isNewlyAssigned && afterData.userId && afterData.assignment) {
    try {
      const clientDoc = await admin
        .firestore()
        .collection("users")
        .doc(afterData.userId)
        .get();

      const clientData = clientDoc.data();

      if (
        !clientData?.pushToken ||
        !Expo.isExpoPushToken(clientData.pushToken)
      ) {
        console.log(
          `El cliente ${afterData.userId} no tiene un pushToken válido.`
        );
        return;
      }

      const techDoc = await admin
        .firestore()
        .collection("users")
        .doc(afterData.assignment)
        .get();

      const techData = techDoc.data();
      const techName = techData
        ? `${techData.firstName} ${techData.paternalSurname}`
        : "Un técnico";

      const deviceLabel =
        DEVICE_LABELS[afterData.device] || afterData.device || "Equipo";

      const message = {
        to: clientData.pushToken,
        sound: "default",
        title: "¡Solicitud Aceptada! ✅",
        body: `El técnico ${techName} acepto tu solicitud de servicio para tu ${deviceLabel}.`,
        data: {
          serviceRequestId: event.params.serviceRequestId,
          type: "SERVICE_ACCEPTED",
        },
      };

      await expo.sendPushNotificationsAsync([message]);

      console.log(
        `Notificación de aceptación enviada al cliente ${afterData.userId}.`
      );
    } catch (error) {
      console.error("Error enviando notificación al cliente:", error);
    }
  }
};
