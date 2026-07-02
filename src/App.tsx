import React, { useState, useEffect } from "react";
import { Sparkles, Trophy, Award, Compass, ArrowRight, X } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

// Import core types
import { UserProfile, Course, Mentor, Opportunity, Workshop, Scholarship, BlogPost, Notification, SupportTicket } from "./types";

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
  INITIAL_TICKETS
} from "./data";

// Import modular components
import LandingPage from "./components/LandingPage";
import AuthFlow from "./components/AuthFlow";
import Sidebar from "./components/Sidebar";
import Header from "./components/Header";
import CaseStudy from "./components/CaseStudy";
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

type ViewMode = "landing" | "auth" | "app" | "admin";

export default function App() {
  const [viewMode, setViewMode] = useState<ViewMode>("landing");
  const [activeView, setActiveView] = useState<string>("dashboard");
  const [isCaseStudyActive, setIsCaseStudyActive] = useState<boolean>(false);

  // Synchronize URL /admin route
  useEffect(() => {
    const handleRouteCheck = () => {
      const path = window.location.pathname;
      const hash = window.location.hash;
      if (path === "/admin" || hash === "#admin" || hash === "#/admin") {
        setViewMode("admin");
      }
    };

    handleRouteCheck();

    window.addEventListener("popstate", handleRouteCheck);
    window.addEventListener("hashchange", handleRouteCheck);
    return () => {
      window.removeEventListener("popstate", handleRouteCheck);
      window.removeEventListener("hashchange", handleRouteCheck);
    };
  }, []);

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
    setViewMode("app");
    setActiveView("dashboard");
    handleAddNotification(
      "Ecosystem Configured",
      `Welcome, ${onboardedProfile.fullName || userProfile.fullName}! Your custom telemetry and career score are compiled.`,
      "alert"
    );
  };

  return (
    <div className="bg-[#F8FAFC] text-slate-900 min-h-screen relative overflow-x-hidden font-sans">
      <AnimatePresence mode="wait">
        {/* VIEW 1: LANDING WEBSITE */}
        {viewMode === "landing" && !isCaseStudyActive && (
          <motion.div
            key="landing"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
          >
            <LandingPage
              onEnterApp={(initialView?: string) => {
                setViewMode("auth");
                if (initialView) {
                  setActiveView(initialView);
                }
              }}
              onViewCaseStudy={() => setIsCaseStudyActive(true)}
            />
          </motion.div>
        )}

        {/* VIEW 2: AUTHENTICATION FLOW */}
        {viewMode === "auth" && !isCaseStudyActive && (
          <motion.div
            key="auth"
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.02 }}
            transition={{ duration: 0.3 }}
          >
            <AuthFlow
              onAuthSuccess={handleAuthSuccess}
              onBackToLanding={() => setViewMode("landing")}
            />
          </motion.div>
        )}

        {/* VIEW 3: MAIN WORKSPACE APPLICATION */}
        {viewMode === "app" && !isCaseStudyActive && (
          <motion.div
            key="app"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="h-screen flex overflow-hidden"
          >
            {/* Navigation Sidebar */}
            <Sidebar
              activeView={activeView}
              setActiveView={setActiveView}
              userProfile={userProfile}
              notificationsCount={notifications.filter((n) => !n.read).length}
              onNavigateToAdmin={() => {
                window.history.pushState(null, "", "/admin");
                setViewMode("admin");
              }}
            />

            {/* Main Stage Stage Wrapper */}
            <div className="flex-grow flex flex-col min-w-0">
              <Header
                notifications={notifications}
                setNotifications={setNotifications}
                onViewCaseStudy={() => setIsCaseStudyActive(true)}
                isCaseStudyActive={isCaseStudyActive}
                onExitCaseStudy={() => setIsCaseStudyActive(false)}
                onNavigateToView={setActiveView}
                userProfile={userProfile}
                onAddNotification={handleAddNotification}
              />

              <main className="flex-1 p-6 overflow-hidden bg-slate-100/50">
                {activeView === "dashboard" && (
                  <DashboardHome
                    userProfile={userProfile}
                    courses={courses}
                    mentors={mentors}
                    opportunities={opportunities}
                    workshops={workshops}
                    scholarships={scholarships}
                    onNavigateToView={setActiveView}
                    onEnrollCourse={handleEnrollCourse}
                  />
                )}

                {activeView === "courses" && (
                  <CoursesModule
                    courses={courses}
                    setCourses={setCourses}
                  />
                )}

                {activeView === "mentorship" && (
                  <MentorshipModule
                    mentors={mentors}
                    onAddNotification={handleAddNotification}
                  />
                )}

                {activeView === "opportunities" && (
                  <OpportunitiesModule
                    opportunities={opportunities}
                    setOpportunities={setOpportunities}
                    scholarships={scholarships}
                    setScholarships={setScholarships}
                    onAddNotification={handleAddNotification}
                  />
                )}

                {activeView === "ai" && (
                  <AIModule
                    userProfile={userProfile}
                  />
                )}

                {activeView === "portfolio" && (
                  <PortfolioModule
                    userProfile={userProfile}
                    setUserProfile={setUserProfile}
                    onAddNotification={handleAddNotification}
                  />
                )}

                {activeView === "blogs" && (
                  <CommunityBlogsModule
                    blogs={blogs}
                    setBlogs={setBlogs}
                  />
                )}

                {activeView === "support" && (
                  <SupportModule
                    tickets={tickets}
                    setTickets={setTickets}
                    onAddNotification={handleAddNotification}
                  />
                )}

                {activeView === "settings" && (
                  <SettingsModule
                    userProfile={userProfile}
                    setUserProfile={setUserProfile}
                    onAddNotification={handleAddNotification}
                  />
                )}
              </main>
            </div>
          </motion.div>
        )}

        {/* VIEW 4: SYSTEM ADMIN PANEL CONTROL */}
        {viewMode === "admin" && !isCaseStudyActive && (
          <motion.div
            key="admin"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="h-screen w-screen overflow-hidden"
          >
            <AdminPanel
              courses={courses}
              setCourses={setCourses}
              mentors={mentors}
              setMentors={setMentors}
              opportunities={opportunities}
              setOpportunities={setOpportunities}
              workshops={workshops}
              setWorkshops={setWorkshops}
              scholarships={scholarships}
              setScholarships={setScholarships}
              blogs={blogs}
              setBlogs={setBlogs}
              tickets={tickets}
              setTickets={setTickets}
              onAddNotification={handleAddNotification}
              onClose={() => {
                window.history.pushState(null, "", "/");
                setViewMode("landing");
              }}
            />
          </motion.div>
        )}
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
