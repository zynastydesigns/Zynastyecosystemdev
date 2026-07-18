import React, { useState } from "react";
import { Plus } from "lucide-react";
import { Card } from "../../ui/Card";
import { Button } from "../../ui/Button";
import { Badge } from "../../ui/Badge";
import { theme } from "../../../theme";
import { formatCurrency, formatDate } from "../../../utils/format";
import { UseProjectWorkspaceResult } from "../../../hooks/useProjectWorkspace";
import { RecordPaymentModal } from "../../expenses/RecordPaymentModal";

export function ClientPaymentsTab({ workspace }: { workspace: UseProjectWorkspaceResult }) {
  const { project, clientPayments, actions } = workspace;
  const [showModal, setShowModal] = useState(false);
  if (!project) return null;

  return (
    <Card padded={false}>
      <div className="flex items-center justify-between p-5">
        <h3 className="font-semibold" style={{ color: theme.color.text }}>Client Payments</h3>
        <Button icon={<Plus size={16} />} onClick={() => setShowModal(true)}>Record Payment</Button>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-sm min-w-[600px]">
          <thead>
            <tr style={{ color: theme.color.textMuted }} className="text-left border-y">
              {["Date", "Milestone", "Mode", "Amount", "Status"].map((h) => (
                <th key={h} className="font-medium px-5 py-3" style={{ borderColor: theme.color.border }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {clientPayments.map((r) => (
              <tr key={r.id} className="border-b last:border-0" style={{ borderColor: theme.color.border }}>
                <td className="px-5 py-4" style={{ color: theme.color.text }}>{formatDate(r.date)}</td>
                <td className="px-5 py-4" style={{ color: theme.color.text }}>{r.milestone}</td>
                <td className="px-5 py-4" style={{ color: theme.color.textMuted }}>{r.mode}</td>
                <td className="px-5 py-4 font-semibold" style={{ color: theme.color.text }}>{formatCurrency(r.amount)}</td>
                <td className="px-5 py-4">
                  <Badge
                    bg={r.status === "Received" ? theme.color.successSoft : theme.color.errorSoft}
                    fg={r.status === "Received" ? theme.color.success : theme.color.error}
                  >
                    {r.status}
                  </Badge>
                </td>
              </tr>
            ))}
            {clientPayments.length === 0 && (
              <tr>
                <td colSpan={5} className="px-5 py-10 text-center text-sm" style={{ color: theme.color.textFaint }}>
                  No payments recorded yet.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {showModal && (
        <RecordPaymentModal
          projectId={project.id}
          onClose={() => setShowModal(false)}
          onSave={(payment) => actions.addClientPayment(payment)}
        />
      )}
    </Card>
  );
}
