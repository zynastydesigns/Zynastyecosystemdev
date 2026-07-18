import React from "react";
import { ArrowDownRight, ArrowUpRight, Receipt, Camera, Clock, FileX, Pencil, Trash2 } from "lucide-react";
import { IconCircle } from "../ui/IconCircle";
import { theme } from "../../theme";
import { TimelineActivity, TimelineActivityType } from "../../types/models";
import { relativeTime } from "../../utils/format";

const ICON_MAP: Record<TimelineActivityType, { icon: React.ComponentType<{ size?: number }>; tint: string; soft: string }> = {
  expense_added: { icon: Receipt, tint: theme.color.error, soft: theme.color.errorSoft },
  expense_updated: { icon: Pencil, tint: theme.color.warning, soft: theme.color.warningSoft },
  expense_deleted: { icon: Trash2, tint: theme.color.error, soft: theme.color.errorSoft },
  client_payment_received: { icon: ArrowDownRight, tint: theme.color.success, soft: theme.color.successSoft },
  vendor_payment_completed: { icon: ArrowUpRight, tint: theme.color.navy, soft: theme.color.navySoft },
  bill_uploaded: { icon: Camera, tint: theme.color.gold, soft: theme.color.goldSoft },
  document_deleted: { icon: FileX, tint: theme.color.textMuted, soft: theme.color.bg },
  project_updated: { icon: Clock, tint: theme.color.textMuted, soft: theme.color.bg },
};

export function ActivityRow({ item, last }: { item: TimelineActivity; last?: boolean }) {
  const cfg = ICON_MAP[item.type] ?? ICON_MAP.project_updated;
  return (
    <div className="flex gap-3.5">
      <div className="flex flex-col items-center">
        <IconCircle icon={cfg.icon} tint={cfg.tint} soft={cfg.soft} size={32} />
        {!last && <div className="w-px flex-1 mt-1" style={{ backgroundColor: theme.color.border }} />}
      </div>
      <div className="pb-4">
        <div className="text-sm font-semibold" style={{ color: theme.color.text }}>{item.title}</div>
        <div className="text-sm mt-0.5" style={{ color: theme.color.textMuted }}>{item.detail}</div>
        <div className="text-xs mt-1" style={{ color: theme.color.textFaint }}>{relativeTime(item.createdAt)}</div>
      </div>
    </div>
  );
}
