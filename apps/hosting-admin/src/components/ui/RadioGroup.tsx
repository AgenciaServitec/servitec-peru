import React from "react";
import styled, { css } from "styled-components";
import RadioAntd from "antd/lib/radio";
import type { RadioGroupProps as AntdRadioGroupProps } from "antd";
import { ComponentContainer } from "./component-container";

export interface RadioOption {
  value: string | number | boolean;
  label: string;
  disabled?: boolean;
}

export interface RadioGroupProps extends Omit<
  AntdRadioGroupProps,
  "options" | "onChange"
> {
  name?: string;
  value?: any;
  required?: boolean;
  error?: boolean;
  label?: string;
  helperText?: string;
  options: RadioOption[];
  variant?: "outlined" | "filled";
  disabled?: boolean;
  animation?: boolean;
  onChange?: (value: any) => void;
}

export const RadioGroup: React.FC<RadioGroupProps> = ({
  required = false,
  error = false,
  label,
  helperText,
  options = [],
  onChange,
  animation = false,
  variant = "filled",
  disabled = false,
  ...props
}) => {
  const Container = ComponentContainer[variant];

  return (
    <Container
      required={required}
      error={error}
      label={label}
      animation={animation}
      helperText={helperText}
      disabled={disabled}
    >
      <RadioGroupStyled
        onChange={(e) => onChange?.(e.target.value)}
        options={options}
        disabled={disabled}
        {...props}
      />
    </Container>
  );
};

const RadioGroupStyled = styled(RadioAntd.Group)`
  ${({ theme }) => css`
    padding: ${theme.spacing.sm} ${theme.spacing.md};
    display: flex;
    flex-wrap: wrap;
    gap: ${theme.spacing.md};

    /* Estilo para Radio Circular Estándar */
    .ant-radio-wrapper {
      color: ${theme.colors.fontPrimary};
      font-size: ${theme.font_sizes.sm};
      margin-right: 0; /* Controlado por el gap del padre */
      transition: all ${theme.transitions.fast};

      .ant-radio-inner {
        background-color: ${theme.colors.bgTertiary};
        border-color: ${theme.colors.border};
        width: 18px;
        height: 18px;

        &::after {
          /* El punto central cuando está seleccionado */
          background-color: #000000 !important;
          width: 10px;
          height: 10px;
          margin-top: -5px;
          margin-left: -5px;
        }
      }

      /* Estado Seleccionado */
      .ant-radio-checked {
        .ant-radio-inner {
          background-color: ${theme.colors.primary};
          border-color: ${theme.colors.primary};
        }
      }

      /* Hover */
      &:hover:not(.ant-radio-wrapper-disabled) .ant-radio-inner {
        border-color: ${theme.colors.primary};
      }

      /* Deshabilitado */
      &.ant-radio-wrapper-disabled {
        color: ${theme.colors.fontDisabled};
        cursor: not-allowed;
        opacity: 1;

        .ant-radio-inner {
          background-color: ${theme.colors.bgTertiary};
          border-color: ${theme.colors.border};
        }
      }
    }

    /* Estilo para Radio tipo Botón (Solid/Outline) */
    .ant-radio-button-wrapper {
      background-color: ${theme.colors.bgTertiary};
      border-color: ${theme.colors.border};
      color: ${theme.colors.fontSecondary};
      height: 32px;
      line-height: 30px;
      transition: all ${theme.transitions.fast};

      &:first-child {
        border-radius: ${theme.border_radius.sm} 0 0 ${theme.border_radius.sm};
      }
      &:last-child {
        border-radius: 0 ${theme.border_radius.sm} ${theme.border_radius.sm} 0;
      }

      &:hover {
        color: ${theme.colors.primary};
      }

      &.ant-radio-button-wrapper-checked {
        background-color: ${theme.colors.primary} !important;
        border-color: ${theme.colors.primary} !important;
        color: #000000 !important; /* Texto negro sobre fondo amarillo */

        &::before {
          background-color: transparent !important;
        }
      }

      &.ant-radio-button-wrapper-disabled {
        background-color: ${theme.colors.bgTertiary};
        color: ${theme.colors.fontDisabled};
        border-color: ${theme.colors.border};
      }
    }
  `}
`;
