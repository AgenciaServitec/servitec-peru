import type { Dayjs } from 'dayjs';
import type { InputHTMLAttributes } from 'react';

export type Timestamp = FirebaseFirestore.Timestamp;

interface DefaultFirestoreProps {
  createAt: Timestamp;
  updateAt: Timestamp;
  // updateBy: string;
  isDeleted: boolean;
}

export type RoleCode = 'super_admin' | 'user';

export interface _Image {
  createAt: Timestamp;
  name: string;
  status?: string;
  thumbUrl: string;
  uid: string;
  url: string;
}

export type Image = Omit<_Image, 'createAt'> & { createAt: Date };

interface Quotation {
  id: string;
  client: {
    firstName: string;
    paternalSurname: string;
    maternalSurname: string;
    companyName: string;
    document: {
      type: string;
      number: string;
    };
    phone: {
      prefix: '+51';
      number: string;
    };
  };
  device: {
    problemDescription: string;
    type: string;
    brand: string;
    model: string;
    color: string;
  };
  analysis: string;
  solutions: string;
  recommendations: string;
  serialNumber: string;
  description: string;
  units: number;
  unitPrices: number;
}

export interface BaseContainerProps {
  value?: boolean;
  required?: boolean;
  error?: boolean;
  hidden?: boolean;
  label?: string;
  disabled?: boolean;
  componentId?: string;
  children?: ReactNode;
  animation?: boolean;
  helperText?: string;
}
