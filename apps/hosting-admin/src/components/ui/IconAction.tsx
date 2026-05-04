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
  href?: string;
  target?: string;
}

export interface IconStyles {
  color?: string | ((theme: Theme) => string);
  hoverColor?: string | ((theme: Theme) => string);
  backgroundColor?: string | ((theme: Theme) => string);
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
    const typedTheme = theme as Theme;

    const baseColor = resolveColor(
      typedTheme,
      $iconStyles.color,
      typedTheme.colors.fontPrimary
    );
    const hoverColor = resolveColor(
      typedTheme,
      $iconStyles.hoverColor,
      typedTheme.colors.primary
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
      border-radius: ${typedTheme.border_radius.md};
      height: ${$size}px;
      width: ${$size}px;
      color: ${$disabled ? typedTheme.colors.fontDisabled : baseColor};
      background: ${bgColor};
      transition: all ${typedTheme.transitions.fast};
      position: relative;
      cursor: ${$disabled ? "not-allowed" : $hasAction ? "pointer" : "default"};

      ${$hasAction &&
      !$disabled &&
      css`
        &:hover {
          border-radius: ${typedTheme.border_radius.full};
          background: ${bgColor !== "transparent"
            ? bgColor
            : rgba(baseColor, 0.15)};
          transform: translateY(-1px);
          color: ${baseColor};
        }

        &:active {
          transform: translateY(0) scale(0.95);
        }
      `}

      svg {
        font-size: ${$size * 0.45}px;
        transition: color ${typedTheme.transitions.fast};
      }
    `;
  }}
`;
