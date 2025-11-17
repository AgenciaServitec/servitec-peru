import { type ReactNode } from "react";

interface ContentWidthProps {
  children: ReactNode;
}

export const ContentWidth = ({ children }: ContentWidthProps) => {
  return <div className="mx-auto max-w-[1400px] px-4">{children}</div>;
};