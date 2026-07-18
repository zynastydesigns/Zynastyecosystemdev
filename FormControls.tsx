import React from "react";
import { theme } from "../../theme";

const baseStyle: React.CSSProperties = {
  borderColor: theme.color.border,
};

export function Field({
  label,
  error,
  children,
}: {
  label: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label className="text-xs font-medium block mb-1.5" style={{ color: theme.color.textMuted }}>
        {label}
      </label>
      {children}
      {error && (
        <div className="text-xs mt-1" style={{ color: theme.color.error }}>
          {error}
        </div>
      )}
    </div>
  );
}

export function TextInput(props: React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      {...props}
      className={`w-full px-3 py-2.5 rounded-xl border text-sm outline-none ${props.className ?? ""}`}
      style={{ ...baseStyle, ...props.style }}
    />
  );
}

export function TextArea(props: React.TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return (
    <textarea
      {...props}
      className={`w-full px-3 py-2.5 rounded-xl border text-sm outline-none resize-none ${props.className ?? ""}`}
      style={{ ...baseStyle, ...props.style }}
    />
  );
}

export function Select(props: React.SelectHTMLAttributes<HTMLSelectElement>) {
  return (
    <select
      {...props}
      className={`w-full px-3 py-2.5 rounded-xl border text-sm outline-none bg-white ${props.className ?? ""}`}
      style={{ ...baseStyle, ...props.style }}
    />
  );
}
