import { firestore } from "../index";
import {
  fetchCollection,
  fetchDocument,
  setDocument,
  updateDocument,
  type WhereClauses,
} from "../firestore";

export const branchesRef = firestore.collection("branches");

export const getBranchId = (): string => branchesRef.doc().id;

export const fetchBranches = async (
  whereClauses?: WhereClauses<any>[]
): Promise<any[]> => fetchCollection<any>(branchesRef, whereClauses);

export const fetchBranch = async (branchId: string): Promise<any | undefined> =>
  fetchDocument<any>(branchesRef.doc(branchId));

export const addBranch = async (branch: any): Promise<void> =>
  setDocument<any>(branchesRef.doc(branch.id), branch);

export const updateBranch = async (
  branchId: string,
  branch: any
): Promise<void> => updateDocument<any>(branchesRef.doc(branchId), branch);

export const deleteBranch = async (
  branchId: string,
  branch: any
): Promise<void> =>
  updateDocument<any>(branchesRef.doc(branchId), {
    ...branch,
    isActive: false,
  });
