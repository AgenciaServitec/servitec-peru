import * as React from "react";
import { cn } from "@/lib/utils";
import { CheckCircle2, Eye, EyeOff, LucideIcon, X } from "lucide-react";

interface InputProps extends React.ComponentProps<"input"> {
  label?: string;
  error?: string;
  success?: boolean;
  helperText?: string;
  icon?: LucideIcon;
  required?: boolean;
  isLoading?: boolean;
  showCounter?: boolean;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      className,
      type,
      label,
      error,
      success,
      helperText,
      icon: Icon,
      required,
      isLoading,
      showCounter,
      maxLength,
      ...props
    },
    ref
  ) => {
    const [showPassword, setShowPassword] = React.useState(false);
    const id = React.useId();
    const errorId = `${id}-error`;
    const inputRef = React.useRef<HTMLInputElement | null>(null);

    React.useImperativeHandle(ref, () => inputRef.current!);

    const handleClear = () => {
      if (inputRef.current) {
        const nativeInputValueSetter = Object.getOwnPropertyDescriptor(
          window.HTMLInputElement.prototype,
          "value"
        )?.set;
        nativeInputValueSetter?.call(inputRef.current, "");
        const event = new Event("input", { bubbles: true });
        inputRef.current.dispatchEvent(event);
        inputRef.current.focus();
      }
    };

    if (isLoading) {
      return (
        <div className="w-full space-y-2 animate-pulse text-left">
          {label && <div className="h-4 w-24 bg-muted/20 rounded" />}
          <div className="h-10 w-full bg-muted/10 rounded-md border border-muted/20" />
        </div>
      );
    }

    const isPassword = type === "password";
    const inputType = isPassword ? (showPassword ? "text" : "password") : type;
    const hasValue = !!(inputRef.current?.value || props.value);
    const currentLength = (
      inputRef.current?.value ||
      props.value ||
      ""
    ).toString().length;

    return (
      <div className="w-full space-y-1.5 text-left" data-slot="input-container">
        <div className="flex justify-between items-end">
          {label && (
            <label
              htmlFor={id}
              className="text-sm font-medium leading-none flex items-center gap-1"
            >
              {label}
              {required && <span className="text-destructive">*</span>}
            </label>
          )}
          {showCounter && maxLength && (
            <span className="text-[10px] text-muted-foreground tabular-nums">
              {currentLength}/{maxLength}
            </span>
          )}
        </div>

        <div className="relative group">
          {Icon && (
            <div
              className={cn(
                "absolute left-3 top-1/2 -translate-y-1/2 transition-colors",
                error
                  ? "text-destructive"
                  : "text-muted-foreground group-focus-within:text-primary"
              )}
            >
              <Icon size={18} strokeWidth={2} />
            </div>
          )}

          <input
            id={id}
            ref={inputRef}
            type={inputType}
            maxLength={maxLength}
            aria-invalid={!!error}
            aria-describedby={error ? errorId : undefined}
            className={cn(
              "flex h-10 w-full rounded-md border bg-transparent px-3 py-1 text-base shadow-sm transition-all outline-none",
              "placeholder:text-muted-foreground/50",
              "border-input dark:bg-input/10 focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/20",
              "disabled:cursor-not-allowed disabled:opacity-50",
              error &&
                "border-destructive focus-visible:border-destructive focus-visible:ring-destructive/20",
              success &&
                !error &&
                "border-emerald-500/50 focus-visible:border-emerald-500 focus-visible:ring-emerald-500/20",
              Icon ? "pl-10" : "pl-3",
              isPassword || hasValue || (success && !error) ? "pr-10" : "pr-3",
              className
            )}
            {...props}
          />

          <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-1.5 text-muted-foreground">
            {success && !error && !isPassword && (
              <CheckCircle2
                size={16}
                className="text-emerald-500 animate-in zoom-in"
              />
            )}

            {isPassword ? (
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="hover:text-foreground focus:outline-none transition-colors"
                tabIndex={-1}
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            ) : (
              hasValue &&
              !props.disabled && (
                <button
                  type="button"
                  onClick={handleClear}
                  className="hover:text-destructive focus:outline-none transition-colors"
                  tabIndex={-1}
                >
                  <X size={18} />
                </button>
              )
            )}
          </div>
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
Input.displayName = "Input";

export { Input };
