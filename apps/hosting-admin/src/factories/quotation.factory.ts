import { getQuotationId } from '../firebase/collections';
import type { Quotation } from '../globalTypes';

export const createEmptyQuotation = (): Quotation => ({
  id: getQuotationId(),
  client: {
    firstName: '',
    paternalSurname: '',
    maternalSurname: '',
    companyName: '',
    document: { type: '', number: '' },
    phone: { prefix: '+51', number: '' },
  },
  device: {
    problemDescription: '',
    type: '',
    brand: '',
    model: '',
    color: '',
  },
  analysis: '',
  solutions: '',
  recommendations: '',
  serialNumber: '',
  description: '',
  units: 0,
  unitPrices: 0,
});
