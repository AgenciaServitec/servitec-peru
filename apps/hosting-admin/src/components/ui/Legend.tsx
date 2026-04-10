import { type ReactNode } from "react";
import styled, { css } from "styled-components";

interface LegendProps {
  title: string;
  children?: ReactNode;
  error?: boolean;
}

export const Legend = ({ title, children, error }: LegendProps) => {
  return (
    <Container $error={error}>
      <Content $error={error}>
        <label className="legend-title">{title}</label>
        <div className="legend-content">{children}</div>
      </Content>
    </Container>
  );
};

const Container = styled.section`
  padding-top: ${({ theme }) => theme.spacing.md};
`;

const Content = styled.div`
  ${({ theme, $error }) => css`
    border-radius: ${theme.border_radius.sm};
    border: 1px solid ${theme.colors.border};
    padding: ${theme.spacing.lg} ${theme.spacing.md} ${theme.spacing.md};
    background: ${theme.colors.bgSecondary};
    position: relative;
    transition: border-color ${theme.transitions.fast};
    .legend-title {
      position: absolute;
      top: -0.75rem;
      left: ${theme.spacing.md};
      z-index: 10;
      pointer-events: none;
      display: inline-block;
      background-color: ${theme.colors.bgSecondary};
      color: ${$error ? theme.colors.error : theme.colors.fontPrimary};
      font-weight: ${theme.font_weight.medium};
      font-size: ${theme.font_sizes.sm};
      padding: 0 ${theme.spacing.xs};
      letter-spacing: 0.02em;
    }

    .legend-content {
      color: ${theme.colors.fontSecondary};
      font-size: ${theme.font_sizes.sm};
    }

    &:hover {
      border-color: ${theme.colors.borderHover};
    }
  `}
`;
