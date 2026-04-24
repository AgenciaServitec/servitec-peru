import styled, { css } from "styled-components";
import {
  FontAwesomeIcon,
  type FontAwesomeIconProps,
} from "@fortawesome/react-fontawesome";
import type { CSSProperties } from "react";

interface IconProps extends Omit<FontAwesomeIconProps, "border"> {
  label?: string;
  margin?: CSSProperties["margin"];
  borderRadius?: CSSProperties["borderRadius"];
  border?: CSSProperties["border"];
  direction?: "column" | "row";
}

// Usamos prefijo $ para evitar que las props de styled-components bajen al DOM
interface StyledContainerProps {
  $margin?: CSSProperties["margin"];
  $direction: "column" | "row";
}

interface StyledIconProps {
  $borderRadius?: CSSProperties["borderRadius"];
  $border?: CSSProperties["border"];
  $fontSize?: string | number;
  $cursor?: string;
}

export const Icon = ({
  label,
  icon,
  onClick,
  color,
  fontSize,
  cursor = "pointer",
  margin,
  border,
  borderRadius,
  direction = "column",
  ...props // Permitimos pasar el resto de props de FontAwesome
}: IconProps) => {
  return (
    <Container $margin={margin} $direction={direction}>
      <StyledIcon
        {...props}
        color={color}
        onClick={onClick}
        icon={icon}
        $fontSize={fontSize}
        $cursor={cursor}
        $border={border}
        $borderRadius={borderRadius}
      />
      {label && <Text className="icon-label">{label}</Text>}
    </Container>
  );
};

const Container = styled.div<StyledContainerProps>`
  ${({ theme, $margin, $direction }) => css`
    /* Usamos spacing.xs (4px) como fallback si no hay margen definido */
    margin: ${$margin || `0 ${theme.spacing.xs}`};
    display: flex;
    flex-direction: ${$direction};
    align-items: center;
    justify-content: center;
    gap: ${theme.spacing.xs};
  `}
`;

const StyledIcon = styled(FontAwesomeIcon)<StyledIconProps>`
  ${({ theme, color, $fontSize, $cursor, $border, $borderRadius }) => css`
    color: ${color || theme.colors.fontSecondary};
    font-size: ${$fontSize ||
    "1.25rem"}; /* Ajustado a un tamaño más estándar */
    cursor: ${$cursor};
    border: ${$border || "none"};
    border-radius: ${$borderRadius || "none"};
    transition: color ${theme.transitions.fast};

    &:hover {
      /* Solo cambia a primary si tiene un onClick (es interactivo) */
      color: ${$cursor === "pointer"
        ? theme.colors.primary
        : color || theme.colors.fontSecondary};
    }
  `}
`;

const Text = styled.span`
  ${({ theme }) => css`
    font-size: ${theme.font_sizes.xs}; /* 12px desde el theme */
    color: ${theme.colors.fontSecondary};
    font-weight: ${theme.font_weight.medium};
    line-height: 1.2;
    text-align: center;
    user-select: none;
  `}
`;
