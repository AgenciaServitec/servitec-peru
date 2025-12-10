import { useParams } from "react-router-dom";
import { useDocumentData } from "react-firebase-hooks/firestore";
import { firestore } from "../../../firebase";
import { PDF, Sheet, Spinner, useNotification } from "../../../components";
import { QuotationDocumentSheet } from "./QuotationDocumentSheet.tsx";

export const QuotationSheets = () => {
  const { quotationId } = useParams();
  const { notification } = useNotification();

  const [quotation = {} || null, quotationLoading, quotationError] =
    useDocumentData(firestore.collection("quotations").doc(quotationId));

  if (quotationError) {
    console.error(quotationError);
    return notification({
      type: "error",
      description: "Cotizaciones no cargadas",
    });
  }

  if (quotationLoading) return <Spinner height="80vh" />;

  return (
    <PDF>
      <Sheet>
        <QuotationDocumentSheet quotation={quotation} />
      </Sheet>
    </PDF>
  );
};
