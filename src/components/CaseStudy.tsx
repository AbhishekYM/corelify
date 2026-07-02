import React, { useState } from "react";
import { Sparkles, Compass, Users, LayoutGrid, CheckCircle2, Award, Shield, FileText, Code2, Sliders } from "lucide-react";
import { motion } from "motion/react";

export default function CaseStudy() {
  const [activeTab, setActiveTab] = useState<"case" | "system" | "architecture">("case");

  const personas = [
    {
      name: "Siddharth Mehta",
      role: "Aspiring Product Builder",
      avatar: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=150&q=80",
      age: 21,
      location: "Mumbai, India",
      needs: [
        "Needs high-craft portfolio guidance to apply to international SaaS roles.",
        "Struggles to map out learning pathways and identify industry skill gaps."
      ],
      frustrations: [
        "Existing learning websites are boring and feel like sterile classrooms.",
        "LinkedIn feels overcrowded and difficult to stand out without prior elite brands."
      ]
    },
    {
      name: "Elena Rostova",
      role: "Career Pivoter (Ex-Sales Manager)",
      avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=150&q=80",
      age: 28,
      location: "Berlin, Germany (Remote)",
      needs: [
        "Structured, direct mentorship from designers working at high-craft companies.",
        "A clear roadmap that combines self-paced learning with verified credentials."
      ],
      frustrations: [
        "Wasting time reading generic blog posts that lack actionable advice.",
        "Unsure if her work matches current industry expectations."
      ]
    }
  ];

  const designTokens = {
    colors: [
      { name: "Slate 50 (Canvas)", hex: "#F8FAFC", role: "Primary page background" },
      { name: "White (Card Base)", hex: "#FFFFFF", role: "Core container card background with high contrast shadows" },
      { name: "Indigo 600 (Accent Brand)", hex: "#4F46E5", role: "Primary buttons, active indicators, interactive elements" },
      { name: "Violet 600 (AI Feature)", hex: "#7C3AED", role: "AI features glow, secondary CTA" },
      { name: "Emerald 600 (Success State)", hex: "#059669", role: "Accepted applications, awarded scholarships, completed lessons" },
      { name: "Amber 500 (Alert Status)", hex: "#D97706", role: "Reviewing status, high priority support" }
    ],
    typography: [
      { name: "Display Headings", font: "Space Grotesk", weight: "Medium / Bold", usage: "H1, H2, Hero statements, card titles" },
      { name: "Body & UI Text", font: "Inter", weight: "Regular / Medium / Semibold", usage: "General UI controls, descriptive texts, list items" },
      { name: "Status / Code Data", font: "JetBrains Mono", weight: "Medium", usage: "Job tags, salary scales, match score %, timeline metrics" }
    ]
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 p-6 md:p-12 overflow-y-auto">
      {/* Upper Navigation and Header */}
      <div className="max-w-6xl mx-auto mb-12">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 border-b border-slate-200 pb-8">
          <div>
            <div className="flex items-center gap-2 text-indigo-650 font-mono text-xs mb-2 font-bold">
              <Award className="w-4 h-4" />
              <span>UX DELIVERABLES & DESIGN DOCUMENTATION</span>
            </div>
            <h1 className="text-4xl font-display font-bold tracking-tight text-slate-900 mb-2">Lumina UX Strategy</h1>
            <p className="text-slate-500 max-w-2xl text-sm leading-relaxed">
              Detailed breakdown of the design thinking, information architecture, complete design system, sitemaps, and engineering handoff rules of the Lumina Ecosystem.
            </p>
          </div>

          <div className="flex gap-2 bg-slate-100 p-1 rounded-xl border border-slate-200 self-start md:self-auto">
            <button
              onClick={() => setActiveTab("case")}
              className={`px-4 py-2 rounded-lg text-xs font-medium transition-all cursor-pointer ${
                activeTab === "case" ? "bg-indigo-600 text-white shadow-md" : "text-slate-500 hover:text-slate-800"
              }`}
            >
              Design Thinking
            </button>
            <button
              onClick={() => setActiveTab("architecture")}
              className={`px-4 py-2 rounded-lg text-xs font-medium transition-all cursor-pointer ${
                activeTab === "architecture" ? "bg-indigo-600 text-white shadow-md" : "text-slate-500 hover:text-slate-800"
              }`}
            >
              Sitemap & Flows
            </button>
            <button
              onClick={() => setActiveTab("system")}
              className={`px-4 py-2 rounded-lg text-xs font-medium transition-all cursor-pointer ${
                activeTab === "system" ? "bg-indigo-600 text-white shadow-md" : "text-slate-500 hover:text-slate-800"
              }`}
            >
              Design System
            </button>
          </div>
        </div>

        {/* Tab 1: Design Thinking */}
        {activeTab === "case" && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-12"
          >
            {/* Design Process Section */}
            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-white border border-slate-200 p-6 rounded-2xl shadow-sm">
                <div className="w-10 h-10 bg-indigo-50 text-indigo-650 rounded-xl flex items-center justify-center mb-4">
                  <Compass className="w-5 h-5" />
                </div>
                <h3 className="text-lg font-display font-medium text-slate-850 mb-2">1. The Research</h3>
                <p className="text-slate-500 text-xs leading-relaxed">
                  Conducted interviews with 18 university students and 6 career switchers. Core insights revealed major anxiety over "learning without landing"—the gap between acquiring theoretical certificates and actually being ready for highly demanding tech roles.
                </p>
              </div>

              <div className="bg-white border border-slate-200 p-6 rounded-2xl shadow-sm">
                <div className="w-10 h-10 bg-violet-50 text-violet-650 rounded-xl flex items-center justify-center mb-4">
                  <Sparkles className="w-5 h-5" />
                </div>
                <h3 className="text-lg font-display font-medium text-slate-850 mb-2">2. The Solution</h3>
                <p className="text-slate-500 text-xs leading-relaxed">
                  Lumina solves this by tightly coupling learning pathways with direct mentorship and immediate micro-internships or job applications. An AI Assistant assesses portfolios, identifies skill gaps, and recommends precise, actionable courses to elevate user profiles.
                </p>
              </div>

              <div className="bg-white border border-slate-200 p-6 rounded-2xl shadow-sm">
                <div className="w-10 h-10 bg-emerald-50 text-emerald-650 rounded-xl flex items-center justify-center mb-4">
                  <Users className="w-5 h-5" />
                </div>
                <h3 className="text-lg font-display font-medium text-slate-850 mb-2">3. The Ecosystem</h3>
                <p className="text-slate-500 text-xs leading-relaxed">
                  By bringing Courses, Mentors, Jobs, Internships, Workshops, and Portfolios under a unified visual system and state manager, we remove the fragmentation of jumping across multiple unrelated platforms.
                </p>
              </div>
            </div>

            {/* Personas Subsection */}
            <div>
              <h2 className="text-xl font-display font-medium text-slate-900 mb-6 flex items-center gap-2">
                <Users className="text-indigo-650 w-5 h-5" />
                <span>Primary User Personas</span>
              </h2>

              <div className="grid md:grid-cols-2 gap-8">
                {personas.map((p, i) => (
                  <div key={i} className="bg-white border border-slate-200 rounded-2xl p-6 relative overflow-hidden shadow-sm">
                    <div className="absolute top-0 right-0 w-24 h-24 bg-indigo-50/50 rounded-full blur-2xl" />
                    <div className="flex gap-4 items-center mb-4">
                      <img src={p.avatar} alt={p.name} className="w-16 h-16 rounded-xl object-cover border border-slate-200" />
                      <div>
                        <h4 className="text-lg font-display font-medium text-slate-850">{p.name}</h4>
                        <p className="text-indigo-650 font-mono text-xs font-semibold">{p.role} &bull; Age {p.age}</p>
                        <p className="text-slate-400 text-xs">{p.location}</p>
                      </div>
                    </div>

                    <div className="space-y-3 mt-4">
                      <div>
                        <span className="text-xs font-bold text-emerald-600 font-mono">CORE NEEDS:</span>
                        <ul className="list-disc list-inside text-slate-650 text-xs mt-1 space-y-1">
                          {p.needs.map((n, idx) => <li key={idx}>{n}</li>)}
                        </ul>
                      </div>
                      <div>
                        <span className="text-xs font-bold text-rose-600 font-mono">FRUSTRATIONS:</span>
                        <ul className="list-disc list-inside text-slate-650 text-xs mt-1 space-y-1">
                          {p.frustrations.map((n, idx) => <li key={idx}>{n}</li>)}
                        </ul>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Core Experience Pillar */}
            <div className="bg-white border border-slate-200 p-8 rounded-2xl relative overflow-hidden shadow-sm">
              <div className="absolute top-0 right-0 w-48 h-48 bg-indigo-50/20 rounded-full blur-3xl" />
              <h3 className="text-xl font-display font-medium text-slate-850 mb-4">Core UX Philosophy</h3>
              <div className="grid md:grid-cols-4 gap-6">
                <div>
                  <h4 className="text-indigo-650 font-mono text-xs mb-1 font-bold">CRAFT</h4>
                  <p className="text-slate-500 text-xs leading-relaxed">Tight padding, crisp borders, subtle glows, and responsive keyboard feedback build instant user confidence.</p>
                </div>
                <div>
                  <h4 className="text-indigo-650 font-mono text-xs mb-1 font-bold">CONTEXTUAL AI</h4>
                  <p className="text-slate-500 text-xs leading-relaxed">AI features do not sit behind a generic chatbot. They are embedded directly in the profile, resume upload, and dashboard workflows.</p>
                </div>
                <div>
                  <h4 className="text-indigo-650 font-mono text-xs mb-1 font-bold">SINGLE SOURCE</h4>
                  <p className="text-slate-500 text-xs leading-relaxed">A single centralized portfolio links directly to job applications, allowing mentors to review, leave comments, and endorse features.</p>
                </div>
                <div>
                  <h4 className="text-indigo-650 font-mono text-xs mb-1 font-bold">REDUCED FRICTION</h4>
                  <p className="text-slate-500 text-xs leading-relaxed">Instant checkout drawers, visual calendar pickers, and live-tracking kanban boards keep cognitive load to a minimum.</p>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* Tab 2: Architecture */}
        {activeTab === "architecture" && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-12"
          >
            {/* Sitemap section */}
            <div>
              <h2 className="text-xl font-display font-medium text-slate-900 mb-2">Platform Sitemap</h2>
              <p className="text-slate-500 text-xs mb-6">Interactive view of the complete application flow and unified entry points.</p>

              <div className="bg-white p-6 rounded-2xl border border-slate-200 space-y-6 shadow-sm">
                {/* Visual Sitemap Graph */}
                <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                  <div className="p-4 bg-slate-50 border border-slate-250 rounded-xl text-center">
                    <span className="text-indigo-650 font-mono text-[10px] block mb-1 font-bold">01. ENTRY</span>
                    <span className="font-display font-medium text-xs text-slate-800">Landing Website</span>
                    <span className="text-slate-400 text-[10px] block mt-1">Pricing, FAQ, Hero, Assist</span>
                  </div>

                  <div className="p-4 bg-slate-50 border border-slate-250 rounded-xl text-center">
                    <span className="text-indigo-650 font-mono text-[10px] block mb-1 font-bold">02. ACCESS</span>
                    <span className="font-display font-medium text-xs text-slate-800">Authentication</span>
                    <span className="text-slate-400 text-[10px] block mt-1">OTP, Social, Onboarding</span>
                  </div>

                  <div className="p-4 bg-slate-50 border border-indigo-400 rounded-xl text-center relative shadow-sm">
                    <div className="absolute top-1.5 right-1.5 w-2 h-2 bg-indigo-600 rounded-full" />
                    <span className="text-indigo-650 font-mono text-[10px] block mb-1 font-bold">03. CENTRAL</span>
                    <span className="font-display font-medium text-xs text-slate-800">Dashboard</span>
                    <span className="text-slate-400 text-[10px] block mt-1">Greeter, Metrics, AI Actions</span>
                  </div>

                  <div className="p-4 bg-slate-50 border border-slate-250 rounded-xl text-center">
                    <span className="text-indigo-650 font-mono text-[10px] block mb-1 font-bold">04. MODULES</span>
                    <span className="font-display font-medium text-xs text-slate-800">Features</span>
                    <span className="text-slate-400 text-[10px] block mt-1">Courses, Mentors, Jobs</span>
                  </div>

                  <div className="p-4 bg-slate-50 border border-slate-250 rounded-xl text-center">
                    <span className="text-indigo-650 font-mono text-[10px] block mb-1 font-bold">05. PROFILE</span>
                    <span className="font-display font-medium text-xs text-slate-800">User Space</span>
                    <span className="text-slate-400 text-[10px] block mt-1">Portfolio, Settings, Support</span>
                  </div>
                </div>

                {/* Symmetrical arrows line */}
                <div className="hidden md:flex justify-around items-center text-slate-400 px-10 font-bold">
                  <span>&rarr;</span>
                  <span>&rarr;</span>
                  <span>&rarr;</span>
                  <span>&rarr;</span>
                </div>

                {/* Sitemap detail map */}
                <div className="grid md:grid-cols-3 gap-6 text-xs">
                  <div className="border border-slate-200 p-4 rounded-xl space-y-2 bg-slate-50/50">
                    <span className="font-semibold text-slate-850 block border-b border-slate-100 pb-1">LEARNING LAYER</span>
                    <p className="text-slate-500 leading-normal">Course Listing &bull; Search Filters &bull; Video Curriculum Player &bull; Action Progress Bar &bull; Verified Credential Exports</p>
                  </div>
                  <div className="border border-slate-200 p-4 rounded-xl space-y-2 bg-slate-50/50">
                    <span className="font-semibold text-slate-850 block border-b border-slate-100 pb-1">CAREER PORTAL</span>
                    <p className="text-slate-500 leading-normal">Jobs Listing &bull; Internships Detail &bull; Scholarships Application &bull; Realtime Application Tracking &bull; Saved Roles Drawer</p>
                  </div>
                  <div className="border border-slate-200 p-4 rounded-xl space-y-2 bg-slate-50/50">
                    <span className="font-semibold text-slate-850 block border-b border-slate-100 pb-1">AI WORKSPACE</span>
                    <p className="text-slate-500 leading-normal">Roadmap Generator &bull; Skill Gap Scanner &bull; AI Resume Enhancer &bull; Universal Search Tokenizer</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Interactive Wireframe Simulation */}
            <div>
              <h2 className="text-xl font-display font-medium text-slate-900 mb-2">Wireframe & Component Blueprint</h2>
              <p className="text-slate-500 text-xs mb-6">Interactive wireframe illustrating the precise layout structure of Lumina's main Dashboard page.</p>

              <div className="bg-slate-100 border border-dashed border-slate-300 rounded-2xl p-6 font-mono text-xs text-slate-500 space-y-4">
                <div className="border border-dashed border-slate-300 p-2 rounded flex justify-between items-center bg-white shadow-sm">
                  <span>[ HEADER: Lumina Logo | Universal search (Cmd+K) | Notifications | Profile avatar ]</span>
                </div>
                <div className="grid md:grid-cols-4 gap-4">
                  <div className="border border-dashed border-slate-300 p-4 rounded space-y-2 bg-white shadow-sm h-48 flex flex-col justify-between">
                    <span>[ SIDEBAR NAV ]</span>
                    <div className="space-y-1 text-[10px] text-slate-400">
                      <div>- Dashboard</div>
                      <div>- Learning Platform</div>
                      <div>- Mentorship Hub</div>
                      <div>- Opportunity Center</div>
                      <div>- AI Career Agent</div>
                      <div>- Support Tickets</div>
                    </div>
                  </div>
                  <div className="md:col-span-3 border border-dashed border-slate-300 p-4 rounded space-y-4 bg-white shadow-sm h-48 flex flex-col justify-between">
                    <div className="flex justify-between">
                      <span>[ MAIN VIEW STAGE ]</span>
                      <span className="text-[10px] text-indigo-600 font-bold">Active Stage</span>
                    </div>
                    <div className="grid grid-cols-3 gap-2">
                      <div className="border border-dashed border-slate-200 bg-slate-50 p-2 text-center text-[10px]">[ Metric Cards ]</div>
                      <div className="border border-dashed border-slate-200 bg-slate-50 p-2 text-center text-[10px]">[ Recommended list ]</div>
                      <div className="border border-dashed border-slate-200 bg-slate-50 p-2 text-center text-[10px]">[ AI Roadmap ]</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* Tab 3: Design System */}
        {activeTab === "system" && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-12"
          >
            {/* Color Swatches */}
            <div>
              <h2 className="text-xl font-display font-medium text-slate-900 mb-4">Color Palette Tokens</h2>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {designTokens.colors.map((c, i) => (
                  <div key={i} className="bg-white border border-slate-200 rounded-xl p-4 flex gap-3 items-center shadow-sm">
                    <div className="w-12 h-12 rounded-lg border border-slate-200 shrink-0 shadow-inner" style={{ backgroundColor: c.hex }} />
                    <div>
                      <h4 className="text-slate-800 font-semibold text-xs font-display">{c.name}</h4>
                      <code className="text-indigo-650 font-mono text-[10px] block font-semibold">{c.hex}</code>
                      <p className="text-slate-400 text-[10px] mt-0.5 leading-snug">{c.role}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Typography scale */}
            <div>
              <h2 className="text-xl font-display font-medium text-slate-900 mb-4">Typography Pairings</h2>
              <div className="bg-white p-6 rounded-2xl border border-slate-200 divide-y divide-slate-100 shadow-sm">
                {designTokens.typography.map((t, i) => (
                  <div key={i} className="py-4 first:pt-0 last:pb-0 flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div>
                      <h4 className="text-slate-800 font-semibold text-xs font-display">{t.name}</h4>
                      <p className="text-slate-400 text-[10px] mt-0.5">Family: <span className="font-mono font-medium">{t.font}</span> &bull; {t.usage}</p>
                    </div>
                    <div className="text-right">
                      {t.font === "Space Grotesk" ? (
                        <span className="font-display text-lg font-bold text-slate-900 tracking-tight">The Lumina Ecosystem</span>
                      ) : t.font === "JetBrains Mono" ? (
                        <code className="text-xs text-indigo-600 font-semibold">Match score: 94% &bull; $140,000</code>
                      ) : (
                        <span className="text-xs text-slate-500 font-medium">Clean and highly readable body layout system.</span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Design system components playground */}
            <div>
              <h2 className="text-xl font-display font-medium text-slate-900 mb-4">UI Component Token Playground</h2>
              <div className="grid md:grid-cols-2 gap-8">
                {/* Live Elements */}
                <div className="bg-white border border-slate-200 p-6 rounded-2xl space-y-6 shadow-sm">
                  <span className="text-xs font-mono text-indigo-650 block border-b border-slate-100 pb-2 font-bold">LIVE COMPONENT TOKENS</span>

                  {/* Buttons Showcase */}
                  <div className="space-y-2">
                    <span className="text-[10px] text-slate-400 font-mono uppercase block">Buttons</span>
                    <div className="flex flex-wrap gap-2">
                      <button className="px-3 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-medium rounded-lg transition-colors shadow">
                        Primary CTA
                      </button>
                      <button className="px-3 py-1.5 bg-slate-50 hover:bg-slate-100 text-slate-650 text-xs font-medium rounded-lg border border-slate-200 transition-colors">
                        Secondary Default
                      </button>
                      <button className="px-3 py-1.5 bg-transparent border border-dashed border-slate-350 text-slate-500 text-xs rounded-lg hover:text-slate-800 transition-colors">
                        Dashed Action
                      </button>
                    </div>
                  </div>

                  {/* Badges and tags */}
                  <div className="space-y-2">
                    <span className="text-[10px] text-slate-400 font-mono uppercase block">Badges & Metrics</span>
                    <div className="flex flex-wrap gap-2">
                      <span className="px-2.5 py-0.5 bg-emerald-50 text-emerald-700 border border-emerald-150 rounded-full font-mono text-[10px] font-bold">
                        94% Match
                      </span>
                      <span className="px-2.5 py-0.5 bg-indigo-50 text-indigo-700 border border-indigo-150 rounded-full font-mono text-[10px] font-bold">
                        Job Role
                      </span>
                      <span className="px-2.5 py-0.5 bg-amber-50 text-amber-700 border border-amber-150 rounded-full font-mono text-[10px] font-bold">
                        Reviewing
                      </span>
                      <span className="px-2.5 py-0.5 bg-rose-50 text-rose-700 border border-rose-150 rounded-full font-mono text-[10px] font-bold">
                        High Priority
                      </span>
                    </div>
                  </div>

                  {/* Form fields */}
                  <div className="space-y-2">
                    <span className="text-[10px] text-slate-400 font-mono uppercase block">Inputs</span>
                    <input
                      type="text"
                      placeholder="Input token styling..."
                      className="w-full px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-800 focus:outline-none focus:bg-white focus:border-indigo-600 transition-all placeholder:text-slate-400"
                    />
                  </div>
                </div>

                {/* Skeletons & Loading */}
                <div className="bg-white border border-slate-200 p-6 rounded-2xl space-y-6 shadow-sm">
                  <span className="text-xs font-mono text-indigo-650 block border-b border-slate-100 pb-2 font-bold">SKELETON & VISUAL LOADERS</span>

                  {/* Skeleton Card */}
                  <div className="border border-slate-200 p-4 rounded-xl bg-slate-50 space-y-3">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-slate-200 animate-pulse" />
                      <div className="space-y-1.5 flex-1">
                        <div className="h-3 bg-slate-200 rounded w-1/2 animate-pulse" />
                        <div className="h-2 bg-slate-200 rounded w-1/3 animate-pulse" />
                      </div>
                    </div>
                    <div className="space-y-1.5 pt-2">
                      <div className="h-2 bg-slate-200 rounded w-full animate-pulse" />
                      <div className="h-2 bg-slate-200 rounded w-4/5 animate-pulse" />
                    </div>
                  </div>

                  <p className="text-slate-400 text-[10px] leading-relaxed">
                    Visual skeletons are triggered during module routing transitions to eliminate cognitive flashes. Standardized animations use a linear-pulse rhythm with a 1.4-second cycle.
                  </p>
                </div>
              </div>
            </div>

            {/* Developer Handoff Rules */}
            <div className="bg-white border border-indigo-200 p-6 rounded-2xl relative overflow-hidden shadow-sm">
              <div className="absolute top-0 right-0 w-24 h-24 bg-indigo-50/20 rounded-full blur-2xl" />
              <div className="flex items-center gap-2 mb-3 text-indigo-650 font-mono text-xs font-bold">
                <Code2 className="w-4 h-4" />
                <span>DEVELOPER HANDOFF SPECS</span>
              </div>
              <h3 className="text-lg font-display font-medium text-slate-850 mb-2">CSS Token & Responsive Guidelines</h3>
              <ul className="text-xs text-slate-500 space-y-2 list-disc list-inside leading-relaxed">
                <li><strong className="text-slate-800">Responsive breakpoints</strong>: Desktop is first-priority optimized (`lg:w-full max-w-7xl`). Mobile targets are safe with a 44px hit buffer (`px-4 py-2`).</li>
                <li><strong className="text-slate-800">Card layouts</strong>: Always apply standard utility tag <code className="text-indigo-600 font-mono text-[10px]">.glass-card</code> to represent transparent container boundaries with <code className="text-indigo-600 font-mono text-[10px]">backdrop-filter: blur(16px)</code>.</li>
                <li><strong className="text-slate-800">Transitions</strong>: Ensure the custom spring ease curve is loaded for all hover motions: <code className="text-indigo-600 font-mono text-[10px]">cubic-bezier(0.16, 1, 0.3, 1)</code>.</li>
              </ul>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}
