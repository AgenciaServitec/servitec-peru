import type { TextAreaProps as AntTextAreaProps } from "antd/lib/input";
import InputAntd from "antd/lib/input";
import { ComponentContainer } from "./component-container";
import styled, { css } from "styled-components";

interface TextAreaProps extends AntTextAreaProps {
  value?: string | number;
  required?: boolean;
  error?: boolean;
  label?: string;
  variant?: "outlined" | "filled";
  helperText?: string;
}

export const TextArea = ({
  value,
  required,
  disabled,
  error,
  label,
  placeholder,
  variant = "filled",
  helperText,
  ...props
}: TextAreaProps) => {
  const Container = ComponentContainer[variant];

  return (
    <Container
      value={value}
      required={required}
      disabled={disabled}
      error={error}
      label={label}
      animation={false} // Desactivamos animación de label para que no choque con el texto largo
      helperText={helperText}
    >
      <StyledTextArea
        variant="borderless"
        value={value}
        disabled={disabled}
        placeholder={placeholder}
        autoSize={{ minRows: 3, maxRows: 6 }} // Recomendación pro para UI limpia
        {...props}
      />
    </Container>
  );
};

const StyledTextArea = styled(InputAntd.TextArea)`
  ${({ theme }) => css`
    width: 100%;
    padding: ${theme.spacing.sm} 0 !important;
    color: ${theme.colors.fontPrimary} !important;
    font-size: ${theme.font_sizes.sm} !important;
    font-family: inherit;
    font-weight: ${theme.font_weight.medium};
    background: transparent !important;
    resize: vertical; /* Solo permitir redimensionar verticalmente */

    &::placeholder {
      color: ${theme.colors.fontTertiary};
    }

    /* Estilo para el scrollbar (Chrome/Safari) */
    &::-webkit-scrollbar {
      width: 6px;
    }
    &::-webkit-scrollbar-thumb {
      background: ${theme.colors.border};
      border-radius: ${theme.border_radius.full};
    }

    /* Estilos cuando está deshabilitado */
    &:disabled {
      color: ${theme.colors.fontDisabled} !important;
      cursor: not-allowed;
    }

    /* Ajuste para el tirador de redimensionamiento de AntD */
    & + .ant-input-textarea-show-count::after {
      color: ${theme.colors.fontTertiary};
    }
  `}
`;
