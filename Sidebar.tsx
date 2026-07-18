import React from "react";
import {
  LayoutDashboard, FolderKanban, IndianRupee, Receipt, Users, BarChart3,
  FileText, Settings, Plus,
} from "lucide-react";
import { theme } from "../../theme";
import { BeaconMark } from "./BeaconMark";

export type NavKey =
  | "dashboard" | "projects" | "income" | "expenses"
  | "vendors" | "reports" | "documents" | "settings";

const NAV: { key: NavKey; label: string; icon: React.ComponentType<{ size?: number; strokeWidth?: number }> }[] = [
  { key: "dashboard", label: "Dashboard", icon: LayoutDashboard },
  { key: "projects", label: "Projects", icon: FolderKanban },
  { key: "income", label: "Income", icon: IndianRupee },
  { key: "expenses", label: "Expenses", icon: Receipt },
  { key: "vendors", label: "Vendors", icon: Users },
  { key: "reports", label: "Reports", icon: BarChart3 },
  { key: "documents", label: "Documents", icon: FileText },
  { key: "settings", label: "Settings", icon: Settings },
];

interface SidebarProps {
  active: NavKey;
  onNavigate: (key: NavKey) => void;
  mobileOpen: boolean;
  onCloseMobile: () => void;
  onQuickAdd: () => void;
}

export function Sidebar({ active, onNavigate, mobileOpen, onCloseMobile, onQuickAdd }: SidebarProps) {
  return (
    <>
      {mobileOpen && (
        <div
          className="fixed inset-0 z-30 lg:hidden"
          style={{ background: "rgba(15,23,42,0.4)" }}
          onClick={onCloseMobile}
        />
      )}
      <aside
        className={`fixed lg:static z-40 top-0 left-0 h-full w-64 flex flex-col transition-transform duration-200 ${
          mobileOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        }`}
        style={{ backgroundColor: theme.color.navy }}
      >
        <div className="px-6 pt-7 pb-6 flex items-center gap-2.5">
          <BeaconMark size={26} />
          <div>
            <div className="text-white font-bold tracking-wide text-lg leading-none">BEACON</div>
            <div className="text-[10px] mt-1 tracking-wider" style={{ color: theme.color.gold }}>
              POWERED BY ZYNASTY
            </div>
          </div>
        </div>

        <nav className="flex-1 px-3 mt-2 space-y-1 overflow-y-auto">
          {NAV.map((item) => {
            const isActive = active === item.key;
            const Icon = item.icon;
            return (
              <button
                key={item.key}
                onClick={() => {
                  onNavigate(item.key);
                  onCloseMobile();
                }}
                className="w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-medium transition-colors"
                style={{
                  backgroundColor: isActive ? "rgba(255,255,255,0.08)" : "transparent",
                  color: isActive ? "#FFFFFF" : "rgba(255,255,255,0.62)",
                  borderLeft: isActive ? `3px solid ${theme.color.gold}` : "3px solid transparent",
                }}
              >
                <Icon size={18} strokeWidth={2} />
                {item.label}
              </button>
            );
          })}
        </nav>

        <div className="p-4">
          <button
            onClick={onQuickAdd}
            className="w-full flex items-center justify-center gap-2 rounded-xl py-2.5 text-sm font-semibold"
            style={{ backgroundColor: theme.color.gold, color: theme.color.navy }}
          >
            <Plus size={16} /> Quick Add
          </button>
        </div>
      </aside>
    </>
  );
}
