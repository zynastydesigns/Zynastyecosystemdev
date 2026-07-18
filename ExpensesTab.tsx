import React, { useState } from "react";
import { Plus, Trash2, Pencil } from "lucide-react";
import { Card } from "../../ui/Card";
import { Button } from "../../ui/Button";
import { Badge } from "../../ui/Badge";
import { theme } from "../../../theme";
import { formatCurrency, formatDate } from "../../../utils/format";
import { UseProjectWorkspaceResult } from "../../../hooks/useProjectWorkspace";
import { AddExpenseModal } from "../../expenses/AddExpenseModal";

export function ExpensesTab({ workspace }: { workspace: UseProjectWorkspaceResult }) {
  const { project, expenses, financials, actions } = workspace;
  const [showModal, setShowModal] = useState(false);
  if (!project || !financials) return null;

  return (
    <Card padded={false}>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-5">
        <div>
          <h3 className="font-semibold" style={{ color: theme.color.text }}>Expenses</h3>
          <p className="text-xs mt-0.5" style={{ color: theme.color.textMuted }}>Track all project expenses</p>
        </div>
        <Button icon={<Plus size={16} />} onClick={() => setShowModal(true)}>Add Expense</Button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-sm min-w-[820px]">
          <thead>
            <tr style={{ color: theme.color.textMuted }} className="text-left border-y">
              {["Date", "Vendor", "Category", "Description", "Amount", "Payment Mode", "Status", ""].map((h) => (
                <th key={h} className="font-medium px-5 py-3" style={{ borderColor: theme.color.border }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {expenses.map((r) => (
              <tr key={r.id} className="border-b last:border-0 group" style={{ borderColor: theme.color.border }}>
                <td className="px-5 py-4" style={{ color: theme.color.text }}>{formatDate(r.date)}</td>
                <td className="px-5 py-4 font-medium" style={{ color: theme.color.text }}>{r.vendorName || "Cash Purchase"}</td>
                <td className="px-5 py-4"><Badge bg={theme.color.bg} fg={theme.color.textMuted}>{r.category}</Badge></td>
                <td className="px-5 py-4" style={{ color: theme.color.textMuted }}>{r.description}</td>
                <td className="px-5 py-4 font-semibold" style={{ color: theme.color.text }}>{formatCurrency(r.amount)}</td>
                <td className="px-5 py-4" style={{ color: theme.color.textMuted }}>{r.paymentMode}</td>
                <td className="px-5 py-4">
                  <Badge bg={theme.color.successSoft} fg={theme.color.success}>{r.status}</Badge>
                </td>
                <td className="px-5 py-4">
                  <button
                    onClick={() => actions.deleteExpense(r.id)}
                    className="opacity-0 group-hover:opacity-100 p-1.5 rounded-lg hover:bg-red-50"
                    aria-label="Delete expense"
                  >
                    <Trash2 size={14} style={{ color: theme.color.error }} />
                  </button>
                </td>
              </tr>
            ))}
            {expenses.length === 0 && (
              <tr>
                <td colSpan={8} className="px-5 py-10 text-center text-sm" style={{ color: theme.color.textFaint }}>
                  No expenses logged yet — add one to get started.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <div className="flex items-center justify-between p-5 border-t" style={{ borderColor: theme.color.border }}>
        <span className="text-xs" style={{ color: theme.color.textFaint }}>{expenses.length} transactions</span>
        <div className="text-right">
          <div className="text-xs" style={{ color: theme.color.textMuted }}>Total Expenses</div>
          <div className="text-lg font-bold" style={{ color: theme.color.text }}>{formatCurrency(financials.spent)}</div>
        </div>
      </div>

      {showModal && (
        <AddExpenseModal
          projectId={project.id}
          onClose={() => setShowModal(false)}
          onSave={(draft, document) => actions.addExpense(draft, document)}
        />
      )}
    </Card>
  );
}
