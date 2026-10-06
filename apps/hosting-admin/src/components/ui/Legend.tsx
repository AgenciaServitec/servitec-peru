import type { ReactNode } from "react";
import styled, { css } from "styled-components";

interface LegendProps {
  title: string;
  children?: ReactNode;
  error?: boolean;
}

interface ContentProps {
  $error?: boolean;
}

export const Legend = ({ title, children, error = false }: LegendProps) => {
  return (
    <Container>
      <Content $error={error}>
        <span className="legend-title">{title}</span>
        <div className="legend-content">{children}</div>
      </Content>
    </Container>
  );
};

/* --- ESTILOS LIMPIOS Y ALINEADOS AL THEME --- */

const Container = styled.section`
  padding-top: ${({ theme }) => theme.spacing.md};
  width: 100%;
`;

const Content = styled.div<ContentProps>`
  ${({ theme, $error }) => css`
    border-radius: ${theme.border_radius.md};
    border: 1px solid ${$error ? theme.colors.error : theme.colors.border};
    padding: ${theme.spacing.md};
    background: ${theme.colors.bgSecondary};
    position: relative;
    transition: border-color ${theme.transitions.fast};

    .legend-title {
      position: absolute;
      top: -0.65rem;
      left: ${theme.spacing.md};
      z-index: 2;
      pointer-events: none;
      display: inline-block;
      background-color: ${theme.colors.bgSecondary};
      color: ${$error ? theme.colors.error : theme.colors.fontPrimary};
      font-weight: ${theme.font_weight.medium};
      font-size: ${theme.font_sizes.sm};
      padding: 0 ${theme.spacing.xs};
      line-height: 1;
      letter-spacing: -0.01em;
      transition: color ${theme.transitions.fast};
    }

    .legend-content {
      color: ${theme.colors.fontSecondary};
      font-size: ${theme.font_sizes.sm};
      line-height: 1.5;
    }

    &:hover {
      border-color: ${$error ? theme.colors.error : theme.colors.borderHover};
    }
  `}
`;
