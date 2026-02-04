import styled from "styled-components";
import { QRCode } from "../../../components";
import { theme } from "../../../styles";
import dayjs from "dayjs";
import { getDevice } from "../../../utils";

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
              <img
                src="https://www.servitecperu.com/web/assets/images/logo-servitec2.png"
                alt="Logo"
              />
            </LogoPlaceholder>
          </div>
          <div className="title-section">
            <h1>INFORME TÉCNICO</h1>
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
                  <label>Nombre completo:</label>
                  <span>
                    {quotation?.client?.firstName}{" "}
                    {quotation?.client?.paternalSurname}{" "}
                    {quotation?.client?.maternalSurname}
                  </span>
                </InfoItem>
              ) : (
                <InfoItem>
                  <label>Razón Social:</label>
                  <span>{quotation?.client?.companyName || "-"}</span>
                </InfoItem>
              )}
              <InfoItem>
                {quotation?.client?.document.type === "dni" ? (
                  <label>DNI:</label>
                ) : (
                  <label>RUC:</label>
                )}
                <span>{quotation?.client?.document.number || "-"}</span>
              </InfoItem>
              <InfoItem>
                <label>Teléfono:</label>
                <span>{quotation?.client?.phone.number || "-"}</span>
              </InfoItem>
              <InfoItem>
                <label>Correo:</label>
                <span>{quotation?.client?.email || "-"}</span>
              </InfoItem>
              <InfoItem className="full-width">
                <label>Dirección:</label>
                <span>{quotation?.client?.address || "-"}</span>
              </InfoItem>
            </InfoGrid>
          </Section>
          <Section>
            <SectionTitle>DATOS DEL DISPOSITIVO</SectionTitle>
            <InfoGrid>
              <InfoItem>
                <label>Tipo:</label>
                <span>{getDevice(quotation?.device?.type) || "-"}</span>
              </InfoItem>
              <InfoItem>
                <label>Marca:</label>
                <span>{quotation?.device?.brand || "-"}</span>
              </InfoItem>
              <InfoItem>
                <label>Modelo:</label>
                <span>{quotation?.device?.model || "-"}</span>
              </InfoItem>
              <InfoItem>
                <label>Serie:</label>
                <span>{quotation?.device?.serialNumber || "-"}</span>
              </InfoItem>
              <InfoItem>
                <label>Color:</label>
                <span>{quotation?.device?.color || "-"}</span>
              </InfoItem>
              <InfoItem>
                <label>Condición:</label>
                <span>{quotation?.device?.condition || "-"}</span>
              </InfoItem>
            </InfoGrid>
          </Section>
          <Section>
            <SectionTitle>DETALLES TÉCNICOS</SectionTitle>
            <TechnicalInfo>
              <div className="tech-item">
                <h4>Problema que presenta:</h4>
                <QuillContent
                  dangerouslySetInnerHTML={{
                    __html: quotation?.reportedIssue || "",
                  }}
                />
              </div>
              <div className="tech-item">
                <h4>Análisis:</h4>
                <QuillContent
                  dangerouslySetInnerHTML={{
                    __html: quotation?.analysis || "",
                  }}
                />
              </div>
              <div className="tech-item">
                <h4>Solución y Recomendaciones:</h4>
                <QuillContent
                  dangerouslySetInnerHTML={{
                    __html: quotation?.solutionAndRecommendations || "",
                  }}
                />
              </div>
            </TechnicalInfo>
          </Section>
          <Section>
            <SectionTitle>DETALLE DE LA COTIZACIÓN</SectionTitle>
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
                      <QuillContent
                        dangerouslySetInnerHTML={{
                          __html: item.description || "",
                        }}
                      />
                      <td className="center">{item.quantity}</td>
                      <td className="right">S/ {item.unitPrice.toFixed(2)}</td>
                      <td className="right">S/ {item.subTotal.toFixed(2)}</td>
                    </tr>
                  )
                )}
              </tbody>
            </Table>
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
              Fernando Terans
            </p>
            <p>
              <strong>Tel:</strong> 972252744 | <strong>Tel 2:</strong>{" "}
              941801827
            </p>
            <p>
              <strong>Correo:</strong> contacto@servitecperu.com /
              gerencia@servitecperu.com
            </p>
            <p>
              <strong>RUC:</strong> 20604141240 | <strong>RNP:</strong> S1444296
            </p>
            <p>
              <strong>N° Cuenta BCP:</strong> 194-94698600-0-49 |{" "}
              <strong>CCI:</strong> 002-194-194698600049-98
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
                icon="/icon-servitec.png"
                color="black"
                iconSize={15}
                size={90}
                bordered={false}
              />
            </div>
            <div className="qr-container">
              <QRCode
                value={window.location.href}
                color="black"
                type="svg"
                size={90}
                bordered={false}
              />
            </div>
          </QRSection>
        </Footer>
      </Container>
    </div>
  );
};

const Container = styled.div`
  width: 100%;
  height: 100%;
  font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
  font-size: 11px;
  color: #2c3e50;
  line-height: 1.4;

  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  .sheet {
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 1em;
  }

  @media print {
    .sheet {
      padding-top: 40mm;
      padding-bottom: 35mm;
    }
  }
`;

const Header = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-bottom: 1em;
  //border-bottom: 3px solid #3498db;
  border-bottom: 3px solid ${() => theme.colors.primary};
  margin-bottom: 1em;

  .logo-section {
    flex: 1;
  }

  .title-section {
    flex: 2;
    text-align: center;

    h1 {
      font-size: 32px;
      font-weight: 700;
      color: #000000;
      margin-bottom: 0.3em;
      letter-spacing: 2px;
    }
  }
`;

const LogoPlaceholder = styled.div`
  img {
    max-width: 150px;
    height: auto;
  }
`;

const ContractInfo = styled.div`
  display: flex;
  gap: 2em;
  justify-content: center;
  font-size: 12px;

  p {
    color: #4b5563;

    strong {
      color: #000000;
      font-weight: 600;
    }
  }
`;

const Main = styled.main`
  display: flex;
  flex-direction: column;
  gap: 1.2em;
`;

const Section = styled.section`
  background: #fff;

  @media print {
    break-inside: auto;
    page-break-inside: auto;
  }
`;

const SectionTitle = styled.h3`
  font-size: 14px;
  font-weight: 700;
  color: #fff;
  background: linear-gradient(
    135deg,
    ${() => theme.colors.primary} 0%,
    ${() => theme.colors.primary} 100%
  );
  padding: 0.5em 0.8em;
  margin-bottom: 0.8em;
  border-radius: 4px;
  letter-spacing: 0.5px;
`;

const InfoGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 0.6em 1.2em;
  padding: 0 0.5em;

  .full-width {
    grid-column: 1 / -1;
  }
`;

const InfoItem = styled.div`
  display: flex;
  gap: 0.5em;

  label {
    font-weight: 600;
    color: #000000;
    min-width: 120px;
  }

  span {
    color: #4b5563;
  }
`;

const TechnicalInfo = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 0.8em;
  padding: 0 0.5em;

  .tech-item {
    &:first-child {
      grid-column: span 2;
    }
    h4 {
      font-size: 14px;
      font-weight: 600;
      color: #000000; /* título negro */
      margin-bottom: 0.3em;
    }
  }

  @media print {
    break-inside: auto;
    page-break-inside: auto;
  }
`;

const Table = styled.table`
  width: 100%;
  //border-collapse: collapse;
  margin-top: 0.5em;

  thead {
    background: linear-gradient(
      135deg,
      ${() => theme.colors.primary} 0%,
      ${() => theme.colors.primary} 100%
    );
    color: #fff;

    th {
      padding: 0.7em;
      text-align: left;
      font-weight: 600;
      font-size: 11px;
      letter-spacing: 0.3px;
    }
  }

  tbody {
    tr {
      border-bottom: 1px solid #ecf0f1;

      &:hover {
        background: #f8f9fa;
      }

      &:last-child {
        border-bottom: 2px solid ${() => theme.colors.primary};
      }
    }

    td {
      padding: 0.7em;
      color: #000000;

      &.center {
        text-align: center;
        border-left: 1px solid #ecf0f1;
      }

      &.right {
        text-align: center;
        font-weight: 500;
        width: 80px;
        border-left: 1px solid #ecf0f1;
      }
    }
  }

  @media print {
    page-break-inside: auto;
  }
`;

const Totals = styled.div`
  margin-top: 1em;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 0.4em;

  @media print {
    page-break-inside: avoid;
  }
`;

const TotalRow = styled.div`
  display: flex;
  justify-content: space-between;
  min-width: 280px;
  padding: 0.4em 0.8em;
  background: #ecf0f1;
  border-radius: 4px;

  &.final {
    background: linear-gradient(
      135deg,
      ${() => theme.colors.primary} 0%,
      ${() => theme.colors.primary} 100%
    );
    color: #fff;
    font-size: 13px;
    padding: 0.6em 0.8em;

    strong {
      font-size: 15px;
    }
  }

  span {
    font-weight: 500;
  }

  strong {
    font-weight: 700;
  }
`;

const PaymentTerms = styled.p`
  padding: 1em;
  background: #fff3cd;
  border-left: 4px solid #ffc107;
  color: #856404;
  line-height: 1.6;
  border-radius: 4px;

  strong {
    color: #533f03;
  }
`;

const Footer = styled.footer`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-top: 1.5em;
  padding-top: 1em;
  border-top: 2px solid #ecf0f1;
  gap: 2em;
`;

const CompanyInfo = styled.div`
  flex: 3;
  font-size: 10px;
  line-height: 1.6;

  h4 {
    font-size: 14px;
    color: #000000;
    margin-bottom: 0.5em;
    font-weight: 700;
  }

  p {
    margin-bottom: 0.3em;
    color: #4b5563; /* texto gris */

    strong {
      color: #000000; /* label negro: Dirección, Tel, RUC, etc. */
      font-weight: 600;
    }
  }
`;

const QRSection = styled.div`
  flex: 1;
  display: flex;
  gap: 1em;
  justify-content: flex-end;

  .qr-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.3em;

    span {
      font-size: 9px;
      color: #7f8c8d;
      font-weight: 600;
      text-align: center;
    }
  }
`;

const QuillContent = styled.div`
  color: #4b5563;
  text-align: justify;
  line-height: 1.5;
  white-space: normal;

  p {
    margin-bottom: 0.5em;
  }

  ul,
  ol {
    margin: 0.5em 0 0.5em 1.5em;
  }

  li {
    margin-bottom: 0.25em;
  }

  strong {
    font-weight: 600;
    color: #000000;
  }

  ol li[data-list="bullet"] {
    list-style-type: disc;
  }

  ol li[data-list="ordered"] {
    list-style-type: decimal;
  }
`;
