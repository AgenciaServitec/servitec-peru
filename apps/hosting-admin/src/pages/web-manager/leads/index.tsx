import React, { useRef, useState } from "react";
import {
  Avatar,
  Button,
  Card,
  Checkbox,
  Col,
  ComponentContainer,
  Divider,
  Drawer,
  IconAction,
  Radio,
  Row,
  Space,
  Tabs,
  Tag,
  Typography,
} from "../../../components";
import { motion } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCalendarDays,
  faChevronLeft,
  faChevronRight,
  faEarthAmericas,
  faEnvelope,
  faPhone,
  faRotateLeft,
  faTrashCan,
} from "@fortawesome/free-solid-svg-icons";
import { faWhatsapp } from "@fortawesome/free-brands-svg-icons";
import { useCollectionData } from "react-firebase-hooks/firestore";
import { firestore } from "../../../firebase";
import { CATEGORY_LABELS } from "../../../data-list";
import dayjs from "dayjs";
import styled, { useTheme } from "styled-components";

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

const RenderBubbles = ({
  handleOpenDrawer,
  leads,
}: {
  handleOpenDrawer: (t: any) => void;
  leads: any[];
}) => (
  <Row gutter={[16, 16]}>
    <Col flex="auto">
      <div
        style={{
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

const RenderList = ({ leads }) => (
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
      {leads?.map((ticket) => (
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
                src={`https://ui-avatars.com/api/?name=${ticket.client.fullName}&background=random`}
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
                        {ticket.client.fullName}
                      </Text>
                    </Text>
                    <Text style={{ fontSize: "13px" }}>
                      <span style={{ color: COLORS.fontSecondary }}>
                        Teléfono:{" "}
                      </span>{" "}
                      {ticket.client.phone?.number}
                    </Text>
                  </Space>
                </Col>
                <Col style={{ textAlign: "right" }}>
                  <Text style={{ fontSize: "13px" }}>
                    <span style={{ color: COLORS.fontSecondary }}>Email: </span>{" "}
                    {ticket.client.email}
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
                        {ticket.hostname}
                      </Tag>
                    </Text>
                    <Text
                      style={{
                        fontSize: "11px",
                        color: COLORS.fontTertiary,
                      }}
                    >
                      Fecha creación:{" "}
                      {dayjs(ticket.createAt.toDate()).format("DD/MM/YYYY")}
                    </Text>
                  </Space>
                </Col>
                <Col>
                  <Space>
                    <IconAction
                      tooltipTitle="WhatsApp"
                      onClick={() => ""}
                      icon={faWhatsapp}
                      iconStyles={{
                        color: "#25D366",
                      }}
                    />
                    <IconAction
                      tooltipTitle="Email"
                      href={`mailto:${ticket?.client.email}`}
                      target="_blank"
                      icon={faEnvelope}
                      iconStyles={{
                        color: "#FF5722",
                      }}
                    />
                    <IconAction
                      tooltipTitle="Llamar"
                      href={`tel:${ticket?.client.phone.number}`}
                      icon={faPhone}
                      iconStyles={{
                        color: "#1890ff",
                      }}
                    />
                    {/*<IconAction*/}
                    {/*  tooltipTitle="Calendario"*/}
                    {/*  onClick={() => ""}*/}
                    {/*  icon={faCalendarDays}*/}
                    {/*  iconStyles={{*/}
                    {/*    color: "#FFC107",*/}
                    {/*  }}*/}
                    {/*/>*/}
                    <IconAction
                      tooltipTitle="Eliminar"
                      onClick={() => ""}
                      icon={faTrashCan}
                      iconStyles={{
                        color: "#F43F5E",
                      }}
                    />
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

export const LeadsIntegration = () => {
  const [view, setView] = useState<"bubbles" | "list">("bubbles");
  const [open, setOpen] = useState(false);
  const [selectedTicket, setSelectedTicket] = useState<any>(null);
  const [selectedSite, setSelectedSite] = useState<string>("all");
  const [selectedCategory, setSelectedCategory] = useState<string>("todos");

  const theme = useTheme();

  const [leads, leadsLoading, leadsError] = useCollectionData(
    firestore.collection("leads").where("isDeleted", "==", false)
  );

  const [sites, sitesLoading, sitesError] = useCollectionData(
    firestore.collection("sites").where("isDeleted", "==", false)
  );

  const filterSites = sites
    ? [{ id: "all", name: "Todos" }, ...sites]
    : [{ id: "all", name: "Todos" }];

  const formatDate = (timestamp: any) => {
    if (!timestamp) return "-";

    const date = timestamp.toDate();

    return dayjs(date).format("DD/MM/YYYY HH:mm A");
  };

  const handleOpenDrawer = (ticket: any) => {
    setSelectedTicket(ticket);
    setOpen(true);
  };

  const handleReset = () => {
    setSelectedSite("all");
    setSelectedCategory("todos");
  };

  const filteredLeads = leads?.filter((lead: any) => {
    const matchesSite =
      selectedSite === "all" ||
      lead.hostname === sites?.find((s) => s.id === selectedSite)?.hostname;

    const matchesCategory =
      selectedCategory === "todos" ||
      lead.category?.toLowerCase() === selectedCategory.toLowerCase();

    return matchesSite && matchesCategory;
  });

  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const { scrollLeft, clientWidth } = scrollRef.current;
      const scrollTo =
        direction === "left" ? scrollLeft - 200 : scrollLeft + 200;

      scrollRef.current.scrollTo({ left: scrollTo, behavior: "smooth" });
    }
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
          Total entradas: {leads?.length}
        </Title>
      </Col>
      <Col span={24}>
        <Row gutter={[16, 16]}>
          <Col span={24}>
            <ComponentContainer.group label="Filtrar por Cliente">
              <ScrollWrapper>
                <ScrollArrow
                  className="left"
                  onClick={() => scroll("left")}
                  icon={<FontAwesomeIcon icon={faChevronLeft} size="xs" />}
                />

                <div
                  style={{
                    width: "100%",
                    overflow: "hidden",
                    maskImage:
                      "linear-gradient(to right, transparent, black 5%, black 95%, transparent 100%)",
                    WebkitMaskImage:
                      "linear-gradient(to right, transparent, black 5%, black 95%, transparent 100%)",
                  }}
                >
                  <ClientScrollContainer ref={scrollRef}>
                    {filterSites.map((client, i) => {
                      const isActive = selectedSite === client.id;
                      return (
                        <Button
                          key={client.id}
                          type="text"
                          onClick={() => setSelectedSite(client.id)}
                          style={{
                            borderRadius: 0,
                            borderRight:
                              i !== filterSites.length - 1
                                ? `1px solid ${COLORS.border}`
                                : "none",
                            backgroundColor: isActive
                              ? COLORS.bgTertiary
                              : "transparent",
                            color: isActive
                              ? COLORS.primary
                              : COLORS.fontSecondary,
                            fontWeight: isActive ? 600 : 400,
                            fontSize: "13px",
                            minWidth: "140px",
                          }}
                        >
                          {client.name}
                        </Button>
                      );
                    })}
                  </ClientScrollContainer>
                </div>

                <ScrollArrow
                  className="right"
                  onClick={() => scroll("right")}
                  icon={<FontAwesomeIcon icon={faChevronRight} size="xs" />}
                />
              </ScrollWrapper>
            </ComponentContainer.group>
          </Col>

          <Col span={24}>
            <Row gutter={[16, 16]}>
              <Col xs={24} md={12}>
                <ComponentContainer.group label="Tipo de Entrada">
                  <div
                    style={{
                      height: "40px",
                      display: "flex",
                      alignItems: "center",
                      padding: "0 12px",
                      background: COLORS.bgSecondary,
                      borderRadius: RADIUS.md,
                      border: `1px solid ${COLORS.border}`,
                    }}
                  >
                    <Radio.Group
                      value={selectedCategory}
                      onChange={(e) => setSelectedCategory(e.target.value)}
                      style={{ display: "flex", gap: "16px" }}
                    >
                      {["Todos", "Contacto", "Reclamos"].map((t) => {
                        const isSelected = selectedCategory === t.toLowerCase();
                        return (
                          <Radio
                            key={t}
                            value={t.toLowerCase()}
                            style={{
                              color: isSelected
                                ? COLORS.fontPrimary
                                : COLORS.fontSecondary,
                            }}
                          >
                            <span
                              style={{
                                fontSize: "13px",
                                fontWeight: isSelected ? 600 : 400,
                              }}
                            >
                              {t}
                            </span>
                          </Radio>
                        );
                      })}
                    </Radio.Group>
                  </div>
                </ComponentContainer.group>
              </Col>

              <Col xs={24} md={12}>
                <ComponentContainer.group label="Estado del Lead">
                  <Radio.Group
                    defaultValue="pendientes"
                    buttonStyle="solid"
                    style={{ width: "100%", display: "flex" }}
                  >
                    <Radio.Button
                      value="pendientes"
                      style={{
                        flex: 1,
                        textAlign: "center",
                        height: "40px",
                        lineHeight: "38px",
                      }}
                    >
                      Pendientes
                    </Radio.Button>
                    <Radio.Button
                      value="atendidos"
                      style={{
                        flex: 1,
                        textAlign: "center",
                        height: "40px",
                        lineHeight: "38px",
                      }}
                    >
                      Atendidos
                    </Radio.Button>
                  </Radio.Group>
                </ComponentContainer.group>
              </Col>
            </Row>
          </Col>

          <Col span={24}>
            <Row justify="end" gutter={[16, 16]}>
              <Col xs={24} sm={6} md={4}>
                <Button
                  type="primary"
                  block
                  danger
                  icon={<FontAwesomeIcon icon={faRotateLeft} />}
                  onClick={handleReset}
                >
                  Limpiar Filtros
                </Button>
              </Col>
            </Row>
          </Col>
        </Row>
      </Col>

      <Col span={24}>
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
                  leads={filteredLeads || []}
                />
              ),
            },
            {
              key: "list",
              label: "REGISTROS",
              children: <RenderList leads={filteredLeads || []} />,
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
                <Space>
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

const ClientScrollContainer = styled.div`
  display: flex;
  flex-wrap: nowrap;
  overflow-x: auto;
  overflow-y: hidden;
  width: 100%;
  min-width: 0;
  max-width: 100%;
  border: 1px solid ${COLORS.border};
  border-radius: ${RADIUS.md};
  background: ${COLORS.bgSecondary};
  -webkit-overflow-scrolling: touch;

  &::-webkit-scrollbar {
    display: none;
  }

  -ms-overflow-style: none;
  scrollbar-width: none;

  button {
    flex: 0 0 auto;
    height: 40px;
    padding: 0 20px;
    color: ${COLORS.fontSecondary};
    transition: all 0.2s ease;

    &:hover {
      color: ${COLORS.primary};
      background: rgba(255, 255, 255, 0.05);
    }
  }
`;

const ScrollWrapper = styled.div`
  position: relative;
  width: 100%;
  display: grid;
  align-items: center;
`;

const ScrollArrow = styled(Button)`
  position: absolute;
  z-index: 10;
  width: 35px !important;
  height: 35px !important;
  min-width: 35px !important;
  padding: 0 !important;
  border-radius: 50% !important;
  background: ${COLORS.bgTertiary} !important;
  border: 2px solid ${COLORS.border} !important;
  color: ${COLORS.primary} !important;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    background: ${COLORS.border} !important;
  }

  &.left {
    left: -2px;
  }
  &.right {
    right: -2px;
  }
`;
