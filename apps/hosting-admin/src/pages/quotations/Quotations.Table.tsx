import React, { useMemo, useState, useCallback } from 'react';
import type { Quotation } from '../../globalTypes';
import { Table, Button, Space, Popconfirm, Input, Empty } from '../../components/ui';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash, faSearch, faFilePdf } from '@fortawesome/free-solid-svg-icons';
import { QuotationSheet } from './_quotationId/sheets';

type Props = {
  quotations: Quotation[];
  onEditQuotation: (id: string) => void;
  onConfirmDeleteQuotation: (id: string) => Promise<void> | void;
};

export const QuotationsTable: React.FC<Props> = ({
  quotations = [],
  onEditQuotation,
  onConfirmDeleteQuotation,
}) => {
  const [search, setSearch] = useState('');
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const [selectedQuotation, setSelectedQuotation] = useState<Quotation | null>(null);

  const handleSearch = (value: string) => setSearch(value);

  const filteredData = useMemo(() => {
    if (!search) return quotations;
    const q = search.trim().toLowerCase();
    return quotations.filter((item) => {
      const clientName =
        `${item?.client?.firstName ?? ''} ${item?.client?.paternalSurname ?? ''} ${item?.client?.maternalSurname ?? ''}`.trim();
      const company = (item?.client?.companyName ?? '').toLowerCase();
      const docNumber = (item?.client?.document?.number ?? '').toLowerCase();
      return clientName.toLowerCase().includes(q) || company.includes(q) || docNumber.includes(q);
    });
  }, [quotations, search]);

  const handleDelete = useCallback(
    async (id: string) => {
      try {
        setDeletingId(id);
        await onConfirmDeleteQuotation(id);
      } catch (err) {
        console.error('Error deleting quotation', err);
      } finally {
        setDeletingId(null);
      }
    },
    [onConfirmDeleteQuotation]
  );

  const openSheet = (quotation: Quotation) => {
    setSelectedQuotation(quotation);
    setIsSheetOpen(true);
  };

  const columns = [
    {
      title: 'Fecha de Creacion',
      dataIndex: 'createAt',
      key: 'createAt',
      width: 160,
      render: (val: any) => {
        if (!val) return '—';
        try {
          const date = val?.toDate ? val.toDate() : new Date(val);
          return date.toLocaleString();
        } catch {
          return String(val);
        }
      },
    },
    {
      title: 'Cliente / Empresa',
      key: 'client',
      render: (_: any, record: Quotation) => {
        const name =
          `${record?.client?.firstName ?? ''} ${record?.client?.paternalSurname ?? ''}`.trim();
        const company = record?.client?.companyName;
        return (
          <div>
            <div className="font-medium">{company ? company : name || '—'}</div>
            {!company && record?.client?.maternalSurname ? (
              <div className="text-xs text-slate-500">{record.client.maternalSurname}</div>
            ) : null}
          </div>
        );
      },
    },
    {
      title: 'Documento',
      key: 'document',
      width: 180,
      render: (_: any, record: Quotation) => {
        const type = record?.client?.document?.type ?? '—';
        const number = record?.client?.document?.number ?? '—';
        return (
          <div>
            <div className="text-sm">{type}</div>
            <div className="text-xs text-slate-500">{number}</div>
          </div>
        );
      },
    },
    {
      title: 'Teléfono',
      dataIndex: ['client', 'phone'],
      key: 'phone',
      width: 140,
      render: (val: string) => val ?? '—',
    },
    {
      title: 'Dispositivo',
      key: 'device',
      render: (_: any, record: Quotation) => {
        const d = record?.device;
        if (!d) return '—';
        return `${d.type ?? ''} ${d.brand ?? ''} ${d.model ?? ''}`.trim() || '—';
      },
    },
    {
      title: 'Acciones',
      key: 'actions',
      width: 180,
      fixed: 'right' as const,
      render: (_: any, record: Quotation) => (
        <Space>
          <Button
            type="default"
            size="small"
            onClick={() => openSheet(record)}
            aria-label={`Ver ${record.id}`}
            icon={<FontAwesomeIcon icon={faFilePdf} />}
          />

          <Button
            type="default"
            size="small"
            onClick={() => onEditQuotation(record.id)}
            aria-label={`Editar ${record.id}`}
            icon={<FontAwesomeIcon icon={faEdit} />}
          />
          <Popconfirm
            title="¿Eliminar cotización?"
            onConfirm={() => handleDelete(record.id)}
            okText="Si"
            cancelText="No"
          >
            <Button
              danger
              type="default"
              size="small"
              loading={deletingId === record.id}
              disabled={deletingId !== null && deletingId !== record.id}
              aria-label={`Eliminar ${record.id}`}
              icon={<FontAwesomeIcon icon={faTrash} />}
            />
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <div style={{ minWidth: 240, marginBottom: 24 }}>
          <Input
            placeholder="Buscar por cliente, empresa o documento..."
            allowClear
            onChange={(e) => handleSearch(e.target.value)}
            value={search}
            prefix={<FontAwesomeIcon icon={faSearch} />}
          />
        </div>
      </div>

      {filteredData.length === 0 ? (
        <div className="p-8">
          <Empty description="No hay cotizaciones" />
        </div>
      ) : (
        <Table
          rowKey={(record: Quotation) => record.id}
          dataSource={filteredData}
          columns={columns}
          pagination={{ pageSize: 10, showSizeChanger: true }}
          scroll={{ x: 1100 }}
        />
      )}

      <QuotationSheet
        open={isSheetOpen}
        onClose={() => setIsSheetOpen(false)}
        quotation={selectedQuotation}
      />
    </div>
  );
};
