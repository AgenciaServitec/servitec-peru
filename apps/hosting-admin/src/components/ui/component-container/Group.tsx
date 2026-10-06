import type { ReactNode } from "react";
import { Space, Typography } from "antd";
import styled, { css } from "styled-components";
import { capitalize, startCase } from "lodash";
import { keyframes } from "../../../styles";

const { Text } = Typography;

export interface BaseContainerProps {
  value?: boolean;
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

interface GroupProps extends BaseContainerProps {}

export const Group = ({
  label,
  required,
  error = false,
  helperText,
  children,
}: GroupProps) => (
  <>
    <Container $error={error}>
      {label && (
        <Legend $required={required} $error={error}>
          {label}
        </Legend>
      )}
      <SpaceStyled size="middle" direction="vertical">
        {children}
      </SpaceStyled>
    </Container>
    {helperText && (
      <ErrorText $error={error}>{capitalize(startCase(helperText))}</ErrorText>
    )}
  </>
);

/* --- ESTILOS LIMPIOS Y ALINEADOS AL THEME --- */

const Container = styled.fieldset<{ $error?: boolean }>`
  ${({ theme, $error }) => css`
    border-radius: ${theme.border_radius.md};
    border: 1px solid ${$error ? theme.colors.error : theme.colors.border};
    padding: ${theme.spacing.md};
    margin-top: ${theme.spacing.xs};
    background: ${theme.colors.bgSecondary};
    transition: border-color ${theme.transitions.fast};

    &:hover {
      border-color: ${$error ? theme.colors.error : theme.colors.borderHover};
    }
  `}
`;

const Legend = styled.legend<{ $required?: boolean; $error?: boolean }>`
  ${({ theme, $error, $required }) => css`
    background: ${theme.colors.bgSecondary};
    color: ${$error ? theme.colors.error : theme.colors.fontPrimary};
    border-radius: ${theme.border_radius.xs};
    font-size: ${theme.font_sizes.sm};
    font-weight: ${theme.font_weight.medium};
    padding: 0 ${theme.spacing.sm};
    width: auto;
    margin-bottom: 0;
    float: none;
    line-height: 1;
    transition: color ${theme.transitions.fast};

    ${$required &&
    css`
      &::after {
        content: "*";
        display: inline-block;
        margin-left: ${theme.spacing.xs};
        color: ${theme.colors.error};
        font-size: ${theme.font_sizes.sm};
      }
    `}
  `}
`;

const SpaceStyled = styled(Space)`
  width: 100%;
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
