import type { User } from "./providers";

export type Timestamp = FirebaseFirestore.Timestamp;

interface DefaultFirestoreProps {
  createAt: Timestamp;
  updateAt: Timestamp;
  updateBy: string;
  isDeleted: boolean;
}

export type RoleCode = "super_admin" | "user";

export interface _Image {
  createAt: Timestamp;
  name: string;
  status?: string;
  thumbUrl: string;
  uid: string;
  url: string;
}

export type Image = Omit<_Image, "createAt"> & { createAt: Date };

interface Quotation extends DefaultFirestoreProps {
  id: string;
  sequenceNumber: number;
  client: {
    firstName?: string;
    paternalSurname?: string;
    maternalSurname?: string;
    companyName?: string;
    document: {
      type: string;
      number: string;
    };
    phone: {
      prefix: "+51";
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

export interface Assistance extends DefaultFirestoreProps {
  id: string;
  createAtString: string;
  orderLunch?: boolean;
  entry: { date: string; dateTimestamp: FirebaseFirestore.Timestamp } | null;
  outlet: { date: string } | null;
  minutesWorked: number;
  userId: string;
  user: User;
  workPlace?: string;
}

export interface ServiceRequest extends DefaultFirestoreProps {
  id: string;
  status: "pending" | "inProgress" | "completed" | "cancelled";
  client: {
    firstName?: string;
    paternalSurname?: string;
    maternalSurname?: string;
    companyName?: string;
    document: {
      type: "dni" | "ruc";
      number: string;
    };
    phone: {
      prefix: "+51";
      number: string;
    };
    email: string;
  };
  location: {
    address: string;
    geoPoint: {
      lat: number;
      lng: number;
    };
  };
  technicianLocation: {
    lat: number;
    lng: number;
  };
  problemDescription: string;
  device: string;
  assignment?: string | null;
}
