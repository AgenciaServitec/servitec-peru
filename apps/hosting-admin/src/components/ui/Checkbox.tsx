import CheckboxAntd from "antd/lib/checkbox";
import styled, { css } from "styled-components";
import { classNames, keyframes } from "../../styles";
import type { ReactNode } from "react";

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
    onChange={(e) => onChange && onChange(e.target.checked)}
    $error={error} // Usamos $ para props transitorias
    $hidden={hidden}
    $required={required}
    data-testid={dataTestId}
  >
    {children && <span className="checkbox-content">{children}</span>}
  </CheckBoxAntdStyled>
);

const CheckBoxAntdStyled = styled(CheckboxAntd)<{
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
      top: 0; /* Alineación mejorada */

      .ant-checkbox-inner {
        background: ${theme.colors
          .bgTertiary}; /* Un poco más oscuro que el fondo para contraste */
        border-color: ${theme.colors.border};
        border-radius: ${theme.border_radius.xs}; /* 4px para look técnico */
        width: 18px;
        height: 18px;
        transition: all ${theme.transitions.fast};
      }
    }

    /* Estado Seleccionado */
    .ant-checkbox-checked {
      .ant-checkbox-inner {
        background-color: ${theme.colors.primary};
        border-color: ${theme.colors.primary};

        /* El color de la "palomita" debe ser negro sobre el fondo amarillo */
        &::after {
          border-color: #000000 !important;
        }
      }

      &::after {
        border: 1px solid ${theme.colors.primary};
      }
    }

    /* Hover */
    &:hover .ant-checkbox-inner,
    .ant-checkbox:hover .ant-checkbox-inner {
      border-color: ${theme.colors.primary};
    }

    /* Estilos de Error */
    ${$error &&
    css`
      .ant-checkbox .ant-checkbox-inner {
        border-color: ${theme.colors.error};
      }

      .ant-checkbox-checked .ant-checkbox-inner {
        background-color: ${theme.colors.error};
        border-color: ${theme.colors.error};

        &::after {
          border-color: #ffffff !important; /* Blanco sobre rojo de error */
        }
      }
    `}

    /* Estilo de Requerido */
    ${$required &&
    css`
      .checkbox-content {
        &::after {
          /* Movido a after para un look más limpio */
          content: "*";
          margin-left: ${theme.spacing.xs};
          color: ${theme.colors.error};
          font-size: ${theme.font_sizes.sm};
        }
      }
    `}

    .checkbox-content {
      padding-left: ${theme.spacing.sm};
      line-height: 1;
      user-select: none;
    }
  `}
`;
