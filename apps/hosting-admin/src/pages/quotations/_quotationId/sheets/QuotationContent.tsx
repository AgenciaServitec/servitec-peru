import React, { forwardRef } from 'react';
import type { Quotation } from '../../../../globalTypes';

type Props = {
  quotation: Quotation;
};

export const QuotationContent = forwardRef<HTMLDivElement, Props>(({ quotation }, ref) => {
  if (!quotation) return null;

  const ACCENT = '#0ea5a4';
  const baseFont = {
    fontFamily: "Inter, -apple-system, 'Segoe UI', Roboto, Arial",
    color: '#0f172a',
  } as const;

  const formatCurrency = (cents: number) =>
    new Intl.NumberFormat('es-PE', { style: 'currency', currency: 'PEN' }).format(cents / 100);

  const items =
    Array.isArray((quotation as any).items) && (quotation as any).items.length
      ? (quotation as any).items.map((it: any) => ({
          description: it.description ?? '-',
          units: Number(it.units ?? 1),
          unitPrice: Number(it.unitPrice ?? 0),
        }))
      : [
          {
            description:
              quotation.description ?? `${quotation.analysis ?? ''} / ${quotation.solutions ?? ''}`,
            units: Number(quotation.units ?? 1),
            unitPrice: Number(quotation.unitPrices ?? 0),
          },
        ];

  const subtotalCents = items.reduce(
    (acc, it) => acc + Math.round(it.units * it.unitPrice * 100),
    0
  );
  const igvCents = Math.round((subtotalCents * 18) / 100);
  const totalCents = subtotalCents + igvCents;

  const clientName =
    `${quotation.client.firstName ?? ''} ${quotation.client.paternalSurname ?? ''} ${quotation.client.maternalSurname ?? ''}`.trim();
  const company = quotation.client.companyName ?? (clientName || '—');

  const styles = {
    container: {
      ...baseFont,
      background: '#fff',
      padding: 10,
      fontSize: 12,
      lineHeight: 1.34,
      color: '#111827',
    } as React.CSSProperties,
    card: {
      borderRadius: 10,
      padding: 20,
      boxShadow: '0 8px 30px rgba(2,6,23,0.06)',
      border: '1px solid rgba(15,23,42,0.04)',
      background: '#fff',
    } as React.CSSProperties,
    header: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'flex-start',
      gap: 16,
      paddingBottom: 12,
      borderBottom: `3px solid ${ACCENT}`,
      borderBottomOpacity: 0.06,
    } as React.CSSProperties,
    logo: { width: 140, display: 'block' } as React.CSSProperties,
    brandRight: {
      textAlign: 'right' as const,
      fontSize: 11,
      color: '#374151',
    } as React.CSSProperties,
    titleArea: {
      textAlign: 'center' as const,
      paddingTop: 12,
      paddingBottom: 8,
    } as React.CSSProperties,
    title: { fontSize: 16, fontWeight: 700, letterSpacing: 0.2 } as React.CSSProperties,
    metaRow: { display: 'flex', gap: 12, marginTop: 12, marginBottom: 12 } as React.CSSProperties,
    metaLeft: { flex: '1 1 60%' } as React.CSSProperties,
    metaRight: { flex: '0 0 40%' } as React.CSSProperties,
    metaTable: { width: '100%', borderCollapse: 'collapse', fontSize: 11 } as React.CSSProperties,
    metaHead: {
      background: '#f8fafc',
      padding: 10,
      fontWeight: 700,
      color: '#0b1220',
    } as React.CSSProperties,
    metaCell: {
      padding: 10,
      verticalAlign: 'top' as const,
      color: '#374151',
    } as React.CSSProperties,
    sectionTitle: { margin: '8px 0 6px', fontSize: 13, color: '#0b1220' } as React.CSSProperties,
    table: { width: '100%', borderCollapse: 'collapse', fontSize: 11 } as React.CSSProperties,
    th: {
      textAlign: 'left' as const,
      background: '#fbfeff',
      padding: 10,
      fontWeight: 700,
      color: '#0b1220',
    } as React.CSSProperties,
    td: {
      padding: 10,
      verticalAlign: 'top' as const,
      borderBottom: '1px solid #eef2f7',
      color: '#334155',
    } as React.CSSProperties,
    altRow: { background: '#fbfdfe' } as React.CSSProperties,
    totalsWrap: {
      display: 'flex',
      justifyContent: 'flex-end',
      marginTop: 8,
    } as React.CSSProperties,
    totalsBox: {
      width: 260,
      borderRadius: 8,
      padding: 10,
      background: '#f8fafc',
      fontSize: 12,
    } as React.CSSProperties,
    footer: {
      borderTop: '1px solid rgba(15,23,42,0.06)',
      marginTop: 14,
      paddingTop: 10,
    } as React.CSSProperties,
    footerLeft: { fontSize: 10, color: '#475569', lineHeight: 1.25 } as React.CSSProperties,
    signatureBox: { width: 240, textAlign: 'center' as const } as React.CSSProperties,
  };

  return (
    <div ref={ref} style={styles.container}>
      <div style={styles.card}>
        <div style={styles.header}>
          <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
            <img src="/logo-servitec.png" alt="logo" style={styles.logo} />
            <div>
              <div style={{ fontSize: 12, fontWeight: 700 }}>SERVITEC PERÚ</div>
              <div style={{ fontSize: 11, color: '#6b7280' }}>Soporte técnico especializado</div>
            </div>
          </div>

          <div style={styles.brandRight}>
            <div style={{ fontWeight: 700 }}>SERVITEC PERÚ</div>
            <div style={{ marginTop: 6 }}>
              RUC: 20604329955
              <br />
              contacto@servitecperu.com · 972252744 / 941801827
            </div>
          </div>
        </div>

        <div style={styles.titleArea}>
          <div style={styles.title}>COTIZACIÓN · INFORME TÉCNICO</div>
          <div style={{ marginTop: 8, fontSize: 11, color: '#6b7280' }}>
            {quotation.serialNumber ? `N° Contrato: ${quotation.serialNumber}` : null}
            {quotation.createAt &&
              (() => {
                try {
                  const date =
                    typeof quotation.createAt.toDate === 'function'
                      ? quotation.createAt.toDate()
                      : new Date(quotation.createAt);
                  return ` · Fecha: ${date.toLocaleDateString('es-PE')}`;
                } catch {
                  return '';
                }
              })()}
          </div>
        </div>

        <div style={styles.metaRow}>
          <div style={styles.metaLeft}>
            <table style={styles.metaTable}>
              <tbody>
                <tr>
                  <td style={styles.metaHead}>Elaborado por</td>
                  <td style={styles.metaCell}>{quotation.user?.name ?? '—'}</td>
                </tr>
                <tr>
                  <td style={styles.metaHead}>Razón social / Cliente</td>
                  <td style={styles.metaCell}>{company}</td>
                </tr>
                <tr>
                  <td style={styles.metaHead}>Código</td>
                  <td style={styles.metaCell}>{quotation.client.code ?? '—'}</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div style={styles.metaRight}>
            <table style={styles.metaTable}>
              <tbody>
                <tr>
                  <td style={styles.metaHead}>Aprobado por</td>
                  <td style={styles.metaCell}>ROBERTO MENDOZA</td>
                </tr>
                <tr>
                  <td style={styles.metaHead}>RUC</td>
                  <td style={styles.metaCell}>{quotation.client.document?.number ?? '—'}</td>
                </tr>
                <tr>
                  <td style={styles.metaHead}>N° Contrato</td>
                  <td style={styles.metaCell}>{quotation.serialNumber ?? '—'}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <section style={{ marginTop: 6 }}>
          <h4 style={styles.sectionTitle}>Problema reportado</h4>
          <div>
            <span style={{ color: '#111' }}>
              {quotation.device.problemDescription ?? 'Descripción no proporcionada.'}
            </span>
          </div>
        </section>

        <section style={{ marginTop: 12 }}>
          <h4 style={styles.sectionTitle}>Análisis y recomendaciones</h4>
          <table style={styles.table} role="table" aria-label="Análisis y recomendaciones">
            <thead>
              <tr>
                <th style={styles.th as React.CSSProperties}>Análisis</th>
                <th style={styles.th as React.CSSProperties}>Solución y recomendaciones</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td style={styles.td as React.CSSProperties}>{quotation.analysis ?? '—'}</td>
                <td style={styles.td as React.CSSProperties}>
                  {quotation.solutions ?? '—'}
                  <div style={{ marginTop: 6, color: '#475569' }}>
                    {quotation.recommendations ?? ''}
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </section>

        <section style={{ marginTop: 12 }}>
          <h4 style={styles.sectionTitle}>Detalle de costos</h4>
          <table style={styles.table}>
            <thead>
              <tr>
                <th style={styles.th as React.CSSProperties}>Descripción</th>
                <th style={{ ...styles.th, textAlign: 'center' } as React.CSSProperties}>
                  Unidades
                </th>
                <th style={{ ...styles.th, textAlign: 'right' } as React.CSSProperties}>
                  Precio unitario
                </th>
                <th style={{ ...styles.th, textAlign: 'right' } as React.CSSProperties}>
                  Subtotal
                </th>
              </tr>
            </thead>

            <tbody>
              {items.map((it, idx) => {
                const lineCents = Math.round(it.units * it.unitPrice * 100);
                return (
                  <tr key={idx} style={idx % 2 ? styles.altRow : undefined}>
                    <td style={styles.td as React.CSSProperties}>{it.description}</td>
                    <td style={{ ...styles.td, textAlign: 'center' } as React.CSSProperties}>
                      {it.units}
                    </td>
                    <td style={{ ...styles.td, textAlign: 'right' } as React.CSSProperties}>
                      {formatCurrency(Math.round(it.unitPrice * 100))}
                    </td>
                    <td style={{ ...styles.td, textAlign: 'right' } as React.CSSProperties}>
                      {formatCurrency(lineCents)}
                    </td>
                  </tr>
                );
              })}

              <tr>
                <td
                  style={{ ...styles.td, color: '#475569', fontSize: 11 } as React.CSSProperties}
                  colSpan={2}
                >
                  <em>
                    Los plazos de trabajo son los siguientes: Se cancela el 50% del monto total al
                    momento de inciar los trabajos y el 50% restantes al momento de la entrega del
                    trabajo, proyecto o reparación
                  </em>
                </td>
                <td style={{ ...styles.td, textAlign: 'right' } as React.CSSProperties}>
                  <strong>Subtotal</strong>
                </td>
                <td style={{ ...styles.td, textAlign: 'right' } as React.CSSProperties}>
                  {formatCurrency(subtotalCents)}
                </td>
              </tr>

              <tr>
                <td style={styles.td as React.CSSProperties} colSpan={2} />
                <td style={{ ...styles.td, textAlign: 'right' } as React.CSSProperties}>
                  <strong>IGV (18%)</strong>
                </td>
                <td style={{ ...styles.td, textAlign: 'right' } as React.CSSProperties}>
                  {formatCurrency(igvCents)}
                </td>
              </tr>

              <tr>
                <td style={styles.td as React.CSSProperties} colSpan={2} />
                <td
                  style={
                    {
                      ...styles.td,
                      textAlign: 'right',
                      fontWeight: 800,
                      background: '#f8fafc',
                    } as React.CSSProperties
                  }
                >
                  <strong>TOTAL</strong>
                </td>
                <td
                  style={
                    {
                      ...styles.td,
                      textAlign: 'right',
                      fontWeight: 900,
                      background: '#f8fafc',
                    } as React.CSSProperties
                  }
                >
                  {formatCurrency(totalCents)}
                </td>
              </tr>
            </tbody>
          </table>

          <div style={styles.totalsWrap}>
            <div style={styles.totalsBox}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <div>Subtotal</div>
                <div>{formatCurrency(subtotalCents)}</div>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 6 }}>
                <div>IGV (18%)</div>
                <div>{formatCurrency(igvCents)}</div>
              </div>
              <div style={{ height: 8 }} />
              <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 800 }}>
                <div>TOTAL</div>
                <div>{formatCurrency(totalCents)}</div>
              </div>
            </div>
          </div>
        </section>
        <footer style={styles.footer}>
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              gap: 12,
            }}
          >
            <div style={styles.footerLeft}>
              Dirección: Defensores del Morro Cdra 13, Lima 09 - Chorrillos · Tel: 972252744 /
              941801827 · contacto@servitecperu.com
            </div>

            <div style={styles.signatureBox}>
              <div>
                <div style={{ marginTop: 6, fontSize: 11, color: '#475569' }}>Aprobado por</div>
                <div style={{ fontWeight: 700 }}>ROBERTO MENDOZA</div>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
});
