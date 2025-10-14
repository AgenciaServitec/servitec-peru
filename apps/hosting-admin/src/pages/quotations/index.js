import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
import { useNavigate } from 'react-router-dom';
import { useDefaultFirestoreProps } from '../../hooks';
import { useCollectionData } from 'react-firebase-hooks/firestore';
import { quotationsRef, updateQuotation } from '../../firebase/collections';
import { useEffect } from 'react';
import { notification } from '../../components/ui';
import { QuotationsTable } from './Quotations.Table.tsx';
import { AddButton } from '../../components/ui/AddButton.tsx';
import { Spinner } from '../../components/ui/Spinner.tsx';
export function Quotations() {
    const navigate = useNavigate();
    const { assignDeleteProps } = useDefaultFirestoreProps();
    const [quotations = [], quotationsLoading, quotationsError] = useCollectionData(quotationsRef.where('isDeleted', '==', false));
    useEffect(() => {
        if (quotationsError) {
            notification({ type: 'error', description: 'Error al obtener cotizaciones' });
        }
    }, [quotationsError]);
    const onNavigateTo = (quotationId) => navigate(quotationId);
    const onAddQuotation = () => navigate('new');
    const onEditQuotation = (quotationId) => onNavigateTo(quotationId);
    const onConfirmDeleteQuotation = async (quotationId) => {
        try {
            await updateQuotation(quotationId, assignDeleteProps({ isDeleted: true }));
            notification({ type: 'success', description: 'Cotización eliminada' });
        }
        catch (err) {
            console.error('Error al eliminar cotización:', err);
            notification({ type: 'error', description: 'No se pudo eliminar la cotización' });
        }
    };
    if (quotationsLoading)
        return _jsx(Spinner, { height: "80vh" });
    return (_jsxs(_Fragment, { children: [_jsx(AddButton, { title: "Cotizaci\u00F3n", onClick: onAddQuotation }), _jsx(QuotationsTable, { quotations: quotations, onEditQuotation: onEditQuotation, onAddQuotation: onAddQuotation, onConfirmDeleteQuotation: onConfirmDeleteQuotation })] }));
}
