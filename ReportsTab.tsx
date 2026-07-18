import React, { useMemo } from "react";
import { BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";
import { Card } from "../../ui/Card";
import { theme } from "../../../theme";
import { formatCurrency } from "../../../utils/format";
import { UseProjectWorkspaceResult } from "../../../hooks/useProjectWorkspace";

const PALETTE = [theme.color.emerald, theme.color.navy, theme.color.gold, theme.color.warning, theme.color.error, theme.color.textFaint];

export function ReportsTab({ workspace }: { workspace: UseProjectWorkspaceResult }) {
  const { project, financials, expenses, clientPayments } = workspace;

  const categoryBreakdown = useMemo(() => {
    const map = new Map<string, number>();
    expenses.forEach((e) => map.set(e.category, (map.get(e.category) ?? 0) + e.amount));
    return Array.from(map.entries()).map(([name, value], i) => ({ name, value, color: PALETTE[i % PALETTE.length] }));
  }, [expenses]);

  const vendorSummary = useMemo(() => {
    const map = new Map<string, number>();
    expenses.forEach((e) => {
      const key = e.vendorName || "Cash Purchase";
      map.set(key, (map.get(key) ?? 0) + e.amount);
    });
    return Array.from(map.entries()).sort((a, b) => b[1] - a[1]);
  }, [expenses]);

  if (!project || !financials) return null;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
      <Card>
        <h3 className="font-semibold mb-1" style={{ color: theme.color.text }}>Profit &amp; Loss</h3>
        <p className="text-xs mb-4" style={{ color: theme.color.textMuted }}>Received vs spent, this project</p>
        <div className="h-56">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={[
              { name: "Received", v: financials.received },
              { name: "Spent", v: financials.spent },
              { name: "Profit", v: financials.profit },
            ]}>
              <CartesianGrid strokeDasharray="3 3" stroke={theme.color.border} vertical={false} />
              <XAxis dataKey="name" tick={{ fontSize: 12, fill: theme.color.textMuted }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 12, fill: theme.color.textMuted }} axisLine={false} tickLine={false} />
              <Tooltip formatter={(v: number) => formatCurrency(v)} contentStyle={{ borderRadius: 12, border: `1px solid ${theme.color.border}`, fontSize: 13 }} />
              <Bar dataKey="v" radius={[8, 8, 0, 0]}>
                <Cell fill={theme.color.success} />
                <Cell fill={theme.color.error} />
                <Cell fill={theme.color.gold} />
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </Card>

      <Card>
        <h3 className="font-semibold mb-1" style={{ color: theme.color.text }}>Expense Breakdown</h3>
        <p className="text-xs mb-4" style={{ color: theme.color.textMuted }}>By category</p>
        {categoryBreakdown.length === 0 ? (
          <div className="h-56 flex items-center justify-center text-sm" style={{ color: theme.color.textFaint }}>No expenses yet.</div>
        ) : (
          <div className="h-56 flex items-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={categoryBreakdown} dataKey="value" nameKey="name" innerRadius={45} outerRadius={80} paddingAngle={2}>
                  {categoryBreakdown.map((c, i) => <Cell key={i} fill={c.color} />)}
                </Pie>
                <Tooltip formatter={(v: number) => formatCurrency(v)} contentStyle={{ borderRadius: 12, border: `1px solid ${theme.color.border}`, fontSize: 13 }} />
                <Legend iconType="circle" wrapperStyle={{ fontSize: 11 }} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        )}
      </Card>

      <Card>
        <h3 className="font-semibold mb-4" style={{ color: theme.color.text }}>Vendor Summary</h3>
        <div className="space-y-3">
          {vendorSummary.length === 0 && <div className="text-sm" style={{ color: theme.color.textFaint }}>No vendor expenses yet.</div>}
          {vendorSummary.map(([name, amount]) => (
            <div key={name} className="flex items-center justify-between text-sm py-2 border-b last:border-0" style={{ borderColor: theme.color.border }}>
              <span style={{ color: theme.color.text }}>{name}</span>
              <span className="font-semibold" style={{ color: theme.color.text }}>{formatCurrency(amount)}</span>
            </div>
          ))}
        </div>
      </Card>

      <Card>
        <h3 className="font-semibold mb-4" style={{ color: theme.color.text }}>Client Payment Summary</h3>
        <div className="space-y-3">
          {clientPayments.length === 0 && <div className="text-sm" style={{ color: theme.color.textFaint }}>No payments recorded yet.</div>}
          {clientPayments.map((p) => (
            <div key={p.id} className="flex items-center justify-between text-sm py-2 border-b last:border-0" style={{ borderColor: theme.color.border }}>
              <span style={{ color: theme.color.text }}>{p.milestone}</span>
              <span className="font-semibold" style={{ color: theme.color.text }}>{formatCurrency(p.amount)}</span>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
