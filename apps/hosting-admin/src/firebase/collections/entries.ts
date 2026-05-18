import { firestore } from "../index";
import {
  fetchCollection,
  fetchDocument,
  setDocument,
  updateDocument,
  type WhereClauses,
} from "../firestore";
import type { Entry } from "../../globalTypes";

export const entriesRef = firestore.collection("entries");
export const getEntryId = (): string => entriesRef.doc().id;

export const fetchEntries = async (
  whereClauses?: WhereClauses<Entry>[]
): Promise<Entry[]> => fetchCollection<Entry>(entriesRef, whereClauses);

export const fetchEntry = async (entryId: string): Promise<Entry | undefined> =>
  fetchDocument<Entry>(entriesRef.doc(entryId));

export const addEntry = async (entry: Partial<Entry>): Promise<void> =>
  setDocument<Partial<Entry>>(entriesRef.doc(entry.id), entry);

export const updateEntry = async (
  entryId: string,
  entry: Partial<Entry>
): Promise<void> =>
  updateDocument<Partial<Entry>>(entriesRef.doc(entryId), entry);

export const deleteEntry = async (
  entryId: string,
  entry: Partial<Entry>
): Promise<void> =>
  updateDocument<Partial<Entry>>(entriesRef.doc(entryId), entry);
