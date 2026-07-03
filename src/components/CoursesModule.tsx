import React, { useState } from "react";
import {
  Search,
  Star,
  Play,
  CheckCircle,
  ChevronRight,
  ArrowLeft,
  BookOpen,
  AlertCircle,
  Sparkles,
  Check,
  Bookmark,
  Calendar,
  Award,
  Download,
  Send,
  MessageSquare,
  ThumbsUp,
  FileText,
  Clock,
  Coins,
  ChevronDown,
  Info
} from "lucide-react";
import { Course, Lesson, LiveClass } from "../types";

interface CoursesModuleProps {
  courses: Course[];
  setCourses: React.Dispatch<React.SetStateAction<Course[]>>;
  liveClasses?: LiveClass[];
  onAddNotification?: (t: string, d: string, type: "message" | "alert" | "recommendation" | "application") => void;
}

export default function CoursesModule({ courses, setCourses, liveClasses = [], onAddNotification }: CoursesModuleProps) {
  // Navigation View Tab: "catalog" | "live"
  const [moduleView, setModuleView] = useState<"catalog" | "live">("catalog");

  const [selectedCourseId, setSelectedCourseId] = useState<string | null>("course-1");
  const [searchQuery, setSearchQuery] = useState("");
  const [levelFilter, setLevelFilter] = useState<string>("All");
  const [categoryFilter, setCategoryFilter] = useState<string>("All");
  const [ratingFilter, setRatingFilter] = useState<string>("All");
  const [priceFilter, setPriceFilter] = useState<string>("All");

  // Video player simulation state
  const [activeLessonId, setActiveLessonId] = useState<string>("les-4");

  // Interactive reviews state
  const [reviewRating, setReviewRating] = useState<number>(5);
  const [reviewText, setReviewText] = useState<string>("");
  const [customReviews, setCustomReviews] = useState<Array<{ user: string; stars: number; text: string; date: string }>>([
    { user: "Sarah Lin", stars: 5, text: "The tokens hierarchy section saved me weeks of refactoring. High-fidelity layouts now update dynamically!", date: "June 28, 2026" },
    { user: "Devon M.", stars: 4, text: "Excellent video pacing. The explanation of React 19 Concurrent hooks was incredibly clear.", date: "June 15, 2026" }
  ]);

  // Certificate modal state
  const [showCertificate, setShowCertificate] = useState(false);

  // Live session state
  const [liveReminders, setLiveReminders] = useState<Record<string, boolean>>({});
  const [joinedLiveId, setJoinedLiveId] = useState<string | null>(null);
  const [liveQaText, setLiveQaText] = useState("");
  const [liveQaList, setLiveQaList] = useState([
    { user: "Abhishek Makwana", question: "Will Tailwind CSS v4 support backward compatibility for nested theme configs?", votes: 4 }
  ]);

  const filteredCourses = courses.filter((c) => {
    const matchesSearch = c.title.toLowerCase().includes(searchQuery.toLowerCase()) || c.instructor.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesLevel = levelFilter === "All" || c.level === levelFilter;
    const matchesCategory = categoryFilter === "All" || c.category === categoryFilter;
    const matchesRating = ratingFilter === "All" || (ratingFilter === "4.5 & up" && c.rating >= 4.5);
    const matchesPrice = priceFilter === "All" || (priceFilter === "Free" ? (c.price || 0) === 0 : (c.price || 0) > 0);
    return matchesSearch && matchesLevel && matchesCategory && matchesRating && matchesPrice;
  });

  const selectedCourse = courses.find((c) => c.id === selectedCourseId) || courses[0];

  const handleToggleEnroll = (id: string) => {
    setCourses(
      courses.map((c) => {
        if (c.id === id) {
          const enrollState = !c.enrolled;
          return {
            ...c,
            enrolled: enrollState,
            progress: enrollState ? 10 : 0,
          };
        }
        return c;
      })
    );
  };

  const handleToggleLessonComplete = (courseId: string, sectionId: string, lessonId: string) => {
    setCourses(
      courses.map((c) => {
        if (c.id === courseId) {
          const updatedCurriculum = c.curriculum.map((sec) => {
            if (sec.id === sectionId) {
              const updatedLessons = sec.lessons.map((les) => {
                if (les.id === lessonId) {
                  return { ...les, isCompleted: !les.isCompleted };
                }
                return les;
              });
              return { ...sec, lessons: updatedLessons };
            }
            return sec;
          });

          // Recalculate progress based on completed lessons count
          const allLessons = updatedCurriculum.flatMap((s) => s.lessons);
          const completedCount = allLessons.filter((l) => l.isCompleted).length;
          const totalLessons = allLessons.length;
          const progress = totalLessons > 0 ? Math.round((completedCount / totalLessons) * 100) : 0;

          return {
            ...c,
            curriculum: updatedCurriculum,
            progress,
          };
        }
        return c;
      })
    );
  };

  const handleCompleteAllLessons = (courseId: string) => {
    setCourses(
      courses.map((c) => {
        if (c.id === courseId) {
          const updatedCurriculum = c.curriculum.map((sec) => ({
            ...sec,
            lessons: sec.lessons.map((l) => ({ ...l, isCompleted: true }))
          }));
          return {
            ...c,
            curriculum: updatedCurriculum,
            progress: 100
          };
        }
        return c;
      })
    );
  };

  const handlePostReview = () => {
    if (reviewText.trim() === "") return;
    setCustomReviews([
      { user: "Abhishek Makwana", stars: reviewRating, text: reviewText, date: "Just now" },
      ...customReviews
    ]);
    setReviewText("");
  };

  const activeLesson = selectedCourse?.curriculum
    ?.flatMap((s) => s.lessons)
    ?.find((l) => l.id === activeLessonId) || selectedCourse?.curriculum?.[0]?.lessons?.[0];

  // Static list of Live sessions
  const liveSessions = [
    { id: "live-1", title: "Figma Variables Dynamic Token Compilers", instructor: "Marcus Aurelius", time: "11:00 AM - 12:30 PM", date: "Today, July 02", desc: "Build design token export matrices directly using Figma API and compile them to Tailwind theme variables." },
    { id: "live-2", title: "WebGL High-Throughput Collaborative Canvas Mapping", instructor: "Nadia Tesla", time: "2:00 PM - 3:30 PM", date: "Tomorrow, July 03", desc: "Scale drawing coordinate matrices in custom layouts with hardware-accelerated canvas components." }
  ];

  const pastLiveRecordings = [
    { id: "past-1", title: "Establishing Multi-factor OAuth Verification Systems", duration: "1h 15m", date: "June 25, 2026", link: "#" },
    { id: "past-2", title: "React 19 Server Components and Transitions Deepdive", duration: "58m", date: "June 18, 2026", link: "#" }
  ];

  return (
    <div className="h-full flex flex-col gap-6 select-none font-sans overflow-hidden">
      
      {/* Module Title & Navigation Tabs */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-slate-200 pb-4">
        <div>
          <div className="flex items-center gap-1.5 text-indigo-650 font-mono text-xs mb-1 font-bold">
            <BookOpen className="w-4 h-4 text-indigo-600" />
            <span>LEARNING MANAGEMENT ENVIRONMENT</span>
          </div>
          <h2 className="text-xl font-display font-bold text-slate-900 tracking-tight">Academic Learning Center</h2>
        </div>

        <div className="flex items-center gap-2 bg-white p-1 rounded-xl border border-slate-200 shadow-sm">
          <button
            onClick={() => setModuleView("catalog")}
            className={`px-4 py-1.5 rounded-lg text-xs font-medium transition-all cursor-pointer ${
              moduleView === "catalog" ? "bg-indigo-600 text-white shadow-sm font-semibold" : "text-slate-500 hover:text-slate-900 hover:bg-slate-50"
            }`}
          >
            Syllabus & Video Player
          </button>
          <button
            onClick={() => setModuleView("live")}
            className={`px-4 py-1.5 rounded-lg text-xs font-medium transition-all cursor-pointer flex items-center gap-1.5 ${
              moduleView === "live" ? "bg-indigo-600 text-white shadow-sm font-semibold" : "text-slate-500 hover:text-slate-900 hover:bg-slate-50"
            }`}
          >
            <Calendar className="w-3.5 h-3.5" />
            <span>Live Interactive Classes</span>
            <span className="w-2 h-2 rounded-full bg-rose-500 animate-pulse" />
          </button>
        </div>
      </div>

      {/* RENDER TAB 1: SYLLABUS CATALOG WORKSPACE */}
      {moduleView === "catalog" && (
        <div className="flex-1 flex flex-col md:flex-row gap-6 overflow-hidden">
          
          {/* LEFT: Course Directory Ledger */}
          <div className="w-full md:w-80 flex flex-col gap-4 shrink-0 overflow-y-auto pr-1 border-r border-slate-200/60 pb-6">
            <div className="flex items-center justify-between">
              <span className="text-[10px] text-slate-400 font-mono uppercase font-bold">Catalog Directory</span>
              <span className="text-[9px] text-indigo-600 font-mono font-bold uppercase">{filteredCourses.length} Courses available</span>
            </div>

            {/* Unified search bar */}
            <div className="relative">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by keyword, instructor..."
                className="w-full pl-9 pr-3 py-1.5 bg-white border border-slate-200 rounded-lg text-xs text-slate-800 focus:outline-none focus:border-indigo-600 focus:ring-1 focus:ring-indigo-600 transition-colors"
              />
              <Search className="absolute left-3 top-2.5 w-3.5 h-3.5 text-slate-400" />
            </div>

            {/* EXPANDED FILTER GRIDS */}
            <div className="space-y-3 p-3 bg-slate-50 border border-slate-200/80 rounded-xl">
              {/* Category selector */}
              <div className="space-y-1">
                <label className="text-[9px] font-mono text-slate-400 uppercase font-semibold block">Category</label>
                <select
                  value={categoryFilter}
                  onChange={(e) => setCategoryFilter(e.target.value)}
                  className="w-full bg-white border border-slate-200 rounded p-1 text-[10px] text-slate-750 font-medium focus:outline-none focus:border-indigo-600"
                >
                  <option value="All">All Categories</option>
                  <option value="Design Systems">Design Systems</option>
                  <option value="Advanced Design">Advanced Design</option>
                  <option value="React Frontend">React Frontend</option>
                </select>
              </div>

              {/* Level Filter */}
              <div className="space-y-1">
                <label className="text-[9px] font-mono text-slate-400 uppercase font-semibold block">Difficulty Level</label>
                <select
                  value={levelFilter}
                  onChange={(e) => setLevelFilter(e.target.value)}
                  className="w-full bg-white border border-slate-200 rounded p-1 text-[10px] text-slate-750 font-medium focus:outline-none focus:border-indigo-600"
                >
                  <option value="All">All Skill Levels</option>
                  <option value="Beginner">Beginner</option>
                  <option value="Intermediate">Intermediate</option>
                  <option value="Advanced">Advanced</option>
                </select>
              </div>

              {/* Rating Filter */}
              <div className="space-y-1">
                <label className="text-[9px] font-mono text-slate-400 uppercase font-semibold block">Rating Range</label>
                <select
                  value={ratingFilter}
                  onChange={(e) => setRatingFilter(e.target.value)}
                  className="w-full bg-white border border-slate-200 rounded p-1 text-[10px] text-slate-750 font-medium focus:outline-none focus:border-indigo-600"
                >
                  <option value="All">All Ratings</option>
                  <option value="4.5 & up">★ 4.5 & up</option>
                  <option value="4.8 & up">★ 4.8 & up</option>
                </select>
              </div>

              {/* Price Filter */}
              <div className="space-y-1">
                <label className="text-[9px] font-mono text-slate-400 uppercase font-semibold block">Price Model</label>
                <select
                  value={priceFilter}
                  onChange={(e) => setPriceFilter(e.target.value)}
                  className="w-full bg-white border border-slate-200 rounded p-1 text-[10px] text-slate-750 font-medium focus:outline-none focus:border-indigo-600"
                >
                  <option value="All">All Models</option>
                  <option value="Free">Free (Verified)</option>
                  <option value="Paid">Premium Paid</option>
                </select>
              </div>
            </div>

            {/* List */}
            <div className="space-y-2.5">
              {filteredCourses.map((c) => {
                const isSelected = c.id === selectedCourseId;
                return (
                  <div
                    key={c.id}
                    onClick={() => {
                      setSelectedCourseId(c.id);
                      if (c.curriculum?.[0]?.lessons?.[0]) {
                        setActiveLessonId(c.curriculum[0].lessons[0].id);
                      }
                    }}
                    className={`p-3.5 border rounded-xl cursor-pointer transition-all ${
                      isSelected
                        ? "bg-indigo-50/45 border-indigo-500 ring-1 ring-indigo-500 shadow-sm"
                        : "bg-white border-slate-200 hover:border-slate-300 shadow-sm"
                    }`}
                  >
                    <div className="flex justify-between items-start gap-2">
                      <span className="text-[9px] font-mono text-slate-400 uppercase font-bold">{c.category}</span>
                      <div className="flex items-center gap-0.5 text-[10px] text-amber-500">
                        <Star className="w-3 h-3 fill-amber-500" />
                        <span>{c.rating}</span>
                      </div>
                    </div>

                    <h4 className="text-slate-800 text-xs font-semibold font-display mt-1.5 line-clamp-1">{c.title}</h4>
                    <p className="text-slate-400 text-[10px] truncate leading-none mt-1">Instructor: {c.instructor}</p>

                    <div className="flex justify-between items-center pt-3 mt-3 border-t border-slate-100 text-[9px] font-mono">
                      <span className="text-slate-450">{c.duration} &bull; {c.level}</span>
                      {c.enrolled ? (
                        <span className="text-emerald-700 font-bold bg-emerald-50 px-1.5 py-0.5 border border-emerald-100 rounded leading-none">
                          {c.progress}% done
                        </span>
                      ) : (
                        <span className="text-indigo-600 font-bold hover:underline">Enroll Free</span>
                      )}
                    </div>
                  </div>
                );
              })}

              {filteredCourses.length === 0 && (
                <div className="p-6 text-center text-slate-400 italic text-xs bg-white border border-dashed border-slate-200 rounded-xl">
                  No courses match chosen filter criteria.
                </div>
              )}
            </div>
          </div>

          {/* RIGHT: Course video player and active workflow workspace */}
          {selectedCourse ? (
            <div className="flex-grow flex flex-col gap-6 overflow-y-auto pb-8 pr-1">
              
              {/* Course description meta banner */}
              <div className="bg-white border border-slate-200 p-5 rounded-2xl flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 shadow-sm">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-[9px] font-mono text-indigo-700 bg-indigo-50 border border-indigo-150 px-2 py-0.5 rounded uppercase font-bold">
                      {selectedCourse.category}
                    </span>
                    <span className="text-slate-350 text-xs font-mono">&bull;</span>
                    <span className="text-slate-400 text-[10px] font-semibold uppercase">{selectedCourse.level} &bull; {selectedCourse.duration}</span>
                  </div>
                  <h3 className="text-slate-900 font-display font-bold text-lg tracking-tight mt-1">{selectedCourse.title}</h3>
                  <p className="text-slate-500 text-xs mt-0.5">Academic Lead: <strong className="text-slate-700 font-semibold">{selectedCourse.instructor}</strong> &bull; Stanford Design Affiliate</p>
                </div>

                <div className="flex gap-2">
                  <button
                    onClick={() => handleToggleEnroll(selectedCourse.id)}
                    className={`px-4 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                      selectedCourse.enrolled
                        ? "bg-slate-150 text-slate-700 border border-slate-250 hover:bg-slate-200"
                        : "bg-indigo-600 hover:bg-indigo-700 text-white shadow-sm"
                    }`}
                  >
                    {selectedCourse.enrolled ? "Leave Course Workspace" : "Enroll & Start Course"}
                  </button>
                  {selectedCourse.enrolled && selectedCourse.progress < 100 && (
                    <button
                      onClick={() => handleCompleteAllLessons(selectedCourse.id)}
                      className="px-3 py-1.5 bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold rounded-lg hover:bg-emerald-100 transition-colors"
                    >
                      Instant Finish (100%)
                    </button>
                  )}
                </div>
              </div>

              {selectedCourse.enrolled ? (
                <div className="grid lg:grid-cols-3 gap-6">
                  
                  {/* Left Column: Player and descriptions */}
                  <div className="lg:col-span-2 space-y-6">
                    
                    {/* VIDEO FEED PLAYER SANDBOX */}
                    <div className="aspect-video bg-slate-900 rounded-2xl border border-slate-950 flex flex-col justify-between p-6 relative overflow-hidden group shadow-lg">
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-black/40 z-0" />
                      
                      <div className="z-10 flex justify-between items-center">
                        <span className="bg-emerald-500 text-white font-mono text-[8px] font-bold px-2 py-0.5 rounded uppercase tracking-wider leading-none shadow-sm">
                          STREAMING (1080P)
                        </span>
                        <span className="text-[9px] font-mono text-slate-300">Section: Core variables setup</span>
                      </div>

                      <div className="z-10 flex-1 flex flex-col items-center justify-center text-center space-y-4 pt-4">
                        <div className="w-14 h-14 rounded-full bg-indigo-600/90 border-2 border-indigo-400 text-white flex items-center justify-center group-hover:scale-110 transition-transform shadow-2xl cursor-pointer">
                          <Play className="w-6 h-6 fill-white ml-0.5" />
                        </div>
                        <div>
                          <h4 className="text-white text-xs font-semibold font-display tracking-wide font-bold">
                            {activeLesson ? activeLesson.title : "Introduction lesson"}
                          </h4>
                          <span className="text-[10px] text-indigo-300 block font-mono mt-1">Video Stream Length &bull; {activeLesson ? activeLesson.duration : "12m"}</span>
                        </div>
                      </div>

                      <div className="z-10 flex justify-between items-center border-t border-slate-700/60 pt-3">
                        <span className="text-[9px] text-slate-300 font-mono">Academic ID: COR-PLAY-S1A</span>
                        
                        <button
                          onClick={() => {
                            const currentSection = selectedCourse.curriculum.find(s => s.lessons.some(l => l.id === activeLesson?.id));
                            if (currentSection && activeLesson) {
                              handleToggleLessonComplete(selectedCourse.id, currentSection.id, activeLesson.id);
                            }
                          }}
                          className="px-3 py-1 bg-white hover:bg-slate-100 text-slate-800 rounded text-[10px] font-bold flex items-center gap-1 cursor-pointer shadow-md"
                        >
                          {activeLesson?.isCompleted ? (
                            <>
                              <CheckCircle className="w-3 h-3 text-emerald-600 fill-emerald-100" />
                              <span>Lesson Completed!</span>
                            </>
                          ) : (
                            <span>Mark as Lesson Finished</span>
                          )}
                        </button>
                      </div>
                    </div>

                    {/* DYNAMIC CERTIFICATE GENERATION FOR 100% DONE */}
                    {selectedCourse.progress === 100 && (
                      <div className="bg-gradient-to-r from-emerald-500/10 via-teal-500/5 to-indigo-500/10 border border-emerald-250 p-6 rounded-2xl space-y-4 shadow-sm relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/10 rounded-full blur-2xl" />
                        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 relative z-10">
                          <div>
                            <div className="flex items-center gap-1.5 text-emerald-700 font-mono text-[10px] font-bold uppercase mb-1">
                              <Award className="w-4 h-4 text-emerald-600" />
                              <span>OFFICIAL CREDENTIAL COMPILED</span>
                            </div>
                            <h4 className="text-slate-800 font-display font-bold text-sm tracking-tight">Download Professional Certification</h4>
                            <p className="text-slate-500 text-[11px] leading-relaxed mt-0.5">
                              You have achieved 100% completion in {selectedCourse.title}. This credential boosts your matching quotient.
                            </p>
                          </div>
                          <button
                            onClick={() => setShowCertificate(true)}
                            className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold rounded-xl flex items-center gap-1.5 cursor-pointer shadow"
                          >
                            <Award className="w-4 h-4" />
                            <span>View &amp; Print Certificate</span>
                          </button>
                        </div>
                      </div>
                    )}

                    {/* Course details, curriculum outcomes, and downloadable resources */}
                    <div className="bg-white border border-slate-200 rounded-2xl p-5 space-y-5 shadow-sm">
                      <div className="border-b border-slate-100 pb-3">
                        <h4 className="text-slate-800 text-xs font-bold font-mono uppercase tracking-wider">Learning Outcomes</h4>
                        <div className="grid sm:grid-cols-2 gap-2 mt-3 text-xs text-slate-600">
                          <div className="flex gap-2 items-start">
                            <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                            <span>Assemble full design system token dictionaries</span>
                          </div>
                          <div className="flex gap-2 items-start">
                            <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                            <span>Master custom React hooks and transitions</span>
                          </div>
                          <div className="flex gap-2 items-start">
                            <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                            <span>Establish seamless variables compilations</span>
                          </div>
                          <div className="flex gap-2 items-start">
                            <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                            <span>Formulate high-performance components models</span>
                          </div>
                        </div>
                      </div>

                      {/* DOWNLOADABLE SYLLABUS RESOURCES */}
                      <div className="border-b border-slate-100 pb-3">
                        <h4 className="text-slate-800 text-xs font-bold font-mono uppercase tracking-wider mb-2.5">Downloadable Course Resources</h4>
                        <div className="grid sm:grid-cols-2 gap-3 text-xs">
                          <div className="p-3 bg-slate-50 border border-slate-150 rounded-xl flex justify-between items-center">
                            <div className="flex items-center gap-2">
                              <FileText className="w-4 h-4 text-indigo-600" />
                              <div>
                                <span className="font-semibold text-slate-800 block">Syllabus Tokens Guide</span>
                                <span className="text-[9px] text-slate-400 block font-mono">PDF &bull; 4.8MB</span>
                              </div>
                            </div>
                            <button className="p-1.5 hover:bg-slate-200 text-slate-600 rounded">
                              <Download className="w-3.5 h-3.5" />
                            </button>
                          </div>

                          <div className="p-3 bg-slate-50 border border-slate-150 rounded-xl flex justify-between items-center">
                            <div className="flex items-center gap-2">
                              <FileText className="w-4 h-4 text-indigo-600" />
                              <div>
                                <span className="font-semibold text-slate-800 block">Figma Variable Compilation Kit</span>
                                <span className="text-[9px] text-slate-400 block font-mono">ZIP &bull; 12MB</span>
                              </div>
                            </div>
                            <button className="p-1.5 hover:bg-slate-200 text-slate-600 rounded">
                              <Download className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </div>
                      </div>

                      {/* Course review forum */}
                      <div className="space-y-4">
                        <h4 className="text-slate-800 text-xs font-bold font-mono uppercase tracking-wider">Course Reviews &amp; Ratings Feedback</h4>
                        
                        <div className="grid sm:grid-cols-3 gap-4 items-center bg-slate-50 p-4 rounded-xl border border-slate-150">
                          <div className="text-center sm:border-r border-slate-200">
                            <span className="text-3xl font-display font-bold text-slate-900 font-mono">{selectedCourse.rating}</span>
                            <div className="flex justify-center gap-0.5 text-amber-500 my-1">
                              {[1, 2, 3, 4, 5].map((s) => (
                                <Star key={s} className="w-3.5 h-3.5 fill-amber-500" />
                              ))}
                            </div>
                            <span className="text-[10px] text-slate-400 font-mono">Average Rating</span>
                          </div>

                          <div className="sm:col-span-2 space-y-1.5 text-xs text-slate-500 pl-2">
                            <div className="flex items-center gap-2">
                              <span className="w-10">5 stars</span>
                              <div className="flex-1 h-2 bg-slate-200 rounded overflow-hidden">
                                <div className="h-full bg-amber-500 rounded" style={{ width: "88%" }} />
                              </div>
                              <span className="w-8 font-mono">88%</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <span className="w-10">4 stars</span>
                              <div className="flex-1 h-2 bg-slate-200 rounded overflow-hidden">
                                <div className="h-full bg-amber-400 rounded" style={{ width: "12%" }} />
                              </div>
                              <span className="w-8 font-mono">12%</span>
                            </div>
                          </div>
                        </div>

                        {/* Leave a review block */}
                        <div className="p-4 bg-slate-50/50 border border-slate-150 rounded-xl space-y-3 text-xs">
                          <span className="font-semibold text-slate-800 block">Submit Course Feedback</span>
                          <div className="flex gap-2 items-center">
                            <span className="text-slate-500">Your Score rating:</span>
                            <div className="flex gap-1 text-amber-400">
                              {[1, 2, 3, 4, 5].map((star) => (
                                <button
                                  key={star}
                                  onClick={() => setReviewRating(star)}
                                  className="focus:outline-none cursor-pointer"
                                >
                                  <Star className={`w-4 h-4 ${star <= reviewRating ? "fill-amber-400 text-amber-400" : "text-slate-300"}`} />
                                </button>
                              ))}
                            </div>
                          </div>

                          <div className="flex gap-2">
                            <input
                              type="text"
                              value={reviewText}
                              onChange={(e) => setReviewText(e.target.value)}
                              placeholder="Review text..."
                              className="w-full bg-white border border-slate-200 rounded-lg px-3 py-1.5 text-xs focus:outline-none focus:border-indigo-600"
                            />
                            <button
                              onClick={handlePostReview}
                              className="px-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-xs font-semibold cursor-pointer"
                            >
                              Post
                            </button>
                          </div>
                        </div>

                        <div className="space-y-3">
                          {customReviews.map((rev, i) => (
                            <div key={i} className="p-3 bg-slate-50 border border-slate-150 rounded-xl space-y-1">
                              <div className="flex justify-between items-center text-[10px] font-mono">
                                <span className="font-semibold text-slate-800">{rev.user}</span>
                                <span className="text-slate-400">{rev.date}</span>
                              </div>
                              <div className="flex gap-0.5 text-amber-400">
                                {Array.from({ length: rev.stars }).map((_, stIdx) => (
                                  <Star key={stIdx} className="w-2.5 h-2.5 fill-amber-400 text-amber-400" />
                                ))}
                              </div>
                              <p className="text-slate-600 text-xs italic">"{rev.text}"</p>
                            </div>
                          ))}
                        </div>
                      </div>

                    </div>

                  </div>

                  {/* Right Column: Syllabus Curriculum Navigation */}
                  <div className="space-y-4">
                    <div className="bg-white border border-slate-200 p-4 rounded-xl shadow-sm text-xs space-y-3">
                      <div className="flex justify-between items-center font-mono">
                        <span className="text-slate-400 uppercase text-[9px] font-bold">Progress Rate</span>
                        <span className="text-indigo-600 font-bold">{selectedCourse.progress}% Completed</span>
                      </div>
                      <div className="h-1.5 bg-slate-100 rounded-full overflow-hidden">
                        <div className="h-full bg-indigo-600 rounded-full" style={{ width: `${selectedCourse.progress}%` }} />
                      </div>
                    </div>

                    <span className="text-[10px] text-slate-400 font-mono uppercase block font-bold">Course Syllabus</span>
                    
                    <div className="space-y-3">
                      {selectedCourse.curriculum.map((section) => (
                        <div key={section.id} className="space-y-1.5">
                          <span className="text-[10px] text-slate-500 font-semibold font-display block">{section.title}</span>
                          <div className="space-y-1">
                            {section.lessons.map((lesson) => {
                              const isActive = lesson.id === activeLessonId;
                              return (
                                <div
                                  key={lesson.id}
                                  className={`p-2.5 rounded-lg border text-xs flex justify-between items-center transition-all cursor-pointer ${
                                    isActive
                                      ? "bg-indigo-50/80 border-indigo-200 text-indigo-750"
                                      : "bg-white border-slate-200 hover:bg-slate-50 text-slate-700"
                                  }`}
                                >
                                  <div
                                    onClick={() => setActiveLessonId(lesson.id)}
                                    className="flex-1 min-w-0 pr-2 flex items-center gap-2"
                                  >
                                    <Play className={`w-3 h-3 ${isActive ? "text-indigo-600" : "text-slate-400"}`} />
                                    <span className={`truncate ${isActive ? "text-indigo-700 font-semibold" : "text-slate-700"}`}>{lesson.title}</span>
                                  </div>

                                  <div className="flex items-center gap-2 shrink-0">
                                    <span className="text-[9px] text-slate-400 font-mono">{lesson.duration}</span>
                                    <input
                                      type="checkbox"
                                      checked={lesson.isCompleted}
                                      onChange={() => handleToggleLessonComplete(selectedCourse.id, section.id, lesson.id)}
                                      className="w-3.5 h-3.5 accent-indigo-600 cursor-pointer"
                                    />
                                  </div>
                                </div>
                              );
                            })}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                </div>
              ) : (
                <div className="text-center p-12 bg-white border border-dashed border-slate-200 rounded-2xl space-y-4 shadow-sm max-w-xl mx-auto">
                  <BookOpen className="w-10 h-10 text-indigo-600/40 mx-auto" />
                  <div>
                    <h3 className="text-slate-800 font-display font-semibold text-sm">Enrollment Required</h3>
                    <p className="text-slate-500 text-xs mt-1">Enroll today to play video lessons, download learning assets, and claim certificates.</p>
                  </div>
                  <button
                    onClick={() => handleToggleEnroll(selectedCourse.id)}
                    className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold rounded-xl cursor-pointer shadow-sm"
                  >
                    Enroll Instantly (Free Preview)
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div className="flex-1 flex flex-col items-center justify-center text-center p-12 text-slate-400">
              <AlertCircle className="w-8 h-8 mb-2 text-slate-300" />
              <p className="text-xs">Select a course from list catalogue.</p>
            </div>
          )}

        </div>
      )}

      {/* RENDER TAB 2: LIVE CLASSES CALENDAR WORKSPACE */}
      {moduleView === "live" && (
        <div className="flex-1 overflow-y-auto pb-8 pr-1 space-y-6">
          <div className="bg-white border border-slate-200 p-5 rounded-2xl flex items-center gap-3 shadow-sm">
            <div className="w-10 h-10 rounded-lg bg-rose-50 border border-rose-100 flex items-center justify-center text-rose-500 shrink-0">
              <Calendar className="w-5 h-5 animate-pulse" />
            </div>
            <div>
              <h3 className="text-slate-800 font-display font-semibold text-sm">Interactive Live Classes Calendar</h3>
              <p className="text-slate-500 text-xs">Join webinars, live Q&amp;As, and live design systems reviews. Toggle reminders and join stream.</p>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            
            {/* Live sessions listings */}
            <div className="md:col-span-2 space-y-4">
              <span className="text-[10px] text-slate-400 font-mono uppercase block font-bold">Upcoming Live Classes Today</span>

              <div className="space-y-4">
                {liveSessions.map((session) => {
                  const isReminderSet = !!liveReminders[session.id];
                  const isJoined = joinedLiveId === session.id;

                  return (
                    <div key={session.id} className="p-5 bg-white border border-slate-200 rounded-2xl space-y-3.5 shadow-sm">
                      <div className="flex justify-between items-start gap-4">
                        <div>
                          <span className="text-[9px] font-mono text-indigo-600 uppercase font-bold">{session.date} &bull; {session.time}</span>
                          <h4 className="text-slate-850 font-display font-bold text-sm mt-0.5 leading-tight">{session.title}</h4>
                          <p className="text-slate-500 text-[11px]">Hosted by <strong className="text-slate-700 font-medium">{session.instructor}</strong></p>
                        </div>

                        <span className="px-2 py-0.5 bg-rose-50 border border-rose-150 text-rose-600 font-mono text-[9px] font-bold uppercase rounded-full">
                          Live Soon
                        </span>
                      </div>

                      <p className="text-slate-600 text-xs leading-relaxed">{session.desc}</p>

                      <div className="flex justify-between items-center pt-3 border-t border-slate-100">
                        <button
                          onClick={() => {
                            setLiveReminders({
                              ...liveReminders,
                              [session.id]: !isReminderSet
                            });
                          }}
                          className={`px-3 py-1.5 rounded-lg text-xs font-semibold border cursor-pointer ${
                            isReminderSet
                              ? "bg-indigo-50 border-indigo-200 text-indigo-700"
                              : "bg-white border-slate-200 text-slate-600 hover:bg-slate-50"
                          }`}
                        >
                          {isReminderSet ? "Reminder Scheduled" : "Set SMS Reminder"}
                        </button>

                        <button
                          onClick={() => setJoinedLiveId(isJoined ? null : session.id)}
                          className="px-3.5 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white text-[11px] font-semibold rounded-lg shadow-sm cursor-pointer"
                        >
                          {isJoined ? "Disconnecting stream..." : "Join Live Class Zoom"}
                        </button>
                      </div>

                      {/* Stream visual mockup */}
                      {isJoined && (
                        <div className="mt-4 p-4 bg-slate-900 border border-slate-950 rounded-xl space-y-3 text-white relative overflow-hidden">
                          <div className="absolute top-3 right-3 bg-red-600 px-2 py-0.5 rounded text-[8px] font-mono font-bold uppercase animate-pulse">
                            STREAM LIVE
                          </div>
                          <span className="text-[10px] text-slate-400 block font-mono">Academic Stream &bull; {session.instructor}</span>
                          <div className="aspect-video bg-black rounded border border-slate-800 flex items-center justify-center">
                            <span className="text-[11px] text-indigo-400 animate-pulse">[Realtime WebRTC stream simulation active]</span>
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>

              {/* Past live class recordings */}
              <div className="space-y-3 pt-4">
                <span className="text-[10px] text-slate-400 font-mono uppercase block font-bold">Past Live Class recordings</span>
                <div className="grid sm:grid-cols-2 gap-3 text-xs">
                  {pastLiveRecordings.map((rec) => (
                    <div key={rec.id} className="p-3.5 bg-white border border-slate-200 rounded-xl flex justify-between items-center shadow-sm">
                      <div className="space-y-1 pr-2">
                        <span className="text-[8px] text-slate-400 font-mono">{rec.date}</span>
                        <h5 className="font-semibold text-slate-800 truncate block max-w-[150px]">{rec.title}</h5>
                        <span className="text-[9px] text-slate-400 font-mono block">Length: {rec.duration}</span>
                      </div>
                      <button className="w-8 h-8 rounded-full bg-indigo-50 hover:bg-indigo-100 text-indigo-600 flex items-center justify-center shrink-0">
                        <Play className="w-3.5 h-3.5 fill-indigo-600 ml-0.5" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>

            </div>

            {/* Live Q&A Panel */}
            <div className="bg-white border border-slate-200 p-5 rounded-2xl h-fit space-y-4 shadow-sm">
              <span className="text-[10px] text-slate-400 font-mono uppercase block font-bold">Live Q&amp;A Participation</span>
              <p className="text-slate-500 text-xs">Submit questions to academic leads and vote on active questions threads.</p>

              <div className="space-y-2.5">
                {liveQaList.map((qa, idx) => (
                  <div key={idx} className="p-3 bg-slate-50 border border-slate-150 rounded-xl space-y-1.5 text-xs">
                    <div className="flex justify-between items-center text-[10px] font-mono">
                      <span className="text-slate-800 font-semibold">{qa.user}</span>
                      <button
                        onClick={() => {
                          setLiveQaList(
                            liveQaList.map((q, i) => (i === idx ? { ...q, votes: q.votes + 1 } : q))
                          );
                        }}
                        className="text-indigo-600 hover:underline cursor-pointer"
                      >
                        ▲ Vote ({qa.votes})
                      </button>
                    </div>
                    <p className="text-slate-600 text-[11px] leading-relaxed">"{qa.question}"</p>
                  </div>
                ))}
              </div>

              <div className="flex gap-2 pt-2 text-xs">
                <input
                  type="text"
                  value={liveQaText}
                  onChange={(e) => setLiveQaText(e.target.value)}
                  placeholder="Ask public question..."
                  className="w-full px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-slate-850 focus:outline-none focus:bg-white focus:border-indigo-600 focus:ring-1 focus:ring-indigo-600"
                />
                <button
                  onClick={() => {
                    if (liveQaText.trim() === "") return;
                    setLiveQaList([...liveQaList, { user: "Abhishek Makwana", question: liveQaText, votes: 1 }]);
                    setLiveQaText("");
                  }}
                  className="px-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg font-semibold cursor-pointer shadow-sm"
                >
                  Ask
                </button>
              </div>
            </div>

          </div>
        </div>
      )}

      {/* DYNAMIC CERTIFICATE FULL MODEL VIEWER POPUP OVERLAY */}
      {showCertificate && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-6 animate-fade-in">
          <div className="bg-white border border-slate-250 p-8 rounded-3xl w-full max-w-2xl space-y-6 relative shadow-2xl text-center text-slate-850 border-t-8 border-t-indigo-600">
            <button
              onClick={() => setShowCertificate(false)}
              className="absolute top-6 right-6 text-slate-400 hover:text-slate-600 cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4 inline mr-1" />
              <span className="text-xs font-semibold">Exit Preview</span>
            </button>

            {/* Certificate Aesthetic Layout border frame */}
            <div className="border-4 border-double border-slate-200 p-6 space-y-6 relative">
              <div className="absolute top-2 left-2 text-[9px] font-mono text-slate-350">LUMINA ACADEMY CREDENTIAL MASTER</div>
              
              <div className="space-y-1">
                <div className="w-12 h-12 bg-indigo-50 border border-indigo-200 rounded-full flex items-center justify-center mx-auto mb-2 text-indigo-600">
                  <Award className="w-6 h-6" />
                </div>
                <h3 className="font-serif text-2xl font-bold tracking-tight text-slate-900">Certificate of Specialization Completion</h3>
                <p className="text-[10px] font-mono text-slate-400 uppercase tracking-widest font-semibold">ECOSYSTEM DIGITAL EDUCATION NETWORK</p>
              </div>

              <div className="py-4 space-y-1.5">
                <p className="text-xs text-slate-500 italic">This official academic credential certifies that</p>
                <h4 className="font-display font-bold text-xl text-indigo-700 border-b border-slate-100 max-w-xs mx-auto pb-1">Abhishek Makwana</h4>
                <p className="text-xs text-slate-500 italic">has successfully verified and finalized all modules within specialism</p>
                <h5 className="font-display font-semibold text-sm text-slate-800">{selectedCourse.title}</h5>
              </div>

              <div className="grid grid-cols-2 gap-4 text-xs pt-4 border-t border-slate-100 font-mono text-slate-400">
                <div className="text-left">
                  <span>DATE: July 02, 2026</span>
                </div>
                <div className="text-right">
                  <span>VERIFICATION CODE: COR-2647-ASTR</span>
                </div>
              </div>
            </div>

            <div className="flex gap-3 justify-center text-xs">
              <button
                onClick={() => setShowCertificate(false)}
                className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-600 rounded-xl font-semibold cursor-pointer"
              >
                Close Preview
              </button>
              <button
                onClick={() => {
                  alert("Certificate PDF compilation downloaded to local disk.");
                  setShowCertificate(false);
                }}
                className="px-5 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-semibold flex items-center gap-1.5 cursor-pointer shadow-md"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Download Verified PDF Document</span>
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
