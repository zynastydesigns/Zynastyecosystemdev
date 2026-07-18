import React from "react";
import { AlertTriangle } from "lucide-react";
import { Card } from "../ui/Card";
import { IconCircle } from "../ui/IconCircle";
import { theme } from "../../theme";
import { ClientPayment } from "../../types/models";
import { formatCurrency, formatDate } from "../../utils/format";

export function PaymentAlerts({ overdue }: { overdue: ClientPayment[] }) {
  const total = overdue.reduce((s, p) => s + p.amount, 0);

  return (
    <Card padded={false}>
      <div className="p-5 pb-3">
        <h3 className="font-semibold" style={{ color: theme.color.text }}>Payment Alerts</h3>
      </div>
      <div className="px-5 pb-5 space-y-3">
        {overdue.length === 0 && (
          <div className="text-sm py-6 text-center" style={{ color: theme.color.textFaint }}>
            No overdue payments right now.
          </div>
        )}
        {overdue.map((p) => (
          <div key={p.id} className="flex items-center gap-3 p-3.5 rounded-xl" style={{ backgroundColor: theme.color.errorSoft }}>
            <IconCircle icon={AlertTriangle} tint={theme.color.error} soft="#FFFFFF" size={34} />
            <div className="flex-1 min-w-0">
              <div className="text-sm font-semibold truncate" style={{ color: theme.color.text }}>{p.milestone}</div>
              <div className="text-xs mt-0.5" style={{ color: theme.color.textMuted }}>Due {formatDate(p.date)}</div>
            </div>
            <div className="text-sm font-bold" style={{ color: theme.color.error }}>{formatCurrency(p.amount)}</div>
          </div>
        ))}
        {overdue.length > 0 && (
          <div className="text-xs pt-1" style={{ color: theme.color.textFaint }}>
            {overdue.length} overdue · {formatCurrency(total)} total
          </div>
        )}
      </div>
    </Card>
  );
}
