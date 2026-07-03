import React, { useState } from "react";
import { MessageSquare, Plus, Trash2, ArrowUpRight, Activity, Tag, Users } from "lucide-react";
import { SupportTicket } from "../../types";

interface AdminTicketsProps {
  tickets: SupportTicket[];
  setTickets: React.Dispatch<React.SetStateAction<SupportTicket[]>>;
  onAddNotification: (title: string, description: string, type: "message" | "alert" | "recommendation" | "application") => void;
}

export default function AdminTickets({ tickets, setTickets, onAddNotification }: AdminTicketsProps) {
  const [subTab, setSubTab] = useState<"resolution" | "assignment" | "escalation" | "analytics">("resolution");

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <span className="text-xs font-bold text-slate-800">Support Ticket Management</span>
        <button className="px-3 py-1.5 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold rounded-xl flex items-center gap-1.5 shadow">
          <Plus className="w-3.5 h-3.5" /><span>New Internal Ticket</span>
        </button>
      </div>

      <div className="flex gap-2 border-b border-slate-200 pb-2 overflow-x-auto">
        <button onClick={() => setSubTab("resolution")} className={`px-3 py-1.5 rounded-lg text-[10px] font-bold flex items-center gap-1 ${subTab === "resolution" ? "bg-slate-200 text-slate-800" : "text-slate-500 hover:bg-slate-100"}`}><MessageSquare className="w-3 h-3"/> Resolution</button>
        <button onClick={() => setSubTab("assignment")} className={`px-3 py-1.5 rounded-lg text-[10px] font-bold flex items-center gap-1 ${subTab === "assignment" ? "bg-slate-200 text-slate-800" : "text-slate-500 hover:bg-slate-100"}`}><Users className="w-3 h-3"/> Assignment</button>
        <button onClick={() => setSubTab("escalation")} className={`px-3 py-1.5 rounded-lg text-[10px] font-bold flex items-center gap-1 ${subTab === "escalation" ? "bg-slate-200 text-slate-800" : "text-slate-500 hover:bg-slate-100"}`}><ArrowUpRight className="w-3 h-3"/> Escalations</button>
        <button onClick={() => setSubTab("analytics")} className={`px-3 py-1.5 rounded-lg text-[10px] font-bold flex items-center gap-1 ${subTab === "analytics" ? "bg-slate-200 text-slate-800" : "text-slate-500 hover:bg-slate-100"}`}><Activity className="w-3 h-3"/> Analytics</button>
      </div>

      {subTab === "resolution" && (
        <div className="bg-white rounded-2xl border border-slate-200/80 overflow-hidden text-xs">
          <table className="w-full text-left">
            <thead className="bg-slate-50 text-slate-400 font-semibold border-b border-slate-200">
              <tr><th className="p-4">Ticket</th><th className="p-4">Status</th><th className="p-4">Priority</th><th className="p-4 text-right">Actions</th></tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {tickets.map(t => (
                <tr key={t.id}>
                  <td className="p-4"><span className="font-bold text-slate-900 block">{t.subject}</span><span className="text-[10px] text-slate-400">ID: {t.id} • {t.createdAt}</span></td>
                  <td className="p-4">
                    <select
                      value={t.status}
                      onChange={(e) => {
                        setTickets(tickets.map(x => x.id === t.id ? { ...x, status: e.target.value as any } : x));
                        onAddNotification("Status Updated", `Ticket ${t.id} marked as ${e.target.value}`, "alert");
                      }}
                      className="text-[10px] p-1 border rounded"
                    >
                      <option value="Open">Open</option>
                      <option value="In Progress">In Progress</option>
                      <option value="Resolved">Resolved</option>
                      <option value="Closed">Closed</option>
                    </select>
                  </td>
                  <td className="p-4"><span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${t.priority === 'High' ? 'bg-rose-100 text-rose-700' : 'bg-amber-100 text-amber-700'}`}>{t.priority}</span></td>
                  <td className="p-4 text-right">
                    <button onClick={() => { setTickets(tickets.filter(x => x.id !== t.id)); onAddNotification("Deleted", "Ticket removed", "alert"); }} className="p-1 text-rose-500 hover:bg-rose-50 rounded"><Trash2 className="w-4 h-4" /></button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {subTab === "assignment" && (
        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 text-xs">
          <h3 className="font-bold mb-3 text-slate-800">Agent Assignment</h3>
          <p className="text-slate-500 mb-4">Assign open tickets to support staff members.</p>
          <div className="space-y-3">
            {tickets.filter(t => t.status === "Open").map(t => (
              <div key={t.id} className="p-4 border border-slate-200 rounded-xl flex justify-between items-center bg-slate-50">
                <div><span className="font-bold block">{t.subject}</span><span className="text-[10px] text-slate-400">Unassigned</span></div>
                <select className="p-2 border rounded-xl bg-white text-[10px]">
                  <option value="">Assign Agent...</option>
                  <option value="agent1">Support Staff A</option>
                  <option value="agent2">Support Staff B</option>
                </select>
              </div>
            ))}
          </div>
        </div>
      )}

      {subTab === "escalation" && (
        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 text-xs">
          <h3 className="font-bold mb-3 text-slate-800">Ticket Escalations</h3>
          <p className="text-slate-500 mb-4">High priority tickets that require management intervention.</p>
          <div className="space-y-3">
            {tickets.filter(t => t.priority === "High").map(t => (
              <div key={t.id} className="p-4 border border-rose-200 bg-rose-50 rounded-xl">
                <div className="flex justify-between items-start mb-2">
                  <span className="font-bold text-slate-800 text-sm block">{t.subject}</span>
                  <span className="text-[10px] text-slate-400 bg-white px-2 py-0.5 rounded border border-slate-200">{t.createdAt}</span>
                </div>
                <button onClick={() => onAddNotification("Escalated", "Ticket transferred to engineering tier 2", "recommendation")} className="px-3 py-1.5 bg-rose-600 text-white rounded-lg">Escalate to L2</button>
              </div>
            ))}
          </div>
        </div>
      )}

      {subTab === "analytics" && (
        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 text-xs">
          <h3 className="font-bold mb-3 text-slate-800">Support Analytics</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="p-4 bg-indigo-50 text-indigo-800 rounded-xl">
              <span className="block text-[10px] uppercase font-mono">Open Tickets</span>
              <span className="text-xl font-bold">{tickets.filter(t => t.status === "Open").length}</span>
            </div>
            <div className="p-4 bg-emerald-50 text-emerald-800 rounded-xl">
              <span className="block text-[10px] uppercase font-mono">Resolved Today</span>
              <span className="text-xl font-bold">{tickets.filter(t => t.status === "Resolved").length}</span>
            </div>
            <div className="p-4 bg-amber-50 text-amber-800 rounded-xl">
              <span className="block text-[10px] uppercase font-mono">Avg Resolution Time</span>
              <span className="text-xl font-bold">14h 20m</span>
            </div>
            <div className="p-4 bg-rose-50 text-rose-800 rounded-xl">
              <span className="block text-[10px] uppercase font-mono">Escalation Rate</span>
              <span className="text-xl font-bold">8.4%</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
