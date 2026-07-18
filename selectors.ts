import { AppState } from "./appReducer";
import { CashFlowPoint, Expense, TimelineActivity } from "../types/models";
import { computeDashboardStats } from "../services/CalculationService";
import { sortNewestFirst } from "../services/TimelineService";

export function selectDashboardStats(state: AppState) {
  return computeDashboardStats(state.projects);
}

export function selectProjectById(state: AppState, projectId: string) {
  return state.projects.find((p) => p.id === projectId);
}

export function selectExpensesForProject(state: AppState, projectId: string): Expense[] {
  return state.expenses
    .filter((e) => e.projectId === projectId)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export function selectClientPaymentsForProject(state: AppState, projectId: string) {
  return state.clientPayments
    .filter((p) => p.projectId === projectId)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export function selectDocumentsForProject(state: AppState, projectId: string) {
  return state.documents
    .filter((d) => d.projectId === projectId)
    .sort((a, b) => new Date(b.uploadedAt).getTime() - new Date(a.uploadedAt).getTime());
}

export function selectActivitiesForProject(
  state: AppState,
  projectId: string
): TimelineActivity[] {
  return sortNewestFirst(state.activities.filter((a) => a.projectId === projectId));
}

export function selectRecentActivities(state: AppState, limit = 6): TimelineActivity[] {
  return sortNewestFirst(state.activities).slice(0, limit);
}

export function selectOverduePayments(state: AppState) {
  return state.clientPayments.filter((p) => p.status === "Overdue");
}

/** Builds a simple monthly cash-flow series from expenses + client payments. */
export function selectCashFlowSeries(state: AppState): CashFlowPoint[] {
  const buckets = new Map<string, { income: number; expenses: number }>();

  const bucketKey = (iso: string) => {
    const d = new Date(iso);
    return d.toLocaleDateString("en-IN", { month: "short" });
  };

  state.clientPayments.forEach((p) => {
    if (p.status !== "Received") return;
    const key = bucketKey(p.date);
    const b = buckets.get(key) ?? { income: 0, expenses: 0 };
    b.income += p.amount;
    buckets.set(key, b);
  });

  state.expenses.forEach((e) => {
    const key = bucketKey(e.date);
    const b = buckets.get(key) ?? { income: 0, expenses: 0 };
    b.expenses += e.amount;
    buckets.set(key, b);
  });

  return Array.from(buckets.entries()).map(([label, v]) => ({
    label,
    income: v.income,
    expenses: v.expenses,
    profit: v.income - v.expenses,
  }));
}
