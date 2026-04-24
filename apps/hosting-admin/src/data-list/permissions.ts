export const PERMISSION_LIST = {
  default: {
    label: "Predeterminados",
    actions: [
      { id: "view_home", label: "Acceso a Inicio (Dashboard)" },
      { id: "view_profile", label: "Ver mi perfil" },
      { id: "update_password", label: "Cambiar contraseña propia" },
      { id: "view_own_notifications", label: "Ver mis notificaciones" },
      { id: "view_help", label: "Centro de ayuda" },
    ],
  },
  rolesManagement: {
    label: "Roles y Permisos",
    actions: [
      { id: "roles_view", label: "Ver lista de roles" },
      { id: "roles_create", label: "Crear nuevo rol" },
      { id: "roles_edit", label: "Editar permisos de roles" },
      { id: "roles_delete", label: "Eliminar roles" },
    ],
  },
  userManagement: {
    label: "Administración de Usuarios",
    actions: [
      { id: "users_view_list", label: "Ver lista de usuarios" },
      { id: "users_create", label: "Crear nuevo usuario" },
      { id: "users_edit", label: "Editar datos de usuario" },
      { id: "users_delete", label: "Eliminar usuario" },
      { id: "users_view_attendance", label: "Ver asistencias" },
      { id: "users_export", label: "Exportar reporte (Excel/PDF)" },
    ],
  },
  attendance: {
    label: "Módulo de Asistencias",
    actions: [
      { id: "assist_mark_self", label: "Marcar entrada/salida" },
      {
        id: "assist_register_face",
        label: "Registrar datos biométricos (Rostro)",
      },
      { id: "assist_view_self", label: "Ver mi historial personal" },
      { id: "assist_view_all", label: "Ver historial de todo el personal" },
      { id: "assist_export_excel", label: "Exportar reporte (Excel/PDF)" },
      { id: "assist_manage_lunch", label: "Gestionar pedido de almuerzo" },
    ],
  },
  quotations: {
    label: "Módulo de Cotizaciones",
    actions: [
      { id: "quotes_view_all", label: "Ver lista de cotizaciones" },
      { id: "quotes_create", label: "Crear nueva cotización" },
      { id: "quotes_edit", label: "Editar cotización" },
      { id: "quotes_delete", label: "Eliminar cotización" },
      { id: "quotes_view_pdf", label: "Ver PDF" },
      { id: "quotes_send_email", label: "Enviar por correo electrónico" },
    ],
  },
  serviceRequests: {
    label: "Módulo de Solicitudes de Servicio",
    actions: [
      { id: "service_view_all", label: "Ver todas las solicitudes" },
      { id: "service_quick_view", label: "Vista rápida de solicitud" },
      { id: "service_view_details", label: "Ver detalles completos (Página)" },
      { id: "service_assign_tech", label: "Asignar/Derivar a técnico" },
      { id: "service_accept", label: "Aceptar solicitud de servicio" },
      { id: "service_delete", label: "Eliminar solicitud" },
    ],
  },
  suppliers: {
    label: "Módulo de Proveedores",
    actions: [
      { id: "suppliers_view_all", label: "Ver lista de proveedores" },
      { id: "suppliers_create", label: "Agregar nuevo proveedor" },
      { id: "suppliers_edit", label: "Editar información de proveedor" },
      { id: "suppliers_delete", label: "Eliminar proveedor" },
    ],
  },
} as const;

export const ALL_PERMISSION_IDS = Object.values(PERMISSION_LIST).flatMap(
  (category) => category.actions.map((action) => action.id)
);
