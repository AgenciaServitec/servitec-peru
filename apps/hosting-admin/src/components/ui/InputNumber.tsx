import {
  InputNumber as AntdInputNumber,
  type InputNumberProps as AntdInputNumberProps,
} from "antd";
import styled, { css } from "styled-components";
import { ComponentContainer } from "./component-container";

interface InputNumberProps extends Omit<AntdInputNumberProps, "variant"> {
  value?: number | null;
  required?: boolean;
  disabled?: boolean;
  error?: boolean;
  label?: string;
  variant?: "filled" | "outlined";
  helperText?: string;
  animation?: boolean;
  onChange?: (value: number | null) => void;
}

export const InputNumber = ({
  value,
  required = false,
  disabled = false,
  error = false,
  label,
  variant = "filled",
  helperText,
  animation,
  onChange,
  ...props
}: InputNumberProps) => {
  const Container = ComponentContainer[variant];

  return (
    <Container
      value={value}
      required={required}
      disabled={disabled}
      error={error}
      label={label}
      helperText={helperText}
      animation={animation}
    >
      <StyledInputNumber
        variant="borderless"
        size="large"
        placeholder=""
        value={value}
        disabled={disabled}
        onChange={(val) => onChange?.(val !== null ? Number(val) : null)}
        {...props}
      />
    </Container>
  );
};

/* --- ESTILOS LIMPIOS Y ALINEADOS AL THEME --- */

const StyledInputNumber = styled(AntdInputNumber)`
  ${({ theme }) => css`
    width: 100%;

    .ant-input-number-input {
      color: ${theme.colors.fontPrimary};
      font-size: ${theme.font_sizes.sm};
      font-weight: ${theme.font_weight.medium};
      height: 40px;
    }

    /* Ocultar o suavizar los botones de incremento/decremento laterales */
    .ant-input-number-handler-wrap {
      background: transparent;
      border-left: 1px solid ${theme.colors.border};
      border-radius: 0 ${theme.border_radius.xs}${theme.border_radius.xs} 0;
      opacity: 0;
      transition: opacity ${theme.transitions.fast};

      .ant-input-number-handler {
        border-color: ${theme.colors.border};

        .ant-input-number-handler-up-inner,
        .ant-input-number-handler-down-inner {
          color: ${theme.colors.fontTertiary};

          &:hover {
            color: ${theme.colors.primary};
          }
        }
      }
    }

    &:hover .ant-input-number-handler-wrap,
    &:focus-within .ant-input-number-handler-wrap {
      opacity: 1;
    }

    /* Estado Deshabilitado */
    &.ant-input-number-disabled {
      background: transparent;
      cursor: not-allowed;

      .ant-input-number-input {
        color: ${theme.colors.fontDisabled};
        -webkit-text-fill-color: ${theme.colors.fontDisabled};
        cursor: not-allowed;
      }
    }

    /* Quitar botones de incremento nativos de navegadores */
    input[type="number"]::-webkit-inner-spin-button,
    input[type="number"]::-webkit-outer-spin-button {
      -webkit-appearance: none;
      margin: 0;
    }
  `}
`;
