"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { CheckCircle2, LucideIcon } from "lucide-react";

interface TextareaProps extends React.ComponentProps<"textarea"> {
  label?: string;
  error?: string;
  success?: boolean;
  helperText?: string;
  isLoading?: boolean;
  icon?: LucideIcon;
  required?: boolean;
}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  (
    {
      className,
      label,
      error,
      success,
      helperText,
      isLoading,
      required,
      id,
      icon: Icon,
      ...props
    },
    ref
  ) => {
    const generatedId = React.useId();
    const textareaId = id || generatedId;
    const errorId = `${textareaId}-error`;

    if (isLoading) {
      return (
        <div className="w-full space-y-1.5 animate-pulse text-left">
          {label && <div className="h-4 w-24 bg-muted/20 rounded" />}
          <div className="h-32 w-full bg-muted/10 rounded-md border border-muted/20" />
        </div>
      );
    }

    return (
      <div
        className="w-full space-y-1.5 text-left"
        data-slot="textarea-container"
      >
        {label && (
          <label
            htmlFor={textareaId}
            className={cn(
              "text-sm font-medium leading-none flex items-center gap-1 transition-colors",
              error ? "text-destructive" : "text-foreground"
            )}
          >
            {label}
            {required && <span className="text-destructive">*</span>}
          </label>
        )}

        <div className="relative group">
          {Icon && (
            <div
              className={cn(
                "absolute left-3 top-3 transition-colors",
                error
                  ? "text-destructive"
                  : "text-muted-foreground group-focus-within:text-primary"
              )}
            >
              <Icon size={18} strokeWidth={2} />
            </div>
          )}

          <textarea
            id={textareaId}
            ref={ref}
            aria-invalid={!!error}
            aria-describedby={error ? errorId : undefined}
            className={cn(
              "flex min-h-30 w-full rounded-md border bg-transparent py-3 text-base shadow-sm transition-all outline-none",
              "placeholder:text-muted-foreground/50",
              "border-input dark:bg-input/10 focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/20",
              "disabled:cursor-not-allowed disabled:opacity-50",

              error &&
                "border-destructive focus-visible:border-destructive focus-visible:ring-destructive/20",
              success &&
                !error &&
                "border-emerald-500/50 focus-visible:border-emerald-500 focus-visible:ring-emerald-500/20",

              Icon ? "pl-10" : "pl-3",
              success && !error ? "pr-10" : "pr-3",
              className
            )}
            {...props}
          />

          {success && !error && (
            <div className="absolute right-3 top-3 pointer-events-none">
              <CheckCircle2
                size={16}
                className="text-emerald-500 animate-in zoom-in"
              />
            </div>
          )}
        </div>

        {error ? (
          <p
            id={errorId}
            className="text-xs font-medium text-destructive animate-in fade-in slide-in-from-top-1"
          >
            {error}
          </p>
        ) : helperText ? (
          <p className="text-xs text-muted-foreground/80">{helperText}</p>
        ) : null}
      </div>
    );
  }
);

Textarea.displayName = "Textarea";

export { Textarea };
