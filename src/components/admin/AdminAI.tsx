import React, { useState } from "react";
import { Sliders, Cpu, GitMerge, Activity, CheckCircle } from "lucide-react";

interface AdminAIProps {
  skillMappings: Record<string, string[]>;
  setSkillMappings: React.Dispatch<React.SetStateAction<Record<string, string[]>>>;
  onAddNotification: (title: string, description: string, type: "message" | "alert" | "recommendation" | "application") => void;
}

export default function AdminAI({ skillMappings, setSkillMappings, onAddNotification }: AdminAIProps) {
  const [subTab, setSubTab] = useState<"rules" | "matching" | "skills" | "analytics">("rules");
  const [weight, setWeight] = useState(70);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <span className="text-xs font-bold text-slate-800">AI Recommendation Engine</span>
      </div>

      <div className="flex gap-2 border-b border-slate-200 pb-2 overflow-x-auto">
        <button onClick={() => setSubTab("rules")} className={`px-3 py-1.5 rounded-lg text-[10px] font-bold flex items-center gap-1 ${subTab === "rules" ? "bg-slate-200 text-slate-800" : "text-slate-500 hover:bg-slate-100"}`}><Sliders className="w-3 h-3"/> Engine Rules</button>
        <button onClick={() => setSubTab("matching")} className={`px-3 py-1.5 rounded-lg text-[10px] font-bold flex items-center gap-1 ${subTab === "matching" ? "bg-slate-200 text-slate-800" : "text-slate-500 hover:bg-slate-100"}`}><GitMerge className="w-3 h-3"/> Opportunity Matching</button>
        <button onClick={() => setSubTab("skills")} className={`px-3 py-1.5 rounded-lg text-[10px] font-bold flex items-center gap-1 ${subTab === "skills" ? "bg-slate-200 text-slate-800" : "text-slate-500 hover:bg-slate-100"}`}><Cpu className="w-3 h-3"/> Skill Ontology</button>
        <button onClick={() => setSubTab("analytics")} className={`px-3 py-1.5 rounded-lg text-[10px] font-bold flex items-center gap-1 ${subTab === "analytics" ? "bg-slate-200 text-slate-800" : "text-slate-500 hover:bg-slate-100"}`}><Activity className="w-3 h-3"/> Engine Analytics</button>
      </div>

      {subTab === "rules" && (
        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 text-xs">
          <h3 className="font-bold mb-3 text-slate-800">Recommendation Rules Configuration</h3>
          <p className="text-slate-500 mb-6">Configure the base heuristics used before hitting the LLM API.</p>
          <div className="space-y-4">
            <div>
              <label className="text-[10px] text-slate-400 block mb-2">Keyword Overlap Weight ({weight}%)</label>
              <input type="range" min="0" max="100" value={weight} onChange={(e) => setWeight(Number(e.target.value))} className="w-full accent-indigo-600" />
            </div>
            <div className="flex items-center gap-3">
              <input type="checkbox" defaultChecked className="accent-indigo-600" />
              <span>Prioritize active users in batch generation</span>
            </div>
            <button onClick={() => onAddNotification("Saved", "Rule weights updated", "alert")} className="px-4 py-2 bg-indigo-600 text-white rounded-xl font-bold">Save Configuration</button>
          </div>
        </div>
      )}

      {subTab === "matching" && (
        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 text-xs">
          <h3 className="font-bold mb-3 text-slate-800">Opportunity Matching Configuration</h3>
          <div className="space-y-3">
            <div className="p-4 border rounded-xl">
              <span className="font-bold block mb-1">Minimum Match Threshold</span>
              <select className="p-2 border rounded w-full mt-1"><option>High Strictness (&gt;80%)</option><option>Medium (&gt;60%)</option></select>
            </div>
          </div>
        </div>
      )}

      {subTab === "skills" && (
        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 text-xs">
          <h3 className="font-bold mb-3 text-slate-800">Skill Knowledge Graph / Mapping</h3>
          <div className="space-y-3">
            {Object.entries(skillMappings).map(([parent, children]) => (
              <div key={parent} className="p-4 border rounded-xl bg-slate-50">
                <span className="font-bold text-slate-900 block mb-2 text-sm">{parent}</span>
                <div className="flex flex-wrap gap-1">
                  {children.map(c => <span key={c} className="px-2 py-1 bg-white border border-slate-200 rounded text-[10px]">{c}</span>)}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {subTab === "analytics" && (
        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 text-xs">
          <h3 className="font-bold mb-3 text-slate-800">AI Model Performance Analytics</h3>
          <div className="grid grid-cols-2 gap-4">
            <div className="p-4 bg-indigo-50 rounded-xl">
              <span className="block text-[10px] uppercase font-mono text-indigo-800">Recommendation Click-Through</span>
              <span className="text-xl font-bold text-indigo-900">42.8%</span>
            </div>
            <div className="p-4 bg-emerald-50 rounded-xl">
              <span className="block text-[10px] uppercase font-mono text-emerald-800">Successful Matches</span>
              <span className="text-xl font-bold text-emerald-900">1,204</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
