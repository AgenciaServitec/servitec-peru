export type CurrencyCode = 'PEN' | 'USD';

export interface Phone {
  code: string;
  number: string;
}

interface Image {
  name: string;
  status?: string;
  thumbUrl: string;
  uid: string;
  url: string;
}
