import { firestore } from "../index";
import {
  fetchCollection,
  fetchDocument,
  setDocument,
  updateDocument,
  type WhereClauses,
} from "../firestore";
import type { CustomerSite } from "../../globalTypes.ts";

export const sitesRef = firestore.collection("sites");

export const getSiteId = (): string => sitesRef.doc().id;

export const fetchSites = async (
  whereClauses?: WhereClauses<CustomerSite>[]
): Promise<CustomerSite[]> =>
  fetchCollection<CustomerSite>(sitesRef, whereClauses);

export const fetchSite = async (
  siteId: string
): Promise<CustomerSite | undefined> =>
  fetchDocument<CustomerSite>(sitesRef.doc(siteId));

export const addSite = async (site: Partial<CustomerSite>): Promise<void> =>
  setDocument<Partial<CustomerSite>>(sitesRef.doc(site.id), site);

export const updateSite = async (
  siteId: string,
  site: Partial<CustomerSite>
): Promise<void> =>
  updateDocument<Partial<CustomerSite>>(sitesRef.doc(siteId), site);

export const deleteSite = async (
  siteId: string,
  site: Partial<CustomerSite>
): Promise<void> =>
  updateDocument<Partial<CustomerSite>>(sitesRef.doc(siteId), site);
