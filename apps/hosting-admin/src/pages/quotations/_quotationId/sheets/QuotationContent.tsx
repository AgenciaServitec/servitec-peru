import React, { forwardRef } from 'react';
import type { Quotation } from '../../../../globalTypes';

type Props = {
  quotation: Quotation;
};

export const QuotationContent = forwardRef<HTMLDivElement, Props>(({ quotation }, ref) => {
  if (!quotation) return null;

  const clientName =
    `${quotation.client.firstName ?? ''} ${quotation.client.paternalSurname ?? ''} ${quotation.client.maternalSurname ?? ''}`.trim();
  const company = quotation.client.companyName;

  return (
    <div
      ref={ref}
      style={{
        fontFamily: 'Arial, sans-serif',
        fontSize: '12px',
        color: '#000',
        padding: '20px',
        background: '#fff',
      }}
    >
      <table
        width="100%"
        border={1}
        cellPadding={5}
        style={{ borderCollapse: 'collapse', marginBottom: '10px' }}
      >
        <tbody>
          <tr>
            <td>
              <strong>Elaborado por:</strong>
              <br />
              {quotation.user?.name ?? '—'}
            </td>
            <td>
              <strong>RAZÓN SOCIAL</strong>
              <br />
              {company || clientName}
            </td>
            <td rowSpan={3} align="center" style={{ width: '150px' }}>
              <img src="/logotipo-soft.png" alt="Logo" style={{ width: '120px' }} />
            </td>
          </tr>
          <tr>
            <td>
              <strong>Aprobado por:</strong>
              <br />
              ROBERTO MENDOZA
            </td>
            <td>
              <strong>RUC</strong>
              <br />
              {quotation.client.document.number}
            </td>
          </tr>
          <tr>
            <td>
              <strong>CÓDIGO</strong>
              <br />
              {quotation.client.code ?? '—'}
            </td>
            <td>
              <strong>NÚMERO DE CONTRATO</strong>
              <br />
              {quotation.serialNumber}
            </td>
          </tr>
        </tbody>
      </table>

      <h3 style={{ textAlign: 'center', margin: '10px 0' }}>Informe Técnico</h3>
      <p>
        <strong>Problema que presenta</strong>
        <br />
        {quotation.device.type} {quotation.device.brand} {quotation.device.model}:{' '}
        {quotation.analysis}
      </p>

      <table
        width="100%"
        border={1}
        cellPadding={5}
        style={{ borderCollapse: 'collapse', marginTop: '10px', marginBottom: '10px' }}
      >
        <thead>
          <tr style={{ background: '#eee' }}>
            <th width="50%">ANÁLISIS</th>
            <th width="50%">SOLUCIÓN Y RECOMENDACIONES</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{quotation.analysis}</td>
            <td>
              {quotation.solutions}
              <br />
              {quotation.recommendations}
            </td>
          </tr>
        </tbody>
      </table>

      <table
        width="100%"
        border={1}
        cellPadding={5}
        style={{ borderCollapse: 'collapse', marginTop: '10px' }}
      >
        <thead>
          <tr style={{ background: '#eee' }}>
            <th>Descripción</th>
            <th>Unidades</th>
            <th>Precio Unitario</th>
            <th>Subtotal</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              {quotation.analysis} / {quotation.solutions}
            </td>
            <td align="center">1</td>
            <td align="right">S/ 840.00</td>
            <td align="right">S/ 840.00</td>
          </tr>
        </tbody>
      </table>

      <div style={{ marginTop: '10px', textAlign: 'right' }}>
        <p>
          <strong>SUBTOTAL:</strong> S/ 840.00
        </p>
        <p>
          <strong>IGV (18%):</strong> S/ 151.20
        </p>
        <p>
          <strong>TOTAL:</strong> S/ 991.20
        </p>
      </div>

      <div
        style={{
          borderTop: '1px solid #000',
          marginTop: '20px',
          paddingTop: '10px',
          fontSize: '11px',
        }}
      >
        Dirección: Defensores del Morro Cdra 13, Lima 09 Chorrillos
        <br />
        Tel: 972252744 / 941801827
        <br />
        Correo: contacto@servitecperu.com
      </div>
    </div>
  );
});
