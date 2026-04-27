import styled from "styled-components";
import { QRCode } from "../../../components";
import { theme } from "../../../styles";
import dayjs from "dayjs";
import { getDevice } from "../../../utils";
import { isEmpty } from "lodash";

interface QuotationDocumentSheetProps {
  quotation: any;
}

export const QuotationDocumentSheet = ({
  quotation,
}: QuotationDocumentSheetProps) => {
  const subtotal = quotation?.quotationDetails?.reduce(
    (sum: number, item: any) => sum + item.subTotal,
    0
  );
  const igv = subtotal * 0.18;
  const total = subtotal + igv;

  return (
    <div className="sheet">
      <Container>
        <Header>
          <div className="logo-section">
            <LogoPlaceholder>
              <img src="/logo-servitec-2.png" alt="Logo Servitec" />
            </LogoPlaceholder>
          </div>
          <div className="title-section">
            <h1>INFORME TÉCNICO</h1>
            <p className="subtitle">
              SERVICIO DE SOPORTE Y MANTENIMIENTO ESPECIALIZADO
            </p>
            <ContractInfo>
              <p>
                <strong>N° de Contrato:</strong> {quotation.contractNumber}
              </p>
              <p>
                <strong>Fecha:</strong>{" "}
                {dayjs(quotation.createAt.toDate()).format("DD/MM/YYYY HH:mm")}
              </p>
            </ContractInfo>
          </div>
        </Header>

        <Main>
          <Section>
            <SectionTitle>DATOS DEL CLIENTE</SectionTitle>
            <InfoGrid>
              {quotation?.client.document.type === "dni" ? (
                <InfoItem>
                  <label>Nombre completo</label>
                  <span>{`${quotation?.client?.firstName} ${quotation?.client?.paternalSurname} ${quotation?.client?.maternalSurname}`}</span>
                </InfoItem>
              ) : (
                <InfoItem>
                  <label>Razón Social</label>
                  <span>{quotation?.client?.companyName || "-"}</span>
                </InfoItem>
              )}
              <InfoItem>
                <label>
                  {quotation?.client?.document.type === "dni" ? "DNI" : "RUC"}
                </label>
                <span>{quotation?.client?.document.number || "-"}</span>
              </InfoItem>
              <InfoItem>
                <label>Teléfono</label>
                <span>{quotation?.client?.phone.number || "-"}</span>
              </InfoItem>
              <InfoItem>
                <label>Correo</label>
                <span>{quotation?.client?.email || "-"}</span>
              </InfoItem>
              <InfoItem className="full-width">
                <label>Dirección</label>
                <span>{quotation?.client?.address || "-"}</span>
              </InfoItem>
            </InfoGrid>
          </Section>

          <Section>
            <SectionTitle>DATOS DEL DISPOSITIVO</SectionTitle>
            <InfoGrid>
              <InfoItem>
                <label>Tipo</label>
                <span>{getDevice(quotation?.device?.type) || "-"}</span>
              </InfoItem>
              <InfoItem>
                <label>Marca</label>
                <span>{quotation?.device?.brand || "-"}</span>
              </InfoItem>
              <InfoItem>
                <label>Modelo</label>
                <span>{quotation?.device?.model || "-"}</span>
              </InfoItem>
              <InfoItem>
                <label>Serie</label>
                <span>{quotation?.device?.serialNumber || "-"}</span>
              </InfoItem>
              <InfoItem>
                <label>Color</label>
                <span>{quotation?.device?.color || "-"}</span>
              </InfoItem>
              <InfoItem>
                <label>Condición</label>
                <span>{quotation?.device?.condition || "-"}</span>
              </InfoItem>
            </InfoGrid>
          </Section>

          <Section>
            <SectionTitle>DETALLES TÉCNICOS</SectionTitle>
            <TechnicalGrid>
              <div className="tech-cell full">
                <h4>Problema que presenta:</h4>
                <QuillContent
                  dangerouslySetInnerHTML={{
                    __html: quotation?.reportedIssue || "",
                  }}
                />
              </div>
              <div className="tech-cell">
                <h4>Análisis:</h4>
                <QuillContent
                  dangerouslySetInnerHTML={{
                    __html: quotation?.analysis || "",
                  }}
                />
              </div>
              <div className="tech-cell">
                <h4>Solución y Recomendaciones:</h4>
                <QuillContent
                  dangerouslySetInnerHTML={{
                    __html: quotation?.solutionAndRecommendations || "",
                  }}
                />
              </div>
            </TechnicalGrid>
          </Section>

          {!isEmpty(quotation?.quotationDetails) && (
            <Section>
              <SectionTitle>DETALLE DE LA COTIZACIÓN</SectionTitle>
              <TableWrapper>
                <Table>
                  <thead>
                    <tr>
                      <th>Descripción</th>
                      <th>Unidades</th>
                      <th>Precio Unit.</th>
                      <th>Subtotal</th>
                    </tr>
                  </thead>
                  <tbody>
                    {quotation?.quotationDetails?.map(
                      (item: any, index: number) => (
                        <tr key={index}>
                          <td>
                            <QuillContent
                              dangerouslySetInnerHTML={{
                                __html: item.description || "",
                              }}
                            />
                          </td>
                          <td className="center">{item.quantity}</td>
                          <td className="right">
                            S/ {item.unitPrice.toFixed(2)}
                          </td>
                          <td className="right">
                            S/ {item.subTotal.toFixed(2)}
                          </td>
                        </tr>
                      )
                    )}
                  </tbody>
                </Table>
              </TableWrapper>
              <Totals>
                <TotalRow>
                  <span>SUBTOTAL:</span>
                  <strong>S/ {subtotal.toFixed(2)}</strong>
                </TotalRow>
                <TotalRow>
                  <span>IGV (18%):</span>
                  <strong>S/ {igv.toFixed(2)}</strong>
                </TotalRow>
                <TotalRow className="final">
                  <span>TOTAL:</span>
                  <strong>S/ {total.toFixed(2)}</strong>
                </TotalRow>
              </Totals>
            </Section>
          )}

          <Section>
            <SectionTitle>CONDICIONES DE PAGO</SectionTitle>
            <PaymentTerms>
              Los plazos de trabajo son los siguientes: Se cancela el{" "}
              <strong>50% del monto total</strong> al momento de iniciar los
              trabajos y el <strong>50% restante</strong> al momento de la
              entrega del trabajo, proyecto o reparación.
            </PaymentTerms>
          </Section>
        </Main>

        <Footer>
          <CompanyInfo>
            <p>
              <strong>Dirección:</strong> Defensores del Morro Cdra 13, Lima 09
              Chorrillos Peru / Ca. Nestor Bermudez 113, Esquina con Av.
              Fernando Teran
            </p>
            <p>
              <strong>Tel:</strong> 972252744 | 941801827
            </p>
            <p>
              <strong>Correo:</strong> contacto@servitecperu.com /
              gerencia@servitecperu.com
            </p>
            <p>
              <strong>RUC:</strong> 20604141240 | <strong>RNP:</strong> S1444296
            </p>
            <p>
              <strong>N° Cuentas BCP:</strong> 194-94698600-0-49 | CCI:
              002-194-194698600049-98
            </p>
            <p>
              <strong>Cuenta de Retracción:</strong> 00-014-106421
            </p>
          </CompanyInfo>
          <QRSection>
            <div className="qr-container">
              <QRCode
                value="https://servitecperu.com"
                type="svg"
                color="black"
                size={75}
                bordered={false}
              />
              <span>servitecperu.com</span>
            </div>
            <div className="qr-container">
              <QRCode
                // value={window.location.href}
                value={`https://platform.servitecperu.com/quotations/${quotation?.id}/sheets`}
                type="svg"
                color="black"
                size={75}
                bordered={false}
              />
              <span>Documento PDF</span>
            </div>
          </QRSection>
        </Footer>
      </Container>
    </div>
  );
};

const Container = styled.div`
  width: 100%;
  font-family:
    "Inter",
    -apple-system,
    sans-serif;
  font-size: 10.5px;
  color: #374151;
  background: white;
`;

const Header = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-bottom: 1.5em;
  border-bottom: 3px solid ${theme.colors.primary};
  margin-bottom: 2em;

  .title-section {
    text-align: center;
    h1 {
      font-size: 28px;
      color: #111827;
      margin: 0;
      line-height: 1;
    }
    .subtitle {
      font-size: 9px;
      font-weight: 700;
      margin-top: 4px;
    }
  }
`;

const LogoPlaceholder = styled.div`
  img {
    max-width: 160px;
    height: auto;
  }
`;

const ContractInfo = styled.div`
  display: flex;
  gap: 1.5em;
  justify-content: flex-end;
  margin-top: 0.5em;
  p {
    color: #6b7280;
    strong {
      color: #111827;
    }
  }
`;

const Main = styled.main`
  display: flex;
  flex-direction: column;
  gap: 1.5em;
`;

const Section = styled.section`
  width: 100%;
`;

const SectionTitle = styled.h3`
  font-size: 11px;
  font-weight: 700;
  color: white;
  background: ${theme.colors.primary};
  padding: 6px 12px;
  margin-bottom: 10px;
  border-radius: 6px;
  text-transform: uppercase;
`;

const InfoGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  overflow: hidden;
`;

const InfoItem = styled.div`
  display: flex;
  border-bottom: 1px solid #e5e7eb;
  &:last-child {
    border-bottom: none;
  }

  label {
    background: #f8fafc;
    padding: 8px 12px;
    font-weight: 600;
    width: 130px;
    border-right: 1px solid #e5e7eb;
    color: #64748b;
  }
  span {
    padding: 8px 12px;
    color: #111827;
    flex: 1;
  }
  &.full-width {
    grid-column: span 2;
  }
`;

const TechnicalGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 0;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  overflow: hidden;

  .tech-cell {
    padding: 12px;
    border-bottom: 1px solid #e5e7eb;
    border-right: 1px solid #e5e7eb;
    &:nth-child(even) {
      border-right: none;
    }
    &:last-child {
      border-left: 1px solid #e5e7eb;
    }
    &.full {
      grid-column: span 2;
      border-right: none;
    }

    h4 {
      font-size: 11px;
      text-transform: uppercase;
      color: #6b7280;
      margin-bottom: 8px;
    }
  }
`;

const TableWrapper = styled.div`
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  overflow: hidden;
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  thead th {
    background: #f8fafc;
    padding: 12px 10px;
    color: #64748b;
    font-weight: 700;
    text-transform: uppercase;
    font-size: 9px;
    border-bottom: 1px solid #e5e7eb;
    border-right: 1px solid #e5e7eb;

    &:last-child {
      border-right: none;
    }

    &:nth-child(2) {
      width: 80px;
    }
    &:nth-child(3) {
      width: 110px;
    }
    &:nth-child(4) {
      width: 110px;
    }
  }

  tbody td {
    padding: 12px 10px;
    border-bottom: 1px solid #f3f4f6;
    border-right: 1px solid #e5e7eb;

    &:last-child {
      border-right: none;
      border-bottom: 1px solid #f3f4f6;
    }

    &:nth-child(2) {
      text-align: center;
    }

    &.right {
      text-align: center;
      font-variant-numeric: tabular-nums;
      font-weight: 600;
      color: #111827;
    }
  }

  tbody tr:last-child td {
    border-bottom: none;
  }
`;

const Totals = styled.div`
  margin-top: 12px;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 4px;
`;

const TotalRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 220px;
  padding: 6px 12px;
  background: #f9fafb;
  border-radius: 6px;
  &.final {
    background: ${theme.colors.primary};
    color: white;
    strong {
      font-size: 14px;
    }
  }
`;

const PaymentTerms = styled.p`
  padding: 12px;
  background: #fffbeb;
  border: 1px solid #fde68a;
  border-radius: 8px;
  color: #92400e;
`;

const Footer = styled.footer`
  margin-top: 3em;
  padding-top: 1.5em;
  border-top: 1px solid #e5e7eb;
  display: flex;
  justify-content: space-between;
`;

const CompanyInfo = styled.div`
  color: #6b7280;
  font-size: 9.5px;
  p {
    margin-bottom: 4px;
  }
`;

const QRSection = styled.div`
  display: flex;
  gap: 20px;
  .qr-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    span {
      margin-top: 5px;
      font-size: 8px;
      font-weight: 700;
      text-transform: uppercase;
    }
  }
`;

const QuillContent = styled.div`
  line-height: 1.6;
  p {
    margin-bottom: 4px;
  }
  ul,
  ol {
    padding-left: 18px;
  }
  strong {
    color: #111827;
  }
`;
