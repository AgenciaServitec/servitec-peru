import type { TimePickerProps as AntTimePickerProps } from "antd";
import { TimePicker as AntdTimePicker } from "antd";
import type { Dayjs } from "dayjs";
import styled, { css } from "styled-components";
import { ComponentContainer } from "./component-container";

interface TimePickerProps extends Omit<AntTimePickerProps, "variant"> {
  value?: Dayjs | null;
  disabled?: boolean;
  required?: boolean;
  error?: boolean;
  label?: string;
  variant?: "outlined" | "filled";
  helperText?: string;
  animation?: boolean;
}

export const TimePicker = ({
  value,
  disabled = false,
  required = false,
  error = false,
  label,
  variant = "filled",
  helperText,
  animation,
  ...props
}: TimePickerProps) => {
  const Container = ComponentContainer[variant];

  return (
    <Container
      value={value}
      required={required}
      disabled={disabled}
      error={error}
      label={label}
      animation={animation}
      helperText={helperText}
    >
      <StyledTimePicker
        variant="borderless"
        size="large"
        placeholder=""
        value={value}
        disabled={disabled}
        {...props}
      />
    </Container>
  );
};

/* --- ESTILOS LIMPIOS Y ALINEADOS AL THEME --- */

const StyledTimePicker = styled(AntdTimePicker)`
  ${({ theme }) => css`
    width: 100%;

    /* Texto e input principal */
    .ant-picker-input > input {
      color: ${theme.colors.fontPrimary};
      font-size: ${theme.font_sizes.sm};
      font-weight: ${theme.font_weight.medium};
    }

    /* Icono del reloj (Suffix) */
    .ant-picker-suffix {
      color: ${theme.colors.primary};
      transition: color ${theme.transitions.fast};
    }

    /* Icono de Limpiar (Clear) */
    .ant-picker-clear {
      background: transparent;
      color: ${theme.colors.fontTertiary};
      transition: color ${theme.transitions.fast};

      &:hover {
        color: ${theme.colors.primary};
      }
    }

    /* Estado deshabilitado */
    &.ant-picker-disabled {
      background: transparent;
      cursor: not-allowed;

      .ant-picker-input > input {
        color: ${theme.colors.fontDisabled};
        -webkit-text-fill-color: ${theme.colors.fontDisabled};
        cursor: not-allowed;
      }

      .ant-picker-suffix {
        color: ${theme.colors.fontDisabled};
      }
    }

    /* Prefijo (si se le añade icono) */
    .ant-picker-prefix {
      color: ${theme.colors.fontTertiary};
      margin-right: ${theme.spacing.xs};
      display: flex;
      align-items: center;
    }
  `}
`;