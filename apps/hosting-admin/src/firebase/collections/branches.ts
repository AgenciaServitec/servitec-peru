import { firestore } from "../index";
import { fetchCollection, type WhereClauses } from "../firestore";

export const branchesRef = firestore.collection("branches");

export const fetchBranches = async (
  whereClauses?: WhereClauses<any>[]
): Promise<any[]> => fetchCollection<any>(branchesRef, whereClauses);
