import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React, { useMemo, useState, useCallback } from 'react';
import { Table, Button, Space, Popconfirm, Input, Empty } from '../../components/ui';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash, faSearch, faFilePdf } from '@fortawesome/free-solid-svg-icons';
import { QuotationSheet } from './_quotationId/sheets';
export const QuotationsTable = ({ quotations = [], onEditQuotation, onConfirmDeleteQuotation, }) => {
    const [search, setSearch] = useState('');
    const [deletingId, setDeletingId] = useState(null);
    const [isSheetOpen, setIsSheetOpen] = useState(false);
    const [selectedQuotation, setSelectedQuotation] = useState(null);
    const handleSearch = (value) => setSearch(value);
    const filteredData = useMemo(() => {
        if (!search)
            return quotations;
        const q = search.trim().toLowerCase();
        return quotations.filter((item) => {
            const clientName = `${item?.client?.firstName ?? ''} ${item?.client?.paternalSurname ?? ''} ${item?.client?.maternalSurname ?? ''}`.trim();
            const company = (item?.client?.companyName ?? '').toLowerCase();
            const docNumber = (item?.client?.document?.number ?? '').toLowerCase();
            return clientName.toLowerCase().includes(q) || company.includes(q) || docNumber.includes(q);
        });
    }, [quotations, search]);
    const handleDelete = useCallback(async (id) => {
        try {
            setDeletingId(id);
            await onConfirmDeleteQuotation(id);
        }
        catch (err) {
            console.error('Error deleting quotation', err);
        }
        finally {
            setDeletingId(null);
        }
    }, [onConfirmDeleteQuotation]);
    const openSheet = (quotation) => {
        setSelectedQuotation(quotation);
        setIsSheetOpen(true);
    };
    const columns = [
        {
            title: 'Cliente / Empresa',
            key: 'client',
            render: (_, record) => {
                const name = `${record?.client?.firstName ?? ''} ${record?.client?.paternalSurname ?? ''}`.trim();
                const company = record?.client?.companyName;
                return (_jsxs("div", { children: [_jsx("div", { className: "font-medium", children: company ? company : name || '—' }), !company && record?.client?.maternalSurname ? (_jsx("div", { className: "text-xs text-slate-500", children: record.client.maternalSurname })) : null] }));
            },
        },
        {
            title: 'Documento',
            key: 'document',
            width: 180,
            render: (_, record) => {
                const type = record?.client?.document?.type ?? '—';
                const number = record?.client?.document?.number ?? '—';
                return (_jsxs("div", { children: [_jsx("div", { className: "text-sm", children: type }), _jsx("div", { className: "text-xs text-slate-500", children: number })] }));
            },
        },
        {
            title: 'Teléfono',
            dataIndex: ['client', 'phone'],
            key: 'phone',
            width: 140,
            render: (val) => val ?? '—',
        },
        {
            title: 'Dispositivo',
            key: 'device',
            render: (_, record) => {
                const d = record?.device;
                if (!d)
                    return '—';
                return `${d.type ?? ''} ${d.brand ?? ''} ${d.model ?? ''}`.trim() || '—';
            },
        },
        {
            title: 'N° Serie',
            dataIndex: 'serialNumber',
            key: 'serialNumber',
            width: 140,
            render: (val) => val ?? '—',
        },
        {
            title: 'Fecha',
            dataIndex: 'createAt',
            key: 'createAt',
            width: 160,
            render: (val) => {
                if (!val)
                    return '—';
                try {
                    const date = val?.toDate ? val.toDate() : new Date(val);
                    return date.toLocaleString();
                }
                catch {
                    return String(val);
                }
            },
        },
        {
            title: 'Acciones',
            key: 'actions',
            width: 180,
            fixed: 'right',
            render: (_, record) => (_jsxs(Space, { children: [_jsx(Button, { type: "default", size: "small", onClick: () => openSheet(record), "aria-label": `Ver ${record.id}`, icon: _jsx(FontAwesomeIcon, { icon: faFilePdf }) }), _jsx(Button, { type: "default", size: "small", onClick: () => onEditQuotation(record.id), "aria-label": `Editar ${record.id}`, icon: _jsx(FontAwesomeIcon, { icon: faEdit }) }), _jsx(Popconfirm, { title: "\u00BFEliminar cotizaci\u00F3n?", onConfirm: () => handleDelete(record.id), okText: "Si", cancelText: "No", children: _jsx(Button, { danger: true, type: "default", size: "small", loading: deletingId === record.id, disabled: deletingId !== null && deletingId !== record.id, "aria-label": `Eliminar ${record.id}`, icon: _jsx(FontAwesomeIcon, { icon: faTrash }) }) })] })),
        },
    ];
    return (_jsxs("div", { children: [_jsx("div", { className: "flex items-center justify-between mb-4", children: _jsx("div", { style: { minWidth: 240, marginBottom: 24 }, children: _jsx(Input, { placeholder: "Buscar por cliente, empresa o documento...", allowClear: true, onChange: (e) => handleSearch(e.target.value), value: search, prefix: _jsx(FontAwesomeIcon, { icon: faSearch }) }) }) }), filteredData.length === 0 ? (_jsx("div", { className: "p-8", children: _jsx(Empty, { description: "No hay cotizaciones" }) })) : (_jsx(Table, { rowKey: (record) => record.id, dataSource: filteredData, columns: columns, pagination: { pageSize: 10, showSizeChanger: true }, scroll: { x: 1100 } })), _jsx(QuotationSheet, { open: isSheetOpen, onClose: () => setIsSheetOpen(false), quotation: selectedQuotation })] }));
};
