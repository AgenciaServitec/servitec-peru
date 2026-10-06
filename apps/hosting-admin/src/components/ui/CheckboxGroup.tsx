import { Checkbox } from "antd";
import type { CheckboxGroupProps as AntdCheckboxGroupProps } from "antd/es/checkbox";
import styled, { css } from "styled-components";
import { ComponentContainer } from "./component-container";

const { Group: AntCheckboxGroup } = Checkbox;

export interface CheckboxGroupProps extends AntdCheckboxGroupProps {
  required?: boolean;
  error?: boolean;
  label?: string;
  helperText?: string;
  variant?: "outlined" | "filled";
}

export const CheckboxGroup = ({
  value,
  onChange,
  options,
  required = false,
  error = false,
  label,
  helperText,
  variant = "filled",
  disabled = false,
  ...props
}: CheckboxGroupProps) => {
  const Container = ComponentContainer[variant];

  return (
    <Container
      value={value}
      required={required}
      error={error}
      label={label}
      helperText={helperText}
      animation={false}
      disabled={disabled}
    >
      <CheckboxGroupStyled
        value={value}
        onChange={onChange}
        options={options}
        disabled={disabled}
        {...props}
      />
    </Container>
  );
};

/* --- ESTILOS LIMPIOS Y ALINEADOS AL THEME --- */

const CheckboxGroupStyled = styled(AntCheckboxGroup)`
  ${({ theme }) => css`
    padding: ${theme.spacing.xs}${theme.spacing.sm};
    display: flex;
    flex-wrap: wrap;
    gap: ${theme.spacing.md};
    align-items: center;

    .ant-checkbox-group-item {
      margin-right: 0;
    }

    .ant-checkbox-wrapper {
      color: ${theme.colors.fontPrimary};
      font-size: ${theme.font_sizes.sm};
      transition: color ${theme.transitions.fast};

      .ant-checkbox-inner {
        width: 18px;
        height: 18px;
        border-radius: ${theme.border_radius.xs};
        transition: all ${theme.transitions.fast};
      }

      /* Checkmark en modo oscuro (Negro sobre el amarillo primario) */
      .ant-checkbox-checked .ant-checkbox-inner::after {
        border-color: ${theme.mode === "dark" ? "#000000" : "#ffffff"};
      }

      &.ant-checkbox-wrapper-disabled {
        color: ${theme.colors.fontDisabled};
        cursor: not-allowed;

        .ant-checkbox-inner {
          background-color: ${theme.colors.bgTertiary};
          border-color: ${theme.colors.border};
        }
      }
    }
  `}
`;