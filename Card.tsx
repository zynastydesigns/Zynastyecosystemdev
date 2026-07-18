import React from "react";
import { theme } from "../../theme";

interface CardProps {
  children: React.ReactNode;
  className?: string;
  padded?: boolean;
  style?: React.CSSProperties;
}

export function Card({ children, className = "", padded = true, style }: CardProps) {
  return (
    <div
      className={`bg-white rounded-2xl border ${padded ? "p-5" : ""} ${className}`}
      style={{
        borderColor: theme.color.border,
        boxShadow: "0 1px 2px rgba(16,24,40,0.04), 0 1px 3px rgba(16,24,40,0.03)",
        ...style,
      }}
    >
      {children}
    </div>
  );
}
