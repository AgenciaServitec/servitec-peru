import { AppTimestamp, BaseModel, Phone } from './common';

export interface User extends BaseModel {
  id: string;
  firstName: string;
  paternalSurname: string;
  maternalSurname: string;
  email: string;
  document: {
    type: 'DNI' | 'RUC' | 'CE';
    number: string;
  };
  phone: Phone;
  profilePhoto?: string;
  birthDate?: AppTimestamp;
  gender?: 'male' | 'female' | 'other';
}
