import { useState } from "react";
import {
  Avatar,
  Button,
  Card,
  Checkbox,
  Col,
  Divider,
  Drawer,
  Radio,
  Row,
  Space,
  Tabs,
  Tag,
  Tooltip,
  Typography,
} from "../../components";
import { motion } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCalendarDays,
  faEarthAmericas,
  faEnvelope,
  faPhone,
  faRotateLeft,
  faTrashCan,
} from "@fortawesome/free-solid-svg-icons";
import { faWhatsapp } from "@fortawesome/free-brands-svg-icons";
import { useCollectionData } from "react-firebase-hooks/firestore";
import { firestore } from "../../firebase";
import { CATEGORY_LABELS } from "../../data-list";
import dayjs from "dayjs";

const { Title, Text } = Typography;

const mode: "dark" | "light" = "dark";
const COLORS =
  mode === "dark"
    ? {
        primary: "#FFC107",
        bgPrimary: "#000000",
        bgSecondary: "#0A0A0A",
        bgTertiary: "#121212",
        fontPrimary: "#EDEDED",
        fontSecondary: "#A0A0A0",
        fontTertiary: "#666666",
        border: "#1F1F1F",
        divider: "#141414",
        success: "#28a745",
        accent: "#28a745",
      }
    : {
        primary: "#FFC107",
        bgPrimary: "#FFFFFF",
        bgSecondary: "#FAFAFA",
        bgTertiary: "#F5F5F5",
        fontPrimary: "#111111",
        fontSecondary: "#666666",
        fontTertiary: "#8E8E8E",
        border: "#E5E5E5",
        divider: "#F0F0F0",
      };

const RADIUS = {
  sm: "6px",
  md: "8px",
  lg: "12px",
  full: "9999px",
};

const MOCK_TICKETS = [
  {
    id: 1,
    name: "Dustin",
    email: "dustin.calderon@gmail.com",
    phone: "+51 915261878",
    message:
      "The most prepared business owners all have one thing in common. They already know their number...",
    date: "23/04/2026 14:20 PM",
    site: "venta-llantas.com",
    logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR6A7p8PzB6-Y8Tz4L0j8-984_H1hC_4901Vw&s",
  },
  {
    id: 2,
    name: "Brayan Felipe Belicoso Concepción",
    email: "belicosoconcepcionb@gmail.com",
    phone: "+51 993558304",
    message:
      "Solicito comunicarme con un agente de asesoría sobre una solicitud de carta de convenio.",
    date: "18/04/2026 17:03 PM",
    site: "cobiene-352004.web.app",
    logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRLSgIeLskK7Z4vLwWk_B_H2U3S7Y8C-n6oIg&s",
  },
];

const CLIENTS = [
  "Todos",
  "Agencia servitec",
  "All in one",
  "Alquiler proyectores",
  "Alvillanta",
  "Avc llantas",
];

const RenderBubbles = ({
  handleOpenDrawer,
  leads,
}: {
  handleOpenDrawer: (t: any) => void;
  leads: any[];
}) => (
  <Row gutter={[24, 0]} align="top">
    <Col flex="auto">
      <div
        style={{
          background: mode === "dark" ? "#0A0A0A" : "#F5F5F5",
          borderRadius: "10px",
          padding: "60px 40px",
          display: "flex",
          justifyContent: "center",
          minHeight: "550px",
          border: `1px solid ${COLORS.border}`,
        }}
      >
        <Row gutter={[32, 32]} justify="center" style={{ maxWidth: "1000px" }}>
          {leads?.map((ticket) => (
            <Col key={ticket.id}>
              <motion.div
                layout
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
              >
                <motion.div
                  onClick={() => handleOpenDrawer(ticket)}
                  animate={{ y: [0, -6, 0] }}
                  transition={{
                    y: {
                      repeat: Infinity,
                      duration: 3,
                      ease: "easeInOut",
                    },
                  }}
                  whileHover={{ scale: 1.05, y: -10 }}
                  style={{
                    width: "190px",
                    height: "190px",
                    borderRadius: "50%",
                    background: COLORS?.accent,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    padding: "20px",
                    textAlign: "center",
                    position: "relative",
                    cursor: "pointer",
                    border: "1px solid rgba(255,255,255,0.2)",
                    filter: "drop-shadow(0 0 12px rgba(255,255,255,0.03))",
                  }}
                >
                  <div
                    style={{
                      position: "absolute",
                      top: "-8px",
                      background: COLORS.bgTertiary,
                      padding: "2px 14px",
                      borderRadius: RADIUS.full,
                      border: `1px solid ${COLORS.border}`,
                      fontSize: "10px",
                      color: "#fff",
                      fontWeight: 800,
                      textTransform: "uppercase",
                      letterSpacing: "1px",
                      boxShadow: "0 8px 16px rgba(0,0,0,0.4)",
                      zIndex: 2,
                    }}
                  >
                    {CATEGORY_LABELS[ticket.category]?.label || "Sin Categoría"}
                  </div>
                  <div style={{ position: "relative", marginBottom: "12px" }}>
                    <Avatar
                      size={60}
                      src={`https://ui-avatars.com/api/?name=${ticket.client.firstName}&background=random`}
                      style={{
                        border: "3px solid rgba(255,255,255,0.8)",
                        boxShadow: "0 4px 12px rgba(0,0,0,0.2)",
                        background: "white",
                      }}
                    />
                    <span
                      style={{
                        position: "absolute",
                        bottom: 2,
                        right: 2,
                        width: 12,
                        height: 12,
                        background: COLORS?.success,
                        borderRadius: "50%",
                        border: `2px solid ${COLORS?.accent}`,
                        boxShadow: `0 0 10px ${COLORS?.success}`,
                      }}
                    />
                  </div>
                  <div style={{ width: "100%" }}>
                    <Text
                      strong
                      style={{
                        color: "white",
                        fontSize: "14px",
                        lineHeight: 1.1,
                        display: "-webkit-box",
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: "vertical",
                        overflow: "hidden",
                        textShadow: "0 2px 4px rgba(0,0,0,0.2)",
                      }}
                    >
                      {ticket.client.fullName}
                    </Text>

                    <div style={{ marginTop: "8px" }}>
                      <Tag
                        style={{
                          borderRadius: RADIUS.sm,
                          background: "rgba(0,0,0,0.35)",
                          border: "1px solid rgba(255,255,255,0.1)",
                          color: "rgba(255,255,255,0.9)",
                          fontSize: "10px",
                          padding: "0 8px",
                          margin: 0,
                        }}
                      >
                        {ticket.hostname}
                      </Tag>
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            </Col>
          ))}
        </Row>
      </div>
    </Col>

    <Col style={{ width: "240px" }}>
      <Space direction="vertical" size={24} style={{ marginTop: "24px" }}>
        <Tag
          bordered={false}
          style={{
            background: "rgba(16, 185, 129, 0.1)",
            color: "#10B981",
            fontSize: "10px",
            fontWeight: 800,
            letterSpacing: "0.5px",
            textTransform: "uppercase",
          }}
        >
          Sincronizado
        </Tag>

        <div style={{ paddingLeft: "2px" }}>
          <Title
            level={4}
            style={{
              color: COLORS.fontPrimary,
              fontWeight: 600,
              lineHeight: 1.2,
              margin: 0,
              fontSize: "20px",
            }}
          >
            Monitor de Actividad
          </Title>

          <Text
            style={{
              color: COLORS.fontSecondary,
              fontSize: "13px",
              display: "block",
              marginTop: "12px",
              lineHeight: "1.5",
            }}
          >
            Gestiona las solicitudes entrantes de tus dominios vinculados. La
            vista se actualiza automáticamente al detectar nuevas entradas.
          </Text>
        </div>
      </Space>
    </Col>
  </Row>
);

const RenderList = () => (
  <motion.div
    key="list"
    initial={{ opacity: 0, x: 20 }}
    animate={{ opacity: 1, x: 0 }}
    exit={{ opacity: 0, x: -20 }}
  >
    <Button
      danger
      icon={<FontAwesomeIcon icon={faTrashCan} />}
      disabled
      style={{ marginBottom: "16px", borderRadius: RADIUS.sm }}
    >
      Eliminar emails (0)
    </Button>

    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "12px",
      }}
    >
      {MOCK_TICKETS.map((ticket) => (
        <Card
          key={ticket.id}
          bodyStyle={{ padding: "16px" }}
          style={{
            background: COLORS.bgSecondary,
            border: `1px solid ${mode === "dark" ? COLORS.border : "#FFE4D1"}`,
            borderRadius: RADIUS.md,
          }}
        >
          <Row align="middle" gutter={16}>
            <Col>
              <Checkbox />
            </Col>
            <Col>
              <Avatar
                size={54}
                src="https://ui-avatars.com/api/?name=angel&background=random"
                style={{ border: `1px solid ${COLORS.border}` }}
              />
            </Col>
            <Col flex="auto">
              <Row justify="space-between">
                <Col>
                  <Space direction="vertical" size={0}>
                    <Text style={{ fontSize: "13px" }}>
                      <span style={{ color: COLORS.fontSecondary }}>
                        Nombres y Apellidos:{" "}
                      </span>
                      <Text strong style={{ color: "#1890ff" }}>
                        {ticket.name}
                      </Text>
                    </Text>
                    <Text style={{ fontSize: "13px" }}>
                      <span style={{ color: COLORS.fontSecondary }}>
                        Teléfono:{" "}
                      </span>{" "}
                      {ticket.phone}
                    </Text>
                  </Space>
                </Col>
                <Col style={{ textAlign: "right" }}>
                  <Text style={{ fontSize: "13px" }}>
                    <span style={{ color: COLORS.fontSecondary }}>Email: </span>{" "}
                    {ticket.email}
                  </Text>
                </Col>
              </Row>

              <div
                style={{
                  margin: "8px 0",
                  padding: "8px",
                  background: COLORS.bgTertiary,
                  borderRadius: RADIUS.sm,
                }}
              >
                <Text
                  italic
                  style={{
                    fontSize: "12px",
                    color: COLORS.fontSecondary,
                  }}
                >
                  Mensaje: {ticket.message}
                </Text>
              </div>

              <Row justify="space-between" align="middle">
                <Col>
                  <Space size={12}>
                    <Text
                      style={{
                        fontSize: "11px",
                        color: COLORS.fontTertiary,
                      }}
                    >
                      Hostname:{" "}
                      <Tag
                        color="success"
                        style={{
                          fontSize: "10px",
                          borderRadius: "4px",
                        }}
                      >
                        {ticket.site}
                      </Tag>
                    </Text>
                    <Text
                      style={{
                        fontSize: "11px",
                        color: COLORS.fontTertiary,
                      }}
                    >
                      Fecha creación: {ticket.date}
                    </Text>
                  </Space>
                </Col>
                <Col>
                  <Space size={16}>
                    <Tooltip title="WhatsApp">
                      <FontAwesomeIcon
                        icon={faWhatsapp}
                        style={{
                          color: "#25D366",
                          cursor: "pointer",
                          fontSize: "18px",
                        }}
                      />
                    </Tooltip>
                    <Tooltip title="Email">
                      <FontAwesomeIcon
                        icon={faEnvelope}
                        style={{
                          color: "#FF5722",
                          cursor: "pointer",
                          fontSize: "17px",
                        }}
                      />
                    </Tooltip>
                    <Tooltip title="Llamar">
                      <FontAwesomeIcon
                        icon={faPhone}
                        style={{
                          color: "#1890ff",
                          cursor: "pointer",
                          fontSize: "16px",
                        }}
                      />
                    </Tooltip>
                    <Tooltip title="Calendario">
                      <FontAwesomeIcon
                        icon={faCalendarDays}
                        style={{
                          color: "#FFC107",
                          cursor: "pointer",
                          fontSize: "16px",
                        }}
                      />
                    </Tooltip>
                    <Tooltip title="Eliminar">
                      <FontAwesomeIcon
                        icon={faTrashCan}
                        style={{
                          color: "#F43F5E",
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
    </div>
  </motion.div>
);

export const TicketsManagementPage = () => {
  const [view, setView] = useState<"bubbles" | "list">("bubbles");
  const [open, setOpen] = useState(false);
  const [selectedTicket, setSelectedTicket] = useState<any>(null);

  const [leads, leadsLoading, leadsError] = useCollectionData(
    firestore.collection("leads").where("isDeleted", "==", false)
  );

  const formatDate = (timestamp: any) => {
    if (!timestamp) return "-";

    const date = timestamp.toDate();

    return dayjs(date).format("DD/MM/YYYY HH:mm A");
  };

  const handleOpenDrawer = (ticket: any) => {
    setSelectedTicket(ticket);
    setOpen(true);
  };

  return (
    <Row gutter={[16, 16]}>
      <Col span={24}>
        <Title
          level={4}
          style={{
            color: COLORS.fontPrimary,
            fontWeight: 500,
          }}
        >
          Total contactos: 13
        </Title>
      </Col>
      <Col span={24}>
        <section>
          <Row
            gutter={[16, 16]}
            align="bottom"
            style={{ marginBottom: "16px" }}
          >
            <Col flex="auto">
              <Text
                style={{
                  display: "block",
                  marginBottom: "8px",
                  fontSize: "12px",
                  color: COLORS.fontSecondary,
                }}
              >
                Cliente:
              </Text>
              <Space
                wrap
                size={0}
                style={{
                  border: `1px solid ${COLORS.border}`,
                  borderRadius: RADIUS.md,
                  overflow: "hidden",
                }}
              >
                {CLIENTS.map((client, i) => (
                  <Button
                    key={client}
                    type="text"
                    style={{
                      borderRadius: 0,
                      height: "36px",
                      borderRight:
                        i !== CLIENTS.length - 1
                          ? `1px solid ${COLORS.border}`
                          : "none",
                      backgroundColor:
                        client === "Todos" ? COLORS.bgTertiary : "transparent",
                      color:
                        client === "Todos"
                          ? COLORS.primary
                          : COLORS.fontSecondary,
                      fontSize: "13px",
                    }}
                  >
                    {client}
                  </Button>
                ))}
              </Space>
            </Col>
            <Col>
              <Text
                style={{
                  display: "block",
                  marginBottom: "8px",
                  fontSize: "12px",
                  color: COLORS.fontSecondary,
                }}
              >
                Estado:
              </Text>
              <Radio.Group defaultValue="pendientes" buttonStyle="solid">
                <Radio.Button
                  value="pendientes"
                  style={{ width: 100, textAlign: "center" }}
                >
                  Pendientes
                </Radio.Button>
                <Radio.Button
                  value="atendidos"
                  style={{ width: 100, textAlign: "center" }}
                >
                  Atendidos
                </Radio.Button>
              </Radio.Group>
            </Col>
          </Row>

          <Row
            align="middle"
            style={{
              background: COLORS.bgSecondary,
              border: `1px solid ${COLORS.border}`,
              borderRadius: RADIUS.md,
              padding: "12px 16px",
            }}
          >
            <Col flex="auto">
              <Space size={24}>
                <Text style={{ fontSize: "13px", color: COLORS.fontSecondary }}>
                  Tipo:
                </Text>
                <Radio.Group defaultValue="todos">
                  {[
                    "Todos",
                    "Contacto",
                    "Solicitudes",
                    "Reclamos",
                    "Cotizaciones",
                  ].map((t) => (
                    <Radio
                      key={t}
                      value={t.toLowerCase()}
                      style={{ color: COLORS.fontPrimary }}
                    >
                      <span style={{ fontSize: "13px" }}>{t}</span>
                    </Radio>
                  ))}
                </Radio.Group>
              </Space>
            </Col>
            <Col>
              <Button
                icon={<FontAwesomeIcon icon={faRotateLeft} />}
                style={{
                  background: COLORS.bgTertiary,
                  borderColor: COLORS.border,
                  width: "160px",
                  borderRadius: RADIUS.sm,
                }}
              >
                Resetear
              </Button>
            </Col>
          </Row>
        </section>

        <Tabs
          activeKey={view}
          onChange={(key) => setView(key as "bubbles" | "list")}
          className="custom-tabs"
          items={[
            {
              key: "bubbles",
              label: "RADAR",
              children: (
                <RenderBubbles
                  handleOpenDrawer={handleOpenDrawer}
                  leads={leads}
                />
              ),
            },
            {
              key: "list",
              label: "REGISTROS",
              children: <RenderList />,
            },
          ]}
        />
      </Col>

      <Drawer
        title={
          <Text strong style={{ color: COLORS.fontPrimary, fontSize: "16px" }}>
            Detalle del Contacto
          </Text>
        }
        placement="right"
        onClose={() => setOpen(false)}
        open={open}
        width={520}
        getContainer={false}
        destroyOnClose={false}
        styles={{
          body: { background: COLORS.bgSecondary, padding: "24px" },
          header: {
            background: COLORS.bgTertiary,
            borderBottom: `1px solid ${COLORS.border}`,
          },
        }}
      >
        {selectedTicket && (
          <Space direction="vertical" size={24} style={{ width: "100%" }}>
            <Row align="middle" gutter={16}>
              <Col>
                <Avatar
                  size={64}
                  src="https://ui-avatars.com/api/?name=angel&background=random"
                />
              </Col>
              <Col>
                <Title
                  level={4}
                  style={{ margin: 0, color: COLORS.fontPrimary }}
                >
                  {selectedTicket.client.fullName}
                </Title>
                <Space size={8} style={{ marginTop: "4px" }}>
                  <Tag
                    bordered={false}
                    style={{
                      background: "rgba(24, 144, 255, 0.15)",
                      color: "#1890ff",
                      fontSize: "11px",
                      fontWeight: 600,
                    }}
                  >
                    {selectedTicket.hostname}
                  </Tag>
                  <Tag
                    bordered={false}
                    style={{
                      background: "rgba(255, 87, 34, 0.15)",
                      color: "#ff5722",
                      fontSize: "11px",
                      fontWeight: 600,
                      textTransform: "uppercase",
                    }}
                  >
                    {CATEGORY_LABELS[selectedTicket.category]?.label ||
                      "Sin Categoría"}
                  </Tag>
                </Space>
              </Col>
            </Row>
            <Divider style={{ borderColor: COLORS.border, margin: "8px 0" }} />
            <div>
              <Text
                type="secondary"
                style={{
                  fontSize: "12px",
                  display: "block",
                  marginBottom: "8px",
                }}
              >
                MENSAJE RECIBIDO
              </Text>
              <div
                style={{
                  background: COLORS.bgTertiary,
                  padding: "16px",
                  borderRadius: RADIUS.md,
                  border: `1px solid ${COLORS.border}`,
                }}
              >
                <Text style={{ color: COLORS.fontPrimary }}>
                  "{selectedTicket.message}"
                </Text>
              </div>
            </div>
            <Space direction="vertical" size={12} style={{ width: "100%" }}>
              <Text type="secondary" style={{ fontSize: "12px" }}>
                INFORMACIÓN DE CONTACTO
              </Text>
              <Card
                size="small"
                style={{
                  background: COLORS.bgTertiary,
                  borderColor: COLORS.border,
                }}
              >
                <Space direction="vertical">
                  <Text style={{ color: COLORS.fontSecondary }}>
                    <FontAwesomeIcon
                      icon={faEnvelope}
                      style={{ marginRight: 8 }}
                    />{" "}
                    {selectedTicket.client.email}
                  </Text>
                  <Text style={{ color: COLORS.fontSecondary }}>
                    <FontAwesomeIcon
                      icon={faPhone}
                      style={{ marginRight: 8 }}
                    />{" "}
                    {selectedTicket.client.phone.number}
                  </Text>
                  <Text style={{ color: COLORS.fontSecondary }}>
                    <FontAwesomeIcon
                      icon={faCalendarDays}
                      style={{ marginRight: 8 }}
                    />{" "}
                    {formatDate(selectedTicket.createAt)}
                  </Text>
                </Space>
              </Card>
              <Text style={{ color: COLORS.fontSecondary }}>
                <FontAwesomeIcon
                  icon={faEarthAmericas}
                  style={{ marginRight: 8, width: "14px" }}
                />
                <span style={{ color: COLORS.fontTertiary }}>Origen:</span>{" "}
                {selectedTicket.hostname}
              </Text>
            </Space>
            <Button
              type="primary"
              block
              icon={<FontAwesomeIcon icon={faWhatsapp} />}
              style={{
                height: "45px",
                borderRadius: RADIUS.md,
                background: "#25D366",
                border: "none",
              }}
            >
              Contactar por WhatsApp
            </Button>
          </Space>
        )}
      </Drawer>
    </Row>
  );
};
