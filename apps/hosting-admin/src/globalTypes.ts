export type Timestamp = FirebaseFirestore.Timestamp;

interface DefaultFirestoreProps {
  createAt: Timestamp;
  updateAt: Timestamp;
  updateBy: string;
  isDeleted: boolean;
}

export type RoleCode = "super_admin" | "practicing";

export interface _Image {
  createAt: Timestamp;
  name: string;
  status?: string;
  thumbUrl: string;
  uid: string;
  url: string;
}

export type Image = Omit<_Image, "createAt"> & { createAt: Date };

interface Document {
  type: "dni" | "ruc" | "ce";
  number: string;
}

interface Phone {
  prefix: string;
  number: string;
}

type Gender = "male" | "female" | "other" | "";

export interface UserRegister {
  firstName: string;
  paternalSurname: string;
  maternalSurname: string;
  email: string;
  document: Document;
  phone: Phone;
  gender: Gender;
  role: string;
}

export interface User extends DefaultFirestoreProps {
  id: string;
  firstName: string;
  paternalSurname: string;
  maternalSurname: string;
  email: string;
  document: Document;
  phone: Phone;
  gender: Gender;
  role: RoleCode;
  extraPermissions?: string[];
}

export interface QuotationDetail {
  description: string;
  quantity: number;
  unitPrice: number;
  subTotal: number;
}

export interface Quotation extends DefaultFirestoreProps {
  id: string;
  contractNumber: string;
  reportedIssue: string;
  analysis: string;
  solutionAndRecommendations: string;
  client: {
    document: Document;
    firstName?: string;
    paternalSurname?: string;
    maternalSurname?: string;
    companyName?: string;
    phone: Phone;
    email: string;
    address: string;
  };
  device: {
    type: string;
    brand: string;
    model: string;
    serialNumber: string;
    color: string;
    condition: string;
    accessories: string;
    ram: string;
    processor: string;
    operationSystem: string;
  };
  quotationDetails: QuotationDetail[];
}

export type QuotationFormData = Omit<
  Quotation,
  keyof DefaultFirestoreProps | "id" | "contractNumber"
>;

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
  serviceType: string;
  estimatedPrice: number;
  userId: string;
  assignment?: string | null;
}

export interface Supplier extends DefaultFirestoreProps {
  id: string;
  fullName: string;
  email?: string;
  phone?: {
    type: "mobile" | "landline";
    prefix: "+51";
    number: string;
  };
  whatsapp?: {
    prefix: string;
    number: string;
  };
  document?: {
    type: "dni" | "ruc";
    number: string;
  };
  company: {
    ruc: string;
    legalName: string;
    address: string;
    district?: string;
  };
  specialties: string[];
  status: "active" | "inactive" | "blocked";
  searchData: string[];
}

export interface RoleFormData {
  name: string;
  roleCode: string;
  description?: string;
  permissions: string[];
}

export interface Role extends RoleFormData, DefaultFirestoreProps {
  id: string;
}

export interface CustomerSite extends DefaultFirestoreProps {
  id: string;
  name: string;
  hostname: string;
  status: "active" | "inactive" | "suspended";

  branding: {
    primaryColor: string;
    textColor: string;
    logoUrl?: string;
    isotipoUrl?: string;
  };

  notifications: {
    mainReceiver: string;
    bccEmails: string;
    phone: {
      prefix: string;
      number: string;
    };
  };
  customSmtp: boolean;
  smtpConfig?: {
    service: string;
    user: string;
    pass: string;
  };
}

export interface Entry extends DefaultFirestoreProps {
  id: string;
  category: "contact" | "suggestion" | "claim" | "complaints_book";
  hostname: string;
  status: "pending" | "attended";
  message: string;
  client: {
    fullName: string;
    firstName?: string;
    paternalSurname?: string;
    maternalSurname?: string;
    email: string;
    phone: Phone;
    document: Document;
  };
  area?: "web" | "service" | "product";
  orderId?: string;
  details?: {
    type: "queja" | "reclamo";
    isMinor: boolean;
    parentDocument?: string;
    claimedAmount: number;
    consumerRequest: string;
  };
  siteId: string;
  contactId?: string;
}
