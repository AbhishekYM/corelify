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
    <div className="space-y-8 overflow-y-auto h-full pr-1 select-none font-sans pb-12">
      
      {/* ── DYNAMIC HEADER GREETER ── */}
      <div className="relative bg-gradient-to-r from-[#0B0F59] via-indigo-900 to-slate-900 rounded-3xl p-6 md:p-8 text-white overflow-hidden shadow-xl">
        <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/10 rounded-full blur-3xl" />
        <div className="absolute -bottom-10 -left-10 w-48 h-48 bg-purple-500/10 rounded-full blur-2xl" />
        
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-1.5 bg-white/10 backdrop-blur-md px-3 py-1 rounded-full text-[10px] font-semibold tracking-wider uppercase">
              <Sparkles className="w-3 h-3 text-amber-300 fill-amber-300" />
              <span>Corelify Student Space</span>
            </div>
            <h2 className="text-2xl md:text-3xl font-display font-bold tracking-tight">
              Welcome back, {userProfile.fullName}!
            </h2>
            <p className="text-indigo-200 text-xs md:text-sm max-w-xl leading-relaxed">
              Your portfolio scan is live. You have completed <strong className="text-white font-semibold">43%</strong> of your learning path and are highly competitive for <strong className="text-white font-semibold">Design &amp; Frontend</strong> roles.
            </p>
          </div>

          {/* Gamification Stats */}
          <div className="flex items-center gap-4 bg-white/10 backdrop-blur-md border border-white/10 p-4 rounded-2xl shrink-0 shadow-lg">
            <div className="text-center px-1">
              <span className="text-[9px] text-indigo-200 uppercase font-bold tracking-wider block mb-1">Match Rating</span>
              <span className="text-xl font-display font-bold text-emerald-400 font-mono">94%</span>
            </div>
            <div className="w-px h-8 bg-white/20" />
            <div className="text-center px-1">
              <span className="text-[9px] text-indigo-200 uppercase font-bold tracking-wider block mb-1">Study Streak</span>
              <span className="text-xl font-display font-bold text-amber-400 font-mono">4 Days 🔥</span>
            </div>
          </div>
        </div>
      </div>

      {/* ── LMS METRICS DASHBOARD ── */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: "Active Courses", value: "2 In Progress", desc: "1 nearing completion", icon: BookOpen, color: "text-indigo-600 bg-indigo-50 border-indigo-100" },
          { label: "Learning Hours", value: "14.5 Hrs", desc: "+3.2 hrs this week", icon: Clock, color: "text-emerald-600 bg-emerald-50 border-emerald-100" },
          { label: "Completed Lessons", value: "28 / 64", desc: "43% of total path", icon: UserCheck, color: "text-violet-600 bg-violet-50 border-violet-100" },
          { label: "Credentials", value: "1 Verified", desc: "Next at 100% progress", icon: Trophy, color: "text-amber-600 bg-amber-50 border-amber-100" }
        ].map((stat, i) => (
          <div key={i} className={`p-4 bg-white border border-slate-200 rounded-2xl shadow-sm flex items-start gap-4 transition-all duration-300 hover:shadow-md`}>
            <div className={`p-2.5 rounded-xl ${stat.color.split(" ")[1]} ${stat.color.split(" ")[0]} shrink-0`}>
              <stat.icon className="w-5 h-5" />
            </div>
            <div className="space-y-0.5">
              <span className="text-[10px] text-slate-400 font-bold tracking-wider uppercase block">{stat.label}</span>
              <span className="text-base font-display font-bold text-slate-800 block">{stat.value}</span>
              <span className="text-[9px] text-slate-400 block font-mono">{stat.desc}</span>
            </div>
          </div>
        ))}
      </div>

      {/* ── TWO-COLUMN LMS WORKSPACE ── */}
      <div className="grid lg:grid-cols-3 gap-6">
        
        {/* LEFT COLUMN: ACTIVE COURSE TRACKER & AI SUGGESTIONS */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* Active Course Card */}
          <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm space-y-5">
            <div className="flex justify-between items-center border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-indigo-600 animate-pulse" />
                <h3 className="text-xs font-bold tracking-wider uppercase text-slate-400">Current Course Workspace</h3>
              </div>
              <span className="text-[10px] font-bold text-indigo-600 bg-indigo-50 px-2.5 py-1 rounded-full uppercase tracking-wider">{activeCourse.level}</span>
            </div>

            <div className="flex flex-col md:flex-row gap-5 items-start">
              <img src={activeCourse.image} alt={activeCourse.title} className="w-full md:w-36 h-24 object-cover rounded-xl border border-slate-150 shrink-0" />
              <div className="space-y-3 flex-grow">
                <div>
                  <span className="text-[9px] text-slate-400 font-mono block uppercase">{activeCourse.provider}</span>
                  <h4 className="text-slate-800 font-display font-semibold text-sm leading-snug">{activeCourse.title}</h4>
                  <p className="text-[11px] text-slate-500 mt-1">Instructor: <span className="font-semibold text-slate-700">{activeCourse.instructor}</span></p>
                </div>

                <div className="space-y-1.5">
                  <div className="flex justify-between text-[10px] font-mono text-slate-500">
                    <span>Course Progress</span>
                    <span className="font-bold text-slate-800">{activeCourse.progress}%</span>
                  </div>
                  <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                    <div className="h-full bg-[#0B0F59] rounded-full transition-all duration-500" style={{ width: `${activeCourse.progress}%` }} />
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-slate-50 border border-slate-200/50 p-4 rounded-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <span className="text-[9px] text-slate-400 uppercase font-bold tracking-wider block">Up Next</span>
                <span className="text-slate-750 text-xs font-medium block mt-0.5">Lesson 5: Design Tokens &amp; Semantic Variables</span>
              </div>
              <button
                onClick={() => onNavigateToView("courses")}
                className="px-5 py-2 bg-[#0B0F59] hover:bg-indigo-900 text-white text-xs font-semibold rounded-xl flex items-center justify-center gap-2 cursor-pointer transition-all shadow-md shrink-0"
              >
                <span>Resume Lesson 5</span>
                <Play className="w-3 h-3 fill-white" />
              </button>
            </div>
          </div>

          {/* AI Copilot Suggestion */}
          <div className="bg-gradient-to-br from-indigo-50/80 to-purple-50/40 border border-indigo-100 rounded-3xl p-6 relative overflow-hidden shadow-sm">
            <div className="absolute top-0 right-0 w-36 h-36 bg-indigo-500/5 rounded-full blur-2xl" />
            <div className="flex flex-col md:flex-row gap-6 md:items-center justify-between relative z-10">
              <div className="space-y-1">
                <div className="flex items-center gap-2 text-indigo-750 font-semibold">
                  <Sparkles className="w-4.5 h-4.5 text-indigo-650" />
                  <span className="font-mono text-xs uppercase font-bold tracking-wider">AI Copilot Advisory</span>
                </div>
                <h4 className="text-slate-800 font-display font-medium text-xs leading-tight mt-2">
                  Bridge the semantic variables gap to match Linear (94% Compatibility)
                </h4>
                <p className="text-slate-605 text-[11px] leading-relaxed max-w-xl">
                  Linear requires advanced knowledge of Figma variables and design system tokens. Close this gap by completing Lesson 5 of your active course today.
                </p>
              </div>
              <button
                onClick={() => onNavigateToView("courses")}
                className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold rounded-xl flex items-center justify-center gap-1.5 shrink-0 shadow-sm cursor-pointer transition-colors"
              >
                <span>Syllabus Help</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

        </div>

        {/* RIGHT COLUMN: WEEKLY STUDY SCHEDULE */}
        <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm flex flex-col justify-between space-y-4">
          <div>
            <div className="flex justify-between items-center border-b border-slate-100 pb-3 mb-4">
              <h3 className="text-xs font-bold tracking-wider uppercase text-slate-400">Weekly Schedule</h3>
              <span className="text-[10px] text-indigo-600 font-semibold">3 Sessions</span>
            </div>

            <div className="space-y-3.5">
              {[
                { day: "Mon", date: "06", title: "UX Design Critique", type: "Mentorship", time: "14:00 - 15:00", active: true },
                { day: "Wed", date: "08", title: "Design System Tokens", type: "Live Workshop", time: "18:30 - 20:00", active: false },
                { day: "Fri", date: "10", title: "Portfolio Prep Sync", type: "Class Sync", time: "16:00 - 17:00", active: false }
              ].map((item, i) => (
                <div key={i} className={`flex gap-4 p-3 rounded-2xl border transition-all ${item.active ? "bg-indigo-50/50 border-indigo-150" : "bg-slate-50/40 border-slate-200/50 hover:bg-slate-50"}`}>
                  <div className="text-center shrink-0 w-10">
                    <span className="text-[9px] uppercase font-bold text-slate-400 block tracking-wider leading-none">{item.day}</span>
                    <span className="text-sm font-bold text-slate-800 block mt-1 font-mono">{item.date}</span>
                  </div>
                  <div className="w-px bg-slate-200 shrink-0" />
                  <div className="flex-grow min-w-0">
                    <span className="text-[9px] font-bold text-indigo-600 uppercase tracking-wider block">{item.type}</span>
                    <h5 className="text-xs font-semibold text-slate-850 truncate mt-0.5">{item.title}</h5>
                    <span className="text-[10px] text-slate-400 block mt-1 font-mono">{item.time}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <button
            onClick={() => onNavigateToView("workshops")}
            className="w-full py-2.5 bg-slate-50 hover:bg-slate-100 border border-slate-200 text-slate-700 text-xs font-semibold rounded-xl transition-colors cursor-pointer mt-4"
          >
            Open Scheduler Calendar
          </button>
        </div>

      </div>

      {/* ── RECOMMENDED ECOSYSTEM PARTNERS & COURSE GRID ── */}
      <div className="space-y-5 bg-white border border-slate-200 rounded-3xl p-6 shadow-sm">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-100 pb-3">
          <div className="space-y-0.5">
            <h3 className="text-xs font-bold tracking-wider uppercase text-slate-400">Ecosystem Discovery Showroom</h3>
            <p className="text-[10px] text-slate-400 font-mono">Explore all active featured entities in our career matrix</p>
          </div>

          {/* Unified Search */}
          <div className="relative w-full md:w-64">
            <input
              type="text"
              value={homeSearchQuery}
              onChange={(e) => setHomeSearchQuery(e.target.value)}
              placeholder="Filter entire showroom..."
              className="w-full pl-8 pr-3 py-1.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-850 focus:outline-none focus:bg-white focus:border-[#0B0F59] transition-all placeholder:text-slate-400"
            />
            <Search className="absolute left-2.5 top-2 w-3.5 h-3.5 text-slate-400" />
            {homeSearchQuery && (
              <button
                onClick={() => setHomeSearchQuery("")}
                className="absolute right-2.5 top-2 text-[10px] text-slate-400 hover:text-slate-600 font-bold"
              >
                Clear
              </button>
            )}
          </div>
        </div>

        {/* Tab Filters */}
        <div className="flex flex-wrap gap-2">
          {[
            { id: "courses", label: "Featured Courses", count: filteredCourses.length },
            { id: "mentors", label: "Featured Mentors", count: filteredMentors.length },
            { id: "workshops", label: "Featured Workshops", count: filteredWorkshops.length },
            { id: "careers", label: "Jobs &amp; Internships", count: filteredOpportunities.length },
            { id: "scholarships", label: "Scholarships", count: filteredScholarships.length }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setShowroomTab(tab.id as any)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold border transition-all cursor-pointer flex items-center gap-1.5 ${
                showroomTab === tab.id
                  ? "bg-indigo-50 border-indigo-200 text-indigo-750"
                  : "bg-white border-slate-200 text-slate-500 hover:bg-slate-50"
              }`}
            >
              <span dangerouslySetInnerHTML={{ __html: tab.label }} />
              <span className="text-[10px] font-mono opacity-60 bg-slate-100 px-1.5 py-0.5 rounded-md">({tab.count})</span>
            </button>
          ))}
        </div>

        {/* Showroom Tab rendering */}
        <div className="pt-2">
          {/* COURSES */}
          {showroomTab === "courses" && (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {filteredCourses.map((course) => (
                <div
                  key={course.id}
                  className="bg-slate-50/50 border border-slate-200 rounded-2xl overflow-hidden shadow-sm flex flex-col justify-between hover:border-indigo-300 transition-all hover:bg-white"
                >
                  <div>
                    <img src={course.image} alt={course.title} className="w-full h-32 object-cover border-b border-slate-200" />
                    <div className="p-4 space-y-2">
                      <div className="flex justify-between items-center text-[9px] font-mono text-slate-400 uppercase">
                        <span>{course.provider}</span>
                        <span className="px-1.5 py-0.5 bg-indigo-55 text-indigo-700 bg-indigo-50 border border-indigo-100 rounded font-bold">
                          {course.level}
                        </span>
                      </div>
                      <h4 className="text-slate-800 font-display font-semibold text-xs line-clamp-1">{course.title}</h4>
                      <p className="text-slate-550 text-[10px] line-clamp-2 leading-relaxed">{course.description}</p>
                    </div>
                  </div>

                  <div className="p-4 pt-2 border-t border-slate-100 flex items-center justify-between text-xs">
                    <div className="flex items-center gap-1 text-amber-500 font-semibold font-mono">
                      <Star className="w-3.5 h-3.5 fill-amber-500" />
                      <span>{course.rating}</span>
                    </div>
                    <button
                      onClick={() => onNavigateToView("courses")}
                      className="text-indigo-650 font-semibold hover:underline flex items-center gap-0.5 cursor-pointer text-[11px]"
                    >
                      <span>Open Workspace</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))}
              {filteredCourses.length === 0 && (
                <div className="col-span-full py-8 text-center text-slate-400 text-xs italic">No matching courses found.</div>
              )}
            </div>
          )}

          {/* MENTORS */}
          {showroomTab === "mentors" && (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {filteredMentors.map((mentor) => (
                <div
                  key={mentor.id}
                  className="bg-slate-50/50 border border-slate-200 rounded-2xl p-4 shadow-sm flex flex-col justify-between h-52 hover:border-indigo-300 transition-all hover:bg-white"
                >
                  <div className="space-y-3">
                    <div className="flex gap-3 items-center">
                      <img src={mentor.image} alt={mentor.name} className="w-10 h-10 rounded-xl object-cover border border-slate-200 shrink-0" />
                      <div className="min-w-0">
                        <h4 className="text-slate-800 font-display font-semibold text-xs leading-none truncate">{mentor.name}</h4>
                        <p className="text-indigo-600 text-[10px] font-mono mt-1 leading-none truncate">{mentor.role}</p>
                        <p className="text-slate-400 text-[9px] leading-none truncate mt-0.5">{mentor.company}</p>
                      </div>
                    </div>
                    <p className="text-slate-500 text-[10px] line-clamp-2 leading-relaxed">{mentor.bio}</p>
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
                      Book Session
                    </button>
                  </div>
                </div>
              ))}
              {filteredMentors.length === 0 && (
                <div className="col-span-full py-8 text-center text-slate-400 text-xs italic">No matching mentors found.</div>
              )}
            </div>
          )}

          {/* WORKSHOPS */}
          {showroomTab === "workshops" && (
            <div className="grid sm:grid-cols-2 gap-5">
              {filteredWorkshops.map((w) => (
                <div
                  key={w.id}
                  className="bg-slate-50/50 border border-slate-200 rounded-2xl overflow-hidden shadow-sm flex flex-col justify-between hover:border-indigo-300 transition-all hover:bg-white"
                >
                  <div className="p-4 space-y-3">
                    <div className="flex justify-between items-start gap-2">
                      <div>
                        <span className="text-[9px] font-mono text-slate-400 uppercase">{w.company}</span>
                        <h4 className="text-slate-800 font-display font-semibold text-xs leading-tight mt-0.5">{w.title}</h4>
                      </div>
                      <span className="px-2 py-0.5 bg-indigo-50 border border-indigo-150 text-indigo-700 font-mono text-[9px] font-bold uppercase rounded-full">Live</span>
                    </div>
                    <p className="text-slate-500 text-[10px] line-clamp-2 leading-relaxed">{w.description}</p>
                    <div className="flex items-center gap-1.5 text-slate-400 text-[9px] font-mono">
                      <Calendar className="w-3.5 h-3.5 text-indigo-500" />
                      <span>{w.date} &bull; {w.time}</span>
                    </div>
                  </div>

                  <div className="p-4 pt-2 border-t border-slate-100 flex items-center justify-between text-xs">
                    <span className="text-slate-850 font-bold font-mono">${w.price} Registration</span>
                    <button
                      onClick={() => onNavigateToView("opportunities")}
                      className="px-3 py-1 bg-[#0B0F59] hover:bg-indigo-900 text-white text-[10px] font-semibold rounded-lg cursor-pointer"
                    >
                      Book Ticket
                    </button>
                  </div>
                </div>
              ))}
              {filteredWorkshops.length === 0 && (
                <div className="col-span-full py-8 text-center text-slate-400 text-xs italic">No matching workshops found.</div>
              )}
            </div>
          )}

          {/* CAREERS */}
          {showroomTab === "careers" && (
            <div className="grid sm:grid-cols-2 gap-5">
              {filteredOpportunities.map((opp) => (
                <div
                  key={opp.id}
                  className="bg-slate-50/50 border border-slate-200 rounded-2xl p-4 shadow-sm flex flex-col justify-between h-48 hover:border-indigo-300 transition-all hover:bg-white"
                >
                  <div>
                    <div className="flex justify-between items-start gap-3">
                      <div className="flex gap-2.5 items-start">
                        <img src={opp.logo} alt={opp.company} className="w-9 h-9 rounded object-cover border border-slate-150" />
                        <div>
                          <h4 className="text-slate-800 font-display font-semibold text-xs leading-tight">{opp.title}</h4>
                          <span className="text-slate-400 text-[9px] font-mono block mt-0.5">{opp.company} &bull; {opp.location}</span>
                        </div>
                      </div>
                      <span className="px-1.5 py-0.5 bg-emerald-50 border border-emerald-100 text-emerald-700 font-mono text-[9px] font-bold rounded">
                        {opp.matchScore}% Match
                      </span>
                    </div>
                    <p className="text-slate-500 text-[10px] line-clamp-2 leading-relaxed mt-3">{opp.description}</p>
                  </div>

                  <div className="pt-2.5 border-t border-slate-105 flex items-center justify-between text-xs">
                    <span className="text-slate-800 font-bold font-mono">{opp.stipendOrSalary}</span>
                    <button
                      onClick={() => onNavigateToView("opportunities")}
                      className="text-indigo-655 font-semibold hover:underline flex items-center gap-0.5 cursor-pointer text-[11px]"
                    >
                      <span>Apply Now</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))}
              {filteredOpportunities.length === 0 && (
                <div className="col-span-full py-8 text-center text-slate-400 text-xs italic">No matching jobs or internships found.</div>
              )}
            </div>
          )}

          {/* SCHOLARSHIPS */}
          {showroomTab === "scholarships" && (
            <div className="grid sm:grid-cols-2 gap-5">
              {filteredScholarships.map((sch) => (
                <div
                  key={sch.id}
                  className="bg-slate-50/50 border border-slate-200 rounded-2xl p-4 shadow-sm flex flex-col justify-between h-48 hover:border-indigo-300 transition-all hover:bg-white"
                >
                  <div>
                    <span className="text-[9px] font-mono text-slate-400 uppercase">{sch.provider}</span>
                    <h4 className="text-slate-800 font-display font-semibold text-xs leading-tight mt-0.5">{sch.title}</h4>
                    <p className="text-slate-500 text-[10px] line-clamp-2 leading-relaxed mt-2">{sch.description}</p>
                  </div>

                  <div className="pt-2.5 border-t border-slate-100 flex items-center justify-between text-xs">
                    <span className="text-indigo-600 font-bold font-mono">{sch.amount} Award</span>
                    <button
                      onClick={() => onNavigateToView("opportunities")}
                      className="px-3 py-1 bg-indigo-600 hover:bg-indigo-750 text-white text-[10px] font-semibold rounded-lg cursor-pointer shadow-sm transition-colors"
                    >
                      Apply Info
                    </button>
                  </div>
                </div>
              ))}
              {filteredScholarships.length === 0 && (
                <div className="col-span-full py-8 text-center text-slate-400 text-xs italic">No matching scholarships found.</div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* ── BOTTOM MATRIX: ACTIVITIES & CREDENTIALS ── */}
      <div className="grid md:grid-cols-3 gap-6">
        
        {/* Recent Activity Feed */}
        <div className="bg-white border border-slate-200 rounded-3xl p-5 space-y-4 md:col-span-2 shadow-sm">
          <h4 className="text-slate-850 font-display font-semibold text-xs border-b border-slate-100 pb-2">Recent LMS Activity</h4>
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
                    <span className="text-[10px] text-slate-450 font-mono block mt-0.5" dangerouslySetInnerHTML={{ __html: act.meta }} />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Credentials Card */}
        <div className="bg-white border border-slate-200 rounded-3xl p-5 flex flex-col justify-between shadow-sm">
          <div className="space-y-3.5">
            <h4 className="text-slate-850 font-display font-semibold text-xs border-b border-slate-100 pb-2">Corelify Credentials</h4>
            <div className="space-y-3">
              <div className="flex gap-2.5 items-center">
                <div className="w-8 h-8 bg-indigo-50 border border-indigo-100 rounded-lg flex items-center justify-center">
                  <Award className="w-4 h-4 text-indigo-600" />
                </div>
                <div>
                  <span className="text-xs font-semibold text-slate-700 block">Product Design Strategy</span>
                  <span className="text-[9px] text-slate-400 font-mono block">Expected July 2026</span>
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
