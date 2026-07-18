import { TimelineActivity, TimelineActivityType } from "../types/models";
import { generateId } from "../utils/id";

/**
 * TimelineService
 * ---------------------------------------------------------------------
 * Every mutating action in Beacon (expense added, payment received,
 * bill uploaded, etc.) should call `createActivity` and push the
 * result into state via the reducer. Keeping this in one place means
 * the activity feed's vocabulary stays consistent everywhere it's
 * rendered (project timeline, dashboard "Recent Activity", audit log).
 */

export function createActivity(params: {
  projectId: string;
  type: TimelineActivityType;
  title: string;
  detail: string;
  amount?: number;
}): TimelineActivity {
  return {
    id: generateId("act"),
    projectId: params.projectId,
    type: params.type,
    title: params.title,
    detail: params.detail,
    amount: params.amount,
    createdAt: new Date().toISOString(),
  };
}

export function sortNewestFirst(activities: TimelineActivity[]): TimelineActivity[] {
  return [...activities].sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );
}
