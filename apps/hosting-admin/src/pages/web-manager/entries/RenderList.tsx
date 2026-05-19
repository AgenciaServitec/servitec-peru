import { motion } from "framer-motion";
import {
  Button,
  Card,
  Checkbox,
  Col,
  IconAction,
  Row,
  Space,
  Tag,
  Typography,
} from "../../../components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCalendarDays,
  faEnvelope,
  faPhone,
  faTrashCan,
} from "@fortawesome/free-solid-svg-icons";
import dayjs from "dayjs";
import { faWhatsapp } from "@fortawesome/free-brands-svg-icons";
import { useTheme } from "styled-components";

const { Text } = Typography;

export const RenderList = ({
  entries,
  sites,
  selectedIds,
  onSelectAll,
  onSelectItem,
  onDeleteBulk,
  onConfirmRemoveEntry,
  handleOpenDrawer,
}: {
  entries: any[];
  sites: any[];
  selectedIds: string[];
  onSelectAll: (checked: boolean) => void;
  onSelectItem: (id: string) => void;
  onDeleteBulk: () => void;
  onConfirmRemoveEntry: (entry: any) => void;
  handleOpenDrawer: (t: any) => void;
}) => {
  const theme = useTheme();

  const isAllSelected =
    entries.length > 0 && selectedIds.length === entries.length;
  const isIndeterminate =
    selectedIds.length > 0 && selectedIds.length < entries.length;

  return (
    <motion.div
      key="list"
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
    >
      <Space style={{ marginBottom: "16px" }} size="middle">
        <Button
          danger
          type="primary"
          icon={<FontAwesomeIcon icon={faTrashCan} />}
          disabled={selectedIds.length === 0}
          onClick={onDeleteBulk}
          style={{ borderRadius: theme.border_radius.sm }}
        >
          Eliminar emails ({selectedIds.length})
        </Button>

        <div
          style={{
            background: theme.colors.bgSecondary,
            padding: "4px 12px",
            borderRadius: theme.border_radius.sm,
            border: `1px solid ${theme.colors.border}`,
            display: "flex",
            alignItems: "center",
            gap: "8px",
          }}
        >
          <Checkbox
            indeterminate={isIndeterminate}
            onChange={(e) => onSelectAll(e.target.checked)}
            checked={isAllSelected}
          />
          <Text style={{ fontSize: "12px", color: theme.colors.fontSecondary }}>
            {isAllSelected
              ? "Desmarcar todos"
              : "Seleccionar todos los filtrados"}
          </Text>
        </div>
      </Space>

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "12px",
        }}
      >
        {entries?.map((ticket) => {
          const site = sites?.find((s) => s.id === ticket.siteId);
          const siteLogo = site?.branding?.logo;

          return (
            <Card
              key={ticket.id}
              bodyStyle={{ padding: "16px" }}
              style={{
                background: theme.colors.bgSecondary,
                border: `1px solid ${theme.colors.border}`,
                borderRadius: theme.border_radius.md,
              }}
            >
              <Row align="middle" gutter={16}>
                <Col>
                  <Checkbox
                    checked={selectedIds.includes(ticket.id)}
                    onChange={() => onSelectItem(ticket.id)}
                  />
                </Col>
                <Col>
                  {siteLogo && (
                    <img
                      onClick={() => handleOpenDrawer(ticket)}
                      src={siteLogo?.url}
                      alt="site-logo"
                      style={{
                        height: "35px",
                        padding: "2px",
                        borderRadius: "4px",
                        backgroundColor: "white",
                        zIndex: 3,
                        cursor: "pointer",
                      }}
                    />
                  )}
                </Col>
                <Col flex="auto">
                  <Row justify="space-between">
                    <Col>
                      <Space direction="vertical" size={0}>
                        <Text style={{ fontSize: "13px" }}>
                          <span style={{ color: theme.colors.fontSecondary }}>
                            Nombres y Apellidos:{" "}
                          </span>
                          <Text strong style={{ color: "#1890ff" }}>
                            {ticket.client.fullName}
                          </Text>
                        </Text>
                        <Text style={{ fontSize: "13px" }}>
                          <span style={{ color: theme.colors.fontSecondary }}>
                            Teléfono:{" "}
                          </span>{" "}
                          {ticket.client.phone?.number}
                        </Text>
                      </Space>
                    </Col>
                    <Col style={{ textAlign: "right" }}>
                      <Text style={{ fontSize: "13px" }}>
                        <span style={{ color: theme.colors.fontSecondary }}>
                          Email:{" "}
                        </span>{" "}
                        {ticket.client.email}
                      </Text>
                    </Col>
                  </Row>

                  <div
                    style={{
                      margin: "8px 0",
                      padding: "8px",
                      background: theme.colors.bgTertiary,
                      borderRadius: theme.border_radius.sm,
                    }}
                  >
                    <Text
                      style={{
                        fontSize: "12px",
                        color: theme.colors.fontSecondary,
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
                            color: theme.colors.fontTertiary,
                          }}
                        >
                          Estado:{" "}
                          <Tag
                            color={
                              ticket.status === "attended" ? "blue" : "warning"
                            }
                            style={{
                              fontSize: "10px",
                              borderRadius: "4px",
                              textTransform: "uppercase",
                            }}
                          >
                            {ticket.status === "attended"
                              ? "Atendido"
                              : "Pendiente"}
                          </Tag>
                        </Text>
                        <Text
                          style={{
                            fontSize: "11px",
                            color: theme.colors.fontTertiary,
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
                            color: theme.colors.fontTertiary,
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
                          href={`https://wa.me/${ticket.client.phone.prefix.replace("+", "")}${ticket.client.phone.number}`}
                          target="_blank"
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
                            color: theme.colors.warning,
                          }}
                        />
                        <IconAction
                          tooltipTitle="Llamar"
                          href={`tel:${ticket?.client.phone.number}`}
                          target="_blank"
                          icon={faPhone}
                          iconStyles={{
                            color: theme.colors.info,
                          }}
                        />
                        <IconAction
                          tooltipTitle="Historial"
                          onClick={() => ""}
                          icon={faCalendarDays}
                          iconStyles={{
                            color: theme.colors.primary,
                          }}
                        />
                        <IconAction
                          tooltipTitle="Eliminar"
                          onClick={() => onConfirmRemoveEntry(ticket)}
                          icon={faTrashCan}
                          iconStyles={{
                            color: theme.colors.error,
                          }}
                        />
                      </Space>
                    </Col>
                  </Row>
                </Col>
              </Row>
            </Card>
          );
        })}
      </div>
    </motion.div>
  );
};
