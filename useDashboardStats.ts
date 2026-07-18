import { useAppContext } from "../state/AppContext";
import { selectDashboardStats, selectCashFlowSeries, selectRecentActivities, selectOverduePayments } from "../state/selectors";

/**
 * Single hook for everything the Dashboard needs. Because it reads
 * straight from context state, any expense/payment mutation anywhere
 * in the app causes this hook — and therefore the Dashboard — to
 * recompute and re-render automatically. No manual refresh required.
 */
export function useDashboardStats() {
  const { state } = useAppContext();

  return {
    stats: selectDashboardStats(state),
    cashFlow: selectCashFlowSeries(state),
    recentActivities: selectRecentActivities(state),
    overduePayments: selectOverduePayments(state),
    projects: state.projects,
  };
}
