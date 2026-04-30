import { useNavigate } from "react-router-dom";
import {
  Avatar,
  Button,
  Card,
  Col,
  Row,
  Space,
  Tag,
  Title,
  Tooltip,
  Typography,
} from "../../../components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faGlobe, faTrashCan } from "@fortawesome/free-solid-svg-icons";
import { motion } from "framer-motion";
import { theme } from "../../../styles";

const { Text } = Typography;

export const SitesIntegration = () => {
  const navigate = useNavigate();

  const { colors } = theme;

  const onAddSite = () => navigate("/web-manager/sites/new");
  const onEditSite = (id: string) => navigate(`/web-manager/sites/${id}`);
  const onDeleteSite = (id: string) => console.log("Eliminar sitio:", id);

  return (
    <Sites
      sites={MOCK_SITES}
      colors={colors}
      onAddSite={onAddSite}
      onEditSite={onEditSite}
      onDeleteSite={onDeleteSite}
    />
  );
};

export const Sites = ({
  sites,
  colors,
  onAddSite,
  onEditSite,
  onDeleteSite,
}: any) => {
  // Extraemos las constantes del theme para mantener la legibilidad
  const { border_radius, spacing } = theme;

  return (
    <Row gutter={[16, 24]}>
      <Col
        span={24}
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Title level={2}>Sitios Conectados</Title>
        <Button type="primary" onClick={onAddSite}>
          Agregar cliente (api)
        </Button>
      </Col>

      <Col span={24}>
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          style={{ display: "flex", flexDirection: "column", gap: "12px" }}
        >
          {sites.map((site: any) => (
            <Card
              key={site.id}
              bodyStyle={{ padding: "16px" }}
              style={{
                background: colors.bgSecondary,
                border: `1px solid ${colors.border}`,
                // Usamos el color de marca del cliente para el acento lateral
                borderLeft: `4px solid ${site.branding.primaryColor}`,
                borderRadius: border_radius.md,
              }}
            >
              <Row align="middle" gutter={16}>
                <Col>
                  <Avatar
                    size={54}
                    src={`https://ui-avatars.com/api/?name=${site.name}&background=random`}
                    style={{ border: `1px solid ${colors.border}` }}
                  />
                </Col>
                <Col flex="auto">
                  <Row justify="space-between">
                    <Col>
                      <Space direction="vertical" size={0}>
                        <Text style={{ fontSize: "13px" }}>
                          <span style={{ color: colors.fontSecondary }}>
                            Cliente:{" "}
                          </span>
                          <Text strong style={{ color: colors.info }}>
                            {site.name}
                          </Text>
                        </Text>
                        <Text style={{ fontSize: "13px" }}>
                          <span style={{ color: colors.fontSecondary }}>
                            Teléfono:{" "}
                          </span>
                          <span style={{ color: colors.fontPrimary }}>
                            +51 {site.notifications.phone.number}
                          </span>
                        </Text>
                      </Space>
                    </Col>
                    <Col style={{ textAlign: "right" }}>
                      <Text style={{ fontSize: "13px" }}>
                        <span style={{ color: colors.fontSecondary }}>
                          Email Receptor:{" "}
                        </span>
                        <span style={{ color: colors.fontPrimary }}>
                          {site.notifications.mainReceiver}
                        </span>
                      </Text>
                    </Col>
                  </Row>

                  <div
                    style={{
                      margin: `${spacing.sm} 0`,
                      padding: spacing.sm,
                      background: colors.bgTertiary,
                      borderRadius: border_radius.sm,
                    }}
                  >
                    <Text
                      italic
                      style={{ fontSize: "12px", color: colors.fontSecondary }}
                    >
                      <FontAwesomeIcon
                        icon={faGlobe}
                        style={{ marginRight: 8, color: colors.info }}
                      />
                      Hostname configurado: {site.hostname}
                    </Text>
                  </div>

                  <Row justify="space-between" align="middle">
                    <Col>
                      <Space size={12}>
                        <Text
                          style={{
                            fontSize: "11px",
                            color: colors.fontTertiary,
                          }}
                        >
                          Estado SMTP:{" "}
                          <Tag
                            color={site.customSmtp ? "success" : "default"}
                            style={{
                              fontSize: "10px",
                              borderRadius: border_radius.xs,
                              background: site.customSmtp
                                ? colors.primaryAlpha
                                : colors.bgHover,
                              color: site.customSmtp
                                ? colors.success
                                : colors.fontTertiary,
                              border: "none",
                            }}
                          >
                            {site.customSmtp ? "Personalizado" : "Sistema"}
                          </Tag>
                        </Text>
                        <Text
                          style={{
                            fontSize: "11px",
                            color: colors.fontTertiary,
                          }}
                        >
                          Fecha registro: {site.createAt}
                        </Text>
                      </Space>
                    </Col>
                    <Col>
                      <Space size={16}>
                        <Tooltip title="Editar">
                          <FontAwesomeIcon
                            icon={faEdit}
                            onClick={() => onEditSite(site.id)}
                            style={{
                              color: colors.info,
                              cursor: "pointer",
                              fontSize: "16px",
                            }}
                          />
                        </Tooltip>
                        <Tooltip title="Ver Web">
                          <FontAwesomeIcon
                            icon={faGlobe}
                            onClick={() =>
                              window.open(`https://${site.hostname}`, "_blank")
                            }
                            style={{
                              color: colors.fontSecondary,
                              cursor: "pointer",
                              fontSize: "16px",
                            }}
                          />
                        </Tooltip>
                        <Tooltip title="Eliminar">
                          <FontAwesomeIcon
                            icon={faTrashCan}
                            onClick={() => onDeleteSite(site.id)}
                            style={{
                              color: colors.error,
                              cursor: "pointer",
                              fontSize: "16px",
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
    </Row>
  );
};

// Datos estáticos (Mantenidos igual para la prueba)
const MOCK_SITES = [
  {
    id: "1",
    name: "Servitec Perú",
    hostname: "servitecperu.com",
    branding: { primaryColor: "#1890ff" },
    notifications: {
      mainReceiver: "contacto@servitecperu.com",
      phone: { number: "912345678" },
    },
    customSmtp: true,
    createAt: "23/04/2026 14:20 PM",
  },
  {
    id: "2",
    name: "Alvillanta Repuestos",
    hostname: "alvillanta.pe",
    branding: { primaryColor: "#52c41a" },
    notifications: {
      mainReceiver: "ventas@alvillanta.pe",
      phone: { number: "988777666" },
    },
    customSmtp: false,
    createAt: "18/04/2026 17:03 PM",
  },
];
