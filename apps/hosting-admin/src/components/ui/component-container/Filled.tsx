import { type ReactNode } from "react";
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

interface FilledProps extends BaseContainerProps {}

export const Filled = ({
  value,
  required,
  error,
  hidden = false,
  label,
  children,
  componentId,
  animation = true,
  disabled = false,
  helperText,
}: FilledProps) => (
  <>
    <Container
      $value={typeof value === "object" ? !isEmpty(value) : !!toString(value)}
      className={classNames({ "scroll-error-anchor": error })}
      $error={error}
      $disabled={disabled}
      $required={required}
      $hidden={hidden}
      $animation={animation}
    >
      <div className="item-wrapper">{children}</div>
      <label htmlFor={componentId} className="item-label">
        {label}
      </label>
    </Container>
    {helperText && (
      <Error $error={error}>{capitalize(startCase(helperText))}</Error>
    )}
  </>
);

/* Estilo para la etiqueta cuando sube (Floating Effect) */
const labelAnimate = css`
  padding: 0 ${({ theme }) => theme.spacing.xs};
  border-radius: ${({ theme }) => theme.border_radius.xs};
  top: -10px;
  left: 8px;
  bottom: auto;
  font-weight: ${({ theme }) => theme.font_weight.medium};
  font-size: ${({ theme }) => theme.font_sizes.xs};
  background-color: ${({ theme }) => theme.colors.bgPrimary};
`;

const Container = styled.div<{
  $error?: boolean;
  $required?: boolean;
  $disabled?: boolean;
  $value?: boolean;
  $animation?: boolean;
  $hidden?: boolean;
}>`
  ${({
    theme,
    $error,
    $required,
    $disabled,
    $value,
    $animation,
    $hidden,
  }) => css`
    position: relative;
    width: 100%;
    border-radius: ${theme.border_radius.md};

    /* Fondo basado en estado */
    background: ${$disabled
      ? theme.colors.bgTertiary
      : theme.colors.bgSecondary};

    border: 1px solid ${$error ? theme.colors.error : theme.colors.border};

    animation: ${$error && keyframes.shake} 340ms
      cubic-bezier(0.36, 0.07, 0.19, 0.97) both;
    transition:
      border-color ${theme.transitions.fast},
      box-shadow ${theme.transitions.fast};

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

    .item-label {
      position: absolute;
      top: 0;
      left: 12px;
      bottom: 0;
      z-index: 10;
      pointer-events: none;
      display: flex;
      align-items: center;
      background-color: transparent;
      color: ${$error ? theme.colors.error : theme.colors.fontTertiary};
      font-size: ${theme.font_sizes.sm};
      transition: all ${theme.transitions.fast};

      ${$hidden &&
      css`
        display: none;
      `}
      ${!$animation && labelAnimate};
      ${$value && labelAnimate};

      ${$required &&
      css`
        &::after {
          content: "*";
          margin-left: ${theme.spacing.xs};
          color: ${$error ? theme.colors.error : theme.colors.primary};
        }
      `}
    }

    .item-wrapper {
      padding: 0;

      /* Cuando el input interno gana foco, animamos el label */
      &:focus-within + .item-label {
        ${labelAnimate};
        color: ${$error ? theme.colors.error : theme.colors.primary};
      }

      /* Reset de componentes internos de AntD para que hereden el estilo del contenedor */
      .ant-input-number,
      .ant-picker,
      .ant-select {
        width: 100%;
        border: none !important;
        box-shadow: none !important;
        background: transparent !important;
      }

      .ant-select-selector,
      .ant-input,
      .ant-input-affix-wrapper {
        border: none !important;
        box-shadow: none !important;
        background: transparent !important;
        height: 40px; /* Altura estándar profesional */
        display: flex;
        align-items: center;
      }

      /* Ajuste para los addons (ej: prefijos de moneda) */
      .ant-input-group-addon {
        border: none;
        border-left: 1px solid ${theme.colors.border};
        background: ${theme.colors.bgTertiary};
        color: ${theme.colors.fontSecondary};
      }

      .ant-input-suffix svg {
        fill: ${theme.colors.fontTertiary};
      }
    }

    /* Fix para el autocompletado de Chrome */
    input:-webkit-autofill {
      -webkit-text-fill-color: ${theme.colors.fontPrimary} !important;
      -webkit-box-shadow: 0 0 0 1000px ${theme.colors.bgSecondary} inset !important;
      transition: background-color 5000s ease-in-out 0s;
    }
  `}
`;

const Error = styled(Text)<{ $error?: boolean }>`
  ${({ theme, $error }) => css`
    display: block;
    color: ${theme.colors.error};
    font-size: ${theme.font_sizes.xs};
    margin-top: ${theme.spacing.xs};
    margin-left: ${theme.spacing.xs};
    ${$error &&
    css`
      animation: ${keyframes.shake} 340ms;
    `};
  `}
`;
