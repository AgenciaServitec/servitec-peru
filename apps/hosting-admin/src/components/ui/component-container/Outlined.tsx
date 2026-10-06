import { type ReactNode } from "react";
import { Typography } from "antd";
import styled, { css } from "styled-components";
import { capitalize, isEmpty, isObject, startCase } from "lodash";
import { classNames, keyframes } from "../../../styles";

const { Text } = Typography;

export interface BaseContainerProps {
  value?: any;
  required?: boolean;
  error?: boolean;
  hidden?: boolean;
  label?: string;
  disabled?: boolean;
  componentId?: string;
  children?: ReactNode;
  animation?: boolean;
  helperText?: string;
}

interface OutlinedProps extends BaseContainerProps {}

// Helper seguro para validar presencia de valor
const hasValue = (val: any): boolean => {
  if (val === null || val === undefined || val === "") return false;
  if (isObject(val)) return !isEmpty(val);
  return true;
};

export const Outlined = ({
  value,
  required,
  error = false,
  hidden = false,
  label,
  children,
  componentId,
  helperText,
  disabled = false,
}: OutlinedProps) => (
  <Container
    $error={error}
    $required={required}
    $disabled={disabled}
    $hidden={hidden}
  >
    {label && (
      <label htmlFor={componentId} className="item-label">
        {label}
      </label>
    )}
    <Wrapper
      $value={hasValue(value)}
      $error={error}
      className={classNames({ "scroll-error-anchor": error })}
      $disabled={disabled}
    >
      <div className="item-wrapper">{children}</div>
    </Wrapper>
    {helperText && (
      <ErrorText $error={error}>{capitalize(startCase(helperText))}</ErrorText>
    )}
  </Container>
);

/* --- ESTILOS LIMPIOS Y ALINEADOS AL THEME --- */

const Container = styled.div<{
  $error?: boolean;
  $required?: boolean;
  $disabled?: boolean;
  $hidden?: boolean;
}>`
  ${({ theme, $error, $required, $disabled, $hidden }) => css`
    width: 100%;
    display: ${$hidden ? "none" : "block"};

    .item-label {
      margin-bottom: ${theme.spacing.xs};
      display: flex;
      align-items: center;
      color: ${$error
        ? theme.colors.error
        : $disabled
          ? theme.colors.fontDisabled
          : theme.colors.fontPrimary};
      font-size: ${theme.font_sizes.sm};
      font-weight: ${theme.font_weight.medium};
      transition: color ${theme.transitions.fast};

      ${$required &&
      css`
        &::after {
          content: "*";
          margin-left: ${theme.spacing.xs};
          color: ${theme.colors.error};
          font-size: ${theme.font_sizes.sm};
        }
      `};
    }
  `};
`;

const Wrapper = styled.div<{
  $error?: boolean;
  $disabled?: boolean;
  $value?: boolean;
}>`
  ${({ theme, $error, $disabled }) => css`
    position: relative;
    width: 100%;
    border-radius: ${theme.border_radius.md};
    background: ${$disabled
      ? theme.colors.bgTertiary
      : theme.colors.bgSecondary};
    border: 1px solid ${$error ? theme.colors.error : theme.colors.border};
    transition:
      border-color ${theme.transitions.fast},
      box-shadow ${theme.transitions.fast};
    animation: ${$error && keyframes.shake} 340ms
      cubic-bezier(0.36, 0.07, 0.19, 0.97) both;

    &:hover {
      border-color: ${$error
        ? theme.colors.error
        : $disabled
          ? theme.colors.border
          : theme.colors.borderHover};
    }

    &:focus-within {
      border-color: ${$error ? theme.colors.error : theme.colors.primary};
      box-shadow: 0 0 0 2px
        ${$error ? `${theme.colors.error}26` : theme.colors.primaryAlpha};
    }

    .item-wrapper {
      /* Integración limpia para controles de Ant Design */
      .ant-input-number,
      .ant-picker,
      .ant-select {
        width: 100%;
        border: none;
        box-shadow: none;
        background: transparent;
      }

      .ant-input,
      .ant-select-selector,
      .ant-input-affix-wrapper {
        background: transparent;
        border: none;
        box-shadow: none;
        height: 38px;
        display: flex;
        align-items: center;
      }

      .ant-input-group-addon {
        border: none;
        border-left: 1px solid ${theme.colors.border};
        background: ${theme.colors.bgTertiary};
        color: ${theme.colors.fontSecondary};
        border-radius: 0 ${theme.border_radius.md}${theme.border_radius.md} 0;
      }

      input:-webkit-autofill {
        -webkit-text-fill-color: ${theme.colors.fontPrimary};
        -webkit-box-shadow: 0 0 0 1000px ${theme.colors.bgSecondary} inset;
      }
    }
  `}
`;

const ErrorText = styled(Text)<{ $error?: boolean }>`
  ${({ theme, $error }) => css`
    display: block;
    color: ${theme.colors.error};
    font-size: ${theme.font_sizes.xs};
    margin-top: ${theme.spacing.xs};
    margin-left: ${theme.spacing.xs};

    ${$error &&
    css`
      animation: ${keyframes.shake} 340ms cubic-bezier(0.36, 0.07, 0.19, 0.97)
        both;
    `};
  `}
`;
