import React from "react";
import { theme } from "../../theme";

type Variant = "primary" | "secondary" | "ghost" | "danger";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  icon?: React.ReactNode;
}

const VARIANT_STYLE: Record<Variant, React.CSSProperties> = {
  primary: { backgroundColor: theme.color.emerald, color: "#fff", border: "1px solid transparent" },
  secondary: { backgroundColor: "#fff", color: theme.color.text, border: `1px solid ${theme.color.border}` },
  ghost: { backgroundColor: "transparent", color: theme.color.text, border: "1px solid transparent" },
  danger: { backgroundColor: theme.color.error, color: "#fff", border: "1px solid transparent" },
};

export function Button({ variant = "primary", icon, children, className = "", style, ...rest }: ButtonProps) {
  return (
    <button
      className={`inline-flex items-center justify-center gap-1.5 text-sm font-semibold px-4 py-2.5 rounded-xl transition-opacity disabled:opacity-50 ${className}`}
      style={{ ...VARIANT_STYLE[variant], ...style }}
      {...rest}
    >
      {icon}
      {children}
    </button>
  );
}
