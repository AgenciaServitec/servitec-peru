import type { ReactNode } from "react";
import styled, { css } from "styled-components";
import { capitalize, startCase } from "lodash";
import { keyframes } from "../../../styles";
import Typography from "antd/lib/typography";
import SpaceAntd from "antd/lib/space";

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
  error,
  helperText,
  children,
}: GroupProps) => (
  <>
    <Container $error={error}>
      <Legend $required={required} $error={error}>
        {label}
      </Legend>
      <SpaceStyled size="middle" direction="vertical">
        {children}
      </SpaceStyled>
    </Container>
    {helperText && (
      <Error $error={error}>{capitalize(startCase(helperText))}</Error>
    )}
  </>
);

const Container = styled.fieldset<{ $error?: boolean }>`
  ${({ theme, $error }) => css`
    border-radius: ${theme.border_radius
      .md}; /* De 8px para consistencia con inputs */
    border: 1px solid ${$error ? theme.colors.error : theme.colors.border};
    padding: ${theme.spacing.sm} ${theme.spacing.md} ${theme.spacing.md};
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
    /* El fondo debe ser el mismo que el del contenedor para el efecto de 'corte' */
    background: ${theme.colors.bgSecondary};
    color: ${$error ? theme.colors.error : theme.colors.fontPrimary};
    border-radius: ${theme.border_radius.xs};
    font-size: ${theme.font_sizes.sm};
    font-weight: ${theme.font_weight.medium};
    padding: 0 ${theme.spacing.sm};
    width: auto;
    margin-bottom: 0; /* Evitamos márgenes extra que rompan la simetría */
    float: none; /* Reset para comportamiento estándar de legend */
    transition: color ${theme.transitions.fast};

    ${$required &&
    css`
      &::after {
        content: "*";
        display: inline-block;
        margin-left: ${theme.spacing.xs};
        color: ${$error ? theme.colors.error : theme.colors.primary};
        font-size: ${theme.font_sizes.sm};
        line-height: 1;
      }
    `}
  `}
`;

const SpaceStyled = styled(SpaceAntd)`
  width: 100%;
`;

const Error = styled(Text)<{ $error?: boolean }>`
  ${({ theme, $error }) => css`
    display: block;
    color: ${theme.colors.error};
    font-size: ${theme.font_sizes.xs};
    margin-top: ${theme.spacing.xs};
    ${$error &&
    css`
      animation: ${keyframes.shake} 340ms;
    `};
  `}
`;
