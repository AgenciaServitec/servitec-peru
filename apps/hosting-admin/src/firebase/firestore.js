import firebase from 'firebase/compat/app';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
export const querySnapshotToArray = (querySnapshot) => {
    const documents = [];
    querySnapshot.forEach((documentSnapshot) => {
        const document = documentSnapshot.data();
        documents.push({ ...document, id: documentSnapshot.id });
    });
    return documents;
};
export const documentSnapshotToDocument = (docSnapshot) => {
    const document = docSnapshot;
    return document.data();
};
export const fetchCollection = async (query, whereClauses) => {
    let newQuery = query;
    whereClauses?.forEach(([field, operation, value]) => (newQuery = newQuery.where(field, operation, value)));
    const querySnapshot = await newQuery.get();
    return querySnapshotToArray(querySnapshot);
};
export const fetchCollectionOnce = async (query) => {
    const querySnapshot = await query.get();
    return querySnapshotToArray(querySnapshot);
};
export const fetchDocument = async (query) => {
    const documentSnapshot = await query.get();
    return documentSnapshotToDocument(documentSnapshot);
};
export const setDocument = async (docRef, document) => docRef.set(document);
export const updateDocument = async (docRef, document) => docRef.update(document);
export const mergeDocument = async (docRef, document) => docRef.set(document, { merge: true });
export const deleteDocument = async (docRef) => docRef.delete();
export const uploadToFirebase = async (file) => {
    const storage = getStorage();
    const storageRef = ref(storage, `agreements/${file.name}`);
    await uploadBytes(storageRef, file);
    const url = await getDownloadURL(storageRef);
    return url;
};
