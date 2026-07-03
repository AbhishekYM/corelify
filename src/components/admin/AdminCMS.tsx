import React, { useState } from "react";
import { Server, Layout, Image, FileText, HelpCircle, ShieldAlert, FileKey } from "lucide-react";

interface AdminCMSProps {
  cmsFaqs: { id: string; q: string; a: string }[];
  setCmsFaqs: React.Dispatch<React.SetStateAction<{ id: string; q: string; a: string }[]>>;
  onAddNotification: (title: string, description: string, type: "message" | "alert" | "recommendation" | "application") => void;
}

export default function AdminCMS({ cmsFaqs, setCmsFaqs, onAddNotification }: AdminCMSProps) {
  const [subTab, setSubTab] = useState<"homepage" | "banners" | "pages" | "faqs" | "terms" | "privacy">("homepage");
  const [newFaq, setNewFaq] = useState({ q: "", a: "" });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <span className="text-xs font-bold text-slate-800">Content Management System</span>
      </div>

      <div className="flex gap-2 border-b border-slate-200 pb-2 overflow-x-auto">
        <button onClick={() => setSubTab("homepage")} className={`px-3 py-1.5 rounded-lg text-[10px] font-bold flex items-center gap-1 ${subTab === "homepage" ? "bg-slate-200 text-slate-800" : "text-slate-500 hover:bg-slate-100"}`}><Layout className="w-3 h-3"/> Homepage</button>
        <button onClick={() => setSubTab("banners")} className={`px-3 py-1.5 rounded-lg text-[10px] font-bold flex items-center gap-1 ${subTab === "banners" ? "bg-slate-200 text-slate-800" : "text-slate-500 hover:bg-slate-100"}`}><Image className="w-3 h-3"/> Banners</button>
        <button onClick={() => setSubTab("pages")} className={`px-3 py-1.5 rounded-lg text-[10px] font-bold flex items-center gap-1 ${subTab === "pages" ? "bg-slate-200 text-slate-800" : "text-slate-500 hover:bg-slate-100"}`}><FileText className="w-3 h-3"/> Static Pages</button>
        <button onClick={() => setSubTab("faqs")} className={`px-3 py-1.5 rounded-lg text-[10px] font-bold flex items-center gap-1 ${subTab === "faqs" ? "bg-slate-200 text-slate-800" : "text-slate-500 hover:bg-slate-100"}`}><HelpCircle className="w-3 h-3"/> FAQs</button>
        <button onClick={() => setSubTab("terms")} className={`px-3 py-1.5 rounded-lg text-[10px] font-bold flex items-center gap-1 ${subTab === "terms" ? "bg-slate-200 text-slate-800" : "text-slate-500 hover:bg-slate-100"}`}><FileKey className="w-3 h-3"/> Terms</button>
        <button onClick={() => setSubTab("privacy")} className={`px-3 py-1.5 rounded-lg text-[10px] font-bold flex items-center gap-1 ${subTab === "privacy" ? "bg-slate-200 text-slate-800" : "text-slate-500 hover:bg-slate-100"}`}><ShieldAlert className="w-3 h-3"/> Privacy</button>
      </div>

      {subTab === "homepage" && (
        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 text-xs">
          <h3 className="font-bold mb-3 text-slate-800">Homepage Content</h3>
          <div className="space-y-4">
            <div><label className="text-[10px] text-slate-400">Hero Headline</label><input className="w-full p-2 border rounded" defaultValue="Supercharge Your Career Journey" /></div>
            <div><label className="text-[10px] text-slate-400">Hero Subtext</label><textarea className="w-full p-2 border rounded" defaultValue="Master modern tech skills, connect with world-class mentors..." /></div>
            <button className="px-4 py-2 bg-indigo-600 text-white rounded font-bold">Save Changes</button>
          </div>
        </div>
      )}

      {subTab === "banners" && (
        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 text-xs">
          <h3 className="font-bold mb-3 text-slate-800">Promotional Banners</h3>
          <div className="p-4 border border-dashed border-slate-300 rounded-xl text-center text-slate-500">
            <Image className="w-8 h-8 mx-auto mb-2 opacity-50" />
            <p>Upload a new promotion banner for the top of the site.</p>
            <button className="mt-2 px-3 py-1 bg-slate-100 rounded text-[10px]">Select File</button>
          </div>
        </div>
      )}

      {subTab === "pages" && (
        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 text-xs">
          <h3 className="font-bold mb-3 text-slate-800">Static Pages Management</h3>
          <ul className="space-y-2">
            {["About Us", "Contact", "For Employers", "For Mentors"].map(p => (
              <li key={p} className="p-3 bg-slate-50 border rounded flex justify-between">
                <span>{p}</span><button className="text-indigo-600 hover:underline">Edit Content</button>
              </li>
            ))}
          </ul>
        </div>
      )}

      {subTab === "faqs" && (
        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 text-xs">
          <h3 className="font-bold mb-3 text-slate-800">FAQs Management</h3>
          <div className="mb-6 p-4 bg-slate-50 border rounded-xl space-y-3">
            <input placeholder="Question" value={newFaq.q} onChange={e=>setNewFaq({...newFaq, q:e.target.value})} className="w-full p-2 border rounded" />
            <textarea placeholder="Answer" value={newFaq.a} onChange={e=>setNewFaq({...newFaq, a:e.target.value})} className="w-full p-2 border rounded resize-none" />
            <button onClick={() => {
              if (newFaq.q && newFaq.a) {
                setCmsFaqs([...cmsFaqs, { id: `faq-${Date.now()}`, ...newFaq }]);
                setNewFaq({ q: "", a: "" });
              }
            }} className="px-4 py-1.5 bg-indigo-600 text-white rounded font-bold">Add FAQ</button>
          </div>
          <div className="space-y-3">
            {cmsFaqs.map(f => (
              <div key={f.id} className="p-4 border rounded-xl flex justify-between">
                <div><span className="font-bold block mb-1">{f.q}</span><span className="text-slate-500">{f.a}</span></div>
                <button onClick={() => setCmsFaqs(cmsFaqs.filter(x => x.id !== f.id))} className="text-rose-500 text-[10px]">Delete</button>
              </div>
            ))}
          </div>
        </div>
      )}

      {subTab === "terms" && (
        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 text-xs">
          <h3 className="font-bold mb-3 text-slate-800">Terms & Conditions</h3>
          <textarea className="w-full p-4 border rounded h-64 font-mono text-[10px]" defaultValue={`1. ACCEPTANCE OF TERMS\n\nBy accessing and using Corelify...`} />
          <button className="mt-3 px-4 py-2 bg-indigo-600 text-white rounded font-bold">Update Terms</button>
        </div>
      )}

      {subTab === "privacy" && (
        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 text-xs">
          <h3 className="font-bold mb-3 text-slate-800">Privacy Policy</h3>
          <textarea className="w-full p-4 border rounded h-64 font-mono text-[10px]" defaultValue={`1. INFORMATION WE COLLECT\n\nWhen you register on Corelify...`} />
          <button className="mt-3 px-4 py-2 bg-indigo-600 text-white rounded font-bold">Update Policy</button>
        </div>
      )}
    </div>
  );
}
