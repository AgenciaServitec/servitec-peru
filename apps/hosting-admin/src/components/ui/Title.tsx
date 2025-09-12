import type { CSSProperties, ReactNode } from 'react';
import styled, { css } from 'styled-components';
import { Typography } from 'antd';

interface TitleProps {
  align?: CSSProperties['textAlign'];
  margin?: CSSProperties['margin'];
  children?: ReactNode;
}

export const Title = ({ children, align = 'left', margin, ...props }: TitleProps) => (
  <TitleAntd align={align} margin={margin} {...props}>
    {children}
  </TitleAntd>
);

const TitleAntd = styled(Typography.Title)<TitleProps>`
  ${({ align, color, margin }) => css`
    text-align: ${align};
    color: ${color} !important;
    margin: ${margin} !important;
  `}
`;
