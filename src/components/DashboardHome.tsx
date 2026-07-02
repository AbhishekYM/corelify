import React, { useState } from "react";
import {
  Sparkles,
  Play,
  Calendar,
  UserCheck,
  Briefcase,
  GraduationCap,
  ChevronRight,
  Award,
  Trophy,
  Users,
  BookOpen,
  Clock,
  Star,
  Search,
  ArrowRight,
  Bookmark,
  Percent,
  Compass,
  DollarSign
} from "lucide-react";
import { Course, Mentor, Opportunity, UserProfile, Workshop, Scholarship } from "../types";

interface DashboardHomeProps {
  userProfile: UserProfile;
  courses: Course[];
  mentors: Mentor[];
  opportunities: Opportunity[];
  workshops: Workshop[];
  scholarships: Scholarship[];
  onNavigateToView: (view: string) => void;
  onEnrollCourse: (id: string) => void;
}

export default function DashboardHome({
  userProfile,
  courses,
  mentors,
  opportunities,
  workshops,
  scholarships,
  onNavigateToView,
  onEnrollCourse
}: DashboardHomeProps) {
  const [showroomTab, setShowroomTab] = useState<"courses" | "mentors" | "workshops" | "careers" | "scholarships">("courses");
  const [homeSearchQuery, setHomeSearchQuery] = useState("");

  // Find active course (enrolled with progress)
  const activeCourse = courses.find(c => c.enrolled && c.progress > 0) || courses[0];

  // Suggest a mentor
  const suggestedMentor = mentors[0];

  // Recommended Job with top match score
  const topJob = opportunities.find(o => o.type === "Job") || opportunities[0];

  const recentActivities = [
    { id: "act-1", title: "Enrolled in Product Design Strategy", meta: "Course &amp;bull; 1 day ago", icon: BookOpen, color: "text-indigo-600 bg-indigo-50" },
    { id: "act-2", title: "Applied to Senior Product Designer role at Linear", meta: "Job &amp;bull; 2 days ago", icon: Briefcase, color: "text-emerald-600 bg-emerald-50" },
    { id: "act-3", title: "Uploaded verified resume PDF", meta: "Portfolio &amp;bull; 3 days ago", icon: Award, color: "text-violet-600 bg-violet-50" }
  ];

  // Filtering data according to homepage search query
  const searchLower = homeSearchQuery.toLowerCase();

  const filteredCourses = courses.filter(c =>
    c.title.toLowerCase().includes(searchLower) || c.instructor.toLowerCase().includes(searchLower)
  );
  const filteredMentors = mentors.filter(m =>
    m.name.toLowerCase().includes(searchLower) || m.skills.some(s => s.toLowerCase().includes(searchLower))
  );
  const filteredOpportunities = opportunities.filter(o =>
    o.title.toLowerCase().includes(searchLower) || o.company.toLowerCase().includes(searchLower)
  );
  const filteredWorkshops = workshops.filter(w =>
    w.title.toLowerCase().includes(searchLower) || w.company.toLowerCase().includes(searchLower)
  );
  const filteredScholarships = scholarships.filter(s =>
    s.title.toLowerCase().includes(searchLower) || s.provider.toLowerCase().includes(searchLower)
  );

  return (
    <div className="space-y-8 overflow-y-auto h-full pr-1 select-none font-sans">
      
      {/* Dynamic Header Greeter */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-200 pb-6">
        <div>
          <div className="flex items-center gap-1.5 text-indigo-600 font-mono text-[10px] mb-1 font-semibold uppercase tracking-wider">
            <Trophy className="w-3.5 h-3.5" />
            <span>EXECUTIVE TALENT PROFILE</span>
          </div>
          <h2 className="text-2xl font-display font-bold text-slate-900 tracking-tight">
            Welcome back, {userProfile.fullName}
          </h2>
          <p className="text-slate-500 text-xs mt-0.5 leading-relaxed">
            Your portfolio scan is live. You are highly competitive for <strong className="text-slate-800 font-semibold">Design &amp; Frontend</strong> roles.
          </p>
        </div>

        {/* Quick Stats Indicator */}
        <div className="flex items-center gap-6 bg-white border border-slate-200 p-3 rounded-xl shadow-sm">
          <div className="text-center px-2">
            <span className="text-[10px] text-slate-400 uppercase font-mono block">Match Rating</span>
            <span className="text-lg font-display font-bold text-emerald-600 font-mono">94%</span>
          </div>
          <div className="w-px h-8 bg-slate-200" />
          <div className="text-center px-2">
            <span className="text-[10px] text-slate-400 uppercase font-mono block">Streak</span>
            <span className="text-lg font-display font-bold text-indigo-600 font-mono">4 Days</span>
          </div>
        </div>
      </div>

      {/* QUICK ACCESS NAVIGATION CARDS */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3">
        {[
          { id: "courses", label: "Courses", desc: "Learning Path", icon: BookOpen },
          { id: "mentorship", label: "Mentorship", desc: "Consult 1:1", icon: Users },
          { id: "opportunities", label: "Opportunities", desc: "Jobs &amp; Grants", icon: Briefcase },
          { id: "portfolio", label: "Portfolio", desc: "Build &amp; Share", icon: Award },
          { id: "ai", label: "AI Copilot", desc: "Career Advisor", icon: Sparkles },
          { id: "blogs", label: "Blogs", desc: "Ecosystem Hub", icon: Compass }
        ].map((nav) => (
          <button
            key={nav.id}
            onClick={() => onNavigateToView(nav.id)}
            className="p-3 bg-white hover:bg-slate-50 border border-slate-200 hover:border-indigo-400 rounded-xl transition-all text-left group cursor-pointer shadow-sm"
          >
            <div className="w-8 h-8 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center group-hover:scale-110 transition-transform">
              <nav.icon className="w-4 h-4" />
            </div>
            <h5 className="text-slate-800 font-semibold text-xs mt-3 leading-none">{nav.label}</h5>
            <p className="text-[9px] text-slate-400 mt-1 font-mono leading-none">{nav.desc}</p>
          </button>
        ))}
      </div>

      {/* AI Suggested Action Board */}
      <div className="bg-gradient-to-br from-indigo-50/80 to-violet-50/40 border border-indigo-100 rounded-2xl p-6 relative overflow-hidden shadow-sm">
        <div className="absolute top-0 right-0 w-36 h-36 bg-indigo-500/5 rounded-full blur-2xl" />
        <div className="flex flex-col md:flex-row gap-6 md:items-center justify-between relative z-10">
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-indigo-700 font-semibold">
              <Sparkles className="w-4.5 h-4.5 animate-pulse text-indigo-600" />
              <span className="font-mono text-xs uppercase font-bold tracking-wider">AI Copilot Recommendation</span>
            </div>
            <h3 className="text-slate-900 font-display font-medium text-sm leading-tight">
              Bridge the semantic variables gap to match Linear (94% Compatibility)
            </h3>
            <p className="text-slate-600 text-xs leading-relaxed max-w-2xl">
              Linear requires advanced knowledge of Figma variables and design system tokens. Close this gap by completing Lesson 5 of your active course today.
            </p>
          </div>

          <button
            onClick={() => onNavigateToView("courses")}
            className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold rounded-xl flex items-center gap-1.5 shrink-0 shadow-sm cursor-pointer transition-colors"
          >
            <span>Resume Lesson 5</span>
            <Play className="w-3 h-3 fill-white" />
          </button>
        </div>
      </div>

      {/* CORE INTEGRATION: UNIFIED SEARCH AND ECOSYSTEM SHOWROOM */}
      <div className="space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-200 pb-3">
          <div className="space-y-1">
            <h3 className="text-sm font-semibold font-display text-slate-900 uppercase tracking-tight">Ecosystem Discovery Showroom</h3>
            <p className="text-[11px] text-slate-400 font-mono">Explore all active featured entities in our career matrix</p>
          </div>

          {/* Unified search bar */}
          <div className="relative w-full md:w-72">
            <input
              type="text"
              value={homeSearchQuery}
              onChange={(e) => setHomeSearchQuery(e.target.value)}
              placeholder="Unified search entire ecosystem..."
              className="w-full pl-8 pr-3 py-1.5 bg-white border border-slate-200 rounded-lg text-xs text-slate-800 focus:outline-none focus:border-indigo-600 focus:ring-1 focus:ring-indigo-600 transition-all placeholder:text-slate-450"
            />
            <Search className="absolute left-2.5 top-2.5 w-3.5 h-3.5 text-slate-400" />
            {homeSearchQuery && (
              <button
                onClick={() => setHomeSearchQuery("")}
                className="absolute right-2.5 top-2.5 text-slate-400 hover:text-slate-600 text-[10px] font-mono uppercase font-bold"
              >
                Clear
              </button>
            )}
          </div>
        </div>

        {/* Tab filters */}
        <div className="flex flex-wrap gap-2">
          {[
            { id: "courses", label: "Featured Courses", count: filteredCourses.length },
            { id: "mentors", label: "Featured Mentors &amp; Popular", count: filteredMentors.length },
            { id: "workshops", label: "Featured Workshops", count: filteredWorkshops.length },
            { id: "careers", label: "Featured Jobs &amp; Internships", count: filteredOpportunities.length },
            { id: "scholarships", label: "Featured Scholarships", count: filteredScholarships.length }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setShowroomTab(tab.id as any)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition-colors cursor-pointer flex items-center gap-1.5 ${
                showroomTab === tab.id
                  ? "bg-indigo-65 text-indigo-700 border-indigo-200 bg-indigo-50"
                  : "bg-white border-slate-250 text-slate-600 hover:bg-slate-50"
              }`}
            >
              <span dangerouslySetInnerHTML={{ __html: tab.label }} />
              <span className="text-[10px] font-mono text-slate-400 bg-slate-100 px-1 rounded">({tab.count})</span>
            </button>
          ))}
        </div>

        {/* RENDER SHOWCASE: COURSES */}
        {showroomTab === "courses" && (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCourses.map((course) => (
              <div
                key={course.id}
                className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm flex flex-col justify-between hover:border-slate-300 transition-all"
              >
                <div>
                  <img src={course.image} alt={course.title} className="w-full h-36 object-cover border-b border-slate-200" />
                  <div className="p-4 space-y-2">
                    <div className="flex justify-between items-center text-[10px] font-mono text-slate-400">
                      <span>{course.provider} &bull; Trending</span>
                      <span className="px-1.5 py-0.5 bg-indigo-50 border border-indigo-150 text-indigo-700 rounded text-[9px] font-bold">
                        {course.level}
                      </span>
                    </div>
                    <h4 className="text-slate-800 font-display font-semibold text-xs line-clamp-1">{course.title}</h4>
                    <p className="text-slate-500 text-[11px] line-clamp-2 leading-relaxed">{course.description}</p>
                  </div>
                </div>

                <div className="p-4 pt-2 border-t border-slate-100 flex items-center justify-between text-xs">
                  <div className="flex items-center gap-1 text-amber-500 font-semibold font-mono">
                    <Star className="w-3 h-3 fill-amber-500" />
                    <span>{course.rating}</span>
                  </div>
                  <button
                    onClick={() => onNavigateToView("courses")}
                    className="text-indigo-600 font-semibold hover:underline flex items-center gap-0.5 cursor-pointer"
                  >
                    <span>Open Player</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
            {filteredCourses.length === 0 && (
              <div className="col-span-full py-8 text-center text-slate-400 text-xs italic">
                No matching courses found.
              </div>
            )}
          </div>
        )}

        {/* RENDER SHOWCASE: MENTORS */}
        {showroomTab === "mentors" && (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredMentors.map((mentor) => (
              <div
                key={mentor.id}
                className="bg-white border border-slate-200 rounded-2xl p-4 shadow-sm flex flex-col justify-between h-56 hover:border-slate-300 transition-all"
              >
                <div className="space-y-3">
                  <div className="flex gap-3 items-center">
                    <img src={mentor.image} alt={mentor.name} className="w-10 h-10 rounded-xl object-cover border border-slate-200 shrink-0" />
                    <div>
                      <h4 className="text-slate-800 font-display font-semibold text-xs leading-none">{mentor.name}</h4>
                      <p className="text-indigo-600 text-[10px] font-mono mt-1 leading-none">{mentor.role}</p>
                      <p className="text-slate-400 text-[9px] leading-none">{mentor.company}</p>
                    </div>
                  </div>
                  <p className="text-slate-500 text-[11px] line-clamp-2 leading-relaxed">{mentor.bio}</p>
                </div>

                <div className="pt-3 border-t border-slate-150 flex items-center justify-between text-xs">
                  <div className="flex items-center gap-1 font-mono font-semibold">
                    <Star className="w-3 h-3 text-amber-500 fill-amber-500" />
                    <span className="text-slate-800">{mentor.rating}</span>
                  </div>
                  <button
                    onClick={() => onNavigateToView("mentorship")}
                    className="px-3 py-1 bg-indigo-600 hover:bg-indigo-750 text-white rounded-lg text-[10px] font-semibold cursor-pointer shadow-sm transition-colors"
                  >
                    Book for ${mentor.price}
                  </button>
                </div>
              </div>
            ))}
            {filteredMentors.length === 0 && (
              <div className="col-span-full py-8 text-center text-slate-400 text-xs italic">
                No matching mentors found.
              </div>
            )}
          </div>
        )}

        {/* RENDER SHOWCASE: WORKSHOPS */}
        {showroomTab === "workshops" && (
          <div className="grid sm:grid-cols-2 gap-6">
            {filteredWorkshops.map((w) => (
              <div
                key={w.id}
                className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm flex flex-col justify-between hover:border-slate-300 transition-all"
              >
                <div className="p-4 space-y-3">
                  <div className="flex justify-between items-start gap-2">
                    <div>
                      <span className="text-[9px] font-mono text-slate-400 uppercase">{w.company}</span>
                      <h4 className="text-slate-800 font-display font-semibold text-xs leading-tight mt-0.5">{w.title}</h4>
                    </div>
                    <span className="px-2 py-0.5 bg-indigo-50 border border-indigo-150 text-indigo-700 font-mono text-[9px] font-bold uppercase rounded-full">
                      Live Workshop
                    </span>
                  </div>
                  <p className="text-slate-500 text-[11px] line-clamp-2 leading-relaxed">{w.description}</p>
                  <div className="flex items-center gap-1.5 text-slate-400 text-[10px] font-mono">
                    <Calendar className="w-3.5 h-3.5 text-indigo-500" />
                    <span>{w.date} &bull; {w.time}</span>
                  </div>
                </div>

                <div className="p-4 pt-2 border-t border-slate-100 flex items-center justify-between text-xs">
                  <span className="text-slate-850 font-bold font-mono">${w.price} Registration</span>
                  <button
                    onClick={() => onNavigateToView("opportunities")}
                    className="px-3 py-1 bg-indigo-600 hover:bg-indigo-750 text-white text-[10px] font-semibold rounded-lg cursor-pointer"
                  >
                    Details &amp; Book
                  </button>
                </div>
              </div>
            ))}
            {filteredWorkshops.length === 0 && (
              <div className="col-span-full py-8 text-center text-slate-400 text-xs italic">
                No matching workshops found.
              </div>
            )}
          </div>
        )}

        {/* RENDER SHOWCASE: CAREERS */}
        {showroomTab === "careers" && (
          <div className="grid sm:grid-cols-2 gap-6">
            {filteredOpportunities.map((opp) => (
              <div
                key={opp.id}
                className="bg-white border border-slate-200 rounded-2xl p-4 shadow-sm flex flex-col justify-between h-48 hover:border-slate-300 transition-all"
              >
                <div>
                  <div className="flex justify-between items-start gap-3">
                    <div className="flex gap-2.5 items-start">
                      <img src={opp.logo} alt={opp.company} className="w-9 h-9 rounded object-cover border border-slate-150" />
                      <div>
                        <h4 className="text-slate-800 font-display font-semibold text-xs leading-tight">{opp.title}</h4>
                        <span className="text-slate-400 text-[10px] font-mono block mt-0.5">{opp.company} &bull; {opp.location}</span>
                      </div>
                    </div>
                    <span className="px-1.5 py-0.5 bg-indigo-50 border border-indigo-150 text-indigo-700 font-mono text-[9px] font-bold rounded">
                      {opp.matchScore}% Match
                    </span>
                  </div>
                  <p className="text-slate-500 text-[11px] line-clamp-2 leading-relaxed mt-3">{opp.description}</p>
                </div>

                <div className="pt-2.5 border-t border-slate-100 flex items-center justify-between text-xs">
                  <span className="text-slate-800 font-bold font-mono">{opp.stipendOrSalary}</span>
                  <button
                    onClick={() => onNavigateToView("opportunities")}
                    className="text-indigo-600 font-semibold hover:underline flex items-center gap-0.5 cursor-pointer"
                  >
                    <span>Instant Apply</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
            {filteredOpportunities.length === 0 && (
              <div className="col-span-full py-8 text-center text-slate-400 text-xs italic">
                No matching jobs or internships found.
              </div>
            )}
          </div>
        )}

        {/* RENDER SHOWCASE: SCHOLARSHIPS */}
        {showroomTab === "scholarships" && (
          <div className="grid sm:grid-cols-2 gap-6">
            {filteredScholarships.map((sch) => (
              <div
                key={sch.id}
                className="bg-white border border-slate-200 rounded-2xl p-4 shadow-sm flex flex-col justify-between h-48 hover:border-slate-300 transition-all"
              >
                <div>
                  <span className="text-[9px] font-mono text-slate-400 uppercase">{sch.provider}</span>
                  <h4 className="text-slate-800 font-display font-semibold text-xs leading-tight mt-0.5">{sch.title}</h4>
                  <p className="text-slate-500 text-[11px] line-clamp-2 leading-relaxed mt-2">{sch.description}</p>
                </div>

                <div className="pt-2.5 border-t border-slate-100 flex items-center justify-between text-xs">
                  <span className="text-indigo-600 font-bold font-mono">{sch.amount} Award</span>
                  <button
                    onClick={() => onNavigateToView("opportunities")}
                    className="px-3 py-1 bg-indigo-600 hover:bg-indigo-750 text-white text-[10px] font-semibold rounded-lg cursor-pointer shadow-sm transition-colors"
                  >
                    Verify eligibility
                  </button>
                </div>
              </div>
            ))}
            {filteredScholarships.length === 0 && (
              <div className="col-span-full py-8 text-center text-slate-400 text-xs italic">
                No matching scholarships found.
              </div>
            )}
          </div>
        )}
      </div>

      {/* Recommended Grid Layout */}
      <div className="grid md:grid-cols-3 gap-6">
        {/* Active Learning Progression Card */}
        <div className="bg-white border border-slate-200 rounded-2xl p-5 flex flex-col justify-between shadow-sm">
          <div className="space-y-3.5">
            <div className="flex justify-between items-center">
              <span className="text-[10px] text-slate-400 font-mono uppercase">ACTIVE LEARNING</span>
              <BookOpen className="w-4 h-4 text-indigo-600" />
            </div>

            <div className="space-y-1.5">
              <span className="text-[10px] text-slate-400 font-mono block">{activeCourse.provider}</span>
              <h4 className="text-slate-800 font-display font-medium text-xs leading-snug line-clamp-2">
                {activeCourse.title}
              </h4>
            </div>

            {/* Micro-Progress details */}
            <div className="space-y-1.5">
              <div className="flex justify-between text-[10px] font-mono text-slate-500">
                <span>Course Progress</span>
                <span>{activeCourse.progress}%</span>
              </div>
              <div className="h-1.5 bg-slate-100 rounded-full overflow-hidden">
                <div className="h-full bg-indigo-600 rounded-full" style={{ width: `${activeCourse.progress}%` }} />
              </div>
            </div>
          </div>

          <button
            onClick={() => onNavigateToView("courses")}
            className="w-full py-2 bg-slate-50 hover:bg-slate-100 border border-slate-200 text-slate-700 text-xs font-medium rounded-lg mt-5 transition-colors cursor-pointer"
          >
            Launch Video Player
          </button>
        </div>

        {/* Suggest Mentorship Hub Card */}
        <div className="bg-white border border-slate-200 rounded-2xl p-5 flex flex-col justify-between shadow-sm">
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-[10px] text-slate-400 font-mono uppercase">MENTOR SUGGESTION</span>
              <Users className="w-4 h-4 text-indigo-600" />
            </div>

            <div className="flex gap-3 items-center">
              <img
                src={suggestedMentor.image}
                alt={suggestedMentor.name}
                className="w-11 h-11 rounded-lg object-cover border border-slate-200 shrink-0"
              />
              <div>
                <h4 className="text-slate-800 font-display font-semibold text-xs leading-tight">{suggestedMentor.name}</h4>
                <p className="text-[10px] text-indigo-600 font-mono">{suggestedMentor.role}</p>
                <p className="text-[9px] text-slate-400 leading-none">{suggestedMentor.company}</p>
              </div>
            </div>

            <p className="text-slate-600 text-xs line-clamp-2 leading-relaxed">{suggestedMentor.bio}</p>
          </div>

          <button
            onClick={() => onNavigateToView("mentorship")}
            className="w-full py-2 bg-indigo-50 text-indigo-700 hover:bg-indigo-600 hover:text-white border border-indigo-100 text-xs font-semibold rounded-lg mt-5 transition-all cursor-pointer"
          >
            Consult 1:1 Calendar
          </button>
        </div>

        {/* Top Jobs/Internship Recommendation Card */}
        <div className="bg-white border border-slate-200 rounded-2xl p-5 flex flex-col justify-between shadow-sm">
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-[10px] text-slate-400 font-mono uppercase">MATCHING ROLE</span>
              <Briefcase className="w-4 h-4 text-indigo-600" />
            </div>

            <div className="flex gap-3 items-start">
              <img
                src={topJob.logo}
                alt={topJob.company}
                className="w-11 h-11 rounded-lg object-cover border border-slate-200 shrink-0"
              />
              <div className="min-w-0">
                <h4 className="text-slate-800 font-display font-semibold text-xs truncate leading-tight">{topJob.title}</h4>
                <p className="text-slate-500 text-[10px] mt-0.5">{topJob.company} &amp;bull; {topJob.location}</p>
                <span className="inline-block mt-2 px-1.5 py-0.5 bg-emerald-50 text-emerald-700 border border-emerald-100 rounded font-mono text-[9px] font-bold">
                  {topJob.matchScore}% MATCH
                </span>
              </div>
            </div>
          </div>

          <button
            onClick={() => onNavigateToView("opportunities")}
            className="w-full py-2 bg-slate-50 hover:bg-slate-100 border border-slate-200 text-slate-700 text-xs font-medium rounded-lg mt-5 transition-colors cursor-pointer"
          >
            Review Application Board
          </button>
        </div>
      </div>

      {/* Bottom Grid: Recent Activities &amp; Credentials */}
      <div className="grid md:grid-cols-3 gap-6">
        {/* Recent Activities Feed */}
        <div className="bg-white border border-slate-200 rounded-2xl p-5 space-y-4 md:col-span-2 shadow-sm">
          <h4 className="text-slate-800 font-display font-semibold text-xs border-b border-slate-100 pb-2">Recent Workspace Activity</h4>
          <div className="space-y-3.5">
            {recentActivities.map((act) => {
              const Icon = act.icon;
              return (
                <div key={act.id} className="flex gap-3.5 items-start">
                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 border border-slate-100 ${act.color}`}>
                    <Icon className="w-4 h-4 text-indigo-600" />
                  </div>
                  <div>
                    <span className="text-xs font-semibold text-slate-700 block">{act.title}</span>
                    <span className="text-[10px] text-slate-400 font-mono block mt-0.5" dangerouslySetInnerHTML={{ __html: act.meta }} />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Certificate Matrix Card */}
        <div className="bg-white border border-slate-200 rounded-2xl p-5 flex flex-col justify-between shadow-sm">
          <div className="space-y-3.5">
            <h4 className="text-slate-800 font-display font-semibold text-xs border-b border-slate-100 pb-2">Lumina Credentials</h4>
            <div className="space-y-3">
              <div className="flex gap-2.5 items-center">
                <div className="w-8 h-8 bg-indigo-50 border border-indigo-100 rounded-lg flex items-center justify-center">
                  <Award className="w-4 h-4 text-indigo-600" />
                </div>
                <div>
                  <span className="text-xs font-semibold text-slate-700 block">Product Design Strategy</span>
                  <span className="text-[9px] text-slate-400 font-mono block">Completion expected July 2026</span>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-100 flex justify-between items-center text-xs mt-4">
            <div className="flex items-center gap-1 text-slate-400">
              <Clock className="w-3.5 h-3.5" />
              <span>Credits: 12 / 24</span>
            </div>
            <button
              onClick={() => onNavigateToView("portfolio")}
              className="text-indigo-600 font-semibold hover:underline text-[10px]"
            >
              Export PDF
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
