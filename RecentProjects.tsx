import React from "react";
import { Building2, ChevronRight } from "lucide-react";
import { Card } from "../ui/Card";
import { IconCircle } from "../ui/IconCircle";
import { ProjectStatusBadge } from "../ui/Badge";
import { theme } from "../../theme";
import { Project } from "../../types/models";
import { formatCurrency } from "../../utils/format";
import { computeProjectFinancials } from "../../services/CalculationService";

interface RecentProjectsProps {
  projects: Project[];
  onOpen: (project: Project) => void;
}

export function RecentProjects({ projects, onOpen }: RecentProjectsProps) {
  return (
    <Card padded={false}>
      <div className="flex items-center justify-between p-5">
        <h3 className="font-semibold" style={{ color: theme.color.text }}>Recent Projects</h3>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-sm min-w-[720px]">
          <thead>
            <tr style={{ color: theme.color.textMuted }} className="text-left border-y">
              {["Project Name", "Client", "Project Value", "Received", "Spent", "Profit", "Status"].map((h) => (
                <th key={h} className="font-medium px-5 py-3" style={{ borderColor: theme.color.border }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {projects.slice(0, 5).map((p) => {
              const f = computeProjectFinancials(p);
              return (
                <tr
                  key={p.id}
                  className="border-b last:border-0 cursor-pointer hover:bg-gray-50"
                  style={{ borderColor: theme.color.border }}
                  onClick={() => onOpen(p)}
                >
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-3">
                      <IconCircle icon={Building2} tint={theme.color.navy} soft={theme.color.navySoft} size={32} />
                      <div>
                        <div className="font-semibold" style={{ color: theme.color.text }}>{p.name}</div>
                        <div className="text-xs" style={{ color: theme.color.textFaint }}>#{p.id}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-5 py-4" style={{ color: theme.color.text }}>
                    {p.client}
                    <div className="text-xs" style={{ color: theme.color.textFaint }}>{p.city}</div>
                  </td>
                  <td className="px-5 py-4 font-medium" style={{ color: theme.color.text }}>{formatCurrency(f.value)}</td>
                  <td className="px-5 py-4" style={{ color: theme.color.text }}>{formatCurrency(f.received)}</td>
                  <td className="px-5 py-4" style={{ color: theme.color.text }}>{formatCurrency(f.spent)}</td>
                  <td className="px-5 py-4 font-semibold" style={{ color: f.profit >= 0 ? theme.color.success : theme.color.error }}>
                    {formatCurrency(f.profit)}
                  </td>
                  <td className="px-5 py-4"><ProjectStatusBadge status={p.status} /></td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </Card>
  );
}
