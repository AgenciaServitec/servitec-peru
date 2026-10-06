import React from "react";
import styled, { css } from "styled-components";
import type { RadioGroupProps as AntdRadioGroupProps } from "antd";
import { Radio as RadioAntd } from "antd";
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
  value,
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
      value={value}
      required={required}
      error={error}
      label={label}
      animation={animation}
      helperText={helperText}
      disabled={disabled}
    >
      <RadioGroupStyled
        value={value}
        onChange={(e) => onChange?.(e.target.value)}
        options={options}
        disabled={disabled}
        {...props}
      />
    </Container>
  );
};

/* --- ESTILOS LIMPIOS SIN !IMPORTANT --- */

const RadioGroupStyled = styled(RadioAntd.Group)`
  ${({ theme }) => css`
    padding: ${theme.spacing.xs}${theme.spacing.sm};
    display: flex;
    flex-wrap: wrap;
    gap: ${theme.spacing.md};
    align-items: center;

    &:has(.ant-radio-button-wrapper),
    &.ant-radio-group-outline,
    &.ant-radio-group-solid {
      display: inline-flex;
      gap: 0;
      padding: 0;
    }

    /* Radios estándar */
    .ant-radio-wrapper {
      color: ${theme.colors.fontPrimary};
      font-size: ${theme.font_sizes.sm};
      margin-right: 0;
      transition: color ${theme.transitions.fast};

      .ant-radio-inner {
        width: 18px;
        height: 18px;
        border-radius: ${theme.border_radius.full};
        transition: all ${theme.transitions.fast};

        /* Punto interno (Dot) con alto contraste */
        &::after {
          background-color: ${theme.mode === "dark" ? "#000000" : "#ffffff"};
          width: 8px;
          height: 8px;
          margin-top: -4px;
          margin-left: -4px;
        }
      }

      &.ant-radio-wrapper-disabled {
        color: ${theme.colors.fontDisabled};
        cursor: not-allowed;

        .ant-radio-inner {
          background-color: ${theme.colors.bgTertiary};
          border-color: ${theme.colors.border};
        }
      }
    }

    /* Modo Botón (Radio.Button) */
    .ant-radio-button-wrapper {
      height: 36px;
      line-height: 34px;
      font-size: ${theme.font_sizes.sm};
      transition: all ${theme.transitions.fast};

      &:first-child {
        border-radius: ${theme.border_radius.xs} 0 0 ${theme.border_radius.xs};
      }
      &:last-child {
        border-radius: 0 ${theme.border_radius.xs}${theme.border_radius.xs} 0;
      }

      &.ant-radio-button-wrapper-checked {
        color: ${theme.mode === "dark" ? "#000000" : "#ffffff"};
        font-weight: ${theme.font_weight.medium};

        &::before {
          background-color: transparent;
        }
      }

      &.ant-radio-button-wrapper-disabled {
        color: ${theme.colors.fontDisabled};
      }
    }
  `}
`;
