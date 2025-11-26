import OldQuotations from "../../data-list/oldQuotations.json";
import { Timestamp } from "../../firebase";
import dayjs from "dayjs";
import { now } from "../../firebase/utils.ts";

export function Home() {
  const mapOldQuotations = OldQuotations.map((quotation) => ({
    createAt: Timestamp.fromDate(new Date(quotation.fecha)),
    updateAt: now(),
    contractNumber: dayjs(quotation.fecha).format("YYYYMMDDHHmmss"),
    isDeleted: false,
    client: {
      document: {
        type: "ruc",
        number: quotation.ruc,
      },
      companyName: quotation.razon_social,
      phone: {
        prefix: "+51",
        number: quotation.celular,
      },
      email: "",
      address: "",
    },
    device: {
      type: quotation.dispositivo,
      brand: quotation.marca,
      model: quotation.modelo,
      serialNumber: quotation.nserie,
      color: quotation.color,
      condition: "",
      accessories: "",
      ram: quotation.ram,
      processor: quotation.procesador,
      operationSystem: "",
    },
    reportedIssue: quotation.problema,
    analytics: quotation.analisis,
    solutionAndRecommendations: quotation.solucion,
  }));

  console.log(mapOldQuotations);

  return (
    <div>
      <h1>Inicio</h1>
    </div>
  );
}
