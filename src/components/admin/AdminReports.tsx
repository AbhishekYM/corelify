import React from "react";
import { Activity, BookOpen, DollarSign, Briefcase, Users, Calendar, Award } from "lucide-react";

export default function AdminReports() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <span className="text-xs font-bold text-slate-800">Reports & Analytics Engine</span>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { title: "Course Enrolment", val: "14,500", icon: BookOpen, col: "text-blue-600", bg: "bg-blue-50" },
          { title: "Revenue Reports", val: "$2.4M", icon: DollarSign, col: "text-emerald-600", bg: "bg-emerald-50" },
          { title: "Internship Apps", val: "3,210", icon: Briefcase, col: "text-indigo-600", bg: "bg-indigo-50" },
          { title: "Job Applications", val: "5,400", icon: Briefcase, col: "text-indigo-600", bg: "bg-indigo-50" },
          { title: "Workshop Users", val: "890", icon: Calendar, col: "text-purple-600", bg: "bg-purple-50" },
          { title: "Scholarship Apps", val: "420", icon: Award, col: "text-amber-600", bg: "bg-amber-50" },
          { title: "User Engagement", val: "78%", icon: Users, col: "text-rose-600", bg: "bg-rose-50" },
          { title: "Platform Usage", val: "1.2M", icon: Activity, col: "text-slate-600", bg: "bg-slate-100" }
        ].map((stat, i) => (
          <div key={i} className="p-4 bg-white border border-slate-200/80 rounded-2xl flex flex-col justify-between h-32 hover:shadow-md transition-shadow cursor-pointer">
            <div className={`w-8 h-8 rounded-xl ${stat.bg} ${stat.col} flex items-center justify-center`}>
              <stat.icon className="w-4 h-4" />
            </div>
            <div>
              <span className="text-xl font-bold text-slate-900 block">{stat.val}</span>
              <span className="text-[10px] text-slate-400 font-medium">{stat.title}</span>
            </div>
          </div>
        ))}
      </div>
      
      <div className="bg-white p-5 rounded-2xl border border-slate-200/80 text-xs flex justify-between items-center">
        <span className="font-bold text-slate-800">Export Raw Data (CSV/Excel)</span>
        <button className="px-4 py-2 bg-indigo-600 text-white font-bold rounded-xl shadow text-[10px]">Download Universal Report</button>
      </div>
    </div>
  );
}
