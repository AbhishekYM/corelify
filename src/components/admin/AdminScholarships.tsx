import React, { useState } from "react";
import { Award, Plus, Trash2, Tag, Briefcase, Activity } from "lucide-react";
import { Scholarship } from "../../types";

interface AdminScholarshipsProps {
  scholarships: Scholarship[];
  setScholarships: React.Dispatch<React.SetStateAction<Scholarship[]>>;
  onAddNotification: (title: string, description: string, type: "message" | "alert" | "recommendation" | "application") => void;
}

export default function AdminScholarships({ scholarships, setScholarships, onAddNotification }: AdminScholarshipsProps) {
  const [subTab, setSubTab] = useState<"manage" | "categories" | "applications" | "analytics">("manage");

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <span className="text-xs font-bold text-slate-800">Scholarship Management</span>
        <button className="px-3 py-1.5 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold rounded-xl flex items-center gap-1.5 shadow">
          <Plus className="w-3.5 h-3.5" /><span>Post Scholarship</span>
        </button>
      </div>

      <div className="flex gap-2 border-b border-slate-200 pb-2 overflow-x-auto">
        <button onClick={() => setSubTab("manage")} className={`px-3 py-1.5 rounded-lg text-[10px] font-bold ${subTab === "manage" ? "bg-slate-200 text-slate-800" : "text-slate-500 hover:bg-slate-100"}`}>Manage Scholarships</button>
        <button onClick={() => setSubTab("categories")} className={`px-3 py-1.5 rounded-lg text-[10px] font-bold flex items-center gap-1 ${subTab === "categories" ? "bg-slate-200 text-slate-800" : "text-slate-500 hover:bg-slate-100"}`}><Tag className="w-3 h-3"/> Categories</button>
        <button onClick={() => setSubTab("applications")} className={`px-3 py-1.5 rounded-lg text-[10px] font-bold flex items-center gap-1 ${subTab === "applications" ? "bg-slate-200 text-slate-800" : "text-slate-500 hover:bg-slate-100"}`}><Briefcase className="w-3 h-3"/> Applications</button>
        <button onClick={() => setSubTab("analytics")} className={`px-3 py-1.5 rounded-lg text-[10px] font-bold flex items-center gap-1 ${subTab === "analytics" ? "bg-slate-200 text-slate-800" : "text-slate-500 hover:bg-slate-100"}`}><Activity className="w-3 h-3"/> Analytics</button>
      </div>

      {subTab === "manage" && (
        <div className="bg-white rounded-2xl border border-slate-200/80 overflow-hidden text-xs">
          <table className="w-full text-left">
            <thead className="bg-slate-50 text-slate-400 font-semibold border-b border-slate-200">
              <tr><th className="p-4">Title & Provider</th><th className="p-4">Amount</th><th className="p-4">Deadline</th><th className="p-4 text-right">Actions</th></tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {scholarships.map(s => (
                <tr key={s.id}>
                  <td className="p-4"><span className="font-bold text-slate-900 block">{s.title}</span><span className="text-[10px] text-slate-400">{s.provider}</span></td>
                  <td className="p-4 font-bold text-emerald-600">{s.amount}</td>
                  <td className="p-4 font-mono text-[10px] text-rose-500">{s.deadline}</td>
                  <td className="p-4 text-right">
                    <button onClick={() => { setScholarships(scholarships.filter(x => x.id !== s.id)); onAddNotification("Deleted", "Scholarship removed", "alert"); }} className="p-1 text-rose-500 hover:bg-rose-50 rounded"><Trash2 className="w-4 h-4" /></button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {subTab === "categories" && (
        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 text-xs">
          <h3 className="font-bold mb-3 text-slate-800">Scholarship Categories</h3>
          <div className="flex flex-wrap gap-2">
            {["Merit-based", "Need-based", "Diversity", "Women in Tech"].map((cat) => (
              <span key={cat} className="px-3 py-1.5 bg-indigo-50 text-indigo-700 rounded-lg flex items-center gap-2 border border-indigo-100">{cat}</span>
            ))}
          </div>
        </div>
      )}

      {subTab === "applications" && (
        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 text-xs">
          <h3 className="font-bold mb-3 text-slate-800">Application Monitoring</h3>
          <table className="w-full text-left mt-2">
            <thead className="bg-slate-50 border-y border-slate-200 text-slate-400">
              <tr><th className="p-3">Candidate</th><th className="p-3">Applying For</th><th className="p-3">Status</th></tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              <tr><td className="p-3 font-bold">Michael Ross</td><td className="p-3">Women in Tech</td><td className="p-3"><span className="text-amber-600 bg-amber-50 px-2 py-1 rounded-full text-[10px]">Under Review</span></td></tr>
            </tbody>
          </table>
        </div>
      )}

      {subTab === "analytics" && (
        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 text-xs">
          <h3 className="font-bold mb-3 text-slate-800">Scholarship Analytics</h3>
          <div className="grid grid-cols-2 gap-4">
            <div className="p-4 bg-indigo-50 text-indigo-800 rounded-xl">
              <span className="block text-[10px] uppercase font-mono">Total Fund Value</span>
              <span className="text-xl font-bold">$125,000</span>
            </div>
            <div className="p-4 bg-emerald-50 text-emerald-800 rounded-xl">
              <span className="block text-[10px] uppercase font-mono">Awards Disbursed</span>
              <span className="text-xl font-bold">14</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
