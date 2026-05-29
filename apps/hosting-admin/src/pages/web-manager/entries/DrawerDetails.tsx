import {
  Avatar,
  Card,
  Col,
  ComponentContainer,
  Divider,
  Drawer,
  Radio,
  Row,
  Space,
  Tabs,
  Tag,
  Typography,
} from "../../../components";
import { CATEGORY_LABELS } from "../../../data-list";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCalendarDays,
  faEarthAmericas,
  faEnvelope,
  faPhone,
} from "@fortawesome/free-solid-svg-icons";
import dayjs from "dayjs";
import styled, { useTheme } from "styled-components";
import { Button } from "antd";
import { useEffect, useState } from "react";
import { theme } from "../../../styles";
import { faWhatsapp } from "@fortawesome/free-brands-svg-icons";
import { MessageReplyModal } from "./MessageReplyModal.tsx";
import { useModal } from "../../../providers";
import { useDevice } from "../../../hooks";

const { Text } = Typography;

export const DrawerDetails = ({
  selectedTicket,
  setOpen,
  open,
  onUpdateStatus,
}) => {
  const theme = useTheme();
  const { onShowModal, onCloseModal } = useModal();
  const { isTablet } = useDevice();

  const [localStatus, setLocalStatus] = useState<"pending" | "attended">(
    "pending"
  );
  const [isSaving, setIsSaving] = useState(false);
  const [activeTab, setActiveTab] = useState<"email" | "wsp">("email");

  useEffect(() => {
    if (selectedTicket) {
      setLocalStatus(selectedTicket.status || "pending");
    }
  }, [selectedTicket, open]);

  const handleSaveClick = async () => {
    if (!selectedTicket) return;

    setIsSaving(true);
    await onUpdateStatus(selectedTicket.id, localStatus);
    setIsSaving(false);

    setOpen(false);
  };

  const onShowSubmitMessageReplyModal = () => {
    onShowModal({
      title: "Respuesta",
      width: `${isTablet ? "90%" : "50%"}`,
      onRenderBody: () => (
        <MessageReplyModal
          entry={selectedTicket}
          clientEmail="cliente@gmail.com"
          companyEmail="contacto@servitecperu.com"
          originalSubject=""
          siteId=""
        />
      ),
    });
  };

  return (
    <Drawer
      title={<DrawerTitleText strong>Detalle del Contacto</DrawerTitleText>}
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
      {selectedTicket && (
        <Space direction="vertical" size={24} style={{ width: "100%" }}>
          <Row align="middle" gutter={16}>
            <Col>
              <Avatar
                size={64}
                src={`https://ui-avatars.com/api/?name=${selectedTicket.client.fullName}&background=random`}
              />
            </Col>
            <Col>
              <ClientTitle level={4}>
                {selectedTicket.client.fullName}
              </ClientTitle>
              <Space>
                <HostnameTag bordered={false}>
                  {selectedTicket.hostname}
                </HostnameTag>
                <CategoryTag bordered={false}>
                  {CATEGORY_LABELS[selectedTicket.category]?.label ||
                    "Sin Categoría"}
                </CategoryTag>
              </Space>
            </Col>
          </Row>
          <Divider
            style={{ borderColor: theme.colors.border, margin: "8px 0" }}
          />
          <div>
            <SectionLabelText type="secondary">
              MENSAJE RECIBIDO
            </SectionLabelText>
            <div
              style={{
                background: theme.colors.bgTertiary,
                padding: "16px",
                borderRadius: theme.border_radius.md,
                border: `1px solid ${theme.colors.border}`,
              }}
            >
              <Text style={{ color: theme.colors.fontPrimary }}>
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
                background: theme.colors.bgTertiary,
                borderColor: theme.colors.border,
              }}
            >
              <Space direction="vertical">
                <Text style={{ color: theme.colors.fontSecondary }}>
                  <FontAwesomeIcon
                    icon={faEnvelope}
                    style={{ marginRight: 8 }}
                  />{" "}
                  {selectedTicket.client.email}
                </Text>
                <Text style={{ color: theme.colors.fontSecondary }}>
                  <FontAwesomeIcon icon={faPhone} style={{ marginRight: 8 }} />{" "}
                  {selectedTicket.client.phone.number}
                </Text>
                <Text style={{ color: theme.colors.fontSecondary }}>
                  <FontAwesomeIcon
                    icon={faCalendarDays}
                    style={{ marginRight: 8 }}
                  />{" "}
                  {dayjs(selectedTicket.createAt.toDate()).format(
                    "DD/MM/YYYY HH:mm A"
                  )}
                </Text>
              </Space>
            </Card>
            <Text style={{ color: theme.colors.fontSecondary }}>
              <FontAwesomeIcon
                icon={faEarthAmericas}
                style={{ marginRight: 8, width: "14px" }}
              />
              <span style={{ color: theme.colors.fontTertiary }}>Origen:</span>{" "}
              {selectedTicket.hostname}
            </Text>
          </Space>

          <Space direction="vertical" size={8} style={{ width: "100%" }}>
            <Tabs
              activeKey={activeTab}
              onChange={(key) => setActiveTab(key as "email" | "wsp")}
              type="card"
              items={[
                {
                  key: "email",
                  label: (
                    <span>
                      <FontAwesomeIcon
                        icon={faEnvelope}
                        style={{ marginRight: 8 }}
                      />
                      Email
                    </span>
                  ),
                  children: (
                    <div style={tabContentStyle}>
                      <Button
                        type="primary"
                        size="large"
                        onClick={onShowSubmitMessageReplyModal}
                        icon={
                          <FontAwesomeIcon
                            icon={faEnvelope}
                            style={{ marginRight: 8 }}
                          />
                        }
                      >
                        Enviar respuesta
                      </Button>
                    </div>
                  ),
                },
                {
                  key: "wsp",
                  label: (
                    <span>
                      <FontAwesomeIcon
                        icon={faWhatsapp}
                        style={{ marginRight: 8 }}
                      />
                      WhatsApp
                    </span>
                  ),
                  children: (
                    <div style={tabContentStyle}>
                      <Text type="secondary">
                        Esta sección aún está en desarrollo
                      </Text>
                    </div>
                  ),
                },
              ]}
            />
          </Space>

          <ComponentContainer.group label="¿El email fue atendido?">
            <Radio.Group
              value={localStatus}
              onChange={(e) => setLocalStatus(e.target.value)}
              buttonStyle="solid"
              style={{
                width: "100%",
                display: "flex",
              }}
            >
              <Radio.Button
                value="pending"
                style={{
                  flex: 1,
                  textAlign: "center",
                  height: "40px",
                  lineHeight: "38px",
                }}
              >
                No
              </Radio.Button>
              <Radio.Button
                value="attended"
                style={{
                  flex: 1,
                  textAlign: "center",
                  height: "40px",
                  lineHeight: "38px",
                }}
              >
                Si
              </Radio.Button>
            </Radio.Group>
          </ComponentContainer.group>

          <Button
            type="primary"
            block
            size="large"
            loading={isSaving}
            onClick={handleSaveClick}
          >
            Guardar
          </Button>
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
  }
`;

export const SectionLabelText = styled(Typography.Text)`
  && {
    font-size: 12px;
    display: block;
    margin-bottom: 8px;
  }
`;

export const HostnameTag = styled(Tag)`
  && {
    background: rgba(24, 144, 255, 0.15);
    color: #1890ff;
    font-size: 11px;
    font-weight: 600;
  }
`;

export const CategoryTag = styled(Tag)`
  && {
    background: rgba(255, 87, 34, 0.15);
    color: #ff5722;
    font-size: 11px;
    font-weight: 600;
    text-transform: uppercase;
  }
`;

const tabContentStyle = {
  background: theme.colors.bgTertiary,
  padding: "16px",
  borderRadius: "0 0 8px 8px",
  border: `1px solid ${theme.colors.border}`,
  textAlign: "center" as const,
  minHeight: "80px",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
};
