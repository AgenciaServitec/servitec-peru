import { firestore, setDocument } from "../index";
import { fetchCollection } from "../firestore";
import { Entry } from "../../globalTypes";

export const entriesRef = firestore.collection("entries");

export const getEntryId = (): string => entriesRef.doc().id;

export const addEntry = async (
  entry: Entry
): Promise<FirebaseFirestore.WriteResult> =>
  setDocument<Entry>(entriesRef.doc(entry.id), entry);

export const fetchEntries = async (): Promise<Entry[] | undefined> =>
  fetchCollection(
    entriesRef.where("isDeleted", "==", false).orderBy("createAt", "desc")
  );

export const updateEntry = (entryId: string, entry: Partial<Entry>) =>
  entriesRef.doc(entryId).update(entry);
