export type CurrencyCode = 'PEN' | 'USD';

interface DefaultFirestoreProps {
  createAt: string;
  updateAt: string;
  deleteAt: string;
  isDeleted?: boolean;
}

export interface Phone {
  prefix: string;
  number: string;
}

interface Image {
  name: string;
  status?: string;
  thumbUrl: string;
  uid: string;
  url: string;
}
