import {
  Avatar,
  Col,
  Divider,
  Drawer,
  Row,
  Space,
  Tag,
  Typography,
} from "../../../components";
import { Timeline } from "antd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEarthAmericas, faEnvelope } from "@fortawesome/free-solid-svg-icons";
import { faWhatsapp } from "@fortawesome/free-brands-svg-icons";
import dayjs from "dayjs";
import styled, { useTheme } from "styled-components";

const { Text } = Typography;

export const DrawerDetails = ({
  selectedContact,
  setOpen,
  open,
  entries,
}: any) => {
  const theme = useTheme();

  const getTimelineIcon = (category: string) => {
    switch (category) {
      case "claim":
      case "complaints_book":
        return <TimelineIcon $color={theme.colors.error} icon={faEnvelope} />;
      default:
        return (
          <TimelineIcon $color={theme.colors.info} icon={faEarthAmericas} />
        );
    }
  };

  const getCategoryConfig = (category: string) => {
    switch (category) {
      case "contact":
        return { label: "CONTACTO", color: "success" };
      case "claim":
        return { label: "RECLAMO", color: "error" };
      case "suggestion":
        return { label: "SUGERENCIA", color: "processing" };
      case "complaints_book":
        return { label: "LIBRO DE RECL.", color: "error" };
      default:
        return { label: "OTRO", color: "default" };
    }
  };

  return (
    <Drawer
      title={<DrawerTitleText strong>Historial de Actividad</DrawerTitleText>}
      placement="right"
      onClose={() => setOpen(false)}
      open={open}
      width={520}
      destroyOnClose={false}
      styles={{
        body: { background: theme.colors.bgSecondary, padding: "24px" },
        header: {
          background: theme.colors.bgTertiary,
          borderBottom: `1px solid ${theme.colors.border}`,
        },
      }}
    >
      {selectedContact && (
        <Space direction="vertical" size={24} style={{ width: "100%" }}>
          <Row align="middle" gutter={16}>
            <Col>
              <Avatar
                size={54}
                src={`https://ui-avatars.com/api/?name=${encodeURIComponent(
                  selectedContact.fullName ||
                    selectedContact.firstName ||
                    "Cliente"
                )}&background=random`}
              />
            </Col>
            <Col>
              <ClientTitle level={4}>
                {selectedContact.fullName ||
                  `${selectedContact.firstName} ${selectedContact.paternalSurname}`}
              </ClientTitle>
              <Space>
                <Space wrap size={[16, 8]} style={{ marginTop: 4 }}>
                  <RoleTag bordered={false}>CLIENTE</RoleTag>

                  {selectedContact.phone && (
                    <Text
                      style={{
                        fontSize: "12px",
                        color: theme.colors.fontSecondary,
                      }}
                    >
                      <FontAwesomeIcon
                        icon={faWhatsapp}
                        style={{ marginRight: 6, color: "#25D366" }}
                      />
                      {typeof selectedContact.phone === "object"
                        ? selectedContact.phone.number
                        : selectedContact.phone}
                    </Text>
                  )}

                  {selectedContact.email && (
                    <Text
                      style={{
                        fontSize: "12px",
                        color: theme.colors.fontSecondary,
                      }}
                    >
                      <FontAwesomeIcon
                        icon={faEnvelope}
                        style={{
                          marginRight: 6,
                          color: theme.colors.fontTertiary,
                        }}
                      />
                      {selectedContact.email}
                    </Text>
                  )}
                </Space>
              </Space>
            </Col>
          </Row>

          <Divider style={{ borderColor: theme.colors.border, margin: "0" }} />

          <div>
            <SectionLabelText type="secondary" style={{ marginBottom: "20px" }}>
              Línea de tiempo de interacciones
            </SectionLabelText>

            {entries && entries.length > 0 ? (
              <TimelineContainer>
                <Timeline
                  mode="left"
                  items={entries
                    .sort(
                      (a: any, b: any) =>
                        b.createAt.toDate() - a.createAt.toDate()
                    )
                    .map((entry: any) => {
                      const catConfig = getCategoryConfig(entry.category);

                      return {
                        dot: getTimelineIcon(entry.category),
                        children: (
                          <TimelineCard>
                            <Space
                              direction="vertical"
                              size={4}
                              style={{ width: "100%" }}
                            >
                              <Row justify="space-between" align="top">
                                <Col>
                                  <Text
                                    strong
                                    style={{
                                      color: theme.colors.fontPrimary,
                                      fontSize: "13px",
                                    }}
                                  >
                                    Consulta enviada desde Web
                                  </Text>
                                </Col>
                                <Col>
                                  <Text
                                    style={{
                                      fontSize: "11px",
                                      color: theme.colors.fontTertiary,
                                    }}
                                  >
                                    {entry.createAt
                                      ? dayjs(entry.createAt.toDate()).format(
                                          "DD/MM/YYYY HH:mm"
                                        )
                                      : "Fecha desconocida"}
                                  </Text>
                                </Col>
                              </Row>

                              <Text
                                style={{
                                  color: theme.colors.fontSecondary,
                                  fontSize: "13px",
                                }}
                              >
                                {entry.message}
                              </Text>

                              <Row
                                justify="space-between"
                                align="middle"
                                style={{ marginTop: 8 }}
                              >
                                <Col>
                                  <Tag
                                    color="processing"
                                    style={{
                                      fontSize: "10px",
                                      border: "none",
                                      background: "rgba(24, 144, 255, 0.1)",
                                    }}
                                  >
                                    {entry.hostname}
                                  </Tag>
                                </Col>
                                <Col>
                                  <Space>
                                    <Tag
                                      color={catConfig.color}
                                      style={{
                                        fontSize: "10px",
                                        border: "none",
                                      }}
                                    >
                                      {catConfig.label}
                                    </Tag>
                                    <Tag
                                      color={
                                        entry.status === "attended"
                                          ? "success"
                                          : "warning"
                                      }
                                      style={{
                                        fontSize: "10px",
                                        border: "none",
                                      }}
                                    >
                                      {entry.status === "attended"
                                        ? "ATENDIDO"
                                        : "PENDIENTE"}
                                    </Tag>
                                  </Space>
                                </Col>
                              </Row>
                            </Space>
                          </TimelineCard>
                        ),
                      };
                    })}
                />
              </TimelineContainer>
            ) : (
              <Text
                style={{ color: theme.colors.fontSecondary, fontSize: "13px" }}
              >
                No hay interacciones previas registradas para este contacto.
              </Text>
            )}
          </div>
        </Space>
      )}
    </Drawer>
  );
};

export const DrawerTitleText = styled(Typography.Text)`
  && {
    color: ${(props) => props.theme.colors.fontPrimary};
    font-size: 16px;
  }
`;

export const ClientTitle = styled(Typography.Title)`
  && {
    margin: 0 !important;
    color: ${(props) => props.theme.colors.fontPrimary} !important;
    font-size: 18px !important;
  }
`;

export const SectionLabelText = styled(Typography.Text)`
  && {
    font-size: 12px;
    display: block;
    font-weight: 600;
  }
`;

export const RoleTag = styled(Tag)`
  && {
    background: rgba(24, 144, 255, 0.15);
    color: #1890ff;
    font-size: 11px;
    font-weight: 600;
    text-transform: uppercase;
  }
`;

const TimelineContainer = styled.div`
  .ant-timeline-item-tail {
    border-left: 2px solid ${(props) => props.theme.colors.border};
  }
  .ant-timeline-item-content {
    margin-left: 24px;
    padding-bottom: 24px;
  }
`;

const TimelineCard = styled.div`
  background: ${(props) => props.theme.colors.bgTertiary};
  border: 1px solid ${(props) => props.theme.colors.border};
  border-radius: ${(props) => props.theme.border_radius.md};
  padding: 12px;
  transition: all 0.2s ease;

  &:hover {
    border-color: ${(props) => props.theme.colors.primary};
    background: rgba(255, 255, 255, 0.02);
  }
`;

const TimelineIcon = styled(FontAwesomeIcon)<{ $color: string }>`
  background: ${(props) => props.theme.colors.bgSecondary};
  color: ${(props) => props.$color};
  font-size: 14px;
  padding: 4px;
  border-radius: 50%;
  border: 2px solid ${(props) => props.theme.colors.bgSecondary};
`;
