import React, { useState, useEffect } from "react";
import { Sparkles, Trophy, Award, Compass, ArrowRight, X } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { Routes, Route, Navigate, useNavigate, useParams, useLocation } from "react-router-dom";

// Import core types
import { UserProfile, Course, Mentor, Opportunity, Workshop, Scholarship, BlogPost, Notification, SupportTicket, AdminProfile, LiveClass, MentorProduct } from "./types";

// Import robust static data
import {
  INITIAL_PROFILE,
  INITIAL_COURSES,
  INITIAL_MENTORS,
  INITIAL_OPPORTUNITIES,
  INITIAL_WORKSHOPS,
  INITIAL_SCHOLARSHIPS,
  INITIAL_BLOGS,
  INITIAL_NOTIFICATIONS,
  INITIAL_TICKETS,
  INITIAL_LIVE_CLASSES,
  INITIAL_MENTOR_PRODUCTS
} from "./data";

// Import modular components
import LandingPage from "./components/LandingPage";
import CategoryPage from "./components/CategoryPage";
import CourseDetailPage from "./components/CourseDetailPage";
import CoursesPage from "./components/CoursesPage";
import InstructorsPage from "./components/InstructorsPage";
import StorePage from "./components/StorePage";
import ForumsPage from "./components/ForumsPage";
import AuthFlow from "./components/AuthFlow";
import Sidebar from "./components/Sidebar";
import Header from "./components/Header";
import CaseStudy from "./components/CaseStudy";
import AdminLogin from "./components/AdminLogin";
import AdminPanel from "./components/AdminPanel";

// Import feature view modules
import DashboardHome from "./components/DashboardHome";
import CoursesModule from "./components/CoursesModule";
import MentorshipModule from "./components/MentorshipModule";
import OpportunitiesModule from "./components/OpportunitiesModule";
import AIModule from "./components/AIModule";
import PortfolioModule from "./components/PortfolioModule";
import CommunityBlogsModule from "./components/CommunityBlogsModule";
import SupportModule from "./components/SupportModule";
import SettingsModule from "./components/SettingsModule";
import WorkshopsModule from "./components/WorkshopsModule";

const WorkspaceComponent = ({ userProfile, courses, liveClasses, mentors, mentorProducts, opportunities, workshops, scholarships, blogs, notifications, setNotifications, tickets, handleAddNotification, handleEnrollCourse, setCourses, setOpportunities, setScholarships, setBlogs, setTickets, setUserProfile, setWorkshops }: any) => {
  const navigate = useNavigate();
  const { role, view } = useParams<{ role: string, view: string }>();
  const activeView = view || "dashboard";
  
  return (
    <motion.div
      key="app"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
      className="h-screen flex overflow-hidden"
    >
      <Sidebar
        activeView={activeView}
        setActiveView={(v) => navigate(`/${role}/${v}`)}
        userProfile={userProfile}
        notificationsCount={notifications.filter((n) => !n.read).length}
        onNavigateToAdmin={role === "admin" ? () => navigate("/admin/dashboard") : undefined}
        onLogout={() => navigate("/")}
      />
      <div className="flex-grow flex flex-col min-w-0">
        <Header
          notifications={notifications}
          setNotifications={setNotifications}
          onViewCaseStudy={() => {}}
          isCaseStudyActive={false}
          onExitCaseStudy={() => {}}
          onNavigateToView={(v) => navigate(`/${role}/${v}`)}
          userProfile={userProfile}
          onAddNotification={handleAddNotification}
        />
        <main className="flex-1 p-6 overflow-hidden bg-slate-100/50">
          {activeView === "dashboard" && <DashboardHome userProfile={userProfile} courses={courses} mentors={mentors} opportunities={opportunities} workshops={workshops} scholarships={scholarships} onNavigateToView={(v) => navigate(`/${role}/${v}`)} onEnrollCourse={handleEnrollCourse} />}
          {activeView === "courses" && <CoursesModule courses={courses} setCourses={setCourses} liveClasses={liveClasses} onAddNotification={handleAddNotification} />}
          {activeView === "mentorship" && <MentorshipModule mentors={mentors} mentorProducts={mentorProducts} onAddNotification={handleAddNotification} />}
          {activeView === "opportunities" && <OpportunitiesModule opportunities={opportunities} setOpportunities={setOpportunities} scholarships={scholarships} setScholarships={setScholarships} onAddNotification={handleAddNotification} />}
          {activeView === "workshops" && <WorkshopsModule workshops={workshops} setWorkshops={setWorkshops} onAddNotification={handleAddNotification} />}
          {activeView === "ai" && <AIModule userProfile={userProfile} />}
          {activeView === "portfolio" && <PortfolioModule userProfile={userProfile} setUserProfile={setUserProfile} onAddNotification={handleAddNotification} />}
          {activeView === "blogs" && <CommunityBlogsModule blogs={blogs} setBlogs={setBlogs} />}
          {activeView === "support" && <SupportModule tickets={tickets} setTickets={setTickets} onAddNotification={handleAddNotification} />}
          {activeView === "settings" && <SettingsModule userProfile={userProfile} setUserProfile={setUserProfile} onAddNotification={handleAddNotification} />}
        </main>
      </div>
    </motion.div>
  );
};

export default function App() {
  const navigate = useNavigate();
  const location = useLocation();
  const [isCaseStudyActive, setIsCaseStudyActive] = useState<boolean>(false);
  const [currentAdmin, setCurrentAdmin] = useState<AdminProfile | null>(null);

  // Ecosystem dynamic states
  const [userProfile, setUserProfile] = useState<UserProfile>(INITIAL_PROFILE);
  const [courses, setCourses] = useState<Course[]>(INITIAL_COURSES);
  const [mentors, setMentors] = useState<Mentor[]>(INITIAL_MENTORS);
  const [opportunities, setOpportunities] = useState<Opportunity[]>(INITIAL_OPPORTUNITIES);
  const [workshops, setWorkshops] = useState<Workshop[]>(INITIAL_WORKSHOPS);
  const [scholarships, setScholarships] = useState<Scholarship[]>(INITIAL_SCHOLARSHIPS);
  const [blogs, setBlogs] = useState<BlogPost[]>(INITIAL_BLOGS);
  const [notifications, setNotifications] = useState<Notification[]>(INITIAL_NOTIFICATIONS);
  const [tickets, setTickets] = useState<SupportTicket[]>(INITIAL_TICKETS);
  const [liveClasses, setLiveClasses] = useState<LiveClass[]>(INITIAL_LIVE_CLASSES);
  const [mentorProducts, setMentorProducts] = useState<MentorProduct[]>(INITIAL_MENTOR_PRODUCTS);

  // Trigger global system notifications
  const handleAddNotification = (
    title: string,
    description: string,
    type: "message" | "alert" | "recommendation" | "application"
  ) => {
    const newNotif: Notification = {
      id: `n-${Date.now()}`,
      type,
      title,
      description,
      time: "Just now",
      read: false
    };
    setNotifications([newNotif, ...notifications]);
  };

  const handleEnrollCourse = (id: string) => {
    setCourses(
      courses.map((c) => {
        if (c.id === id) {
          return { ...c, enrolled: true, progress: 10 };
        }
        return c;
      })
    );
    const crs = courses.find((c) => c.id === id);
    if (crs) {
      handleAddNotification(
        "Course Enrollment Succeeded",
        `You have successfully registered for: ${crs.title}.`,
        "recommendation"
      );
    }
  };

  const handleAuthSuccess = (onboardedProfile: Partial<UserProfile>) => {
    setUserProfile((prev) => ({
      ...prev,
      ...onboardedProfile
    }));
    navigate(`/${onboardedProfile.role || "Student"}/dashboard`);
    handleAddNotification(
      "Ecosystem Configured",
      `Welcome, ${onboardedProfile.fullName || userProfile.fullName}! Your custom telemetry and career score are compiled.`,
      "alert"
    );
  };

  return (
    <div className="bg-[#F8FAFC] text-slate-900 min-h-screen relative overflow-x-hidden font-sans">
      <AnimatePresence mode="wait">
        <Routes location={location}>
          <Route path="/" element={!isCaseStudyActive ? (
            <motion.div key="landing" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.4 }}>
              <LandingPage onViewCaseStudy={() => setIsCaseStudyActive(true)} />
            </motion.div>
          ) : null} />

          <Route path="/category/:categoryId" element={!isCaseStudyActive ? (
            <motion.div key="category" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.4 }}>
              <CategoryPage />
            </motion.div>
          ) : null} />

          <Route path="/category/:categoryId/:subCategoryId" element={!isCaseStudyActive ? (
            <motion.div key="subcategory" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.4 }}>
              <CategoryPage />
            </motion.div>
          ) : null} />

          <Route path="/course/:courseId" element={!isCaseStudyActive ? (
            <motion.div key="course-detail" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.4 }}>
              <CourseDetailPage />
            </motion.div>
          ) : null} />

          <Route path="/courses" element={!isCaseStudyActive ? (
            <motion.div key="courses-page" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.4 }}>
              <CoursesPage />
            </motion.div>
          ) : null} />

          <Route path="/instructors" element={!isCaseStudyActive ? (
            <motion.div key="instructors-page" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.4 }}>
              <InstructorsPage />
            </motion.div>
          ) : null} />

          <Route path="/store" element={!isCaseStudyActive ? (
            <motion.div key="store-page" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.4 }}>
              <StorePage />
            </motion.div>
          ) : null} />

          <Route path="/forums" element={!isCaseStudyActive ? (
            <motion.div key="forums-page" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.4 }}>
              <ForumsPage />
            </motion.div>
          ) : null} />

          <Route path="/admin/login" element={!isCaseStudyActive ? (
            <motion.div key="admin-login" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.4 }} className="h-screen w-screen overflow-hidden">
              {!currentAdmin ? (
                <AdminLogin onLogin={(profile) => setCurrentAdmin(profile)} onBack={() => navigate("/")} />
              ) : (
                <Navigate to="/admin/dashboard" replace />
              )}
            </motion.div>
          ) : null} />

          <Route path="/admin/:tab?" element={!isCaseStudyActive ? (
            <motion.div key="admin" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.4 }} className="h-screen w-screen overflow-hidden">
              {!currentAdmin ? (
                <Navigate to="/admin/login" replace />
              ) : (
                <AdminPanel
                  currentAdmin={currentAdmin}
                  courses={courses} setCourses={setCourses}
                  mentors={mentors} setMentors={setMentors}
                  opportunities={opportunities} setOpportunities={setOpportunities}
                  workshops={workshops} setWorkshops={setWorkshops}
                  scholarships={scholarships} setScholarships={setScholarships}
                  blogs={blogs} setBlogs={setBlogs}
                  tickets={tickets} setTickets={setTickets}
                  onAddNotification={handleAddNotification}
                  onLogout={() => setCurrentAdmin(null)}
                  onClose={() => navigate("/")}
                />
              )}
            </motion.div>
          ) : null} />

          <Route path="/:role/login" element={!isCaseStudyActive ? (
            <motion.div key="auth-login" initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 1.02 }} transition={{ duration: 0.3 }}>
              <AuthFlow initialScreen="login" onAuthSuccess={handleAuthSuccess} />
            </motion.div>
          ) : null} />

          <Route path="/:role/register" element={!isCaseStudyActive ? (
            <motion.div key="auth-reg" initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 1.02 }} transition={{ duration: 0.3 }}>
              <AuthFlow initialScreen="signup" onAuthSuccess={handleAuthSuccess} />
            </motion.div>
          ) : null} />

          <Route path="/:role/:view" element={!isCaseStudyActive ? <WorkspaceComponent userProfile={userProfile} courses={courses} liveClasses={liveClasses} mentors={mentors} mentorProducts={mentorProducts} opportunities={opportunities} workshops={workshops} scholarships={scholarships} blogs={blogs} notifications={notifications} setNotifications={setNotifications} tickets={tickets} handleAddNotification={handleAddNotification} handleEnrollCourse={handleEnrollCourse} setCourses={setCourses} setOpportunities={setOpportunities} setScholarships={setScholarships} setBlogs={setBlogs} setTickets={setTickets} setUserProfile={setUserProfile} setWorkshops={setWorkshops} /> : null} />

          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </AnimatePresence>

      {/* OVERLAY MODE: UX STRATEGY & DESIGN SYSTEM PLAYGROUND */}
      {isCaseStudyActive && (
        <div className="fixed inset-0 z-50 flex flex-col bg-[#070a13] overflow-hidden">
          {/* Symmetrical Top navigation rule */}
          <div className="bg-gray-950 border-b border-gray-900 px-6 py-4 flex items-center justify-between shrink-0">
            <div className="flex items-center gap-2">
              <Compass className="w-5 h-5 text-indigo-400" />
              <span className="font-display font-semibold text-sm text-white">Lumina Strategy & Tokens Deck</span>
            </div>
            <button
              onClick={() => setIsCaseStudyActive(false)}
              className="px-4 py-1.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-xs font-semibold flex items-center gap-1 cursor-pointer transition-colors"
            >
              <X className="w-4 h-4" />
              <span>Return to Workspace</span>
            </button>
          </div>

          <div className="flex-1 overflow-y-auto">
            <CaseStudy />
          </div>
        </div>
      )}
    </div>
  );
}
