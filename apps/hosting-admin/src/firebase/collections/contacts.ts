import { firestore } from "../index";
import {
  fetchCollection,
  fetchDocument,
  setDocument,
  updateDocument,
  type WhereClauses,
} from "../firestore";
import type { Contact } from "../../globalTypes";

export const contactsRef = firestore.collection("contacts");
export const getContactId = (): string => contactsRef.doc().id;

export const fetchEntries = async (
  whereClauses?: WhereClauses<Contact>[]
): Promise<Contact[]> => fetchCollection<Contact>(contactsRef, whereClauses);

export const fetchContact = async (
  contactId: string
): Promise<Contact | undefined> =>
  fetchDocument<Contact>(contactsRef.doc(contactId));

export const addContact = async (contact: Partial<Contact>): Promise<void> =>
  setDocument<Partial<Contact>>(contactsRef.doc(contact.id), contact);

export const updateContact = async (
  contactId: string,
  contact: Partial<Contact>
): Promise<void> =>
  updateDocument<Partial<Contact>>(contactsRef.doc(contactId), contact);

export const deleteContact = async (
  contactId: string,
  contact: Partial<Contact>
): Promise<void> =>
  updateDocument<Partial<Contact>>(contactsRef.doc(contactId), contact);
