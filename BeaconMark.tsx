import React from "react";
import { theme } from "../../theme";

export function BeaconMark({ light = true, size = 22 }: { light?: boolean; size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <path d="M12 2L14 8H10L12 2Z" fill={theme.color.gold} />
      <path d="M9.5 8H14.5L16 21H8L9.5 8Z" fill={light ? "#FFFFFF" : theme.color.navy} />
      <rect x="7" y="21" width="10" height="1.6" rx="0.8" fill={theme.color.gold} />
      <circle cx="12" cy="6" r="1.1" fill={theme.color.gold} />
    </svg>
  );
}
