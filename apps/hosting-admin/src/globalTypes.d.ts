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

interface Quotation extends DefaultFirestoreProps {
  id: string;
  client: {
    firstName?: string;
    paternalSurname?: string;
    maternalSurname?: string;
    companyName?: string;
    document: {
      type: string;
      number: string;
    };
    phone: Phone;
  };
  device: {
    problemDescription: string;
    type: string;
    brand: string;
    model: string;
    color: string;
  };
  analysis: string;
  solutionsRecommendations: string;
  serialNumber: string;
  items: {
    description: string;
    units: number;
    unitPrice: number;
  }[];
}
