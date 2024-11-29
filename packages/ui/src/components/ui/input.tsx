"use client";

import { cn } from "@clikz/ui/lib/utils";
import * as React from "react";
import { Kbd } from "./kbd";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  shortcut?: string;
  icon?: React.ReactNode;
  shortcutVariant?:
    | "default"
    | "destructive"
    | "outline"
    | "secondary"
    | "ghost"
    | null
    | undefined;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, shortcut, icon, shortcutVariant, ...props }, ref) => {
    const [isFocused, setIsFocused] = React.useState(false);

    React.useEffect(() => {
      if (!shortcut) return;

      const handleKeyDown = (event: KeyboardEvent) => {
        if (event.key.toLowerCase() === shortcut.toLowerCase()) {
          event.preventDefault();
          const inputElement = document.getElementById(
            props.id as string,
          ) as HTMLInputElement;
          inputElement?.focus();
        }
      };

      window.addEventListener("keydown", handleKeyDown);

      return () => {
        window.removeEventListener("keydown", handleKeyDown);
      };
    }, [shortcut, props.id]);

    return (
      <div className="relative">
        <input
          type={type}
          className={cn(
            "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
            icon && "pl-10",
            shortcut && "pr-16",
            isFocused && "ring-2 ring-ring ring-offset-2",
            className,
          )}
          ref={ref}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          {...props}
        />
        {icon && (
          <div className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
            {icon}
          </div>
        )}
        {shortcut && (
          <div className="absolute right-3 top-1/2 -translate-y-1/2">
            <Kbd variant={shortcutVariant}>{shortcut.toUpperCase()}</Kbd>
          </div>
        )}
      </div>
    );
  },
);
Input.displayName = "Input";

export { Input };
