import React from "react";
import { ChevronRight } from "lucide-react";
import { ProjectStatusBadge } from "../ui/Badge";
import { theme } from "../../theme";
import { Project } from "../../types/models";
import { formatCurrency } from "../../utils/format";
import { computeProjectFinancials } from "../../services/CalculationService";

export function ProjectRow({ project, onOpen }: { project: Project; onOpen: (p: Project) => void }) {
  const f = computeProjectFinancials(project);
  return (
    <tr
      className="border-b last:border-0 hover:bg-gray-50 cursor-pointer"
      style={{ borderColor: theme.color.border }}
      onClick={() => onOpen(project)}
    >
      <td className="px-5 py-4">
        <div className="font-semibold" style={{ color: theme.color.text }}>{project.name}</div>
        <div className="text-xs" style={{ color: theme.color.textFaint }}>#{project.id}</div>
      </td>
      <td className="px-5 py-4">
        {project.client}
        <div className="text-xs" style={{ color: theme.color.textFaint }}>{project.city}</div>
      </td>
      <td className="px-5 py-4 font-medium" style={{ color: theme.color.text }}>{formatCurrency(f.value)}</td>
      <td className="px-5 py-4" style={{ color: theme.color.text }}>{formatCurrency(f.received)}</td>
      <td className="px-5 py-4" style={{ color: theme.color.text }}>{formatCurrency(f.spent)}</td>
      <td className="px-5 py-4 font-semibold" style={{ color: f.profit >= 0 ? theme.color.success : theme.color.error }}>
        {formatCurrency(f.profit)}
      </td>
      <td className="px-5 py-4" style={{ color: theme.color.text }}>{formatCurrency(f.pendingClientPayment)}</td>
      <td className="px-5 py-4"><ProjectStatusBadge status={project.status} /></td>
      <td className="px-5 py-4"><ChevronRight size={16} style={{ color: theme.color.textFaint }} /></td>
    </tr>
  );
}
