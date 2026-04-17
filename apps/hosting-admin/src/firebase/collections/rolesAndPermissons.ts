import { firestore } from "../index";
import {
  fetchCollection,
  fetchDocument,
  setDocument,
  updateDocument,
  type WhereClauses,
} from "../firestore";
import type { Role } from "../../globalTypes";

export const rolesRef = firestore.collection("roles");
export const getRoleId = (): string => rolesRef.doc().id;

export const fetchRoles = async (
  whereClauses?: WhereClauses<Role>[]
): Promise<Role[]> => fetchCollection<Role>(rolesRef, whereClauses);

export const fetchRole = async (roleId: string): Promise<Role | undefined> =>
  fetchDocument<Role>(rolesRef.doc(roleId));

export const addRole = async (role: Partial<Role>): Promise<void> =>
  setDocument<Partial<Role>>(rolesRef.doc(role.id), role);

export const updateRole = async (
  roleId: string,
  role: Partial<Role>
): Promise<void> => updateDocument<Partial<Role>>(rolesRef.doc(roleId), role);

export const deleteRole = async (
  roleId: string,
  role: Partial<Role>
): Promise<void> => updateDocument<Partial<Role>>(rolesRef.doc(roleId), role);
