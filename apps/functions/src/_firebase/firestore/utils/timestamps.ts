import * as admin from 'firebase-admin';

export const toISO = (t: admin.firestore.Timestamp | undefined): string | undefined => {
  return t ? t.toDate().toISOString() : undefined;
};

export const fromISO = (iso: string | undefined): admin.firestore.Timestamp | undefined => {
  return iso ? admin.firestore.Timestamp.fromDate(new Date(iso)) : undefined;
};

export const mapTimestampsToISO = <T extends Record<string, any>>(doc: T, keys: (keyof T)[]): T => {
  const result: any = { ...doc };
  keys.forEach((k) => {
    if (doc[k]) {
      result[k] = toISO(doc[k]);
    }
  });
  return result;
};

export const mapISOToTimestamps = <T extends Record<string, any>>(doc: T, keys: (keyof T)[]): T => {
  const result: any = { ...doc };
  keys.forEach((k) => {
    if (doc[k]) {
      result[k] = fromISO(doc[k]);
    }
  });
  return result;
};
