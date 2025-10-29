import type { FormHTMLAttributes, ReactNode } from "react";
import { Space } from "antd";

type FormProps = {
  children: ReactNode;
} & FormHTMLAttributes<HTMLFormElement>;

export const Form = ({ children, ...props }: FormProps) => (
  <form noValidate autoComplete="off" {...props}>
    <Space
      size="middle"
      direction="vertical"
      style={{ width: "100%" }}
    >
      {children}
    </Space>
  </form>
);
