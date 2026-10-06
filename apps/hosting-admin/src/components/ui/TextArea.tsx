import { Input } from "antd";
import type { TextAreaProps as AntTextAreaProps } from "antd/es/input";
import styled, { css } from "styled-components";
import { ComponentContainer } from "./component-container";

const { TextArea: AntTextArea } = Input;

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
      animation={false}
      helperText={helperText}
    >
      <StyledTextArea
        variant="borderless"
        value={value}
        disabled={disabled}
        placeholder={placeholder}
        autoSize={{ minRows: 3, maxRows: 6 }}
        {...props}
      />
    </Container>
  );
};

/* --- ESTILOS LIMPIOS SIN !IMPORTANT Y ALINEADOS AL THEME --- */

const StyledTextArea = styled(AntTextArea)`
  ${({ theme }) => css`
    width: 100%;
    padding: ${theme.spacing.sm};
    color: ${theme.colors.fontPrimary};
    font-size: ${theme.font_sizes.sm};
    font-weight: ${theme.font_weight.medium};
    font-family: inherit;
    background: transparent;
    resize: vertical;

    &::placeholder {
      color: ${theme.colors.fontTertiary};
    }

    /* Scrollbar interno del textarea */
    &::-webkit-scrollbar {
      width: 6px;
    }
    &::-webkit-scrollbar-thumb {
      background: ${theme.colors.border};
      border-radius: ${theme.border_radius.full};

      &:hover {
        background: ${theme.colors.fontTertiary};
      }
    }

    &:disabled {
      color: ${theme.colors.fontDisabled};
      -webkit-text-fill-color: ${theme.colors.fontDisabled};
      cursor: not-allowed;
    }

    /* Soporte para prop showCount de AntD */
    & + .ant-input-textarea-suffix,
    & + .ant-input-textarea-show-count::after {
      color: ${theme.colors.fontTertiary};
      font-size: ${theme.font_sizes.xs};
    }
  `}
`;
