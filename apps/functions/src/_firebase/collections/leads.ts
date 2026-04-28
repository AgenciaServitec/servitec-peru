import { firestore, setDocument } from "../index";
import { fetchCollection } from "../firestore";
import { Lead } from "../../globalTypes";

export const leadsRef = firestore.collection("leads");

export const getLeadId = (): string => leadsRef.doc().id;

export const addLead = async (
  lead: Lead
): Promise<FirebaseFirestore.WriteResult> =>
  setDocument<Lead>(leadsRef.doc(lead.id), lead);

export const fetchLeads = async (): Promise<Lead[] | undefined> =>
  fetchCollection(
    leadsRef.where("isDeleted", "==", false).orderBy("createAt", "desc")
  );

export const updateLead = (leadId: string, lead: Partial<Lead>) =>
  leadsRef.doc(leadId).update(lead);
