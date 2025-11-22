import { useParams } from "react-router-dom";
import { PDFViewer } from "@react-pdf/renderer";
import { QuotationDocument } from "./QuotationDocument.tsx";
import { useDocumentData } from "react-firebase-hooks/firestore";
import { firestore } from "../../../firebase";
import { Spinner } from "../../../components";

export const QuotationSheets = () => {
  const { quotationId } = useParams();

  const [quotation = {} || null, quotationLoading, quotationError] =
    useDocumentData(firestore.collection("quotations").doc(quotationId));

  if (quotationLoading) return <Spinner height="80vh" />;

  return (
    <PDFViewer style={{ width: "100vw", height: "100vh", border: "none" }}>
      <QuotationDocument quotation={quotation} />
    </PDFViewer>
  );
};
