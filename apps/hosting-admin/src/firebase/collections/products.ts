import { firestore } from "../index";
import {
  fetchCollection,
  fetchDocument,
  setDocument,
  updateDocument,
  type WhereClauses,
} from "../firestore";

export const productsRef = firestore.collection("products");

export const getProductId = (): string => productsRef.doc().id;

export const fetchProducts = async (
  whereClauses?: WhereClauses<any>[]
): Promise<any[]> => fetchCollection<any>(productsRef, whereClauses);

export const fetchProduct = async (
  productId: string
): Promise<any | undefined> => fetchDocument<any>(productsRef.doc(productId));

export const addProduct = async (product: any): Promise<void> =>
  setDocument<any>(productsRef.doc(product.id), product);

export const updateProduct = async (
  productId: string,
  product: any
): Promise<void> => updateDocument<any>(productsRef.doc(productId), product);

export const deleteProduct = async (
  productId: string,
  product: any
): Promise<void> =>
  updateDocument<any>(productsRef.doc(productId), {
    ...product,
    isActive: false,
  });
