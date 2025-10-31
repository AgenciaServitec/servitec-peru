import { PDF, Sheet, Spinner } from "../../../components";
import { useParams } from "react-router-dom";
import { QuotationDocumentSheet } from "./QuotationDocumentSheet.tsx";
import { useDocumentData } from "react-firebase-hooks/firestore";
import { firestore } from "../../../firebase";

export const QuotationSheets = () => {
  const { quotationId } = useParams();

  const [quotation = {} || null, quotationLoading, quotationError] =
    useDocumentData(firestore.collection("quotations").doc(quotationId));

  console.log(quotation);

  if (quotationLoading) return <Spinner height="80vh" />;

  return (
    <PDF>
      <Sheet>
        <QuotationDocumentSheet quotation={quotation} />
      </Sheet>
    </PDF>
  );
};
