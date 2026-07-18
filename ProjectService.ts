import { Project, ProjectDraft } from "../types/models";
import { generateId, nextProjectCode } from "../utils/id";

export function buildProject(draft: ProjectDraft, existingCount: number): Project {
  const now = new Date().toISOString();
  return {
    id: nextProjectCode(existingCount),
    name: draft.name,
    client: draft.client,
    city: draft.city,
    type: draft.type,
    status: "Design Phase",
    value: draft.value,
    received: 0,
    spent: 0,
    startDate: draft.startDate,
    estCompletionDate: draft.estCompletionDate,
    progressPercent: 0,
    createdAt: now,
    updatedAt: now,
  };
}

export function internalId(): string {
  // Reserved for future use where a stable non-display id is needed
  // (the human-facing ZYN-##### code may change on renumbering).
  return generateId("proj");
}
