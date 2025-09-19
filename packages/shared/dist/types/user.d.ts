import { Phone } from './common';
export interface User {
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
    birthDate?: string;
    gender?: 'male' | 'female' | 'other';
}
