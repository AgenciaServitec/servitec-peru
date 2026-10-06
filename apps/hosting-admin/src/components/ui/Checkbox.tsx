import type { ReactNode } from "react";
import { Checkbox as AntdCheckbox } from "antd";
import styled, { css } from "styled-components";
import { classNames, keyframes } from "../../styles";

interface CheckboxProps {
  name?: string;
  checked?: boolean;
  onChange?: (value: boolean) => void;
  error?: boolean;
  required?: boolean;
  hidden?: boolean;
  children?: ReactNode;
  dataTestId?: string;
}

export const Checkbox = ({
  name,
  checked,
  onChange,
  error = false,
  required = false,
  hidden = false,
  children,
  dataTestId,
}: CheckboxProps) => (
  <CheckBoxAntdStyled
    name={name}
    className={classNames({ "scroll-error-anchor": error })}
    checked={checked}
    onChange={(e) => onChange?.(e.target.checked)}
    $error={error}
    $hidden={hidden}
    $required={required}
    data-testid={dataTestId}
  >
    {children && <span className="checkbox-content">{children}</span>}
  </CheckBoxAntdStyled>
);

/* --- ESTILOS LIMPIOS Y ALINEADOS AL THEME --- */

const CheckBoxAntdStyled = styled(AntdCheckbox)<{
  $error: boolean;
  $hidden: boolean;
  $required: boolean;
}>`
  ${({ theme, $error, $hidden, $required }) => css`
    font-size: ${theme.font_sizes.sm};
    display: ${$hidden ? "none" : "inline-flex"};
    align-items: center;
    color: ${$error ? theme.colors.error : theme.colors.fontSecondary};

    /* Animación de error sutil */
    animation: ${$error && keyframes.shake} 340ms
      cubic-bezier(0.36, 0.07, 0.19, 0.97) both;

    .ant-checkbox {
      top: 0;

      .ant-checkbox-inner {
        width: 18px;
        height: 18px;
        border-radius: ${theme.border_radius.xs};
        transition: all ${theme.transitions.fast};
      }
    }

    /* Color de la "palomita" sobre fondo primario (Negro/Oscuro para contraste con el amarillo) */
    .ant-checkbox-checked .ant-checkbox-inner::after {
      border-color: ${theme.mode === "dark" ? "#000000" : "#ffffff"};
    }

    /* Estilos cuando hay Error */
    ${$error &&
    css`
      .ant-checkbox .ant-checkbox-inner {
        border-color: ${theme.colors.error};
      }

      .ant-checkbox-checked .ant-checkbox-inner {
        background-color: ${theme.colors.error};
        border-color: ${theme.colors.error};

        &::after {
          border-color: #ffffff; /* Blanco sobre rojo de error */
        }
      }
    `}

    /* Indicador de Requerido (*) */
    ${$required &&
    css`
      .checkbox-content::after {
        content: "*";
        margin-left: ${theme.spacing.xs};
        color: ${theme.colors.error};
        font-size: ${theme.font_sizes.sm};
      }
    `}

    .checkbox-content {
      padding-left: ${theme.spacing.sm};
      line-height: 1;
      user-select: none;
      color: ${theme.colors.fontPrimary};
    }
  `}
`;