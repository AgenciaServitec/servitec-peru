import { type ReactNode } from "react";

interface ContentWidthProps {
  children: ReactNode;
  className?: string;
}

export const ContentWidth = ({ children, className }: ContentWidthProps) => {
  return (
    <div className={`mx-auto max-w-[1400px] px-4 ${className || ""}`}>
      {children}
    </div>
  );
};
