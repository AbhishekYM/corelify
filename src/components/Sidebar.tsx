import React from "react";
import { LayoutDashboard, BookOpen, GraduationCap, Calendar, Users, Briefcase, FileText, Settings, Heart, HelpCircle, Bell, ChevronDown, Award, LogOut } from "lucide-react";
import { UserProfile } from "../types";

interface SidebarProps {
  activeView: string;
  setActiveView: (view: string) => void;
  userProfile: UserProfile;
  notificationsCount: number;
  onNavigateToAdmin?: () => void;
  onLogout?: () => void;
}

export default function Sidebar({ activeView, setActiveView, userProfile, notificationsCount, onNavigateToAdmin, onLogout }: SidebarProps) {
  const menuItems = [
    { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
    { id: "courses", label: "Learning Center", icon: BookOpen },
    { id: "mentorship", label: "Mentorship Hub", icon: Users },
    { id: "workshops", label: "Live Workshops", icon: Calendar },
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
              <img src="https://corelify.io/store/1/CORELIFY%20LOGO.png" alt="Corelify Logo" className="h-7 w-auto" />
              <div className="text-left">
                <span className="text-xs font-semibold text-slate-800 block">Workspace</span>
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
                  className={`w-full flex items-center justify-between px-4 py-2.5 rounded-xl text-xs font-medium transition-all duration-200 cursor-pointer relative group ${
                    isActive
                      ? "bg-indigo-50/70 text-indigo-750 font-semibold shadow-[inset_0_1px_2px_rgba(99,102,241,0.05)]"
                      : "text-slate-500 hover:text-slate-800 hover:bg-slate-50/60"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    {/* Active left indicator pill */}
                    {isActive && (
                      <div className="absolute left-0 top-2 bottom-2 w-1.5 bg-[#0B0F59] rounded-r-full" />
                    )}
                    <Icon className={`w-4 h-4 transition-colors duration-200 ${isActive ? "text-[#0B0F59] stroke-[2.25]" : "text-slate-400 group-hover:text-slate-650"}`} />
                    <span>{item.label}</span>
                  </div>

                  {item.badge ? (
                    <span className="px-2 py-0.5 bg-emerald-50 text-emerald-700 border border-emerald-100 rounded-md text-[9px] font-bold tracking-wider uppercase scale-90">
                      {item.badge}
                    </span>
                  ) : item.id === "opportunities" && notificationsCount > 0 ? (
                    <span className="w-2.5 h-2.5 rounded-full bg-rose-500 animate-pulse" />
                  ) : null}
                </button>
              );
            })}
          </nav>
        </div>
      </div>



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
          {onLogout && (
            <button
              onClick={onLogout}
              className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors ml-auto"
              title="Logout"
            >
              <LogOut className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>
    </aside>
  );
}
