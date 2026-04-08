import InputAntd from "antd/lib/input";
import type { InputProps as AntInputProps } from "antd";
import { ComponentContainer } from "./component-container";
import styled, { css } from "styled-components";

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

const StyledInput = styled(InputAntd)`
  ${({ theme }) => css`
    width: 100%;

    input {
      color: ${theme.colors.fontPrimary} !important;
      font-weight: ${theme.font_weight.medium};

      &::placeholder {
        color: ${theme.colors.fontTertiary};
      }
    }

    .ant-input-clear-icon {
      color: ${theme.colors.fontTertiary};
      &:hover {
        color: ${theme.colors.primary};
      }
    }

    &.ant-input-disabled,
    &.ant-input-affix-wrapper-disabled {
      background-color: transparent !important;
      cursor: not-allowed;

      input,
      input:disabled,
      &.ant-input-disabled {
        color: ${theme.colors.fontDisabled} !important;

        -webkit-text-fill-color: ${theme.colors.fontDisabled} !important;

        text-shadow: none !important;
        cursor: not-allowed;
      }
    }

    .ant-input-prefix,
    .ant-input-suffix {
      color: ${theme.colors.fontPrimary};
      opacity: 0.8;
      svg {
        color: ${theme.colors.fontPrimary};
      }
    }
  `}
`;
