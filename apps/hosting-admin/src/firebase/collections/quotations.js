import { firestore } from '../index';
import { fetchCollection, fetchDocument, setDocument, updateDocument, } from '../firestore';
export const quotationsRef = firestore.collection('quotations');
export const getQuotationId = () => quotationsRef.doc().id;
export const fetchQuotations = async (whereClauses) => fetchCollection(quotationsRef, whereClauses);
export const fetchQuotation = async (quotationId) => fetchDocument(quotationsRef.doc(quotationId));
export const addQuotation = async (quotation) => setDocument(quotationsRef.doc(quotation.id), quotation);
export const updateQuotation = async (quotationId, quotation) => updateDocument(quotationsRef.doc(quotationId), quotation);
export const deleteQuotation = async (quotationId, quotation) => updateDocument(quotationsRef.doc(quotationId), quotation);
