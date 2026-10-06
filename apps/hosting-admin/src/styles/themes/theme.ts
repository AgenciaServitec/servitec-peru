import { theme as antdTheme, type ThemeConfig } from "antd";

export const BASE_CONSTANTS = {
  font_weight: {
    regular: "400",
    medium: "500",
    semibold: "600",
    large: "700",
  },
  border_radius: {
    xs: "4px",
    sm: "6px",
    md: "10px",
    lg: "14px",
    xl: "20px",
    full: "9999px",
  },
  spacing: {
    xxs: "0.125rem",
    xs: "0.25rem",
    sm: "0.5rem",
    md: "1rem",
    lg: "1.5rem",
    xl: "2rem",
    xxl: "3rem",
  },
  font_sizes: {
    xs: "0.75rem",
    sm: "0.875rem",
    md: "1rem",
    lg: "1.125rem",
    xl: "1.25rem",
    xxl: "1.5rem",
    heading: "2rem",
    display: "2.5rem",
  },
  shadows: {
    none: "none",
    sm: "0 2px 4px rgba(0, 0, 0, 0.03), 0 1px 2px rgba(0, 0, 0, 0.02)",
    md: "0 6px 12px -2px rgba(0, 0, 0, 0.05), 0 2px 4px -1px rgba(0, 0, 0, 0.03)",
    lg: "0 16px 24px -4px rgba(0, 0, 0, 0.06), 0 6px 8px -2px rgba(0, 0, 0, 0.03)",
  },
  transitions: {
    fast: "150ms cubic-bezier(0.16, 1, 0.3, 1)",
    normal: "250ms cubic-bezier(0.16, 1, 0.3, 1)",
    slow: "350ms cubic-bezier(0.16, 1, 0.3, 1)",
  },
} as const;

const DARK_COLORS = {
  primary: "#F59E0B",
  primaryDark: "#D97706",
  primaryAlpha: "rgba(245, 158, 11, 0.15)",

  bgPrimary: "#121417",
  bgSecondary: "#1A1D21",
  bgTertiary: "#24282E",
  bgHover: "#2E333B",

  fontPrimary: "#F3F4F6",
  fontSecondary: "#9CA3AF",
  fontTertiary: "#6B7280",
  fontDisabled: "#4B5563",

  border: "#2A2E35",
  borderHover: "#3B424C",
  divider: "#1E2228",

  success: "#10B981",
  error: "#F43F5E",
  warning: "#F59E0B",
  info: "#3B82F6",
} as const;

const LIGHT_COLORS = {
  primary: "#D97706",
  primaryDark: "#B45309",
  primaryAlpha: "rgba(217, 119, 6, 0.12)",

  bgPrimary: "#F8FAFC",
  bgSecondary: "#FFFFFF",
  bgTertiary: "#F1F5F9",
  bgHover: "#E2E8F0",

  fontPrimary: "#1E293B",
  fontSecondary: "#64748B",
  fontTertiary: "#94A3B8",
  fontDisabled: "#CBD5E1",

  border: "#E2E8F0",
  borderHover: "#CBD5E1",
  divider: "#F1F5F9",

  success: "#059669",
  error: "#E11D48",
  warning: "#D97706",
  info: "#0284C7",
} as const;

export type ThemeMode = "dark" | "light";

export const getTheme = (mode: ThemeMode = "dark") => {
  const colors = mode === "dark" ? DARK_COLORS : LIGHT_COLORS;
  return {
    mode,
    colors,
    ...BASE_CONSTANTS,
  } as const;
};

export const getAntDesignTheme = (mode: ThemeMode = "dark"): ThemeConfig => {
  const colors = mode === "dark" ? DARK_COLORS : LIGHT_COLORS;

  return {
    cssVar: true, // Activa variables CSS nativas en Antd v5
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
      // FIX: Placeholder configurado correctamente desde el token
      colorTextPlaceholder: colors.fontTertiary,
      colorBorder: colors.border,
      colorBorderSecondary: colors.divider,
      // Si usas Geist Sans, asegúrate que coincida aquí y en GlobalStyle
      fontFamily: "Geist Sans, system-ui, -apple-system, sans-serif",
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
        colorTextPlaceholder: colors.fontTertiary,
      },
      Select: {
        colorBgContainer: colors.bgTertiary,
        colorBgElevated: colors.bgTertiary,
        colorBorder: colors.border,
        colorText: colors.fontPrimary,
        colorTextPlaceholder: colors.fontTertiary,
        optionSelectedBg: colors.primaryAlpha,
        optionSelectedColor: colors.primary,
        optionActiveBg: colors.bgHover,
        borderRadiusLG: 10,
        controlHeight: 40,
      },
      Table: {
        headerBg: colors.bgTertiary,
        headerColor: colors.fontPrimary,
        headerSplitColor: colors.border,
        colorBgContainer: colors.bgSecondary,
        colorFillAlter: colors.bgTertiary,
        colorText: colors.fontSecondary,
        colorTextHeading: colors.fontPrimary,
        borderColor: colors.border,
        rowHoverBg: colors.bgHover,
        headerSortHoverBg: colors.bgHover,
        headerSortActiveBg: colors.bgHover,
        borderRadius: 12,
        headerBorderRadius: 12,
        cellPaddingBlock: 14,
        cellPaddingInline: 16,
      },
      Modal: {
        contentBg: colors.bgSecondary,
        headerBg: colors.bgSecondary,
        footerBg: colors.bgSecondary,
        titleColor: colors.fontPrimary,
        titleFontSize: 16,
        borderRadiusLG: 14,
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
      Breadcrumb: {
        itemColor: colors.fontSecondary,
        lastItemColor: colors.fontPrimary,
        linkColor: colors.fontSecondary,
        linkHoverColor: colors.primary,
        separatorColor: colors.fontTertiary,
        separatorMargin: 8,
        fontSize: 14,
      },
      DatePicker: {
        colorBgContainer: colors.bgTertiary,
        colorBgElevated: colors.bgSecondary,
        colorBorder: colors.border,
        colorText: colors.fontPrimary,
        colorTextPlaceholder: colors.fontTertiary,
        colorTextDisabled: colors.fontDisabled,
        colorIcon: colors.primary,
        colorIconHover: colors.primaryDark,
        cellActiveWithRangeBg: colors.primaryAlpha,
        cellHoverWithRangeBg: colors.bgHover,
      },
      Checkbox: {
        colorPrimary: colors.primary,
        colorPrimaryHover: colors.primaryDark,
        colorBgContainer: colors.bgTertiary,
        colorBorder: colors.border,
        borderRadiusSM: 4,
      },
      Radio: {
        colorPrimary: colors.primary,
        colorPrimaryHover: colors.primaryDark,
        colorBgContainer: colors.bgTertiary,
        colorBorder: colors.border,
        colorText: colors.fontPrimary,
        colorTextDisabled: colors.fontDisabled,
        buttonBg: colors.bgTertiary,
        buttonCheckedBg: colors.primary,
        buttonColor: colors.fontSecondary,
        buttonSolidCheckedColor: mode === "dark" ? "#000000" : "#ffffff",
      },
      Notification: {
        colorBgElevated: colors.bgSecondary,
        colorText: colors.fontPrimary,
        colorTextHeading: colors.fontPrimary,
        colorIcon: colors.primary,
        borderRadiusLG: 12,
      },
      Tabs: {
        itemColor: colors.fontSecondary,
        itemSelectedColor: colors.primary,
        itemHoverColor: colors.fontPrimary,
        itemActiveColor: colors.primaryDark,
        inkBarColor: colors.primary,
        titleFontSize: 14,
        horizontalItemPadding: "10px 16px",
        horizontalMargin: "0 0 16px 0",
        cardBg: colors.bgSecondary,
        cardGutter: 4,
      },
    },
  };
};

export type Theme = ReturnType<typeof getTheme>;
export const theme = getTheme("dark");
