import React from "react";
import { Search, Bell, ChevronDown, Calendar, ArrowLeft, Menu } from "lucide-react";
import { theme } from "../../theme";

interface TopbarProps {
  title: string;
  subtitle?: string;
  onMenu: () => void;
  showBack?: boolean;
  onBack?: () => void;
}

export function Topbar({ title, subtitle, onMenu, showBack, onBack }: TopbarProps) {
  return (
    <header className="sticky top-0 z-20 bg-white border-b" style={{ borderColor: theme.color.border }}>
      <div className="flex items-center justify-between gap-4 px-4 sm:px-7 py-4">
        <div className="flex items-center gap-3 min-w-0">
          <button onClick={onMenu} className="lg:hidden p-2 -ml-2 rounded-lg" style={{ color: theme.color.text }} aria-label="Open menu">
            <Menu size={20} />
          </button>
          {showBack && (
            <button
              onClick={onBack}
              className="p-2 rounded-lg border hidden sm:flex items-center justify-center"
              style={{ borderColor: theme.color.border }}
              aria-label="Go back"
            >
              <ArrowLeft size={16} />
            </button>
          )}
          <div className="min-w-0">
            <h1 className="text-xl sm:text-2xl font-bold truncate" style={{ color: theme.color.text }}>
              {title}
            </h1>
            {subtitle && (
              <p className="text-sm mt-0.5 truncate" style={{ color: theme.color.textMuted }}>
                {subtitle}
              </p>
            )}
          </div>
        </div>

        <div className="hidden md:flex items-center flex-1 max-w-sm mx-4">
          <div className="relative w-full">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2" style={{ color: theme.color.textFaint }} />
            <input
              placeholder="Search projects, invoices, vendors…"
              className="w-full pl-9 pr-3 py-2.5 rounded-xl text-sm outline-none border"
              style={{ borderColor: theme.color.border, backgroundColor: theme.color.bg, color: theme.color.text }}
            />
          </div>
        </div>

        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          <button
            className="hidden sm:flex items-center gap-1.5 px-3 py-2 rounded-xl border text-sm font-medium"
            style={{ borderColor: theme.color.border, color: theme.color.text }}
          >
            <Calendar size={15} style={{ color: theme.color.emerald }} />
            01 May – 31 May
            <ChevronDown size={14} style={{ color: theme.color.textFaint }} />
          </button>
          <button className="relative p-2.5 rounded-xl border" style={{ borderColor: theme.color.border }} aria-label="Notifications">
            <Bell size={17} style={{ color: theme.color.text }} />
            <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 rounded-full" style={{ backgroundColor: theme.color.error }} />
          </button>
          <div className="flex items-center gap-2 pl-1">
            <div
              className="w-9 h-9 rounded-full flex items-center justify-center text-sm font-semibold text-white"
              style={{ backgroundColor: theme.color.emerald }}
            >
              SY
            </div>
            <div className="hidden sm:block leading-tight">
              <div className="text-sm font-semibold" style={{ color: theme.color.text }}>Syed Yasir</div>
              <div className="text-xs" style={{ color: theme.color.textMuted }}>Admin</div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
