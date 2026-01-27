import { ServiceRequest } from "../../globalTypes";
import { fetchCollection, fetchDocument } from "../firestore";
import { firestore, setDocument } from "../index";

export const servicesRequestsRef = firestore.collection("services-requests");

export const getServiceRequestId = (): string => servicesRequestsRef.doc().id;

export const fetchServiceRequest = async (
  serviceRequestId: string
): Promise<ServiceRequest | undefined> =>
  fetchDocument<ServiceRequest>(servicesRequestsRef.doc(serviceRequestId));

export const addServiceRequest = async (
  serviceRequest: ServiceRequest
): Promise<FirebaseFirestore.WriteResult> =>
  setDocument<ServiceRequest>(
    servicesRequestsRef.doc(serviceRequest.id),
    serviceRequest
  );

export const fetchServiceRequests = async (): Promise<
  ServiceRequest[] | undefined
> => fetchCollection(servicesRequestsRef.where("isDeleted", "==", false));

export const updateServiceRequest = (
  serviceRequestId: string,
  serviceRequest: Partial<ServiceRequest>
) => servicesRequestsRef.doc(serviceRequestId).update(serviceRequest);
