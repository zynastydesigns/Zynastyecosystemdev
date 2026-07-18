import React from "react";
import { Building2, ArrowDownRight, ArrowUpRight, TrendingUp, Phone } from "lucide-react";
import { Card } from "../../ui/Card";
import { IconCircle } from "../../ui/IconCircle";
import { theme } from "../../../theme";
import { formatCurrency, formatDate } from "../../../utils/format";
import { ActivityRow } from "../ActivityRow";
import { UseProjectWorkspaceResult } from "../../../hooks/useProjectWorkspace";

export function OverviewTab({ workspace }: { workspace: UseProjectWorkspaceResult }) {
  const { project, financials, clientPayments, activities } = workspace;
  if (!project || !financials) return null;

  const upcoming = clientPayments.filter((p) => p.status !== "Received").slice(0, 3);

  return (
    <div className="space-y-5">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: "Project Value", value: financials.value, tint: theme.color.navy, soft: theme.color.navySoft, icon: Building2 },
          { label: "Received", value: financials.received, tint: theme.color.success, soft: theme.color.successSoft, icon: ArrowDownRight },
          { label: "Spent", value: financials.spent, tint: theme.color.error, soft: theme.color.errorSoft, icon: ArrowUpRight },
          { label: "Profit", value: financials.profit, tint: theme.color.gold, soft: theme.color.goldSoft, icon: TrendingUp },
        ].map((c) => (
          <Card key={c.label}>
            <IconCircle icon={c.icon} tint={c.tint} soft={c.soft} size={32} />
            <div className="text-lg font-bold mt-3" style={{ color: theme.color.text }}>{formatCurrency(c.value)}</div>
            <div className="text-xs mt-0.5" style={{ color: theme.color.textMuted }}>{c.label}</div>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        <Card className="lg:col-span-2">
          <h3 className="font-semibold mb-1" style={{ color: theme.color.text }}>Financial Summary</h3>
          <p className="text-sm leading-relaxed" style={{ color: theme.color.textMuted }}>
            {project.name} is currently in the <strong>{project.status}</strong> stage, tracking{" "}
            {financials.profit >= 0 ? "on budget with a healthy margin" : "over budget — review expenses"}.
          </p>

          <div className="mt-5 pt-5 border-t" style={{ borderColor: theme.color.border }}>
            <div className="flex items-center justify-between text-sm mb-2">
              <span style={{ color: theme.color.textMuted }}>Budget Utilization</span>
              <span className="font-semibold" style={{ color: theme.color.text }}>{financials.budgetUtilizationPercent}%</span>
            </div>
            <div className="w-full h-2 rounded-full" style={{ backgroundColor: theme.color.border }}>
              <div
                className="h-2 rounded-full"
                style={{
                  width: `${financials.budgetUtilizationPercent}%`,
                  backgroundColor: financials.budgetUtilizationPercent > 90 ? theme.color.error : theme.color.emerald,
                }}
              />
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-5 pt-5 border-t" style={{ borderColor: theme.color.border }}>
            <div>
              <div className="text-xs" style={{ color: theme.color.textFaint }}>Start Date</div>
              <div className="text-sm font-semibold mt-1" style={{ color: theme.color.text }}>{formatDate(project.startDate)}</div>
            </div>
            <div>
              <div className="text-xs" style={{ color: theme.color.textFaint }}>Est. Completion</div>
              <div className="text-sm font-semibold mt-1" style={{ color: theme.color.text }}>
                {project.estCompletionDate ? formatDate(project.estCompletionDate) : "—"}
              </div>
            </div>
            <div>
              <div className="text-xs" style={{ color: theme.color.textFaint }}>Progress</div>
              <div className="text-sm font-semibold mt-1" style={{ color: theme.color.text }}>{project.progressPercent}%</div>
            </div>
            <div>
              <div className="text-xs" style={{ color: theme.color.textFaint }}>Contact</div>
              <div className="text-sm font-semibold mt-1 flex items-center gap-1" style={{ color: theme.color.text }}>
                <Phone size={12} /> {project.client}
              </div>
            </div>
          </div>
        </Card>

        <Card>
          <h3 className="font-semibold mb-3" style={{ color: theme.color.text }}>Pending Payments</h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 rounded-xl" style={{ backgroundColor: financials.pendingClientPayment > 0 ? theme.color.errorSoft : theme.color.successSoft }}>
              <div>
                <div className="text-sm font-semibold" style={{ color: theme.color.text }}>Pending Client Payment</div>
                <div className="text-xs" style={{ color: theme.color.textMuted }}>Value − Received</div>
              </div>
              <div className="text-sm font-bold" style={{ color: financials.pendingClientPayment > 0 ? theme.color.error : theme.color.success }}>
                {formatCurrency(financials.pendingClientPayment)}
              </div>
            </div>
            {upcoming.map((p) => (
              <div key={p.id} className="flex items-center justify-between text-sm py-2 border-b last:border-0" style={{ borderColor: theme.color.border }}>
                <span style={{ color: theme.color.text }}>{p.milestone}</span>
                <span className="font-semibold" style={{ color: theme.color.text }}>{formatCurrency(p.amount)}</span>
              </div>
            ))}
            {upcoming.length === 0 && (
              <div className="text-xs" style={{ color: theme.color.textFaint }}>No other scheduled milestones.</div>
            )}
          </div>
        </Card>
      </div>

      <Card padded={false}>
        <h3 className="font-semibold p-5 pb-0" style={{ color: theme.color.text }}>Recent Activity</h3>
        <div className="p-5">
          {activities.length === 0 ? (
            <div className="text-sm py-4" style={{ color: theme.color.textFaint }}>No activity recorded yet.</div>
          ) : (
            activities.slice(0, 4).map((a, i) => <ActivityRow key={a.id} item={a} last={i === Math.min(activities.length, 4) - 1} />)
          )}
        </div>
      </Card>
    </div>
  );
}
