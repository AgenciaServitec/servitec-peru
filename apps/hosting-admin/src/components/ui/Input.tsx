import InputAntd from "antd/lib/input";
import type { InputProps as AntInputProps } from "antd";
import { ComponentContainer } from "./component-container";
import styled, { css } from "styled-components";

// Corregimos el typo 'InputtProps' a 'InputProps'
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
      disabled={disabled} // IMPORTANTE: Asegúrate que ComponentContainer use esta prop para opacar el label y el borde
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
      font-size: ${theme.font_sizes.sm} !important;
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

      /* Atacamos el input interno y su estado disabled */
      input,
      input:disabled,
      &.ant-input-disabled {
        /* Usamos fontDisabled (#404040) */
        color: ${theme.colors.fontDisabled} !important;

        /* 
           IMPORTANTE: Los navegadores (Chrome/Safari) ignoran 'color' 
           en inputs disabled. Hay que usar esta propiedad:
        */
        -webkit-text-fill-color: ${theme.colors.fontDisabled} !important;

        /* Quitamos cualquier sombra que le ponga AntD */
        text-shadow: none !important;
        cursor: not-allowed;
      }
    }

    .ant-input-prefix,
    .ant-input-suffix {
      color: ${theme.colors.fontTertiary};
    }
  `}
`;
