import { type ReactNode } from "react";
import styled from "styled-components";
import { Layout } from "../ui";
import { theme } from "../../styles";

type PublicLayoutProps = {
  children: ReactNode;
};

export const PublicLayout = ({ children }: PublicLayoutProps) => {
  return (
    <LayoutContainer>
      <div className="site-layout-background">
        <div className="content-wrapper">{children}</div>
      </div>
    </LayoutContainer>
  );
};

const LayoutContainer = styled(Layout)`
  width: 100vw;
  min-height: 100vh;

  .site-layout-background {
    min-height: 100svh;
    background: linear-gradient(
      135deg,
      ${theme.colors.dark} 0%,
      ${theme.colors.black} 100%
    );
    display: flex;
    align-items: center;
    justify-content: center;
    padding: ${theme.paddings.large};
    position: relative;

    /* Efecto de puntos decorativos */
    &::before {
      content: "";
      position: absolute;
      width: 100%;
      height: 100%;
      background-image: radial-gradient(
        rgba(255, 184, 77, 0.1) 1px,
        transparent 1px
      );
      background-size: 50px 50px;
      opacity: 0.3;
    }
  }
`;
