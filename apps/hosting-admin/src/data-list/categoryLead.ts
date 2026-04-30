export const CATEGORY_LABELS: Record<
  string,
  { label: string; color: string; icon?: any }
> = {
  inquiry: {
    label: "Consulta",
    color: "#1890ff", // Azul informativo
  },
  claim: {
    label: "Reclamo",
    color: "#f5222d", // Rojo de alerta
  },
  cotizacion: {
    label: "Solicitud de Cotización",
    color: "#52c41a", // Verde de oportunidad
  },
  soporte: {
    label: "Soporte Técnico",
    color: "#722ed1", // Morado técnico
  },
  otros: {
    label: "Otros Asuntos",
    color: "#8c8c8c", // Gris neutral
  },
};
