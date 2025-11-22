import {
  Document,
  Image,
  Page,
  Path,
  Rect,
  StyleSheet,
  Svg,
  Text,
  View,
} from "@react-pdf/renderer";
import dayjs from "dayjs";
import Html from "react-pdf-html";

// Estilos para el PDF
const styles = StyleSheet.create({
  page: {
    position: "relative",
    paddingTop: 60, // Espacio para decoración superior y header
    paddingBottom: 100, // Espacio para decoración inferior
    paddingHorizontal: 50,
    fontSize: 10,
    fontFamily: "Helvetica",
    color: "#000000",
    backgroundColor: "#ffffff",
  },

  // Decoraciones geométricas
  topDecoration: {
    position: "absolute",
    top: 0,
    left: -150,
    width: "100%",
    height: 100,
  },
  bottomDecoration: {
    position: "absolute",
    bottom: -30,
    right: -49,
    width: "100%",
    height: 100,
  },

  // Header (solo primera página)
  headerSection: {},
  headerTop: {
    flexDirection: "row",
    justifyContent: "flex-end",
  },
  logo: {
    width: 140,
    height: 45,
    objectFit: "contain",
  },
  companyInfo: {
    alignItems: "center",
  },
  companyDetail: {
    fontSize: 8,
    color: "#000000",
    marginBottom: 2,
  },

  // Título y número de contrato
  titleSection: {
    marginTop: 20,
  },
  titleRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 25,
  },
  invoiceLabel: {
    fontSize: 36,
    fontWeight: "bold",
    color: "#000000",
    marginRight: 15,
  },
  invoiceNumber: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#000000",
    backgroundColor: "#fdef00",
    paddingVertical: 8,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  metaInfo: {
    flexDirection: "row",
    gap: 15,
    marginTop: 10,
  },
  metaItem: {
    flexDirection: "row",
  },
  metaLabel: {
    fontSize: 10,
    fontWeight: "bold",
    color: "#000000",
    marginRight: 8,
  },
  metaValue: {
    fontSize: 10,
    color: "#000000",
  },

  // Secciones de contenido
  contentSection: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 11,
    fontWeight: "bold",
    color: "#000000",
    marginBottom: 12,
    textTransform: "uppercase",
    letterSpacing: 0.5,
  },

  // Info grid
  infoGrid: {
    flexDirection: "row", // 👈 IMPORTANTE: row para crear columnas
    flexWrap: "wrap",
    gap: 6,
  },
  infoColumn: {
    width: "48%", // 👈 Cada columna ocupa 48% (2 columnas)
    flexDirection: "column", // 👈 Dentro de cada columna, stack vertical
    gap: 6,
  },
  infoColumn2: {
    width: "32%", // 👈 Cada columna ocupa 48% (2 columnas)
    flexDirection: "column", // 👈 Dentro de cada columna, stack vertical
    gap: 6,
  },
  infoItem: {
    flexDirection: "row",
    fontSize: 9,
    marginBottom: 4,
  },
  infoItemFull: {
    flexDirection: "row",
    width: "100%", // 👈 Ocupa las 2 columnas
    fontSize: 9,
  },
  label: {
    fontWeight: "bold",
    color: "#000000",
    width: 100,
  },
  value: {
    color: "#494e51",
    flex: 1,
  },

  // Informe técnico
  technicalInfo: {
    flexDirection: "column",
    gap: 12,
  },
  techItem: {
    marginBottom: 8,
  },
  techTitle: {
    fontSize: 10,
    fontWeight: "bold",
    color: "#000000",
    marginBottom: 5,
  },
  techText: {
    fontSize: 10,
    color: "#494e51",
    lineHeight: 1.6,
    whiteSpace: "pre-wrap",
  },

  // Tabla
  table: {
    marginTop: 10,
  },
  tableHeader: {
    flexDirection: "row",
    backgroundColor: "#f8f9fa",
    borderBottom: "2px solid #dee2e6",
    paddingVertical: 10,
    paddingHorizontal: 8,
  },
  tableHeaderText: {
    fontSize: 9,
    fontWeight: "bold",
    color: "#000000",
    textTransform: "uppercase",
  },
  tableRow: {
    flexDirection: "row",
    borderBottom: "1px solid #e9ecef",
    paddingVertical: 10,
    paddingHorizontal: 8,
  },
  tableCol1: {
    width: "50%",
    fontSize: 9,
    color: "#000000",
  },
  tableCol2: {
    width: "15%",
    fontSize: 9,
    color: "#000000",
    textAlign: "center",
  },
  tableCol3: {
    width: "17.5%",
    fontSize: 9,
    color: "#000000",
    textAlign: "right",
  },
  tableCol4: {
    width: "17.5%",
    fontSize: 9,
    color: "#000000",
    textAlign: "right",
    fontWeight: "bold",
  },

  // Totales
  totalsSection: {
    marginTop: 20,
    alignItems: "flex-end",
  },
  totalRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: 220,
    paddingVertical: 6,
    paddingHorizontal: 12,
    marginBottom: 5,
  },
  totalLabel: {
    fontSize: 10,
    color: "#6c757d",
  },
  totalValue: {
    fontSize: 10,
    fontWeight: "bold",
    color: "#000000",
  },
  totalFinalRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: 220,
    paddingVertical: 10,
    paddingHorizontal: 12,
    backgroundColor: "#000000",
    borderRadius: 4,
  },
  totalFinalLabel: {
    fontSize: 12,
    fontWeight: "bold",
    color: "#ffffff",
  },
  totalFinalValue: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#fdb913",
  },

  // Términos y condiciones
  termsSection: {
    marginTop: 25,
    padding: 15,
    backgroundColor: "#fffbf0",
    borderLeft: "4px solid #fdb913",
    borderRadius: 4,
  },
  termsTitle: {
    fontSize: 10,
    fontWeight: "bold",
    color: "#000000",
    marginBottom: 8,
  },
  termsText: {
    fontSize: 9,
    color: "#6c757d",
    lineHeight: 1.6,
  },

  // Footer info
  footerInfo: {
    marginTop: 25,
    padding: 15,
    backgroundColor: "#f8f9fa",
    borderRadius: 6,
  },
  footerTitle: {
    fontSize: 11,
    fontWeight: "bold",
    color: "#000000",
    marginBottom: 8,
  },
  footerText: {
    fontSize: 8,
    color: "#6c757d",
    lineHeight: 1.5,
    marginBottom: 3,
  },
});

interface MyDocumentProps {
  quotation?: any;
}

export const MyDocument = ({ quotation }: MyDocumentProps) => {
  const defaultQuotation = {
    createAt: { toDate: () => new Date() },
    client: {
      document: {
        type: "DNI",
        number: "12345678",
      },
      firstName: "Juan",
      paternalSurname: "Pérez",
      maternalSurname: "García",
      phone: {
        prefix: "+51",
        number: "987654321",
      },
      email: "juan.perez@example.com",
      address: "Av. Principal 123, Lima",
    },
    device: {
      type: "laptop",
      brand: "HP",
      model: "Pavilion 15",
      serialNumber: "ABC123XYZ",
      color: "Negro",
      condition: "Buena",
      accessories: "Cargador, mouse inalámbrico",
      ram: "8GB DDR4",
      processor: "Intel Core i5 10th Gen",
      operationSystem: "Windows 11",
    },
    reportedIssue:
      "No enciende la pantalla al presionar el botón de encendido. Se escucha el ventilador funcionando pero no hay imagen.",
    analysis:
      "Se detectó falla en la tarjeta gráfica integrada. Después de realizar pruebas con monitor externo, se confirma que el problema es en la GPU y no en la pantalla LCD.",
    solutionAndRecommendations:
      "Reemplazo de tarjeta gráfica integrada. Se recomienda realizar mantenimiento preventivo y limpieza interna para evitar futuros sobrecalentamientos.",
    quotationDetails: [
      {
        description: "Tarjeta gráfica integrada compatible con HP Pavilion 15",
        quantity: 1,
        unitPrice: 250.0,
        subTotal: 250.0,
      },
      {
        description: "Mano de obra - Desmontaje, instalación y pruebas",
        quantity: 1,
        unitPrice: 80.0,
        subTotal: 80.0,
      },
      {
        description: "Pasta térmica de alta calidad",
        quantity: 1,
        unitPrice: 15.0,
        subTotal: 15.0,
      },
    ],
  };

  const data = quotation || defaultQuotation;

  const subtotal =
    data?.quotationDetails?.reduce(
      (sum: number, item: any) => sum + item.subTotal,
      0
    ) || 0;
  const igv = subtotal * 0.18;
  const total = subtotal + igv;

  const getDeviceType = (type: string) => {
    const types: any = {
      laptop: "Laptop",
      desktop: "Desktop",
      tablet: "Tablet",
      phone: "Teléfono",
    };
    return types[type] || type;
  };

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.topDecoration} fixed>
          <Svg viewBox="0 0 595 200" style={{ width: "100%", height: "100%" }}>
            <Path d="M 0 0 L 280 0 L 0 200 Z" fill="#feca57" opacity="0.9" />
            <Path d="M 0 0 L 200 0 L 0 140 Z" fill="#fdb913" opacity="0.95" />
            <Path d="M 0 0 L 120 0 L 0 85 Z" fill="#f39c12" />
          </Svg>
        </View>

        <View style={styles.headerSection}>
          <View style={styles.headerTop}>
            <View style={styles.companyInfo}>
              <Image style={styles.logo} src="/logo-servitec.png" />
              <Text style={styles.companyDetail}>
                Néstor Bermúdez 113, Chorrillos, Lima, Perú
              </Text>
              <Text style={styles.companyDetail}>Tel: 972252744</Text>
            </View>
          </View>

          <View style={styles.titleSection}>
            <View style={styles.titleRow}>
              <Text style={styles.invoiceLabel}>COTIZACIÓN</Text>
              <Text style={styles.invoiceNumber}>
                #{dayjs(data.createAt.toDate()).format("DDMMYYYYHHmm")}
              </Text>
            </View>
          </View>
        </View>

        {/* Contenido */}

        {/* Datos del Cliente */}
        <View style={styles.contentSection}>
          <Text style={styles.sectionTitle}>Datos del Cliente</Text>
          <View style={styles.infoGrid}>
            {/* Columna 1 */}
            <View style={styles.infoColumn}>
              <View style={styles.infoItem}>
                <Text style={styles.label}>Fecha:</Text>
                <Text style={styles.value}>
                  {dayjs(data.createAt.toDate()).format("DD/MM/YYYY HH:mm")}
                </Text>
              </View>
              <View style={styles.infoItem}>
                <Text style={styles.label}>N° de Contrato:</Text>
                <Text style={styles.value}>
                  {dayjs(data.createAt.toDate()).format("DDMMYYYYHHmm")}
                </Text>
              </View>
              <View style={styles.infoItem}>
                <Text style={styles.label}>Teléfono:</Text>
                <Text style={styles.value}>
                  {data?.client?.phone?.prefix} {data?.client?.phone?.number}
                </Text>
              </View>
            </View>

            <View style={styles.infoColumn}>
              <View style={styles.infoItem}>
                <Text style={styles.label}>Apellidos y Nombres:</Text>
                <Text style={styles.value}>
                  {data?.client?.firstName} {data?.client?.paternalSurname}{" "}
                  {data?.client?.maternalSurname}
                </Text>
              </View>
              <View style={styles.infoItem}>
                <Text style={styles.label}>Documento:</Text>
                <Text style={styles.value}>
                  {data?.client?.document?.type} -{" "}
                  {data?.client?.document?.number}
                </Text>
              </View>
              <View style={styles.infoItem}>
                <Text style={styles.label}>Correo:</Text>
                <Text style={styles.value}>{data?.client?.email}</Text>
              </View>
            </View>

            {/* Dirección - Ancho completo */}
            <View style={styles.infoItemFull}>
              <Text style={styles.label}>Dirección:</Text>
              <Text style={styles.value}>{data?.client?.address}</Text>
            </View>
          </View>
        </View>

        {/* Datos del Dispositivo */}
        <View style={styles.contentSection}>
          <Text style={styles.sectionTitle}>Datos del Dispositivo</Text>
          <View style={styles.infoGrid}>
            <View style={styles.infoColumn2}>
              <View style={styles.infoItem}>
                <Text style={styles.label}>Tipo:</Text>
                <Text style={styles.value}>
                  {getDeviceType(data?.device?.type)}
                </Text>
              </View>
              <View style={styles.infoItem}>
                <Text style={styles.label}>Color:</Text>
                <Text style={styles.value}>{data?.device?.color}</Text>
              </View>
              {data?.device?.ram && (
                <View style={styles.infoItem}>
                  <Text style={styles.label}>RAM:</Text>
                  <Text style={styles.value}>{data?.device?.ram}</Text>
                </View>
              )}
              <View style={styles.infoItem}>
                <Text style={styles.label}>Marca:</Text>
                <Text style={styles.value}>{data?.device?.brand}</Text>
              </View>
            </View>

            <View style={styles.infoColumn2}>
              <View style={styles.infoItem}>
                <Text style={styles.label}>Condición:</Text>
                <Text style={styles.value}>{data?.device?.condition}</Text>
              </View>
              {data?.device?.processor && (
                <View style={styles.infoItem}>
                  <Text style={styles.label}>Procesador:</Text>
                  <Text style={styles.value}>{data?.device?.processor}</Text>
                </View>
              )}
              <View style={styles.infoItem}>
                <Text style={styles.label}>Modelo:</Text>
                <Text style={styles.value}>{data?.device?.model}</Text>
              </View>
            </View>

            <View style={styles.infoColumn2}>
              <View style={styles.infoItem}>
                <Text style={styles.label}>Serie:</Text>
                <Text style={styles.value}>{data?.device?.serialNumber}</Text>
              </View>
              {data?.device?.operationSystem && (
                <View style={styles.infoItem}>
                  <Text style={styles.label}>S.O:</Text>
                  <Text style={styles.value}>
                    {data?.device?.operationSystem}
                  </Text>
                </View>
              )}
              {data?.device?.accessories && (
                <View style={styles.infoItemFull}>
                  <Text style={styles.label}>Accesorios:</Text>
                  <Text style={styles.value}>{data?.device?.accessories}</Text>
                </View>
              )}
            </View>
          </View>
        </View>

        {/* Informe Técnico */}
        <View style={styles.contentSection}>
          <Text style={styles.sectionTitle}>Informe Técnico</Text>
          <View style={styles.technicalInfo}>
            <View style={styles.techItem}>
              <Text style={styles.techTitle}>Problema que presenta:</Text>
              <Html
                resetStyles
                stylesheet={{
                  ul: {
                    marginLeft: 14, // sangría general de la lista
                    paddingLeft: 0,
                  },
                  ol: {
                    marginLeft: 14,
                    paddingLeft: 0,
                  },
                  li: {
                    fontSize: 10,
                    color: "#494e51",
                    lineHeight: 1.5,
                    marginBottom: 3,
                    paddingLeft: 10, // un pelín más de espacio interno
                  },
                  p: {
                    fontSize: 10,
                    color: "#494e51",
                    lineHeight: 1.5,
                  },
                  span: {
                    fontSize: 10,
                    color: "#494e51",
                  },
                }}
              >
                {data?.reportedIssue}
              </Html>
            </View>
            <View style={styles.techItem}>
              <Text style={styles.techTitle}>Análisis:</Text>
              <Html
                resetStyles
                stylesheet={{
                  ul: {
                    marginLeft: 14, // sangría general de la lista
                    paddingLeft: 0,
                  },
                  ol: {
                    marginLeft: 14,
                    paddingLeft: 0,
                  },
                  li: {
                    fontSize: 10,
                    color: "#494e51",
                    lineHeight: 1.5,
                    marginBottom: 3,
                    paddingLeft: 10, // un pelín más de espacio interno
                  },
                  p: {
                    fontSize: 10,
                    color: "#494e51",
                    lineHeight: 1.5,
                  },
                  span: {
                    fontSize: 10,
                    color: "#494e51",
                  },
                }}
              >
                {data?.analysis}
              </Html>
            </View>
            <View style={styles.techItem}>
              <Text style={styles.techTitle}>Solución y Recomendaciones:</Text>
              <Html
                resetStyles
                stylesheet={{
                  ul: {
                    marginLeft: 14, // sangría general de la lista
                    paddingLeft: 0,
                  },
                  ol: {
                    marginLeft: 14,
                    paddingLeft: 0,
                  },
                  li: {
                    fontSize: 10,
                    color: "#494e51",
                    lineHeight: 1.5,
                    marginBottom: 3,
                    paddingLeft: 10, // un pelín más de espacio interno
                  },
                  p: {
                    fontSize: 10,
                    color: "#494e51",
                    lineHeight: 1.5,
                  },
                  span: {
                    fontSize: 10,
                    color: "#494e51",
                  },
                }}
              >
                {data?.solutionAndRecommendations}
              </Html>
            </View>
          </View>
        </View>

        {/* Detalle de la Cotización */}
        <View style={styles.contentSection}>
          <Text style={styles.sectionTitle}>Detalle de la Cotización</Text>
          <View style={styles.table}>
            <View style={styles.tableHeader}>
              <Text style={[styles.tableHeaderText, styles.tableCol1]}>
                Descripción
              </Text>
              <Text style={[styles.tableHeaderText, styles.tableCol2]}>
                Cantidad
              </Text>
              <Text style={[styles.tableHeaderText, styles.tableCol3]}>
                Precio Unit.
              </Text>
              <Text style={[styles.tableHeaderText, styles.tableCol4]}>
                Total
              </Text>
            </View>
            {data?.quotationDetails?.map((item: any, index: number) => (
              <View key={index} style={styles.tableRow}>
                <Text style={styles.tableCol1}>{item.description}</Text>
                <Text style={styles.tableCol2}>{item.quantity}</Text>
                <Text style={styles.tableCol3}>
                  S/ {item.unitPrice.toFixed(2)}
                </Text>
                <Text style={styles.tableCol4}>
                  S/ {item.subTotal.toFixed(2)}
                </Text>
              </View>
            ))}
          </View>

          <View style={styles.totalsSection}>
            <View style={styles.totalRow}>
              <Text style={styles.totalLabel}>Subtotal:</Text>
              <Text style={styles.totalValue}>S/ {subtotal.toFixed(2)}</Text>
            </View>
            <View style={styles.totalRow}>
              <Text style={styles.totalLabel}>IGV (18%):</Text>
              <Text style={styles.totalValue}>S/ {igv.toFixed(2)}</Text>
            </View>
            <View style={styles.totalFinalRow}>
              <Text style={styles.totalFinalLabel}>TOTAL</Text>
              <Text style={styles.totalFinalValue}>S/ {total.toFixed(2)}</Text>
            </View>
          </View>
        </View>

        {/* Condiciones de Pago */}
        <View style={styles.contentSection}>
          <View style={styles.termsSection}>
            <Text style={styles.termsTitle}>CONDICIONES DE PAGO</Text>
            <Text style={styles.termsText}>
              Los plazos de trabajo son los siguientes: Se cancela el{" "}
              <Text style={{ fontWeight: "bold" }}>50% del monto total</Text> al
              momento de iniciar los trabajos y el{" "}
              <Text style={{ fontWeight: "bold" }}>50% restante</Text> al
              momento de la entrega del trabajo, proyecto o reparación.
            </Text>
          </View>
        </View>

        {/* Información de Contacto */}
        <View style={styles.contentSection}>
          <View style={styles.footerInfo}>
            <Text style={styles.footerTitle}>SERVITEC HARDWARE</Text>
            <Text style={styles.footerText}>
              <Text style={{ fontWeight: "bold" }}>Dirección:</Text> Defensores
              del Morro Cdra 13, Lima 09 Chorrillos Peru / Ca. Nestor Bermudez
              113, Esquina con Av. Fernando Terans
            </Text>
            <Text style={styles.footerText}>
              <Text style={{ fontWeight: "bold" }}>Teléfono:</Text> 972252744 |{" "}
              <Text style={{ fontWeight: "bold" }}>Tel 2:</Text> 941801827
            </Text>
            <Text style={styles.footerText}>
              <Text style={{ fontWeight: "bold" }}>Correo:</Text>{" "}
              contacto@servitecperu.com / gerencia@servitecperu.com
            </Text>
            <Text style={styles.footerText}>
              <Text style={{ fontWeight: "bold" }}>RUC:</Text> 20604141240 |{" "}
              <Text style={{ fontWeight: "bold" }}>RNP:</Text> S1444296
            </Text>
            <Text style={styles.footerText}>
              <Text style={{ fontWeight: "bold" }}>N° Cuenta BCP:</Text>{" "}
              194-94698600-0-49 |{" "}
              <Text style={{ fontWeight: "bold" }}>CCI:</Text>{" "}
              002-194-194698600049-98
            </Text>
            <Text style={styles.footerText}>
              <Text style={{ fontWeight: "bold" }}>Cuenta de Retracción:</Text>{" "}
              00-014-106421
            </Text>
          </View>
        </View>

        <View style={styles.bottomDecoration} fixed>
          <Svg viewBox="0 0 595 120" style={{ width: "100%", height: "100%" }}>
            <Rect x="465" y="20" width="130" height="80" fill="#fdb913" />
            <Rect
              x="485"
              y="0"
              width="110"
              height="110"
              fill="none"
              stroke="#feca57"
              strokeWidth="6"
            />
          </Svg>
        </View>
      </Page>
    </Document>
  );
};
