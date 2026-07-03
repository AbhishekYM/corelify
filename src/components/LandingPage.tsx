import React, { useState, useRef, useEffect } from "react";
import { 
  Sparkles, ArrowRight, Star, BookOpen, UserCheck, Briefcase, Award, GraduationCap, 
  ArrowUpRight, HelpCircle, ChevronDown, ChevronRight, Check, Play, Calendar, Users, 
  DollarSign, ShieldAlert, LayoutGrid, Code, Anchor, PieChart, Umbrella, Heart, 
  Palette, Layout, Smartphone, Box, TrendingUp, Layers, Megaphone, Gamepad2, 
  Compass, Binary, Cpu, MousePointerClick, Brush, Apple, Search
} from "lucide-react";
import { motion } from "motion/react";
import { useNavigate } from "react-router-dom";
import { INITIAL_COURSES, INITIAL_MENTORS, INITIAL_OPPORTUNITIES, INITIAL_WORKSHOPS, INITIAL_SCHOLARSHIPS } from "../data";

interface SubCategory {
  id: string;
  name: string;
  icon: React.ComponentType<any>;
}

interface MainCategory {
  id: string;
  name: string;
  icon: React.ComponentType<any>;
  subcategories?: SubCategory[];
}

const mainCategories: MainCategory[] = [
  {
    id: "development",
    name: "Development",
    icon: Code,
    subcategories: [
      { id: "web-dev", name: "Web Development", icon: Layout },
      { id: "mobile-dev", name: "Mobile Development", icon: Smartphone },
      { id: "game-dev", name: "Game Development", icon: Box },
    ]
  },
  {
    id: "business",
    name: "Business",
    icon: Anchor,
    subcategories: [
      { id: "finance", name: "Finance & Accounting", icon: DollarSign },
      { id: "strategy", name: "Business Strategy", icon: TrendingUp },
      { id: "product-mgmt", name: "Product Management", icon: Layers },
    ]
  },
  {
    id: "marketing",
    name: "Marketing",
    icon: PieChart,
    subcategories: [
      { id: "digital-marketing", name: "Digital Marketing", icon: Megaphone },
      { id: "seo", name: "SEO & Content Strategy", icon: Search },
    ]
  },
  {
    id: "lifestyle",
    name: "Lifestyle",
    icon: Umbrella,
    subcategories: [
      { id: "gaming", name: "Gaming & Esports", icon: Gamepad2 },
      { id: "travel", name: "Travel & Leisure", icon: Compass },
    ]
  },
  {
    id: "health-fitness",
    name: "Health & Fitness",
    icon: Heart,
    subcategories: [
      { id: "yoga", name: "Yoga & Mindfulness", icon: Sparkles },
      { id: "nutrition", name: "Nutrition & Dietetics", icon: Apple },
    ]
  },
  {
    id: "academics",
    name: "Academics",
    icon: GraduationCap,
    subcategories: [
      { id: "math", name: "Mathematics & Logic", icon: Binary },
      { id: "science", name: "Science & Technology", icon: Cpu },
    ]
  },
  {
    id: "design",
    name: "Design",
    icon: Palette,
    subcategories: [
      { id: "ui-ux", name: "UI/UX Design", icon: MousePointerClick },
      { id: "graphic", name: "Graphic Design", icon: Brush },
    ]
  }
];

interface LandingPageProps {
  onEnterApp?: (initialView?: string) => void;
  onViewCaseStudy: () => void;
}

export default function LandingPage({ onEnterApp, onViewCaseStudy }: LandingPageProps) {
  const navigate = useNavigate();
  // Categories menu states
  const [isCategoriesOpen, setIsCategoriesOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState<MainCategory | null>(mainCategories[0]);
  const categoriesDropdownRef = useRef<HTMLDivElement>(null);

  // Close categories on click outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (categoriesDropdownRef.current && !categoriesDropdownRef.current.contains(event.target as Node)) {
        setIsCategoriesOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleCategorySelect = (categoryId: string, subCategoryId?: string) => {
    setIsCategoriesOpen(false);
    if (subCategoryId) {
      navigate(`/category/${categoryId}/${subCategoryId}`);
    } else {
      navigate(`/category/${categoryId}`);
    }
  };

  const handleEnterApp = () => {
    if (onEnterApp) {
      onEnterApp();
    } else {
      navigate('/student/login');
    }
  };

  // AI assistant state
  const [aiSkill, setAiSkill] = useState("Product Designer");
  const [aiOutput, setAiOutput] = useState({
    matchScore: 92,
    gap: "Needs advanced Design Token knowledge and React 19 concurrent state hooks.",
    roadmap: ["Week 1: Master Figma semantic variables", "Week 2: Advanced React state and motion transition hooks", "Week 3: Complete a comprehensive portfolio project"],
    resumeFix: "Elevate technical detail. Replace 'Designed UI' with 'Engineered centralized design tokens, reducing developer handoff latency by 45%.'",
  });

  // Billing interval
  const [billingPeriod, setBillingPeriod] = useState<"monthly" | "yearly">("yearly");

  // Accordion active index
  const [activeFaq, setActiveFaq] = useState<number | null>(0);

  const handleAiSimulate = (role: string) => {
    setAiSkill(role);
    if (role === "Frontend Engineer") {
      setAiOutput({
        matchScore: 88,
        gap: "Struggles with advanced state management (Zustand, Redux) and rendering optimizations.",
        roadmap: ["Week 1: React 19 Concurrent Features", "Week 2: Deep dive: Client-side routing and cache controls", "Week 3: Optimize large data lists using virtual window scrolls"],
        resumeFix: "Replace 'Wrote React components' with 'Architected robust concurrent render wrappers, boosting dashboard response speed by 35%.'",
      });
    } else if (role === "Product Designer") {
      setAiOutput({
        matchScore: 94,
        gap: "Needs advanced Design Token knowledge and React 19 concurrent state hooks.",
        roadmap: ["Week 1: Master Figma semantic variables", "Week 2: Advanced React state and motion transition hooks", "Week 3: Complete a comprehensive portfolio project"],
        resumeFix: "Elevate technical detail. Replace 'Designed UI' with 'Engineered centralized design tokens, reducing developer handoff latency by 45%.'",
      });
    } else {
      setAiOutput({
        matchScore: 75,
        gap: "Significant gap in system design concepts, database replication, and message queues.",
        roadmap: ["Week 1: SQL and relational databases", "Week 2: Microservice design and asynchronous protocols", "Week 3: Deploy resilient pipelines on container architectures"],
        resumeFix: "Replace 'Set up Node.js server' with 'Engineered high-throughput containerized microservices handling 15,000 requests per minute.'",
      });
    }
  };

  const faqs = [
    {
      q: "What makes Corelify different from LinkedIn or Coursera?",
      a: "Corelify couples educational pathways with active mentors and direct application portals under a single cohesive dashboard. Instead of collecting certificates that lead nowhere, our AI continuously measures your portfolio quality and suggests exact next-steps to match live jobs.",
    },
    {
      q: "Can I connect my current portfolio or resume?",
      a: "Yes! You can instantly upload your PDF resume, link projects, research papers, awards, or custom URLs. Corelify parses your skills and maps your personalized career match score instantly.",
    },
    {
      q: "How does the mentor matching process work?",
      a: "You can search or filter through hundreds of staff-level designers, PMs, and software directors. Review their transparent calendar availability, pick a suitable time, and book high-impact 1:1 consultation calls seamlessly.",
    },
    {
      q: "Is there a fee for finding jobs and scholarships?",
      a: "No! Accessing and applying to jobs, internships, workshops, and scholarships is completely free. Premium memberships unlock unlimited 1:1 mentor mappings and advanced AI roadmap generation.",
    },
  ];

  return (
    <div className="bg-[#F8FAFC] text-slate-800 min-h-screen relative overflow-x-hidden font-sans">
      {/* Absolute Background Ambient Glows */}
      <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-indigo-100/40 rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute top-[1200px] right-0 w-[500px] h-[500px] bg-violet-100/30 rounded-full blur-[130px] pointer-events-none" />
      <div className="absolute bottom-[800px] left-10 w-[400px] h-[400px] bg-emerald-100/20 rounded-full blur-[120px] pointer-events-none" />

      {/* Global Navigation Header */}
      <header className="sticky top-0 z-50 bg-[#F8FAFC]/80 backdrop-blur-md border-b border-slate-200/80 px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-5">
            <div className="flex items-center gap-3">
              <img
                src="https://corelify.io/store/1/CORELIFY%20LOGO.png"
                alt="Corelify Logo"
                className="h-8 w-auto cursor-pointer"
                onClick={() => navigate('/')}
              />
            </div>

            {/* Categories trigger with side flyout sub-menu */}
            <div className="relative" ref={categoriesDropdownRef}>
              <button
                onClick={() => {
                  setIsCategoriesOpen(!isCategoriesOpen);
                  if (!isCategoriesOpen && mainCategories.length > 0) {
                    setActiveCategory(mainCategories[0]);
                  }
                }}
                className={`px-3 py-1.5 rounded-xl border text-xs font-semibold flex items-center gap-1.5 cursor-pointer transition-all shadow-sm ${
                  isCategoriesOpen
                    ? "bg-indigo-50 border-indigo-200 text-indigo-700"
                    : "bg-white border-slate-200/80 hover:bg-slate-50 text-slate-700"
                }`}
              >
                <LayoutGrid className="w-3.5 h-3.5 text-slate-500" />
                <span>Categories</span>
                <ChevronDown className={`w-3 h-3 text-slate-400 transition-transform duration-200 ${isCategoriesOpen ? "rotate-180" : ""}`} />
              </button>

              {/* Main Dropdown Panel */}
              {isCategoriesOpen && (
                <div className="absolute top-12 left-0 w-56 bg-white border border-slate-200/90 rounded-2xl shadow-xl p-1.5 z-50 flex flex-col select-none">
                  {mainCategories.map((cat) => {
                    const CatIcon = cat.icon;
                    const hasSub = cat.subcategories && cat.subcategories.length > 0;
                    const isHovered = activeCategory?.id === cat.id;

                    return (
                      <div
                        key={cat.id}
                        onMouseEnter={() => {
                          if (hasSub) {
                            setActiveCategory(cat);
                          } else {
                            setActiveCategory(null);
                          }
                        }}
                        onClick={() => {
                          handleCategorySelect(cat.id);
                        }}
                        className={`w-full px-3 py-2.5 rounded-xl flex items-center justify-between text-xs font-medium transition-colors cursor-pointer ${
                          isHovered
                            ? "bg-indigo-50 text-indigo-700"
                            : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                        }`}
                      >
                        <div className="flex items-center gap-2.5">
                          <CatIcon className={`w-4 h-4 ${isHovered ? "text-indigo-600" : "text-slate-400"}`} />
                          <span>{cat.name}</span>
                        </div>
                        {hasSub && (
                          <ChevronRight className={`w-3.5 h-3.5 ${isHovered ? "text-indigo-600" : "text-slate-400"}`} />
                        )}
                      </div>
                    );
                  })}

                  {/* Flyout Submenu Panel */}
                  {activeCategory && activeCategory.subcategories && activeCategory.subcategories.length > 0 && (
                    <div className="absolute left-[228px] top-0 w-60 bg-white border border-slate-200/90 rounded-2xl shadow-xl p-2 z-50 flex flex-col animate-in fade-in duration-150">
                      <div className="px-3 py-1 pb-2 border-b border-slate-100 mb-1.5">
                        <span className="text-[9px] font-mono font-bold text-indigo-600 uppercase tracking-wider">
                          {activeCategory.name} Subcategories
                        </span>
                      </div>

                      {activeCategory.subcategories.map((sub) => {
                        const SubIcon = sub.icon;
                        return (
                          <div
                            key={sub.id}
                            onClick={(e) => { e.stopPropagation(); handleCategorySelect(activeCategory.id, sub.id); }}
                            className="w-full px-3 py-2 rounded-lg flex items-center gap-2.5 text-xs text-slate-600 hover:bg-indigo-50 hover:text-indigo-700 transition-colors cursor-pointer font-medium"
                          >
                            <SubIcon className="w-3.5 h-3.5 text-slate-400" />
                            <span>{sub.name}</span>
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* Desktop Nav Items */}
          <nav className="hidden md:flex items-center gap-8 text-xs font-medium text-slate-600">
            <a href="#ai-assistant" className="hover:text-indigo-600 transition-colors">AI Assistant</a>
            <a href="#featured" className="hover:text-indigo-600 transition-colors">Ecosystem</a>
            <a href="#how-it-works" className="hover:text-indigo-600 transition-colors">How it Works</a>
            <a href="#pricing" className="hover:text-indigo-600 transition-colors">Pricing</a>
            <a href="#faq" className="hover:text-indigo-600 transition-colors">FAQ</a>
          </nav>

          <div className="flex items-center gap-3">
            <button
              onClick={() => navigate('/student/login')}
              className="px-4 py-2 bg-white hover:bg-slate-50 text-slate-700 text-xs font-medium rounded-xl border border-slate-200 transition-colors cursor-pointer"
            >
              Login
            </button>
            <button
              onClick={() => navigate('/student/register')}
              className="px-4 py-2 bg-white hover:bg-slate-50 text-slate-700 text-xs font-medium rounded-xl border border-slate-200 transition-colors cursor-pointer"
            >
              Register
            </button>
            <button
              onClick={onViewCaseStudy}
              className="px-4 py-2 bg-white hover:bg-slate-50 text-slate-700 text-xs font-medium rounded-xl border border-slate-200 transition-colors cursor-pointer"
            >
              UX Case Study
            </button>
            <button
              onClick={handleEnterApp}
              className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-medium rounded-xl transition-all shadow-md flex items-center gap-1.5 cursor-pointer"
            >
              Start Learning
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative px-6 pt-16 pb-20 md:pt-24 md:pb-32 text-center max-w-5xl mx-auto">
        <div className="inline-flex items-center gap-2 bg-indigo-50 border border-indigo-200/60 px-3 py-1 rounded-full text-indigo-700 font-mono text-[10px] uppercase mb-6 tracking-wider font-semibold">
          <Sparkles className="w-3 h-3" />
          <span>The Next Generation Career Ecosystem</span>
        </div>

        <h1 className="text-4xl md:text-6xl font-display font-bold text-slate-900 tracking-tight leading-tight max-w-4xl mx-auto mb-6">
          Accelerate your digital craft with{" "}
          <span className="bg-gradient-to-r from-indigo-600 via-violet-600 to-emerald-600 bg-clip-text text-transparent">
            intelligent mentorship
          </span>{" "}
          and real opportunities.
        </h1>

        <p className="text-slate-500 text-sm md:text-base max-w-2xl mx-auto leading-relaxed mb-10">
          A premium unified ecosystem combining courses, direct mentorship, internships, scholarships, and portfolio builder powered by contextual AI suggestions. Built for modern software builders and product designers.
        </p>

        <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
          <button
            onClick={handleEnterApp}
            className="w-full sm:w-auto px-6 py-3.5 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-medium rounded-xl transition-all shadow-lg flex items-center justify-center gap-2 cursor-pointer"
          >
            Launch Interactive Prototype
            <ArrowRight className="w-4 h-4" />
          </button>
          <button
            onClick={onViewCaseStudy}
            className="w-full sm:w-auto px-6 py-3.5 bg-white hover:bg-slate-50 text-slate-700 text-sm font-medium rounded-xl border border-slate-200 transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-sm"
          >
            Explore Design Case Study
          </button>
        </div>

        {/* Dashboard Preview Render */}
        <div className="mt-16 md:mt-20 border border-slate-200 rounded-2xl bg-white p-2 shadow-2xl relative">
          <div className="absolute top-0 right-1/4 w-32 h-32 bg-indigo-100/40 rounded-full blur-2xl" />
          <div className="bg-slate-50 rounded-xl overflow-hidden aspect-video border border-slate-200 flex flex-col">
            {/* Simulation Header */}
            <div className="border-b border-slate-200 bg-slate-100 px-4 py-2 flex items-center justify-between">
              <div className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded-full bg-red-400" />
                <span className="w-3 h-3 rounded-full bg-yellow-400" />
                <span className="w-3 h-3 rounded-full bg-green-400" />
                <span className="text-[10px] text-slate-500 font-mono ml-2">LUMINA-WORKSPACE-PROTOTYPE_v1.03.ms</span>
              </div>
              <div className="w-1/3 bg-white h-5 rounded-md border border-slate-200 text-[10px] text-slate-400 flex items-center justify-center font-mono">
                workspace.lumina.io/dashboard
              </div>
              <div className="w-10" />
            </div>

            {/* Simulated Workspace layout preview */}
            <div className="flex-1 flex text-left text-xs text-slate-600 font-sans">
              <div className="w-1/4 border-r border-slate-200 bg-slate-100/60 p-4 space-y-4 hidden sm:block">
                <div className="w-full h-8 bg-indigo-50 border border-indigo-250 rounded-lg flex items-center px-2 text-indigo-700 font-medium">
                  Workspace Home
                </div>
                <div className="space-y-2 text-[10px]">
                  <div className="h-4 bg-slate-200 rounded w-4/5" />
                  <div className="h-4 bg-slate-200 rounded w-2/3" />
                  <div className="h-4 bg-slate-200 rounded w-3/4" />
                </div>
              </div>
              <div className="flex-1 p-6 space-y-6 overflow-y-auto bg-white">
                <div className="flex justify-between items-center">
                  <div>
                    <h3 className="text-slate-800 font-display font-semibold text-sm">Welcome back, Abhishek Makwana</h3>
                    <p className="text-[10px] text-slate-400">Continuous Profile match rating is live &bull; 94% compatibility</p>
                  </div>
                  <span className="px-2.5 py-1 bg-emerald-50 text-emerald-700 border border-emerald-150 rounded-full font-mono text-[9px] font-bold">
                    94% MATCH RATING
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-2">
                    <span className="text-[10px] text-slate-400 uppercase block font-mono">Learning Progress</span>
                    <div className="h-2 bg-slate-200 rounded-full overflow-hidden">
                      <div className="w-[45%] h-full bg-indigo-600" />
                    </div>
                    <span className="text-[9px] text-slate-500">45% of Product Design Strategy</span>
                  </div>
                  <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-2">
                    <span className="text-[10px] text-slate-400 uppercase block font-mono">Booked Mentorships</span>
                    <p className="text-slate-700 font-medium text-[10px]">Alex Rivera &bull; Stripe</p>
                    <span className="text-[9px] text-slate-400">Upcoming session: Thurs 3:00 PM</span>
                  </div>
                  <div className="bg-indigo-50 p-4 rounded-xl border border-indigo-200 relative overflow-hidden flex flex-col justify-between">
                    <div className="absolute top-0 right-0 w-12 h-12 bg-indigo-500/10 rounded-full blur-xl" />
                    <span className="text-[10px] text-indigo-700 uppercase font-mono block font-bold">AI SUGGESTION</span>
                    <p className="text-indigo-900 text-[10px] leading-relaxed">Your resume lacks Figma variables. Enroll in Lesson 5 of Product Design.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* AI Career Assistant Simulator Section */}
      <section id="ai-assistant" className="px-6 py-20 bg-white border-t border-b border-slate-200 relative">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-5 gap-12 items-center">
            <div className="md:col-span-2 space-y-6">
              <div className="inline-flex items-center gap-2 bg-violet-50 border border-violet-200 px-3 py-1 rounded-full text-violet-700 font-mono text-[10px] uppercase font-bold">
                <Sparkles className="w-3 h-3" />
                <span>INTELLIGENT PROFILE MATCHING</span>
              </div>
              <h2 className="text-3xl md:text-4xl font-display font-bold text-slate-900 tracking-tight">
                Simulate your contextual career match score.
              </h2>
              <p className="text-slate-500 text-xs leading-relaxed">
                Click on the target profiles below to see how our embedded AI assistant scans skill gaps, maps custom learning roadmaps, and instantly rewrites generic achievements into premium metrics.
              </p>

              <div className="space-y-2">
                <span className="text-[10px] text-slate-400 font-mono uppercase block">Select Profile Template</span>
                <div className="flex flex-wrap gap-2">
                  <button
                    onClick={() => handleAiSimulate("Product Designer")}
                    className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition-colors cursor-pointer ${
                      aiSkill === "Product Designer"
                        ? "bg-indigo-55 text-indigo-700 border-indigo-300 bg-indigo-50"
                        : "bg-slate-50 text-slate-600 border-slate-200 hover:text-slate-800 hover:border-slate-350"
                    }`}
                  >
                    Product Designer
                  </button>
                  <button
                    onClick={() => handleAiSimulate("Frontend Engineer")}
                    className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition-colors cursor-pointer ${
                      aiSkill === "Frontend Engineer"
                        ? "bg-indigo-55 text-indigo-700 border-indigo-300 bg-indigo-50"
                        : "bg-slate-50 text-slate-600 border-slate-200 hover:text-slate-800 hover:border-slate-350"
                    }`}
                  >
                    Frontend Engineer
                  </button>
                  <button
                    onClick={() => handleAiSimulate("Backend Engineer")}
                    className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition-colors cursor-pointer ${
                      aiSkill === "Backend Engineer"
                        ? "bg-indigo-55 text-indigo-700 border-indigo-300 bg-indigo-50"
                        : "bg-slate-50 text-slate-600 border-slate-200 hover:text-slate-800 hover:border-slate-350"
                    }`}
                  >
                    Backend Architect
                  </button>
                </div>
              </div>
            </div>

            {/* AI Output Window */}
            <div className="md:col-span-3 bg-slate-50 border border-slate-200 rounded-2xl p-6 shadow-lg relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/5 rounded-full blur-2xl" />
              <div className="flex justify-between items-center border-b border-slate-200 pb-4 mb-4">
                <div className="flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-indigo-600" />
                  <span className="font-display font-medium text-xs text-slate-800">Corelify AI Copilot</span>
                </div>
                <div className="flex items-center gap-1.5 bg-indigo-50 px-2.5 py-0.5 rounded-full border border-indigo-150">
                  <span className="font-mono text-[10px] text-indigo-700 font-bold">{aiOutput.matchScore}% Compatibility</span>
                </div>
              </div>

              <div className="space-y-4 text-xs">
                <div>
                  <span className="text-[10px] text-slate-400 font-mono uppercase block mb-1">Skill Gap Analysis</span>
                  <p className="text-slate-700 leading-relaxed bg-white p-2.5 rounded-lg border border-slate-200">{aiOutput.gap}</p>
                </div>

                <div>
                  <span className="text-[10px] text-slate-400 font-mono uppercase block mb-1">Recommended Learning Pathway</span>
                  <div className="space-y-1.5">
                    {aiOutput.roadmap.map((item, idx) => (
                      <div key={idx} className="flex items-center gap-2 text-slate-600 text-xs">
                        <Check className="w-3.5 h-3.5 text-indigo-600 shrink-0" />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <span className="text-[10px] text-slate-400 font-mono uppercase block mb-1">Resume Copywriter Upgrade</span>
                  <div className="bg-emerald-50 border border-emerald-150 text-emerald-800 p-2.5 rounded-lg">
                    <span className="text-[9px] font-mono block uppercase text-emerald-600 font-bold mb-1">AI ENHANCED SENTENCE:</span>
                    <p className="italic">"{aiOutput.resumeFix}"</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Modules Carousel */}
      <section id="featured" className="px-6 py-20 max-w-7xl mx-auto space-y-16">
        <div className="text-center space-y-4 max-w-3xl mx-auto">
          <span className="text-indigo-600 font-mono text-[10px] uppercase block tracking-widest font-semibold">ECOSYSTEM OVERVIEW</span>
          <h2 className="text-3xl md:text-4xl font-display font-bold text-slate-900 tracking-tight">One unified platform. Zero friction.</h2>
          <p className="text-slate-500 text-xs">Browse the interactive showcase of active courses, top staff mentors, and real career roles open inside the Corelify workspace.</p>
        </div>

        {/* Courses Gallery */}
        <div className="space-y-6">
          <div className="flex items-center justify-between border-b border-slate-200 pb-3">
            <h3 className="font-display font-medium text-slate-800 flex items-center gap-2">
              <BookOpen className="w-4 h-4 text-indigo-600" />
              <span>Premium Courses</span>
            </h3>
            <span className="text-slate-450 text-[10px] font-mono">3 Live in Sandbox</span>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {INITIAL_COURSES.map((course) => (
              <div key={course.id} className="bg-white border border-slate-200 rounded-2xl overflow-hidden flex flex-col justify-between shadow-sm">
                <div>
                  <img src={course.image} alt={course.title} className="w-full h-40 object-cover border-b border-slate-200" />
                  <div className="p-5 space-y-2">
                    <div className="flex justify-between items-center text-[10px] font-mono text-slate-400">
                      <span>{course.provider}</span>
                      <span className="px-1.5 py-0.5 bg-indigo-50 text-indigo-700 border border-indigo-150 rounded font-bold">
                        {course.level}
                      </span>
                    </div>
                    <h4 className="text-slate-800 font-display font-semibold text-sm line-clamp-1">{course.title}</h4>
                    <p className="text-slate-500 text-xs line-clamp-2 leading-relaxed">{course.description}</p>
                  </div>
                </div>
                <div className="px-5 pb-5 pt-2 border-t border-slate-100 flex items-center justify-between">
                  <div className="flex items-center gap-1">
                    <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
                    <span className="text-slate-700 text-xs font-semibold">{course.rating}</span>
                  </div>
                  <button
                    onClick={handleEnterApp}
                    className="text-xs text-indigo-600 font-semibold flex items-center gap-1 hover:text-indigo-750 cursor-pointer"
                  >
                    <span>View Curriculum</span>
                    <ArrowUpRight className="w-3 h-3" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Mentors Showcase */}
        <div className="space-y-6">
          <div className="flex items-center justify-between border-b border-slate-200 pb-3">
            <h3 className="font-display font-medium text-slate-800 flex items-center gap-2">
              <UserCheck className="w-4 h-4 text-indigo-600" />
              <span>Top Staff Mentors</span>
            </h3>
            <span className="text-slate-450 text-[10px] font-mono">Real-time Stripe/Figma talent</span>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {INITIAL_MENTORS.map((mentor) => (
              <div key={mentor.id} className="bg-white border border-slate-200 rounded-2xl p-5 flex flex-col justify-between h-64 shadow-sm">
                <div className="space-y-4">
                  <div className="flex gap-4 items-center">
                    <img src={mentor.image} alt={mentor.name} className="w-12 h-12 rounded-xl object-cover border border-slate-200 shrink-0" />
                    <div>
                      <h4 className="text-slate-800 font-display font-semibold text-xs leading-none">{mentor.name}</h4>
                      <p className="text-indigo-600 text-[10px] font-mono mt-1">{mentor.role}</p>
                      <p className="text-slate-400 text-[10px] mt-0.5">{mentor.company}</p>
                    </div>
                  </div>
                  <p className="text-slate-500 text-xs line-clamp-2 leading-relaxed">{mentor.bio}</p>
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-slate-100">
                  <div className="flex items-center gap-1">
                    <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
                    <span className="text-slate-700 text-xs font-semibold">{mentor.rating}</span>
                    <span className="text-slate-400 text-[10px]">({mentor.reviewsCount})</span>
                  </div>
                  <button
                    onClick={handleEnterApp}
                    className="px-3 py-1 bg-indigo-50 text-indigo-700 text-xs font-semibold border border-indigo-150 rounded-lg hover:bg-indigo-600 hover:text-white transition-all cursor-pointer"
                  >
                    Book Session
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Jobs & Internships Showcase */}
        <div className="space-y-6">
          <div className="flex items-center justify-between border-b border-slate-200 pb-3">
            <h3 className="font-display font-medium text-slate-800 flex items-center gap-2">
              <Briefcase className="w-4 h-4 text-indigo-600" />
              <span>Featured Opportunities</span>
            </h3>
            <span className="text-slate-450 text-[10px] font-mono">Live remote listings</span>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {INITIAL_OPPORTUNITIES.map((opp) => (
              <div key={opp.id} className="bg-white border border-slate-200 rounded-2xl p-5 flex items-start gap-4 shadow-sm">
                <img src={opp.logo} alt={opp.company} className="w-12 h-12 rounded-xl object-cover border border-slate-200 shrink-0" />
                <div className="flex-1 space-y-3">
                  <div className="flex justify-between items-start gap-2">
                    <div>
                      <h4 className="text-slate-800 font-display font-semibold text-sm leading-tight">{opp.title}</h4>
                      <p className="text-slate-400 text-xs mt-0.5">{opp.company} &bull; {opp.location}</p>
                    </div>
                    <span className="px-2 py-0.5 bg-indigo-50 text-indigo-750 border border-indigo-150 rounded font-mono text-[9px] font-bold uppercase">
                      {opp.type}
                    </span>
                  </div>
                  <p className="text-slate-500 text-xs line-clamp-1 leading-relaxed">{opp.description}</p>
                  <div className="flex flex-wrap gap-1.5">
                    {opp.skillsRequired.slice(0, 3).map((s) => (
                      <span key={s} className="px-2 py-0.5 bg-slate-50 text-slate-500 rounded-full font-mono text-[9px] border border-slate-200">
                        {s}
                      </span>
                    ))}
                  </div>
                  <div className="flex justify-between items-center pt-2 border-t border-slate-100 text-xs">
                    <span className="text-slate-800 font-bold font-mono">{opp.stipendOrSalary}</span>
                    <button
                      onClick={handleEnterApp}
                      className="text-indigo-600 font-semibold flex items-center gap-1 hover:text-indigo-750 cursor-pointer"
                    >
                      <span>Instant Apply</span>
                      <ArrowRight className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Scholarships & Workshops Inline Showcase */}
        <div className="grid md:grid-cols-2 gap-8">
          {/* Workshops mini */}
          <div className="space-y-4">
            <h4 className="font-display font-semibold text-slate-800 flex items-center gap-2 border-b border-slate-200 pb-2 text-xs uppercase font-mono tracking-wider">
              <Calendar className="w-4 h-4 text-indigo-600" />
              <span>Interactive Workshops</span>
            </h4>
            <div className="space-y-4">
              {INITIAL_WORKSHOPS.slice(0, 2).map((w) => (
                <div key={w.id} className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex justify-between items-center">
                  <div>
                    <h5 className="text-slate-800 text-xs font-semibold leading-tight">{w.title}</h5>
                    <p className="text-slate-400 text-[10px] mt-0.5">{w.date} &bull; {w.time}</p>
                  </div>
                  <button
                    onClick={handleEnterApp}
                    className="px-2.5 py-1 bg-indigo-600 hover:bg-indigo-700 text-white text-[10px] font-semibold rounded cursor-pointer"
                  >
                    Register
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Scholarships mini */}
          <div className="space-y-4">
            <h4 className="font-display font-semibold text-slate-800 flex items-center gap-2 border-b border-slate-200 pb-2 text-xs uppercase font-mono tracking-wider">
              <GraduationCap className="w-4 h-4 text-indigo-600" />
              <span>Active Grants & Scholarships</span>
            </h4>
            <div className="space-y-4">
              {INITIAL_SCHOLARSHIPS.slice(0, 2).map((s) => (
                <div key={s.id} className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex justify-between items-center">
                  <div>
                    <h5 className="text-slate-800 text-xs font-semibold leading-tight">{s.title}</h5>
                    <p className="text-indigo-600 text-[10px] font-mono font-bold mt-0.5">{s.amount}</p>
                  </div>
                  <button
                    onClick={handleEnterApp}
                    className="px-2.5 py-1 bg-indigo-50 border border-indigo-200 text-indigo-700 text-[10px] font-semibold rounded hover:bg-indigo-600 hover:text-white transition-colors cursor-pointer"
                  >
                    Eligibility
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="px-6 py-20 bg-slate-100/50 border-t border-b border-slate-200">
        <div className="max-w-7xl mx-auto space-y-12">
          <div className="text-center space-y-3">
            <span className="text-indigo-600 font-mono text-[10px] uppercase block tracking-wider font-semibold">PROCESS METHODOLOGY</span>
            <h2 className="text-3xl font-display font-bold text-slate-900 tracking-tight">Three steps to your dream role</h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="space-y-3 p-6 bg-white rounded-2xl border border-slate-200 shadow-sm relative">
              <span className="w-8 h-8 rounded-full bg-indigo-50 border border-indigo-200 text-indigo-700 font-mono text-xs flex items-center justify-center font-bold">1</span>
              <h3 className="text-slate-800 font-display font-semibold text-sm">Build Unified Portfolio</h3>
              <p className="text-slate-500 text-xs leading-relaxed">Connect your PDF resume and upload previous projects. Our AI instantly parses and indexes your profile capability matrix.</p>
            </div>
            <div className="space-y-3 p-6 bg-white rounded-2xl border border-slate-200 shadow-sm relative">
              <span className="w-8 h-8 rounded-full bg-indigo-50 border border-indigo-200 text-indigo-700 font-mono text-xs flex items-center justify-center font-bold">2</span>
              <h3 className="text-slate-800 font-display font-semibold text-sm">Review & Close Skill Gaps</h3>
              <p className="text-slate-500 text-xs leading-relaxed">Schedule calendar consultations with staff mentors from Stripe and Figma. Close target skill gaps using mapped micro lessons.</p>
            </div>
            <div className="space-y-3 p-6 bg-white rounded-2xl border border-slate-200 shadow-sm relative">
              <span className="w-8 h-8 rounded-full bg-indigo-50 border border-indigo-200 text-indigo-700 font-mono text-xs flex items-center justify-center font-bold">3</span>
              <h3 className="text-slate-800 font-display font-semibold text-sm">Apply & Track Kanban</h3>
              <p className="text-slate-500 text-xs leading-relaxed">Submit verified, AI-vetted applications directly. Monitor real-time feedback with our interactive interview pipeline boards.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Student Success Stories & Statistics */}
      <section className="px-6 py-20 max-w-7xl mx-auto space-y-16">
        <div className="grid md:grid-cols-5 gap-12 items-center">
          <div className="md:col-span-2 space-y-6">
            <span className="text-indigo-600 font-mono text-[10px] uppercase block tracking-wider font-semibold">GLOBAL STATISTICS</span>
            <h2 className="text-3xl font-display font-bold text-slate-900 tracking-tight">Proven results from active craft builders</h2>
            <div className="grid grid-cols-2 gap-6 pt-4">
              <div className="space-y-1">
                <span className="text-3xl font-display font-bold text-slate-800 block">14,200+</span>
                <span className="text-slate-400 text-[10px] uppercase block font-mono">Enrolled Students</span>
              </div>
              <div className="space-y-1">
                <span className="text-3xl font-display font-bold text-slate-800 block">94.8%</span>
                <span className="text-slate-400 text-[10px] uppercase block font-mono">Job Placement Rate</span>
              </div>
              <div className="space-y-1">
                <span className="text-3xl font-display font-bold text-slate-800 block">$12,400</span>
                <span className="text-slate-400 text-[10px] uppercase block font-mono">Avg Salary Bump</span>
              </div>
              <div className="space-y-1">
                <span className="text-3xl font-display font-bold text-slate-800 block">230+</span>
                <span className="text-slate-400 text-[10px] uppercase block font-mono">Staff Level Mentors</span>
              </div>
            </div>
          </div>

          <div className="md:col-span-3 grid sm:grid-cols-2 gap-6">
            {/* Review 1 */}
            <div className="bg-white border border-slate-200 shadow-sm p-6 rounded-2xl relative">
              <div className="flex gap-1.5 text-amber-500 mb-4">
                <Star className="w-3.5 h-3.5 fill-amber-500" /><Star className="w-3.5 h-3.5 fill-amber-500" /><Star className="w-3.5 h-3.5 fill-amber-500" /><Star className="w-3.5 h-3.5 fill-amber-500" /><Star className="w-3.5 h-3.5 fill-amber-500" />
              </div>
              <p className="text-slate-600 text-xs italic leading-relaxed mb-4">
                "The 1:1 sessions with Alex completely rebuilt how I pitch my portfolio. Applied to Figma last month and just accepted my dream design offer!"
              </p>
              <div className="flex gap-3 items-center">
                <img src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=80" alt="Student" className="w-10 h-10 rounded-full object-cover border border-slate-200 shrink-0" />
                <div>
                  <h5 className="text-slate-800 text-xs font-semibold">Sophia Lin</h5>
                  <span className="text-slate-400 text-[10px]">Product Designer @ Figma</span>
                </div>
              </div>
            </div>

            {/* Review 2 */}
            <div className="bg-white border border-slate-200 shadow-sm p-6 rounded-2xl relative">
              <div className="flex gap-1.5 text-amber-500 mb-4">
                <Star className="w-3.5 h-3.5 fill-amber-500" /><Star className="w-3.5 h-3.5 fill-amber-500" /><Star className="w-3.5 h-3.5 fill-amber-500" /><Star className="w-3.5 h-3.5 fill-amber-500" /><Star className="w-3.5 h-3.5 fill-amber-500" />
              </div>
              <p className="text-slate-600 text-xs italic leading-relaxed mb-4">
                "As an engineer switching roles, the custom AI roadmap showed me exactly which system architecture patterns I lacked. Simply incredible interface."
              </p>
              <div className="flex gap-3 items-center">
                <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=800&q=80" alt="Student" className="w-10 h-10 rounded-full object-cover border border-slate-200 shrink-0" />
                <div>
                  <h5 className="text-slate-800 text-xs font-semibold">Devon Ko</h5>
                  <span className="text-slate-400 text-[10px]">Frontend Engineer @ Stripe</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Matrix */}
      <section id="pricing" className="px-6 py-20 bg-slate-100/50 border-t border-b border-slate-200 text-center">
        <div className="max-w-5xl mx-auto space-y-12">
          <div className="space-y-4">
            <span className="text-indigo-600 font-mono text-[10px] uppercase block tracking-wider font-semibold">SIMPLE TRANSPARENT PRICING</span>
            <h2 className="text-3xl font-display font-bold text-slate-900 tracking-tight">Invest in your career growth</h2>

            {/* Interval Toggle */}
            <div className="inline-flex items-center gap-1.5 bg-slate-200/60 p-1 rounded-xl border border-slate-300 mx-auto mt-4">
              <button
                onClick={() => setBillingPeriod("monthly")}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all cursor-pointer ${
                  billingPeriod === "monthly" ? "bg-indigo-600 text-white shadow" : "text-slate-600 hover:text-slate-900"
                }`}
              >
                Monthly billing
              </button>
              <button
                onClick={() => setBillingPeriod("yearly")}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all cursor-pointer ${
                  billingPeriod === "yearly" ? "bg-indigo-600 text-white shadow" : "text-slate-600 hover:text-slate-900"
                }`}
              >
                Yearly billing (Save 20%)
              </button>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-8 text-left">
            {/* Free Tier */}
            <div className="bg-white border border-slate-200 p-8 rounded-2xl space-y-6 shadow-sm">
              <div className="space-y-2">
                <h3 className="text-slate-800 font-display font-semibold text-base">Standard Access</h3>
                <p className="text-slate-450 text-xs">For students and aspiring builders launching portfolios.</p>
              </div>
              <div className="text-3xl font-display font-bold text-slate-900">
                $0
              </div>
              <button
                onClick={handleEnterApp}
                className="w-full py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-semibold rounded-xl border border-slate-200 transition-colors cursor-pointer text-center"
              >
                Get Started Free
              </button>
              <div className="space-y-2 text-xs text-slate-500 pt-4 border-t border-slate-200">
                <div className="flex gap-2 items-center"><Check className="w-3.5 h-3.5 text-indigo-600 shrink-0" /> <span>Upload up to 3 Portfolio projects</span></div>
                <div className="flex gap-2 items-center"><Check className="w-3.5 h-3.5 text-indigo-600 shrink-0" /> <span>Search Jobs & Internships</span></div>
                <div className="flex gap-2 items-center"><Check className="w-3.5 h-3.5 text-indigo-600 shrink-0" /> <span>Access standard curriculum</span></div>
              </div>
            </div>

            {/* Premium Tier */}
            <div className="bg-white border-2 border-indigo-600 p-8 rounded-2xl space-y-6 relative shadow-xl shadow-indigo-100/50">
              <div className="absolute -top-3.5 left-1/2 transform -translate-x-1/2 bg-indigo-600 text-white px-3 py-1 rounded-full text-[9px] font-mono uppercase tracking-wider font-semibold">
                RECOMMENDED
              </div>
              <div className="space-y-2">
                <h3 className="text-slate-800 font-display font-semibold text-base">Pro Fellow</h3>
                <p className="text-slate-500 text-xs">For high-craft developers and designers pushing for staff roles.</p>
              </div>
              <div className="text-3xl font-display font-bold text-slate-900 flex items-baseline gap-1">
                <span>{billingPeriod === "yearly" ? "$39" : "$49"}</span>
                <span className="text-slate-400 text-xs font-normal">/ month</span>
              </div>
              <button
                onClick={handleEnterApp}
                className="w-full py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold rounded-xl transition-all shadow-md cursor-pointer text-center"
              >
                Elevate to Pro
              </button>
              <div className="space-y-2 text-xs text-slate-600 pt-4 border-t border-slate-200">
                <div className="flex gap-2 items-center"><Check className="w-3.5 h-3.5 text-indigo-600 shrink-0" /> <span>Unlimited AI Roadmaps & Resume Scans</span></div>
                <div className="flex gap-2 items-center"><Check className="w-3.5 h-3.5 text-indigo-600 shrink-0" /> <span>2 Mentor consultation bookings / month</span></div>
                <div className="flex gap-2 items-center"><Check className="w-3.5 h-3.5 text-indigo-600 shrink-0" /> <span>Priority Fellowship grant verification</span></div>
                <div className="flex gap-2 items-center"><Check className="w-3.5 h-3.5 text-indigo-600 shrink-0" /> <span>Full curriculum player access</span></div>
              </div>
            </div>

            {/* Enterprise Tier */}
            <div className="bg-white border border-slate-200 p-8 rounded-2xl space-y-6 shadow-sm">
              <div className="space-y-2">
                <h3 className="text-slate-800 font-display font-semibold text-base">Scale Hub</h3>
                <p className="text-slate-450 text-xs">For bootcamps and universities matching cohorts with tech pools.</p>
              </div>
              <div className="text-3xl font-display font-bold text-slate-900">
                Custom
              </div>
              <button
                onClick={handleEnterApp}
                className="w-full py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-semibold rounded-xl border border-slate-200 transition-colors cursor-pointer text-center"
              >
                Contact Partnerships
              </button>
              <div className="space-y-2 text-xs text-slate-500 pt-4 border-t border-slate-200">
                <div className="flex gap-2 items-center"><Check className="w-3.5 h-3.5 text-indigo-600 shrink-0" /> <span>Cohort metrics & progression analytics</span></div>
                <div className="flex gap-2 items-center"><Check className="w-3.5 h-3.5 text-indigo-600 shrink-0" /> <span>Direct API access to portfolio tokens</span></div>
                <div className="flex gap-2 items-center"><Check className="w-3.5 h-3.5 text-indigo-600 shrink-0" /> <span>Dedicated partner matching panel</span></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="px-6 py-20 max-w-4xl mx-auto space-y-12">
        <div className="text-center space-y-3">
          <span className="text-indigo-600 font-mono text-[10px] uppercase block tracking-wider font-semibold">ANSWERS TO FREQUENT QUESTIONS</span>
          <h2 className="text-3xl font-display font-bold text-slate-900 tracking-tight">Got questions? We've got answers.</h2>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, idx) => (
            <div key={idx} className="bg-white border border-slate-200 rounded-2xl p-5 overflow-hidden transition-all shadow-sm">
              <button
                onClick={() => setActiveFaq(activeFaq === idx ? null : idx)}
                className="w-full flex justify-between items-center text-left text-slate-800 text-sm font-semibold focus:outline-none cursor-pointer"
              >
                <span>{faq.q}</span>
                <ChevronDown className={`w-4 h-4 text-slate-400 transition-transform ${activeFaq === idx ? "transform rotate-180 text-slate-700" : ""}`} />
              </button>
              {activeFaq === idx && (
                <p className="text-slate-500 text-xs leading-relaxed mt-4 pt-4 border-t border-slate-200">
                  {faq.a}
                </p>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Global Footer */}
      <footer className="border-t border-slate-200 bg-white px-6 py-12 text-xs text-slate-500">
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-5 gap-8">
          <div className="col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <img
                src="https://corelify.io/store/1/CORELIFY%20LOGO.png"
                alt="Corelify Logo"
                className="h-8 w-auto"
              />
            </div>
            <p className="text-slate-500 max-w-xs leading-relaxed">
              Corelify is a premium, intelligent ecosystem that helps modern developers and product designers supercharge their technical craft, access direct mentorship, and land high-caliber global roles.
            </p>
            <p className="text-slate-400">&copy; 2026 Corelify Edu Systems. All rights reserved.</p>
          </div>

          <div className="space-y-3">
            <span className="font-semibold text-slate-800 block">Platform</span>
            <ul className="space-y-1.5 text-slate-500">
              <li><a href="#" className="hover:text-indigo-600 transition-colors">Courses Player</a></li>
              <li><a href="#" className="hover:text-indigo-600 transition-colors">Mentorship Calendar</a></li>
              <li><a href="#" className="hover:text-indigo-600 transition-colors">Jobs Board</a></li>
              <li><a href="#" className="hover:text-indigo-600 transition-colors">Internship Portal</a></li>
            </ul>
          </div>

          <div className="space-y-3">
            <span className="font-semibold text-slate-800 block">Resources</span>
            <ul className="space-y-1.5 text-slate-500">
              <li><a href="#" className="hover:text-indigo-600 transition-colors">Ecosystem Sitemap</a></li>
              <li><a href="#" className="hover:text-indigo-600 transition-colors">Design Guidelines</a></li>
              <li><a href="#" className="hover:text-indigo-600 transition-colors">Support Tickets</a></li>
              <li><a href="#" className="hover:text-indigo-600 transition-colors">Universal Search</a></li>
            </ul>
          </div>

          <div className="space-y-3">
            <span className="font-semibold text-slate-800 block">Safety & Terms</span>
            <ul className="space-y-1.5 text-slate-500">
              <li><a href="#" className="hover:text-indigo-600 transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-indigo-600 transition-colors">Terms of Service</a></li>
              <li><a href="#" className="hover:text-indigo-600 transition-colors">Security Audit</a></li>
            </ul>
          </div>
        </div>
      </footer>
    </div>
  );
}
