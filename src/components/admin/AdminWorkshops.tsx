import React, { useState } from "react";
import { Calendar, Plus, Trash2, Users, Activity, Tag } from "lucide-react";
import { Workshop } from "../../types";

interface AdminWorkshopsProps {
  workshops: Workshop[];
  setWorkshops: React.Dispatch<React.SetStateAction<Workshop[]>>;
  onAddNotification: (title: string, description: string, type: "message" | "alert" | "recommendation" | "application") => void;
}

export default function AdminWorkshops({ workshops, setWorkshops, onAddNotification }: AdminWorkshopsProps) {
  const [subTab, setSubTab] = useState<"manage" | "categories" | "organizers" | "registrations" | "analytics">("manage");

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <span className="text-xs font-bold text-slate-800">Workshop Management</span>
        <button className="px-3 py-1.5 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold rounded-xl flex items-center gap-1.5 shadow">
          <Plus className="w-3.5 h-3.5" /><span>Create Workshop</span>
        </button>
      </div>

      <div className="flex gap-2 border-b border-slate-200 pb-2 overflow-x-auto">
        <button onClick={() => setSubTab("manage")} className={`px-3 py-1.5 rounded-lg text-[10px] font-bold ${subTab === "manage" ? "bg-slate-200 text-slate-800" : "text-slate-500 hover:bg-slate-100"}`}>Manage Workshops</button>
        <button onClick={() => setSubTab("categories")} className={`px-3 py-1.5 rounded-lg text-[10px] font-bold flex items-center gap-1 ${subTab === "categories" ? "bg-slate-200 text-slate-800" : "text-slate-500 hover:bg-slate-100"}`}><Tag className="w-3 h-3"/> Categories</button>
        <button onClick={() => setSubTab("organizers")} className={`px-3 py-1.5 rounded-lg text-[10px] font-bold flex items-center gap-1 ${subTab === "organizers" ? "bg-slate-200 text-slate-800" : "text-slate-500 hover:bg-slate-100"}`}><Users className="w-3 h-3"/> Organizers</button>
        <button onClick={() => setSubTab("registrations")} className={`px-3 py-1.5 rounded-lg text-[10px] font-bold flex items-center gap-1 ${subTab === "registrations" ? "bg-slate-200 text-slate-800" : "text-slate-500 hover:bg-slate-100"}`}><Users className="w-3 h-3"/> Registrations</button>
        <button onClick={() => setSubTab("analytics")} className={`px-3 py-1.5 rounded-lg text-[10px] font-bold flex items-center gap-1 ${subTab === "analytics" ? "bg-slate-200 text-slate-800" : "text-slate-500 hover:bg-slate-100"}`}><Activity className="w-3 h-3"/> Analytics</button>
      </div>

      {subTab === "manage" && (
        <div className="bg-white rounded-2xl border border-slate-200/80 overflow-hidden text-xs">
          <table className="w-full text-left">
            <thead className="bg-slate-50 text-slate-400 font-semibold border-b border-slate-200">
              <tr><th className="p-4">Workshop</th><th className="p-4">Schedule</th><th className="p-4">Price</th><th className="p-4 text-right">Actions</th></tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {workshops.map(w => (
                <tr key={w.id}>
                  <td className="p-4"><span className="font-bold text-slate-900 block">{w.title}</span><span className="text-[10px] text-slate-400">By {w.host} ({w.company})</span></td>
                  <td className="p-4"><div className="text-[10px]"><span className="block font-bold">{w.date}</span><span className="text-slate-500">{w.time} ({w.duration})</span></div></td>
                  <td className="p-4 font-bold text-emerald-600">${w.price}</td>
                  <td className="p-4 text-right">
                    <button onClick={() => { setWorkshops(workshops.filter(x => x.id !== w.id)); onAddNotification("Deleted", "Workshop removed", "alert"); }} className="p-1 text-rose-500 hover:bg-rose-50 rounded"><Trash2 className="w-4 h-4" /></button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {subTab === "categories" && (
        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 text-xs">
          <h3 className="font-bold mb-3 text-slate-800">Workshop Categories</h3>
          <div className="flex flex-wrap gap-2">
            {["Design", "Coding", "Soft Skills", "Product Management"].map((cat) => (
              <span key={cat} className="px-3 py-1.5 bg-indigo-50 text-indigo-700 rounded-lg flex items-center gap-2 border border-indigo-100">{cat}</span>
            ))}
          </div>
        </div>
      )}

      {subTab === "organizers" && (
        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 text-xs">
          <h3 className="font-bold mb-3 text-slate-800">Organizer Management</h3>
          <ul className="space-y-2">
            {Array.from(new Set(workshops.map(w => w.host))).map((host, i) => (
              <li key={i} className="p-3 bg-slate-50 border rounded-xl flex justify-between items-center">
                <span className="font-bold">{host}</span>
                <span className="text-emerald-600 font-semibold bg-emerald-50 px-2 py-1 rounded-lg">Approved Organizer</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {subTab === "registrations" && (
        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 text-xs">
          <h3 className="font-bold mb-3 text-slate-800">Registration Monitoring</h3>
          <table className="w-full text-left mt-2">
            <thead className="bg-slate-50 border-y border-slate-200 text-slate-400">
              <tr><th className="p-3">Workshop</th><th className="p-3">Registered Users</th><th className="p-3">Capacity</th></tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {workshops.map(w => (
                <tr key={w.id}>
                  <td className="p-3 font-bold">{w.title}</td>
                  <td className="p-3">{w.registrants}</td>
                  <td className="p-3 text-slate-400">/ 100</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {subTab === "analytics" && (
        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 text-xs">
          <h3 className="font-bold mb-3 text-slate-800">Workshop Revenue & Analytics</h3>
          <div className="grid grid-cols-2 gap-4">
            <div className="p-4 bg-indigo-50 text-indigo-800 rounded-xl">
              <span className="block text-[10px] uppercase font-mono">Total Ticket Sales</span>
              <span className="text-xl font-bold">${workshops.reduce((acc, w) => acc + (w.price * w.registrants), 0)}</span>
            </div>
            <div className="p-4 bg-emerald-50 text-emerald-800 rounded-xl">
              <span className="block text-[10px] uppercase font-mono">Average Attendance</span>
              <span className="text-xl font-bold">87%</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
