import { Col, Row, Space, Tag, Typography } from "../../../components";
import { motion } from "framer-motion";
import { CATEGORY_LABELS } from "../../../data-list";
import styled, { useTheme } from "styled-components";

const { Title, Text } = Typography;

export const RenderBubbles = ({
  handleOpenDrawer,
  entries,
  sites,
}: {
  handleOpenDrawer: (t: any) => void;
  entries: any[];
  sites: any[];
}) => {
  const theme = useTheme();

  return (
    <Row gutter={[16, 16]}>
      <Col flex="auto">
        <BubbleSandboxContainer>
          <Row
            gutter={[32, 32]}
            justify="center"
            style={{ maxWidth: "1000px" }}
          >
            {entries?.map((ticket) => {
              const site = sites?.find((s) => s.id === ticket.siteId);
              const siteLogo = site?.branding?.logo;
              const primaryColor = site?.branding?.primaryColor || "#1890ff";

              return (
                <Col key={ticket.id}>
                  <motion.div
                    layout
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                  >
                    <BubbleCircle
                      $primaryColor={primaryColor}
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
                    >
                      <BubbleFloatingBadge>
                        {CATEGORY_LABELS[ticket.category]?.label ||
                          "Sin Categoría"}
                      </BubbleFloatingBadge>
                      <LogoWrapper>
                        {siteLogo && (
                          <SiteLogoImg src={siteLogo?.url} alt="site-logo" />
                        )}
                      </LogoWrapper>
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
                              borderRadius: theme.border_radius.xs,
                              background: "rgba(0,0,0,0.35)",
                              border: "1px solid rgba(255,255,255,0.1)",
                              color: "rgba(255,255,255,0.9)",
                              fontSize: "10px",
                              padding: "1px 2px",
                              margin: 0,
                              textAlign: "center",
                              whiteSpace: "normal",
                            }}
                          >
                            {ticket.hostname}
                          </Tag>
                        </div>
                        <div style={{ marginTop: "8px" }}>
                          <Tag
                            color={
                              ticket.status === "attended" ? "blue" : "warning"
                            }
                            style={{
                              fontSize: "10px",
                              borderRadius: theme.border_radius.xs,
                              textTransform: "uppercase",
                            }}
                          >
                            {ticket.status === "attended"
                              ? "Atendido"
                              : "Pendiente"}
                          </Tag>
                        </div>
                      </div>
                    </BubbleCircle>
                  </motion.div>
                </Col>
              );
            })}
          </Row>
        </BubbleSandboxContainer>
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
                color: theme.colors.fontPrimary,
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
                color: theme.colors.fontSecondary,
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
};

export const BubbleSandboxContainer = styled.div`
  border-radius: 10px;
  padding: 60px 40px;
  display: flex;
  justify-content: center;
  min-height: 550px;
  border: 1px solid ${({ theme }) => theme.colors.border};
`;

interface BubbleCircleProps {
  $primaryColor: string;
}

export const BubbleCircle = styled(motion.div)<BubbleCircleProps>`
  width: 190px;
  height: 190px;
  border-radius: 50%;
  background: ${({ $primaryColor }) => `${$primaryColor}BF`};
  border: 3px solid ${({ $primaryColor }) => $primaryColor};
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 20px;
  text-align: center;
  position: relative;
  cursor: pointer;
  filter: drop-shadow(0 0 12px rgba(255, 255, 255, 0.03));
`;

export const BubbleFloatingBadge = styled.div`
  position: absolute;
  top: -8px;
  background: ${({ theme }) => theme.colors.bgTertiary};
  padding: 2px 14px;
  border-radius: ${({ theme }) => theme.border_radius.full};
  border: 1px solid ${({ theme }) => theme.colors.border};
  font-size: 10px;
  color: #fff;
  font-weight: 800;
  text-transform: uppercase;
  letter-spacing: 1px;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.4);
  z-index: 2;
`;

export const LogoWrapper = styled.div`
  position: relative;
  margin-bottom: 12px;
`;

export const SiteLogoImg = styled.img`
  height: 25px;
  padding: 2px;
  border-radius: 4px;
  background: white;
  z-index: 3;
`;
