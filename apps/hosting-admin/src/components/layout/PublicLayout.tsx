import { type ReactNode } from "react";
import styled, { css } from "styled-components";
import { Layout } from "../ui";

type PublicLayoutProps = {
  children: ReactNode;
};

export const PublicLayout = ({ children }: PublicLayoutProps) => {
  return (
    <LayoutContainer>
      <div className="public-content-wrapper">{children}</div>
    </LayoutContainer>
  );
};

const LayoutContainer = styled(Layout)`
  ${({ theme }) => css`
    width: 100vw;
    /* Usamos dvh para evitar problemas de scroll en móviles con el teclado o barras de UI */
    min-height: 100dvh;
    display: flex;
    align-items: center;
    justify-content: center;

    /* Degradado premium usando tus tokens actuales */
    background: ${theme.mode === "dark"
      ? `linear-gradient(135deg, ${theme.colors.bgPrimary} 0%, ${theme.colors.bgTertiary} 100%)`
      : `linear-gradient(135deg, ${theme.colors.bgTertiary} 0%, ${theme.colors.bgPrimary} 100%)`} !important;

    .public-content-wrapper {
      width: 100%;
      max-width: 450px; /* Ancho estándar para formularios de login profesional */
      padding: ${theme.spacing.lg};
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      animation: fadeIn 0.5s ease-out;
    }

    @keyframes fadeIn {
      from {
        opacity: 0;
        transform: translateY(10px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }
  `}
`;
