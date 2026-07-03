import React from "react";
import { Users, DollarSign, BookOpen, Briefcase } from "lucide-react";
import { Course, Opportunity } from "../../types";
import { AdminUser } from "./AdminUsers";

interface AdminDashboardProps {
  adminUsers: AdminUser[];
  courses: Course[];
  opportunities: Opportunity[];
}

export default function AdminDashboard({ adminUsers, courses, opportunities }: AdminDashboardProps) {
  return (
    <div className="space-y-6">
      {/* Main Telemetry Spark Card Block */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-xs font-semibold">Platform Registrations</span>
            <Users className="w-4 h-4 text-slate-400" />
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-xl font-bold text-slate-900">{adminUsers.length * 12}</span>
            <span className="text-[10px] text-green-600 font-bold flex items-center font-mono">+12.4%</span>
          </div>
          <p className="text-[9px] text-slate-400 mt-1">Simulating cumulative user growth analytics</p>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-xs font-semibold">Active Revenue Stream</span>
            <DollarSign className="w-4 h-4 text-emerald-500" />
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-xl font-bold text-slate-900">$18,450</span>
            <span className="text-[10px] text-green-600 font-bold flex items-center font-mono">+8.1%</span>
          </div>
          <p className="text-[9px] text-slate-400 mt-1">Summing premium cohorts & workshop sales</p>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-xs font-semibold">Enrolment Cohorts</span>
            <BookOpen className="w-4 h-4 text-slate-400" />
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-xl font-bold text-slate-900">{courses.length * 48}</span>
            <span className="text-[10px] text-green-600 font-bold flex items-center font-mono">+15%</span>
          </div>
          <p className="text-[9px] text-slate-400 mt-1">Live database course participation index</p>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-xs font-semibold">Active Applications</span>
            <Briefcase className="w-4 h-4 text-slate-400" />
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-xl font-bold text-slate-900">{opportunities.length * 14}</span>
            <span className="text-[10px] text-indigo-600 font-bold flex items-center font-mono">Matched</span>
          </div>
          <p className="text-[9px] text-slate-400 mt-1">Career index pipelines & telemetry tracking</p>
        </div>
      </div>

      {/* Graphical Sparklines Grid (Custom SVG Analytics) */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* User Growth & Revenue Charts */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm">
          <span className="text-xs font-bold text-slate-800 block mb-4">User Growth & Revenue Index</span>
          <div className="h-44 flex items-end justify-between gap-1 border-b border-slate-100 pb-2 relative">
            <div className="absolute inset-0 flex flex-col justify-between pointer-events-none">
              <div className="border-b border-dashed border-slate-100 w-full h-0"></div>
              <div className="border-b border-dashed border-slate-100 w-full h-0"></div>
              <div className="border-b border-dashed border-slate-100 w-full h-0"></div>
            </div>
            {[20, 35, 45, 30, 60, 75, 90, 85, 110, 130].map((h, i) => (
              <div key={i} className="flex-1 flex flex-col items-center gap-1.5 z-10">
                <div 
                  style={{ height: `${h}px` }} 
                  className="w-full rounded-t-md bg-indigo-600/90 hover:bg-indigo-600 transition-all cursor-pointer relative group"
                >
                  <span className="absolute -top-7 left-1/2 -translate-x-1/2 bg-slate-950 text-white text-[8px] font-mono px-1 rounded opacity-0 group-hover:opacity-100 transition-opacity">
                    {h * 4}k
                  </span>
                </div>
                <span className="text-[8px] text-slate-400 font-mono">M{i+1}</span>
              </div>
            ))}
          </div>
          <div className="flex items-center gap-4 mt-3">
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-indigo-600"></span>
              <span className="text-[10px] text-slate-500 font-medium">Registered Active Accounts</span>
            </div>
          </div>
        </div>

        {/* Applications & Mentor Performance Index */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm">
          <span className="text-xs font-bold text-slate-800 block mb-4">Ecosystem Application & Performance Metrics</span>
          <div className="h-44 flex items-end justify-between gap-2 border-b border-slate-100 pb-2 relative">
            <div className="absolute inset-0 flex flex-col justify-between pointer-events-none">
              <div className="border-b border-slate-100 w-full h-0"></div>
              <div className="border-b border-slate-100 w-full h-0"></div>
            </div>
            <svg className="absolute inset-0 w-full h-full" viewBox="0 0 400 150">
              <path d="M0,120 Q50,70 100,90 T200,40 T300,50 T400,20" fill="none" stroke="#6366f1" strokeWidth="2.5" />
              <path d="M0,140 Q50,90 100,110 T200,70 T300,90 T400,50" fill="none" stroke="#10b981" strokeWidth="1.5" strokeDasharray="4" />
            </svg>
            <div className="w-full flex justify-between text-[8px] text-slate-400 font-mono mt-auto z-10 pt-2 bg-white/90">
              <span>Mon</span><span>Tue</span><span>Wed</span><span>Thu</span><span>Fri</span><span>Sat</span><span>Sun</span>
            </div>
          </div>
          <div className="flex items-center gap-4 mt-3">
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-indigo-600"></span>
              <span className="text-[10px] text-slate-500 font-medium">Career Submissions</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500"></span>
              <span className="text-[10px] text-slate-500 font-medium">Mentor Booking Rate</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
