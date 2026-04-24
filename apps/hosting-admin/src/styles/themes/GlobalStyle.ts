import { createGlobalStyle, css } from "styled-components";
import { mediaQuery } from "../constants";
import type { Theme } from "./theme";

interface ThemeProps {
  theme?: Theme;
}

const baseStyles = css<ThemeProps>`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  html {
    scroll-behavior: smooth;
    font-size: 16px;
  }

  body {
    background: ${({ theme }) => theme.colors.bgPrimary};
    color: ${({ theme }) => theme.colors.fontSecondary};
    font-family: "Geist Sans", sans-serif;
    font-size: ${({ theme }) => theme.font_sizes.sm};
    line-height: 1.5;
    overflow-x: hidden;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    transition:
      background-color 0.3s ease,
      color 0.3s ease;
  }

  .ant-input,
  .ant-btn,
  .ant-select,
  .ant-picker,
  .ant-form-item-label > label {
    font-family: "Urbanist", sans-serif !important;
  }

  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    color: ${({ theme }) => theme.colors.fontPrimary};
    font-weight: ${({ theme }) => theme.font_weight.large};
    line-height: 1.2;
    margin-bottom: 0.5em;
  }

  h1 {
    font-size: ${({ theme }) => theme.font_sizes.heading};
  }
  h2 {
    font-size: ${({ theme }) => theme.font_sizes.xxl};
  }
  h3 {
    font-size: ${({ theme }) => theme.font_sizes.xl};
  }
  h4 {
    font-size: ${({ theme }) => theme.font_sizes.lg};
  }
  h5 {
    font-size: ${({ theme }) => theme.font_sizes.md};
  }

  .pointer {
    cursor: pointer;
  }
  .capitalize {
    text-transform: capitalize;
  }
  .d-flex {
    display: flex;
  }
  .full-width {
    width: 100%;
  }

  input:-webkit-autofill {
    -webkit-box-shadow: 0 0 0 1000px ${({ theme }) => theme.colors.bgTertiary}
      inset !important;
    -webkit-text-fill-color: ${({ theme }) =>
      theme.colors.fontPrimary} !important;
    transition: background-color 5000s ease-in-out 0s;
  }
`;

const scrollbarStyles = css<ThemeProps>`
  ::-webkit-scrollbar {
    width: 6px;
    height: 6px;
  }

  ::-webkit-scrollbar-track {
    background: ${({ theme }) => theme.colors.bgPrimary};
  }

  ::-webkit-scrollbar-thumb {
    background: ${({ theme }) => theme.colors.border};
    border-radius: ${({ theme }) => theme.border_radius.full};
    transition: background 0.2s;

    &:hover {
      background: ${({ theme }) => theme.colors.fontTertiary};
    }
  }
`;

const antdOverrides = css<ThemeProps>`
  .ant-btn {
    box-shadow: none !important;
    &::after {
      display: none !important;
    }
  }

  .ant-input::placeholder,
  .ant-select-selection-placeholder {
    color: ${({ theme }) => theme.colors.fontTertiary} !important;
    opacity: 0.6;
  }

  .ant-table-wrapper {
    .ant-table {
      background: transparent !important;
      border: 1px solid ${({ theme }) => theme.colors.border};
      border-radius: ${({ theme }) => theme.border_radius.md};
    }
  }

  .ant-modal-content {
    border: 1px solid ${({ theme }) => theme.colors.border};
    box-shadow: ${({ theme }) => theme.shadows.lg} !important;
  }

  .ant-table-thead > tr > th {
    border-bottom: 1px solid ${({ theme }) => theme.colors.border} !important;
    &::before {
      display: none !important;
    }
  }

  .ant-table-tbody > tr > td {
    border-bottom: 1px solid ${({ theme }) => theme.colors.divider} !important;
  }

  .ant-empty-description {
    color: ${({ theme }) => theme.colors.fontTertiary};
  }
`;

export const GlobalStyle = createGlobalStyle<ThemeProps>`
  ${baseStyles}
  ${antdOverrides}

  ${mediaQuery.minTablet} {
    ${scrollbarStyles}
  }

  @media print {
    .no-print { display: none !important; }
    body { background: white; color: black; }
  }
`;
