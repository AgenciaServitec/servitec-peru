import { QuotationTable } from "./QuotationTable.tsx";
import { useCollectionData } from "react-firebase-hooks/firestore";
import { firestore } from "../../firebase";

export function QuotationsIntegrations() {
  const [quotations = [], quotationsLoading, quotationsError] =
    useCollectionData(
      firestore.collection("quotations").where("isDeleted", "==", false)
    );

  console.log(quotations);

  return (
    <div>
      <h1>Quotations</h1>
      <QuotationTable
        quotations={quotations}
        quotationsLoading={quotationsLoading}
      />
    </div>
  );
}
