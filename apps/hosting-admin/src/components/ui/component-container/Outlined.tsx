import type { ReactNode } from "react";
import styled, { css } from "styled-components";
import { capitalize, isEmpty, startCase, toString } from "lodash";
import { classNames, keyframes } from "../../../styles";
import Typography from "antd/lib/typography";

const { Text } = Typography;

export interface BaseContainerProps {
  value?: boolean;
  required?: boolean;
  error?: boolean;
  hidden?: boolean;
  label?: string;
  disabled?: boolean;
  componentId?: string;
  children?: ReactNode;
  animation?: boolean;
  helperText?: string;
}

interface OutlinedProps extends BaseContainerProps {}

export const Outlined = ({
  value,
  required,
  error,
  hidden = false,
  label,
  children,
  componentId,
  helperText,
  disabled = false,
}: OutlinedProps) => (
  <Container
    $error={error}
    $required={required}
    $disabled={disabled}
    $hidden={hidden}
  >
    {label && (
      <label htmlFor={componentId} className="item-label">
        {label}
      </label>
    )}
    <Wrapper
      $value={typeof value === "object" ? !isEmpty(value) : !!toString(value)}
      $error={error}
      className={classNames({ "scroll-error-anchor": error })}
      $disabled={disabled}
    >
      <div className="item-wrapper">{children}</div>
    </Wrapper>
    {helperText && (
      <Error $error={error}>{capitalize(startCase(helperText))}</Error>
    )}
  </Container>
);

const Container = styled.div<{
  $error?: boolean;
  $required?: boolean;
  $disabled?: boolean;
  $hidden?: boolean;
}>`
  ${({ theme, $error, $required, $disabled, $hidden }) => css`
    width: 100%;
    display: ${$hidden ? "none" : "block"};

    .item-label {
      margin-bottom: ${theme.spacing.xs};
      display: flex;
      align-items: center;
      color: ${$error
        ? theme.colors.error
        : $disabled
          ? theme.colors.fontDisabled
          : theme.colors.fontPrimary};
      font-size: ${theme.font_sizes.sm};
      font-weight: ${theme.font_weight.medium};
      transition: color ${theme.transitions.fast};

      ${$required &&
      css`
        &:after {
          content: "*";
          margin-left: ${theme.spacing.xs};
          color: ${$error ? theme.colors.error : theme.colors.primary};
          font-size: ${theme.font_sizes.sm};
        }
      `};
    }
  `};
`;

const Wrapper = styled.div<{
  $error?: boolean;
  $disabled?: boolean;
  $value?: boolean;
}>`
  ${({ theme, $error, $disabled }) => css`
    position: relative;
    width: 100%;
    border-radius: ${theme.border_radius.md};
    background: ${$disabled
      ? theme.colors.bgTertiary
      : theme.colors.bgSecondary};
    border: 1px solid ${$error ? theme.colors.error : theme.colors.border};
    transition: all ${theme.transitions.fast};
    animation: ${$error && keyframes.shake} 340ms
      cubic-bezier(0.36, 0.07, 0.19, 0.97) both;

    &:hover {
      border-color: ${$error
        ? theme.colors.error
        : $disabled
          ? theme.colors.border
          : theme.colors.borderHover};
    }

    &:focus-within {
      border-color: ${$error ? theme.colors.error : theme.colors.primary};
      box-shadow: 0 0 0 2px
        ${$error ? `${theme.colors.error}26` : theme.colors.primaryAlpha};
    }

    .item-wrapper {
      /* Estilos para los componentes internos de AntD */
      .ant-input-number,
      .ant-picker,
      .ant-select {
        width: 100%;
        border: none !important;
        box-shadow: none !important;
        background: transparent !important;
      }

      .ant-input,
      .ant-select-selector,
      .ant-input-affix-wrapper {
        background: transparent !important;
        border: none !important;
        box-shadow: none !important;
        height: 38px; /* Un poco más compacto que el filled para el estilo outlined */
      }

      .ant-input-group-addon {
        border: none;
        border-left: 1px solid ${theme.colors.border};
        background: ${theme.colors.bgTertiary};
        color: ${theme.colors.fontSecondary};
        border-radius: 0 ${theme.border_radius.md} ${theme.border_radius.md} 0;
      }

      input:-webkit-autofill {
        -webkit-text-fill-color: ${theme.colors.fontPrimary} !important;
        -webkit-box-shadow: 0 0 0 1000px ${theme.colors.bgSecondary} inset !important;
      }
    }
  `}
`;

const Error = styled(Text)<{ $error?: boolean }>`
  ${({ theme, $error }) => css`
    display: block;
    color: ${theme.colors.error};
    font-size: ${theme.font_sizes.xs};
    margin-top: ${theme.spacing.xs};
    ${$error &&
    css`
      animation: ${keyframes.shake} 340ms;
    `};
  `}
`;
