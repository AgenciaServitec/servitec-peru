import { firestore } from "../index";
import {
  fetchCollection,
  fetchDocument,
  setDocument,
  updateDocument,
  type WhereClauses,
} from "../firestore";
import type { ServiceRequest } from "../../globalTypes";

export const servicesRequestsRef = firestore.collection("services-requests");
export const getServiceRequestId = (): string => servicesRequestsRef.doc().id;

export const fetchServicesRequests = async (
  whereClauses?: WhereClauses<ServiceRequest>[]
): Promise<ServiceRequest[]> =>
  fetchCollection<ServiceRequest>(servicesRequestsRef, whereClauses);

export const fetchServiceRequest = async (
  serviceRequestId: string
): Promise<ServiceRequest | undefined> =>
  fetchDocument<ServiceRequest>(servicesRequestsRef.doc(serviceRequestId));

export const addServiceRequest = async (
  serviceRequest: {
    id: string;
    status: "pending" | "inProgress" | "completed" | "cancelled";
    client: {
      firstName: string;
      paternalSurname: string;
      maternalSurname: string | undefined;
      document: { type: "dni" | "ruc"; number: string };
      phone: { prefix: string; number: string };
      email: string;
    };
    location: { address: string; geoPoint: { lat: string; lng: string } };
    problemDescription: string;
    device: string;
    assignment: string | null;
  } & { createAt: Date; updateAt: Date; isDeleted?: false }
): Promise<void> =>
  setDocument<Partial<ServiceRequest>>(
    servicesRequestsRef.doc(serviceRequest.id),
    serviceRequest
  );

export const updateServiceRequest = async (
  serviceRequestId: string,
  serviceRequest: Partial<ServiceRequest>
): Promise<void> =>
  updateDocument<Partial<ServiceRequest>>(
    servicesRequestsRef.doc(serviceRequestId),
    serviceRequest
  );

export const deleteServiceRequest = async (
  serviceRequestId: string,
  serviceRequest: Partial<ServiceRequest>
): Promise<void> =>
  updateDocument<Partial<ServiceRequest>>(
    servicesRequestsRef.doc(serviceRequestId),
    serviceRequest
  );
