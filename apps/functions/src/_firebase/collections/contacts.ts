import { fetchDocument, firestore, setDocument } from "../index";
import { Contact } from "../../globalTypes";

export const contactsRef = firestore.collection("contacts");

export const getContactId = (): string => contactsRef.doc().id;

export const fetchContact = async (
  contactId: string
): Promise<Contact | undefined> =>
  fetchDocument<Contact>(contactsRef.doc(contactId));

export const addContact = async (
  contact: Contact
): Promise<FirebaseFirestore.WriteResult> =>
  setDocument<Contact>(contactsRef.doc(contact.id), contact);

export const updateContact = (contactId: string, contact: Partial<Contact>) =>
  contactsRef.doc(contactId).update(contact);

export const fetchContactByEmail = async (
  email: string
): Promise<Contact | undefined> => {
  const snapshot = await contactsRef
    .where("email", "==", email)
    .where("isDeleted", "==", false)
    .limit(1)
    .get();

  if (snapshot.empty) return undefined;

  return snapshot.docs[0].data() as Contact;
};
