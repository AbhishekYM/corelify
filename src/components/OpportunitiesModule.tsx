import React, { useState } from "react";
import { Search, Briefcase, GraduationCap, ChevronRight, CheckCircle2, Kanban, Filter, Tag, ArrowRight, X, Sparkles, AlertCircle } from "lucide-react";
import { Opportunity, Scholarship } from "../types";

interface OpportunitiesModuleProps {
  opportunities: Opportunity[];
  setOpportunities: React.Dispatch<React.SetStateAction<Opportunity[]>>;
  scholarships: Scholarship[];
  setScholarships: React.Dispatch<React.SetStateAction<Scholarship[]>>;
  onAddNotification: (title: string, desc: string, type: "message" | "alert" | "recommendation" | "application") => void;
}

export default function OpportunitiesModule({
  opportunities,
  setOpportunities,
  scholarships,
  setScholarships,
  onAddNotification
}: OpportunitiesModuleProps) {
  const [activeTab, setActiveTab] = useState<"jobs" | "internships" | "scholarships" | "tracker">("jobs");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedSkillFilter, setSelectedSkillFilter] = useState("All");

  // Apply dialog states
  const [selectedOpportunityId, setSelectedOpportunityId] = useState<string | null>(null);
  const [selectedScholarshipId, setSelectedScholarshipId] = useState<string | null>(null);
  const [showApplyModal, setShowApplyModal] = useState(false);
  const [coverNote, setCoverNote] = useState("");
  const [uploadedResumeName, setUploadedResumeName] = useState("abhishek_resume_2026.pdf");

  const handleApplyOpportunity = (id: string) => {
    setSelectedOpportunityId(id);
    setSelectedScholarshipId(null);
    setShowApplyModal(true);
  };

  const handleApplyScholarship = (id: string) => {
    setSelectedScholarshipId(id);
    setSelectedOpportunityId(null);
    setShowApplyModal(true);
  };

  const handleFinalizeApplication = () => {
    if (selectedOpportunityId) {
      setOpportunities(
        opportunities.map((o) => {
          if (o.id === selectedOpportunityId) {
            return {
              ...o,
              applied: true,
              status: "Applied",
              applicationDate: "July 02, 2026"
            };
          }
          return o;
        })
      );
      const opp = opportunities.find((o) => o.id === selectedOpportunityId);
      if (opp) {
        onAddNotification(
          "Application Submitted",
          `Your application for ${opp.title} at ${opp.company} was submitted successfully!`,
          "application"
        );
      }
    } else if (selectedScholarshipId) {
      setScholarships(
        scholarships.map((s) => {
          if (s.id === selectedScholarshipId) {
            return {
              ...s,
              applied: true,
              status: "Pending"
            };
          }
          return s;
        })
      );
      const sch = scholarships.find((s) => s.id === selectedScholarshipId);
      if (sch) {
        onAddNotification(
          "Scholarship Application Filed",
          `Eligibility file compiled for ${sch.title}. Current status: Pending Review.`,
          "application"
        );
      }
    }
    setShowApplyModal(false);
  };

  const activeOppDetails = opportunities.find((o) => o.id === selectedOpportunityId) || opportunities[0];
  const activeSchDetails = scholarships.find((s) => s.id === selectedScholarshipId) || scholarships[0];

  // Helper arrays for Kanban Board columns
  const kanbanColumns = [
    { id: "Applied", title: "Applied", color: "bg-blue-500/10 text-blue-400 border-blue-500/20" },
    { id: "Reviewing", title: "Reviewing", color: "bg-amber-500/10 text-amber-400 border-amber-500/20" },
    { id: "Interviewing", title: "Interviewing", color: "bg-indigo-500/10 text-indigo-400 border-indigo-500/20" },
    { id: "Offered", title: "Offered", color: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20" },
    { id: "Rejected", title: "Rejected", color: "bg-red-500/10 text-red-400 border-red-500/20" }
  ];

  return (
    <div className="h-full flex flex-col gap-6 select-none font-sans overflow-hidden">
      {/* Upper Tab Navigation bar */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-slate-200 pb-4">
        <div className="flex items-center gap-2 bg-white p-1 rounded-xl border border-slate-200 shadow-sm">
          <button
            onClick={() => setActiveTab("jobs")}
            className={`px-4 py-1.5 rounded-lg text-xs font-medium transition-all cursor-pointer ${
              activeTab === "jobs" ? "bg-indigo-600 text-white shadow-sm font-semibold" : "text-slate-500 hover:text-slate-900 hover:bg-slate-50"
            }`}
          >
            Careers & Jobs
          </button>
          <button
            onClick={() => setActiveTab("internships")}
            className={`px-4 py-1.5 rounded-lg text-xs font-medium transition-all cursor-pointer ${
              activeTab === "internships" ? "bg-indigo-600 text-white shadow-sm font-semibold" : "text-slate-500 hover:text-slate-900 hover:bg-slate-50"
            }`}
          >
            Internship Portal
          </button>
          <button
            onClick={() => setActiveTab("scholarships")}
            className={`px-4 py-1.5 rounded-lg text-xs font-medium transition-all cursor-pointer ${
              activeTab === "scholarships" ? "bg-indigo-600 text-white shadow-sm font-semibold" : "text-slate-500 hover:text-slate-900 hover:bg-slate-50"
            }`}
          >
            Scholarships & Grants
          </button>
          <button
            onClick={() => setActiveTab("tracker")}
            className={`px-4 py-1.5 rounded-lg text-xs font-medium transition-all cursor-pointer flex items-center gap-1 cursor-pointer ${
              activeTab === "tracker" ? "bg-indigo-600 text-white shadow-sm font-semibold" : "text-slate-500 hover:text-slate-900 hover:bg-slate-50"
            }`}
          >
            <Kanban className="w-3.5 h-3.5" />
            <span>Kanban Tracker</span>
          </button>
        </div>

        {/* Global Opportunities search */}
        {activeTab !== "tracker" && (
          <div className="relative w-64">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search listings..."
              className="w-full pl-9 pr-3 py-1.5 bg-white border border-slate-200 rounded-lg text-xs text-slate-800 focus:outline-none focus:border-indigo-600 focus:ring-1 focus:ring-indigo-600 transition-colors"
            />
            <Search className="absolute left-3 top-2.5 w-3.5 h-3.5 text-slate-400" />
          </div>
        )}
      </div>

      {/* RENDER VIEW: JOBS OR INTERNSHIPS */}
      {(activeTab === "jobs" || activeTab === "internships") && (
        <div className="flex-1 overflow-y-auto pr-1">
          <div className="grid md:grid-cols-2 gap-6 pb-6">
            {opportunities
              .filter((o) => {
                const targetType = activeTab === "jobs" ? "Job" : "Internship";
                return o.type === targetType && o.title.toLowerCase().includes(searchQuery.toLowerCase());
              })
              .map((opp) => (
                <div key={opp.id} className="bg-white border border-slate-200 rounded-2xl p-5 flex flex-col justify-between h-56 shadow-sm hover:border-indigo-200 transition-all">
                  <div>
                    <div className="flex justify-between items-start gap-4">
                      <div className="flex gap-3 items-start">
                        <img src={opp.logo} alt={opp.company} className="w-10 h-10 rounded-lg object-cover border border-slate-200 shrink-0" />
                        <div>
                          <h4 className="text-slate-800 font-display font-semibold text-xs leading-tight">{opp.title}</h4>
                          <p className="text-slate-400 text-[10px] mt-0.5">{opp.company} &bull; {opp.location}</p>
                        </div>
                      </div>

                      <span className="px-2 py-0.5 bg-indigo-50 border border-indigo-150 text-indigo-700 font-mono text-[9px] font-bold uppercase rounded-full">
                        {opp.matchScore}% match
                      </span>
                    </div>

                    <p className="text-slate-600 text-xs line-clamp-2 mt-4 leading-relaxed">{opp.description}</p>
                  </div>

                  <div className="flex justify-between items-center pt-3 mt-3 border-t border-slate-100 text-xs">
                    <span className="text-slate-900 font-bold font-mono">{opp.stipendOrSalary}</span>
                    {opp.applied ? (
                      <span className="text-emerald-600 font-semibold flex items-center gap-1 text-[10px]">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        <span>Applied ({opp.status})</span>
                      </span>
                    ) : (
                      <button
                        onClick={() => handleApplyOpportunity(opp.id)}
                        className="px-3.5 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white text-[10px] font-semibold rounded-lg transition-colors cursor-pointer shadow-sm"
                      >
                        Apply Instantly
                      </button>
                    )}
                  </div>
                </div>
              ))}
          </div>
        </div>
      )}

      {/* RENDER VIEW: SCHOLARSHIPS */}
      {activeTab === "scholarships" && (
        <div className="flex-1 overflow-y-auto pr-1">
          <div className="grid md:grid-cols-2 gap-6 pb-6">
            {scholarships
              .filter((s) => s.title.toLowerCase().includes(searchQuery.toLowerCase()))
              .map((sch) => (
                <div key={sch.id} className="bg-white border border-slate-200 rounded-2xl p-5 flex flex-col justify-between h-56 shadow-sm hover:border-indigo-200 transition-all">
                  <div className="space-y-3">
                    <div>
                      <span className="text-[9px] font-mono text-slate-400">{sch.provider}</span>
                      <h4 className="text-slate-800 font-display font-semibold text-xs leading-tight mt-0.5">{sch.title}</h4>
                      <p className="text-slate-400 text-[10px] font-mono mt-0.5">Deadline: {sch.deadline}</p>
                    </div>

                    <p className="text-slate-600 text-xs line-clamp-2 leading-relaxed">{sch.description}</p>
                  </div>

                  <div className="flex justify-between items-center pt-3 mt-3 border-t border-slate-100 text-xs">
                    <span className="text-indigo-600 font-bold font-mono text-xs">{sch.amount}</span>
                    {sch.applied ? (
                      <span className="text-emerald-600 font-semibold flex items-center gap-1 text-[10px]">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        <span>Applied</span>
                      </span>
                    ) : (
                      <button
                        onClick={() => handleApplyScholarship(sch.id)}
                        className="px-3.5 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white text-[10px] font-semibold rounded-lg transition-colors cursor-pointer shadow-sm"
                      >
                        Verify Eligibility
                      </button>
                    )}
                  </div>
                </div>
              ))}
          </div>
        </div>
      )}

      {/* RENDER VIEW: INTERACTIVE KANBAN TRACKER */}
      {activeTab === "tracker" && (
        <div className="flex-1 overflow-x-auto overflow-y-hidden pb-4 pr-1">
          <div className="flex gap-4 h-full items-start min-w-[900px]">
            {kanbanColumns.map((col) => {
              // Gather opportunities or scholarships matching status
              const columnJobs = opportunities.filter((o) => o.applied && o.status === col.id);
              const columnGrants = scholarships.filter((s) => s.applied && col.id === "Applied" && s.status === "Pending");

              // Adapt tailwind light classes for badges based on the ID
              const columnStyles: Record<string, string> = {
                "Applied": "bg-blue-50 text-blue-700 border-blue-200",
                "Reviewing": "bg-amber-50 text-amber-700 border-amber-200",
                "Interviewing": "bg-indigo-50 text-indigo-700 border-indigo-200",
                "Offered": "bg-emerald-50 text-emerald-700 border-emerald-200",
                "Rejected": "bg-red-50 text-red-700 border-red-200"
              };

              return (
                <div key={col.id} className="w-72 bg-slate-50 border border-slate-200 p-4 rounded-2xl flex flex-col max-h-full h-full space-y-4 shadow-inner">
                  {/* Column header */}
                  <div className="flex justify-between items-center border-b border-slate-200 pb-2">
                    <div className="flex items-center gap-2">
                      <span className={`px-2 py-0.5 rounded text-[9px] font-mono font-bold border ${columnStyles[col.id] || "bg-slate-100 text-slate-700"}`}>
                        {col.title}
                      </span>
                      <span className="text-slate-400 text-[10px] font-mono">({columnJobs.length + (col.id === "Applied" ? columnGrants.length : 0)})</span>
                    </div>

                    <span className="text-[10px] text-slate-400 font-bold cursor-pointer hover:text-slate-600">+</span>
                  </div>

                  {/* Cards inside column */}
                  <div className="flex-1 overflow-y-auto space-y-3 pr-1">
                    {columnJobs.map((o) => (
                      <div
                        key={o.id}
                        onClick={() => {
                          // Interactive status transition simulation
                          const nextStatus: Record<string, string> = {
                            "Applied": "Reviewing",
                            "Reviewing": "Interviewing",
                            "Interviewing": "Offered",
                            "Offered": "Rejected",
                            "Rejected": "Applied"
                          };
                          setOpportunities(
                            opportunities.map((item) => {
                              if (item.id === o.id) {
                                  return { ...item, status: nextStatus[col.id] as any };
                              }
                              return item;
                            })
                          );
                        }}
                        className="bg-white border border-slate-200 p-3 rounded-xl space-y-2.5 cursor-pointer hover:border-indigo-400 transition-colors shadow-sm"
                      >
                        <div className="flex gap-2 items-center">
                          <img src={o.logo} alt={o.company} className="w-7 h-7 rounded object-cover border border-slate-200" />
                          <div className="min-w-0">
                            <h5 className="text-slate-800 text-xs font-semibold leading-tight truncate">{o.title}</h5>
                            <span className="text-slate-400 text-[9px] block leading-none">{o.company}</span>
                          </div>
                        </div>
                        <div className="flex justify-between items-center text-[8px] font-mono pt-2 border-t border-slate-150 text-slate-400">
                          <span>Sal: {o.stipendOrSalary.split(" - ")[0]}</span>
                          <span className="text-indigo-600 font-semibold">Click to change state</span>
                        </div>
                      </div>
                    ))}

                    {col.id === "Applied" && columnGrants.map((s) => (
                      <div key={s.id} className="bg-white border border-slate-200 p-3 rounded-xl space-y-2.5 shadow-sm">
                        <span className="text-slate-400 text-[9px] font-mono">{s.provider}</span>
                        <h5 className="text-slate-800 text-xs font-semibold leading-tight line-clamp-1">{s.title}</h5>
                        <div className="flex justify-between items-center text-[8px] font-mono pt-2 border-t border-slate-150 text-emerald-600">
                          <span>Grant: {s.amount}</span>
                          <span className="bg-emerald-50 px-1.5 py-0.5 border border-emerald-200 rounded text-[8px] uppercase font-bold">PENDING REVIEW</span>
                        </div>
                      </div>
                    ))}

                    {columnJobs.length === 0 && (col.id !== "Applied" || columnGrants.length === 0) && (
                      <p className="text-slate-400 text-center text-[10px] italic py-8 border border-dashed border-slate-200 bg-white/50 rounded-xl">Empty pipeline segment.</p>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Apply Modal Drawer Simulator */}
      {showApplyModal && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center p-6">
          <div className="bg-white border border-slate-200 p-6 rounded-2xl w-full max-w-sm space-y-5 relative shadow-2xl text-slate-800">
            <button
              onClick={() => setShowApplyModal(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>

            <div>
              <span className="text-[9px] font-mono text-indigo-600 uppercase tracking-widest block font-semibold">SECURE APPLICATION FORM</span>
              <h3 className="text-slate-900 font-display font-bold text-base mt-0.5">
                {selectedOpportunityId ? activeOppDetails.title : activeSchDetails.title}
              </h3>
            </div>

            <div className="space-y-4">
              <div className="space-y-1.5">
                <span className="text-[9px] font-mono text-slate-400 uppercase block">Active resume payload</span>
                <div className="p-2.5 bg-slate-50 border border-slate-200 rounded-lg flex items-center justify-between text-xs font-mono">
                  <span className="text-indigo-700 truncate pr-2 font-semibold">{uploadedResumeName}</span>
                  <span className="text-[8px] text-emerald-700 border border-emerald-200 bg-emerald-50 px-1.5 rounded leading-none py-0.5 font-bold">VERIFIED</span>
                </div>
              </div>

              <div className="space-y-1">
                <span className="text-[9px] font-mono text-slate-400 uppercase block">Cover Statement (Highly recommended)</span>
                <textarea
                  value={coverNote}
                  onChange={(e) => setCoverNote(e.target.value)}
                  placeholder="Tell the core team why you are a fit for this role..."
                  rows={4}
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-800 focus:outline-none focus:bg-white placeholder:text-slate-400 focus:border-indigo-600 focus:ring-1 focus:ring-indigo-600 transition-colors"
                />
              </div>
            </div>

            <button
              onClick={handleFinalizeApplication}
              className="w-full py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold rounded-xl flex items-center justify-center gap-1.5 cursor-pointer shadow-md"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Submit Application File</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
