const BASE_CONSTANTS = {
  font_weight: {
    small: "400",
    medium: "500",
    large: "700",
  },
  border_radius: {
    xx_small: "0.3em",
    x_small: "0.5em",
    small: "0.7em",
    medium: "0.9em",
    large: "1em",
    x_large: "1.2em",
    xx_large: "1.4em",
    xxx_large: "1.7em",
    percentage_medium: "50%",
    percentage_full: "100%",
  },
  paddings: {
    xx_small: "0.3em",
    x_small: "0.5em",
    small: "0.7em",
    medium: "0.9em",
    large: "1em",
    x_large: "1.2em",
    xx_large: "1.4em",
    xxx_large: "1.7em",
  },
  font_sizes: {
    xxx_small: "0.6em",
    xx_small: "0.7em",
    x_small: "0.8em",
    small: "1em",
    medium: "1.1em",
    large: "1.3em",
    x_large: "1.4em",
    xx_large: "1.6em",
    xxx_large: "1.8em",
  },
  shadows: {
    sm: "0 1px 2px 0 rgb(0 0 0 / 0.05)",
    md: "0 4px 6px -1px rgb(0 0 0 / 0.1)",
    lg: "0 10px 15px -3px rgb(0 0 0 / 0.1)",
    xl: "0 20px 25px -5px rgb(0 0 0 / 0.1)",
  },
  transitions: {
    fast: "150ms ease",
    normal: "300ms ease",
    slow: "500ms ease",
  },
} as const;

const DARK_COLORS = {
  primary: "#FFC107",
  primaryDark: "#FFB300",
  primaryLight: "#FFD54F",
  primaryAlpha: "rgba(255, 193, 7, 0.1)",

  bgPrimary: "#0A0A0A", // Fondo principal (negro más profundo)
  bgSecondary: "#141414", // Cards y containers
  bgTertiary: "#1F1F1F", // Elevados (modals, dropdowns)
  bgHover: "#252525", // Hover states
  bgActive: "#2D2D2D", // Active states
  bgInput: "#1A1A1A", // Inputs y formularios

  fontPrimary: "#FAFAFA", // Texto principal (contraste máximo)
  fontSecondary: "#A3A3A3", // Texto secundario
  fontTertiary: "#737373", // Texto terciario (hints, placeholders)
  fontDisabled: "#525252", // Texto deshabilitado
  fontLink: "#FFC107", // Links (amarillo corporativo)
  fontLinkHover: "#FFD54F", // Links hover

  success: "#22C55E",
  successBg: "rgba(34, 197, 94, 0.1)",
  info: "#06B6D4",
  infoBg: "rgba(6, 182, 212, 0.1)",
  warning: "#F59E0B",
  warningBg: "rgba(245, 158, 11, 0.1)",
  error: "#EF4444",
  errorBg: "rgba(239, 68, 68, 0.1)",

  border: "#2A2A2A",
  borderLight: "#1F1F1F",
  borderHover: "#404040",
  divider: "#262626",

  black: "#000000",
  white: "#FFFFFF",
  overlay: "rgba(0, 0, 0, 0.7)",
} as const;

const LIGHT_COLORS = {
  primary: "#FFC107",
  primaryDark: "#FFB300",
  primaryLight: "#FFF9C4",
  primaryAlpha: "rgba(255, 193, 7, 0.1)",

  bgPrimary: "#FFFFFF",
  bgSecondary: "#F9FAFB",
  bgTertiary: "#F3F4F6",
  bgHover: "#F5F5F5",
  bgActive: "#E5E5E5",
  bgInput: "#FFFFFF",

  fontPrimary: "#111827",
  fontSecondary: "#6B7280",
  fontTertiary: "#9CA3AF",
  fontDisabled: "#D1D5DB",
  fontLink: "#FFA000",
  fontLinkHover: "#FF8F00",

  success: "#10B981",
  successBg: "rgba(16, 185, 129, 0.1)",
  info: "#0891B2",
  infoBg: "rgba(8, 145, 178, 0.1)",
  warning: "#F59E0B",
  warningBg: "rgba(245, 158, 11, 0.1)",
  error: "#DC2626",
  errorBg: "rgba(220, 38, 38, 0.1)",

  border: "#E5E7EB",
  borderLight: "#F3F4F6",
  borderHover: "#D1D5DB",
  divider: "#E5E7EB",

  black: "#000000",
  white: "#FFFFFF",
  overlay: "rgba(0, 0, 0, 0.5)",
} as const;

export const getTheme = (mode: "dark" | "light" = "dark") => {
  const colors = mode === "dark" ? DARK_COLORS : LIGHT_COLORS;

  return {
    mode,
    colors,
    ...BASE_CONSTANTS,
  } as const;
};

export const theme = getTheme("dark");

export type Theme = ReturnType<typeof getTheme>;
export type ThemeMode = "dark" | "light";
export type ThemeColors = typeof DARK_COLORS;

export const getAntDesignTheme = (mode: ThemeMode = "dark") => {
  const colors = mode === "dark" ? DARK_COLORS : LIGHT_COLORS;

  return {
    token: {
      colorPrimary: colors.primary,
      colorSuccess: colors.success,
      colorWarning: colors.warning,
      colorError: colors.error,
      colorInfo: colors.info,

      colorBgContainer: colors.bgSecondary,
      colorBgElevated: colors.bgTertiary,
      colorBgLayout: colors.bgPrimary,
      colorBgSpotlight: colors.bgHover,

      colorText: colors.fontPrimary,
      colorTextSecondary: colors.fontSecondary,
      colorTextTertiary: colors.fontTertiary,
      colorTextDisabled: colors.fontDisabled,

      colorBorder: colors.border,
      colorBorderSecondary: colors.borderLight,

      controlItemBgHover: colors.bgHover,
      controlItemBgActive: colors.bgActive,

      borderRadius: 8,
      fontSize: 14,
      fontFamily:
        "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",

      boxShadow:
        mode === "dark"
          ? "0 2px 8px rgba(0, 0, 0, 0.45)"
          : "0 2px 8px rgba(0, 0, 0, 0.15)",
      boxShadowSecondary:
        mode === "dark"
          ? "0 6px 16px rgba(0, 0, 0, 0.32)"
          : "0 6px 16px rgba(0, 0, 0, 0.08)",
    },
    algorithm: mode === "dark" ? undefined : undefined,
  };
};
