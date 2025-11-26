import { useParams } from "react-router-dom";
import { useDocumentData } from "react-firebase-hooks/firestore";
import { firestore } from "../../../firebase";
import { PDF, Sheet, Spinner } from "../../../components";
import { QuotationDocumentSheet } from "./QuotationDocumentSheet.tsx";

export const QuotationSheets = () => {
  const { quotationId } = useParams();

  const [quotation = {} || null, quotationLoading, quotationError] =
    useDocumentData(firestore.collection("quotations").doc(quotationId));

  if (quotationLoading) return <Spinner height="80vh" />;

  return (
    <PDF>
      <Sheet>
        <QuotationDocumentSheet quotation={quotation} />
      </Sheet>
    </PDF>
  );
};
