import { NavLink } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import {
  LayoutDashboard,
  GraduationCap,
  BarChart3,
  Settings,
  Trophy,
} from "lucide-react";

const navItems = [
  {
    path: "/",
    label: "Dashboard",
    icon: LayoutDashboard,
    description: "Overview & Top Students",
  },
  {
    path: "/score",
    label: "Score Lookup",
    icon: GraduationCap,
    description: "Individual Results",
  },
  {
    path: "/dashboard",
    label: "Analytics",
    icon: BarChart3,
    description: "Score Distribution",
  },
  {
    path: "/setting",
    label: "Settings",
    icon: Settings,
    description: "App Configuration",
  },
];

export default function Sidebar() {
  return (
    <aside className="w-72 lg:w-72 h-full bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 text-white flex flex-col shadow-2xl border-r border-slate-700">
      {/* Header */}
      <div className="p-4 lg:p-6 border-b border-slate-700">
        <div className="flex items-center gap-3 mb-2">
          <div className="p-2 bg-yellow-500 rounded-lg shadow-lg">
            <Trophy className="h-5 w-5 lg:h-6 lg:w-6 text-slate-900" />
          </div>
          <div>
            <h1 className="text-lg lg:text-xl font-bold">G-Score</h1>
            <p className="text-xs text-slate-400">Student Portal</p>
          </div>
        </div>
        <Badge
          variant="secondary"
          className="text-xs bg-yellow-500/20 text-yellow-300 border border-yellow-500/30"
        >
          v1.0.0
        </Badge>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-3 lg:p-4 space-y-2 overflow-y-auto">
        <div className="mb-4">
          <h2 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3 px-3">
            Navigation
          </h2>
        </div>

        {navItems.map((item) => {
          const Icon = item.icon;
          return (
            <NavLink key={item.path} to={item.path}>
              {({ isActive }) => (
                <Button
                  variant="ghost"
                  className={cn(
                    "w-full justify-start h-auto p-2 lg:p-3 text-left hover:bg-slate-700/50 transition-all duration-200 group relative",
                    isActive &&
                      "bg-yellow-500 border-l-4 border-yellow-600 text-slate-900 hover:bg-yellow-400 shadow-lg"
                  )}
                >
                  <div className="flex items-center gap-3 w-full">
                    <Icon
                      className={cn(
                        "h-4 w-4 lg:h-5 lg:w-5 transition-colors flex-shrink-0",
                        isActive
                          ? "text-slate-800"
                          : "text-slate-400 group-hover:text-slate-200"
                      )}
                    />
                    <div className="flex-1 min-w-0">
                      <div
                        className={cn(
                          "font-medium text-sm truncate",
                          isActive
                            ? "text-slate-900 font-semibold"
                            : "text-slate-200"
                        )}
                      >
                        {item.label}
                      </div>
                      <div
                        className={cn(
                          "text-xs truncate hidden lg:block",
                          isActive ? "text-slate-700" : "text-slate-400"
                        )}
                      >
                        {item.description}
                      </div>
                    </div>
                    {isActive && (
                      <div className="w-2 h-2 bg-slate-800 rounded-full animate-pulse shadow-md flex-shrink-0" />
                    )}
                  </div>
                </Button>
              )}
            </NavLink>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="p-3 lg:p-4 border-t border-slate-700">
        <div className="text-xs text-slate-500 text-center">
          © 2025 G-Score System
        </div>
      </div>
    </aside>
  );
}
