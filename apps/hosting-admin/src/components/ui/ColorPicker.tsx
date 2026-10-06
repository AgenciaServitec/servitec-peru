import { ColorPicker as AntColorPicker } from "antd";
import styled, { css } from "styled-components";
import { ComponentContainer } from "./component-container";

interface ColorPickerProps {
  value?: string;
  onChange?: (color: string) => void;
  required?: boolean;
  hidden?: boolean;
  error?: boolean;
  label?: string;
  variant?: "outlined" | "filled";
  disabled?: boolean;
  animation?: boolean;
  helperText?: string;
}

export const ColorPicker = ({
  value,
  onChange,
  required = false,
  hidden = false,
  error,
  label,
  variant = "filled",
  disabled = false,
  animation,
  helperText,
}: ColorPickerProps) => {
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
      <StyledColorPickerWrapper>
        <AntColorPicker
          value={value || "#F59E0B"}
          disabled={disabled}
          format="hex"
          showText
          disabledAlpha
          onChange={(color) => onChange?.(color.toHexString())}
        />
      </StyledColorPickerWrapper>
    </Container>
  );
};

/* --- ESTILOS LIMPIOS Y COHERENTES CON TU THEME --- */

const StyledColorPickerWrapper = styled.div`
  ${({ theme }) => css`
    width: 100%;
    display: flex;
    align-items: center;

    .ant-color-picker-trigger {
      width: 100%;
      height: 38px;
      padding: 0 8px;
      border: none;
      background: transparent;
      box-shadow: none;
      display: flex;
      align-items: center;
      justify-content: flex-start;
      gap: ${theme.spacing.xs};

      .ant-color-picker-color-block {
        width: 24px;
        height: 24px;
        border-radius: ${theme.border_radius.xs};
        border: 1px solid ${theme.colors.border};
      }

      .ant-color-picker-text {
        color: ${theme.colors.fontPrimary};
        font-size: ${theme.font_sizes.sm};
        font-weight: ${theme.font_weight.medium};
        font-family: inherit;
      }

      &:hover:not(.ant-color-picker-trigger-disabled) {
        .ant-color-picker-color-block {
          border-color: ${theme.colors.primary};
        }
      }
    }
  `}
`;