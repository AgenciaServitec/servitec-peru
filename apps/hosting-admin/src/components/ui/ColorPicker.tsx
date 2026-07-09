import { ColorPicker as AntDColorPicker } from "antd";
import { ComponentContainer } from "./component-container";
import styled, { css } from "styled-components";

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
      <StyledColorPickerContainer>
        <AntDColorPicker
          value={value || "#000000"}
          disabled={disabled}
          allowClear={false}
          onChange={(color) => onChange?.(color.toHexString())}
        />
      </StyledColorPickerContainer>
    </Container>
  );
};

const StyledColorPickerContainer = styled.div`
  ${({ theme }) => css`
    width: 100%;
    display: flex;
    align-items: center;
    padding: 4px;

    .ant-color-picker-trigger {
      border: none !important;
      background: transparent !important;
      width: 100% !important;
      padding: 0 !important;
      height: 36px;

      .ant-color-picker-color-block {
        width: 100% !important;
        height: 100% !important;
        border-radius: ${theme.border_radius.sm};
        border: 1px solid ${theme.colors.border};
      }
    }
  `}
`;
