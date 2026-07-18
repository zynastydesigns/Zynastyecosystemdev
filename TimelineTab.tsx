import React from "react";
import { Card } from "../../ui/Card";
import { theme } from "../../../theme";
import { UseProjectWorkspaceResult } from "../../../hooks/useProjectWorkspace";
import { ActivityRow } from "../ActivityRow";

export function TimelineTab({ workspace }: { workspace: UseProjectWorkspaceResult }) {
  const { activities } = workspace;

  return (
    <Card>
      <h3 className="font-semibold mb-5" style={{ color: theme.color.text }}>Activity Timeline</h3>
      {activities.length === 0 ? (
        <div className="text-sm py-10 text-center" style={{ color: theme.color.textFaint }}>
          No activity yet for this project.
        </div>
      ) : (
        <div className="space-y-0">
          {activities.map((a, i) => (
            <ActivityRow key={a.id} item={a} last={i === activities.length - 1} />
          ))}
        </div>
      )}
    </Card>
  );
}
