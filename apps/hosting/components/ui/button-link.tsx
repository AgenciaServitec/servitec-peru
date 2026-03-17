import * as React from "react";
import Link from "next/link";
import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { buttonVariants } from "./button";
import { type VariantProps } from "class-variance-authority";

interface ButtonLinkProps
  extends
    React.AnchorHTMLAttributes<HTMLAnchorElement>,
    VariantProps<typeof buttonVariants> {
  href: string;
  icon?: LucideIcon;
  external?: boolean;
}

const ButtonLink = React.forwardRef<HTMLAnchorElement, ButtonLinkProps>(
  (
    {
      className,
      variant,
      size,
      icon: Icon,
      children,
      href,
      external,
      ...props
    },
    ref
  ) => {
    const isExternal =
      external ||
      href.startsWith("http") ||
      href.startsWith("https") ||
      href.startsWith("wa.me");

    const content = (
      <span className="flex items-center justify-center gap-2 pointer-events-none">
        {Icon && <Icon className="size-4" />}
        {children}
      </span>
    );

    const classes = cn(buttonVariants({ variant, size, className }));

    if (isExternal) {
      return (
        <a
          href={href}
          className={classes}
          target="_blank"
          rel="noreferrer"
          ref={ref}
          {...props}
        >
          {content}
        </a>
      );
    }

    return (
      <Link href={href} className={classes} ref={ref} {...props}>
        {content}
      </Link>
    );
  }
);

ButtonLink.displayName = "ButtonLink";

export { ButtonLink };
