"use client";

import * as React from "react";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";

interface CustomTextareaProps extends React.ComponentProps<"textarea"> {
  label?: string;
  error?: string;
  required?: boolean;
  icon?: LucideIcon;
}

const CustomTextarea = React.forwardRef<
  HTMLTextAreaElement,
  CustomTextareaProps
>(({ className, label, error, required, id, icon: Icon, ...props }, ref) => {
  const generatedId = React.useId();
  const textareaId = id || generatedId;

  return (
    <div className="flex flex-col w-full gap-2 text-left">
      {label && (
        <Label
          htmlFor={textareaId}
          className={cn(
            "text-sm font-medium transition-colors",
            error ? "text-destructive" : "text-foreground"
          )}
        >
          {label}
          {required && <span className="text-destructive ml-1">*</span>}
        </Label>
      )}

      <div className="relative group">
        {/* Icono - Posicionado arriba a la izquierda para Textareas */}
        {Icon && (
          <div
            className={cn(
              "absolute left-3 top-3 transition-colors", // Top-3 en lugar de centrado
              error
                ? "text-destructive"
                : "text-muted-foreground group-focus-within:text-primary"
            )}
          >
            <Icon size={20} strokeWidth={2} />
          </div>
        )}

        <textarea
          id={textareaId}
          ref={ref}
          aria-invalid={!!error}
          className={cn(
            "flex min-h-[120px] w-full rounded-md border bg-transparent py-3 text-base shadow-sm transition-all outline-none",
            "placeholder:text-muted-foreground/60",
            "border-input dark:bg-input/20 focus-visible:border-ring focus-visible:ring-ring/40 focus-visible:ring-[3px]",
            "aria-invalid:border-destructive aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40",
            "disabled:cursor-not-allowed disabled:opacity-50 field-sizing-content",
            // Padding extra si hay icono
            Icon ? "pl-11 pr-4" : "px-4",
            className
          )}
          {...props}
        />
      </div>

      {error && (
        <p className="text-xs font-medium text-destructive animate-in fade-in slide-in-from-top-1">
          {error}
        </p>
      )}
    </div>
  );
});

CustomTextarea.displayName = "CustomTextarea";

export const Textarea2 = React.memo(CustomTextarea);
