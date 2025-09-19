import * as admin from 'firebase-admin';

export const toISO = (date: admin.firestore.Timestamp): string => date.toDate().toISOString();

export const fromISO = (iso: string): admin.firestore.Timestamp =>
  admin.firestore.Timestamp.fromDate(new Date(iso));

export const nowISO = (): string => new Date().toISOString();
