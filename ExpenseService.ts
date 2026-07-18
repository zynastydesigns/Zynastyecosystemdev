import { Expense, ExpenseDraft } from "../types/models";
import { generateId } from "../utils/id";

/**
 * ExpenseService
 * ---------------------------------------------------------------------
 * Owns validation and entity construction for expenses. The reducer
 * calls this before committing a new expense to state — keeping the
 * "what makes a valid expense" rule in one place instead of scattered
 * across form components.
 */

export interface ExpenseValidationResult {
  valid: boolean;
  errors: Partial<Record<keyof ExpenseDraft, string>>;
}

export function validateExpenseDraft(draft: Partial<ExpenseDraft>): ExpenseValidationResult {
  const errors: ExpenseValidationResult["errors"] = {};

  if (!draft.projectId) errors.projectId = "Project is required.";
  if (!draft.vendorId) errors.vendorId = "Select a vendor or choose cash purchase.";
  if (!draft.amount || draft.amount <= 0) errors.amount = "Enter a valid amount.";
  if (!draft.date) errors.date = "Date is required.";
  if (!draft.category) errors.category = "Category is required.";
  if (!draft.paymentMode) errors.paymentMode = "Select a payment method.";

  return { valid: Object.keys(errors).length === 0, errors };
}

export function buildExpense(draft: ExpenseDraft): Expense {
  const now = new Date().toISOString();
  return {
    id: generateId("exp"),
    projectId: draft.projectId,
    vendorId: draft.vendorId,
    vendorName: draft.vendorName ?? "",
    category: draft.category,
    amount: draft.amount,
    date: draft.date,
    description: draft.description,
    paymentMode: draft.paymentMode,
    notes: draft.notes,
    billNumber: draft.billNumber,
    inputMethod: draft.inputMethod,
    documentId: draft.documentId,
    status: "Confirmed",
    createdAt: now,
    updatedAt: now,
  };
}

export function applyExpenseUpdate(existing: Expense, patch: Partial<ExpenseDraft>): Expense {
  return {
    ...existing,
    ...patch,
    updatedAt: new Date().toISOString(),
  };
}
