import React, { type ReactNode } from "react";
import styled, { css } from "styled-components";
import { Typography } from "antd";
import type { TitleProps as AntdTitleProps } from "antd/es/typography/Title";

export interface TitleProps extends Omit<AntdTitleProps, "level"> {
  children: ReactNode;
  align?: "left" | "center" | "right" | "justify";
  margin?: string;
  color?: string;
  level?: 1 | 2 | 3 | 4 | 5;
}

interface TitleStyledProps {
  $align: string;
  $color?: string;
  $margin?: string;
}

export const Title: React.FC<TitleProps> = ({
  children,
  align = "left",
  margin,
  color,
  ...props
}) => (
  <TitleStyled $align={align} $margin={margin} $color={color} {...props}>
    {children}
  </TitleStyled>
);

const TitleStyled = styled(Typography.Title)<TitleStyledProps>`
  ${({ theme, $align, $color, $margin }) => css`
    text-align: ${$align};
    color: ${$color || theme.colors.fontPrimary} !important;
    margin: ${$margin || 0} !important;
    font-weight: ${theme.font_weight.large};

    &.ant-typography {
      margin-bottom: ${theme.paddings.medium};
    }
  `}
`;
