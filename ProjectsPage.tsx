import React, { useState } from "react";
import { Search, Plus, ChevronLeft, ChevronRight } from "lucide-react";
import { Card } from "../ui/Card";
import { Button } from "../ui/Button";
import { theme } from "../../theme";
import { Project } from "../../types/models";
import { ProjectRow } from "./ProjectRow";

const PAGE_SIZE = 8;

interface ProjectsPageProps {
  projects: Project[];
  onOpen: (project: Project) => void;
  onNewProject: () => void;
}

export function ProjectsPage({ projects, onOpen, onNewProject }: ProjectsPageProps) {
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);

  const filtered = projects.filter(
    (p) =>
      p.name.toLowerCase().includes(query.toLowerCase()) ||
      p.client.toLowerCase().includes(query.toLowerCase()) ||
      p.id.toLowerCase().includes(query.toLowerCase())
  );

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const pageItems = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  return (
    <div className="p-4 sm:p-7 space-y-5">
      <Card padded={false}>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-5">
          <h3 className="font-semibold" style={{ color: theme.color.text }}>Manage and track all your projects</h3>
          <div className="flex items-center gap-2">
            <div className="relative">
              <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2" style={{ color: theme.color.textFaint }} />
              <input
                value={query}
                onChange={(e) => {
                  setQuery(e.target.value);
                  setPage(1);
                }}
                placeholder="Search projects…"
                className="pl-9 pr-3 py-2.5 rounded-xl text-sm outline-none border w-56"
                style={{ borderColor: theme.color.border, backgroundColor: theme.color.bg }}
              />
            </div>
            <Button icon={<Plus size={16} />} onClick={onNewProject}>New Project</Button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm min-w-[900px]">
            <thead>
              <tr style={{ color: theme.color.textMuted }} className="text-left border-y">
                {["Project ID / Name", "Client", "Project Value", "Received", "Spent", "Profit", "Pending", "Status", ""].map((h) => (
                  <th key={h} className="font-medium px-5 py-3" style={{ borderColor: theme.color.border }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {pageItems.map((p) => (
                <ProjectRow key={p.id} project={p} onOpen={onOpen} />
              ))}
              {pageItems.length === 0 && (
                <tr>
                  <td colSpan={9} className="px-5 py-10 text-center text-sm" style={{ color: theme.color.textFaint }}>
                    No projects match "{query}".
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <div className="flex items-center justify-between p-5 text-sm" style={{ color: theme.color.textMuted }}>
          <span>
            Showing {pageItems.length === 0 ? 0 : (page - 1) * PAGE_SIZE + 1}–{(page - 1) * PAGE_SIZE + pageItems.length} of {filtered.length} projects
          </span>
          <div className="flex items-center gap-1.5">
            <button
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={page === 1}
              className="w-8 h-8 rounded-lg border flex items-center justify-center disabled:opacity-40"
              style={{ borderColor: theme.color.border }}
            >
              <ChevronLeft size={14} />
            </button>
            <span className="px-2 text-xs font-medium">{page} / {totalPages}</span>
            <button
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              disabled={page === totalPages}
              className="w-8 h-8 rounded-lg border flex items-center justify-center disabled:opacity-40"
              style={{ borderColor: theme.color.border }}
            >
              <ChevronRight size={14} />
            </button>
          </div>
        </div>
      </Card>
    </div>
  );
}
