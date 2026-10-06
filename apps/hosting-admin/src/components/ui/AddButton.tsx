import React, { type MouseEvent } from "react";
import styled, { css } from "styled-components";
import { Plus } from "lucide-react";
import { Button } from "./index"; // Tu componente base de botón

export interface AddButtonProps {
  title: string;
  margin?: string;
  onClick: (event: MouseEvent<HTMLButtonElement>) => void;
  disabled?: boolean;
  loading?: boolean;
}

interface ContainerProps {
  $margin?: string;
}

export const AddButton: React.FC<AddButtonProps> = ({
  title,
  margin,
  onClick,
  disabled = false,
  loading = false,
}) => {
  return (
    <Container
      type="primary"
      $margin={margin}
      onClick={onClick}
      disabled={disabled}
      loading={loading}
    >
      <ContentWrapper>
        <Plus size={18} strokeWidth={2.2} />
        <TextWrapper>
          <span>Agregar {title}</span>
        </TextWrapper>
      </ContentWrapper>
    </Container>
  );
};

/* --- ESTILOS MANTENIENDO TU DISEÑO Y PENSADOS EN EL THEME --- */

const Container = styled(Button)<ContainerProps>`
  ${({ theme, $margin }) => css`
    min-width: 120px;
    width: auto;
    height: auto;
    margin: ${$margin || `0 0 ${theme.spacing.lg} 0`};
    padding: ${theme.spacing.sm}${theme.spacing.lg};

    text-transform: none;
    background: ${theme.colors.primary};
    border-color: ${theme.colors.primary};
    border-radius: ${theme.border_radius.md};
    box-shadow: ${theme.shadows.sm};
    transition: all ${theme.transitions.fast};

    /* Color de texto/icono con alto contraste adaptativo */
    color: ${theme.mode === "dark" ? "#000000" : "#ffffff"};

    &:hover:not(:disabled) {
      background: ${theme.colors.primaryDark};
      border-color: ${theme.colors.primaryDark};
      color: ${theme.mode === "dark" ? "#000000" : "#ffffff"};
      transform: translateY(-1px);
      box-shadow: ${theme.shadows.md};
    }

    &:active:not(:disabled) {
      transform: translateY(0);
      box-shadow: none;
    }

    &:disabled {
      background: ${theme.colors.bgTertiary};
      border-color: ${theme.colors.border};
      color: ${theme.colors.fontDisabled};
      opacity: 1;
      cursor: not-allowed;
      box-shadow: none;
      transform: none;
    }
  `}
`;

const ContentWrapper = styled.div`
  ${({ theme }) => css`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    gap: ${theme.spacing.xs};

    svg {
      display: flex;
      align-items: center;
      justify-content: center;
      color: inherit; /* Hereda el color dinámico del botón */
      transition: transform ${theme.transitions.fast};
    }
  `}
`;

const TextWrapper = styled.div`
  ${({ theme }) => css`
    white-space: nowrap;
    font-size: ${theme.font_sizes.sm};
    font-weight: ${theme.font_weight.medium};
    text-transform: none;
    text-shadow: none;
    color: inherit; /* Hereda el color dinámico del botón */
    letter-spacing: -0.01em;

    span {
      display: block;
      line-height: 1.5;
    }
  `}
`;
