import React from "react";
import { Wallet, CreditCard, Receipt, TrendingUp, FolderKanban, ArrowUpRight } from "lucide-react";
import { Card } from "../ui/Card";
import { IconCircle } from "../ui/IconCircle";
import { theme } from "../../theme";
import { DashboardStats } from "../../types/models";
import { formatCurrency } from "../../utils/format";

interface KpiGridProps {
  stats: DashboardStats;
}

export function KpiGrid({ stats }: KpiGridProps) {
  const cards = [
    { label: "Total Project Value", value: stats.totalProjectValue, icon: FolderKanban, tint: theme.color.navy, soft: theme.color.navySoft },
    { label: "Total Receivables", value: stats.totalReceivables, icon: Wallet, tint: theme.color.emerald, soft: theme.color.emeraldSoft },
    { label: "Total Expenses", value: stats.totalExpenses, icon: Receipt, tint: theme.color.warning, soft: theme.color.warningSoft },
    { label: "Total Payables", value: stats.totalPayables, icon: CreditCard, tint: theme.color.error, soft: theme.color.errorSoft },
    { label: "Current Profit", value: stats.currentProfit, icon: TrendingUp, tint: theme.color.success, soft: theme.color.successSoft },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-6 gap-4">
      {cards.map((c) => (
        <Card key={c.label}>
          <div className="flex items-center justify-between mb-3">
            <span className="text-sm font-medium" style={{ color: theme.color.textMuted }}>{c.label}</span>
            <IconCircle icon={c.icon} tint={c.tint} soft={c.soft} size={34} />
          </div>
          <div className="text-2xl font-bold" style={{ color: theme.color.text }}>{formatCurrency(c.value)}</div>
          <div className="flex items-center gap-1 mt-2 text-xs font-semibold" style={{ color: theme.color.success }}>
            <ArrowUpRight size={13} /> live
          </div>
        </Card>
      ))}
      <Card>
        <div className="flex items-center justify-between mb-3">
          <span className="text-sm font-medium" style={{ color: theme.color.textMuted }}>Active Projects</span>
          <IconCircle icon={FolderKanban} tint={theme.color.gold} soft={theme.color.goldSoft} size={34} />
        </div>
        <div className="text-2xl font-bold" style={{ color: theme.color.text }}>{stats.activeProjects}</div>
      </Card>
    </div>
  );
}
