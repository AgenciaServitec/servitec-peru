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
  useModalConfirm,
  useNotification,
} from "../../../components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEdit,
  faEnvelope,
  faExternalLinkAlt,
  faGlobe,
  faPhone,
  faPlus,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import { motion } from "framer-motion";
import { theme } from "../../../styles";
import { useCollectionData } from "react-firebase-hooks/firestore";
import { deleteSite, sitesRef } from "../../../firebase/collections";
import dayjs from "dayjs";
import { orderBy } from "lodash";
import { useDefaultFirestoreProps } from "../../../hooks";

const { Text } = Typography;

export const SitesIntegration = () => {
  const navigate = useNavigate();
  const { assignDeleteProps } = useDefaultFirestoreProps();

  const { notification } = useNotification();
  const { modalConfirm } = useModalConfirm();
  const { colors } = theme;

  const [sites, sitesLoading, sitesError] = useCollectionData(
    sitesRef.where("isDeleted", "==", false)
  );

  const onAddSite = () => navigate("/web-manager/sites/new");
  const onEditSite = (siteId: string) =>
    navigate(`/web-manager/sites/${siteId}`);

  const onDeleteSite = async (site) => {
    try {
      await deleteSite(site.id, assignDeleteProps(site));

      notification({
        type: "success",
        title: "¡Cliente Web eliminado exitosamente!",
      });
    } catch (e) {
      console.error(e);
    }
  };

  const onConfirmRemoveSite = (site): void => {
    modalConfirm({
      content: "El cliente web se eliminará",
      onOk: async () => {
        await onDeleteSite(site);
      },
    });
  };

  return (
    <Sites
      sites={sites}
      colors={colors}
      onAddSite={onAddSite}
      onEditSite={onEditSite}
      onConfirmRemoveSite={onConfirmRemoveSite}
      navigate={navigate}
    />
  );
};

export const Sites = ({
  sites,
  colors,
  onAddSite,
  onEditSite,
  onConfirmRemoveSite,
  navigate,
}: any) => {
  const { border_radius, spacing } = theme;

  return (
    <Row gutter={[16, 24]}>
      <Col span={24}>
        <Row gutter={[16, 16]} justify="space-between" align="middle">
          <Col>
            <Title level={2} style={{ margin: 0 }}>
              Sitios Conectados
            </Title>
          </Col>
          <Col>
            <Button
              type="primary"
              icon={<FontAwesomeIcon icon={faPlus} />}
              size="large"
              onClick={() => navigate("/web-manager/sites/new")}
            >
              Agregar Cliente
            </Button>
          </Col>
        </Row>
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
              style={{
                background: colors.bgSecondary,
              }}
            >
              <Row align="middle" gutter={16}>
                <Col>
                  <Avatar
                    size={64}
                    src={
                      site?.branding?.logo?.url ||
                      `https://ui-avatars.com/api/?name=${site.name}&background=random`
                    }
                    style={{
                      border: `2px solid ${site.branding?.primaryColor}`,
                      padding: "2px",
                      backgroundColor: "white",
                    }}
                  />
                </Col>
                <Col flex="auto">
                  <Row justify="space-between">
                    <Col>
                      <Title
                        level={4}
                        style={{ margin: 0, color: colors.fontPrimary }}
                      >
                        {site.name}
                      </Title>
                      <Space
                        split={
                          <span style={{ color: colors.fontTertiary }}>|</span>
                        }
                      >
                        <Text
                          style={{
                            fontSize: "12px",
                            color: colors.fontSecondary,
                          }}
                        >
                          <FontAwesomeIcon
                            icon={faPhone}
                            style={{ marginRight: 4 }}
                          />
                          +51 {site.notifications.phone.number}
                        </Text>
                        <Text
                          style={{
                            fontSize: "12px",
                            color: colors.fontSecondary,
                          }}
                        >
                          <FontAwesomeIcon
                            icon={faEnvelope}
                            style={{ marginRight: 4 }}
                          />
                          {site.notifications.mainReceiver}
                        </Text>
                      </Space>
                    </Col>
                  </Row>

                  <div
                    style={{
                      margin: `${spacing.sm} 0`,
                      padding: spacing.sm,
                      background: `${site.branding?.primaryColor}15`,
                      borderRadius: border_radius.sm,
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    <Text
                      style={{
                        fontSize: "12px",
                        color: colors.fontPrimary,
                        fontWeight: 500,
                      }}
                    >
                      <FontAwesomeIcon
                        icon={faGlobe}
                        style={{
                          marginRight: 8,
                          color: site.branding?.primaryColor,
                        }}
                      />
                      Hostname: {site.hostname}
                    </Text>
                    <Tag
                      color={site.customSmtp ? "success" : "default"}
                      style={{
                        fontSize: "10px",
                        margin: 0,
                        borderRadius: "4px",
                        border: "none",
                      }}
                    >
                      SMTP: {site.customSmtp ? "Personalizado" : "Sistema"}
                    </Tag>
                  </div>

                  <Row justify="space-between" align="middle">
                    <Col>
                      <Text
                        style={{ fontSize: "11px", color: colors.fontTertiary }}
                      >
                        Registrado el{" "}
                        {dayjs(site.createAt.toDate()).format("DD MMMM, YYYY")}
                      </Text>
                    </Col>
                    <Col>
                      <Space size="middle">
                        <IconAction
                          tooltipTitle="Editar"
                          onClick={() => onEditSite(site.id)}
                          icon={faEdit}
                        />
                        <IconAction
                          tooltipTitle="Visitar Web"
                          onClick={() => window.open(site.hostname, "_blank")}
                          icon={faExternalLinkAlt}
                          iconStyles={{ color: (theme) => theme.colors.info }}
                        />
                        <IconAction
                          tooltipTitle="Eliminar"
                          onClick={() => onConfirmRemoveSite(site)}
                          icon={faTrash}
                          iconStyles={{ color: (theme) => theme.colors.error }}
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
