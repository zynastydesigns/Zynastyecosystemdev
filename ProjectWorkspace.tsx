import React, { useState } from "react";
import { Download, Pencil, MoreHorizontal } from "lucide-react";
import { Card } from "../ui/Card";
import { ProjectStatusBadge, Badge } from "../ui/Badge";
import { theme } from "../../theme";
import { useProjectWorkspace } from "../../hooks/useProjectWorkspace";
import { OverviewTab } from "./tabs/OverviewTab";
import { ClientPaymentsTab } from "./tabs/ClientPaymentsTab";
import { ExpensesTab } from "./tabs/ExpensesTab";
import { DocumentsTab } from "./tabs/DocumentsTab";
import { TimelineTab } from "./tabs/TimelineTab";
import { ReportsTab } from "./tabs/ReportsTab";

const TABS = ["Overview", "Client Payments", "Expenses", "Documents", "Timeline", "Reports"] as const;
type Tab = (typeof TABS)[number];

export function ProjectWorkspace({ projectId }: { projectId: string }) {
  const [tab, setTab] = useState<Tab>("Overview");
  const workspace = useProjectWorkspace(projectId);
  const { project } = workspace;

  if (!project) {
    return (
      <div className="p-7">
        <Card>Project not found.</Card>
      </div>
    );
  }

  return (
    <div className="p-4 sm:p-7 space-y-5">
      <Card padded={false}>
        <div className="p-5 flex flex-col sm:flex-row sm:items-start justify-between gap-4">
          <div>
            <div className="flex flex-wrap items-center gap-2.5">
              <h2 className="text-xl font-bold" style={{ color: theme.color.text }}>{project.name}</h2>
              <ProjectStatusBadge status={project.status} />
              <Badge bg={theme.color.navySoft} fg={theme.color.navy}>{project.type}</Badge>
            </div>
            <div className="text-sm mt-1.5" style={{ color: theme.color.textMuted }}>
              #{project.id} · {project.client} · {project.city}
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button className="p-2.5 rounded-xl border" style={{ borderColor: theme.color.border }}><Download size={16} /></button>
            <button className="p-2.5 rounded-xl border" style={{ borderColor: theme.color.border }}><Pencil size={16} /></button>
            <button className="p-2.5 rounded-xl border" style={{ borderColor: theme.color.border }}><MoreHorizontal size={16} /></button>
          </div>
        </div>
        <div className="flex overflow-x-auto border-t" style={{ borderColor: theme.color.border }}>
          {TABS.map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className="px-5 py-3.5 text-sm font-medium whitespace-nowrap border-b-2 transition-colors"
              style={{ color: tab === t ? theme.color.emerald : theme.color.textMuted, borderColor: tab === t ? theme.color.emerald : "transparent" }}
            >
              {t}
            </button>
          ))}
        </div>
      </Card>

      {tab === "Overview" && <OverviewTab workspace={workspace} />}
      {tab === "Client Payments" && <ClientPaymentsTab workspace={workspace} />}
      {tab === "Expenses" && <ExpensesTab workspace={workspace} />}
      {tab === "Documents" && <DocumentsTab workspace={workspace} />}
      {tab === "Timeline" && <TimelineTab workspace={workspace} />}
      {tab === "Reports" && <ReportsTab workspace={workspace} />}
    </div>
  );
}
