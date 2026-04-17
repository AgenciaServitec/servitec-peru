export const PERMISSION_LIST = {
  default: {
    label: "Predeterminados",
    actions: [{ id: "view_profile", label: "Ver perfil" }],
  },
  userManagement: {
    label: "Administración de Usuarios",
    actions: [
      { id: "view_users", label: "Ver lista" },
      { id: "create_users", label: "Crear nuevo" },
      { id: "edit_users", label: "Editar datos" },
      { id: "delete_users", label: "Eliminar" },
    ],
  },
  attendance: {
    label: "Módulo de Asistencias",
    actions: [
      { id: "check_in_out", label: "Marcar entrada/salida" },
      { id: "view_own_history_assistance", label: "Ver historial propio" },
      { id: "view_all_history_assistance", label: "Ver historial de todos" },
      { id: "edit_attendance", label: "Corregir registros" },
      { id: "export_attendance", label: "Exportar a Excel" },
    ],
  },
  quotations: {
    label: "Módulo de Cotizaciones",
    actions: [
      { id: "view_quotations", label: "Ver lista" },
      { id: "view_own_history_quotation", label: "Ver historial propio" },
      { id: "view_all_history_quotation", label: "Ver historial de todos" },
      { id: "create_quotation", label: "Crear nuevo" },
      { id: "edit_quotation", label: "Editar información" },
      { id: "delete_quotation", label: "Eliminar información" },
      { id: "view_quotation_pdf", label: "Ver PDF" },
    ],
  },
  serviceRequests: {
    label: "Módulo de Solicitudes de Servicio",
    actions: [
      { id: "check_in_out_serviceRequest", label: "Marcar entrada/salida" },
      { id: "view_own_history_serviceRequest", label: "Ver historial propio" },
      {
        id: "view_all_history_serviceRequest",
        label: "Ver historial de todos",
      },
      {
        id: "assign_technical",
        label: "Asignar técnico",
      },
    ],
  },
  suppliers: {
    label: "Módulo de Proveedores",
    actions: [
      { id: "view_suppliers", label: "Ver lista" },
      { id: "create_supplier", label: "Ver lista" },
      { id: "edit_supplier", label: "Editar información" },
      { id: "delete_supplier", label: "Eliminar información" },
    ],
  },
  advanced: {
    label: "Configuración Avanzada",
    actions: [
      { id: "manage_roles", label: "Administrar Roles" },
      { id: "view_logs", label: "Ver Logs del Sistema" },
      { id: "system_settings", label: "Ajustes Globales" },
    ],
  },
} as const;

export const ALL_PERMISSION_IDS = Object.values(PERMISSION_LIST).flatMap(
  (category) => category.actions.map((action) => action.id)
);
