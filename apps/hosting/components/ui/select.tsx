"use client";

import * as React from "react";
import * as SelectPrimitive from "@radix-ui/react-select";
import {
  CheckCircle2,
  CheckIcon,
  ChevronDownIcon,
  LucideIcon,
} from "lucide-react";
import { cn } from "@/lib/utils";

const SelectRoot = SelectPrimitive.Root;
const SelectGroup = SelectPrimitive.Group;
const SelectValue = SelectPrimitive.Value;

const SelectTriggerBase = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Trigger>
>(({ className, children, ...props }, ref) => (
  <SelectPrimitive.Trigger
    ref={ref}
    className={cn(
      "border-input data-[placeholder]:text-muted-foreground [&_svg:not([class*='text-'])]:text-muted-foreground focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive dark:bg-input/30 dark:hover:bg-input/50 flex h-10 w-full items-center justify-between gap-2 rounded-md border bg-transparent px-3 py-2 text-sm shadow-xs transition-all outline-none focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50",
      className
    )}
    {...props}
  >
    {children}
    <SelectPrimitive.Icon asChild>
      <ChevronDownIcon className="size-4 opacity-50" />
    </SelectPrimitive.Icon>
  </SelectPrimitive.Trigger>
));
SelectTriggerBase.displayName = SelectPrimitive.Trigger.displayName;

const SelectContent = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Content>
>(({ className, children, position = "popper", ...props }, ref) => (
  <SelectPrimitive.Portal>
    <SelectPrimitive.Content
      ref={ref}
      className={cn(
        "bg-popover text-popover-foreground data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 relative z-50 max-h-96 min-w-[8rem] overflow-hidden rounded-md border shadow-md",
        position === "popper" &&
          "data-[side=bottom]:translate-y-1 data-[side=left]:-translate-x-1 data-[side=right]:translate-x-1 data-[side=top]:-translate-y-1",
        className
      )}
      position={position}
      {...props}
    >
      <SelectPrimitive.Viewport
        className={cn(
          "p-1",
          position === "popper" &&
            "h-[var(--radix-select-trigger-height)] w-full min-w-[var(--radix-select-trigger-width)]"
        )}
      >
        {children}
      </SelectPrimitive.Viewport>
    </SelectPrimitive.Content>
  </SelectPrimitive.Portal>
));
SelectContent.displayName = SelectPrimitive.Content.displayName;

const SelectItem = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Item>
>(({ className, children, ...props }, ref) => (
  <SelectPrimitive.Item
    ref={ref}
    className={cn(
      "focus:bg-accent focus:text-accent-foreground relative flex w-full cursor-default items-center rounded-sm py-1.5 pr-8 pl-2 text-sm outline-none select-none data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
      className
    )}
    {...props}
  >
    <span className="absolute right-2 flex h-3.5 w-3.5 items-center justify-center">
      <SelectPrimitive.ItemIndicator>
        <CheckIcon className="size-4" />
      </SelectPrimitive.ItemIndicator>
    </span>
    <SelectPrimitive.ItemText>{children}</SelectPrimitive.ItemText>
  </SelectPrimitive.Item>
));
SelectItem.displayName = SelectPrimitive.Item.displayName;

/**
 * COMPONENTE UNIFICADO (ABSTRACCIÓN PERSONALIZADA)
 */

interface Option {
  value: string;
  label: string;
}

interface SelectProps extends React.ComponentPropsWithoutRef<
  typeof SelectRoot
> {
  label?: string;
  error?: string;
  success?: boolean;
  isLoading?: boolean;
  placeholder?: string;
  required?: boolean;
  icon?: LucideIcon;
  options: Option[];
  helperText?: string; // Prop añadida
  className?: string;
  id?: string;
  onValueChange?: (value: string) => void;
}

const Select = React.forwardRef<HTMLButtonElement, SelectProps>(
  (
    {
      label,
      error,
      success,
      isLoading,
      placeholder,
      required,
      icon: Icon,
      options,
      helperText, // Extraemos la prop
      className,
      id,
      onValueChange,
      value,
      defaultValue,
      ...props
    },
    ref
  ) => {
    const generatedId = React.useId();
    const selectId = id || generatedId;
    const errorId = `${selectId}-error`;

    if (isLoading) {
      return (
        <div className="w-full space-y-1.5 animate-pulse text-left">
          {label && <div className="h-4 w-24 bg-muted/20 rounded" />}
          <div className="h-10 w-full bg-muted/10 rounded-md border border-muted/20" />
        </div>
      );
    }

    return (
      <div
        className="flex flex-col w-full space-y-1.5 text-left"
        data-slot="select-container"
      >
        {label && (
          <label
            htmlFor={selectId}
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
                "absolute left-3 top-1/2 -translate-y-1/2 z-20 pointer-events-none transition-colors",
                error
                  ? "text-destructive"
                  : "text-muted-foreground group-focus-within:text-primary"
              )}
            >
              <Icon size={18} strokeWidth={2} />
            </div>
          )}

          <SelectRoot
            value={value}
            defaultValue={defaultValue}
            onValueChange={onValueChange}
            {...props}
          >
            <SelectTriggerBase
              id={selectId}
              ref={ref}
              aria-invalid={!!error}
              aria-describedby={error ? errorId : undefined}
              className={cn(
                "flex h-10 min-h-10 max-h-10 w-full items-center justify-between rounded-md border text-base shadow-sm transition-all outline-none",
                "box-border overflow-hidden",
                "border-input dark:bg-input/20 focus:border-ring focus:ring-ring/40 focus:ring-[3px]",
                "aria-invalid:border-destructive aria-invalid:ring-destructive/20",
                error &&
                  "border-destructive focus-visible:border-destructive focus-visible:ring-destructive/20",
                success &&
                  !error &&
                  "border-emerald-500/50 focus-visible:border-emerald-500 focus-visible:ring-emerald-500/20",
                Icon ? "pl-10" : "pl-3",
                success && !error ? "pr-10" : "pr-3",
                className
              )}
            >
              <SelectValue placeholder={placeholder} />
            </SelectTriggerBase>

            <SelectContent>
              {options.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </SelectRoot>

          {success && !error && (
            <div className="absolute right-9 top-1/2 -translate-y-1/2 pointer-events-none">
              <CheckCircle2
                size={16}
                className="text-emerald-500 animate-in zoom-in"
              />
            </div>
          )}
        </div>

        {/* Lógica de Mensajes (Igual al Input) */}
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

Select.displayName = "Select";

export { Select, SelectItem, SelectContent, SelectValue, SelectGroup };
