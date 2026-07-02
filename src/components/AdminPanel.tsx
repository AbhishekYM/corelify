import React, { useState } from "react";
import { 
  BarChart3, Users, BookOpen, ShieldCheck, Briefcase, Calendar, Award, 
  Settings, Server, HelpCircle, FileText, Search, Plus, Trash2, Edit3, 
  CheckCircle, AlertCircle, Ban, ArrowUpRight, TrendingUp, DollarSign, 
  CornerDownRight, ArrowDownRight, Activity, Sliders, Layers, RefreshCw, 
  Wrench, UploadCloud, Globe, Share2, Compass, ChevronRight, X, MessageSquare, Heart
} from "lucide-react";
import { 
  Course, Mentor, Opportunity, Workshop, Scholarship, BlogPost, 
  SupportTicket, Notification, UserProfile 
} from "../types";

interface AdminPanelProps {
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
  onClose: () => void;
}

// Additional mocked Admin State for complex tables (Users, CMS, Categories, SEO)
interface AdminUser {
  id: string;
  fullName: string;
  email: string;
  role: "Student" | "Mentor" | "Admin";
  status: "Active" | "Suspended";
  verified: boolean;
  engagementScore: number;
  joinedDate: string;
  resumeReviewStatus: "Pending" | "Reviewed";
  portfolioLink: string;
  resumeFileName: string;
  feedback?: string;
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
  },
  {
    id: "user-103",
    fullName: "Elena Rostova",
    email: "elena.r@growth.com",
    role: "Mentor",
    status: "Active",
    verified: true,
    engagementScore: 72,
    joinedDate: "2025-11-20",
    resumeReviewStatus: "Reviewed",
    portfolioLink: "https://elena-growth.me",
    resumeFileName: "elena_marketing_lead.pdf"
  },
  {
    id: "user-104",
    fullName: "Devon Miller",
    email: "devon.m@spammy.net",
    role: "Student",
    status: "Suspended",
    verified: false,
    engagementScore: 12,
    joinedDate: "2026-05-18",
    resumeReviewStatus: "Pending",
    portfolioLink: "https://spam-link.xyz",
    resumeFileName: "suspicious_resume.pdf"
  }
];

export default function AdminPanel({
  courses,
  setCourses,
  mentors,
  setMentors,
  opportunities,
  setOpportunities,
  workshops,
  setWorkshops,
  scholarships,
  setScholarships,
  blogs,
  setBlogs,
  tickets,
  setTickets,
  onAddNotification,
  onClose
}: AdminPanelProps) {
  // Navigation Tabs matching categories requested
  const tabs = [
    { id: "dashboard", label: "Dashboard Management", icon: BarChart3 },
    { id: "users", label: "User Management", icon: Users },
    { id: "courses", label: "Course Management", icon: BookOpen },
    { id: "mentors", label: "Mentor Management", icon: ShieldCheck },
    { id: "internships", label: "Internship Management", icon: Briefcase },
    { id: "jobs", label: "Job Management", icon: Layers },
    { id: "workshops", label: "Workshop Management", icon: Calendar },
    { id: "scholarships", label: "Scholarship Management", icon: Award },
    { id: "blogs", label: "Blog Management", icon: FileText },
    { id: "tickets", label: "Ticket Management", icon: MessageSquare },
    { id: "ai", label: "AI & Recommendation", icon: Sliders },
    { id: "cms", label: "CMS Management", icon: Server },
    { id: "reports", label: "Reports & Analytics", icon: Activity },
    { id: "seo", label: "SEO Features", icon: Globe }
  ];

  const [activeTab, setActiveTab] = useState("dashboard");

  // Dynamic state for custom interactive features
  const [adminUsers, setAdminUsers] = useState<AdminUser[]>(INITIAL_ADMIN_USERS);
  
  // User Manager dialog state
  const [showUserModal, setShowUserModal] = useState(false);
  const [editingUser, setEditingUser] = useState<AdminUser | null>(null);
  const [userForm, setUserForm] = useState({
    fullName: "",
    email: "",
    role: "Student" as "Student" | "Mentor" | "Admin",
    status: "Active" as "Active" | "Suspended",
    verified: false,
    engagementScore: 50,
    joinedDate: "2026-07-02",
    resumeReviewStatus: "Pending" as "Pending" | "Reviewed",
    portfolioLink: "",
    resumeFileName: ""
  });

  // User Review Sidebar State
  const [reviewingUser, setReviewingUser] = useState<AdminUser | null>(null);
  const [reviewFeedback, setReviewFeedback] = useState("");

  // Course Management states
  const [showCourseModal, setShowCourseModal] = useState(false);
  const [courseForm, setCourseForm] = useState({
    title: "",
    provider: "Lumina Academy",
    category: "Design",
    level: "Beginner" as "Beginner" | "Intermediate" | "Advanced",
    instructor: "",
    duration: "10h 00m",
    price: 49,
    description: "",
    curriculumTitle: "Course Overview"
  });

  // Mentor availability/schedule edit state
  const [editingScheduleMentorId, setEditingScheduleMentorId] = useState<string | null>(null);
  const [newScheduleSlot, setNewScheduleSlot] = useState("");

  // Internship / Job add states
  const [showOppModal, setShowOppModal] = useState(false);
  const [oppType, setOppType] = useState<"Job" | "Internship">("Job");
  const [oppForm, setOppForm] = useState({
    title: "",
    company: "",
    location: "Remote",
    stipendOrSalary: "$5,000 / month",
    duration: "6 Months",
    skillsRequired: "",
    description: ""
  });

  // Workshop add state
  const [showWorkshopModal, setShowWorkshopModal] = useState(false);
  const [workshopForm, setWorkshopForm] = useState({
    title: "",
    host: "",
    company: "",
    date: "July 24, 2026",
    time: "1:00 PM - 3:00 PM PST",
    duration: "2 Hours",
    price: 19,
    description: ""
  });

  // Scholarship add state
  const [showScholarshipModal, setShowScholarshipModal] = useState(false);
  const [scholarshipForm, setScholarshipForm] = useState({
    title: "",
    provider: "",
    amount: "$5,000",
    deadline: "August 30, 2026",
    eligibility: "",
    description: ""
  });

  // CMS state values
  const [cmsHeadline, setCmsHeadline] = useState("Empowering Career Pathways with Precision Telemetry");
  const [cmsSubHeadline, setCmsSubHeadline] = useState("Gain real world competencies, high-craft portfolios, and elite staff mentor mapping in a unified platform.");
  const [cmsFaqs, setCmsFaqs] = useState([
    { id: "faq-1", q: "How is Lumina different?", a: "We focus on production-ready design systems, elite portfolios, and high-quality mentors with verified industry expertise." },
    { id: "faq-2", q: "Is there a merit fellowship available?", a: "Yes, students can apply for the Lumina Tech Fellowship, which includes high-amount grants and full-pass career interview guarantees." }
  ]);
  const [newFaqQ, setNewFaqQ] = useState("");
  const [newFaqA, setNewFaqA] = useState("");

  // AI Recommendation matching constraints
  const [aiMatchThreshold, setAiMatchThreshold] = useState(85);
  const [aiPriorityWeight, setAiPriorityWeight] = useState("Skill Fit: 60%, Activity: 40%");
  const [skillMappings, setSkillMappings] = useState([
    { from: "Figma Variables", to: "Design Systems & Tokens" },
    { from: "Next.js 19", to: "Next-Gen Fullstack Architectures" },
    { from: "PyTorch", to: "Agentic AI workflows" }
  ]);
  const [newMappingFrom, setNewMappingFrom] = useState("");
  const [newMappingTo, setNewMappingTo] = useState("");

  // SEO Management
  const [seoConfig, setSeoConfig] = useState({
    homeTitle: "Lumina Academy | Creative & Technical Cohorts",
    homeDesc: "Empower your career with real industry skills, verified portfolios, and modern cohorts.",
    coursesTitle: "Explore Learning Pathways | Lumina Courses",
    coursesDesc: "Master Figma, React 19, and advanced Product design strategies.",
    blogsTitle: "Lumina Forums & Architectural Blogs",
    blogsDesc: "Deep technical articles analyzing high craft software and design decisions."
  });

  // User Actions Helpers
  const handleAddEditUser = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingUser) {
      setAdminUsers(adminUsers.map(u => u.id === editingUser.id ? { ...u, ...userForm } : u));
      onAddNotification("User Modified", `Updated details for ${userForm.fullName}.`, "alert");
    } else {
      const newUser: AdminUser = {
        id: `user-${Date.now()}`,
        ...userForm
      };
      setAdminUsers([...adminUsers, newUser]);
      onAddNotification("User Created", `Registered ${userForm.fullName} into platform directories.`, "alert");
    }
    setShowUserModal(false);
    setEditingUser(null);
  };

  const handleEditUserClick = (u: AdminUser) => {
    setEditingUser(u);
    setUserForm({
      fullName: u.fullName,
      email: u.email,
      role: u.role,
      status: u.status,
      verified: u.verified,
      engagementScore: u.engagementScore,
      joinedDate: u.joinedDate,
      resumeReviewStatus: u.resumeReviewStatus,
      portfolioLink: u.portfolioLink,
      resumeFileName: u.resumeFileName
    });
    setShowUserModal(true);
  };

  const handleDeleteUser = (id: string) => {
    setAdminUsers(adminUsers.filter(u => u.id !== id));
    onAddNotification("User Removed", `Successfully removed user catalog ID ${id}.`, "alert");
  };

  const handleToggleBlock = (id: string) => {
    setAdminUsers(adminUsers.map(u => {
      if (u.id === id) {
        const nextStatus = u.status === "Active" ? "Suspended" : "Active";
        onAddNotification(
          nextStatus === "Suspended" ? "User Blocked" : "User Reactivated",
          `${u.fullName}'s login and catalog access has been updated.`,
          "alert"
        );
        return { ...u, status: nextStatus as "Active" | "Suspended" };
      }
      return u;
    }));
  };

  const handleVerifyUserToggle = (id: string) => {
    setAdminUsers(adminUsers.map(u => {
      if (u.id === id) {
        const nextVer = !u.verified;
        onAddNotification(
          nextVer ? "User Verified" : "User Unverified",
          `${u.fullName} verification mark updated.`,
          "recommendation"
        );
        return { ...u, verified: nextVer };
      }
      return u;
    }));
  };

  const handleSaveResumeFeedback = () => {
    if (!reviewingUser) return;
    setAdminUsers(adminUsers.map(u => {
      if (u.id === reviewingUser.id) {
        return {
          ...u,
          resumeReviewStatus: "Reviewed",
          feedback: reviewFeedback
        };
      }
      return u;
    }));
    onAddNotification(
      "Resume Feedback Dispatched",
      `Sent custom portfolio feedback to ${reviewingUser.fullName}.`,
      "message"
    );
    setReviewingUser(null);
    setReviewFeedback("");
  };

  // Course additions
  const handleCreateCourse = (e: React.FormEvent) => {
    e.preventDefault();
    const newCourse: Course = {
      id: `course-${Date.now()}`,
      title: courseForm.title,
      provider: courseForm.provider,
      category: courseForm.category,
      level: courseForm.level,
      rating: 5.0,
      reviewCount: 1,
      instructor: courseForm.instructor || "Lumina Faculty",
      duration: courseForm.duration,
      lessonsCount: 8,
      enrolled: false,
      progress: 0,
      image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=800&q=80",
      description: courseForm.description,
      price: courseForm.price,
      curriculum: [
        {
          id: `cur-${Date.now()}`,
          title: courseForm.curriculumTitle,
          lessons: [
            { id: `les-${Date.now()}-1`, title: "Initial Cohort Kickoff", duration: "45m", isCompleted: false },
            { id: `les-${Date.now()}-2`, title: "Mastering Core Fundamentals", duration: "1h 15m", isCompleted: false }
          ]
        }
      ]
    };
    setCourses([...courses, newCourse]);
    onAddNotification("Course Published", `"${courseForm.title}" is now available in the public catalog.`, "recommendation");
    setShowCourseModal(false);
    setCourseForm({
      title: "",
      provider: "Lumina Academy",
      category: "Design",
      level: "Beginner",
      instructor: "",
      duration: "10h 00m",
      price: 49,
      description: "",
      curriculumTitle: "Course Overview"
    });
  };

  const handleDeleteCourse = (id: string) => {
    setCourses(courses.filter(c => c.id !== id));
    onAddNotification("Course Withdrawn", "The course was removed from the active student database.", "alert");
  };

  // Opportunities Management (Jobs / Internships)
  const handleCreateOpp = (e: React.FormEvent) => {
    e.preventDefault();
    const newOpp: Opportunity = {
      id: `opp-${Date.now()}`,
      title: oppForm.title,
      company: oppForm.company,
      logo: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=120&q=80",
      type: oppType,
      location: oppForm.location,
      duration: oppType === "Internship" ? oppForm.duration : undefined,
      stipendOrSalary: oppForm.stipendOrSalary,
      matchScore: 90,
      skillsRequired: oppForm.skillsRequired.split(",").map(s => s.trim()),
      description: oppForm.description,
      applied: false,
      saved: false
    };
    setOpportunities([newOpp, ...opportunities]);
    onAddNotification(
      `${oppType} Created`,
      `New opportunity "${oppForm.title}" is now visible to matched students.`,
      "application"
    );
    setShowOppModal(false);
    setOppForm({
      title: "",
      company: "",
      location: "Remote",
      stipendOrSalary: "$5,000 / month",
      duration: "6 Months",
      skillsRequired: "",
      description: ""
    });
  };

  // Workshop Management
  const handleCreateWorkshop = (e: React.FormEvent) => {
    e.preventDefault();
    const newWork: Workshop = {
      id: `work-${Date.now()}`,
      title: workshopForm.title,
      host: workshopForm.host,
      company: workshopForm.company,
      date: workshopForm.date,
      time: workshopForm.time,
      duration: workshopForm.duration,
      price: workshopForm.price,
      registrants: 0,
      image: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&w=800&q=80",
      description: workshopForm.description,
      registered: false
    };
    setWorkshops([...workshops, newWork]);
    onAddNotification("Workshop Online", `"${workshopForm.title}" registration is now open.`, "recommendation");
    setShowWorkshopModal(false);
    setWorkshopForm({
      title: "",
      host: "",
      company: "",
      date: "July 24, 2026",
      time: "1:00 PM - 3:00 PM PST",
      duration: "2 Hours",
      price: 19,
      description: ""
    });
  };

  // Scholarship Management
  const handleCreateScholarship = (e: React.FormEvent) => {
    e.preventDefault();
    const newSch: Scholarship = {
      id: `sch-${Date.now()}`,
      title: scholarshipForm.title,
      provider: scholarshipForm.provider,
      amount: scholarshipForm.amount,
      deadline: scholarshipForm.deadline,
      eligibility: scholarshipForm.eligibility.split(",").map(e => e.trim()),
      description: scholarshipForm.description,
      applied: false
    };
    setScholarships([...scholarships, newSch]);
    onAddNotification("Scholarship Added", `Fund profile "${scholarshipForm.title}" published.`, "recommendation");
    setShowScholarshipModal(false);
    setScholarshipForm({
      title: "",
      provider: "",
      amount: "$5,000",
      deadline: "August 30, 2026",
      eligibility: "",
      description: ""
    });
  };

  // Support ticket actions
  const handleAssignTicket = (id: string, staffName: string) => {
    setTickets(tickets.map(t => {
      if (t.id === id) {
        onAddNotification("Ticket Assigned", `Assigned ${t.id} to ${staffName}.`, "message");
        return {
          ...t,
          subject: `${t.subject} (Assigned to: ${staffName})`
        };
      }
      return t;
    }));
  };

  const handleResolveTicket = (id: string) => {
    setTickets(tickets.map(t => {
      if (t.id === id) {
        onAddNotification("Ticket Resolved", `Marked ticket ID ${t.id} as resolved.`, "alert");
        return { ...t, status: "Resolved" as "Resolved" | "Open" };
      }
      return t;
    }));
  };

  // Add FAQ to list
  const handleAddFaq = () => {
    if (!newFaqQ || !newFaqA) return;
    setCmsFaqs([...cmsFaqs, { id: `faq-${Date.now()}`, q: newFaqQ, a: newFaqA }]);
    onAddNotification("FAQ Added", "FAQ database updated with new question.", "alert");
    setNewFaqQ("");
    setNewFaqA("");
  };

  // Add Skill Mapping rule
  const handleAddSkillMapping = () => {
    if (!newMappingFrom || !newMappingTo) return;
    setSkillMappings([...skillMappings, { from: newMappingFrom, to: newMappingTo }]);
    onAddNotification("Skill Mapping Added", `Mapped keyword "${newMappingFrom}" -> "${newMappingTo}".`, "recommendation");
    setNewMappingFrom("");
    setNewMappingTo("");
  };

  return (
    <div className="flex h-screen bg-[#F8FAFC] select-none font-sans overflow-hidden">
      
      {/* 1. ADMIN PANEL COMPACT NAVIGATION SIDEBAR */}
      <div className="w-64 bg-slate-900 border-r border-slate-800 flex flex-col justify-between text-slate-300 shrink-0">
        
        {/* Top Header */}
        <div className="p-5 border-b border-slate-800">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center font-bold text-white text-sm shadow">
              A
            </div>
            <div>
              <span className="font-semibold text-white text-sm block">System Control</span>
              <span className="text-[10px] text-indigo-400 font-mono block">Lumina Admin Panel v1.4</span>
            </div>
          </div>
        </div>

        {/* Tab Links */}
        <div className="flex-1 py-4 overflow-y-auto space-y-1 px-3">
          {tabs.map(t => {
            const TabIcon = t.icon;
            const isActive = activeTab === t.id;
            return (
              <button
                key={t.id}
                onClick={() => setActiveTab(t.id)}
                className={`w-full px-3 py-2.5 rounded-xl text-left text-xs font-semibold flex items-center gap-3 transition-colors cursor-pointer ${
                  isActive 
                    ? "bg-indigo-600 text-white shadow-md shadow-indigo-900/20" 
                    : "hover:bg-slate-800 hover:text-white"
                }`}
              >
                <TabIcon className="w-4 h-4" />
                <span>{t.label}</span>
              </button>
            );
          })}
        </div>

        {/* Footer actions */}
        <div className="p-4 border-t border-slate-800 space-y-2">
          <button
            onClick={onClose}
            className="w-full py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold rounded-xl border border-slate-700 transition-colors cursor-pointer flex items-center justify-center gap-2"
          >
            <Compass className="w-3.5 h-3.5" />
            <span>Return to App</span>
          </button>
        </div>
      </div>

      {/* 2. ADMIN MAIN VIEWPORT AREA */}
      <div className="flex-1 flex flex-col overflow-hidden min-w-0">
        
        {/* Sub-header with close button & title */}
        <header className="h-16 bg-white border-b border-slate-200 px-6 flex items-center justify-between shrink-0">
          <div>
            <h1 className="text-sm font-bold text-slate-900">{tabs.find(t => t.id === activeTab)?.label}</h1>
            <p className="text-[10px] text-slate-400 font-mono">Manage database entities, configurations, telemetry, and layouts.</p>
          </div>
          <button 
            onClick={onClose}
            className="p-1.5 hover:bg-slate-100 rounded-lg text-slate-400 hover:text-slate-700 transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </header>

        {/* Dynamic content rendering with custom scrollbar */}
        <div className="flex-1 overflow-y-auto p-6 bg-slate-50 space-y-6">
          
          {/* ==================== TAB: DASHBOARD ==================== */}
          {activeTab === "dashboard" && (
            <div className="space-y-6">
              
              {/* Main Telemetry Spark Card Block */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm">
                  <div className="flex items-center justify-between text-slate-400 mb-2">
                    <span className="text-xs font-semibold">Platform Registrations</span>
                    <Users className="w-4 h-4 text-slate-400" />
                  </div>
                  <div className="flex items-baseline gap-2">
                    <span className="text-xl font-bold text-slate-900">{adminUsers.length * 12}</span>
                    <span className="text-[10px] text-green-600 font-bold flex items-center font-mono">+12.4%</span>
                  </div>
                  <p className="text-[9px] text-slate-400 mt-1">Simulating cumulative user growth analytics</p>
                </div>

                <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm">
                  <div className="flex items-center justify-between text-slate-400 mb-2">
                    <span className="text-xs font-semibold">Active Revenue Stream</span>
                    <DollarSign className="w-4 h-4 text-emerald-500" />
                  </div>
                  <div className="flex items-baseline gap-2">
                    <span className="text-xl font-bold text-slate-900">$18,450</span>
                    <span className="text-[10px] text-green-600 font-bold flex items-center font-mono">+8.1%</span>
                  </div>
                  <p className="text-[9px] text-slate-400 mt-1">Summing premium cohorts & workshop sales</p>
                </div>

                <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm">
                  <div className="flex items-center justify-between text-slate-400 mb-2">
                    <span className="text-xs font-semibold">Enrolment Cohorts</span>
                    <BookOpen className="w-4 h-4 text-slate-400" />
                  </div>
                  <div className="flex items-baseline gap-2">
                    <span className="text-xl font-bold text-slate-900">{courses.length * 48}</span>
                    <span className="text-[10px] text-green-600 font-bold flex items-center font-mono">+15%</span>
                  </div>
                  <p className="text-[9px] text-slate-400 mt-1">Live database course participation index</p>
                </div>

                <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm">
                  <div className="flex items-center justify-between text-slate-400 mb-2">
                    <span className="text-xs font-semibold">Active Applications</span>
                    <Briefcase className="w-4 h-4 text-slate-400" />
                  </div>
                  <div className="flex items-baseline gap-2">
                    <span className="text-xl font-bold text-slate-900">{opportunities.length * 14}</span>
                    <span className="text-[10px] text-indigo-600 font-bold flex items-center font-mono">Matched</span>
                  </div>
                  <p className="text-[9px] text-slate-400 mt-1">Career index pipelines & telemetry tracking</p>
                </div>
              </div>

              {/* Graphical Sparklines Grid (Custom SVG Analytics) */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                
                {/* User Growth & Revenue Charts */}
                <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm">
                  <span className="text-xs font-bold text-slate-800 block mb-4">User Growth & Revenue Index</span>
                  <div className="h-44 flex items-end justify-between gap-1 border-b border-slate-100 pb-2 relative">
                    <div className="absolute inset-0 flex flex-col justify-between pointer-events-none">
                      <div className="border-b border-dashed border-slate-100 w-full h-0"></div>
                      <div className="border-b border-dashed border-slate-100 w-full h-0"></div>
                      <div className="border-b border-dashed border-slate-100 w-full h-0"></div>
                    </div>
                    {/* Visual Bars with different heights representing growth */}
                    {[20, 35, 45, 30, 60, 75, 90, 85, 110, 130].map((h, i) => (
                      <div key={i} className="flex-1 flex flex-col items-center gap-1.5 z-10">
                        <div 
                          style={{ height: `${h}px` }} 
                          className="w-full rounded-t-md bg-indigo-600/90 hover:bg-indigo-600 transition-all cursor-pointer relative group"
                        >
                          <span className="absolute -top-7 left-1/2 -translate-x-1/2 bg-slate-950 text-white text-[8px] font-mono px-1 rounded opacity-0 group-hover:opacity-100 transition-opacity">
                            {h * 4}k
                          </span>
                        </div>
                        <span className="text-[8px] text-slate-400 font-mono">M{i+1}</span>
                      </div>
                    ))}
                  </div>
                  <div className="flex items-center gap-4 mt-3">
                    <div className="flex items-center gap-1.5">
                      <span className="w-2.5 h-2.5 rounded-full bg-indigo-600"></span>
                      <span className="text-[10px] text-slate-500 font-medium">Registered Active Accounts</span>
                    </div>
                  </div>
                </div>

                {/* Applications & Mentor Performance Index */}
                <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm">
                  <span className="text-xs font-bold text-slate-800 block mb-4">Ecosystem Application & Performance Metrics</span>
                  <div className="h-44 flex items-end justify-between gap-2 border-b border-slate-100 pb-2 relative">
                    <div className="absolute inset-0 flex flex-col justify-between pointer-events-none">
                      <div className="border-b border-slate-100 w-full h-0"></div>
                      <div className="border-b border-slate-100 w-full h-0"></div>
                    </div>
                    {/* Visual line graph simulated with custom high-tech SVG */}
                    <svg className="absolute inset-0 w-full h-full" viewBox="0 0 400 150">
                      <path 
                        d="M0,120 Q50,70 100,90 T200,40 T300,50 T400,20" 
                        fill="none" 
                        stroke="#6366f1" 
                        strokeWidth="2.5" 
                      />
                      <path 
                        d="M0,140 Q50,90 100,110 T200,70 T300,90 T400,50" 
                        fill="none" 
                        stroke="#10b981" 
                        strokeWidth="1.5" 
                        strokeDasharray="4"
                      />
                    </svg>
                    <div className="w-full flex justify-between text-[8px] text-slate-400 font-mono mt-auto z-10 pt-2 bg-white/90">
                      <span>Mon</span>
                      <span>Tue</span>
                      <span>Wed</span>
                      <span>Thu</span>
                      <span>Fri</span>
                      <span>Sat</span>
                      <span>Sun</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 mt-3">
                    <div className="flex items-center gap-1.5">
                      <span className="w-2.5 h-2.5 rounded-full bg-indigo-600"></span>
                      <span className="text-[10px] text-slate-500 font-medium">Career Submissions</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <span className="w-2.5 h-2.5 rounded-full bg-emerald-500"></span>
                      <span className="text-[10px] text-slate-500 font-medium">Mentor Booking Rate</span>
                    </div>
                  </div>
                </div>

              </div>

            </div>
          )}

          {/* ==================== TAB: USERS ==================== */}
          {activeTab === "users" && (
            <div className="space-y-6">
              
              {/* Table controls */}
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-800">User Records & Directory</span>
                <button
                  onClick={() => {
                    setEditingUser(null);
                    setUserForm({
                      fullName: "",
                      email: "",
                      role: "Student",
                      status: "Active",
                      verified: false,
                      engagementScore: 75,
                      joinedDate: "2026-07-02",
                      resumeReviewStatus: "Pending",
                      portfolioLink: "https://portfolio.me",
                      resumeFileName: "resume.pdf"
                    });
                    setShowUserModal(true);
                  }}
                  className="px-3 py-1.5 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold rounded-xl flex items-center gap-1.5 cursor-pointer shadow transition-colors"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Onboard User</span>
                </button>
              </div>

              {/* Users table */}
              <div className="bg-white rounded-2xl border border-slate-200/80 shadow-sm overflow-hidden">
                <table className="w-full border-collapse text-left text-xs">
                  <thead>
                    <tr className="bg-slate-50 border-b border-slate-200 text-slate-400 font-semibold">
                      <th className="p-4">Name & Email</th>
                      <th className="p-4">Role</th>
                      <th className="p-4">Verified</th>
                      <th className="p-4">Account Status</th>
                      <th className="p-4">Resume Portfolio Review</th>
                      <th className="p-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 text-slate-700">
                    {adminUsers.map(u => (
                      <tr key={u.id} className="hover:bg-slate-50/50 transition-colors">
                        <td className="p-4">
                          <div>
                            <span className="font-bold text-slate-900 block">{u.fullName}</span>
                            <span className="text-[10px] text-slate-400 font-mono">{u.email}</span>
                          </div>
                        </td>
                        <td className="p-4">
                          <span className={`px-2 py-0.5 rounded-full text-[10px] font-semibold ${
                            u.role === "Admin" ? "bg-amber-100 text-amber-800" :
                            u.role === "Mentor" ? "bg-indigo-100 text-indigo-800" : "bg-slate-100 text-slate-800"
                          }`}>{u.role}</span>
                        </td>
                        <td className="p-4">
                          <button
                            onClick={() => handleVerifyUserToggle(u.id)}
                            className={`px-2 py-1 rounded-lg text-[10px] font-semibold cursor-pointer ${
                              u.verified ? "bg-green-50 text-green-700 border border-green-200" : "bg-slate-50 text-slate-400 border border-slate-200"
                            }`}
                          >
                            {u.verified ? "Verified ✅" : "Unverified"}
                          </button>
                        </td>
                        <td className="p-4">
                          <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                            u.status === "Active" ? "bg-green-100 text-green-800" : "bg-rose-100 text-rose-800"
                          }`}>{u.status}</span>
                        </td>
                        <td className="p-4">
                          <div className="flex items-center gap-2">
                            <span className={`px-2 py-0.5 rounded-full text-[10px] font-semibold ${
                              u.resumeReviewStatus === "Reviewed" ? "bg-emerald-100 text-emerald-800" : "bg-orange-100 text-orange-800"
                            }`}>{u.resumeReviewStatus}</span>
                            <button
                              onClick={() => {
                                setReviewingUser(u);
                                setReviewFeedback(u.feedback || "");
                              }}
                              className="text-xs text-indigo-600 hover:underline cursor-pointer"
                            >
                              Review
                            </button>
                          </div>
                        </td>
                        <td className="p-4 text-right">
                          <div className="flex items-center justify-end gap-2">
                            <button
                              onClick={() => handleToggleBlock(u.id)}
                              className={`p-1 rounded hover:bg-slate-100 cursor-pointer ${u.status === "Active" ? "text-rose-500" : "text-green-600"}`}
                              title={u.status === "Active" ? "Suspend Account" : "Activate Account"}
                            >
                              <Ban className="w-3.5 h-3.5" />
                            </button>
                            <button
                              onClick={() => handleEditUserClick(u)}
                              className="p-1 hover:bg-slate-100 text-slate-500 hover:text-slate-900 rounded cursor-pointer"
                            >
                              <Edit3 className="w-3.5 h-3.5" />
                            </button>
                            <button
                              onClick={() => handleDeleteUser(u.id)}
                              className="p-1 hover:bg-rose-50 text-rose-500 hover:text-rose-700 rounded cursor-pointer"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Dynamic User Modal */}
              {showUserModal && (
                <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
                  <form onSubmit={handleAddEditUser} className="bg-white rounded-2xl max-w-md w-full border border-slate-200 p-6 space-y-4 animate-in fade-in zoom-in-95 duration-150">
                    <div className="flex justify-between items-center border-b border-slate-100 pb-2">
                      <span className="font-bold text-slate-900">{editingUser ? "Edit User Record" : "Onboard New User"}</span>
                      <button type="button" onClick={() => setShowUserModal(false)} className="text-slate-400 hover:text-slate-600"><X className="w-4 h-4" /></button>
                    </div>

                    <div className="space-y-3">
                      <div>
                        <label className="text-[10px] font-mono text-slate-400 uppercase tracking-wider block mb-1">Full Name</label>
                        <input
                          type="text"
                          required
                          value={userForm.fullName}
                          onChange={e => setUserForm({ ...userForm, fullName: e.target.value })}
                          className="w-full px-3 py-2 border border-slate-200 rounded-xl text-xs focus:outline-none focus:border-indigo-600"
                        />
                      </div>
                      <div>
                        <label className="text-[10px] font-mono text-slate-400 uppercase tracking-wider block mb-1">Email Address</label>
                        <input
                          type="email"
                          required
                          value={userForm.email}
                          onChange={e => setUserForm({ ...userForm, email: e.target.value })}
                          className="w-full px-3 py-2 border border-slate-200 rounded-xl text-xs focus:outline-none focus:border-indigo-600"
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <label className="text-[10px] font-mono text-slate-400 uppercase tracking-wider block mb-1">Role</label>
                          <select
                            value={userForm.role}
                            onChange={e => setUserForm({ ...userForm, role: e.target.value as any })}
                            className="w-full px-3 py-2 border border-slate-200 rounded-xl text-xs focus:outline-none focus:border-indigo-600"
                          >
                            <option value="Student">Student</option>
                            <option value="Mentor">Mentor</option>
                            <option value="Admin">Admin</option>
                          </select>
                        </div>
                        <div>
                          <label className="text-[10px] font-mono text-slate-400 uppercase tracking-wider block mb-1">Account Status</label>
                          <select
                            value={userForm.status}
                            onChange={e => setUserForm({ ...userForm, status: e.target.value as any })}
                            className="w-full px-3 py-2 border border-slate-200 rounded-xl text-xs focus:outline-none focus:border-indigo-600"
                          >
                            <option value="Active">Active</option>
                            <option value="Suspended">Suspended</option>
                          </select>
                        </div>
                      </div>
                      <div>
                        <label className="text-[10px] font-mono text-slate-400 uppercase tracking-wider block mb-1">Portfolio Link</label>
                        <input
                          type="url"
                          placeholder="https://"
                          value={userForm.portfolioLink}
                          onChange={e => setUserForm({ ...userForm, portfolioLink: e.target.value })}
                          className="w-full px-3 py-2 border border-slate-200 rounded-xl text-xs focus:outline-none focus:border-indigo-600"
                        />
                      </div>
                    </div>

                    <div className="flex justify-end gap-2.5 pt-4">
                      <button type="button" onClick={() => setShowUserModal(false)} className="px-4 py-2 bg-slate-100 text-slate-600 text-xs font-semibold rounded-xl">Cancel</button>
                      <button type="submit" className="px-4 py-2 bg-indigo-600 text-white text-xs font-semibold rounded-xl shadow-lg">Save Record</button>
                    </div>
                  </form>
                </div>
              )}

              {/* Resume Portfolio Review Sidebar/Panel */}
              {reviewingUser && (
                <div className="fixed inset-y-0 right-0 w-96 bg-white border-l border-slate-200 shadow-2xl z-50 p-6 flex flex-col justify-between">
                  <div>
                    <div className="flex justify-between items-center border-b border-slate-100 pb-3 mb-4">
                      <span className="font-bold text-slate-900">Resume & Portfolio Review</span>
                      <button onClick={() => setReviewingUser(null)} className="p-1 hover:bg-slate-100 rounded text-slate-400"><X className="w-4 h-4" /></button>
                    </div>

                    <div className="space-y-4 text-xs">
                      <div className="bg-slate-50 p-3 rounded-xl border border-slate-100">
                        <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider block mb-1">Target Account</span>
                        <span className="font-bold text-slate-800 block text-sm">{reviewingUser.fullName}</span>
                        <span className="text-slate-400 block">{reviewingUser.email}</span>
                      </div>

                      <div>
                        <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider block mb-1">Submitted Resume Asset</span>
                        <div className="flex items-center gap-2 p-2.5 bg-slate-50/50 rounded-xl border border-dashed border-slate-200">
                          <FileText className="w-4 h-4 text-indigo-600 shrink-0" />
                          <span className="truncate font-mono text-[10px]">{reviewingUser.resumeFileName}</span>
                          <a href="#" onClick={(e) => e.preventDefault()} className="text-[10px] text-indigo-600 font-bold hover:underline shrink-0 ml-auto">Download</a>
                        </div>
                      </div>

                      <div>
                        <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider block mb-1">Portfolio link</span>
                        <a href={reviewingUser.portfolioLink} target="_blank" rel="noreferrer" className="flex items-center gap-1.5 p-2 bg-indigo-50 rounded-lg text-indigo-700 hover:underline">
                          <Globe className="w-3.5 h-3.5" />
                          <span>{reviewingUser.portfolioLink || "No link submitted"}</span>
                        </a>
                      </div>

                      <div>
                        <label className="text-[10px] font-mono text-slate-400 uppercase tracking-wider block mb-1">Review Feedback</label>
                        <textarea
                          rows={5}
                          value={reviewFeedback}
                          onChange={e => setReviewFeedback(e.target.value)}
                          placeholder="Provide specific feedback, suggestions on tokens, Figma structure, Next.js hydration issues..."
                          className="w-full p-2.5 border border-slate-200 rounded-xl text-xs focus:outline-none focus:border-indigo-600 resize-none"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-slate-100 flex gap-2">
                    <button onClick={() => setReviewingUser(null)} className="flex-1 py-2 bg-slate-100 text-slate-600 text-xs font-semibold rounded-xl">Cancel</button>
                    <button onClick={handleSaveResumeFeedback} className="flex-1 py-2 bg-indigo-600 text-white text-xs font-semibold rounded-xl shadow-lg">Submit Feedback</button>
                  </div>
                </div>
              )}

            </div>
          )}

          {/* ==================== TAB: COURSES ==================== */}
          {activeTab === "courses" && (
            <div className="space-y-6">
              
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-800">Dynamic Course Repository</span>
                <button
                  onClick={() => setShowCourseModal(true)}
                  className="px-3 py-1.5 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold rounded-xl flex items-center gap-1.5 cursor-pointer shadow transition-colors"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Onboard Course</span>
                </button>
              </div>

              {/* Course list managed in live state */}
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
                {courses.map(c => (
                  <div key={c.id} className="bg-white border border-slate-200/80 rounded-2xl p-4 flex flex-col justify-between shadow-sm relative group">
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="px-2 py-0.5 rounded-full text-[9px] font-mono font-bold bg-indigo-50 text-indigo-700">{c.category}</span>
                        <span className="text-[10px] font-bold text-slate-900 font-mono">${c.price || 99}</span>
                      </div>
                      <h3 className="text-xs font-bold text-slate-800 block line-clamp-1">{c.title}</h3>
                      <p className="text-[10px] text-slate-400 mt-1 line-clamp-2">{c.description}</p>
                      <div className="flex items-center gap-2 mt-3 text-[10px] text-slate-500">
                        <span>L: {c.level}</span>
                        <span>&bull;</span>
                        <span>{c.duration}</span>
                      </div>
                    </div>

                    <div className="border-t border-slate-100 pt-3 mt-4 flex items-center justify-between">
                      <span className="text-[9px] text-indigo-600 font-bold">{c.instructor}</span>
                      <button
                        onClick={() => handleDeleteCourse(c.id)}
                        className="p-1 hover:bg-rose-50 text-rose-500 rounded cursor-pointer transition-colors"
                        title="Withdraw course"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {/* Create Course Modal */}
              {showCourseModal && (
                <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
                  <form onSubmit={handleCreateCourse} className="bg-white rounded-2xl max-w-md w-full border border-slate-200 p-6 space-y-4 animate-in fade-in zoom-in-95 duration-150">
                    <div className="flex justify-between items-center border-b border-slate-100 pb-2">
                      <span className="font-bold text-slate-900">Publish New Course Directory</span>
                      <button type="button" onClick={() => setShowCourseModal(false)} className="text-slate-400 hover:text-slate-600"><X className="w-4 h-4" /></button>
                    </div>

                    <div className="space-y-3">
                      <div>
                        <label className="text-[10px] font-mono text-slate-400 uppercase tracking-wider block mb-1">Course Title</label>
                        <input
                          type="text"
                          required
                          value={courseForm.title}
                          onChange={e => setCourseForm({ ...courseForm, title: e.target.value })}
                          className="w-full px-3 py-2 border border-slate-200 rounded-xl text-xs focus:outline-none focus:border-indigo-600"
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <label className="text-[10px] font-mono text-slate-400 uppercase tracking-wider block mb-1">Category</label>
                          <select
                            value={courseForm.category}
                            onChange={e => setCourseForm({ ...courseForm, category: e.target.value })}
                            className="w-full px-3 py-2 border border-slate-200 rounded-xl text-xs focus:outline-none focus:border-indigo-600"
                          >
                            <option value="Design">Design</option>
                            <option value="Engineering">Engineering</option>
                            <option value="Product Management">Product Management</option>
                            <option value="Academics">Academics</option>
                          </select>
                        </div>
                        <div>
                          <label className="text-[10px] font-mono text-slate-400 uppercase tracking-wider block mb-1">Price ($)</label>
                          <input
                            type="number"
                            required
                            value={courseForm.price}
                            onChange={e => setCourseForm({ ...courseForm, price: Number(e.target.value) })}
                            className="w-full px-3 py-2 border border-slate-200 rounded-xl text-xs focus:outline-none focus:border-indigo-600"
                          />
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <label className="text-[10px] font-mono text-slate-400 uppercase tracking-wider block mb-1">Instructor</label>
                          <input
                            type="text"
                            required
                            value={courseForm.instructor}
                            onChange={e => setCourseForm({ ...courseForm, instructor: e.target.value })}
                            className="w-full px-3 py-2 border border-slate-200 rounded-xl text-xs focus:outline-none focus:border-indigo-600"
                          />
                        </div>
                        <div>
                          <label className="text-[10px] font-mono text-slate-400 uppercase tracking-wider block mb-1">Duration</label>
                          <input
                            type="text"
                            required
                            value={courseForm.duration}
                            onChange={e => setCourseForm({ ...courseForm, duration: e.target.value })}
                            className="w-full px-3 py-2 border border-slate-200 rounded-xl text-xs focus:outline-none focus:border-indigo-600"
                          />
                        </div>
                      </div>
                      <div>
                        <label className="text-[10px] font-mono text-slate-400 uppercase tracking-wider block mb-1">Description</label>
                        <textarea
                          rows={3}
                          required
                          value={courseForm.description}
                          onChange={e => setCourseForm({ ...courseForm, description: e.target.value })}
                          className="w-full p-2.5 border border-slate-200 rounded-xl text-xs focus:outline-none focus:border-indigo-600 resize-none"
                        />
                      </div>
                    </div>

                    <div className="flex justify-end gap-2.5 pt-4">
                      <button type="button" onClick={() => setShowCourseModal(false)} className="px-4 py-2 bg-slate-100 text-slate-600 text-xs font-semibold rounded-xl">Cancel</button>
                      <button type="submit" className="px-4 py-2 bg-indigo-600 text-white text-xs font-semibold rounded-xl shadow-lg">Publish Course</button>
                    </div>
                  </form>
                </div>
              )}

            </div>
          )}

          {/* ==================== TAB: MENTORS ==================== */}
          {activeTab === "mentors" && (
            <div className="space-y-6">
              
              <div className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-sm space-y-4">
                <span className="text-xs font-bold text-slate-800 block">Mentor Registry & Schedule Master</span>
                
                <div className="grid grid-cols-1 gap-4">
                  {mentors.map(m => (
                    <div key={m.id} className="p-4 border border-slate-150 rounded-xl bg-slate-50/50 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                      <div className="flex items-center gap-3">
                        <img src={m.image} alt={m.name} className="w-12 h-12 rounded-full object-cover border border-slate-200 shrink-0" />
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="font-bold text-slate-800 text-sm">{m.name}</span>
                            <span className="px-1.5 py-0.5 bg-green-50 border border-green-200 text-green-700 rounded text-[9px] font-bold">Approved</span>
                          </div>
                          <span className="text-xs text-slate-500 block leading-tight">{m.role} &bull; <strong className="text-slate-700">{m.company}</strong></span>
                          <span className="text-[10px] text-indigo-600 font-mono block mt-1">Earnings Tracker: ${(m.reviewsCount * 95 * 0.8).toFixed(0)} cumulative tracking</span>
                        </div>
                      </div>

                      {/* Active Availability Slots */}
                      <div className="space-y-1">
                        <span className="text-[10px] font-mono text-slate-400 block uppercase">Schedule availability</span>
                        <div className="flex flex-wrap gap-1.5">
                          {m.availability.map((av, index) => (
                            <span key={index} className="px-2 py-0.5 bg-white border border-slate-200 rounded-lg text-[9px] text-slate-600 font-medium flex items-center gap-1">
                              <span>{av}</span>
                              <button 
                                onClick={() => {
                                  const updated = m.availability.filter((_, idx) => idx !== index);
                                  setMentors(mentors.map(men => men.id === m.id ? { ...men, availability: updated } : men));
                                  onAddNotification("Schedule updated", `Availability slot removed from ${m.name}.`, "alert");
                                }}
                                className="text-rose-500 hover:text-rose-700"
                              >&times;</button>
                            </span>
                          ))}
                          <button 
                            onClick={() => setEditingScheduleMentorId(m.id)}
                            className="px-2 py-0.5 bg-indigo-50 text-indigo-700 border border-indigo-200 hover:bg-indigo-100 rounded-lg text-[9px] font-semibold"
                          >
                            + Slot
                          </button>
                        </div>

                        {/* Add Slot Panel */}
                        {editingScheduleMentorId === m.id && (
                          <div className="flex items-center gap-1.5 mt-2 animate-in slide-in-from-top-1 duration-150">
                            <input 
                              type="text" 
                              placeholder="e.g. Wednesday 3:00 PM" 
                              value={newScheduleSlot}
                              onChange={e => setNewScheduleSlot(e.target.value)}
                              className="px-2 py-1 border border-slate-200 rounded text-[10px] w-40"
                            />
                            <button 
                              onClick={() => {
                                if (!newScheduleSlot) return;
                                setMentors(mentors.map(men => men.id === m.id ? { ...men, availability: [...men.availability, newScheduleSlot] } : men));
                                onAddNotification("Schedule updated", `Availability slot added to ${m.name}.`, "recommendation");
                                setNewScheduleSlot("");
                                setEditingScheduleMentorId(null);
                              }}
                              className="px-2 py-1 bg-indigo-600 hover:bg-indigo-500 text-white rounded text-[10px] font-semibold"
                            >Add</button>
                            <button onClick={() => setEditingScheduleMentorId(null)} className="text-slate-400 hover:text-slate-600 text-xs">&times;</button>
                          </div>
                        )}
                      </div>

                    </div>
                  ))}
                </div>
              </div>

            </div>
          )}

          {/* ==================== TAB: INTERNSHIPS ==================== */}
          {activeTab === "internships" && (
            <div className="space-y-6">
              
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-800">Internship Database Control</span>
                <button
                  onClick={() => {
                    setOppType("Internship");
                    setShowOppModal(true);
                  }}
                  className="px-3 py-1.5 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold rounded-xl flex items-center gap-1.5 cursor-pointer shadow transition-colors"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Onboard Internship</span>
                </button>
              </div>

              {/* Filtering opportunities for type internship */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {opportunities.filter(o => o.type === "Internship").map(opp => (
                  <div key={opp.id} className="bg-white border border-slate-200 rounded-2xl p-4 shadow-sm flex flex-col justify-between">
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <span className="px-2 py-0.5 rounded-full text-[9px] font-bold bg-violet-50 text-violet-700">Internship</span>
                        <span className="text-[10px] text-slate-400 font-mono">{opp.location}</span>
                      </div>
                      <h3 className="text-xs font-bold text-slate-800">{opp.title}</h3>
                      <span className="text-[11px] text-slate-500 block">{opp.company}</span>
                      <p className="text-[10px] text-slate-400 mt-2">{opp.description}</p>
                    </div>

                    <div className="border-t border-slate-100 pt-3 mt-4 flex items-center justify-between">
                      <span className="text-[10px] font-semibold text-emerald-600 font-mono">{opp.stipendOrSalary}</span>
                      <button
                        onClick={() => {
                          setOpportunities(opportunities.filter(o => o.id !== opp.id));
                          onAddNotification("Internship Withdrawn", "Removed the internship opportunity record.", "alert");
                        }}
                        className="text-rose-500 hover:text-rose-700 text-xs font-bold cursor-pointer"
                      >Remove</button>
                    </div>
                  </div>
                ))}
              </div>

            </div>
          )}

          {/* ==================== TAB: JOBS ==================== */}
          {activeTab === "jobs" && (
            <div className="space-y-6">
              
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-800">Job Catalog Control</span>
                <button
                  onClick={() => {
                    setOppType("Job");
                    setShowOppModal(true);
                  }}
                  className="px-3 py-1.5 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold rounded-xl flex items-center gap-1.5 cursor-pointer shadow transition-colors"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Publish Job Post</span>
                </button>
              </div>

              {/* Filtering opportunities for type Job */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {opportunities.filter(o => o.type === "Job").map(opp => (
                  <div key={opp.id} className="bg-white border border-slate-200 rounded-2xl p-4 shadow-sm flex flex-col justify-between">
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <span className="px-2 py-0.5 rounded-full text-[9px] font-bold bg-indigo-50 text-indigo-700">Full-time Job</span>
                        <span className="text-[10px] text-slate-400 font-mono">{opp.location}</span>
                      </div>
                      <h3 className="text-xs font-bold text-slate-800">{opp.title}</h3>
                      <span className="text-[11px] text-slate-500 block">{opp.company}</span>
                      <p className="text-[10px] text-slate-400 mt-2">{opp.description}</p>
                    </div>

                    <div className="border-t border-slate-100 pt-3 mt-4 flex items-center justify-between">
                      <span className="text-[10px] font-semibold text-emerald-600 font-mono">{opp.stipendOrSalary}</span>
                      <button
                        onClick={() => {
                          setOpportunities(opportunities.filter(o => o.id !== opp.id));
                          onAddNotification("Job Post Removed", "Withdrew the job posting from search filters.", "alert");
                        }}
                        className="text-rose-500 hover:text-rose-700 text-xs font-bold cursor-pointer"
                      >Remove</button>
                    </div>
                  </div>
                ))}
              </div>

              {/* Opp Modal (Internship + Job combo) */}
              {showOppModal && (
                <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
                  <form onSubmit={handleCreateOpp} className="bg-white rounded-2xl max-w-md w-full border border-slate-200 p-6 space-y-4 animate-in fade-in zoom-in-95 duration-150">
                    <div className="flex justify-between items-center border-b border-slate-100 pb-2">
                      <span className="font-bold text-slate-900">Publish Career Opportunity</span>
                      <button type="button" onClick={() => setShowOppModal(false)} className="text-slate-400 hover:text-slate-600"><X className="w-4 h-4" /></button>
                    </div>

                    <div className="space-y-3">
                      <div>
                        <label className="text-[10px] font-mono text-slate-400 uppercase tracking-wider block mb-1">Opportunity Title</label>
                        <input
                          type="text"
                          required
                          value={oppForm.title}
                          onChange={e => setOppForm({ ...oppForm, title: e.target.value })}
                          className="w-full px-3 py-2 border border-slate-200 rounded-xl text-xs focus:outline-none focus:border-indigo-600"
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <label className="text-[10px] font-mono text-slate-400 uppercase tracking-wider block mb-1">Company</label>
                          <input
                            type="text"
                            required
                            value={oppForm.company}
                            onChange={e => setOppForm({ ...oppForm, company: e.target.value })}
                            className="w-full px-3 py-2 border border-slate-200 rounded-xl text-xs focus:outline-none focus:border-indigo-600"
                          />
                        </div>
                        <div>
                          <label className="text-[10px] font-mono text-slate-400 uppercase tracking-wider block mb-1">Location</label>
                          <input
                            type="text"
                            required
                            value={oppForm.location}
                            onChange={e => setOppForm({ ...oppForm, location: e.target.value })}
                            className="w-full px-3 py-2 border border-slate-200 rounded-xl text-xs focus:outline-none focus:border-indigo-600"
                          />
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <label className="text-[10px] font-mono text-slate-400 uppercase tracking-wider block mb-1">Compensation Range</label>
                          <input
                            type="text"
                            required
                            value={oppForm.stipendOrSalary}
                            onChange={e => setOppForm({ ...oppForm, stipendOrSalary: e.target.value })}
                            className="w-full px-3 py-2 border border-slate-200 rounded-xl text-xs focus:outline-none focus:border-indigo-600"
                          />
                        </div>
                        {oppType === "Internship" && (
                          <div>
                            <label className="text-[10px] font-mono text-slate-400 uppercase tracking-wider block mb-1">Duration</label>
                            <input
                              type="text"
                              required
                              value={oppForm.duration}
                              onChange={e => setOppForm({ ...oppForm, duration: e.target.value })}
                              className="w-full px-3 py-2 border border-slate-200 rounded-xl text-xs focus:outline-none focus:border-indigo-600"
                            />
                          </div>
                        )}
                      </div>
                      <div>
                        <label className="text-[10px] font-mono text-slate-400 uppercase tracking-wider block mb-1">Skills Required (Comma separated)</label>
                        <input
                          type="text"
                          required
                          placeholder="Figma, React, TypeScript"
                          value={oppForm.skillsRequired}
                          onChange={e => setOppForm({ ...oppForm, skillsRequired: e.target.value })}
                          className="w-full px-3 py-2 border border-slate-200 rounded-xl text-xs focus:outline-none focus:border-indigo-600"
                        />
                      </div>
                      <div>
                        <label className="text-[10px] font-mono text-slate-400 uppercase tracking-wider block mb-1">Role Description</label>
                        <textarea
                          rows={3}
                          required
                          value={oppForm.description}
                          onChange={e => setOppForm({ ...oppForm, description: e.target.value })}
                          className="w-full p-2.5 border border-slate-200 rounded-xl text-xs focus:outline-none focus:border-indigo-600 resize-none"
                        />
                      </div>
                    </div>

                    <div className="flex justify-end gap-2.5 pt-4">
                      <button type="button" onClick={() => setShowOppModal(false)} className="px-4 py-2 bg-slate-100 text-slate-600 text-xs font-semibold rounded-xl">Cancel</button>
                      <button type="submit" className="px-4 py-2 bg-indigo-600 text-white text-xs font-semibold rounded-xl shadow-lg">Onboard Career Post</button>
                    </div>
                  </form>
                </div>
              )}

            </div>
          )}

          {/* ==================== TAB: WORKSHOPS ==================== */}
          {activeTab === "workshops" && (
            <div className="space-y-6">
              
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-800">Workshop Schedules Control</span>
                <button
                  onClick={() => setShowWorkshopModal(true)}
                  className="px-3 py-1.5 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold rounded-xl flex items-center gap-1.5 cursor-pointer shadow transition-colors"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Onboard Workshop</span>
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {workshops.map(w => (
                  <div key={w.id} className="bg-white border border-slate-200 rounded-2xl p-4 shadow-sm flex flex-col justify-between">
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="px-2 py-0.5 rounded-full text-[9px] font-bold bg-amber-50 text-amber-700">{w.date}</span>
                        <span className="text-[10px] text-slate-400 font-mono">{w.time}</span>
                      </div>
                      <h3 className="text-xs font-bold text-slate-800 line-clamp-1">{w.title}</h3>
                      <span className="text-[10px] text-slate-500 block mt-1">Host: <strong>{w.host}</strong> ({w.company})</span>
                      <span className="text-[10px] text-indigo-600 block font-mono mt-1">Registrants: {w.registrants} enrolled</span>
                    </div>

                    <div className="border-t border-slate-100 pt-3 mt-4 flex items-center justify-between">
                      <span className="text-xs font-bold text-emerald-600">${w.price} Registration Fee</span>
                      <button
                        onClick={() => {
                          setWorkshops(workshops.filter(ws => ws.id !== w.id));
                          onAddNotification("Workshop Cancelled", "Withdrew the live workshop session calendar.", "alert");
                        }}
                        className="text-rose-500 hover:text-rose-700 text-xs font-bold cursor-pointer"
                      >Cancel Workshop</button>
                    </div>
                  </div>
                ))}
              </div>

              {/* Workshop Modal */}
              {showWorkshopModal && (
                <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
                  <form onSubmit={handleCreateWorkshop} className="bg-white rounded-2xl max-w-md w-full border border-slate-200 p-6 space-y-4 animate-in fade-in zoom-in-95 duration-150">
                    <div className="flex justify-between items-center border-b border-slate-100 pb-2">
                      <span className="font-bold text-slate-900">Publish Online Workshop</span>
                      <button type="button" onClick={() => setShowWorkshopModal(false)} className="text-slate-400 hover:text-slate-600"><X className="w-4 h-4" /></button>
                    </div>

                    <div className="space-y-3">
                      <div>
                        <label className="text-[10px] font-mono text-slate-400 uppercase tracking-wider block mb-1">Workshop Title</label>
                        <input
                          type="text"
                          required
                          value={workshopForm.title}
                          onChange={e => setWorkshopForm({ ...workshopForm, title: e.target.value })}
                          className="w-full px-3 py-2 border border-slate-200 rounded-xl text-xs focus:outline-none focus:border-indigo-600"
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <label className="text-[10px] font-mono text-slate-400 uppercase tracking-wider block mb-1">Host Coach</label>
                          <input
                            type="text"
                            required
                            value={workshopForm.host}
                            onChange={e => setWorkshopForm({ ...workshopForm, host: e.target.value })}
                            className="w-full px-3 py-2 border border-slate-200 rounded-xl text-xs focus:outline-none focus:border-indigo-600"
                          />
                        </div>
                        <div>
                          <label className="text-[10px] font-mono text-slate-400 uppercase tracking-wider block mb-1">Company Host</label>
                          <input
                            type="text"
                            required
                            value={workshopForm.company}
                            onChange={e => setWorkshopForm({ ...workshopForm, company: e.target.value })}
                            className="w-full px-3 py-2 border border-slate-200 rounded-xl text-xs focus:outline-none focus:border-indigo-600"
                          />
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <label className="text-[10px] font-mono text-slate-400 uppercase tracking-wider block mb-1">Price ($)</label>
                          <input
                            type="number"
                            required
                            value={workshopForm.price}
                            onChange={e => setWorkshopForm({ ...workshopForm, price: Number(e.target.value) })}
                            className="w-full px-3 py-2 border border-slate-200 rounded-xl text-xs focus:outline-none focus:border-indigo-600"
                          />
                        </div>
                        <div>
                          <label className="text-[10px] font-mono text-slate-400 uppercase tracking-wider block mb-1">Duration</label>
                          <input
                            type="text"
                            required
                            value={workshopForm.duration}
                            onChange={e => setWorkshopForm({ ...workshopForm, duration: e.target.value })}
                            className="w-full px-3 py-2 border border-slate-200 rounded-xl text-xs focus:outline-none focus:border-indigo-600"
                          />
                        </div>
                      </div>
                    </div>

                    <div className="flex justify-end gap-2.5 pt-4">
                      <button type="button" onClick={() => setShowWorkshopModal(false)} className="px-4 py-2 bg-slate-100 text-slate-600 text-xs font-semibold rounded-xl">Cancel</button>
                      <button type="submit" className="px-4 py-2 bg-indigo-600 text-white text-xs font-semibold rounded-xl shadow-lg">Onboard Workshop</button>
                    </div>
                  </form>
                </div>
              )}

            </div>
          )}

          {/* ==================== TAB: SCHOLARSHIPS ==================== */}
          {activeTab === "scholarships" && (
            <div className="space-y-6">
              
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-800">Scholarship Registry Master</span>
                <button
                  onClick={() => setShowScholarshipModal(true)}
                  className="px-3 py-1.5 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold rounded-xl flex items-center gap-1.5 cursor-pointer shadow transition-colors"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Onboard Grant</span>
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {scholarships.map(s => (
                  <div key={s.id} className="bg-white border border-slate-200 rounded-2xl p-4 shadow-sm flex flex-col justify-between">
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="px-2 py-0.5 rounded-full text-[9px] font-bold bg-green-50 text-green-700">{s.amount} Funding</span>
                        <span className="text-[10px] text-rose-500 font-semibold font-mono">Deadline: {s.deadline}</span>
                      </div>
                      <h3 className="text-xs font-bold text-slate-800 line-clamp-1">{s.title}</h3>
                      <span className="text-[10px] text-slate-400 block mt-1">Provider: {s.provider}</span>
                    </div>

                    <div className="border-t border-slate-100 pt-3 mt-4 flex items-center justify-between">
                      <span className="text-[10px] font-semibold text-slate-500">Active verification pipelines</span>
                      <button
                        onClick={() => {
                          setScholarships(scholarships.filter(sh => sh.id !== s.id));
                          onAddNotification("Grant Suspended", "Withdrew the scholarship merit program.", "alert");
                        }}
                        className="text-rose-500 hover:text-rose-700 text-xs font-bold cursor-pointer"
                      >Withdraw</button>
                    </div>
                  </div>
                ))}
              </div>

              {/* Scholarship Modal */}
              {showScholarshipModal && (
                <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
                  <form onSubmit={handleCreateScholarship} className="bg-white rounded-2xl max-w-md w-full border border-slate-200 p-6 space-y-4 animate-in fade-in zoom-in-95 duration-150">
                    <div className="flex justify-between items-center border-b border-slate-100 pb-2">
                      <span className="font-bold text-slate-900">Publish Scholarship Merit Grant</span>
                      <button type="button" onClick={() => setShowScholarshipModal(false)} className="text-slate-400 hover:text-slate-600"><X className="w-4 h-4" /></button>
                    </div>

                    <div className="space-y-3">
                      <div>
                        <label className="text-[10px] font-mono text-slate-400 uppercase tracking-wider block mb-1">Scholarship / Grant Title</label>
                        <input
                          type="text"
                          required
                          value={scholarshipForm.title}
                          onChange={e => setScholarshipForm({ ...scholarshipForm, title: e.target.value })}
                          className="w-full px-3 py-2 border border-slate-200 rounded-xl text-xs focus:outline-none focus:border-indigo-600"
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <label className="text-[10px] font-mono text-slate-400 uppercase tracking-wider block mb-1">Provider Foundation</label>
                          <input
                            type="text"
                            required
                            value={scholarshipForm.provider}
                            onChange={e => setScholarshipForm({ ...scholarshipForm, provider: e.target.value })}
                            className="w-full px-3 py-2 border border-slate-200 rounded-xl text-xs focus:outline-none focus:border-indigo-600"
                          />
                        </div>
                        <div>
                          <label className="text-[10px] font-mono text-slate-400 uppercase tracking-wider block mb-1">Grant Amount ($)</label>
                          <input
                            type="text"
                            required
                            value={scholarshipForm.amount}
                            onChange={e => setScholarshipForm({ ...scholarshipForm, amount: e.target.value })}
                            className="w-full px-3 py-2 border border-slate-200 rounded-xl text-xs focus:outline-none focus:border-indigo-600"
                          />
                        </div>
                      </div>
                      <div>
                        <label className="text-[10px] font-mono text-slate-400 uppercase tracking-wider block mb-1">Eligibility Criteria</label>
                        <input
                          type="text"
                          required
                          placeholder="Figma, STEM background, Student status"
                          value={scholarshipForm.eligibility}
                          onChange={e => setScholarshipForm({ ...scholarshipForm, eligibility: e.target.value })}
                          className="w-full px-3 py-2 border border-slate-200 rounded-xl text-xs focus:outline-none focus:border-indigo-600"
                        />
                      </div>
                    </div>

                    <div className="flex justify-end gap-2.5 pt-4">
                      <button type="button" onClick={() => setShowScholarshipModal(false)} className="px-4 py-2 bg-slate-100 text-slate-600 text-xs font-semibold rounded-xl">Cancel</button>
                      <button type="submit" className="px-4 py-2 bg-indigo-600 text-white text-xs font-semibold rounded-xl shadow-lg">Onboard Fellowship</button>
                    </div>
                  </form>
                </div>
              )}

            </div>
          )}

          {/* ==================== TAB: BLOGS ==================== */}
          {activeTab === "blogs" && (
            <div className="space-y-6">
              
              <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm space-y-4">
                <span className="text-xs font-bold text-slate-800 block">Blog Content & Forums Moderator</span>

                <div className="space-y-3">
                  {blogs.map(b => (
                    <div key={b.id} className="p-3 border border-slate-100 rounded-xl bg-slate-50 flex items-center justify-between text-xs">
                      <div>
                        <span className="font-bold text-slate-900 block">{b.title}</span>
                        <span className="text-[10px] text-indigo-600 block leading-none font-mono">Category: {b.category} &bull; Authored by: {b.author}</span>
                      </div>
                      <button
                        onClick={() => {
                          setBlogs(blogs.filter(bl => bl.id !== b.id));
                          onAddNotification("Forum Post Withdrawn", "Moderate rule infraction trigger applied.", "alert");
                        }}
                        className="text-rose-500 hover:text-rose-700 font-bold hover:underline"
                      >Moderate / Remove</button>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          )}

          {/* ==================== TAB: SUPPORT TICKETS ==================== */}
          {activeTab === "tickets" && (
            <div className="space-y-6">
              
              <div className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-sm space-y-4">
                <span className="text-xs font-bold text-slate-800 block">Support Tickets Desk</span>

                <div className="space-y-3">
                  {tickets.map(t => (
                    <div key={t.id} className="p-4 border border-slate-150 rounded-xl bg-slate-50/50 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <span className="font-mono text-[10px] text-slate-400">{t.id}</span>
                          <span className={`px-2 py-0.5 rounded-full text-[9px] font-bold ${
                            t.status === "Open" ? "bg-amber-100 text-amber-800" : "bg-emerald-100 text-emerald-800"
                          }`}>{t.status}</span>
                          <span className={`px-1.5 py-0.5 text-[9px] font-bold ${
                            t.priority === "High" ? "text-rose-600" : "text-slate-500"
                          }`}>Priority: {t.priority}</span>
                        </div>
                        <h3 className="text-xs font-bold text-slate-800">{t.subject}</h3>
                        <span className="text-[10px] text-slate-500 block leading-relaxed">{t.messages[0]?.message}</span>
                      </div>

                      <div className="flex items-center gap-2">
                        <select
                          onChange={e => handleAssignTicket(t.id, e.target.value)}
                          defaultValue=""
                          className="px-2 py-1 bg-white border border-slate-200 rounded text-[10px] focus:outline-none"
                        >
                          <option value="" disabled>Assign Support</option>
                          <option value="Adrian T.">Adrian Thompson</option>
                          <option value="Sarah J.">Sarah Jenkins</option>
                          <option value="Support Bot">Automated Bot</option>
                        </select>
                        {t.status === "Open" && (
                          <button
                            onClick={() => handleResolveTicket(t.id)}
                            className="px-3 py-1 bg-indigo-600 hover:bg-indigo-500 text-white rounded text-[10px] font-semibold"
                          >Resolve</button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          )}

          {/* ==================== TAB: AI RECOMMENDATION ==================== */}
          {activeTab === "ai" && (
            <div className="space-y-6">
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                
                {/* Rules setup */}
                <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm space-y-4">
                  <span className="text-xs font-bold text-slate-800 block">AI Matching Constraint Matrix</span>
                  
                  <div className="space-y-3.5 text-xs">
                    <div>
                      <div className="flex justify-between items-center mb-1">
                        <span className="font-semibold text-slate-700">Minimum Skill Match Threshold</span>
                        <span className="font-mono text-indigo-600 font-bold">{aiMatchThreshold}%</span>
                      </div>
                      <input 
                        type="range" 
                        min="50" 
                        max="98" 
                        value={aiMatchThreshold} 
                        onChange={e => {
                          setAiMatchThreshold(Number(e.target.value));
                          onAddNotification("Recommendation Constraints Updated", `Required match scoring floor raised to ${e.target.value}%.`, "recommendation");
                        }}
                        className="w-full accent-indigo-600"
                      />
                      <p className="text-[9px] text-slate-400 leading-none mt-1">Raise match requirements to increase recommendation precision.</p>
                    </div>

                    <div>
                      <span className="font-semibold text-slate-700 block mb-1">Priority Weights</span>
                      <input 
                        type="text" 
                        value={aiPriorityWeight} 
                        onChange={e => setAiPriorityWeight(e.target.value)}
                        className="w-full px-3 py-2 border border-slate-200 rounded-xl text-xs focus:outline-none focus:border-indigo-600 font-mono text-indigo-700"
                      />
                    </div>
                  </div>
                </div>

                {/* Skill mappings */}
                <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm space-y-4">
                  <span className="text-xs font-bold text-slate-800 block">AI Ontology Skill Maps</span>
                  
                  <div className="space-y-2 text-xs">
                    <div className="max-h-36 overflow-y-auto space-y-1.5 border-b border-slate-100 pb-3">
                      {skillMappings.map((m, i) => (
                        <div key={i} className="flex items-center gap-2 p-1.5 bg-slate-50 rounded-lg text-[10px] font-mono">
                          <span className="text-indigo-600 font-bold">{m.from}</span>
                          <ChevronRight className="w-3 h-3 text-slate-400" />
                          <span className="text-slate-600 font-semibold">{m.to}</span>
                        </div>
                      ))}
                    </div>

                    <div className="flex items-center gap-2 pt-2">
                      <input 
                        type="text" 
                        placeholder="Keyword e.g. React" 
                        value={newMappingFrom}
                        onChange={e => setNewMappingFrom(e.target.value)}
                        className="flex-1 px-2.5 py-1.5 border border-slate-200 rounded-lg text-[10px] focus:outline-none"
                      />
                      <input 
                        type="text" 
                        placeholder="Category Cohort" 
                        value={newMappingTo}
                        onChange={e => setNewMappingTo(e.target.value)}
                        className="flex-1 px-2.5 py-1.5 border border-slate-200 rounded-lg text-[10px] focus:outline-none"
                      />
                      <button 
                        onClick={handleAddSkillMapping}
                        className="px-3 py-1.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg text-[10px] font-bold"
                      >Add Mapping</button>
                    </div>
                  </div>
                </div>

              </div>

            </div>
          )}

          {/* ==================== TAB: CMS ==================== */}
          {activeTab === "cms" && (
            <div className="space-y-6">
              
              <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm space-y-4">
                <span className="text-xs font-bold text-slate-800 block">Homepage Hero & Layout Config</span>

                <div className="space-y-3.5 text-xs">
                  <div>
                    <label className="text-[10px] font-mono text-slate-400 uppercase tracking-wider block mb-1">Headline Text</label>
                    <input 
                      type="text" 
                      value={cmsHeadline} 
                      onChange={e => {
                        setCmsHeadline(e.target.value);
                        onAddNotification("CMS Config Saved", "Hero Headline copy revised.", "alert");
                      }}
                      className="w-full px-3 py-2 border border-slate-200 rounded-xl text-xs focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="text-[10px] font-mono text-slate-400 uppercase tracking-wider block mb-1">Sub-Headline description</label>
                    <textarea 
                      rows={3} 
                      value={cmsSubHeadline} 
                      onChange={e => setCmsSubHeadline(e.target.value)}
                      className="w-full p-2.5 border border-slate-200 rounded-xl text-xs focus:outline-none resize-none"
                    />
                  </div>
                </div>
              </div>

              {/* FAQ list control */}
              <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm space-y-4">
                <span className="text-xs font-bold text-slate-800 block">FAQ Database CRUD</span>

                <div className="space-y-3">
                  <div className="max-h-44 overflow-y-auto space-y-2 border-b border-slate-100 pb-3">
                    {cmsFaqs.map(faq => (
                      <div key={faq.id} className="p-2.5 bg-slate-50 rounded-lg text-xs flex justify-between gap-3">
                        <div>
                          <strong className="text-slate-800 block mb-0.5">Q: {faq.q}</strong>
                          <span className="text-slate-500">A: {faq.a}</span>
                        </div>
                        <button
                          onClick={() => setCmsFaqs(cmsFaqs.filter(f => f.id !== faq.id))}
                          className="text-rose-500 hover:text-rose-700 font-bold"
                        >&times;</button>
                      </div>
                    ))}
                  </div>

                  <div className="space-y-2 pt-1">
                    <input 
                      type="text" 
                      placeholder="Frequently Asked Question" 
                      value={newFaqQ}
                      onChange={e => setNewFaqQ(e.target.value)}
                      className="w-full px-2.5 py-1.5 border border-slate-200 rounded-xl text-xs"
                    />
                    <div className="flex gap-2">
                      <input 
                        type="text" 
                        placeholder="Resolution / Answer" 
                        value={newFaqA}
                        onChange={e => setNewFaqA(e.target.value)}
                        className="flex-grow px-2.5 py-1.5 border border-slate-200 rounded-xl text-xs"
                      />
                      <button 
                        onClick={handleAddFaq}
                        className="px-4 py-1.5 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold rounded-xl"
                      >Add FAQ</button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Terms of Service CMS editor */}
              <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm space-y-3">
                <span className="text-xs font-bold text-slate-800 block">Terms & Conditions & Privacy Document Builder</span>
                <textarea 
                  rows={4}
                  className="w-full p-2.5 border border-slate-200 rounded-xl text-xs font-mono text-slate-600"
                  defaultValue={`# Terms & Conditions of Lumina Academy\n\n1. Students gain access to non-exclusive peer cohorts.\n2. Refund policies apply for premium design token packages within 14 business cycles.`}
                />
              </div>

            </div>
          )}

          {/* ==================== TAB: REPORTS ==================== */}
          {activeTab === "reports" && (
            <div className="space-y-6">
              
              <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm space-y-4">
                <span className="text-xs font-bold text-slate-800 block">Reports Export Dashboard</span>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 text-xs">
                  
                  <div className="p-4 border border-slate-100 rounded-xl bg-slate-50 text-slate-700 flex flex-col justify-between h-28">
                    <div>
                      <span className="font-bold text-slate-900 block">Enrolment Cohort PDF</span>
                      <span className="text-[10px] text-slate-400">Total registers, active pathways</span>
                    </div>
                    <button 
                      onClick={() => onAddNotification("PDF Export Dispatched", "Downloading cohort enrollment logs.", "recommendation")}
                      className="mt-2 py-1.5 w-full bg-white hover:bg-slate-100 border border-slate-200 font-semibold rounded-lg"
                    >Generate Export</button>
                  </div>

                  <div className="p-4 border border-slate-100 rounded-xl bg-slate-50 text-slate-700 flex flex-col justify-between h-28">
                    <div>
                      <span className="font-bold text-slate-900 block">Revenue Streams (CSV)</span>
                      <span className="text-[10px] text-slate-400">Monthly gross sales, commissions</span>
                    </div>
                    <button 
                      onClick={() => onAddNotification("CSV Export Complete", "Revenue database output generated.", "alert")}
                      className="mt-2 py-1.5 w-full bg-white hover:bg-slate-100 border border-slate-200 font-semibold rounded-lg"
                    >Export Sheets</button>
                  </div>

                  <div className="p-4 border border-slate-100 rounded-xl bg-slate-50 text-slate-700 flex flex-col justify-between h-28">
                    <div>
                      <span className="font-bold text-slate-900 block">Career Pipeline XML</span>
                      <span className="text-[10px] text-slate-400">Application rates & status tracks</span>
                    </div>
                    <button 
                      onClick={() => onAddNotification("XML Pipeline Exported", "Exported job & internship logs.", "application")}
                      className="mt-2 py-1.5 w-full bg-white hover:bg-slate-100 border border-slate-200 font-semibold rounded-lg"
                    >Export Directory</button>
                  </div>

                </div>
              </div>

            </div>
          )}

          {/* ==================== TAB: SEO ==================== */}
          {activeTab === "seo" && (
            <div className="space-y-6">
              
              <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm space-y-4">
                <span className="text-xs font-bold text-slate-800 block">SEO Meta Information Management</span>

                <div className="space-y-4 text-xs text-slate-700">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="text-[10px] font-mono text-slate-400 uppercase tracking-wider block mb-1">Home Meta Title</label>
                      <input 
                        type="text" 
                        value={seoConfig.homeTitle} 
                        onChange={e => setSeoConfig({ ...seoConfig, homeTitle: e.target.value })}
                        className="w-full px-3 py-2 border border-slate-200 rounded-xl text-xs"
                      />
                    </div>
                    <div>
                      <label className="text-[10px] font-mono text-slate-400 uppercase tracking-wider block mb-1">Home Meta Description</label>
                      <input 
                        type="text" 
                        value={seoConfig.homeDesc} 
                        onChange={e => setSeoConfig({ ...seoConfig, homeDesc: e.target.value })}
                        className="w-full px-3 py-2 border border-slate-200 rounded-xl text-xs"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="text-[10px] font-mono text-slate-400 uppercase tracking-wider block mb-1">Courses Page Title</label>
                      <input 
                        type="text" 
                        value={seoConfig.coursesTitle} 
                        onChange={e => setSeoConfig({ ...seoConfig, coursesTitle: e.target.value })}
                        className="w-full px-3 py-2 border border-slate-200 rounded-xl text-xs"
                      />
                    </div>
                    <div>
                      <label className="text-[10px] font-mono text-slate-400 uppercase tracking-wider block mb-1">Courses Page Description</label>
                      <input 
                        type="text" 
                        value={seoConfig.coursesDesc} 
                        onChange={e => setSeoConfig({ ...seoConfig, coursesDesc: e.target.value })}
                        className="w-full px-3 py-2 border border-slate-200 rounded-xl text-xs"
                      />
                    </div>
                  </div>

                  <div>
                    <button
                      onClick={() => onAddNotification("SEO Metadata Saved", "Meta headers and crawler routes updated.", "recommendation")}
                      className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold rounded-xl shadow"
                    >Save SEO configuration</button>
                  </div>
                </div>
              </div>

            </div>
          )}

        </div>
      </div>

    </div>
  );
}
