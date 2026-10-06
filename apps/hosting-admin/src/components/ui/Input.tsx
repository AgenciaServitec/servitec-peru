import { Input as AntInput, type InputProps as AntInputProps } from "antd";
import styled, { css } from "styled-components";
import { ComponentContainer } from "./component-container";

interface InputProps extends Omit<AntInputProps, "variant"> {
  required?: boolean;
  hidden?: boolean;
  error?: boolean;
  label?: string;
  variant?: "outlined" | "filled";
  disabled?: boolean;
  animation?: boolean;
  helperText?: string;
}

export const Input = ({
  value,
  required = false,
  hidden = false,
  error,
  label,
  variant = "filled",
  disabled = false,
  animation,
  helperText,
  ...props
}: InputProps) => {
  const Container = ComponentContainer[variant];

  return (
    <Container
      value={value}
      required={required}
      hidden={hidden}
      error={error}
      label={label}
      disabled={disabled}
      helperText={helperText}
      animation={animation}
    >
      <StyledInput
        variant="borderless"
        size="large"
        placeholder=""
        value={value}
        disabled={disabled}
        allowClear={!disabled}
        {...props}
      />
    </Container>
  );
};

/* --- ESTILOS LIMPIOS Y ALINEADOS A TU THEME --- */

const StyledInput = styled(AntInput)`
  ${({ theme }) => css`
    width: 100%;

    input {
      color: ${theme.colors.fontPrimary};
      font-weight: ${theme.font_weight.medium};
    }

    .ant-input-clear-icon {
      color: ${theme.colors.fontTertiary};
      transition: color ${theme.transitions.fast};

      &:hover {
        color: ${theme.colors.primary};
      }
    }

    &.ant-input-disabled,
    &.ant-input-affix-wrapper-disabled {
      background-color: transparent;
      cursor: not-allowed;

      input {
        color: ${theme.colors.fontDisabled};
        -webkit-text-fill-color: ${theme.colors.fontDisabled};
        cursor: not-allowed;
      }
    }

    .ant-input-prefix,
    .ant-input-suffix {
      color: ${theme.colors.fontSecondary};
      display: flex;
      align-items: center;

      svg {
        color: ${theme.colors.fontSecondary};
      }
    }
  `}
`;
