export type Timestamp = FirebaseFirestore.Timestamp;

type OmitDefaultFirestoreProps<T> = Omit<T, keyof PickDefaultFirestoreProps>;

type PickDefaultFirestoreProps = Pick<
  DefaultFirestoreProps,
  "createAt" | "isDeleted" | "updateAt"
>;

interface DefaultFirestoreProps {
  createAt: Timestamp;
  updateAt: Timestamp;
  updateBy: string;
  isDeleted: boolean;
}

export type RoleCode = "super_admin" | "user";
export type CurrencyCode = "PEN" | "USD";

export interface _Image {
  createAt: Timestamp;
  name: string;
  status?: string;
  thumbUrl: string;
  uid: string;
  url: string;
}

export type Image = Omit<_Image, "createAt"> & { createAt: Date };

export interface Archive {
  name: string;
  status?: string;
  uid: string;
  url: string;
}

interface Phone {
  prefix: string;
  number: string;
}

interface User extends DefaultFirestoreProps {
  id: string;
  firstName: string;
  paternalSurname: string;
  maternalSurname: string;
  email: string;
  document: {
    type: "DNI" | "RUC" | "CE";
    number: string;
  };
  phone: Phone;
  profilePhoto?: string;
  birthDate?: string;
  gender?: "male" | "female" | "other";
  fingerprintTemplate: string | "";
}

interface Quotation {
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
    type: string;
    brand: string;
    model: string;
    color: string;
  };
  analysis: string;
  solutions: string;
  recommendations: string;
  serieNumber: string;
}

interface Assistance extends DefaultFirestoreProps {
  id: string;
  createAtString: string;
  entry: { date: string; dateTimestamp: FirebaseFirestore.Timestamp } | null;
  outlet: { date: string } | null;
  userId: string;
  user: User;
  workPlace: string | null;
  status: "delay" | "attended" | null;
  minutesWorked: number | 0;
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
  estimatedPrice: number;
  serviceType: string;
  userId: string;
  assignment?: string | null;
}
