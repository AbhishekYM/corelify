import React, { useState } from "react";
import { Globe, Type, Hash, Save } from "lucide-react";

interface AdminSEOProps {
  seoConfig: Record<string, any>;
  setSeoConfig: React.Dispatch<React.SetStateAction<Record<string, any>>>;
  onAddNotification: (title: string, description: string, type: "message" | "alert" | "recommendation" | "application") => void;
}

export default function AdminSEO({ seoConfig, setSeoConfig, onAddNotification }: AdminSEOProps) {
  const [subTab, setSubTab] = useState<"titles" | "descriptions" | "tags">("titles");
  const pages = ["Landing Page", "Course Directory", "Mentor Search", "Job Board", "Blog Hub"];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <span className="text-xs font-bold text-slate-800">SEO & Meta Management</span>
      </div>

      <div className="flex gap-2 border-b border-slate-200 pb-2 overflow-x-auto">
        <button onClick={() => setSubTab("titles")} className={`px-3 py-1.5 rounded-lg text-[10px] font-bold flex items-center gap-1 ${subTab === "titles" ? "bg-slate-200 text-slate-800" : "text-slate-500 hover:bg-slate-100"}`}><Type className="w-3 h-3"/> Meta Titles</button>
        <button onClick={() => setSubTab("descriptions")} className={`px-3 py-1.5 rounded-lg text-[10px] font-bold flex items-center gap-1 ${subTab === "descriptions" ? "bg-slate-200 text-slate-800" : "text-slate-500 hover:bg-slate-100"}`}><Globe className="w-3 h-3"/> Meta Descriptions</button>
        <button onClick={() => setSubTab("tags")} className={`px-3 py-1.5 rounded-lg text-[10px] font-bold flex items-center gap-1 ${subTab === "tags" ? "bg-slate-200 text-slate-800" : "text-slate-500 hover:bg-slate-100"}`}><Hash className="w-3 h-3"/> Social Tags</button>
      </div>

      {subTab === "titles" && (
        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 text-xs">
          <h3 className="font-bold mb-3 text-slate-800">Global Meta Titles</h3>
          <p className="text-slate-500 mb-4">Manage title tags for core pages.</p>
          <div className="space-y-4">
            {pages.map((p) => (
              <div key={p}>
                <label className="text-[10px] text-slate-400 block mb-1">{p} &lt;title&gt;</label>
                <input className="w-full p-2 border rounded font-mono text-[10px]" defaultValue={`${p} | Corelify - Supercharge Your Career`} />
              </div>
            ))}
            <button onClick={() => onAddNotification("Saved", "Meta titles updated", "alert")} className="px-4 py-2 bg-indigo-600 text-white rounded font-bold mt-4 flex items-center gap-1"><Save className="w-3 h-3"/> Save</button>
          </div>
        </div>
      )}

      {subTab === "descriptions" && (
        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 text-xs">
          <h3 className="font-bold mb-3 text-slate-800">Global Meta Descriptions</h3>
          <p className="text-slate-500 mb-4">Manage description tags for core pages.</p>
          <div className="space-y-4">
            {pages.map((p) => (
              <div key={p}>
                <label className="text-[10px] text-slate-400 block mb-1">{p} &lt;meta name="description"&gt;</label>
                <textarea className="w-full p-2 border rounded font-mono text-[10px] resize-none" rows={2} defaultValue={`Join Corelify to explore the best ${p.toLowerCase()} opportunities...`} />
              </div>
            ))}
            <button onClick={() => onAddNotification("Saved", "Meta descriptions updated", "alert")} className="px-4 py-2 bg-indigo-600 text-white rounded font-bold mt-4 flex items-center gap-1"><Save className="w-3 h-3"/> Save</button>
          </div>
        </div>
      )}

      {subTab === "tags" && (
        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 text-xs">
          <h3 className="font-bold mb-3 text-slate-800">OpenGraph & Social Tags</h3>
          <p className="text-slate-500 mb-4">Manage tags optimized for Twitter, LinkedIn, and Facebook sharing.</p>
          <div className="p-4 border rounded-xl bg-slate-50 space-y-4">
            <div>
              <label className="text-[10px] text-slate-400 block mb-1">og:image (Default Cover)</label>
              <input className="w-full p-2 border rounded bg-white" defaultValue="https://corelify.com/social-cover.jpg" />
            </div>
            <div>
              <label className="text-[10px] text-slate-400 block mb-1">twitter:card</label>
              <select className="w-full p-2 border rounded bg-white"><option>summary_large_image</option><option>summary</option></select>
            </div>
            <button onClick={() => onAddNotification("Saved", "OG tags updated", "alert")} className="px-4 py-2 bg-indigo-600 text-white rounded font-bold mt-2 flex items-center gap-1"><Save className="w-3 h-3"/> Save Tags</button>
          </div>
        </div>
      )}
    </div>
  );
}
