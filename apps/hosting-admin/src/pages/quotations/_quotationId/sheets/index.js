import { jsx as _jsx } from "react/jsx-runtime";
import React, { useRef } from 'react';
import { Drawer, Button, Space } from '../../../../components/ui';
import html2pdf from 'html2pdf.js';
import { QuotationContent } from './QuotationContent';
export const QuotationSheet = ({ open, onClose, quotation }) => {
    const contentRef = useRef(null);
    if (!quotation)
        return null;
    const handleDownloadPDF = () => {
        if (contentRef.current) {
            const opt = {
                margin: 0.5,
                filename: `cotizacion-${quotation.id}.pdf`,
                image: { type: 'jpeg', quality: 0.98 },
                html2canvas: { scale: 2 },
                jsPDF: { unit: 'in', format: 'a4', orientation: 'portrait' },
            };
            html2pdf().set(opt).from(contentRef.current).save();
        }
    };
    return (_jsx(Drawer, { placement: "right", width: 850, onClose: onClose, open: open, styles: {
            body: { background: '#fff' },
            header: { background: '#fff' },
        }, extra: _jsx(Space, { children: _jsx(Button, { type: "primary", onClick: handleDownloadPDF, children: "Descargar PDF" }) }), children: _jsx("div", { ref: contentRef, children: _jsx(QuotationContent, { quotation: quotation }) }) }));
};
