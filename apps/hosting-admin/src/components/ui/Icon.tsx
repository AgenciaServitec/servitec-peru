import React, { type CSSProperties } from "react";
import styled, { css } from "styled-components";
import {
  FontAwesomeIcon,
  type FontAwesomeIconProps,
} from "@fortawesome/react-fontawesome";

export interface IconProps extends Omit<
  FontAwesomeIconProps,
  "border" | "icon"
> {
  icon: FontAwesomeIconProps["icon"] | React.ReactNode;
  label?: string;
  margin?: CSSProperties["margin"];
  borderRadius?: CSSProperties["borderRadius"];
  border?: CSSProperties["border"];
  direction?: "column" | "row";
  fontSize?: string | number;
  cursor?: string;
  color?: string;
}

interface StyledContainerProps {
  $margin?: CSSProperties["margin"];
  $direction: "column" | "row";
}

interface StyledIconWrapperProps {
  $color?: string;
  $fontSize?: string | number;
  $cursor?: string;
  $border?: CSSProperties["border"];
  $borderRadius?: CSSProperties["borderRadius"];
  $isInteractive: boolean;
}

export const Icon: React.FC<IconProps> = ({
  label,
  icon,
  onClick,
  color,
  fontSize = "1.25rem",
  cursor = "pointer",
  margin,
  border,
  borderRadius,
  direction = "column",
  ...props
}) => {
  const isInteractive = !!onClick;

  const renderIconContent = () => {
    if (React.isValidElement(icon)) {
      return icon;
    }
    if (typeof icon === "object" && icon !== null && "prefix" in icon) {
      return (
        <FontAwesomeIcon
          icon={icon as FontAwesomeIconProps["icon"]}
          {...props}
        />
      );
    }
    return icon;
  };

  return (
    <Container $margin={margin} $direction={direction}>
      <IconWrapper
        onClick={onClick}
        $color={color}
        $fontSize={fontSize}
        $cursor={isInteractive ? cursor : "default"}
        $border={border}
        $borderRadius={borderRadius}
        $isInteractive={isInteractive}
      >
        {renderIconContent()}
      </IconWrapper>
      {label && <Text className="icon-label">{label}</Text>}
    </Container>
  );
};

/* --- ESTILOS REUTILIZABLES Y ALINEADOS AL THEME --- */

const Container = styled.div<StyledContainerProps>`
  ${({ theme, $margin, $direction }) => css`
    margin: ${$margin || `0 ${theme.spacing.xs}`};
    display: inline-flex;
    flex-direction: ${$direction};
    align-items: center;
    justify-content: center;
    gap: ${theme.spacing.xs};
  `}
`;

const IconWrapper = styled.span<StyledIconWrapperProps>`
  ${({
    theme,
    $color,
    $fontSize,
    $cursor,
    $border,
    $borderRadius,
    $isInteractive,
  }) => css`
    display: inline-flex;
    align-items: center;
    justify-content: center;
    color: ${$color || theme.colors.fontSecondary};
    font-size: ${typeof$fontSize === "number" ? `${$fontSize}px` : $fontSize};
    cursor: ${$cursor};
    border: ${$border || "none"};
    border-radius: ${$borderRadius || "none"};
    transition:
      color ${theme.transitions.fast},
      transform${theme.transitions.fast};

    svg {
      width: 1em;
      height: 1em;
      color: inherit;
    }

    ${$isInteractive &&
    css`
      &:hover {
        color: ${theme.colors.primary};
      }

      &:active {
        transform: scale(0.95);
      }
    `}
  `}
`;

const Text = styled.span`
  ${({ theme }) => css`
    font-size: ${theme.font_sizes.xs};
    color: ${theme.colors.fontSecondary};
    font-weight: ${theme.font_weight.medium};
    line-height: 1.2;
    text-align: center;
    user-select: none;
  `}
`;
