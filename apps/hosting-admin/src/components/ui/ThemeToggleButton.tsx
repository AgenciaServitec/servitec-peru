import { Button, Tooltip } from "antd";
import styled, { css } from "styled-components";
import { Moon, Sun } from "lucide-react";
import { useThemeContext } from "../../providers";

interface ThemeToggleButtonProps {
  /** Si es true, solo muestra el icono compacto (ideal para la barra superior) */
  compact?: boolean;
}

export const ThemeToggleButton = ({
  compact = false,
}: ThemeToggleButtonProps) => {
  const { mode, toggleTheme } = useThemeContext();
  const isDark = mode === "dark";
  const tooltipText = `Cambiar a ${isDark ? "modo claro" : "modo oscuro"}`;

  return (
    <Tooltip title={tooltipText} placement="bottom">
      <StyledButton type="text" onClick={toggleTheme} $compact={compact}>
        <IconWrapper $isDark={isDark}>
          {isDark ? <Sun size={18} /> : <Moon size={18} />}
        </IconWrapper>

        {!compact && (
          <LabelText>{isDark ? "Modo Claro" : "Modo Oscuro"}</LabelText>
        )}
      </StyledButton>
    </Tooltip>
  );
};

/* --- ESTILOS REUTILIZABLES Y ANIMACIONES --- */

const StyledButton = styled(Button)<{ $compact: boolean }>`
  ${({ theme, $compact }) => css`
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: ${theme.spacing.xs};
    color: ${theme.colors.fontSecondary};
    border-radius: ${theme.border_radius.md};
    height: 36px;
    padding: ${$compact ? "0 8px" : `0 ${theme.spacing.sm}`};
    transition: all ${theme.transitions.fast};

    &:hover {
      color: ${theme.colors.primary};
      background-color: ${theme.colors.bgHover};
    }

    &:active {
      transform: scale(0.96);
    }
  `}
`;

const IconWrapper = styled.span<{ $isDark: boolean }>`
  ${({ theme, $isDark }) => css`
    display: flex;
    align-items: center;
    justify-content: center;
    color: ${$isDark ? theme.colors.primary : theme.colors.fontSecondary};
    transition:
      transform ${theme.transitions.normal},
      color ${theme.transitions.fast};

    /* Transición de rotación sutil al cambiar de tema */
    svg {
      transition: transform ${theme.transitions.normal};
    }

    ${StyledButton}:hover & svg {
      transform: rotate(15deg);
    }
  `}
`;

const LabelText = styled.span`
  ${({ theme }) => css`
    font-size: ${theme.font_sizes.sm};
    font-weight: ${theme.font_weight.medium};
    letter-spacing: -0.01em;
  `}
`;
