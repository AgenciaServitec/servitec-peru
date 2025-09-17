export type AppTimestamp = string;

export interface BaseModel {
  createAt: AppTimestamp;
  updateAt: AppTimestamp;
  updateBy: string;
  isDeleted: boolean;
}

export type CurrencyCode = 'PEN' | 'USD';

export interface Phone {
  code: string;
  number: string;
}
interface _Image {
  createAt: AppTimestamp;
  name: string;
  status?: string;
  thumbUrl: string;
  uid: string;
  url: string;
}

export type Image = Omit<_Image, 'createAt'> & { createAt: Date };
