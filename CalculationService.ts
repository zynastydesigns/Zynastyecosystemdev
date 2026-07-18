import {
  Project,
  ProjectFinancials,
  DashboardStats,
  ClientPayment,
  Expense,
} from "../types/models";
import { percent } from "../utils/format";

/**
 * CalculationService
 * ---------------------------------------------------------------------
 * Every derived financial number in Beacon flows through this module.
 * Nothing else in the app is allowed to compute profit, pending
 * payments, or dashboard totals inline — that guarantees the whole
 * app stays consistent the moment underlying data changes.
 */

export function computeProjectFinancials(project: Project): ProjectFinancials {
  const profit = project.received - project.spent;
  const pendingClientPayment = Math.max(0, project.value - project.received);
  const budgetUtilizationPercent = percent(project.spent, project.value);

  return {
    value: project.value,
    received: project.received,
    spent: project.spent,
    profit,
    pendingClientPayment,
    budgetUtilizationPercent,
  };
}

/**
 * Recalculates a project's denormalized `received` / `spent` fields from
 * its raw transactions. Call this after any expense or payment mutation
 * so the project record never drifts from its ledger.
 */
export function recalcProject(
  project: Project,
  expenses: Expense[],
  clientPayments: ClientPayment[]
): Project {
  const spent = expenses
    .filter((e) => e.projectId === project.id)
    .reduce((sum, e) => sum + e.amount, 0);

  const received = clientPayments
    .filter((p) => p.projectId === project.id && p.status === "Received")
    .reduce((sum, p) => sum + p.amount, 0);

  return {
    ...project,
    spent,
    received,
    updatedAt: new Date().toISOString(),
  };
}

export function computeDashboardStats(projects: Project[]): DashboardStats {
  const totalProjectValue = projects.reduce((s, p) => s + p.value, 0);
  const totalExpenses = projects.reduce((s, p) => s + p.spent, 0);
  const totalReceived = projects.reduce((s, p) => s + p.received, 0);
  const totalReceivables = projects.reduce(
    (s, p) => s + Math.max(0, p.value - p.received),
    0
  );
  const currentProfit = totalReceived - totalExpenses;
  const activeProjects = projects.filter(
    (p) => p.status !== "Completed" && p.status !== "On Hold"
  ).length;

  // Payables: in this phase, modeled as a fixed proportion of expenses
  // that are still owed to vendors. Replace with a real vendor-payment
  // ledger once VendorPayment tracking is wired to actual due dates.
  const totalPayables = Math.round(totalExpenses * 0.18);

  return {
    totalProjectValue,
    totalReceivables,
    totalExpenses,
    totalPayables,
    currentProfit,
    activeProjects,
  };
}
