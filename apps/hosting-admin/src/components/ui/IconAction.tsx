import React, { type MouseEvent } from "react";
import styled, { css } from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import type { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import { Tooltip } from "antd";
import type { Theme } from "../../styles";

export interface IconStyles {
  color?: string | ((theme: Theme) => string);
  hoverColor?: string | ((theme: Theme) => string);
  backgroundColor?: string | ((theme: Theme) => string);
}

export interface IconActionProps extends Omit<
  React.HTMLAttributes<HTMLElement>,
  "onClick"
> {
  icon: IconDefinition | React.ReactNode;
  tooltipTitle?: string;
  size?: number;
  iconStyles?: IconStyles;
  onClick?: (event: MouseEvent<HTMLElement>) => void;
  disabled?: boolean;
  href?: string;
  target?: string;
}

interface IconWrapperProps {
  $size: number;
  $iconStyles: IconStyles;
  $hasAction: boolean;
  $disabled: boolean;
}

export const IconAction: React.FC<IconActionProps> = ({
  icon,
  tooltipTitle,
  size = 38,
  iconStyles = {},
  onClick,
  disabled = false,
  href,
  target,
  ...props
}) => {
  const handleClick = (event: MouseEvent<HTMLElement>): void => {
    if (disabled) {
      event.preventDefault();
      return;
    }
    if (onClick) {
      onClick(event);
    }
  };

  const hasAction = !!onClick || (!!href && !disabled);

  // Renderizado dinámico según el tipo de icono (FontAwesome vs Lucide/ReactNode)
  const renderIcon = () => {
    if (React.isValidElement(icon)) {
      return icon;
    }
    if (typeof icon === "object" && "prefix" in (icon as object)) {
      return <FontAwesomeIcon icon={icon as IconDefinition} />;
    }
    return icon;
  };

  const content = (
    <IconWrapper
      as={href && !disabled ? "a" : "div"}
      href={disabled ? undefined : href}
      target={target}
      onClick={handleClick}
      $size={size}
      $iconStyles={iconStyles}
      $hasAction={hasAction}
      $disabled={disabled}
      {...props}
    >
      {renderIcon()}
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

/* --- RESOLUCIÓN DE COLORES Y ESTILOS DE ACCIÓN --- */

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
  ${({ theme, $size, $hasAction, $disabled, $iconStyles }) => {
    const baseColor = resolveColor(
      theme,
      $iconStyles.color,
      theme.colors.fontSecondary
    );
    const hoverColor = resolveColor(
      theme,
      $iconStyles.hoverColor,
      theme.colors.primary
    );
    const bgColor = resolveColor(
      theme,
      $iconStyles.backgroundColor,
      "transparent"
    );

    return css`
      display: inline-flex;
      justify-content: center;
      align-items: center;
      border-radius: ${theme.border_radius.md};
      height: ${$size}px;
      width: ${$size}px;
      color: ${$disabled ? theme.colors.fontDisabled : baseColor};
      background: ${bgColor};
      transition: all ${theme.transitions.fast};
      position: relative;
      cursor: ${$disabled ? "not-allowed" : $hasAction ? "pointer" : "default"};
      text-decoration: none;

      ${$hasAction &&
      !$disabled &&
      css`
        &:hover {
          border-radius: ${theme.border_radius.full};
          background: ${bgColor !== "transparent"
            ? bgColor
            : theme.colors.bgHover};
          color: ${hoverColor};
          transform: translateY(-1px);
        }

        &:active {
          transform: translateY(0) scale(0.95);
        }
      `}

      svg {
        font-size: ${$size * 0.45}px;
        width: ${$size * 0.45}px;
        height: ${$size * 0.45}px;
        transition: color ${theme.transitions.fast};
      }
    `;
  }}
`;
