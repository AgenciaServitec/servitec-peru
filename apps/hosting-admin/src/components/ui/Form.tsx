import type { FormHTMLAttributes, ReactNode } from 'react';
import SpaceAntd from 'antd/lib/space';
import styled from 'styled-components';

type FormProps = {
  children: ReactNode;
  props: FormHTMLAttributes<HTMLFormElement>;
};

export const Form = ({ children, ...props }: FormProps) => (
  <form noValidate autoComplete="off" {...props}>
    <SpaceStyled size="middle" direction="vertical">
      {children}
    </SpaceStyled>
  </form>
);

const SpaceStyled = styled(SpaceAntd)`
  width: 100%;
`;
