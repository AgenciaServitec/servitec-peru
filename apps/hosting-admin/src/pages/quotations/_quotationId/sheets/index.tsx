import React, { useRef } from 'react';
import { Drawer, Button, Space } from '../../../../components/ui';
import type { Quotation } from '../../../../globalTypes';
import html2pdf from 'html2pdf.js';
import { QuotationContent } from './QuotationContent';

type Props = {
  open: boolean;
  onClose: () => void;
  quotation: Quotation | null;
};

export const QuotationSheet: React.FC<Props> = ({ open, onClose, quotation }) => {
  const contentRef = useRef<HTMLDivElement>(null);

  if (!quotation) return null;

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

  return (
    <Drawer
      placement="right"
      width={850}
      onClose={onClose}
      open={open}
      styles={{
        body: { background: '#fff' },
        header: { background: '#fff' },
      }}
      extra={
        <Space>
          <Button type="primary" onClick={handleDownloadPDF}>
            Descargar PDF
          </Button>
        </Space>
      }
    >
      <div ref={contentRef}>
        <QuotationContent quotation={quotation} />
      </div>
    </Drawer>
  );
};
