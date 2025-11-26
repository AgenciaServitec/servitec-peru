export const theme = {
  font_weight: {
    small: "400",
    medium: "500",
    large: "700",
  },
  border_radius: {
    xx_small: ".3em",
    x_small: ".5em",
    small: ".7em",
    medium: ".9em",
    large: "1em",
    x_large: "1.2em",
    xx_large: "1.4em",
    xxx_large: "1.7em",
    percentage_medium: "50%",
    percentage_full: "100%",
  },
  paddings: {
    xx_small: ".3em",
    x_small: ".5em",
    small: ".7em",
    medium: ".9em",
    large: "1em",
    x_large: "1.2em",
    xx_large: "1.4em",
    xxx_large: "1.7em",
  },
  font_sizes: {
    xxx_small: ".6em",
    xx_small: ".7em",
    x_small: ".8em",
    small: "1em",
    medium: "1.1em",
    large: "1.3em",
    x_large: "1.4em",
    xx_large: "1.6em",
    xxx_large: "1.8em",
  },
  // colors: {
  //   primary: "#FFC107",
  //   secondary: "#000000",
  //   tertiary: "#FFFFFF",
  //
  //   font1: "#333333",
  //   font2: "#E0E0E0",
  //   font3: "#007BFF",
  //
  //   success: "#0ECB81",
  //   info: "#0795FF",
  //   warning: "#FF9800",
  //   error: "#F6465D",
  //
  //   black: "#090B0D",
  //   white: "#FFFFFF",
  //   dark: "#090B0D",
  //   light: "#ECECEC",
  //   gray: "#79838C",
  // },
  colors: {
    // 🎨 IDENTIDAD SERVITEC
    primary: "#FFC107", // ⭐ Amarillo corporativo (mantener)
    primaryDark: "#FFB300", // Amarillo más oscuro para hover
    primaryLight: "#FFD54F", // Amarillo claro para backgrounds

    // 🌑 BACKGROUNDS - NEGRO PURO (SIN azul)
    secondary: "#0F0F0F", // ✨ NUEVO: Negro carbón puro
    tertiary: "#F5F5F5", // Blanco suave (mantener)

    // 📝 FUENTES - Optimizadas para contraste
    font1: "#FAFAFA", // Texto principal (blanco casi puro)
    font2: "#A1A1A1", // Texto secundario (gris medio)
    font3: "#FFC107", // Links en amarillo corporativo
    fontDisabled: "#525252", // Texto deshabilitado

    // ✅ ESTADOS - Colores vibrantes y claros
    success: "#22C55E", // Verde más vibrante
    info: "#06B6D4", // 🔄 CAMBIO: Cyan en vez de azul
    warning: "#F59E0B", // Naranja (mantener)
    error: "#EF4444", // Rojo (mantener)

    // 🎯 BACKGROUNDS ESPECÍFICOS
    bgPrimary: "#0F0F0F", // Fondo principal (negro)
    bgSecondary: "#1A1A1A", // Fondo de cards/containers
    bgTertiary: "#262626", // Fondo elevado (modals, dropdowns)
    bgHover: "#1F1F1F", // Hover states
    bgActive: "#2A2A2A", // Active states

    // 🔲 BORDES Y DIVISORES
    border: "#2A2A2A", // Bordes principales
    borderLight: "#1F1F1F", // Bordes sutiles
    borderHover: "#3F3F3F", // Bordes en hover

    // 📦 BASES - Simplificadas
    black: "#000000", // Negro puro
    white: "#FFFFFF", // Blanco puro
    dark: "#0F0F0F", // Alias de bgPrimary
    light: "#F9FAFB", // Fondos claros
    gray: "#737373", // Gris neutro
  },
} as const;
