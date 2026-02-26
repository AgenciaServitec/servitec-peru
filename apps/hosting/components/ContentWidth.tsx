import { type ReactNode } from "react";

interface ContentWidthProps {
  children: ReactNode;
  className?: string;
}

export const ContentWidth = ({ children, className }: ContentWidthProps) => {
  return (
    <div className={`mx-auto max-w-350 px-4 ${className || ""}`}>
      {children}
    </div>
  );
};
