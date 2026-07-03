import React, { useState } from "react";
import { Briefcase, Plus, Trash2, ShieldCheck, Activity, CheckCircle, Ban, Building2 } from "lucide-react";
import { Opportunity } from "../../types";

interface AdminOpportunitiesProps {
  opportunities: Opportunity[];
  setOpportunities: React.Dispatch<React.SetStateAction<Opportunity[]>>;
  viewType: "Internship" | "Job";
  onAddNotification: (title: string, description: string, type: "message" | "alert" | "recommendation" | "application") => void;
}

export default function AdminOpportunities({ opportunities, setOpportunities, viewType, onAddNotification }: AdminOpportunitiesProps) {
  const [subTab, setSubTab] = useState<"manage" | "companies" | "approvals" | "applications" | "analytics">("manage");
  const filteredOpps = opportunities.filter(o => o.type === viewType);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <span className="text-xs font-bold text-slate-800">{viewType} Management</span>
        <button className="px-3 py-1.5 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold rounded-xl flex items-center gap-1.5 shadow">
          <Plus className="w-3.5 h-3.5" /><span>Post {viewType}</span>
        </button>
      </div>

      <div className="flex gap-2 border-b border-slate-200 pb-2 overflow-x-auto">
        <button onClick={() => setSubTab("manage")} className={`px-3 py-1.5 rounded-lg text-[10px] font-bold ${subTab === "manage" ? "bg-slate-200 text-slate-800" : "text-slate-500 hover:bg-slate-100"}`}>Manage Postings</button>
        <button onClick={() => setSubTab("companies")} className={`px-3 py-1.5 rounded-lg text-[10px] font-bold flex items-center gap-1 ${subTab === "companies" ? "bg-slate-200 text-slate-800" : "text-slate-500 hover:bg-slate-100"}`}><Building2 className="w-3 h-3"/> Partners</button>
        <button onClick={() => setSubTab("approvals")} className={`px-3 py-1.5 rounded-lg text-[10px] font-bold flex items-center gap-1 ${subTab === "approvals" ? "bg-slate-200 text-slate-800" : "text-slate-500 hover:bg-slate-100"}`}><ShieldCheck className="w-3 h-3"/> Approvals</button>
        <button onClick={() => setSubTab("applications")} className={`px-3 py-1.5 rounded-lg text-[10px] font-bold flex items-center gap-1 ${subTab === "applications" ? "bg-slate-200 text-slate-800" : "text-slate-500 hover:bg-slate-100"}`}><Briefcase className="w-3 h-3"/> Applications</button>
        <button onClick={() => setSubTab("analytics")} className={`px-3 py-1.5 rounded-lg text-[10px] font-bold flex items-center gap-1 ${subTab === "analytics" ? "bg-slate-200 text-slate-800" : "text-slate-500 hover:bg-slate-100"}`}><Activity className="w-3 h-3"/> Analytics</button>
      </div>

      {subTab === "manage" && (
        <div className="bg-white rounded-2xl border border-slate-200/80 overflow-hidden text-xs">
          <table className="w-full text-left">
            <thead className="bg-slate-50 text-slate-400 font-semibold border-b border-slate-200">
              <tr><th className="p-4">Title & Company</th><th className="p-4">Location</th><th className="p-4">Compensation</th><th className="p-4 text-right">Actions</th></tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredOpps.map(o => (
                <tr key={o.id}>
                  <td className="p-4"><span className="font-bold text-slate-900 block">{o.title}</span><span className="text-[10px] text-slate-400">{o.company}</span></td>
                  <td className="p-4">{o.location}</td>
                  <td className="p-4 font-mono text-[10px] text-indigo-600">{o.stipendOrSalary}</td>
                  <td className="p-4 text-right">
                    <button onClick={() => { setOpportunities(opportunities.filter(x => x.id !== o.id)); onAddNotification("Deleted", "Posting removed", "alert"); }} className="p-1 text-rose-500 hover:bg-rose-50 rounded"><Trash2 className="w-4 h-4" /></button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {subTab === "companies" && (
        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 text-xs">
          <h3 className="font-bold mb-3 text-slate-800">Company / Partner Management</h3>
          <p className="text-slate-500 mb-4">Manage hiring partners that can post {viewType.toLowerCase()}s on the platform.</p>
          <div className="flex gap-4">
            <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl flex-1 flex justify-between items-center">
              <div><span className="font-bold block">TechCorp Solutions</span><span className="text-[10px] text-slate-500">Active • 12 Active Postings</span></div>
              <button className="text-rose-500 hover:underline text-[10px]">Revoke Access</button>
            </div>
          </div>
        </div>
      )}

      {subTab === "approvals" && (
        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 text-xs">
          <h3 className="font-bold mb-3 text-slate-800">Review & Approvals</h3>
          <p className="text-slate-500 mb-4">Approve {viewType.toLowerCase()}s submitted by external partners.</p>
          <div className="p-4 border border-dashed border-slate-300 rounded-xl flex items-center justify-between">
            <div>
              <span className="font-bold block">Draft: {viewType === "Job" ? "Senior Dev" : "Summer Intern"}</span>
              <span className="text-[10px] text-slate-400">By: StartUp Inc</span>
            </div>
            <div className="flex gap-2">
              <button onClick={() => onAddNotification("Approved", "Posting went live.", "recommendation")} className="px-3 py-1.5 bg-green-500 text-white rounded-lg flex items-center gap-1"><CheckCircle className="w-3 h-3"/> Approve</button>
              <button onClick={() => onAddNotification("Rejected", "Posting denied.", "alert")} className="px-3 py-1.5 bg-rose-500 text-white rounded-lg flex items-center gap-1"><Ban className="w-3 h-3"/> Reject</button>
            </div>
          </div>
        </div>
      )}

      {subTab === "applications" && (
        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 text-xs">
          <h3 className="font-bold mb-3 text-slate-800">Applications Monitoring</h3>
          <p className="text-slate-500 mb-4">Monitor application status and funnel throughput.</p>
          <table className="w-full text-left">
            <thead className="bg-slate-50 border-y border-slate-200 text-slate-400">
              <tr><th className="p-3">Candidate</th><th className="p-3">Applied To</th><th className="p-3">Status</th></tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              <tr><td className="p-3 font-bold">Alex Wong</td><td className="p-3">Frontend {viewType}</td><td className="p-3"><span className="text-indigo-600 bg-indigo-50 px-2 py-1 rounded-full text-[10px]">Interviewing</span></td></tr>
              <tr><td className="p-3 font-bold">Sarah Chen</td><td className="p-3">Backend {viewType}</td><td className="p-3"><span className="text-amber-600 bg-amber-50 px-2 py-1 rounded-full text-[10px]">Under Review</span></td></tr>
            </tbody>
          </table>
        </div>
      )}

      {subTab === "analytics" && (
        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 text-xs">
          <h3 className="font-bold mb-3 text-slate-800">{viewType} Funnel Analytics</h3>
          <div className="grid grid-cols-3 gap-4">
            <div className="p-4 bg-indigo-50 text-indigo-800 rounded-xl">
              <span className="block text-[10px] uppercase font-mono">Total Active Postings</span>
              <span className="text-xl font-bold">{filteredOpps.length}</span>
            </div>
            <div className="p-4 bg-emerald-50 text-emerald-800 rounded-xl">
              <span className="block text-[10px] uppercase font-mono">Total Applications</span>
              <span className="text-xl font-bold">{filteredOpps.length * 45}</span>
            </div>
            <div className="p-4 bg-amber-50 text-amber-800 rounded-xl">
              <span className="block text-[10px] uppercase font-mono">Acceptance Rate</span>
              <span className="text-xl font-bold">4.2%</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
