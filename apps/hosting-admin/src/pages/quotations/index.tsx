import { useNavigate } from 'react-router-dom';
import { useDefaultFirestoreProps } from '../../hooks';
import { useCollectionData } from 'react-firebase-hooks/firestore';
import { quotationsRef, updateQuotation } from '../../firebase/collections';
import type { Quotation } from '../../globalTypes';
import { useEffect } from 'react';
import { notification } from '../../components/ui';
import { QuotationsTable } from './Quotations.Table.tsx';
import { AddButton } from '../../components/ui/AddButton.tsx';
import { Spinner } from '../../components/ui/Spinner.tsx';

export function Quotations() {
  const navigate = useNavigate();

  const { assignDeleteProps } = useDefaultFirestoreProps();

  const [quotations = [], quotationsLoading, quotationsError] = useCollectionData<Quotation>(
    quotationsRef.where('isDeleted', '==', false)
  );

  useEffect(() => {
    if (quotationsError) {
      notification({ type: 'error', description: 'Error al obtener cotizaciones' });
    }
  }, [quotationsError]);

  const onNavigateTo = (quotationId: string): void => navigate(quotationId);

  const onAddQuotation = (): void => navigate('new');

  const onEditQuotation = (quotationId: string): void => onNavigateTo(quotationId);

  const onConfirmDeleteQuotation = async (quotationId: string): Promise<void> => {
    try {
      await updateQuotation(quotationId, assignDeleteProps({ isDeleted: true }));
      notification({ type: 'success', description: 'Cotización eliminada' });
    } catch (err) {
      console.error('Error al eliminar cotización:', err);
      notification({ type: 'error', description: 'No se pudo eliminar la cotización' });
    }
  };

  if (quotationsLoading) return <Spinner height="80vh" />;

  return (
    <>
      <AddButton title="Cotización" onClick={onAddQuotation} />
      <QuotationsTable
        quotations={quotations}
        onEditQuotation={onEditQuotation}
        onAddQuotation={onAddQuotation}
        onConfirmDeleteQuotation={onConfirmDeleteQuotation}
      />
    </>
  );
}
