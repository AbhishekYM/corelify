import React, { useState } from "react";
import { ShieldCheck, Plus, Trash2, Edit3, X, Calendar, Activity, DollarSign, CheckCircle, Ban } from "lucide-react";
import { Mentor } from "../../types";

interface AdminMentorsProps {
  mentors: Mentor[];
  setMentors: React.Dispatch<React.SetStateAction<Mentor[]>>;
  onAddNotification: (title: string, description: string, type: "message" | "alert" | "recommendation" | "application") => void;
}

export default function AdminMentors({ mentors, setMentors, onAddNotification }: AdminMentorsProps) {
  const [subTab, setSubTab] = useState<"onboarding" | "verification" | "schedules" | "performance">("onboarding");

  const [showMentorModal, setShowMentorModal] = useState(false);
  const [mentorForm, setMentorForm] = useState({
    name: "", role: "Senior Designer", company: "", price: 50, bio: "", skills: ""
  });

  const handleCreateMentor = (e: React.FormEvent) => {
    e.preventDefault();
    const newMentor: Mentor = {
      id: `mentor-${Date.now()}`,
      name: mentorForm.name, role: mentorForm.role, company: mentorForm.company,
      rating: 5.0, reviewsCount: 0, price: mentorForm.price, bio: mentorForm.bio,
      image: "https://picsum.photos/seed/semzfzw/800/600",
      skills: mentorForm.skills.split(",").map(s => s.trim()),
      availability: ["Monday 10:00 AM", "Wednesday 2:00 PM"],
      reviews: []
    };
    setMentors([...mentors, newMentor]);
    onAddNotification("Mentor Onboarded", `${mentorForm.name} added to the platform directory.`, "alert");
    setShowMentorModal(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <span className="text-xs font-bold text-slate-800">Mentor Management</span>
        <button onClick={() => setShowMentorModal(true)} className="px-3 py-1.5 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold rounded-xl flex items-center gap-1.5 shadow">
          <Plus className="w-3.5 h-3.5" /><span>Onboard Mentor</span>
        </button>
      </div>

      <div className="flex gap-2 border-b border-slate-200 pb-2 overflow-x-auto">
        <button onClick={() => setSubTab("onboarding")} className={`px-3 py-1.5 rounded-lg text-[10px] font-bold ${subTab === "onboarding" ? "bg-slate-200 text-slate-800" : "text-slate-500 hover:bg-slate-100"}`}>Directory & Onboarding</button>
        <button onClick={() => setSubTab("verification")} className={`px-3 py-1.5 rounded-lg text-[10px] font-bold flex items-center gap-1 ${subTab === "verification" ? "bg-slate-200 text-slate-800" : "text-slate-500 hover:bg-slate-100"}`}><ShieldCheck className="w-3 h-3"/> Verification & Approval</button>
        <button onClick={() => setSubTab("schedules")} className={`px-3 py-1.5 rounded-lg text-[10px] font-bold flex items-center gap-1 ${subTab === "schedules" ? "bg-slate-200 text-slate-800" : "text-slate-500 hover:bg-slate-100"}`}><Calendar className="w-3 h-3"/> Schedules</button>
        <button onClick={() => setSubTab("performance")} className={`px-3 py-1.5 rounded-lg text-[10px] font-bold flex items-center gap-1 ${subTab === "performance" ? "bg-slate-200 text-slate-800" : "text-slate-500 hover:bg-slate-100"}`}><Activity className="w-3 h-3"/> Performance & Revenue</button>
      </div>

      {subTab === "onboarding" && (
        <div className="bg-white rounded-2xl border border-slate-200/80 overflow-hidden text-xs">
          <table className="w-full text-left">
            <thead className="bg-slate-50 text-slate-400 font-semibold border-b border-slate-200">
              <tr>
                <th className="p-4">Mentor Profile</th><th className="p-4">Expertise</th><th className="p-4">Hourly Rate</th><th className="p-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {mentors.map(m => (
                <tr key={m.id}>
                  <td className="p-4"><span className="font-bold text-slate-900 block">{m.name}</span><span className="text-[10px] text-slate-400">{m.role} at {m.company}</span></td>
                  <td className="p-4"><div className="flex flex-wrap gap-1">{m.skills.slice(0,2).map(s=><span key={s} className="px-1.5 py-0.5 bg-slate-100 rounded text-[9px]">{s}</span>)}</div></td>
                  <td className="p-4 font-bold text-emerald-600">${m.price}/hr</td>
                  <td className="p-4 text-right">
                    <button onClick={() => { setMentors(mentors.filter(x => x.id !== m.id)); onAddNotification("Deleted", "Mentor removed", "alert"); }} className="p-1 text-rose-500 hover:bg-rose-50 rounded"><Trash2 className="w-4 h-4" /></button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {subTab === "verification" && (
        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 text-xs">
          <h3 className="font-bold mb-3 text-slate-800">Verification & Approval Queue</h3>
          <p className="text-slate-500 mb-4">Review mentor applications and verify their identity and company credentials.</p>
          <div className="space-y-3">
            <div className="p-4 border border-dashed border-slate-300 rounded-xl flex items-center justify-between bg-slate-50">
              <div>
                <span className="font-bold block text-slate-800">Sarah Jenkins</span>
                <span className="text-[10px] text-slate-500">Staff Engineer at Google • Identity: Unverified</span>
              </div>
              <div className="flex gap-2">
                <button onClick={() => onAddNotification("Verified", "Mentor identity confirmed.", "recommendation")} className="px-3 py-1.5 bg-indigo-600 text-white rounded-lg flex items-center gap-1">Verify ID</button>
                <button onClick={() => onAddNotification("Approved", "Mentor application approved.", "recommendation")} className="px-3 py-1.5 bg-green-500 text-white rounded-lg flex items-center gap-1"><CheckCircle className="w-3 h-3"/> Approve</button>
                <button onClick={() => onAddNotification("Rejected", "Application denied.", "alert")} className="px-3 py-1.5 bg-rose-500 text-white rounded-lg flex items-center gap-1"><Ban className="w-3 h-3"/> Reject</button>
              </div>
            </div>
          </div>
        </div>
      )}

      {subTab === "schedules" && (
        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 text-xs">
          <h3 className="font-bold mb-3 text-slate-800">Schedule Management</h3>
          <p className="text-slate-500 mb-4">Manage and override mentor availability slots.</p>
          <div className="grid grid-cols-2 gap-4">
            {mentors.map(m => (
              <div key={m.id} className="p-4 border border-slate-200 rounded-xl">
                <span className="font-bold block mb-2">{m.name}</span>
                <div className="space-y-1">
                  {m.availability.map((slot, i) => (
                    <div key={i} className="flex justify-between items-center bg-slate-50 p-2 rounded border border-slate-100">
                      <span className="text-[10px] font-mono">{slot}</span>
                      <button className="text-rose-500 hover:underline text-[9px]">Cancel Slot</button>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {subTab === "performance" && (
        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 text-xs">
          <h3 className="font-bold mb-3 text-slate-800">Performance & Revenue Tracking</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div className="p-4 bg-emerald-50 border border-emerald-100 rounded-xl">
              <span className="text-[10px] font-mono text-emerald-800 uppercase block mb-1">Platform Cut (20%)</span>
              <span className="text-2xl font-bold text-emerald-600 flex items-center gap-1"><DollarSign className="w-5 h-5"/>4,250</span>
            </div>
            <div className="p-4 bg-indigo-50 border border-indigo-100 rounded-xl">
              <span className="text-[10px] font-mono text-indigo-800 uppercase block mb-1">Total Mentor Payouts</span>
              <span className="text-2xl font-bold text-indigo-600 flex items-center gap-1"><DollarSign className="w-5 h-5"/>17,000</span>
            </div>
            <div className="p-4 bg-amber-50 border border-amber-100 rounded-xl">
              <span className="text-[10px] font-mono text-amber-800 uppercase block mb-1">Avg Rating</span>
              <span className="text-2xl font-bold text-amber-600">4.92 / 5.0</span>
            </div>
          </div>
          <table className="w-full text-left">
            <thead className="bg-slate-50 border-y border-slate-200 text-slate-400">
              <tr><th className="p-3">Mentor</th><th className="p-3">Sessions Booked</th><th className="p-3">Avg Rating</th><th className="p-3 text-right">Gross Earnings</th></tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {mentors.map(m => (
                <tr key={m.id}>
                  <td className="p-3 font-bold">{m.name}</td>
                  <td className="p-3 text-[10px] font-mono">{m.reviewsCount * 4 + 12}</td>
                  <td className="p-3 text-[10px] font-mono text-amber-500">⭐ {m.rating}</td>
                  <td className="p-3 text-right font-bold text-emerald-600">${(m.reviewsCount * 4 + 12) * m.price}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {showMentorModal && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <form onSubmit={handleCreateMentor} className="bg-white rounded-2xl max-w-lg w-full border border-slate-200 p-6 space-y-4">
            <div className="flex justify-between items-center border-b border-slate-100 pb-2">
              <span className="font-bold text-slate-900">Onboard Mentor</span>
              <button type="button" onClick={() => setShowMentorModal(false)} className="text-slate-400 hover:text-slate-600"><X className="w-4 h-4" /></button>
            </div>
            <div className="grid grid-cols-2 gap-3 text-xs">
              <div className="col-span-2"><label className="text-[10px] font-mono text-slate-400 block mb-1">Name</label><input required value={mentorForm.name} onChange={e=>setMentorForm({...mentorForm, name:e.target.value})} className="w-full p-2 border rounded-xl" /></div>
              <div><label className="text-[10px] font-mono text-slate-400 block mb-1">Role/Title</label><input required value={mentorForm.role} onChange={e=>setMentorForm({...mentorForm, role:e.target.value})} className="w-full p-2 border rounded-xl" /></div>
              <div><label className="text-[10px] font-mono text-slate-400 block mb-1">Company</label><input required value={mentorForm.company} onChange={e=>setMentorForm({...mentorForm, company:e.target.value})} className="w-full p-2 border rounded-xl" /></div>
              <div><label className="text-[10px] font-mono text-slate-400 block mb-1">Hourly Rate ($)</label><input type="number" required value={mentorForm.price} onChange={e=>setMentorForm({...mentorForm, price:Number(e.target.value)})} className="w-full p-2 border rounded-xl" /></div>
              <div><label className="text-[10px] font-mono text-slate-400 block mb-1">Skills (comma separated)</label><input value={mentorForm.skills} onChange={e=>setMentorForm({...mentorForm, skills:e.target.value})} className="w-full p-2 border rounded-xl" placeholder="React, Figma..." /></div>
            </div>
            <div className="flex justify-end gap-2.5 pt-4">
              <button type="button" onClick={() => setShowMentorModal(false)} className="px-4 py-2 bg-slate-100 rounded-xl">Cancel</button>
              <button type="submit" className="px-4 py-2 bg-indigo-600 text-white rounded-xl shadow-lg">Save Mentor</button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
