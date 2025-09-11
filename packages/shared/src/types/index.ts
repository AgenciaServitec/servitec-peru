type Phone = {
  prefix: string;
  number: string;
};

interface Quotation {
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

interface Assistance {}

interface User {
  phone: Phone;
}
