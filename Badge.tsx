import React from "react";
import { ProjectStatus, ExpenseStatus } from "../../types/models";
import { theme } from "../../theme";

interface BadgeProps {
  children: React.ReactNode;
  bg: string;
  fg: string;
}

export function Badge({ children, bg, fg }: BadgeProps) {
  return (
    <span
      className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold"
      style={{ backgroundColor: bg, color: fg }}
    >
      {children}
    </span>
  );
}

const STATUS_STYLES: Record<ProjectStatus, { bg: string; fg: string }> = {
  "In Progress": { bg: theme.color.successSoft, fg: theme.color.success },
  "Design Phase": { bg: theme.color.navySoft, fg: theme.color.navy },
  Procurement: { bg: theme.color.warningSoft, fg: "#B45309" },
  "On Hold": { bg: theme.color.errorSoft, fg: theme.color.error },
  Completed: { bg: "#EEF2F7", fg: theme.color.textMuted },
};

export function ProjectStatusBadge({ status }: { status: ProjectStatus }) {
  const s = STATUS_STYLES[status] ?? { bg: theme.color.border, fg: theme.color.text };
  return <Badge bg={s.bg} fg={s.fg}>{status}</Badge>;
}

export function ExpenseStatusBadge({ status }: { status: ExpenseStatus }) {
  const s =
    status === "Confirmed"
      ? { bg: theme.color.successSoft, fg: theme.color.success }
      : { bg: theme.color.warningSoft, fg: "#B45309" };
  return <Badge bg={s.bg} fg={s.fg}>{status}</Badge>;
}
