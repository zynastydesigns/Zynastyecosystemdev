import React from "react";
import { Card } from "../ui/Card";
import { theme } from "../../theme";
import { TimelineActivity } from "../../types/models";
import { ActivityRow } from "../workspace/ActivityRow";

export function RecentActivity({ activities }: { activities: TimelineActivity[] }) {
  return (
    <Card padded={false}>
      <h3 className="font-semibold p-5 pb-0" style={{ color: theme.color.text }}>Recent Activities</h3>
      <div className="p-5">
        {activities.length === 0 ? (
          <div className="text-sm py-6 text-center" style={{ color: theme.color.textFaint }}>
            Nothing yet — activity across all projects will show up here.
          </div>
        ) : (
          activities.map((a, i) => <ActivityRow key={a.id} item={a} last={i === activities.length - 1} />)
        )}
      </div>
    </Card>
  );
}
