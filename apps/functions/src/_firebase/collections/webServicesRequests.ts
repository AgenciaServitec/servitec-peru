import { WebServiceRequest } from "../../globalTypes";
import { fetchCollection, fetchDocument } from "../firestore";
import { firestore, setDocument } from "../index";

export const webServicesRequestsRef = firestore.collection(
  "web-services-requests"
);

export const getWebServiceRequestId = (): string =>
  webServicesRequestsRef.doc().id;

export const fetchWebServiceRequest = async (
  webWebServiceRequestId: string
): Promise<WebServiceRequest | undefined> =>
  fetchDocument<WebServiceRequest>(
    webServicesRequestsRef.doc(webWebServiceRequestId)
  );

export const addWebServiceRequest = async (
  webServiceRequest: WebServiceRequest
): Promise<FirebaseFirestore.WriteResult> => {
  const id = webServiceRequest.id || getWebServiceRequestId();
  return setDocument<WebServiceRequest>(webServicesRequestsRef.doc(id), {
    ...webServiceRequest,
    id,
  });
};

export const fetchWebServiceRequests = async (): Promise<
  WebServiceRequest[] | undefined
> => fetchCollection(webServicesRequestsRef.where("isDeleted", "==", false));

export const updateWebServiceRequest = (
  webWebServiceRequestId: string,
  webServiceRequest: Partial<WebServiceRequest>
) =>
  webServicesRequestsRef.doc(webWebServiceRequestId).update(webServiceRequest);
