import React from "react";
import { X } from "lucide-react";
import { theme } from "../../theme";

interface ModalProps {
  title: string;
  onClose: () => void;
  children: React.ReactNode;
  footer?: React.ReactNode;
  maxWidthClass?: string;
}

export function Modal({ title, onClose, children, footer, maxWidthClass = "max-w-md" }: ModalProps) {
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ backgroundColor: "rgba(15,23,42,0.45)" }}
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        className={`bg-white rounded-2xl w-full ${maxWidthClass} max-h-[90vh] overflow-y-auto`}
        style={{ boxShadow: "0 20px 60px rgba(0,0,0,0.25)" }}
      >
        <div className="flex items-center justify-between p-5 border-b" style={{ borderColor: theme.color.border }}>
          <h3 className="font-semibold text-lg" style={{ color: theme.color.text }}>
            {title}
          </h3>
          <button onClick={onClose} className="p-1.5 rounded-lg hover:bg-gray-100" aria-label="Close">
            <X size={18} />
          </button>
        </div>
        <div className="p-5">{children}</div>
        {footer && (
          <div className="flex gap-3 p-5 pt-0">{footer}</div>
        )}
      </div>
    </div>
  );
}
