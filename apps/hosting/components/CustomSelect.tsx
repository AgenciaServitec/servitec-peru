"use client";

import * as React from "react";
import { LucideIcon } from "lucide-react";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"; // Asegúrate de que la ruta sea correcta

interface Option {
  value: string;
  label: string;
}

interface CustomSelectProps {
  label?: string;
  error?: string;
  placeholder?: string;
  required?: boolean;
  icon?: LucideIcon;
  options: Option[];
  value?: string;
  onChange?: (value: string) => void;
  className?: string;
  id?: string;
}

export const CustomSelect = React.forwardRef<
  HTMLButtonElement,
  CustomSelectProps
>(
  (
    {
      label,
      error,
      placeholder,
      required,
      icon: Icon,
      options,
      value,
      onChange,
      className,
      id,
      ...props
    },
    ref
  ) => {
    const generatedId = React.useId();
    const selectId = id || generatedId;

    return (
      <div className="flex flex-col w-full gap-2 text-left">
        {label && (
          <Label
            htmlFor={selectId}
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
          {Icon && (
            <div
              className={cn(
                "absolute left-3 top-1/2 -translate-y-1/2 z-20 pointer-events-none transition-colors",
                error
                  ? "text-destructive"
                  : "text-muted-foreground group-focus-within:text-primary"
              )}
            >
              <Icon size={20} strokeWidth={2} />
            </div>
          )}

          <Select value={value} onValueChange={onChange} {...props}>
            <SelectTrigger
              id={selectId}
              ref={ref}
              className={cn(
                // 1. Reset de altura y box-sizing
                "flex h-12 min-h-12 max-h-12 w-full items-center justify-between rounded-md border bg-transparent text-base shadow-sm transition-all outline-none",
                "box-border overflow-hidden",

                // 2. Colores y bordes (manteniendo tu estética)
                "border-input dark:bg-input/20 focus:border-ring focus:ring-ring/40 focus:ring-[3px]",
                "aria-invalid:border-destructive aria-invalid:ring-destructive/20",

                // 3. Alineación del contenido
                Icon ? "pl-11 pr-3" : "px-4",
                "py-0 leading-none", // 'leading-none' evita que el line-height empuje los bordes

                error && "border-destructive ring-destructive/20",
                className
              )}
            >
              <div className="flex items-center h-full">
                <SelectValue placeholder={placeholder} />
              </div>
            </SelectTrigger>

            <SelectContent
              position="popper"
              sideOffset={5} // Pequeño espacio entre el input y la lista
              className="w-[var(--radix-select-trigger-width)] bg-[#0f0f0f] border-white/10 text-white z-[60]"
            >
              {options.map((option) => (
                <SelectItem
                  key={option.value}
                  value={option.value}
                  className="focus:bg-primary/20 focus:text-white cursor-pointer py-3"
                >
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {error && (
          <p className="text-xs font-medium text-destructive animate-in fade-in slide-in-from-top-1">
            {error}
          </p>
        )}
      </div>
    );
  }
);
