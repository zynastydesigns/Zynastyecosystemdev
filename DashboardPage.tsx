import React from "react";
import { useDashboardStats } from "../../hooks/useDashboardStats";
import { KpiGrid } from "./KpiGrid";
import { CashFlowChart } from "./CashFlowChart";
import { PaymentAlerts } from "./PaymentAlerts";
import { RecentProjects } from "./RecentProjects";
import { RecentActivity } from "./RecentActivity";
import { Project } from "../../types/models";

export function DashboardPage({ onOpenProject }: { onOpenProject: (project: Project) => void }) {
  const { stats, cashFlow, recentActivities, overduePayments, projects } = useDashboardStats();

  return (
    <div className="p-4 sm:p-7 space-y-6">
      <KpiGrid stats={stats} />

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        <div className="xl:col-span-2">
          <CashFlowChart data={cashFlow} />
        </div>
        <PaymentAlerts overdue={overduePayments} />
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        <div className="xl:col-span-2">
          <RecentProjects projects={projects} onOpen={onOpenProject} />
        </div>
        <RecentActivity activities={recentActivities} />
      </div>
    </div>
  );
}
