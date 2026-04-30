import { useNavigate } from "react-router-dom";
import {
  Avatar,
  Button,
  Card,
  Col,
  IconAction,
  Row,
  Space,
  Tag,
  Title,
  Typography,
} from "../../../components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faGlobe, faTrash } from "@fortawesome/free-solid-svg-icons";
import { motion } from "framer-motion";
import { theme } from "../../../styles";
import { useCollectionData } from "react-firebase-hooks/firestore";
import { sitesRef } from "../../../firebase/collections";
import dayjs from "dayjs";
import { orderBy } from "lodash";

const { Text } = Typography;

export const SitesIntegration = () => {
  const navigate = useNavigate();

  const { colors } = theme;

  const [sites, sitesLoading, sitesError] = useCollectionData(
    sitesRef.where("isDeleted", "==", false)
  );

  const onAddSite = () => navigate("/web-manager/sites/new");
  const onEditSite = (id: string) => navigate(`/web-manager/sites/${id}`);
  const onDeleteSite = (id: string) => console.log("Eliminar sitio:", id);

  return (
    <Sites
      sites={sites}
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
          Agregar cliente
        </Button>
      </Col>

      <Col span={24}>
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          style={{ display: "flex", flexDirection: "column", gap: "12px" }}
        >
          {orderBy(sites, "createAt", "desc")?.map((site: any) => (
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
                    src={
                      site?.branding?.logo?.url ||
                      `https://ui-avatars.com/api/?name=${site.name}&background=random`
                    }
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
                      style={{ fontSize: "12px", color: colors.fontSecondary }}
                    >
                      <FontAwesomeIcon
                        icon={faGlobe}
                        style={{ marginRight: 8, color: colors.info }}
                      />
                      Hostname: {site.hostname}
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
                          Fecha registro:{" "}
                          {dayjs(site.createAt.toDate()).format("DD/MM/YYYY")}
                        </Text>
                      </Space>
                    </Col>
                    <Col>
                      <Space size={16}>
                        <IconAction
                          tooltipTitle="Editar"
                          onClick={() => onEditSite(site.id)}
                          icon={faEdit}
                        />
                        <IconAction
                          tooltipTitle="Ver Web"
                          onClick={() =>
                            window.open(`https://${site.hostname}`, "_blank")
                          }
                          icon={faGlobe}
                          iconStyles={{
                            color: (theme) => theme.colors.info,
                          }}
                        />
                        <IconAction
                          tooltipTitle="Eliminar"
                          onClick={() => onDeleteSite(site.id)}
                          icon={faTrash}
                          iconStyles={{
                            color: (theme) => theme.colors.error,
                          }}
                        />
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
