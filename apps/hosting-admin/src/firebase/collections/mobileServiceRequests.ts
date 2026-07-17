import { firestore } from "../index";
import {
  fetchCollection,
  fetchDocument,
  setDocument,
  updateDocument,
  type WhereClauses,
} from "../firestore";
import type { ServiceRequest } from "../../globalTypes";

export const mobileServicesRequestsRef =
  firestore.collection("services-requests");
export const getMobileServicesRequestsId = (): string =>
  mobileServicesRequestsRef.doc().id;

export const fetchMobileServicesRequests = async (
  whereClauses?: WhereClauses<ServiceRequest>[]
): Promise<ServiceRequest[]> =>
  fetchCollection<ServiceRequest>(mobileServicesRequestsRef, whereClauses);

export const fetchMobileServiceRequest = async (
  mobileServiceRequestId: string
): Promise<ServiceRequest | undefined> =>
  fetchDocument<ServiceRequest>(
    mobileServicesRequestsRef.doc(mobileServiceRequestId)
  );

export const addMobileServiceRequest = async (
  mobileServiceRequest: {
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
    mobileServicesRequestsRef.doc(mobileServiceRequest.id),
    mobileServiceRequest
  );

export const updateMobileServiceRequest = async (
  mobileServiceRequestId: string,
  mobileServiceRequest: Partial<ServiceRequest>
): Promise<void> =>
  updateDocument<Partial<ServiceRequest>>(
    mobileServicesRequestsRef.doc(mobileServiceRequestId),
    mobileServiceRequest
  );

export const deleteMobileServiceRequest = async (
  mobileServiceRequestId: string,
  mobileServiceRequest: Partial<ServiceRequest>
): Promise<void> =>
  updateDocument<Partial<ServiceRequest>>(
    mobileServicesRequestsRef.doc(mobileServiceRequestId),
    mobileServiceRequest
  );
