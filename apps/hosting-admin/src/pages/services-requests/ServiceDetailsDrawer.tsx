import {
  Button,
  Divider,
  Drawer,
  Image,
  Space,
  Tag,
  Timeline,
  Tooltip,
  Typography,
} from "antd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircleCheck,
  faCircleInfo,
  faClock,
  faFileInvoiceDollar,
  faHistory,
  faImages,
  faMicrochip,
  faPrint,
  faShareNodes,
  faShieldHalved,
} from "@fortawesome/free-solid-svg-icons";
import styled from "styled-components";

const { Text, Title, Paragraph } = Typography;

const SectionTitle = styled(Space)`
  margin-bottom: 16px;
  width: 100%;
`;

const CostCard = styled.div`
  background: rgba(255, 255, 255, 0.02);
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 8px;
  padding: 16px;
  margin-top: 8px;
`;

const SpecItem = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 8px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.05);
  padding-bottom: 4px;
`;

export const ServiceDetailsDrawer = ({ open, onClose, data }: any) => {
  if (!data) return null;

  return (
    <Drawer
      title={
        <Space>
          <FontAwesomeIcon icon={faCircleInfo} style={{ color: "#faad14" }} />
          <span>Detalles de Solicitud {data.id}</span>
        </Space>
      }
      placement="right"
      onClose={onClose}
      open={open}
      width={480}
      extra={
        <Space>
          <Tooltip title="Imprimir Orden">
            <Button type="text" icon={<FontAwesomeIcon icon={faPrint} />} />
          </Tooltip>
          <Tooltip title="Compartir con Cliente">
            <Button
              type="text"
              icon={<FontAwesomeIcon icon={faShareNodes} />}
            />
          </Tooltip>
        </Space>
      }
    >
      {/* 1. Resumen de Estado */}
      <div style={{ marginBottom: 24 }}>
        <Tag color="gold" style={{ margin: 0, fontWeight: 700 }}>
          {data.status.toUpperCase()}
        </Tag>
        <Text type="secondary" style={{ marginLeft: 12, fontSize: 12 }}>
          Registrado el 30 de Marzo, 2026
        </Text>
      </div>

      {/* NUEVA SECCIÓN: ESPECIFICACIONES TÉCNICAS */}
      <SectionTitle>
        <FontAwesomeIcon icon={faMicrochip} style={{ color: "#8c8c8c" }} />
        <Text strong>DATOS DEL DISPOSITIVO</Text>
      </SectionTitle>
      <div style={{ marginBottom: 32 }}>
        <SpecItem>
          <Text type="secondary">Categoría</Text>
          <Text>{data.device.category || "Smartphone"}</Text>
        </SpecItem>
        <SpecItem>
          <Text type="secondary">Marca / Modelo</Text>
          <Text>
            {data.device.brand} {data.device.model}
          </Text>
        </SpecItem>
        <SpecItem>
          <Text type="secondary">Número de Serie / IMEI</Text>
          <Text code>358492XXXXX4821</Text>
        </SpecItem>
        <SpecItem>
          <Text type="secondary">Garantía Servitec</Text>
          <Tag color="blue" style={{ fontSize: "10px", margin: 0 }}>
            ACTIVA
          </Tag>
        </SpecItem>
      </div>

      {/* 2. Galería de Imágenes (Simulada) */}
      <SectionTitle>
        <FontAwesomeIcon icon={faImages} style={{ color: "#8c8c8c" }} />
        <Text strong>EVIDENCIA FOTOGRÁFICA</Text>
      </SectionTitle>

      <div style={{ marginBottom: 32 }}>
        <Image.PreviewGroup>
          <Space size={8} wrap>
            <Image
              width={100}
              height={100}
              style={{ borderRadius: 8, objectFit: "cover" }}
              src="https://images.unsplash.com/photo-1591799264318-7e6ef8ddb7ea?q=80&w=100"
            />
            <Image
              width={100}
              height={100}
              style={{ borderRadius: 8, objectFit: "cover" }}
              src="https://images.unsplash.com/photo-1556656793-062ff242b062?q=80&w=100"
            />
            <div
              style={{
                width: 100,
                height: 100,
                background: "rgba(255,255,255,0.02)",
                border: "1px dashed #444",
                borderRadius: 8,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Text type="secondary" style={{ fontSize: 10 }}>
                +2 fotos
              </Text>
            </div>
          </Space>
        </Image.PreviewGroup>
      </div>

      <Divider />

      {/* 3. Descripción Expandida */}
      <SectionTitle>
        <FontAwesomeIcon icon={faHistory} style={{ color: "#8c8c8c" }} />
        <Text strong>HISTORIAL DE ACTIVIDAD</Text>
      </SectionTitle>

      <Timeline
        items={[
          {
            color: "green",
            children: (
              <>
                <Text strong style={{ fontSize: 13 }}>
                  Solicitud Creada
                </Text>
                <br />
                <Text type="secondary" style={{ fontSize: 12 }}>
                  El cliente envió el formulario desde el Portal Web.
                </Text>
                <div style={{ marginTop: 4 }}>
                  <Text type="secondary" style={{ fontSize: 10 }}>
                    10:45 AM
                  </Text>
                </div>
              </>
            ),
          },
          {
            color: "gray",
            children: (
              <>
                <Text strong style={{ fontSize: 13 }}>
                  Notificación Enviada
                </Text>
                <br />
                <Text type="secondary" style={{ fontSize: 12 }}>
                  Se notificó automáticamente al equipo administrativo.
                </Text>
                <div style={{ marginTop: 4 }}>
                  <Text type="secondary" style={{ fontSize: 10 }}>
                    10:46 AM
                  </Text>
                </div>
              </>
            ),
          },
          {
            dot: (
              <FontAwesomeIcon
                icon={faClock}
                style={{ fontSize: "12px", color: "#faad14" }}
              />
            ),
            children: (
              <>
                <Text strong style={{ fontSize: 13 }}>
                  Pendiente de Asignación
                </Text>
                <br />
                <Text type="secondary" style={{ fontSize: 12 }}>
                  Esperando que un administrador asigne un técnico.
                </Text>
              </>
            ),
          },
        ]}
      />

      <Divider />

      {/* NUEVA SECCIÓN: PRESUPUESTO ESTIMADO */}
      <SectionTitle>
        <FontAwesomeIcon
          icon={faFileInvoiceDollar}
          style={{ color: "#8c8c8c" }}
        />
        <Text strong>PRESUPUESTO PRELIMINAR</Text>
      </SectionTitle>
      <CostCard>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginBottom: 8,
          }}
        >
          <Text type="secondary">Mano de Obra Est.</Text>
          <Text strong>S/ 45.00</Text>
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginBottom: 8,
          }}
        >
          <Text type="secondary">Repuestos (Pantalla OLED)</Text>
          <Text strong>S/ 380.00</Text>
        </div>
        <Divider
          style={{ margin: "8px 0", borderColor: "rgba(255,255,255,0.1)" }}
        />
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <Text strong style={{ color: "#faad14" }}>
            TOTAL ESTIMADO
          </Text>
          <Text strong style={{ color: "#faad14", fontSize: 16 }}>
            S/ 425.00
          </Text>
        </div>
      </CostCard>

      <Divider />

      {/* 4. Notas Adicionales */}
      <SectionTitle>
        <FontAwesomeIcon icon={faCircleCheck} style={{ color: "#8c8c8c" }} />
        <Text strong>REVISIÓN PREVIA</Text>
      </SectionTitle>
      <Paragraph style={{ color: "rgba(255,255,255,0.65)", fontSize: 13 }}>
        El cliente indica que es un equipo corporativo. Priorizar repuestos
        originales y tiempo de respuesta rápido. Requiere boleta electrónica.
      </Paragraph>

      <div
        style={{
          marginTop: 40,
          padding: "16px",
          background: "rgba(24, 144, 255, 0.05)",
          borderRadius: "8px",
          border: "1px solid rgba(24, 144, 255, 0.2)",
        }}
      >
        <Space>
          <FontAwesomeIcon icon={faShieldHalved} style={{ color: "#1890ff" }} />
          <Text style={{ fontSize: 12, color: "#1890ff" }}>
            Esta solicitud cumple con las políticas de privacidad de Servitec.
          </Text>
        </Space>
      </div>
    </Drawer>
  );
};
