import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React, { forwardRef } from 'react';
export const QuotationContent = forwardRef(({ quotation }, ref) => {
    if (!quotation)
        return null;
    const ACCENT = '#0ea5a4';
    const baseFont = {
        fontFamily: "Inter, -apple-system, 'Segoe UI', Roboto, Arial",
        color: '#0f172a',
    };
    const formatCurrency = (cents) => new Intl.NumberFormat('es-PE', { style: 'currency', currency: 'PEN' }).format(cents / 100);
    const items = Array.isArray(quotation.items) && quotation.items.length
        ? quotation.items.map((it) => ({
            description: it.description ?? '-',
            units: Number(it.units ?? 1),
            unitPrice: Number(it.unitPrice ?? 0),
        }))
        : [
            {
                description: quotation.description ?? `${quotation.analysis ?? ''} / ${quotation.solutions ?? ''}`,
                units: Number(quotation.units ?? 1),
                unitPrice: Number(quotation.unitPrices ?? 0),
            },
        ];
    const subtotalCents = items.reduce((acc, it) => acc + Math.round(it.units * it.unitPrice * 100), 0);
    const igvCents = Math.round((subtotalCents * 18) / 100);
    const totalCents = subtotalCents + igvCents;
    const clientName = `${quotation.client.firstName ?? ''} ${quotation.client.paternalSurname ?? ''} ${quotation.client.maternalSurname ?? ''}`.trim();
    const company = quotation.client.companyName ?? (clientName || '—');
    const styles = {
        container: {
            ...baseFont,
            background: '#fff',
            padding: 10,
            fontSize: 12,
            lineHeight: 1.34,
            color: '#111827',
        },
        card: {
            borderRadius: 10,
            padding: 20,
            boxShadow: '0 8px 30px rgba(2,6,23,0.06)',
            border: '1px solid rgba(15,23,42,0.04)',
            background: '#fff',
        },
        header: {
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-start',
            gap: 16,
            paddingBottom: 12,
            borderBottom: `3px solid ${ACCENT}`,
            borderBottomOpacity: 0.06,
        },
        logo: { width: 140, display: 'block' },
        brandRight: {
            textAlign: 'right',
            fontSize: 11,
            color: '#374151',
        },
        titleArea: {
            textAlign: 'center',
            paddingTop: 12,
            paddingBottom: 8,
        },
        title: { fontSize: 16, fontWeight: 700, letterSpacing: 0.2 },
        metaRow: { display: 'flex', gap: 12, marginTop: 12, marginBottom: 12 },
        metaLeft: { flex: '1 1 60%' },
        metaRight: { flex: '0 0 40%' },
        metaTable: { width: '100%', borderCollapse: 'collapse', fontSize: 11 },
        metaHead: {
            background: '#f8fafc',
            padding: 10,
            fontWeight: 700,
            color: '#0b1220',
        },
        metaCell: {
            padding: 10,
            verticalAlign: 'top',
            color: '#374151',
        },
        sectionTitle: { margin: '8px 0 6px', fontSize: 13, color: '#0b1220' },
        table: { width: '100%', borderCollapse: 'collapse', fontSize: 11 },
        th: {
            textAlign: 'left',
            background: '#fbfeff',
            padding: 10,
            fontWeight: 700,
            color: '#0b1220',
        },
        td: {
            padding: 10,
            verticalAlign: 'top',
            borderBottom: '1px solid #eef2f7',
            color: '#334155',
        },
        altRow: { background: '#fbfdfe' },
        totalsWrap: {
            display: 'flex',
            justifyContent: 'flex-end',
            marginTop: 8,
        },
        totalsBox: {
            width: 260,
            borderRadius: 8,
            padding: 10,
            background: '#f8fafc',
            fontSize: 12,
        },
        footer: {
            borderTop: '1px solid rgba(15,23,42,0.06)',
            marginTop: 14,
            paddingTop: 10,
        },
        footerLeft: { fontSize: 10, color: '#475569', lineHeight: 1.25 },
        signatureBox: { width: 240, textAlign: 'center' },
    };
    return (_jsx("div", { ref: ref, style: styles.container, children: _jsxs("div", { style: styles.card, children: [_jsxs("div", { style: styles.header, children: [_jsxs("div", { style: { display: 'flex', gap: 12, alignItems: 'center' }, children: [_jsx("img", { src: "/logo-servitec.png", alt: "logo", style: styles.logo }), _jsxs("div", { children: [_jsx("div", { style: { fontSize: 12, fontWeight: 700 }, children: "SERVITEC PER\u00DA" }), _jsx("div", { style: { fontSize: 11, color: '#6b7280' }, children: "Soporte t\u00E9cnico especializado" })] })] }), _jsxs("div", { style: styles.brandRight, children: [_jsx("div", { style: { fontWeight: 700 }, children: "SERVITEC PER\u00DA" }), _jsxs("div", { style: { marginTop: 6 }, children: ["RUC: 20604329955", _jsx("br", {}), "contacto@servitecperu.com \u00B7 972252744 / 941801827"] })] })] }), _jsxs("div", { style: styles.titleArea, children: [_jsx("div", { style: styles.title, children: "COTIZACI\u00D3N \u00B7 INFORME T\u00C9CNICO" }), _jsxs("div", { style: { marginTop: 8, fontSize: 11, color: '#6b7280' }, children: [quotation.serialNumber ? `N° Contrato: ${quotation.serialNumber}` : null, quotation.createAt &&
                                    (() => {
                                        try {
                                            const date = typeof quotation.createAt.toDate === 'function'
                                                ? quotation.createAt.toDate()
                                                : new Date(quotation.createAt);
                                            return ` · Fecha: ${date.toLocaleDateString('es-PE')}`;
                                        }
                                        catch {
                                            return '';
                                        }
                                    })()] })] }), _jsxs("div", { style: styles.metaRow, children: [_jsx("div", { style: styles.metaLeft, children: _jsx("table", { style: styles.metaTable, children: _jsxs("tbody", { children: [_jsxs("tr", { children: [_jsx("td", { style: styles.metaHead, children: "Elaborado por" }), _jsx("td", { style: styles.metaCell, children: quotation.user?.name ?? '—' })] }), _jsxs("tr", { children: [_jsx("td", { style: styles.metaHead, children: "Raz\u00F3n social / Cliente" }), _jsx("td", { style: styles.metaCell, children: company })] }), _jsxs("tr", { children: [_jsx("td", { style: styles.metaHead, children: "C\u00F3digo" }), _jsx("td", { style: styles.metaCell, children: quotation.client.code ?? '—' })] })] }) }) }), _jsx("div", { style: styles.metaRight, children: _jsx("table", { style: styles.metaTable, children: _jsxs("tbody", { children: [_jsxs("tr", { children: [_jsx("td", { style: styles.metaHead, children: "Aprobado por" }), _jsx("td", { style: styles.metaCell, children: "ROBERTO MENDOZA" })] }), _jsxs("tr", { children: [_jsx("td", { style: styles.metaHead, children: "RUC" }), _jsx("td", { style: styles.metaCell, children: quotation.client.document?.number ?? '—' })] }), _jsxs("tr", { children: [_jsx("td", { style: styles.metaHead, children: "N\u00B0 Contrato" }), _jsx("td", { style: styles.metaCell, children: quotation.serialNumber ?? '—' })] })] }) }) })] }), _jsxs("section", { style: { marginTop: 6 }, children: [_jsx("h4", { style: styles.sectionTitle, children: "Problema reportado" }), _jsx("div", { children: _jsx("span", { style: { color: '#111' }, children: quotation.device.problemDescription ?? 'Descripción no proporcionada.' }) })] }), _jsxs("section", { style: { marginTop: 12 }, children: [_jsx("h4", { style: styles.sectionTitle, children: "An\u00E1lisis y recomendaciones" }), _jsxs("table", { style: styles.table, role: "table", "aria-label": "An\u00E1lisis y recomendaciones", children: [_jsx("thead", { children: _jsxs("tr", { children: [_jsx("th", { style: styles.th, children: "An\u00E1lisis" }), _jsx("th", { style: styles.th, children: "Soluci\u00F3n y recomendaciones" })] }) }), _jsx("tbody", { children: _jsxs("tr", { children: [_jsx("td", { style: styles.td, children: quotation.analysis ?? '—' }), _jsxs("td", { style: styles.td, children: [quotation.solutions ?? '—', _jsx("div", { style: { marginTop: 6, color: '#475569' }, children: quotation.recommendations ?? '' })] })] }) })] })] }), _jsxs("section", { style: { marginTop: 12 }, children: [_jsx("h4", { style: styles.sectionTitle, children: "Detalle de costos" }), _jsxs("table", { style: styles.table, children: [_jsx("thead", { children: _jsxs("tr", { children: [_jsx("th", { style: styles.th, children: "Descripci\u00F3n" }), _jsx("th", { style: { ...styles.th, textAlign: 'center' }, children: "Unidades" }), _jsx("th", { style: { ...styles.th, textAlign: 'right' }, children: "Precio unitario" }), _jsx("th", { style: { ...styles.th, textAlign: 'right' }, children: "Subtotal" })] }) }), _jsxs("tbody", { children: [items.map((it, idx) => {
                                            const lineCents = Math.round(it.units * it.unitPrice * 100);
                                            return (_jsxs("tr", { style: idx % 2 ? styles.altRow : undefined, children: [_jsx("td", { style: styles.td, children: it.description }), _jsx("td", { style: { ...styles.td, textAlign: 'center' }, children: it.units }), _jsx("td", { style: { ...styles.td, textAlign: 'right' }, children: formatCurrency(Math.round(it.unitPrice * 100)) }), _jsx("td", { style: { ...styles.td, textAlign: 'right' }, children: formatCurrency(lineCents) })] }, idx));
                                        }), _jsxs("tr", { children: [_jsx("td", { style: { ...styles.td, color: '#475569', fontSize: 11 }, colSpan: 2, children: _jsx("em", { children: "Los plazos de trabajo son los siguientes: Se cancela el 50% del monto total al momento de inciar los trabajos y el 50% restantes al momento de la entrega del trabajo, proyecto o reparaci\u00F3n" }) }), _jsx("td", { style: { ...styles.td, textAlign: 'right' }, children: _jsx("strong", { children: "Subtotal" }) }), _jsx("td", { style: { ...styles.td, textAlign: 'right' }, children: formatCurrency(subtotalCents) })] }), _jsxs("tr", { children: [_jsx("td", { style: styles.td, colSpan: 2 }), _jsx("td", { style: { ...styles.td, textAlign: 'right' }, children: _jsx("strong", { children: "IGV (18%)" }) }), _jsx("td", { style: { ...styles.td, textAlign: 'right' }, children: formatCurrency(igvCents) })] }), _jsxs("tr", { children: [_jsx("td", { style: styles.td, colSpan: 2 }), _jsx("td", { style: {
                                                        ...styles.td,
                                                        textAlign: 'right',
                                                        fontWeight: 800,
                                                        background: '#f8fafc',
                                                    }, children: _jsx("strong", { children: "TOTAL" }) }), _jsx("td", { style: {
                                                        ...styles.td,
                                                        textAlign: 'right',
                                                        fontWeight: 900,
                                                        background: '#f8fafc',
                                                    }, children: formatCurrency(totalCents) })] })] })] }), _jsx("div", { style: styles.totalsWrap, children: _jsxs("div", { style: styles.totalsBox, children: [_jsxs("div", { style: { display: 'flex', justifyContent: 'space-between' }, children: [_jsx("div", { children: "Subtotal" }), _jsx("div", { children: formatCurrency(subtotalCents) })] }), _jsxs("div", { style: { display: 'flex', justifyContent: 'space-between', marginTop: 6 }, children: [_jsx("div", { children: "IGV (18%)" }), _jsx("div", { children: formatCurrency(igvCents) })] }), _jsx("div", { style: { height: 8 } }), _jsxs("div", { style: { display: 'flex', justifyContent: 'space-between', fontWeight: 800 }, children: [_jsx("div", { children: "TOTAL" }), _jsx("div", { children: formatCurrency(totalCents) })] })] }) })] }), _jsx("footer", { style: styles.footer, children: _jsxs("div", { style: {
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            gap: 12,
                        }, children: [_jsx("div", { style: styles.footerLeft, children: "Direcci\u00F3n: Defensores del Morro Cdra 13, Lima 09 - Chorrillos \u00B7 Tel: 972252744 / 941801827 \u00B7 contacto@servitecperu.com" }), _jsx("div", { style: styles.signatureBox, children: _jsxs("div", { children: [_jsx("div", { style: { marginTop: 6, fontSize: 11, color: '#475569' }, children: "Aprobado por" }), _jsx("div", { style: { fontWeight: 700 }, children: "ROBERTO MENDOZA" })] }) })] }) })] }) }));
});
