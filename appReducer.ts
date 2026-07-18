import {
  Project,
  Expense,
  ClientPayment,
  VendorPayment,
  DocumentFile,
  TimelineActivity,
} from "../types/models";
import { AppAction } from "./actions";
import { recalcProject } from "../services/CalculationService";
import { buildExpense, applyExpenseUpdate } from "../services/ExpenseService";
import { createActivity } from "../services/TimelineService";
import { formatCurrency } from "../utils/format";

export interface AppState {
  projects: Project[];
  expenses: Expense[];
  clientPayments: ClientPayment[];
  vendorPayments: VendorPayment[];
  documents: DocumentFile[];
  activities: TimelineActivity[];
}

export const initialAppState: AppState = {
  projects: [],
  expenses: [],
  clientPayments: [],
  vendorPayments: [],
  documents: [],
  activities: [],
};

/** Recalculates the one touched project and returns an updated projects array. */
function withRecalculatedProject(
  state: AppState,
  projectId: string,
  expenses: Expense[],
  clientPayments: ClientPayment[]
): Project[] {
  return state.projects.map((p) =>
    p.id === projectId ? recalcProject(p, expenses, clientPayments) : p
  );
}

export function appReducer(state: AppState, action: AppAction): AppState {
  switch (action.type) {
    case "HYDRATE": {
      return { ...state, projects: action.payload.projects };
    }

    case "ADD_PROJECT": {
      return { ...state, projects: [action.payload, ...state.projects] };
    }

    /* ---------------------------- expenses ---------------------------- */

    case "ADD_EXPENSE": {
      const { draft, document } = action.payload;
      const expense = buildExpense({
        ...draft,
        documentId: document?.id ?? draft.documentId,
      });

      const expenses = [expense, ...state.expenses];
      const documents = document ? [document, ...state.documents] : state.documents;
      const projects = withRecalculatedProject(
        state,
        expense.projectId,
        expenses,
        state.clientPayments
      );

      const activity = createActivity({
        projectId: expense.projectId,
        type: "expense_added",
        title: "Expense added",
        detail: `${expense.vendorName || "Cash purchase"} · ${expense.category} · ${formatCurrency(
          expense.amount
        )}`,
        amount: expense.amount,
      });

      const activities = [activity, ...state.activities];

      // Bill upload gets its own activity entry when a document was attached.
      const billActivity = document
        ? [
            createActivity({
              projectId: expense.projectId,
              type: "bill_uploaded",
              title: "Bill uploaded",
              detail: `${document.name} attached to ${expense.vendorName || "expense"}`,
            }),
          ]
        : [];

      return {
        ...state,
        expenses,
        documents,
        projects,
        activities: [...billActivity, ...activities],
      };
    }

    case "UPDATE_EXPENSE": {
      const { expenseId, patch } = action.payload;
      const target = state.expenses.find((e) => e.id === expenseId);
      if (!target) return state;

      const updated = applyExpenseUpdate(target, patch);
      const expenses = state.expenses.map((e) => (e.id === expenseId ? updated : e));
      const projects = withRecalculatedProject(
        state,
        updated.projectId,
        expenses,
        state.clientPayments
      );

      const activity = createActivity({
        projectId: updated.projectId,
        type: "expense_updated",
        title: "Expense updated",
        detail: `${updated.vendorName || "Cash purchase"} · ${formatCurrency(updated.amount)}`,
        amount: updated.amount,
      });

      return {
        ...state,
        expenses,
        projects,
        activities: [activity, ...state.activities],
      };
    }

    case "DELETE_EXPENSE": {
      const target = state.expenses.find((e) => e.id === action.payload.expenseId);
      if (!target) return state;

      const expenses = state.expenses.filter((e) => e.id !== target.id);
      const projects = withRecalculatedProject(state, target.projectId, expenses, state.clientPayments);

      const activity = createActivity({
        projectId: target.projectId,
        type: "expense_deleted",
        title: "Expense deleted",
        detail: `${target.vendorName || "Cash purchase"} · ${formatCurrency(target.amount)}`,
        amount: target.amount,
      });

      return {
        ...state,
        expenses,
        projects,
        activities: [activity, ...state.activities],
      };
    }

    /* ---------------------------- payments ---------------------------- */

    case "ADD_CLIENT_PAYMENT": {
      const payment = action.payload;
      const clientPayments = [payment, ...state.clientPayments];
      const projects = withRecalculatedProject(state, payment.projectId, state.expenses, clientPayments);

      const activity = createActivity({
        projectId: payment.projectId,
        type: "client_payment_received",
        title: "Client payment received",
        detail: `${payment.milestone} · ${formatCurrency(payment.amount)} via ${payment.mode}`,
        amount: payment.amount,
      });

      return {
        ...state,
        clientPayments,
        projects,
        activities: [activity, ...state.activities],
      };
    }

    case "ADD_VENDOR_PAYMENT": {
      const payment = action.payload;
      const vendorPayments = [payment, ...state.vendorPayments];

      const activity = createActivity({
        projectId: payment.projectId,
        type: "vendor_payment_completed",
        title: "Vendor payment completed",
        detail: `${formatCurrency(payment.amount)} to ${payment.vendorName}`,
        amount: payment.amount,
      });

      return {
        ...state,
        vendorPayments,
        activities: [activity, ...state.activities],
      };
    }

    /* ---------------------------- documents ---------------------------- */

    case "ADD_DOCUMENT": {
      const doc = action.payload;
      const activity = createActivity({
        projectId: doc.projectId,
        type: "bill_uploaded",
        title: "Document uploaded",
        detail: doc.name,
      });
      return {
        ...state,
        documents: [doc, ...state.documents],
        activities: [activity, ...state.activities],
      };
    }

    case "DELETE_DOCUMENT": {
      const doc = state.documents.find((d) => d.id === action.payload.documentId);
      if (!doc) return state;
      const activity = createActivity({
        projectId: doc.projectId,
        type: "document_deleted",
        title: "Document deleted",
        detail: doc.name,
      });
      return {
        ...state,
        documents: state.documents.filter((d) => d.id !== doc.id),
        activities: [activity, ...state.activities],
      };
    }

    default:
      return state;
  }
}
