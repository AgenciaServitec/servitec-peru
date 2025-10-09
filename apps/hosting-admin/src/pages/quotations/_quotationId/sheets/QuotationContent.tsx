import React, { forwardRef } from 'react';
import type { Quotation } from '../../../../globalTypes';
import { QRCode } from '../../../../components/ui';

type Props = {
  quotation: Quotation;
};

export const QuotationContent = forwardRef<HTMLDivElement, Props>(({ quotation }, ref) => {
  if (!quotation) return null;

  const ACCENT = '#0ea5a4';
  const GRID_BORDER = '1px solid #bfc9cc';

  const baseFont = {
    fontFamily: 'Segoe UI, Inter, Roboto, Arial, sans-serif',
    color: '#0f172a',
  } as const;

  const formatCurrency = (cents: number) =>
    new Intl.NumberFormat('es-PE', {
      style: 'currency',
      currency: 'PEN',
    }).format(cents / 100);

  const getContractInfo = (createAt: any) => {
    if (!createAt) return { contractNumber: '—', formattedDate: '—' };
    try {
      const date = typeof createAt.toDate === 'function' ? createAt.toDate() : new Date(createAt);
      const pad = (n: number) => n.toString().padStart(2, '0');
      const contractNumber = `${date.getFullYear()}${pad(
        date.getMonth() + 1
      )}${pad(date.getDate())}${pad(date.getHours())}${pad(
        date.getMinutes()
      )}${pad(date.getSeconds())}`;
      const formattedDate = date.toLocaleDateString('es-PE');
      return { contractNumber, formattedDate };
    } catch {
      return { contractNumber: '—', formattedDate: '—' };
    }
  };

  const { contractNumber, formattedDate } = getContractInfo(quotation.createAt);

  const items =
    Array.isArray(quotation.items) && quotation.items.length > 0
      ? quotation.items.map((it) => ({
          description: it.description,
          units: Number(it.units),
          unitPrice: Number(it.unitPrice),
        }))
      : [
          {
            description: 'Sin ítems registrados',
            units: 0,
            unitPrice: 0,
          },
        ];
  const subtotalCents = items.reduce(
    (acc, it) => acc + Math.round(it.units * it.unitPrice * 100),
    0
  );
  const igvCents = Math.round((subtotalCents * 18) / 100);
  const totalCents = subtotalCents + igvCents;

  const clientName = `${quotation.client.firstName ?? ''} ${
    quotation.client.paternalSurname ?? ''
  } ${quotation.client.maternalSurname ?? ''}`.trim();
  const company = quotation.client.companyName ?? (clientName || '—');

  const styles = {
    container: {
      ...baseFont,
      background: '#ffffff',
      padding: '4px 6px',
      fontSize: 11.5,
      color: '#111827',
      lineHeight: 1.35,
      width: '100%',
      boxSizing: 'border-box' as const,
    } as React.CSSProperties,

    card: {
      padding: '6px 2px',
      width: '100%',
    } as React.CSSProperties,

    header: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingBottom: 6,
      gap: 8,
      borderBottom: `2px solid ${ACCENT}`,
    } as React.CSSProperties,

    logo: { width: 100, display: 'block' } as React.CSSProperties,

    brandRight: {
      textAlign: 'right' as const,
      fontSize: 11,
      color: '#374151',
      minWidth: 180,
    } as React.CSSProperties,

    titleArea: {
      textAlign: 'center' as const,
      margin: '8px 0 6px',
    } as React.CSSProperties,

    title: {
      fontSize: 14,
      fontWeight: 700,
      color: '#1e3a5f', // azul grisáceo oscuro
      textTransform: 'uppercase',
      letterSpacing: '0.6px',
    } as React.CSSProperties,

    metaTable: {
      width: '100%',
      borderCollapse: 'collapse',
      marginTop: 6,
      tableLayout: 'fixed' as const,
      fontSize: 11,
    } as React.CSSProperties,

    metaHead: {
      background: '#d1d5db',
      padding: '8px 6px',
      fontWeight: 700,
      color: '#111827',
      border: GRID_BORDER,
      whiteSpace: 'nowrap' as const,
      width: '18%',
    } as React.CSSProperties,

    metaCell: {
      padding: '8px 6px',
      color: '#1f2937',
      border: GRID_BORDER,
      background: '#f8fafc',
      verticalAlign: 'top' as const,
      overflow: 'hidden' as const,
      textOverflow: 'ellipsis' as const,
    } as React.CSSProperties,

    sectionTitle: {
      margin: '12px 0 4px',
      fontSize: 12.5,
      fontWeight: 700,
      color: '#1e293b',
      background: '#e5e7eb',
      padding: '6px 8px',
      border: GRID_BORDER,
    } as React.CSSProperties,

    table: {
      width: '100%',
      borderCollapse: 'collapse',
      fontSize: 11.2,
      marginTop: 6,
    } as React.CSSProperties,

    th: {
      background: '#d1d5db',
      padding: '8px 6px',
      fontWeight: 700,
      color: '#111827',
      border: GRID_BORDER,
      textAlign: 'left' as const,
      verticalAlign: 'middle' as const,
    } as React.CSSProperties,

    td: {
      padding: '8px 6px',
      border: GRID_BORDER,
      color: '#1f2937',
      verticalAlign: 'top' as const,
      background: '#ffffff',
    } as React.CSSProperties,

    altRow: { background: '#f3f4f6' } as React.CSSProperties,

    totalsBox: {
      width: 300,
      border: GRID_BORDER,
      borderRadius: 3,
      padding: 8,
      background: '#f1f5f9',
      fontSize: 12,
      marginTop: 8,
      boxShadow: 'inset 0 0 0 1px rgba(0,0,0,0.02)',
    } as React.CSSProperties,

    footer: {
      marginTop: 10,
      paddingTop: 8,
      fontSize: 10.7,
      color: '#374151',
      borderTop: `1px dashed rgba(33,48,58,0.08)`,
    } as React.CSSProperties,
  };

  return (
    <div ref={ref} style={styles.container}>
      <div style={styles.card}>
        <div style={styles.header}>
          <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
            <img src="/logo-servitec.png" alt="logo" style={styles.logo} />
            <div>
              <div style={{ fontSize: 12, fontWeight: 700 }}>SERVITEC PERÚ</div>
              <div style={{ fontSize: 11, color: '#6b7280' }}>Soporte técnico especializado</div>
            </div>
          </div>
          <div style={styles.brandRight}>
            <div style={{ fontWeight: 700 }}>SERVITEC PERÚ</div>
            <div style={{ marginTop: 4 }}>
              RUC: 20604329955 <br />
              contacto@servitecperu.com · 972252744 / 941801827
            </div>
          </div>
        </div>

        <div style={styles.titleArea}>
          <div style={styles.title}>Informe Técnico - Cotización</div>
          <div style={{ marginTop: 3, fontSize: 11, color: '#64748b' }}>
            N° Contrato: {contractNumber} · Fecha: {formattedDate}
          </div>
        </div>

        <table style={styles.metaTable}>
          <colgroup>
            <col style={{ width: '18%' }} />
            <col style={{ width: '32%' }} />
            <col style={{ width: '18%' }} />
            <col style={{ width: '32%' }} />
          </colgroup>
          <tbody>
            <tr>
              <td style={styles.metaHead}>Elaborado por</td>
              <td style={styles.metaCell}>{quotation.user?.name ?? '—'}</td>
              <td style={styles.metaHead}>Aprobado por</td>
              <td style={styles.metaCell}>ROBERTO MENDOZA</td>
            </tr>
            <tr>
              <td style={styles.metaHead}>Razón social / Cliente</td>
              <td style={styles.metaCell}>{company}</td>
              <td style={styles.metaHead}>RUC</td>
              <td style={styles.metaCell}>{quotation.client.document?.number ?? '—'}</td>
            </tr>
            <tr>
              <td style={styles.metaHead}>N° Contrato</td>
              <td style={styles.metaCell}>{contractNumber}</td>
              <td style={styles.metaHead}>Fecha</td>
              <td style={styles.metaCell}>{formattedDate}</td>
            </tr>
          </tbody>
        </table>

        <div style={styles.sectionTitle}>Problema que presenta</div>
        <div style={{ padding: '8px 6px', border: GRID_BORDER, background: '#fbfffe' }}>
          {quotation.device.problemDescription ?? 'Descripción no proporcionada.'}
        </div>

        <div style={styles.sectionTitle}>Análisis y recomendaciones</div>
        <table style={styles.table}>
          <thead>
            <tr>
              <th style={styles.th}>Análisis</th>
              <th style={styles.th}>Solución y recomendaciones</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td style={styles.td}>{quotation.analysis ?? '—'}</td>
              <td style={styles.td}>{quotation.solutionsRecommendations ?? '—'}</td>
            </tr>
          </tbody>
        </table>

        <div style={styles.sectionTitle}>Costos / Presupuestos</div>
        <table style={styles.table}>
          <thead>
            <tr>
              <th style={styles.th}>Descripción</th>
              <th style={{ ...styles.th, textAlign: 'center' }}>Unidades</th>
              <th style={{ ...styles.th, textAlign: 'right' }}>P. Unitario</th>
              <th style={{ ...styles.th, textAlign: 'right' }}>Subtotal</th>
            </tr>
          </thead>
          <tbody>
            {items.map((it, idx) => {
              const lineCents = Math.round(it.units * it.unitPrice * 100);
              return (
                <tr key={idx} style={idx % 2 ? styles.altRow : undefined}>
                  <td style={styles.td}>{it.description}</td>
                  <td style={{ ...styles.td, textAlign: 'center' }}>{it.units}</td>
                  <td style={{ ...styles.td, textAlign: 'right' }}>
                    {formatCurrency(Math.round(it.unitPrice * 100))}
                  </td>
                  <td style={{ ...styles.td, textAlign: 'right' }}>{formatCurrency(lineCents)}</td>
                </tr>
              );
            })}
          </tbody>
        </table>

        <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
          <div style={styles.totalsBox}>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <div>Subtotal</div>
              <div>{formatCurrency(subtotalCents)}</div>
            </div>
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                marginTop: 6,
              }}
            >
              <div>IGV (18%)</div>
              <div>{formatCurrency(igvCents)}</div>
            </div>
            <div
              style={{
                borderTop: GRID_BORDER,
                marginTop: 6,
                paddingTop: 6,
                fontWeight: 700,
              }}
            >
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                }}
              >
                <div>Total</div>
                <div>{formatCurrency(totalCents)}</div>
              </div>
            </div>
          </div>
        </div>

        <footer
          style={{
            ...styles.footer,
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-start',
            gap: 16,
          }}
        >
          <div style={{ flex: 1 }}>
            Los plazos de trabajo son los siguientes: se cancela el 50% del monto total al iniciar y
            el 50% restante al momento de la entrega del trabajo o reparación.
            <br />
            <br />
            <strong>Dirección:</strong> Ca. Nestor Bermudez 113, Chorrillos - Lima
            <br />
            <strong>Dirección:</strong> Justo Pastor Davil 117, Chorrillos - Lima, Ubicado en Centro
            Comercial Kiwi
            <br />
            <strong>Correo:</strong> contacto@servitecperu.com / gerencia@servitecperu.com
            <br />
            <strong>RUC:</strong> 20604141240 · <strong>RNP:</strong> S1444296
            <br />
            <strong>Cuenta BCP:</strong> 194-94698600-0-49 · <strong>CCI:</strong>{' '}
            002-194-194698600049-98
            <br />
            <strong>Cuenta de Retracción:</strong>: 00-014-106421
          </div>
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: 10,
              minWidth: 120,
            }}
          >
            {/*<div style={{ textAlign: 'center' }}>*/}
            {/*  <QRCode*/}
            {/*    value={`https://servitecperu.com/pdf/${contractNumber}`}*/}
            {/*    size={80}*/}
            {/*    bordered={false}*/}
            {/*  />*/}
            {/*  <div style={{ fontSize: 9, marginTop: 4, color: '#4b5563' }}>Ver PDF</div>*/}
            {/*</div>*/}
            <div style={{ textAlign: 'center' }}>
              <QRCode value="https://servitecperu.com" size={80} bordered={false} />
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
});
