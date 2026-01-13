import { createGlobalStyle, css } from "styled-components";
import { mediaQuery } from "../constants";
import type { Theme } from "./theme";

interface ThemeProps {
  theme: Theme;
}

const global = css<ThemeProps>`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family:
      "Inter",
      -apple-system,
      BlinkMacSystemFont,
      "Segoe UI",
      Helvetica,
      Arial,
      sans-serif,
      "Apple Color Emoji",
      "Segoe UI Emoji",
      "Segoe UI Symbol";
  }

  html {
    scroll-behavior: smooth;
  }

  body {
    background: ${({ theme }) => theme.colors.bgPrimary};
    font-size: 15px;
    overflow-x: hidden;
    font-family:
      "Inter",
      -apple-system,
      BlinkMacSystemFont,
      "Segoe UI",
      Helvetica,
      Arial,
      sans-serif,
      "Apple Color Emoji",
      "Segoe UI Emoji",
      "Segoe UI Symbol";
    color: ${({ theme }) => theme.colors.fontSecondary};
    transition:
      background-color 0.3s ease,
      color 0.3s ease;
  }

  h1,
  h2,
  h3 {
    color: ${({ theme }) => theme.colors.fontPrimary};
  }

  h4,
  h5,
  h6 {
    color: ${({ theme }) => theme.colors.fontSecondary};
  }

  h1 {
    font-size: ${({ theme }) => theme.font_sizes.xxx_large};
    font-weight: ${({ theme }) => theme.font_weight.large};
    line-height: 1.2;
  }

  h2 {
    font-size: ${({ theme }) => theme.font_sizes.xx_large};
    font-weight: ${({ theme }) => theme.font_weight.large};
    line-height: 1.3;
  }

  h3 {
    font-size: ${({ theme }) => theme.font_sizes.x_large};
    font-weight: ${({ theme }) => theme.font_weight.large};
  }

  h4 {
    font-size: ${({ theme }) => theme.font_sizes.large};
    font-weight: ${({ theme }) => theme.font_weight.medium};
  }

  h5 {
    font-size: ${({ theme }) => theme.font_sizes.medium};
    font-weight: ${({ theme }) => theme.font_weight.medium};
  }

  .link-color {
    color: ${({ theme }) => theme.colors.fontLink};
    cursor: pointer;
    transition: color ${({ theme }) => theme.transitions.fast};

    &:hover {
      color: ${({ theme }) => theme.colors.fontLinkHover};
    }
  }

  .d-flex {
    display: flex;
  }

  .pointer {
    cursor: pointer;
  }

  .capitalize {
    text-transform: capitalize;
  }

  .data-entry-modal {
    pointer-events: none;
  }

  /* ========================================== */
  /* 🎨 ANT DESIGN GLOBAL OVERRIDES */
  /* ========================================== */

  /* 📝 INPUTS & FORMS */
  .ant-input,
  .ant-input-number,
  .ant-input-number-input,
  .ant-select-selector,
  .ant-picker {
    //background: ${({ theme }) => theme.colors.bgInput} !important;
    border-color: ${({ theme }) => theme.colors.border} !important;
    color: ${({ theme }) => theme.colors.fontPrimary} !important;
    transition: all ${({ theme }) => theme.transitions.fast};

    &:hover {
      border-color: ${({ theme }) => theme.colors.borderHover} !important;
    }

    &:focus,
    &.ant-input-focused,
    &.ant-select-focused .ant-select-selector {
      border-color: ${({ theme }) => theme.colors.primary} !important;
      box-shadow: 0 0 0 2px ${({ theme }) => theme.colors.primaryAlpha} !important;
    }

    &::placeholder {
      color: ${({ theme }) => theme.colors.fontTertiary} !important;
    }

    &:disabled {
      background: ${({ theme }) => theme.colors.bgSecondary} !important;
      color: ${({ theme }) => theme.colors.fontDisabled} !important;
      cursor: not-allowed;
    }
  }

  .ant-input-textarea {
    background: ${({ theme }) => theme.colors.bgInput} !important;
  }

  .ant-input-number-handler-wrap {
    background: ${({ theme }) => theme.colors.bgSecondary} !important;
    border-left-color: ${({ theme }) => theme.colors.border} !important;
  }

  .ant-input-number-handler {
    color: ${({ theme }) => theme.colors.fontSecondary} !important;

    &:hover {
      color: ${({ theme }) => theme.colors.primary} !important;
    }
  }

  /* 🔽 SELECT & DROPDOWNS */
  .ant-select-arrow,
  .ant-picker-suffix {
    color: ${({ theme }) => theme.colors.fontSecondary} !important;
  }

  .ant-select-dropdown,
  .ant-picker-dropdown {
    background: ${({ theme }) => theme.colors.bgTertiary} !important;
    border: 1px solid ${({ theme }) => theme.colors.border} !important;
    box-shadow: ${({ theme }) => theme.shadows.lg} !important;
  }

  .ant-select-item {
    color: ${({ theme }) => theme.colors.fontSecondary} !important;

    &:hover {
      background: ${({ theme }) => theme.colors.bgHover} !important;
    }

    &.ant-select-item-option-selected {
      background: ${({ theme }) => theme.colors.bgActive} !important;
      color: ${({ theme }) => theme.colors.primary} !important;
    }

    &.ant-select-item-option-disabled {
      color: ${({ theme }) => theme.colors.fontDisabled} !important;
    }
  }

  /* 🪟 MODALS */
  .ant-modal-content {
    background: ${({ theme }) => theme.colors.bgSecondary} !important;
    color: ${({ theme }) => theme.colors.fontPrimary} !important;
  }

  .ant-modal-header {
    background: ${({ theme }) => theme.colors.bgSecondary} !important;
    border-bottom: 1px solid ${({ theme }) => theme.colors.divider} !important;

    .ant-modal-title {
      color: ${({ theme }) => theme.colors.fontPrimary} !important;
    }
  }

  .ant-modal-close {
    color: ${({ theme }) => theme.colors.fontSecondary} !important;

    &:hover {
      color: ${({ theme }) => theme.colors.primary} !important;
    }
  }

  .ant-modal-footer {
    border-top: 1px solid ${({ theme }) => theme.colors.divider} !important;
    background: ${({ theme }) => theme.colors.bgSecondary} !important;
  }

  .ant-modal-mask {
    background-color: ${({ theme }) => theme.colors.overlay} !important;
  }

  /* 📊 TABLES */
  .ant-table {
    background: transparent !important;
    color: ${({ theme }) => theme.colors.fontSecondary} !important;

    .ant-table-thead > tr > th {
      background: ${({ theme }) => theme.colors.bgSecondary} !important;
      color: ${({ theme }) => theme.colors.fontPrimary} !important;
      border-bottom: 1px solid ${({ theme }) => theme.colors.border} !important;
      font-weight: ${({ theme }) => theme.font_weight.medium};
    }

    .ant-table-tbody > tr > td {
      border-bottom: 1px solid ${({ theme }) => theme.colors.borderLight} !important;
    }

    .ant-table-tbody > tr:hover > td {
      background: ${({ theme }) => theme.colors.bgHover} !important;
    }

    .ant-table-row-selected > td {
      background: ${({ theme }) => theme.colors.bgActive} !important;
    }
  }

  /* 📄 PAGINATION */
  .ant-pagination {
    .ant-pagination-item {
      background: ${({ theme }) => theme.colors.bgSecondary} !important;
      border-color: ${({ theme }) => theme.colors.border} !important;

      a {
        color: ${({ theme }) => theme.colors.fontSecondary} !important;
      }

      &:hover {
        border-color: ${({ theme }) => theme.colors.primary} !important;

        a {
          color: ${({ theme }) => theme.colors.primary} !important;
        }
      }

      &.ant-pagination-item-active {
        background: ${({ theme }) => theme.colors.primary} !important;
        border-color: ${({ theme }) => theme.colors.primary} !important;

        a {
          color: ${({ theme }) => theme.colors.black} !important;
          font-weight: ${({ theme }) => theme.font_weight.medium};
        }
      }
    }

    .ant-pagination-prev,
    .ant-pagination-next {
      button {
        background: ${({ theme }) => theme.colors.bgSecondary} !important;
        border-color: ${({ theme }) => theme.colors.border} !important;
        color: ${({ theme }) => theme.colors.fontSecondary} !important;

        &:hover:not(:disabled) {
          border-color: ${({ theme }) => theme.colors.primary} !important;
          color: ${({ theme }) => theme.colors.primary} !important;
        }

        &:disabled {
          color: ${({ theme }) => theme.colors.fontDisabled} !important;
        }
      }
    }
  }

  /* 📋 FORMS */
  .ant-form-item-label > label {
    color: ${({ theme }) => theme.colors.fontPrimary} !important;
  }

  .ant-form-item-explain-error {
    color: ${({ theme }) => theme.colors.error} !important;
  }

  .ant-form-item-has-error {
    .ant-input,
    .ant-input-number,
    .ant-select-selector,
    .ant-picker {
      border-color: ${({ theme }) => theme.colors.error} !important;
    }
  }

  /* 🔘 BUTTONS */
  .ant-btn-default {
    background: ${({ theme }) => theme.colors.bgSecondary} !important;
    border-color: ${({ theme }) => theme.colors.border} !important;
    color: ${({ theme }) => theme.colors.fontPrimary} !important;

    &:hover:not(:disabled) {
      border-color: ${({ theme }) => theme.colors.primary} !important;
      color: ${({ theme }) => theme.colors.primary} !important;
    }

    &:disabled {
      background: ${({ theme }) => theme.colors.bgSecondary} !important;
      color: ${({ theme }) => theme.colors.fontDisabled} !important;
    }
  }

  .ant-btn-primary {
    background: ${({ theme }) => theme.colors.primary} !important;
    border-color: ${({ theme }) => theme.colors.primary} !important;
    color: ${({ theme }) => theme.colors.black} !important;

    &:hover:not(:disabled) {
      background: ${({ theme }) => theme.colors.primaryDark} !important;
      border-color: ${({ theme }) => theme.colors.primaryDark} !important;
    }
  }

  .ant-btn {
    box-shadow: none !important;
  }

  .ant-btn::after {
    display: none !important;
  }

  .ant-btn:focus,
  .ant-btn:focus-visible {
    outline: none !important;
    box-shadow: none !important;
  }

  /* 🔔 NOTIFICATIONS */
  .ant-notification-notice {
    background: ${({ theme }) => theme.colors.bgSecondary} !important;
    border: 1px solid ${({ theme }) => theme.colors.border} !important;
    border-radius: ${({ theme }) => theme.border_radius.medium} !important;

    .ant-notification-notice-message {
      color: ${({ theme }) => theme.colors.fontPrimary} !important;
    }

    .ant-notification-notice-description {
      color: ${({ theme }) => theme.colors.fontSecondary} !important;
    }

    .ant-notification-notice-close {
      color: ${({ theme }) => theme.colors.fontSecondary} !important;

      &:hover {
        color: ${({ theme }) => theme.colors.primary} !important;
      }
    }
  }

  /* 💬 MESSAGES */
  .ant-message-notice-content {
    background: ${({ theme }) => theme.colors.bgSecondary} !important;
    color: ${({ theme }) => theme.colors.fontPrimary} !important;
    box-shadow: ${({ theme }) => theme.shadows.lg} !important;
    border: 1px solid ${({ theme }) => theme.colors.border} !important;
  }

  /* 🎯 TOOLTIPS */
  .ant-tooltip-inner {
    background: ${({ theme }) => theme.colors.bgTertiary} !important;
    color: ${({ theme }) => theme.colors.fontPrimary} !important;
  }

  .ant-tooltip-arrow-content {
    background: ${({ theme }) => theme.colors.bgTertiary} !important;
  }
`;

const antd = {
  datePicker: css<ThemeProps>`
    .ant-picker-panel-container {
      background: ${({ theme }) => theme.colors.bgTertiary} !important;
      border: 1px solid ${({ theme }) => theme.colors.border} !important;
    }

    .ant-picker-header {
      border-bottom: 1px solid ${({ theme }) => theme.colors.divider} !important;
      color: ${({ theme }) => theme.colors.fontPrimary} !important;

      button {
        color: ${({ theme }) => theme.colors.fontSecondary} !important;

        &:hover {
          color: ${({ theme }) => theme.colors.primary} !important;
        }
      }
    }

    .ant-picker-content {
      th {
        color: ${({ theme }) => theme.colors.fontSecondary} !important;
      }
    }

    .ant-picker-cell {
      color: ${({ theme }) => theme.colors.fontSecondary} !important;

      &:hover:not(.ant-picker-cell-selected):not(.ant-picker-cell-disabled)
        .ant-picker-cell-inner {
        background: ${({ theme }) => theme.colors.bgHover} !important;
      }
    }

    .ant-picker-cell-in-view {
      color: ${({ theme }) => theme.colors.fontPrimary} !important;
    }

    .ant-picker-cell-selected .ant-picker-cell-inner {
      background: ${({ theme }) => theme.colors.primary} !important;
      color: ${({ theme }) => theme.colors.black} !important;
    }

    .ant-picker-cell-today .ant-picker-cell-inner::before {
      border: 1px solid ${({ theme }) => theme.colors.primary} !important;
    }

    .ant-picker-today-btn {
      color: ${({ theme }) => theme.colors.primary} !important;
    }

    .ant-picker-footer {
      border-top: 1px solid ${({ theme }) => theme.colors.divider} !important;
    }

    .ant-picker-cell-disabled .ant-picker-cell-inner {
      color: ${({ theme }) => theme.colors.fontDisabled} !important;
    }
  `,

  radio: css<ThemeProps>`
    .ant-radio-wrapper {
      color: ${({ theme }) => theme.colors.fontSecondary} !important;
    }

    .ant-radio-inner {
      background: ${({ theme }) => theme.colors.bgInput} !important;
      border-color: ${({ theme }) => theme.colors.border} !important;
    }

    .ant-radio-checked .ant-radio-inner {
      border-color: ${({ theme }) => theme.colors.primary} !important;
      background-color: ${({ theme }) => theme.colors.primary} !important;

      &::after {
        background-color: ${({ theme }) => theme.colors.black} !important;
      }
    }

    .ant-radio:hover .ant-radio-inner {
      border-color: ${({ theme }) => theme.colors.primary} !important;
    }

    .ant-radio-disabled .ant-radio-inner {
      background: ${({ theme }) => theme.colors.bgSecondary} !important;
      border-color: ${({ theme }) => theme.colors.borderLight} !important;
    }
  `,

  checkbox: css<ThemeProps>`
    .ant-checkbox-wrapper {
      color: ${({ theme }) => theme.colors.fontSecondary} !important;
    }

    .ant-checkbox-inner {
      background: ${({ theme }) => theme.colors.bgInput} !important;
      border-color: ${({ theme }) => theme.colors.border} !important;
    }

    .ant-checkbox-checked .ant-checkbox-inner {
      background-color: ${({ theme }) => theme.colors.primary} !important;
      border-color: ${({ theme }) => theme.colors.primary} !important;

      &::after {
        border-color: ${({ theme }) => theme.colors.black} !important;
      }
    }

    .ant-checkbox-wrapper:hover .ant-checkbox-inner,
    .ant-checkbox:hover .ant-checkbox-inner,
    .ant-checkbox-input:focus + .ant-checkbox-inner {
      border-color: ${({ theme }) => theme.colors.primary} !important;
    }

    .ant-checkbox-indeterminate .ant-checkbox-inner::after {
      background-color: ${({ theme }) => theme.colors.primary} !important;
    }

    .ant-checkbox-disabled .ant-checkbox-inner {
      background: ${({ theme }) => theme.colors.bgSecondary} !important;
      border-color: ${({ theme }) => theme.colors.borderLight} !important;
    }
  `,

  switch: css<ThemeProps>`
    .ant-switch {
      background-color: ${({ theme }) => theme.colors.border} !important;

      &:hover:not(.ant-switch-disabled) {
        background-color: ${({ theme }) => theme.colors.borderHover} !important;
      }
    }

    .ant-switch-checked {
      background-color: ${({ theme }) => theme.colors.primary} !important;

      &:hover:not(.ant-switch-disabled) {
        background-color: ${({ theme }) => theme.colors.primaryDark} !important;
      }
    }

    .ant-switch-inner {
      color: ${({ theme }) => theme.colors.white} !important;
    }

    .ant-switch-disabled {
      opacity: 0.4;
    }
  `,

  dropdown: css<ThemeProps>`
    .ant-dropdown {
      background: ${({ theme }) => theme.colors.bgTertiary} !important;
      border: 1px solid ${({ theme }) => theme.colors.border} !important;
      box-shadow: ${({ theme }) => theme.shadows.lg} !important;
    }

    .ant-dropdown-menu {
      background: ${({ theme }) => theme.colors.bgTertiary} !important;
    }

    .ant-dropdown-menu-item,
    .ant-dropdown-menu-submenu-title {
      color: ${({ theme }) => theme.colors.fontSecondary} !important;

      &:hover:not(.ant-dropdown-menu-item-disabled) {
        background: ${({ theme }) => theme.colors.bgHover} !important;
        color: ${({ theme }) => theme.colors.primary} !important;
      }

      &.ant-dropdown-menu-item-disabled {
        color: ${({ theme }) => theme.colors.fontDisabled} !important;
      }
    }

    .ant-dropdown-menu-item-divider {
      background: ${({ theme }) => theme.colors.divider} !important;
    }
  `,

  card: css<ThemeProps>`
    .ant-card {
      background: ${({ theme }) => theme.colors.bgSecondary} !important;
      border: 1px solid ${({ theme }) => theme.colors.border} !important;
    }

    .ant-card-head {
      border-bottom: 1px solid ${({ theme }) => theme.colors.divider} !important;
      color: ${({ theme }) => theme.colors.fontPrimary} !important;
      background: ${({ theme }) => theme.colors.bgSecondary} !important;

      .ant-card-head-title {
        color: ${({ theme }) => theme.colors.fontPrimary} !important;
      }
    }

    .ant-card-body {
      color: ${({ theme }) => theme.colors.fontSecondary} !important;
    }

    .ant-card-hoverable:hover {
      border-color: ${({ theme }) => theme.colors.borderHover} !important;
      box-shadow: ${({ theme }) => theme.shadows.md} !important;
    }
  `,
};

const scroll = css<ThemeProps>`
  ::-webkit-scrollbar {
    -webkit-appearance: none;
    width: 8px;
    height: 8px;
  }

  ::-webkit-scrollbar-track {
    background: ${({ theme }) => theme.colors.bgSecondary};
    border-radius: ${({ theme }) => theme.border_radius.small};
  }

  ::-webkit-scrollbar-thumb {
    border-radius: ${({ theme }) => theme.border_radius.small};
    background: ${({ theme }) => theme.colors.border};
    transition: background ${({ theme }) => theme.transitions.fast};

    &:hover {
      background: ${({ theme }) => theme.colors.primary};
    }

    &:active {
      background: ${({ theme }) => theme.colors.primaryDark};
    }
  }

  ::-webkit-scrollbar-corner {
    background-color: transparent;
  }
`;

export const GlobalStyle = createGlobalStyle<ThemeProps>`
    ${global}
    ${Object.values(antd).map((antdComponent) => antdComponent)}
    ${mediaQuery.minTablet}{
        ${scroll}
    }

    @media print {
        * {
            -webkit-print-color-adjust: exact;
            print-color-adjust: exact;
        }

        html,
        body {
            margin: 0;
            padding: 0;
            background: #fff;
            color: #000;
        }

        /* Ocultar elementos no necesarios en impresión */
        button,
        .no-print {
            display: none !important;
        }
    }
`;
