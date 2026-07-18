import { useAppContext } from "../state/AppContext";
import {
  selectProjectById,
  selectExpensesForProject,
  selectClientPaymentsForProject,
  selectDocumentsForProject,
  selectActivitiesForProject,
} from "../state/selectors";
import { computeProjectFinancials } from "../services/CalculationService";

/**
 * Everything a Project Workspace tab needs, recomputed live whenever
 * the underlying expense/payment/document arrays change.
 */
export function useProjectWorkspace(projectId: string) {
  const { state, actions } = useAppContext();

  const project = selectProjectById(state, projectId);
  const expenses = selectExpensesForProject(state, projectId);
  const clientPayments = selectClientPaymentsForProject(state, projectId);
  const documents = selectDocumentsForProject(state, projectId);
  const activities = selectActivitiesForProject(state, projectId);
  const financials = project ? computeProjectFinancials(project) : undefined;

  return { project, financials, expenses, clientPayments, documents, activities, actions };
}

export type UseProjectWorkspaceResult = ReturnType<typeof useProjectWorkspace>;
