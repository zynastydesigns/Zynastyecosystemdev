import React from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";
import { Card } from "../ui/Card";
import { theme } from "../../theme";
import { CashFlowPoint } from "../../types/models";
import { formatCurrency } from "../../utils/format";

export function CashFlowChart({ data }: { data: CashFlowPoint[] }) {
  return (
    <Card padded={false}>
      <div className="p-5 pb-0">
        <h3 className="font-semibold" style={{ color: theme.color.text }}>Cash Flow &amp; Income vs Expenses</h3>
        <p className="text-xs mt-0.5" style={{ color: theme.color.textMuted }}>Live totals from recorded payments and expenses</p>
      </div>
      <div className="h-72 px-2 pt-4">
        {data.length === 0 ? (
          <div className="h-full flex items-center justify-center text-sm" style={{ color: theme.color.textFaint }}>
            No transactions yet — add an expense or record a payment to see the trend.
          </div>
        ) : (
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data} margin={{ top: 5, right: 20, left: 0, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke={theme.color.border} vertical={false} />
              <XAxis dataKey="label" tick={{ fontSize: 12, fill: theme.color.textMuted }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 12, fill: theme.color.textMuted }} axisLine={false} tickLine={false} />
              <Tooltip formatter={(v: number) => formatCurrency(v)} contentStyle={{ borderRadius: 12, border: `1px solid ${theme.color.border}`, fontSize: 13 }} />
              <Legend iconType="circle" wrapperStyle={{ fontSize: 12 }} />
              <Line type="monotone" dataKey="income" name="Income" stroke={theme.color.success} strokeWidth={2.5} dot={{ r: 3 }} />
              <Line type="monotone" dataKey="expenses" name="Expenses" stroke={theme.color.error} strokeWidth={2.5} dot={{ r: 3 }} />
              <Line type="monotone" dataKey="profit" name="Profit" stroke={theme.color.gold} strokeWidth={2.5} dot={{ r: 3 }} />
            </LineChart>
          </ResponsiveContainer>
        )}
      </div>
    </Card>
  );
}
