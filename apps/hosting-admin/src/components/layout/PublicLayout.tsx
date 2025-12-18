import { type ReactNode } from "react";
import styled, { css } from "styled-components";
import { Layout } from "../ui";

type PublicLayoutProps = {
  children: ReactNode;
};

export const PublicLayout = ({ children }: PublicLayoutProps) => {
  return (
    <LayoutContainer>
      <div className="site-layout-background" style={{ padding: 24 }}>
        {children}
      </div>
    </LayoutContainer>
  );
};

const LayoutContainer = styled(Layout)`
  ${({ theme }) => css`
    .site-layout-background {
      width: 100vw;
      min-height: 100svh;
      background: linear-gradient(
        135deg,
        ${theme.colors.bgPrimary} 0%,
        ${theme.colors.black} 100%
      );
    }
  `}
`;
