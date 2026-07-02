import React from "react";
import { LayoutDashboard, BookOpen, GraduationCap, Calendar, Users, Briefcase, FileText, Settings, Heart, HelpCircle, Bell, ChevronDown, Award } from "lucide-react";
import { UserProfile } from "../types";

interface SidebarProps {
  activeView: string;
  setActiveView: (view: string) => void;
  userProfile: UserProfile;
  notificationsCount: number;
  onNavigateToAdmin?: () => void;
}

export default function Sidebar({ activeView, setActiveView, userProfile, notificationsCount, onNavigateToAdmin }: SidebarProps) {
  const menuItems = [
    { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
    { id: "courses", label: "Learning Center", icon: BookOpen },
    { id: "mentorship", label: "Mentorship Hub", icon: Users },
    { id: "opportunities", label: "Opportunity Board", icon: Briefcase, badge: "Live" },
    { id: "portfolio", label: "Portfolio Builder", icon: Award },
    { id: "ai", label: "AI Career Assistant", icon: GraduationCap },
    { id: "blogs", label: "Ecosystem Blogs", icon: FileText },
    { id: "support", label: "Support Tickets", icon: HelpCircle },
    { id: "settings", label: "Workspace Settings", icon: Settings }
  ];

  return (
    <aside className="w-64 bg-white border-r border-slate-200/80 flex flex-col justify-between h-full py-6 select-none shrink-0 font-sans">
      <div className="space-y-6">
        {/* Workspace Switcher */}
        <div className="px-6">
          <div className="flex items-center justify-between p-2 bg-slate-50 border border-slate-200/60 rounded-xl cursor-pointer hover:bg-slate-100/80 transition-colors">
            <div className="flex items-center gap-2.5">
              <div className="w-7 h-7 bg-gradient-to-tr from-indigo-600 to-violet-600 rounded-lg flex items-center justify-center font-display font-bold text-xs text-white">
                L
              </div>
              <div className="text-left">
                <span className="text-xs font-semibold text-slate-800 block">Lumina Space</span>
                <span className="text-[9px] text-slate-400 font-mono block">Personal Workspace</span>
              </div>
            </div>
            <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
          </div>
        </div>

        {/* Navigation Groups */}
        <div className="space-y-2">
          <span className="px-6 text-[9px] font-mono text-slate-400 uppercase block tracking-wider">WORKSPACE NAVIGATION</span>
          <nav className="space-y-0.5 px-3">
            {menuItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeView === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveView(item.id)}
                  className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-xs font-medium transition-all cursor-pointer ${
                    isActive
                      ? "bg-indigo-50 text-indigo-700 font-semibold border-l-2 border-indigo-600"
                      : "text-slate-600 hover:text-slate-900 hover:bg-slate-50"
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <Icon className={`w-4 h-4 ${isActive ? "text-indigo-600" : "text-slate-400 group-hover:text-slate-600"}`} />
                    <span>{item.label}</span>
                  </div>

                  {item.badge ? (
                    <span className="px-1.5 py-0.5 bg-indigo-50 text-indigo-700 border border-indigo-100 rounded text-[9px] font-mono leading-none">
                      {item.badge}
                    </span>
                  ) : item.id === "opportunities" && notificationsCount > 0 ? (
                    <span className="w-2 h-2 rounded-full bg-indigo-600" />
                  ) : null}
                </button>
              );
            })}
          </nav>
        </div>
      </div>

      {onNavigateToAdmin && (
        <div className="px-4 mb-3">
          <button
            onClick={onNavigateToAdmin}
            className="w-full py-2 bg-slate-900 hover:bg-slate-800 text-indigo-400 hover:text-white text-[11px] font-semibold rounded-xl border border-slate-800 transition-colors cursor-pointer flex items-center justify-center gap-2 shadow-inner"
          >
            <Settings className="w-3.5 h-3.5 text-indigo-500" />
            <span>Admin Control Panel</span>
          </button>
        </div>
      )}

      {/* User Space / profile footer */}
      <div className="px-4">
        <div className="p-3 bg-slate-50 border border-slate-200/60 rounded-xl flex items-center gap-3">
          <img
            src={userProfile.avatar}
            alt="Profile Avatar"
            className="w-9 h-9 rounded-lg object-cover border border-slate-200 shrink-0"
          />
          <div className="min-w-0 flex-1">
            <span className="text-xs font-semibold text-slate-800 block truncate">{userProfile.fullName}</span>
            <span className="text-[10px] text-slate-400 block truncate leading-none mt-0.5 font-mono">{userProfile.email}</span>
          </div>
        </div>
      </div>
    </aside>
  );
}
