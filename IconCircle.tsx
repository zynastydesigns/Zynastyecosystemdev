import React from "react";
import { LucideIcon } from "lucide-react";

interface IconCircleProps {
  icon: LucideIcon;
  tint: string;
  soft: string;
  size?: number;
}

export function IconCircle({ icon: Icon, tint, soft, size = 38 }: IconCircleProps) {
  return (
    <div
      className="flex items-center justify-center rounded-xl shrink-0"
      style={{ width: size, height: size, backgroundColor: soft, color: tint }}
    >
      <Icon size={Math.round(size * 0.47)} strokeWidth={2} />
    </div>
  );
}
