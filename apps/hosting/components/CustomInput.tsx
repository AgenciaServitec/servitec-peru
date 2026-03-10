import * as React from "react";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

interface ExtendedInputProps extends React.ComponentProps<"input"> {
  label?: string;
  error?: string; // Aquí pasaremos el mensaje del JSON de errores
  required?: boolean;
}

const CustomInput = React.forwardRef<HTMLInputElement, ExtendedInputProps>(
  ({ className, type, label, error, required, id, ...props }, ref) => {
    // Generamos un ID único si no viene uno, para conectar Label con Input (Accesibilidad)
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

        <div className="relative">
          <input
            id={inputId}
            type={type}
            ref={ref}
            aria-invalid={!!error}
            className={cn(
              // Base y Altura h-12
              "h-12 w-full rounded-md border bg-transparent px-4 py-2 text-base shadow-sm transition-all outline-none",
              "placeholder:text-muted-foreground/60",
              // Colores normales
              "border-input dark:bg-input/20 focus-visible:border-ring focus-visible:ring-ring/40 focus-visible:ring-[3px]",
              // Estado Error
              "aria-invalid:border-destructive aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40",
              // Deshabilitado
              "disabled:cursor-not-allowed disabled:opacity-50",
              className
            )}
            {...props}
          />
        </div>

        {error && (
          <p className="text-sm font-medium text-destructive animate-in fade-in slide-in-from-top-1">
            {error}
          </p>
        )}
      </div>
    );
  }
);
CustomInput.displayName = "CustomInput";

export { CustomInput };
