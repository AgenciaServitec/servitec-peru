import { firestore } from "../index";
import {
  fetchCollection,
  fetchDocument,
  setDocument,
  updateDocument,
  type WhereClauses,
} from "../firestore";
import type { Supplier } from "../../globalTypes";

export const suppliersRef = firestore.collection("suppliers");
export const getSupplierId = (): string => suppliersRef.doc().id;

export const fetchSuppliers = async (
  whereClauses?: WhereClauses<Supplier>[]
): Promise<Supplier[]> => fetchCollection<Supplier>(suppliersRef, whereClauses);

export const fetchSupplier = async (
  supplierId: string
): Promise<Supplier | undefined> =>
  fetchDocument<Supplier>(suppliersRef.doc(supplierId));

export const addSupplier = async (supplier: Partial<Supplier>): Promise<void> =>
  setDocument<Partial<Supplier>>(suppliersRef.doc(supplier.id), supplier);

export const updateSupplier = async (
  supplierId: string,
  supplier: Partial<Supplier>
): Promise<void> =>
  updateDocument<Partial<Supplier>>(suppliersRef.doc(supplierId), supplier);

export const deleteSupplier = async (
  supplierId: string,
  supplier: Partial<Supplier>
): Promise<void> =>
  updateDocument<Partial<Supplier>>(suppliersRef.doc(supplierId), supplier);
