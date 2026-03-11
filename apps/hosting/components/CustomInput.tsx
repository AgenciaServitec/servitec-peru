import * as React from "react";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react"; // Importamos el tipo para TS

interface ExtendedInputProps extends React.ComponentProps<"input"> {
  label?: string;
  error?: string;
  required?: boolean;
  icon?: LucideIcon; // Prop para el icono
}

const CustomInput = React.forwardRef<HTMLInputElement, ExtendedInputProps>(
  (
    { className, type, label, error, required, id, icon: Icon, ...props },
    ref
  ) => {
    const generatedId = React.useId();
    const inputId = id || generatedId;

    return (
      <div className="flex flex-col w-full gap-2 text-left">
        {label && (
          <Label
            htmlFor={inputId}
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
          {/* Contenedor del Icono */}
          {Icon && (
            <div
              className={cn(
                "absolute left-3 top-1/2 -translate-y-1/2 transition-colors",
                error
                  ? "text-destructive"
                  : "text-muted-foreground group-focus-within:text-primary"
              )}
            >
              <Icon size={20} strokeWidth={2} />
            </div>
          )}

          <input
            id={inputId}
            type={type}
            ref={ref}
            aria-invalid={!!error}
            className={cn(
              "h-12 w-full rounded-md border bg-transparent py-2 text-base shadow-sm transition-all outline-none",
              "placeholder:text-muted-foreground/60",
              "border-input dark:bg-input/20 focus-visible:border-ring focus-visible:ring-ring/40 focus-visible:ring-[3px]",
              "aria-invalid:border-destructive aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40",
              "disabled:cursor-not-allowed disabled:opacity-50",
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
  }
);
CustomInput.displayName = "CustomInput";

// 2. Creamos la versión memoizada pero la exportamos con el nombre principal
// Esto hace que quien lo use siempre use la versión optimizada sin saberlo.
export const Input2 = React.memo(CustomInput);
