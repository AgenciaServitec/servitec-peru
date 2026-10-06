import { DatePicker as AntdDatePicker } from "antd";
import type { Dayjs } from "dayjs";
import styled, { css } from "styled-components";
import { ComponentContainer } from "./component-container";

interface DatePickerProps {
  value?: Dayjs | string | undefined;
  name?: string;
  required?: boolean;
  disabled?: boolean;
  hidden?: boolean;
  error?: boolean;
  helperText?: string;
  label?: string;
  variant?: "outlined" | "filled";
  allowClear?: boolean;
  onChange?: (value?: Dayjs | string) => void;
  prefix?: React.ReactNode;
  disabledDate?: (current: Dayjs) => boolean;
  format?: string;
}

export const DatePicker = ({
  value = undefined,
  name,
  required = false,
  disabled = false,
  hidden = false,
  error = false,
  helperText = "",
  label,
  variant = "filled",
  allowClear = true,
  onChange,
  prefix = null,
  disabledDate,
  format = "DD/MM/YYYY HH:mm",
}: DatePickerProps) => {
  const Container = ComponentContainer[variant];

  return (
    <Container
      value={value}
      required={required}
      disabled={disabled}
      hidden={hidden}
      error={error}
      label={label}
      helperText={helperText}
    >
      <StyledDatePicker
        size="large"
        format={format}
        value={value as any}
        disabled={disabled}
        name={name}
        placeholder=""
        onChange={onChange as any}
        allowClear={allowClear}
        variant="borderless"
        prefix={prefix}
        disabledDate={disabledDate}
      />
    </Container>
  );
};

/* --- ESTILOS LIMPIOS Y SIN !IMPORTANT --- */

const StyledDatePicker = styled(AntdDatePicker)`
  ${({ theme }) => css`
    width: 100%;

    /* Texto e input principal */
    .ant-picker-input > input {
      color: ${theme.colors.fontPrimary};
      font-size: ${theme.font_sizes.sm};
      font-weight: ${theme.font_weight.medium};
    }

    /* Icono principal de Calendario/Reloj (Suffix) */
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

    /* Estado Deshabilitado */
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

    /* Prefijo */
    .ant-picker-prefix {
      color: ${theme.colors.fontTertiary};
      margin-right: ${theme.spacing.xs};
      display: flex;
      align-items: center;
    }
  `}
`;