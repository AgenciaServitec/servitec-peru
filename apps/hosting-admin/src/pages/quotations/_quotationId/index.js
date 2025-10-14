import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useDefaultFirestoreProps, useFormUtils } from '../../../hooks';
import * as yup from 'yup';
import { useNavigate, useParams } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import { addQuotation, fetchQuotation, getQuotationId, updateQuotation, } from '../../../firebase/collections';
import { yupResolver } from '@hookform/resolvers/yup';
import { Controller, useForm } from 'react-hook-form';
import { Row, Col, Form, Input, TextArea, Button, notification } from '../../../components/ui';
import { Select } from '../../../components/ui/Select.tsx';
const { assignCreateProps, assignUpdateProps } = useDefaultFirestoreProps();
const quotationSchema = yup.object({
    client: yup.object({
        firstName: yup.string().notRequired(),
        paternalSurname: yup.string().notRequired(),
        maternalSurname: yup.string().notRequired(),
        companyName: yup.string().notRequired(),
        document: yup.object({
            type: yup.string().required(),
            number: yup.string().required(),
        }),
        phone: yup.string().required(),
    }),
    device: yup.object({
        problemDescription: yup.string().required(),
        type: yup.string().required(),
        brand: yup.string().required(),
        model: yup.string().required(),
        color: yup.string().required(),
    }),
    analysis: yup.string().required(),
    solutions: yup.string().required(),
    recommendations: yup.string().required(),
    serialNumber: yup.string().required(),
    description: yup.string().required(),
    units: yup.number().required(),
    unitPrices: yup.number().required(),
});
const saveQuotation = async (data, isNew) => {
    if (isNew) {
        await addQuotation(assignCreateProps(data));
        notification({ type: 'success', description: 'Cotización creada con éxito' });
    }
    else {
        await updateQuotation(data.id, assignUpdateProps(data));
        notification({ type: 'success', description: 'Cotización actualizada con éxito' });
    }
};
export function QuotationIntegration() {
    const navigate = useNavigate();
    const { quotationId } = useParams();
    const isNew = quotationId === 'new';
    const [initialData, setInitialData] = useState(null);
    useEffect(() => {
        (async () => {
            if (isNew) {
                setInitialData({
                    id: getQuotationId(),
                    client: {
                        firstName: '',
                        paternalSurname: '',
                        maternalSurname: '',
                        companyName: '',
                        document: { type: '', number: '' },
                        phone: '',
                    },
                    device: { problemDescription: '', type: '', brand: '', model: '', color: '' },
                    analysis: '',
                    solutions: '',
                    recommendations: '',
                    serialNumber: '',
                    description: '',
                    units: 0,
                    unitPrices: 0,
                });
            }
            else if (quotationId) {
                const fetched = await fetchQuotation(quotationId);
                if (!fetched)
                    return navigate(-1);
                setInitialData(fetched);
            }
        })();
    }, [quotationId, isNew, navigate]);
    if (!initialData) {
        return _jsx("div", { className: "text-center text-muted-foreground py-20", children: "Cargando..." });
    }
    return (_jsx("div", { className: "w-full py-10 px-4 md:px-10 lg:px-20", children: _jsx(QuotationForm, { isNew: isNew, defaultValues: initialData, onCancel: () => navigate(-1) }) }));
}
const QuotationForm = ({ isNew, defaultValues, onCancel }) => {
    const navigate = useNavigate();
    const { formState: { errors }, handleSubmit, control, reset, } = useForm({
        resolver: yupResolver(quotationSchema),
        defaultValues,
    });
    useEffect(() => {
        reset(defaultValues);
    }, [defaultValues, reset]);
    const { required, error } = useFormUtils({ errors, schema: quotationSchema });
    const [isSaving, setIsSaving] = useState(false);
    const onSubmit = async (data) => {
        setIsSaving(true);
        try {
            await saveQuotation(data, isNew);
            navigate(-1);
        }
        catch (err) {
            console.error('Error al guardar cotización:', err);
            notification({ type: 'error', description: 'Ocurrió un error al guardar la cotización.' });
        }
        finally {
            setIsSaving(false);
        }
    };
    return (_jsx(_Fragment, { children: _jsx(Form, { onSubmit: handleSubmit(onSubmit), children: _jsxs(Row, { gutter: [16, 16], children: [_jsx(Col, { span: 24, children: _jsx("h2", { children: isNew ? 'Nueva Cotización' : 'Editar Cotización' }) }), _jsx(Col, { span: 24, children: _jsx("h3", { className: "font-semibold mb-2", children: "Datos del Cliente" }) }), _jsx(Col, { span: 8, children: _jsx(Controller, { name: "client.firstName", control: control, render: ({ field }) => (_jsx(Input, { ...field, label: "Nombre", error: error(field.name), required: required(field.name) })) }) }), _jsx(Col, { span: 8, children: _jsx(Controller, { name: "client.paternalSurname", control: control, render: ({ field }) => (_jsx(Input, { ...field, label: "Apellido Paterno", error: error(field.name), required: required(field.name) })) }) }), _jsx(Col, { span: 8, children: _jsx(Controller, { name: "client.maternalSurname", control: control, render: ({ field }) => (_jsx(Input, { ...field, label: "Apellido Materno", error: error(field.name), required: required(field.name) })) }) }), _jsx(Col, { span: 12, children: _jsx(Controller, { name: "client.companyName", control: control, render: ({ field }) => (_jsx(Input, { ...field, label: "Raz\u00F3n Social", error: error(field.name), required: required(field.name) })) }) }), _jsx(Col, { span: 6, children: _jsx(Controller, { name: "client.document.type", control: control, render: ({ field }) => (_jsx(Select, { ...field, label: "Tipo de Documento", options: [
                                    { label: 'DNI', value: 'dni' },
                                    { label: 'Carnet de Extranjería', value: 'foreigner_card' },
                                    { label: 'RUC', value: 'ruc' },
                                ], error: error(field.name), required: required(field.name) })) }) }), _jsx(Col, { span: 6, children: _jsx(Controller, { name: "client.document.number", control: control, render: ({ field }) => (_jsx(Input, { ...field, label: "N\u00FAmero Documento", error: error(field.name), required: required(field.name) })) }) }), _jsx(Col, { span: 12, children: _jsx(Controller, { name: "client.phone", control: control, render: ({ field }) => (_jsx(Input, { ...field, label: "Tel\u00E9fono", error: error(field.name), required: required(field.name) })) }) }), _jsx(Col, { span: 24, children: _jsx("h3", { className: "font-semibold mb-2", children: "Datos del Dispositivo" }) }), _jsx(Col, { span: 24, children: _jsx(Controller, { name: "device.problemDescription", control: control, render: ({ field }) => (_jsx(Input, { ...field, label: "Problema Presentado", error: error(field.name), required: required(field.name) })) }) }), _jsx(Col, { span: 6, children: _jsx(Controller, { name: "device.type", control: control, render: ({ field }) => (_jsx(Input, { ...field, label: "Tipo", error: error(field.name), required: required(field.name) })) }) }), _jsx(Col, { span: 6, children: _jsx(Controller, { name: "device.brand", control: control, render: ({ field }) => (_jsx(Input, { ...field, label: "Marca", error: error(field.name), required: required(field.name) })) }) }), _jsx(Col, { span: 6, children: _jsx(Controller, { name: "device.model", control: control, render: ({ field }) => (_jsx(Input, { ...field, label: "Modelo", error: error(field.name), required: required(field.name) })) }) }), _jsx(Col, { span: 6, children: _jsx(Controller, { name: "device.color", control: control, render: ({ field }) => (_jsx(Input, { ...field, label: "Color", error: error(field.name), required: required(field.name) })) }) }), _jsx(Col, { span: 24, children: _jsx(Controller, { name: "analysis", control: control, render: ({ field }) => _jsx(TextArea, { ...field, placeholder: "An\u00E1lisis", rows: 3 }) }) }), _jsx(Col, { span: 24, children: _jsx(Controller, { name: "solutions", control: control, render: ({ field }) => _jsx(TextArea, { ...field, placeholder: "Soluciones", rows: 3 }) }) }), _jsx(Col, { span: 24, children: _jsx(Controller, { name: "recommendations", control: control, render: ({ field }) => _jsx(TextArea, { ...field, placeholder: "Recomendaciones", rows: 3 }) }) }), _jsx(Col, { span: 12, children: _jsx(Controller, { name: "serialNumber", control: control, render: ({ field }) => (_jsx(Input, { ...field, label: "N\u00FAmero de Serie", error: error(field.name), required: required(field.name) })) }) }), _jsx(Col, { span: 24, children: _jsx("h3", { className: "font-semibold mb-2", children: "Cotizacion" }) }), _jsx(Col, { span: 24, children: _jsx(Controller, { name: "description", control: control, render: ({ field }) => _jsx(TextArea, { ...field, placeholder: "Descripcion", rows: 3 }) }) }), _jsx(Col, { span: 12, children: _jsx(Controller, { name: "units", control: control, render: ({ field }) => (_jsx(Input, { ...field, type: "number", label: "Unidades", error: error(field.name), required: required(field.name) })) }) }), _jsx(Col, { span: 12, children: _jsx(Controller, { name: "unitPrices", control: control, render: ({ field }) => (_jsx(Input, { ...field, type: "number", label: "Precio Unitarios", error: error(field.name), required: required(field.name) })) }) }), _jsx(Col, { span: 24, children: _jsxs(Row, { justify: "end", gutter: [16, 16], style: { marginTop: 24, borderTop: '1px solid #f0f0f0', paddingTop: 24 }, children: [_jsx(Col, { xs: 24, sm: 6, md: 4, children: _jsx(Button, { type: "default", size: "large", block: true, onClick: () => !isSaving && onCancel(), disabled: isSaving, children: "Cancelar" }) }), _jsx(Col, { xs: 24, sm: 6, md: 4, children: _jsx(Button, { type: "primary", size: "large", block: true, htmlType: "submit", loading: isSaving, disabled: isSaving, children: isNew ? 'Crear Cotización' : 'Guardar Cambios' }) })] }) })] }) }) }));
};
