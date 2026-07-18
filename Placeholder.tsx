import React from "react";
import { CircleDollarSign } from "lucide-react";
import { Card } from "../ui/Card";
import { IconCircle } from "../ui/IconCircle";
import { theme } from "../../theme";

export function Placeholder({ title }: { title: string }) {
  return (
    <div className="p-4 sm:p-7">
      <Card className="flex flex-col items-center justify-center text-center py-20">
        <IconCircle icon={CircleDollarSign} tint={theme.color.emerald} soft={theme.color.emeraldSoft} size={52} />
        <h3 className="font-semibold text-lg mt-4" style={{ color: theme.color.text }}>{title}</h3>
        <p className="text-sm mt-1.5 max-w-sm" style={{ color: theme.color.textMuted }}>
          This section is scoped for a later phase and will follow the same architecture as the rest of Beacon.
        </p>
      </Card>
    </div>
  );
}
