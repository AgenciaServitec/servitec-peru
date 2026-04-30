import { useState } from "react";
import {
  Avatar,
  Card,
  Col,
  Drawer,
  Row,
  Space,
  Tag,
  Title,
  Tooltip,
  Typography,
} from "../../../components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBugSlash,
  faCheckCircle,
  faCircle,
  faCircleNodes,
  faClock,
  faDatabase,
  faGaugeHigh,
  faGlobe,
  faLock,
  faMagnifyingGlassChart,
  faMicrochip,
  faRotateRight,
  faShieldHalved,
  faSignal,
  faTerminal,
} from "@fortawesome/free-solid-svg-icons";
import { faGoogle } from "@fortawesome/free-brands-svg-icons";
import { motion } from "framer-motion";
import { theme } from "../../../styles";

const { Text } = Typography;

// Data estática con parámetros aumentados
const MOCK_REVIEWS = [
  {
    id: "1",
    name: "Servitec Perú",
    hostname: "servitecperu.com",
    branding: { primaryColor: "#1890ff" },
    health: {
      status: "online",
      ssl: "valid",
      sslExpiry: "45 días",
      ipAddress: "104.21.78.140",
      performance: 92,
      lastCheck: "Hace 5 minutos",
      responseTime: "240ms",
      seo: "indexado",
      firewall: "activo",
      uptime: "99.9%",
      tech: "React 18",
      apiErrors: 0,
      cpuLoad: "12%",
      dbStatus: "healthy",
    },
  },
  {
    id: "2",
    name: "Alvillanta Repuestos",
    hostname: "alvillanta.pe",
    branding: { primaryColor: "#52c41a" },
    health: {
      status: "online",
      ssl: "expiring",
      sslExpiry: "3 días",
      ipAddress: "172.67.134.21",
      performance: 75,
      lastCheck: "Hace 12 minutos",
      responseTime: "450ms",
      seo: "advertencia",
      firewall: "activo",
      uptime: "98.5%",
      tech: "WordPress",
      apiErrors: 2,
      cpuLoad: "48%",
      dbStatus: "warning",
    },
  },
  {
    id: "3",
    name: "Electro Mundo",
    hostname: "electromundo.site",
    branding: { primaryColor: "#faad14" },
    health: {
      status: "offline",
      ssl: "invalid",
      sslExpiry: "Vencido",
      ipAddress: "Unknown",
      performance: 0,
      lastCheck: "Hace 1 minuto",
      responseTime: "timeout",
      seo: "desindexado",
      firewall: "caído",
      uptime: "0.0%",
      tech: "Desconocido",
      apiErrors: "Critical",
      cpuLoad: "ERR",
      dbStatus: "disconnected",
    },
  },
];

export const ReviewsIntegration = () => {
  const { colors } = theme;
  const onRefreshReview = (id: string) => console.log("Re-escaneando:", id);

  return (
    <Reviews
      reviews={MOCK_REVIEWS}
      colors={colors}
      onRefresh={onRefreshReview}
    />
  );
};

export const Reviews = ({ reviews, colors, onRefresh }: any) => {
  const { border_radius, spacing } = theme;
  const [openLogs, setOpenLogs] = useState(false);
  const [selectedSite, setSelectedSite] = useState<any>(null);

  const handleShowLogs = (site: any) => {
    setSelectedSite(site);
    setOpenLogs(true);
  };

  return (
    <Row gutter={[16, 24]}>
      <Col span={24}>
        <Title level={2}>Revisión Técnica de Sitios</Title>
      </Col>

      <Col span={24}>
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          style={{ display: "flex", flexDirection: "column", gap: "12px" }}
        >
          {reviews.map((site: any) => (
            <Card
              key={site.id}
              bodyStyle={{ padding: "16px" }}
              style={{
                background: colors.bgSecondary,
                borderRadius: border_radius.md,
              }}
            >
              <Row align="middle" gutter={16}>
                <Col>
                  <Avatar
                    size={54}
                    icon={<FontAwesomeIcon icon={faGaugeHigh} />}
                    style={{
                      background: colors.bgTertiary,
                      border: `1px solid ${colors.border}`,
                      color:
                        site.health.status === "online"
                          ? colors.success
                          : colors.error,
                    }}
                  />
                </Col>
                <Col flex="auto">
                  <Row justify="space-between" align="top">
                    <Col>
                      <Space direction="vertical" size={0}>
                        <Space>
                          <Text
                            strong
                            style={{
                              fontSize: "15px",
                              color: colors.fontPrimary,
                            }}
                          >
                            {site.name}
                          </Text>
                          {site.health.status === "online" && (
                            <Tooltip title="Live Traffic">
                              <motion.div
                                animate={{ opacity: [0.4, 1, 0.4] }}
                                transition={{ repeat: Infinity, duration: 2 }}
                              >
                                <FontAwesomeIcon
                                  icon={faCircle}
                                  style={{
                                    color: colors.success,
                                    fontSize: "8px",
                                  }}
                                />
                              </motion.div>
                            </Tooltip>
                          )}
                        </Space>
                        <Space>
                          <Text
                            style={{
                              fontSize: "12px",
                              color: colors.fontSecondary,
                            }}
                          >
                            {site.hostname}
                          </Text>
                          <Tag
                            color="default"
                            style={{
                              fontSize: "10px",
                              borderRadius: "4px",
                              background: colors.bgTertiary,
                              color: colors.fontTertiary,
                              border: "none",
                            }}
                          >
                            {site.health.tech}
                          </Tag>
                        </Space>
                      </Space>
                    </Col>

                    <Col>
                      <Space size={20}>
                        <HealthIndicator
                          label="CPU"
                          status={
                            site.health.cpuLoad === "ERR" ? "error" : "success"
                          }
                          value={site.health.cpuLoad}
                          colors={colors}
                          icon={faMicrochip}
                        />
                        <HealthIndicator
                          label="Uptime"
                          status="success"
                          value={site.health.uptime}
                          colors={colors}
                          icon={faSignal}
                        />
                        <HealthIndicator
                          label="SEO"
                          status={
                            site.health.seo === "indexado"
                              ? "success"
                              : "warning"
                          }
                          value={site.health.seo.toUpperCase()}
                          colors={colors}
                          icon={faGoogle}
                        />
                        <HealthIndicator
                          label="Perf"
                          status={
                            site.health.performance > 80 ? "success" : "warning"
                          }
                          value={`${site.health.performance}%`}
                          colors={colors}
                          icon={faGaugeHigh}
                        />
                      </Space>
                    </Col>
                  </Row>

                  {/* Barra de Consola Técnica (Gris) */}
                  <div
                    style={{
                      margin: `${spacing.sm} 0`,
                      padding: "10px 14px",
                      background: colors.bgTertiary,
                      borderRadius: border_radius.sm,
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    <Space size={24} wrap>
                      <Tooltip title="Latencia">
                        <Text
                          style={{
                            fontSize: "11px",
                            color: colors.fontSecondary,
                          }}
                        >
                          <FontAwesomeIcon
                            icon={faClock}
                            style={{ marginRight: 6, color: colors.info }}
                          />
                          {site.health.responseTime}
                        </Text>
                      </Tooltip>
                      <Tooltip
                        title={`Certificado expira en: ${site.health.sslExpiry}`}
                      >
                        <Text
                          style={{
                            fontSize: "11px",
                            color: colors.fontSecondary,
                          }}
                        >
                          <FontAwesomeIcon
                            icon={faLock}
                            style={{
                              marginRight: 6,
                              color:
                                site.health.ssl === "valid"
                                  ? colors.success
                                  : colors.error,
                            }}
                          />
                          SSL:{" "}
                          <span style={{ color: colors.fontPrimary }}>
                            {site.health.sslExpiry}
                          </span>
                        </Text>
                      </Tooltip>
                      <Tooltip title="Firewall Status">
                        <Text
                          style={{
                            fontSize: "11px",
                            color: colors.fontSecondary,
                          }}
                        >
                          <FontAwesomeIcon
                            icon={faShieldHalved}
                            style={{
                              marginRight: 6,
                              color:
                                site.health.firewall === "activo"
                                  ? colors.success
                                  : colors.error,
                            }}
                          />
                          WAF: {site.health.firewall.toUpperCase()}
                        </Text>
                      </Tooltip>
                      <Tooltip title="Host IP">
                        <Text
                          style={{
                            fontSize: "11px",
                            color: colors.fontSecondary,
                          }}
                        >
                          <FontAwesomeIcon
                            icon={faCircleNodes}
                            style={{ marginRight: 6, color: colors.info }}
                          />
                          IP: {site.health.ipAddress}
                        </Text>
                      </Tooltip>
                    </Space>

                    <Space size={16}>
                      <Tooltip title="Base de Datos">
                        <Text
                          style={{
                            fontSize: "11px",
                            color: colors.fontSecondary,
                          }}
                        >
                          <FontAwesomeIcon
                            icon={faDatabase}
                            style={{
                              marginRight: 6,
                              color:
                                site.health.dbStatus === "healthy"
                                  ? colors.success
                                  : colors.error,
                            }}
                          />
                          DB:{" "}
                          <span
                            style={{
                              color:
                                site.health.dbStatus === "healthy"
                                  ? colors.success
                                  : colors.error,
                            }}
                          >
                            {site.health.dbStatus.toUpperCase()}
                          </span>
                        </Text>
                      </Tooltip>
                      <div
                        style={{
                          width: "1px",
                          height: "12px",
                          background: colors.border,
                        }}
                      />
                      <Tooltip title="Peticiones fallidas">
                        <Text
                          style={{
                            fontSize: "11px",
                            color: colors.fontSecondary,
                          }}
                        >
                          <FontAwesomeIcon
                            icon={faBugSlash}
                            style={{ marginRight: 6, color: colors.warning }}
                          />
                          Errores API:{" "}
                          <span
                            style={{
                              color:
                                site.health.apiErrors > 0
                                  ? colors.error
                                  : colors.success,
                            }}
                          >
                            {site.health.apiErrors}
                          </span>
                        </Text>
                      </Tooltip>
                    </Space>
                  </div>

                  <Row
                    justify="space-between"
                    align="middle"
                    style={{ marginTop: "4px" }}
                  >
                    <Col>
                      <Space size={16}>
                        <Text
                          style={{
                            fontSize: "11px",
                            color: colors.fontSecondary,
                          }}
                        >
                          <FontAwesomeIcon
                            icon={faMagnifyingGlassChart}
                            style={{ marginRight: 6, color: colors.info }}
                          />
                          Entradas Mes:{" "}
                          <Text strong style={{ color: colors.fontPrimary }}>
                            24
                          </Text>
                        </Text>
                        <Tag
                          color="default"
                          style={{
                            fontSize: "10px",
                            borderRadius: "4px",
                            border: "none",
                            background: colors.bgTertiary,
                            color: colors.success,
                          }}
                        >
                          <FontAwesomeIcon
                            icon={faCheckCircle}
                            style={{ marginRight: 4 }}
                          />
                          DNS CONECTADO
                        </Tag>
                      </Space>
                    </Col>

                    <Col>
                      <Space size={16}>
                        <Tooltip title="Terminal de Logs">
                          <FontAwesomeIcon
                            icon={faTerminal}
                            onClick={() => handleShowLogs(site)}
                            style={{
                              color: colors.fontTertiary,
                              cursor: "pointer",
                              fontSize: "13px",
                            }}
                          />
                        </Tooltip>
                        <Tooltip title="Visitar Web">
                          <FontAwesomeIcon
                            icon={faGlobe}
                            onClick={() =>
                              window.open(`https://${site.hostname}`, "_blank")
                            }
                            style={{
                              color: colors.info,
                              cursor: "pointer",
                              fontSize: "14px",
                            }}
                          />
                        </Tooltip>
                        <Tooltip title="Re-escanear">
                          <FontAwesomeIcon
                            icon={faRotateRight}
                            onClick={() => onRefresh(site.id)}
                            style={{
                              color: colors.primary,
                              cursor: "pointer",
                              fontSize: "14px",
                            }}
                          />
                        </Tooltip>
                      </Space>
                    </Col>
                  </Row>
                </Col>
              </Row>
            </Card>
          ))}
        </motion.div>
      </Col>

      {/* DRAWER DE LOGS - TERMINAL STYLE */}
      <Drawer
        title={
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              width: "100%",
            }}
          >
            <Space>
              <FontAwesomeIcon
                icon={faTerminal}
                style={{ color: colors.primary }}
              />
              <span style={{ color: colors.fontPrimary }}>
                servitec_os@root: ~/logs/{selectedSite?.hostname}
              </span>
            </Space>
            <Space>
              <Tag
                color="black"
                style={{
                  border: `1px solid ${colors.success}`,
                  color: colors.success,
                  fontSize: "10px",
                }}
              >
                LIVE_FEED
              </Tag>
            </Space>
          </div>
        }
        placement="bottom"
        onClose={() => setOpenLogs(false)}
        open={openLogs}
        height="50vh"
        bodyStyle={{ background: "#000", padding: "0", overflow: "hidden" }}
      >
        <div
          style={{
            height: "40px",
            background: "#1a1a1a",
            display: "flex",
            alignItems: "center",
            padding: "0 20px",
            gap: "20px",
            borderBottom: "1px solid #333",
          }}
        >
          <Text
            style={{
              color: colors.success,
              fontSize: "11px",
              cursor: "pointer",
            }}
          >
            ALL_LOGS
          </Text>
          <Text
            style={{
              color: colors.fontTertiary,
              fontSize: "11px",
              cursor: "pointer",
            }}
          >
            ERRORS_ONLY
          </Text>
          <Text
            style={{
              color: colors.fontTertiary,
              fontSize: "11px",
              cursor: "pointer",
            }}
          >
            NETWORK
          </Text>
        </div>
        <div
          style={{
            padding: "20px",
            fontFamily: "monospace",
            fontSize: "12px",
            lineHeight: "2",
          }}
        >
          <p style={{ color: colors.success }}>
            [2026-04-30 14:20:01]{" "}
            <span
              style={{
                background: colors.success,
                color: "#000",
                padding: "0 4px",
              }}
            >
              INFO
            </span>{" "}
            Escaneo de salud iniciado para {selectedSite?.hostname}
          </p>
          <p style={{ color: "#fff" }}>
            [2026-04-30 14:20:03]{" "}
            <span style={{ border: "1px solid #fff", padding: "0 4px" }}>
              SSL
            </span>{" "}
            Handshake TLS 1.3 exitoso. Certificado válido.
          </p>
          <p style={{ color: colors.info }}>
            [2026-04-30 14:21:10]{" "}
            <span style={{ color: colors.info }}>HTTP</span> POST /api/v1/leads
            - Origin: {selectedSite?.hostname}
          </p>
          <p style={{ color: colors.success }}>
            [2026-04-30 14:21:11]{" "}
            <span style={{ color: colors.success }}>DB</span> Registro
            insertado: lead_id_009982
          </p>

          {selectedSite?.health.apiErrors > 0 && (
            <p style={{ color: colors.error }}>
              [2026-04-30 14:25:00]{" "}
              <span
                style={{
                  background: colors.error,
                  color: "#fff",
                  padding: "0 4px",
                }}
              >
                FAIL
              </span>{" "}
              Request blocked by CORS policy - Unauthorized domain.
            </p>
          )}

          <p style={{ color: colors.fontTertiary }}>
            [2026-04-30 14:30:00]{" "}
            <span style={{ color: colors.fontTertiary }}>SYS</span>{" "}
            Sincronización completa con Firebase Firestore.
          </p>
          <div style={{ marginTop: "10px" }}>
            <span style={{ color: colors.primary }}>
              servitec-admin@console:~#{" "}
            </span>
            <motion.span
              animate={{ opacity: [1, 0] }}
              transition={{ repeat: Infinity, duration: 0.8 }}
              style={{
                borderLeft: `8px solid ${colors.primary}`,
                marginLeft: "4px",
              }}
            />
          </div>
        </div>
      </Drawer>
    </Row>
  );
};

const HealthIndicator = ({ label, status, value, colors, icon }: any) => {
  const colorMap: any = {
    success: colors.success,
    warning: colors.warning,
    error: colors.error,
  };
  return (
    <div style={{ textAlign: "center", lineHeight: "1.2" }}>
      <Text
        style={{
          fontSize: "9px",
          color: colors.fontTertiary,
          display: "block",
          textTransform: "uppercase",
          letterSpacing: "0.5px",
        }}
      >
        {label}
      </Text>
      <Text strong style={{ fontSize: "12px", color: colorMap[status] }}>
        <FontAwesomeIcon
          icon={icon || faCheckCircle}
          style={{ fontSize: "9px", marginRight: 5, verticalAlign: "middle" }}
        />
        {value}
      </Text>
    </div>
  );
};
