import { theme as antdTheme } from "antd"; // Importante para los algoritmos

const BASE_CONSTANTS = {
  font_weight: {
    small: "400",
    medium: "500",
    large: "600", // Bajamos de 700 a 600 para un look más moderno/menos pesado
  },
  border_radius: {
    xs: "4px",
    sm: "6px",
    md: "8px", // Ideal para botones e inputs
    lg: "12px", // Para Cards
    xl: "16px",
    full: "9999px",
  },
  // Usamos una escala numérica para espaciados (más escalable)
  spacing: {
    xs: "0.25rem", // 4px
    sm: "0.5rem", // 8px
    md: "1rem", // 16px
    lg: "1.5rem", // 24px
    xl: "2rem", // 32px
  },
  font_sizes: {
    xs: "0.75rem", // 12px
    sm: "0.875rem", // 14px (Base Antd)
    md: "1rem", // 16px
    lg: "1.125rem", // 18px
    xl: "1.25rem", // 20px
    xxl: "1.5rem", // 24px
    heading: "1.875rem", // 30px
  },
  // Sombras sutiles (look profesional, no "IA")
  shadows: {
    none: "none",
    sm: "0 1px 2px rgba(0, 0, 0, 0.05)",
    md: "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
    lg: "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
  },
  transitions: {
    fast: "150ms cubic-bezier(0.4, 0, 0.2, 1)",
    normal: "300ms cubic-bezier(0.4, 0, 0.2, 1)",
  },
} as const;

const DARK_COLORS = {
  primary: "#FFC107",
  primaryDark: "#FFB300",
  primaryAlpha: "rgba(255, 193, 7, 0.15)",
  bgPrimary: "#000000",
  bgSecondary: "#0A0A0A",
  bgTertiary: "#121212",
  bgHover: "#1A1A1A",

  fontPrimary: "#EDEDED",
  fontSecondary: "#A0A0A0",
  fontTertiary: "#666666",
  fontDisabled: "#404040",

  border: "#1F1F1F",
  borderHover: "#333333",
  divider: "#141414",

  success: "#10B981",
  error: "#F43F5E",
  warning: "#F59E0B",
  info: "#0EA5E9",
} as const;

const LIGHT_COLORS = {
  primary: "#FFC107",
  primaryDark: "#FFB300",
  primaryAlpha: "rgba(255, 193, 7, 0.1)",

  bgPrimary: "#FFFFFF",
  bgSecondary: "#FAFAFA",
  bgTertiary: "#F5F5F5",
  bgHover: "#F0F0F0",

  fontPrimary: "#111111",
  fontSecondary: "#666666",
  fontTertiary: "#8E8E8E",
  fontDisabled: "#BCBCBC",

  border: "#E5E5E5",
  borderHover: "#D4D4D4",
  divider: "#F0F0F0",

  success: "#059669",
  error: "#E11D48",
  warning: "#D97706",
  info: "#0284C7",
} as const;

export const getTheme = (mode: "dark" | "light" = "dark") => {
  const colors = mode === "dark" ? DARK_COLORS : LIGHT_COLORS;
  return {
    mode,
    colors,
    ...BASE_CONSTANTS,
  } as const;
};

export const getAntDesignTheme = (mode: "dark" | "light" = "dark") => {
  const colors = mode === "dark" ? DARK_COLORS : LIGHT_COLORS;

  return {
    algorithm:
      mode === "dark" ? antdTheme.darkAlgorithm : antdTheme.defaultAlgorithm,

    token: {
      colorPrimary: colors.primary,
      colorSuccess: colors.success,
      colorWarning: colors.warning,
      colorError: colors.error,
      colorInfo: colors.info,
      colorBgLayout: colors.bgPrimary,
      colorBgContainer: colors.bgSecondary,
      colorBgElevated: colors.bgTertiary,
      colorText: colors.fontPrimary,
      colorTextSecondary: colors.fontSecondary,
      colorTextTertiary: colors.fontTertiary,
      colorTextDisabled: colors.fontDisabled,
      colorTextPlaceholder: "rgba(255, 255, 255, 0.25)",
      colorBorder: colors.border,
      colorBorderSecondary: colors.divider,
      fontFamily: "Urbanist, sans-serif",
      fontSize: 14,
      borderRadius: 6,
    },
    components: {
      Button: {
        controlHeight: 36,
        fontWeight: 500,
        borderRadius: 6,
        boxShadow: "none",
        boxShadowSecondary: "none",
      },
      Input: {
        colorBgContainer: colors.bgTertiary,
        activeBorderColor: colors.primary,
        hoverBorderColor: colors.borderHover,
      },
      Select: {
        colorBgContainer: colors.bgTertiary,
        colorBorder: colors.border,
        colorBgElevated: colors.bgSecondary,
        colorText: colors.fontPrimary,
        colorTextPlaceholder: colors.fontTertiary,
        optionSelectedBg: colors.primaryAlpha,
        optionSelectedColor: colors.primary,
        optionActiveBg: colors.bgHover,
        borderRadiusLG: 12,
        controlHeight: 40,
      },
      Table: {
        headerBg: colors.bgSecondary,
        colorBgContainer: "transparent",
        colorFillAlter: colors.bgSecondary,
        headerColor: colors.fontPrimary,
        colorText: colors.fontSecondary,
        borderColor: colors.border,
        rowHoverBg: colors.bgHover,
        headerSortHoverBg: colors.bgHover,
        headerSortActiveBg: colors.bgHover,
        borderRadius: 8,
        headerBorderRadius: 8,
        cellPaddingBlock: 12,
        cellPaddingInline: 16,
      },
      Pagination: {
        itemActiveBg: colors.bgTertiary,
        colorPrimary: colors.primary,
        colorText: colors.fontSecondary,
        colorBgContainer: "transparent",
      },
      Card: {
        colorBgContainer: colors.bgSecondary,
        borderRadiusLG: 12,
        colorBorderSecondary: colors.border,
        paddingLG: 24,
        colorTextHeading: colors.fontPrimary,
      },
    },
  };
};

export type Theme = ReturnType<typeof getTheme>;
export type ThemeMode = "dark" | "light";

export const theme = getTheme("dark");
