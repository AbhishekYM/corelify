import React, { useState } from "react";
import {
  Plus,
  Award,
  Trash2,
  Globe,
  Link,
  Sparkles,
  FileText,
  AlertCircle,
  FileSpreadsheet,
  Share2,
  Video,
  ExternalLink,
  CheckCircle,
  Upload,
  BookOpen
} from "lucide-react";
import { UserProfile, PortfolioProject } from "../types";

interface PortfolioModuleProps {
  userProfile: UserProfile;
  setUserProfile: React.Dispatch<React.SetStateAction<UserProfile>>;
  onAddNotification: (title: string, desc: string, type: "message" | "alert" | "recommendation" | "application") => void;
}

export default function PortfolioModule({ userProfile, setUserProfile, onAddNotification }: PortfolioModuleProps) {
  const [showAddForm, setShowAddForm] = useState(false);
  const [activeAssetTab, setActiveAssetTab] = useState<string>("All");

  // Form states
  const [newTitle, setNewTitle] = useState("");
  const [newCategory, setNewCategory] = useState("Project Document");
  const [newLink, setNewLink] = useState("");
  const [newDesc, setNewDesc] = useState("");
  const [newTagsStr, setNewTagsStr] = useState("");
  const [simulatedFileName, setSimulatedFileName] = useState<string | null>(null);

  // Sharing states
  const [isCopied, setIsCopied] = useState(false);

  const assetCategories = [
    "All",
    "Project Document",
    "Research Paper",
    "Video & Presentation",
    "Certificate & Award"
  ];

  const handleSimulateDrag = () => {
    setSimulatedFileName(`doc_verified_${Math.floor(Math.random() * 9000 + 1000)}.pdf`);
  };

  const handleAddProject = () => {
    if (newTitle.trim() === "" || newDesc.trim() === "") return;

    const newProject: PortfolioProject = {
      id: `p-${Date.now()}`,
      title: newTitle,
      category: newCategory,
      image: newCategory === "Video & Presentation" 
        ? "https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?auto=format&fit=crop&w=400&q=80"
        : newCategory === "Research Paper"
        ? "https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?auto=format&fit=crop&w=400&q=80"
        : newCategory === "Certificate & Award"
        ? "https://images.unsplash.com/photo-1579546929518-9e396f3cc809?auto=format&fit=crop&w=400&q=80"
        : "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=400&q=80",
      link: newLink || "https://lumina.io/view-credential",
      description: newDesc,
      tags: newTagsStr.split(",").map(t => t.trim()).filter(t => t !== "")
    };

    // Append file tag if present
    if (simulatedFileName) {
      newProject.tags.push("Verified File Attachment");
    }

    setUserProfile({
      ...userProfile,
      projects: [newProject, ...userProfile.projects]
    });

    onAddNotification(
      "Asset Indexed successfully",
      `${newCategory}: "${newTitle}" has been analyzed, checked, and added to your portfolio database.`,
      "alert"
    );

    // Reset Form
    setNewTitle("");
    setNewLink("");
    setNewDesc("");
    setNewTagsStr("");
    setSimulatedFileName(null);
    setShowAddForm(false);
  };

  const handleDeleteProject = (id: string) => {
    setUserProfile({
      ...userProfile,
      projects: userProfile.projects.filter(p => p.id !== id)
    });
  };

  const handleSharePortfolio = () => {
    navigator.clipboard.writeText(`https://lumina.io/profile/abhishek-makwana`);
    setIsCopied(true);
    onAddNotification(
      "Portfolio Link Shared",
      "Public shareable portfolio URL has been synthesized and compiled to your browser clipboard.",
      "message"
    );
    setTimeout(() => {
      setIsCopied(false);
    }, 3000);
  };

  const filteredProjects = userProfile.projects.filter(p => {
    if (activeAssetTab === "All") return true;
    return p.category === activeAssetTab;
  });

  return (
    <div className="h-full flex flex-col gap-6 select-none font-sans overflow-hidden">
      
      {/* Module Title Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-slate-200 pb-4">
        <div>
          <div className="flex items-center gap-1.5 text-indigo-650 font-mono text-xs mb-1 font-bold">
            <Award className="w-4 h-4 text-indigo-600" />
            <span>PORTFOLIO ASSETS LEDGER</span>
          </div>
          <h2 className="text-xl font-display font-bold text-slate-900 tracking-tight">Interactive Portfolio Architect</h2>
        </div>

        <div className="flex items-center gap-2">
          {/* Share Trigger */}
          <button
            onClick={handleSharePortfolio}
            className={`px-3.5 py-1.5 border text-xs font-semibold rounded-xl flex items-center gap-1.5 cursor-pointer transition-all shadow-sm ${
              isCopied 
                ? "bg-emerald-50 border-emerald-300 text-emerald-800" 
                : "bg-white border-slate-200 hover:bg-slate-50 text-slate-700"
            }`}
          >
            {isCopied ? <CheckCircle className="w-4 h-4" /> : <Share2 className="w-4 h-4" />}
            <span>{isCopied ? "Link Copied!" : "Share Public Portfolio"}</span>
          </button>

          <button
            onClick={() => setShowAddForm(!showAddForm)}
            className="px-3.5 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold rounded-xl flex items-center gap-1.5 cursor-pointer transition-all shadow-sm"
          >
            <Plus className="w-4 h-4" />
            <span>Upload Portfolio Asset</span>
          </button>
        </div>
      </div>

      {/* Asset category filter tabs */}
      <div className="flex flex-wrap gap-1.5 border-b border-slate-100 pb-3">
        {assetCategories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveAssetTab(cat)}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition-colors cursor-pointer ${
              activeAssetTab === cat
                ? "bg-indigo-55 text-indigo-700 border-indigo-200 bg-indigo-50"
                : "bg-white border-slate-200 text-slate-600 hover:bg-slate-50"
            }`}
          >
            {cat === "All" ? "All Portfolio Assets" : cat + "s"}
          </button>
        ))}
      </div>

      <div className="flex-1 overflow-y-auto pr-1 pb-10">
        
        {/* ADD PORTFOLIO ASSET BUILDER FORM */}
        {showAddForm && (
          <div className="bg-white border border-slate-200 rounded-2xl p-6 mb-6 space-y-4 max-w-xl shadow-lg border-t-4 border-t-indigo-600">
            <div className="flex justify-between items-center pb-2 border-b border-slate-100">
              <div className="flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-indigo-600" />
                <span className="text-xs font-bold text-slate-800">Add Portfolio Credentials</span>
              </div>
              <button
                onClick={() => setShowAddForm(false)}
                className="text-slate-400 hover:text-slate-600 cursor-pointer text-xs font-medium"
              >
                Close
              </button>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1">
                <span className="text-[10px] text-slate-400 font-mono uppercase block font-semibold">Asset / Project Title</span>
                <input
                  type="text"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  placeholder="e.g., Synthetix Tokens Dictionary"
                  className="w-full px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-800 focus:outline-none focus:bg-white focus:border-indigo-600 focus:ring-1 focus:ring-indigo-600 transition-colors"
                />
              </div>

              <div className="space-y-1">
                <span className="text-[10px] text-slate-400 font-mono uppercase block font-semibold">Asset Category</span>
                <select
                  value={newCategory}
                  onChange={(e) => setNewCategory(e.target.value)}
                  className="w-full px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-800 focus:outline-none focus:bg-white focus:border-indigo-600 focus:ring-1 focus:ring-indigo-600 transition-colors"
                >
                  <option value="Project Document">Project Document</option>
                  <option value="Research Paper">Research Paper</option>
                  <option value="Video & Presentation">Video &amp; Presentation</option>
                  <option value="Certificate & Award">Certificate &amp; Award</option>
                </select>
              </div>

              <div className="space-y-1 col-span-2">
                <span className="text-[10px] text-slate-400 font-mono uppercase block font-semibold">Reference Link URL (Slides / Github / Youtube)</span>
                <input
                  type="text"
                  value={newLink}
                  onChange={(e) => setNewLink(e.target.value)}
                  placeholder="https://github.com/... or https://youtube.com/..."
                  className="w-full px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-800 focus:outline-none focus:bg-white focus:border-indigo-600 focus:ring-1 focus:ring-indigo-600 transition-colors"
                />
              </div>

              <div className="space-y-1 col-span-2">
                <span className="text-[10px] text-slate-400 font-mono uppercase block font-semibold">Technical Tags (comma separated)</span>
                <input
                  type="text"
                  value={newTagsStr}
                  onChange={(e) => setNewTagsStr(e.target.value)}
                  placeholder="Figma API, Design Tokens, React 19"
                  className="w-full px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-800 focus:outline-none focus:bg-white focus:border-indigo-600 focus:ring-1 focus:ring-indigo-600 transition-colors"
                />
              </div>
            </div>

            {/* Simulating File Upload Drag sandbox */}
            <div className="space-y-1">
              <span className="text-[10px] text-slate-400 font-mono uppercase block font-semibold">Attach Academic Asset/CV (Simulated)</span>
              <div
                onClick={handleSimulateDrag}
                className="border border-dashed border-slate-200 hover:border-indigo-400 bg-slate-50 p-4 rounded-xl text-center cursor-pointer transition-colors"
              >
                <Upload className="w-5 h-5 text-slate-400 mx-auto mb-1.5" />
                <span className="text-[10px] text-slate-600 block font-medium">
                  {simulatedFileName ? (
                    <span className="text-emerald-600 font-mono font-semibold">{simulatedFileName} Loaded</span>
                  ) : (
                    "Click to attach research paper/presentation slides document"
                  )}
                </span>
                <span className="text-[9px] text-slate-400 block">PDF, PPTX, MP4 formats accepted</span>
              </div>
            </div>

            <div className="space-y-1">
              <span className="text-[10px] text-slate-400 font-mono uppercase block font-semibold">Asset Details / Overview Bio</span>
              <textarea
                value={newDesc}
                onChange={(e) => setNewDesc(e.target.value)}
                placeholder="Brief summary of variables compiled, design specs, or award verification protocols..."
                rows={3}
                className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-800 focus:outline-none focus:bg-white focus:border-indigo-600 focus:ring-1 focus:ring-indigo-600 transition-colors placeholder:text-slate-400"
              />
            </div>

            <button
              onClick={handleAddProject}
              className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold rounded-xl shadow cursor-pointer transition-colors"
            >
              Add Asset &amp; Index
            </button>
          </div>
        )}

        {/* ASSETS GRID SHOWCASE */}
        <div className="grid md:grid-cols-2 gap-6">
          {filteredProjects.map((p) => (
            <div
              key={p.id}
              className="bg-white border border-slate-200 rounded-2xl overflow-hidden flex flex-col justify-between shadow-sm hover:border-slate-300 transition-all hover:shadow"
            >
              <div>
                <div className="relative">
                  <img src={p.image} alt={p.title} className="w-full h-40 object-cover border-b border-slate-200" />
                  <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm border border-slate-150 rounded px-2 py-0.5 text-[8px] font-mono font-bold uppercase tracking-wide text-indigo-700">
                    {p.category}
                  </div>
                </div>

                <div className="p-4 space-y-2">
                  <div className="flex justify-between items-start gap-2">
                    <h4 className="text-slate-850 font-display font-bold text-sm leading-tight">{p.title}</h4>
                    <button
                      onClick={() => handleDeleteProject(p.id)}
                      className="text-slate-400 hover:text-red-500 cursor-pointer p-1 rounded hover:bg-slate-50 transition-colors shrink-0"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                  <p className="text-slate-500 text-xs leading-relaxed line-clamp-3">{p.description}</p>
                </div>
              </div>

              <div className="px-4 pb-4 pt-2.5 border-t border-slate-100 flex flex-wrap gap-2 items-center justify-between">
                <div className="flex flex-wrap gap-1 max-w-[70%]">
                  {p.tags.map(t => (
                    <span
                      key={t}
                      className="px-1.5 py-0.5 bg-slate-50 text-slate-500 rounded font-mono text-[8px] border border-slate-150 leading-none"
                    >
                      {t}
                    </span>
                  ))}
                </div>

                <a
                  href={p.link}
                  target="_blank"
                  rel="noreferrer"
                  className="text-indigo-600 hover:text-indigo-750 hover:underline flex items-center gap-0.5 shrink-0 text-[10px] font-bold"
                >
                  <span>Open Resource</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>
          ))}

          {filteredProjects.length === 0 && (
            <div className="col-span-full text-center py-12 bg-white border border-dashed border-slate-200 rounded-2xl space-y-3 shadow-sm">
              <AlertCircle className="w-8 h-8 text-slate-300 mx-auto" />
              <p className="text-xs text-slate-450 italic">
                No portfolio assets matching category "{activeAssetTab}" logged.
              </p>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
