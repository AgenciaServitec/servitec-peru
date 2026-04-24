import { DatePicker as AntdDatePicker } from "antd";
import { ComponentContainer } from "./component-container";
import { type Dayjs } from "dayjs";
import styled, { css } from "styled-components";

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
  prefix?: string | null;
  disabledDate?: (current: Dayjs) => boolean;
  format?: "DD/MM/YYYY HH:mm";
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
  disabledDate = (current: Dayjs) => false,
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
        value={value}
        disabled={disabled}
        name={name}
        placeholder=""
        onChange={onChange}
        allowClear={allowClear}
        variant="borderless"
        prefix={prefix}
        disabledDate={disabledDate}
        style={{ width: "100%" }}
      />
    </Container>
  );
};

const StyledDatePicker = styled(AntdDatePicker)`
  ${({ theme }) => css`
    width: 100%;

    /* Texto interno del DatePicker */
    .ant-picker-input > input {
      color: ${theme.colors.fontPrimary} !important;
      font-size: ${theme.font_sizes.sm} !important;
      font-weight: ${theme.font_weight.medium};

      &::placeholder {
        color: ${theme.colors.fontTertiary};
      }
    }

    /* Icono de Calendario (Suffix) */
    .ant-picker-suffix {
      color: ${theme.colors.primary};
      transition: color ${theme.transitions.fast};
    }

    /* Icono de Limpiar (Clear) */
    .ant-picker-clear {
      background: transparent;
      color: ${theme.colors.fontTertiary};
      &:hover {
        color: ${theme.colors.primary};
      }
    }

    /* Estilos cuando está deshabilitado */
    &.ant-picker-disabled {
      background: transparent !important;
      .ant-picker-input > input {
        color: ${theme.colors.fontDisabled} !important;
      }
      .ant-picker-suffix {
        color: ${theme.colors.fontDisabled};
      }
    }

    /* Ajuste de prefijo si existe */
    .ant-picker-prefix {
      color: ${theme.colors.fontTertiary};
      margin-right: ${theme.spacing.xs};
    }
  `}
`;
