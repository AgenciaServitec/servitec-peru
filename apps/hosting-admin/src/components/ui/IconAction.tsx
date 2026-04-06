import React, { type MouseEvent } from "react";
import styled, { css } from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import type { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import Tooltip from "antd/lib/tooltip";
import type { Theme } from "../../styles";
import { rgba } from "polished";

export interface IconActionProps extends Omit<
  React.HTMLAttributes<HTMLDivElement>,
  "onClick"
> {
  icon: IconDefinition;
  tooltipTitle?: string;
  size?: number;
  iconStyles?: IconStyles;
  onClick?: (event: MouseEvent<HTMLDivElement>) => void;
  disabled?: boolean;
}

export interface IconStyles {
  color?: string | ((theme: Theme) => string);
  hoverColor?: string | ((theme: Theme) => string);
  backgroundColor?: string | ((theme: Theme) => string);
}

interface IconWrapperProps {
  $size: number;
  $iconStyles: IconStyles;
  $hasOnClick: boolean;
  $disabled: boolean;
}

export const IconAction: React.FC<IconActionProps> = ({
  icon,
  tooltipTitle,
  size = 38,
  iconStyles = {},
  onClick,
  disabled = false,
  ...props
}) => {
  const handleClick = (event: MouseEvent<HTMLDivElement>): void => {
    if (!disabled && onClick) {
      onClick(event);
    }
  };

  const content = (
    <IconWrapper
      onClick={handleClick}
      $size={size}
      $iconStyles={iconStyles}
      $hasOnClick={!!onClick}
      $disabled={disabled}
      {...props}
    >
      <FontAwesomeIcon icon={icon} />
    </IconWrapper>
  );

  return tooltipTitle ? (
    <Tooltip placement="top" title={tooltipTitle}>
      {content}
    </Tooltip>
  ) : (
    content
  );
};

// Helper para resolver colores dinámicos
const resolveColor = (
  theme: Theme,
  value: IconStyles["color"] | IconStyles["backgroundColor"],
  fallback: string
): string => {
  if (typeof value === "function") return value(theme);
  if (typeof value === "string") return value;
  return fallback;
};

const IconWrapper = styled.div<IconWrapperProps>`
  ${({ theme, $size, $hasOnClick, $disabled, $iconStyles }) => {
    const typedTheme = theme as Theme;

    const baseColor = resolveColor(
      typedTheme,
      $iconStyles.color,
      typedTheme.colors.fontPrimary
    );
    const hoverColor = resolveColor(
      typedTheme,
      $iconStyles.hoverColor,
      typedTheme.colors.primary // Por defecto el hover es tu color corporativo
    );
    const bgColor = resolveColor(
      typedTheme,
      $iconStyles.backgroundColor,
      "transparent"
    );

    return css`
      display: flex;
      justify-content: center;
      align-items: center;
      /* Reemplazado percentage_medium por md */
      border-radius: ${typedTheme.border_radius.md};
      height: ${$size}px;
      width: ${$size}px;
      color: ${$disabled ? typedTheme.colors.fontDisabled : baseColor};
      background: ${bgColor};
      transition: all ${typedTheme.transitions.fast};
      position: relative;
      cursor: ${$disabled
        ? "not-allowed"
        : $hasOnClick
          ? "pointer"
          : "default"};

      ${$hasOnClick &&
      !$disabled &&
      css`
        &:hover {
          /* Efecto circular al hover (Vercel style) */
          border-radius: ${typedTheme.border_radius.full};
          background: ${bgColor !== "transparent"
            ? bgColor
            : rgba(baseColor, 0.15)};
          transform: translateY(-1px);
        }

        &:active {
          transform: translateY(0) scale(0.95);
        }
      `}

      /* Tamaño del icono interno */
      svg {
        font-size: ${$size * 0.45}px;
        transition: color ${typedTheme.transitions.fast};
      }
    `;
  }}
`;
