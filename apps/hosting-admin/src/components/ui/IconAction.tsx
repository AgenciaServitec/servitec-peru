import React, { type MouseEvent } from "react";
import styled, { css } from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import type { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import { transparentize } from "polished";
import Tooltip from "antd/lib/tooltip";
import type { Theme } from "../../styles";

export interface IconActionProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "onClick"> {
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

const resolveColor = (
  theme: Theme,
  value: IconStyles["color"],
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
      baseColor
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
      border-radius: ${typedTheme.border_radius.percentage_medium};
      height: ${$size}px;
      width: ${$size}px;
      color: ${$disabled ? typedTheme.colors.fontSecondary : baseColor};
      background: ${bgColor};
      transition: all 0.2s ease;
      position: relative;
      opacity: ${$disabled ? 0.5 : 1};
      cursor: ${$disabled
        ? "not-allowed"
        : $hasOnClick
          ? "pointer"
          : "default"};

      ${$hasOnClick &&
      !$disabled &&
      css`
        &:hover {
          border-radius: ${typedTheme.border_radius.percentage_full};
          background: ${bgColor !== "transparent"
            ? transparentize(0.9, bgColor)
            : transparentize(0.85, hoverColor)};
          color: ${hoverColor};
          transform: scale(1.1);
        }

        &:active {
          transform: scale(0.95);
        }
      `}

      .svg-inline--fa {
        height: ${$hasOnClick ? $size * 0.55 : $size}px;
        width: ${$hasOnClick ? $size * 0.55 : $size}px;
        transition: all 0.2s ease;
      }
    `;
  }}
`;
