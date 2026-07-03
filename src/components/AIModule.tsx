import React, { useState } from "react";
import { Sparkles, MessageSquare, Compass, Send, CheckCircle2, ChevronRight, FileText, RefreshCw, AlertCircle, Trash2 } from "lucide-react";
import { UserProfile } from "../types";

interface AIModuleProps {
  userProfile: UserProfile;
}

export default function AIModule({ userProfile }: AIModuleProps) {
  const [activeTab, setActiveTab] = useState<"advisor" | "roadmap" | "resume">("advisor");

  // Chat Advisor state
  const [messages, setMessages] = useState([
    { sender: "ai", text: "Hey! I am your Corelify AI Career Copilot. I've analyzed your portfolio and resume. What career pivot or skill alignment shall we focus on today?", time: "10:10 AM" }
  ]);
  const [inputText, setInputText] = useState("");

  // Resume grader score
  const [resumeGrade, setResumeGrade] = useState(84);
  const [gradesList, setGradesList] = useState([
    { metric: "Metric Focus", score: 65, hint: "Replace passive verbs ('Wrote code') with concrete outcomes ('Engineered design system JSON reduction, reducing handoff latency by 45%')." },
    { metric: "Token System Knowledge", score: 90, hint: "Excellent mention of Figma variables, but consider linking to active code repository." },
    { metric: "React 19 Hooks", score: 70, hint: "Specify usage of useActionState and Server Actions in projects to match elite frontend requirements." }
  ]);

  // Roadmap generation state
  const [selectedRoadmapTarget, setSelectedRoadmapTarget] = useState("SaaS Product Architect");
  const [generatedSteps, setGeneratedSteps] = useState([
    { id: "step-1", title: "Establish Semantic Design Tokens Hierarchy", desc: "Configure global theme variables inside Figma. Expose token JSON blocks and compile them dynamically using Tailwind CSS v4 themes.", completed: true },
    { id: "step-2", title: "Master Concurrent React State Management", desc: "Build asynchronous transition states with React 19's useActionState hook to eliminate visual stuttering.", completed: false },
    { id: "step-3", title: "Integrate Real-Time WebSocket Collaboration", desc: "Implement server-authoritative coordinate caching for high-throughput multi-user canvases.", completed: false }
  ]);

  const handleSendMessage = () => {
    if (inputText.trim() === "") return;
    setMessages([
      ...messages,
      { sender: "user", text: inputText, time: "10:12 AM" }
    ]);
    const query = inputText.toLowerCase();
    setInputText("");

    setTimeout(() => {
      let reply = "Your portfolio looks strong, but to stand out to teams at Linear and Stripe, you should package your 'Synthetix design plugin' with a clean, published NPM package. It shows end-to-end craft.";
      if (query.includes("resume")) {
        reply = "I've reviewed your resume. Improving your 'Metric Focus' score from 65 to 90 is your fastest lever. Check out the Resume Copywriter tab above for specific line upgrades.";
      } else if (query.includes("roadmap") || query.includes("steps")) {
        reply = "I've compiled a 3-step Career Roadmap mapped to your SaaS Architect goal. Take a look at the Career Roadmap tab to start tracking your completion progress.";
      } else if (query.includes("stripe") || query.includes("figma")) {
        reply = "Stripe looks closely at front-end visual fidelity. Figma cares about real-time collaborative canvas scaling (WebGL, Canvas APIs). Try adding a small Canvas board prototype to your portfolio.";
      }

      setMessages((prev) => [
        ...prev,
        { sender: "ai", text: reply, time: "10:13 AM" }
      ]);
    }, 1200);
  };

  const handleToggleRoadmapStep = (id: string) => {
    setGeneratedSteps(
      generatedSteps.map((step) => {
        if (step.id === id) {
          return { ...step, completed: !step.completed };
        }
        return step;
      })
    );
  };

  return (
    <div className="h-full flex flex-col gap-6 select-none font-sans overflow-hidden">
      {/* Upper Module header and tab triggers */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-slate-200 pb-4">
        <div>
          <div className="flex items-center gap-1.5 text-indigo-650 font-mono text-xs mb-1 font-bold">
            <Sparkles className="w-4 h-4 animate-pulse" />
            <span>CONTEXTUAL AI EXPERIENCE</span>
          </div>
          <h2 className="text-xl font-display font-bold text-slate-900 tracking-tight">AI Career Assistant</h2>
        </div>

        <div className="flex items-center gap-2 bg-white p-1 rounded-xl border border-slate-200 shadow-sm">
          <button
            onClick={() => setActiveTab("advisor")}
            className={`px-4 py-1.5 rounded-lg text-xs font-medium transition-all cursor-pointer ${
              activeTab === "advisor" ? "bg-indigo-600 text-white shadow-sm font-semibold" : "text-slate-500 hover:text-slate-900 hover:bg-slate-50"
            }`}
          >
            Advisor Chat
          </button>
          <button
            onClick={() => setActiveTab("roadmap")}
            className={`px-4 py-1.5 rounded-lg text-xs font-medium transition-all cursor-pointer ${
              activeTab === "roadmap" ? "bg-indigo-600 text-white shadow-sm font-semibold" : "text-slate-500 hover:text-slate-900 hover:bg-slate-50"
            }`}
          >
            Career Roadmap
          </button>
          <button
            onClick={() => setActiveTab("resume")}
            className={`px-4 py-1.5 rounded-lg text-xs font-medium transition-all cursor-pointer ${
              activeTab === "resume" ? "bg-indigo-600 text-white shadow-sm font-semibold" : "text-slate-500 hover:text-slate-900 hover:bg-slate-50"
            }`}
          >
            Resume Copywriter
          </button>
        </div>
      </div>

      {/* RENDER TAB 1: ADVISOR CHAT */}
      {activeTab === "advisor" && (
        <div className="flex-1 flex flex-col justify-between overflow-hidden bg-white border border-slate-200 rounded-2xl p-4 shadow-sm">
          <div className="flex-grow overflow-y-auto space-y-4 mb-4 pr-1">
            {messages.map((msg, i) => (
              <div
                key={i}
                className={`flex gap-3 max-w-[80%] ${
                  msg.sender === "ai" ? "self-start" : "ml-auto flex-row-reverse"
                }`}
              >
                {msg.sender === "ai" && (
                  <div className="w-8 h-8 rounded-lg bg-indigo-50 border border-indigo-200 flex items-center justify-center text-indigo-600 shrink-0 shadow-sm">
                    <Sparkles className="w-4 h-4" />
                  </div>
                )}
                <div className={`p-3.5 rounded-2xl text-xs leading-relaxed ${
                  msg.sender === "ai"
                    ? "bg-slate-50 text-slate-700"
                    : "bg-indigo-50 border border-indigo-150 text-indigo-800"
                }`}>
                  <p>{msg.text}</p>
                  <span className="text-[8px] text-slate-400 block text-right mt-1.5 font-mono">{msg.time}</span>
                </div>
              </div>
            ))}
          </div>

          <div className="flex gap-2 pt-3 border-t border-slate-100">
            <input
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
              placeholder="Ask about resume updates, Stripe/Figma requirements, active pathways..."
              className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-none focus:bg-white focus:border-indigo-600 focus:ring-1 focus:ring-indigo-600 transition-colors"
            />
            <button
              onClick={handleSendMessage}
              className="px-4 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-semibold flex items-center gap-1 cursor-pointer shadow-sm"
            >
              <span>Send</span>
              <Send className="w-3 h-3" />
            </button>
          </div>
        </div>
      )}

      {/* RENDER TAB 2: CAREER ROADMAP */}
      {activeTab === "roadmap" && (
        <div className="flex-1 overflow-y-auto pr-1">
          <div className="grid md:grid-cols-3 gap-6 pb-6">
            <div className="md:col-span-2 space-y-4">
              <span className="text-[10px] text-slate-400 font-mono uppercase block font-semibold font-bold">Active Pathway Map</span>

              <div className="space-y-4">
                {generatedSteps.map((step, idx) => (
                  <div
                    key={step.id}
                    onClick={() => handleToggleRoadmapStep(step.id)}
                    className={`p-4 border rounded-2xl cursor-pointer transition-colors flex gap-4 ${
                      step.completed
                        ? "bg-indigo-50/40 border-indigo-300 ring-1 ring-indigo-300 shadow-sm"
                        : "bg-white border-slate-200 hover:border-slate-300 shadow-sm"
                    }`}
                  >
                    <span className="w-7 h-7 rounded-full bg-indigo-50 border border-indigo-150 text-indigo-600 font-mono text-xs flex items-center justify-center font-bold shrink-0 shadow-sm">
                      {idx + 1}
                    </span>
                    <div className="space-y-1">
                      <h4 className="text-slate-800 text-xs font-semibold font-display flex items-center gap-2">
                        <span>{step.title}</span>
                        {step.completed && (
                          <span className="text-emerald-700 text-[9px] font-mono border border-emerald-200 bg-emerald-50 px-1.5 py-0.5 rounded leading-none uppercase font-bold">COMPLETED</span>
                        )}
                      </h4>
                      <p className="text-slate-500 text-[11px] leading-relaxed">{step.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Actions / Configuration panel */}
            <div className="bg-white border border-slate-200 p-5 rounded-2xl h-fit space-y-4 shadow-sm">
              <span className="text-[10px] text-slate-400 font-mono uppercase block font-semibold font-bold">Assemble Roadmap Target</span>
              <div className="space-y-2">
                {["SaaS Product Architect", "Elite Frontend Builder", "Agentic System Engineer"].map((target) => (
                  <button
                    key={target}
                    onClick={() => {
                      setSelectedRoadmapTarget(target);
                      if (target === "Elite Frontend Builder") {
                        setGeneratedSteps([
                          { id: "f-1", title: "Master Virtual DOM List Windowing", desc: "Optimize responsive lists containing over 5,000 items with React virtual scroll strategies.", completed: true },
                          { id: "f-2", title: "Establish Semantic Variables mappings", desc: "Sync code contracts using Figma token compilers.", completed: false }
                        ]);
                      } else if (target === "SaaS Product Architect") {
                        setGeneratedSteps([
                          { id: "step-1", title: "Establish Semantic Design Tokens Hierarchy", desc: "Configure global theme variables inside Figma. Expose token JSON blocks and compile them dynamically using Tailwind CSS v4 themes.", completed: true },
                          { id: "step-2", title: "Master Concurrent React State Management", desc: "Build asynchronous transition states with React 19's useActionState hook to eliminate visual stuttering.", completed: false },
                          { id: "step-3", title: "Integrate Real-Time WebSocket Collaboration", desc: "Implement server-authoritative coordinate caching for high-throughput multi-user canvases.", completed: false }
                        ]);
                      } else {
                        setGeneratedSteps([
                          { id: "b-1", title: "Establish Cloud Firestore replication pipelines", desc: "Configure server-authoritative data syncing.", completed: false },
                          { id: "b-2", title: "Secure endpoint security gates with Auth mapping", desc: "Audit rules files parameters.", completed: false }
                        ]);
                      }
                    }}
                    className={`w-full text-left p-2.5 border rounded-xl text-xs transition-colors cursor-pointer ${
                      selectedRoadmapTarget === target
                        ? "bg-indigo-50 border-indigo-400 text-indigo-750 font-semibold"
                        : "bg-slate-50 border border-slate-200 text-slate-600 hover:text-slate-900 hover:bg-slate-100/80"
                    }`}
                  >
                    {target}
                  </button>
                ))}
              </div>

              <div className="bg-slate-50 p-3 rounded-xl border border-slate-200 space-y-2 text-[10px] text-slate-500">
                <span className="font-bold text-slate-800 uppercase block font-mono text-[9px]">Roadmap Completion Metrics</span>
                <p>Completing steps feeds directly into opportunity matcher filters, boosting profile compatibility by up to 18%.</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* RENDER TAB 3: RESUME COPYWRITER */}
      {activeTab === "resume" && (
        <div className="flex-1 overflow-y-auto pr-1">
          <div className="grid md:grid-cols-3 gap-6 pb-6">
            <div className="md:col-span-2 space-y-4">
              <span className="text-[10px] text-slate-400 font-mono uppercase block font-semibold font-bold">Active Resume Grade: {resumeGrade}/100</span>

              <div className="space-y-4">
                {gradesList.map((grade, idx) => (
                  <div key={idx} className="p-4 bg-white border border-slate-200 rounded-2xl space-y-3 shadow-sm">
                    <div className="flex justify-between items-center text-xs">
                      <span className="font-semibold text-slate-800 font-display">{grade.metric}</span>
                      <span className="font-mono text-indigo-650 font-bold">{grade.score}% Grade</span>
                    </div>

                    <div className="h-1.5 bg-slate-100 rounded-full overflow-hidden">
                      <div className="h-full bg-indigo-600 rounded-full" style={{ width: `${grade.score}%` }} />
                    </div>

                    <div className="bg-emerald-50 border border-emerald-100 p-3 rounded-xl text-xs text-emerald-800">
                      <span className="text-[9px] font-mono block font-bold mb-1 uppercase text-emerald-700">AI Copywriter Replacement</span>
                      <p className="italic leading-relaxed">"{grade.hint}"</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white border border-slate-200 p-5 rounded-2xl h-fit space-y-4 text-xs text-slate-500 shadow-sm">
              <span className="text-[10px] text-slate-400 font-mono uppercase block font-semibold font-bold">Resume Analysis Logs</span>
              <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl space-y-2 text-slate-650">
                <p>Uploaded file: <strong className="text-slate-800 font-semibold">{userProfile.resumeUrl || "abhishek_resume.pdf"}</strong></p>
                <p>Matched Category: <strong className="text-slate-800 font-semibold font-medium">Full-Stack Design Engineer</strong></p>
              </div>

              <p className="leading-relaxed">Adding outcome metrics instead of task lists instantly catches the attention of technical screening managers at companies like Linear and Vercel.</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
