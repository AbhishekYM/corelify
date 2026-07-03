import React, { useState } from "react";
import { 
  BarChart3, Users, BookOpen, ShieldCheck, Briefcase, Calendar, Award, 
  Server, FileText, Globe, MessageSquare, Sliders, Activity, Layers, LogOut, ArrowLeft, ChevronRight, LayoutDashboard 
} from "lucide-react";
import { 
  Course, Mentor, Opportunity, Workshop, Scholarship, BlogPost, 
  SupportTicket, AdminProfile
} from "../types";

// Import Refactored Modules
import AdminDashboard from "./admin/AdminDashboard";
import AdminUsers, { AdminUser } from "./admin/AdminUsers";
import AdminCourses from "./admin/AdminCourses";
import AdminMentors from "./admin/AdminMentors";
import AdminOpportunities from "./admin/AdminOpportunities";
import AdminWorkshops from "./admin/AdminWorkshops";
import AdminScholarships from "./admin/AdminScholarships";
import AdminBlogs from "./admin/AdminBlogs";
import AdminTickets from "./admin/AdminTickets";
import AdminAI from "./admin/AdminAI";
import AdminCMS from "./admin/AdminCMS";
import AdminReports from "./admin/AdminReports";
import AdminSEO from "./admin/AdminSEO";

interface AdminPanelProps {
  currentAdmin: AdminProfile;
  courses: Course[];
  setCourses: React.Dispatch<React.SetStateAction<Course[]>>;
  mentors: Mentor[];
  setMentors: React.Dispatch<React.SetStateAction<Mentor[]>>;
  opportunities: Opportunity[];
  setOpportunities: React.Dispatch<React.SetStateAction<Opportunity[]>>;
  workshops: Workshop[];
  setWorkshops: React.Dispatch<React.SetStateAction<Workshop[]>>;
  scholarships: Scholarship[];
  setScholarships: React.Dispatch<React.SetStateAction<Scholarship[]>>;
  blogs: BlogPost[];
  setBlogs: React.Dispatch<React.SetStateAction<BlogPost[]>>;
  tickets: SupportTicket[];
  setTickets: React.Dispatch<React.SetStateAction<SupportTicket[]>>;
  onAddNotification: (
    title: string,
    description: string,
    type: "message" | "alert" | "recommendation" | "application"
  ) => void;
  onLogout: () => void;
  onClose: () => void;
}

const INITIAL_ADMIN_USERS: AdminUser[] = [
  {
    id: "user-101",
    fullName: "Amara Okeke",
    email: "amara@designcraft.io",
    role: "Student",
    status: "Active",
    verified: true,
    engagementScore: 88,
    joinedDate: "2026-01-15",
    resumeReviewStatus: "Pending",
    portfolioLink: "https://amara.design",
    resumeFileName: "amara_product_designer_2026.pdf"
  },
  {
    id: "user-102",
    fullName: "Chen Wei",
    email: "chen.wei@engineering.dev",
    role: "Student",
    status: "Active",
    verified: false,
    engagementScore: 94,
    joinedDate: "2026-03-02",
    resumeReviewStatus: "Reviewed",
    portfolioLink: "https://wei-codes.dev",
    resumeFileName: "chen_wei_resume.pdf",
    feedback: "Exceptional Next.js 19 experience. Suggested adding WebGL links."
  }
];

export default function AdminPanel({
  currentAdmin,
  courses, setCourses,
  mentors, setMentors,
  opportunities, setOpportunities,
  workshops, setWorkshops,
  scholarships, setScholarships,
  blogs, setBlogs,
  tickets, setTickets,
  onAddNotification,
  onLogout,
  onClose
}: AdminPanelProps) {
  
  const allTabs = [
    { id: "dashboard", label: "Dashboard Management", icon: BarChart3, roles: ["Admin", "Instructor", "Student", "Employer", "Institution"] },
    { id: "users", label: "User Management", icon: Users, roles: ["Admin", "Institution", "Employer"] },
    { id: "courses", label: "Course Management", icon: BookOpen, roles: ["Admin", "Instructor", "Student"] },
    { id: "mentors", label: "Mentor Management", icon: ShieldCheck, roles: ["Admin", "Instructor"] },
    { id: "internships", label: "Internship Management", icon: Briefcase, roles: ["Admin", "Employer", "Student"] },
    { id: "jobs", label: "Job Management", icon: Layers, roles: ["Admin", "Employer", "Student"] },
    { id: "workshops", label: "Workshop Management", icon: Calendar, roles: ["Admin", "Instructor", "Institution"] },
    { id: "scholarships", label: "Scholarship Management", icon: Award, roles: ["Admin", "Institution", "Student"] },
    { id: "blogs", label: "Blog Management", icon: FileText, roles: ["Admin", "Instructor"] },
    { id: "tickets", label: "Ticket Management", icon: MessageSquare, roles: ["Admin"] },
    { id: "ai", label: "AI & Recommendation", icon: Sliders, roles: ["Admin"] },
    { id: "cms", label: "CMS Management", icon: Server, roles: ["Admin"] },
    { id: "reports", label: "Reports & Analytics", icon: Activity, roles: ["Admin", "Institution"] },
    { id: "seo", label: "SEO Features", icon: Globe, roles: ["Admin"] }
  ];

  const tabs = allTabs.filter(t => t.roles.includes(currentAdmin.role));
  const [activeTab, setActiveTab] = useState("dashboard");

  // Global Admin States (Passed Down to Modules)
  const [adminUsers, setAdminUsers] = useState<AdminUser[]>(INITIAL_ADMIN_USERS);
  
  const [cmsFaqs, setCmsFaqs] = useState([
    { id: "faq-1", q: "How is Lumina different?", a: "We focus on production-ready design systems." }
  ]);

  const [skillMappings, setSkillMappings] = useState<Record<string, string[]>>({
    "Design Systems & Tokens": ["Figma Variables", "Design Tokens"],
    "Next-Gen Fullstack Architectures": ["Next.js 19", "React Server Components"],
    "Agentic AI workflows": ["PyTorch", "LangChain"]
  });

  const [seoConfig, setSeoConfig] = useState({});

  return (
    <div className="flex h-screen bg-slate-50 font-sans overflow-hidden">
      {/* Sidebar Navigation */}
      <div className="w-64 bg-slate-900 text-slate-300 flex flex-col shadow-2xl relative z-20">
        <div className="h-16 flex items-center px-6 border-b border-slate-800">
          <div className="flex items-center gap-2">
            <img
              src="https://corelify.io/store/1/CORELIFY%20LOGO.png"
              alt="Corelify Logo"
              className="h-6 w-auto brightness-0 invert"
            />
            <span className="text-indigo-400 font-mono text-[9px] uppercase tracking-wider ml-1 border border-indigo-500/20 px-1.5 py-0.5 rounded bg-indigo-500/10 font-bold">Admin</span>
          </div>
        </div>

        {/* Dynamic Admin Profile Block */}
        <div className="p-4 border-b border-slate-800 bg-slate-800/30">
          <div className="flex items-center gap-3">
            <img src={currentAdmin.avatar} alt="Admin" className="w-10 h-10 rounded-full border-2 border-indigo-500/50 object-cover" />
            <div className="flex flex-col">
              <span className="text-xs font-bold text-white">{currentAdmin.fullName}</span>
              <span className="text-[10px] text-indigo-400 font-mono flex items-center gap-1 uppercase">
                <ShieldCheck className="w-3 h-3" />
                {currentAdmin.role.replace("_", " ")}
              </span>
            </div>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto py-4 custom-scrollbar">
          <div className="px-4 mb-2"><span className="text-[10px] font-mono text-slate-500 uppercase tracking-wider">Modules</span></div>
          <nav className="space-y-1 px-3">
            {tabs.map((tab) => {
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-medium transition-all ${
                    isActive ? "bg-indigo-600 text-white shadow-lg shadow-indigo-900/20" : "text-slate-400 hover:bg-slate-800 hover:text-white"
                  }`}
                >
                  <tab.icon className={`w-4 h-4 ${isActive ? "text-indigo-200" : "text-slate-500"}`} />
                  {tab.label}
                  {isActive && <ChevronRight className="w-3.5 h-3.5 ml-auto text-indigo-300" />}
                </button>
              );
            })}
          </nav>
        </div>

        <div className="p-4 border-t border-slate-800 space-y-2 bg-slate-900">
          <button onClick={onClose} className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-medium text-slate-400 hover:bg-slate-800 hover:text-white transition-colors">
            <ArrowLeft className="w-4 h-4 text-slate-500" /> Return to App
          </button>
          <button onClick={onLogout} className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-medium text-rose-400 hover:bg-rose-950/50 hover:text-rose-300 transition-colors">
            <LogOut className="w-4 h-4 text-rose-500/70" /> Log Out Securely
          </button>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col relative overflow-hidden bg-slate-50/50">
        <header className="h-16 bg-white border-b border-slate-200/80 px-8 flex items-center justify-between z-10 shrink-0">
          <h1 className="text-lg font-bold text-slate-800 flex items-center gap-2">
            {tabs.find(t => t.id === activeTab)?.label}
          </h1>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 px-3 py-1.5 bg-green-50 text-green-700 rounded-full border border-green-200 shadow-sm">
              <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
              <span className="text-[10px] font-bold uppercase tracking-wider">System Operational</span>
            </div>
          </div>
        </header>

        <div className="flex-1 overflow-y-auto p-8 relative z-0">
          <div className="max-w-6xl mx-auto pb-20 animate-in fade-in slide-in-from-bottom-4 duration-500">
            {activeTab === "dashboard" && <AdminDashboard adminUsers={adminUsers} courses={courses} opportunities={opportunities} />}
            {activeTab === "users" && <AdminUsers adminUsers={adminUsers} setAdminUsers={setAdminUsers} onAddNotification={onAddNotification} />}
            {activeTab === "courses" && <AdminCourses courses={courses} setCourses={setCourses} onAddNotification={onAddNotification} />}
            {activeTab === "mentors" && <AdminMentors mentors={mentors} setMentors={setMentors} onAddNotification={onAddNotification} />}
            {activeTab === "internships" && <AdminOpportunities viewType="Internship" opportunities={opportunities} setOpportunities={setOpportunities} onAddNotification={onAddNotification} />}
            {activeTab === "jobs" && <AdminOpportunities viewType="Job" opportunities={opportunities} setOpportunities={setOpportunities} onAddNotification={onAddNotification} />}
            {activeTab === "workshops" && <AdminWorkshops workshops={workshops} setWorkshops={setWorkshops} onAddNotification={onAddNotification} />}
            {activeTab === "scholarships" && <AdminScholarships scholarships={scholarships} setScholarships={setScholarships} onAddNotification={onAddNotification} />}
            {activeTab === "blogs" && <AdminBlogs blogs={blogs} setBlogs={setBlogs} onAddNotification={onAddNotification} />}
            {activeTab === "tickets" && <AdminTickets tickets={tickets} setTickets={setTickets} onAddNotification={onAddNotification} />}
            {activeTab === "ai" && <AdminAI skillMappings={skillMappings} setSkillMappings={setSkillMappings} onAddNotification={onAddNotification} />}
            {activeTab === "cms" && <AdminCMS cmsFaqs={cmsFaqs} setCmsFaqs={setCmsFaqs} onAddNotification={onAddNotification} />}
            {activeTab === "reports" && <AdminReports />}
            {activeTab === "seo" && <AdminSEO seoConfig={seoConfig} setSeoConfig={setSeoConfig} onAddNotification={onAddNotification} />}
          </div>
        </div>
      </div>
    </div>
  );
}
