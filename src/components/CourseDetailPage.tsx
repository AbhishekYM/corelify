import React, { useState, useEffect } from "react";
import {
  Star, Clock, Users, BookOpen, Play, ChevronDown, ChevronUp, 
  CheckCircle2, Globe, Award, BarChart2, Heart, Share2, ShoppingCart,
  Lock, Zap, Trophy, MessageSquare, ThumbsUp, ChevronRight
} from "lucide-react";
import { useNavigate, useParams, Link } from "react-router-dom";
import PublicHeader from "./PublicHeader";
import PublicFooter from "./PublicFooter";

// ─── Generate rich course data for any course id ───────────────────────────
const COURSE_DB: Record<string, any> = {
  "wdev-1": { title: "Complete React & Next.js Developer Bootcamp", instructor: "Sarah Jenkins", instructorRole: "Next.js Core Team", rating: 4.9, reviewCount: 512, price: 89, originalPrice: 149, duration: "42h 30m", image: "https://picsum.photos/seed/webdev1/1200/600", level: "Intermediate", enrolled: 8430 },
  "wdev-2": { title: "Advanced CSS & Modern Animations", instructor: "Mark Chen", instructorRole: "CSS Expert at Google", rating: 4.8, reviewCount: 310, price: 59, duration: "18h 15m", image: "https://picsum.photos/seed/webdev2/1200/600", level: "Intermediate", enrolled: 5120 },
  "wdev-3": { title: "TypeScript Mastery: From Beginner to Pro", instructor: "Ana Rodrigues", instructorRole: "TypeScript Advocate", rating: 4.7, reviewCount: 288, price: 45, originalPrice: 90, duration: "24h 00m", image: "https://picsum.photos/seed/webdev3/1200/600", level: "Beginner", enrolled: 6780 },
  "wdev-4": { title: "Full-Stack Web Apps with Node.js & GraphQL", instructor: "James Wright", instructorRole: "Senior Engineer, Shopify", rating: 4.8, reviewCount: 198, price: 75, duration: "30h 45m", image: "https://picsum.photos/seed/webdev4/1200/600", level: "Advanced", enrolled: 3400 },
  "mob-1": { title: "React Native: Build iOS & Android Apps", instructor: "Priya Nair", instructorRole: "Mobile Lead at Meta", rating: 4.9, reviewCount: 422, price: 79, originalPrice: 130, duration: "36h 00m", image: "https://picsum.photos/seed/mobile1/1200/600", level: "Intermediate", enrolled: 7200 },
  "mob-2": { title: "Flutter & Dart for Beginners", instructor: "Luca Bianchi", instructorRole: "Flutter GDE", rating: 4.7, reviewCount: 275, price: 55, duration: "28h 30m", image: "https://picsum.photos/seed/mobile2/1200/600", level: "Beginner", enrolled: 4800 },
  "game-1": { title: "Unity Game Development Complete Course", instructor: "Chris Morgan", instructorRole: "Unity Certified Expert", rating: 4.9, reviewCount: 640, price: 85, originalPrice: 160, duration: "50h 00m", image: "https://picsum.photos/seed/game1/1200/600", level: "Beginner", enrolled: 12400 },
  "game-2": { title: "Unreal Engine 5: AAA Game Creation", instructor: "Sam Fischer", instructorRole: "Ex-Epic Games", rating: 4.8, reviewCount: 320, price: 99, duration: "38h 30m", image: "https://picsum.photos/seed/game2/1200/600", level: "Advanced", enrolled: 6700 },
  "fin-1": { title: "Financial Modeling & Valuation (DCF, LBO)", instructor: "David Park", instructorRole: "CFA, Goldman Sachs Alum", rating: 4.9, reviewCount: 480, price: 99, originalPrice: 180, duration: "28h 45m", image: "https://picsum.photos/seed/fin1/1200/600", level: "Advanced", enrolled: 9200 },
  "fin-2": { title: "Personal Finance & Investment Essentials", instructor: "Rachel Moore", instructorRole: "CFP Certified Planner", rating: 4.8, reviewCount: 390, price: 49, duration: "16h 00m", image: "https://picsum.photos/seed/fin2/1200/600", level: "Beginner", enrolled: 14500 },
  "fin-3": { title: "Crypto & DeFi Investment Strategies", instructor: "Tom Nakamura", instructorRole: "Blockchain Analyst", rating: 4.6, reviewCount: 222, price: 69, originalPrice: 120, duration: "20h 30m", image: "https://picsum.photos/seed/fin3/1200/600", level: "Intermediate", enrolled: 7800 },
  "str-1": { title: "Business Strategy: From Vision to Execution", instructor: "Laura Kim", instructorRole: "McKinsey Consultant", rating: 4.9, reviewCount: 354, price: 89, originalPrice: 150, duration: "22h 00m", image: "https://picsum.photos/seed/str1/1200/600", level: "Intermediate", enrolled: 6600 },
  "dm-1": { title: "Complete Digital Marketing Masterclass", instructor: "Sophie Turner", instructorRole: "CMO, Growth Agency", rating: 4.9, reviewCount: 720, price: 79, originalPrice: 149, duration: "40h 30m", image: "https://picsum.photos/seed/dm1/1200/600", level: "Beginner", enrolled: 18200 },
  "seo-1": { title: "SEO Mastery: Rank #1 on Google in 2025", instructor: "Brian Dean", instructorRole: "Founder, Backlinko", rating: 4.9, reviewCount: 880, price: 85, originalPrice: 160, duration: "32h 00m", image: "https://picsum.photos/seed/seo1/1200/600", level: "Intermediate", enrolled: 22000 },
  "uiux-1": { title: "Product Design Strategy & Systems", instructor: "Adrian Thompson", instructorRole: "Ex-Figma Designer", rating: 4.9, reviewCount: 342, price: 95, originalPrice: 180, duration: "18h 45m", image: "https://picsum.photos/seed/msq1rw8/1200/600", level: "Intermediate", enrolled: 7400 },
  "uiux-2": { title: "Figma Advanced: Auto Layout & Variables", instructor: "Lisa Wong", instructorRole: "Figma Ambassador", rating: 4.8, reviewCount: 510, price: 65, duration: "14h 00m", image: "https://picsum.photos/seed/uiux2/1200/600", level: "Advanced", enrolled: 9100 },
  "gfx-1": { title: "Adobe Illustrator Masterclass", instructor: "Marco Falchi", instructorRole: "Creative Director", rating: 4.8, reviewCount: 410, price: 69, originalPrice: 120, duration: "26h 00m", image: "https://picsum.photos/seed/gfx1/1200/600", level: "Beginner", enrolled: 11200 },
  "math-1": { title: "Calculus 1-3: Complete University Course", instructor: "Prof. Alan Grant", instructorRole: "MIT Mathematics", rating: 4.9, reviewCount: 890, price: 49, originalPrice: 99, duration: "60h 00m", image: "https://picsum.photos/seed/math1/1200/600", level: "Beginner", enrolled: 24500 },
  "sci-2": { title: "Data Science & Machine Learning Bootcamp", instructor: "Roberto Silva", instructorRole: "Senior DS at Google", rating: 4.8, reviewCount: 1200, price: 79, duration: "52h 30m", image: "https://picsum.photos/seed/sci2/1200/600", level: "Intermediate", enrolled: 34000 },
};

function buildCourse(id: string) {
  const base = COURSE_DB[id];
  if (!base) return null;
  const shortTitle = base.title.split(":")[0];
  return {
    ...base,
    subtitle: `Master ${shortTitle} with hands-on projects and expert guidance from ${base.instructor}.`,
    instructorBio: `${base.instructor} is an industry expert and ${base.instructorRole} with over 10 years of experience teaching thousands of professionals worldwide.`,
    instructorAvatar: `https://picsum.photos/seed/${id}-inst/200/200`,
    instructorCourses: 6, instructorStudents: base.enrolled * 3, instructorRating: Math.min(base.rating, 5.0),
    lastUpdated: "June 2026", language: "English", certificate: true,
    description: `This comprehensive course takes you from beginner to professional in ${shortTitle}. You'll work on real-world projects, follow industry best practices, and build a strong portfolio. By the end, you'll have the confidence to tackle any challenge in ${shortTitle}.`,
    whatYouLearn: [
      `Master the core concepts of ${shortTitle}`,
      "Build production-ready projects from scratch",
      "Apply industry best practices and patterns",
      "Work with real-world datasets and tooling",
      "Optimize for performance and scalability",
      "Prepare for job interviews and certifications",
      "Access a growing community of learners",
      "Get lifetime access and free future updates",
    ],
    requirements: [
      "Basic computer literacy and internet access",
      "Dedication and willingness to practice",
      "No prior experience required for beginner level",
    ],
    sections: [
      {
        title: "Foundation & Setup", lectures: 6, duration: "3h 15m",
        lessons: [
          { title: "Welcome & Course Overview", duration: "10m", free: true },
          { title: "Environment Setup & Tools", duration: "25m", free: true },
          { title: "Core Concepts Introduction", duration: "35m" },
          { title: "Your First Project", duration: "45m" },
          { title: "Fundamentals Deep Dive", duration: "50m" },
          { title: "Practice Exercises", duration: "30m" },
        ]
      },
      {
        title: "Intermediate Techniques", lectures: 8, duration: "5h 30m",
        lessons: [
          { title: "Advanced Patterns", duration: "40m" },
          { title: "Real-World Application", duration: "55m" },
          { title: "Performance Optimization", duration: "45m" },
          { title: "Testing & Debugging", duration: "38m" },
          { title: "Integration with Tools", duration: "48m" },
          { title: "Mini Project Build", duration: "60m" },
          { title: "Code Review Session", duration: "35m" },
          { title: "Assessment & Quiz", duration: "29m" },
        ]
      },
      {
        title: "Advanced Mastery", lectures: 5, duration: "4h 00m",
        lessons: [
          { title: "Expert-level Techniques", duration: "50m" },
          { title: "System Design & Architecture", duration: "55m" },
          { title: "Industry Case Studies", duration: "40m" },
          { title: "Capstone Portfolio Project", duration: "70m" },
          { title: "Course Wrap-up & Next Steps", duration: "25m" },
        ]
      },
    ],
    reviews: [
      { name: "Alex M.", avatar: `https://picsum.photos/seed/${id}-r1/100/100`, rating: 5, date: "June 2026", text: `Excellent course! ${base.instructor}'s teaching style is very clear and the projects are industry-relevant. Highly recommend to anyone getting started.` },
      { name: "Jamie L.", avatar: `https://picsum.photos/seed/${id}-r2/100/100`, rating: 5, date: "May 2026", text: "Best structured course I have found on this topic. Everything is explained step-by-step with real examples. Worth every penny!" },
      { name: "Sam P.", avatar: `https://picsum.photos/seed/${id}-r3/100/100`, rating: 4, date: "April 2026", text: "Very comprehensive and well-paced. Would love more quizzes but the project work more than makes up for it." },
      { name: "Priya N.", avatar: `https://picsum.photos/seed/${id}-r4/100/100`, rating: 5, date: "March 2026", text: "Joined as a complete beginner and finished feeling very confident. The instructor answers questions quickly in the community. Amazing experience." },
    ],
    tags: [shortTitle, base.level, "Career Development", "Certificate"],
  };
}

function StarRating({ rating, size = "sm" }: { rating: number; size?: "sm" | "lg" }) {
  const cls = size === "lg" ? "w-5 h-5" : "w-3.5 h-3.5";
  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map(i => (
        <Star key={i} className={`${cls} ${i <= Math.round(rating) ? "text-amber-400 fill-amber-400" : "text-slate-200"}`} />
      ))}
    </div>
  );
}

export default function CourseDetailPage() {
  const navigate = useNavigate();
  const { courseId } = useParams<{ courseId: string }>();
  const [activeTab, setActiveTab] = useState<"overview" | "curriculum" | "instructor" | "reviews">("overview");
  const [openSections, setOpenSections] = useState<Record<number, boolean>>({ 0: true });
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [enrolled, setEnrolled] = useState(false);

  const course = courseId ? buildCourse(courseId) : null;

  useEffect(() => { window.scrollTo(0, 0); }, [courseId]);

  if (!course) {
    return (
      <div className="min-h-screen bg-[#F8FAFC] flex flex-col">
        <PublicHeader />
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center py-24">
            <h2 className="text-2xl font-display font-bold text-slate-800 mb-2">Course Not Found</h2>
            <p className="text-slate-500 text-sm mb-6">This course doesn't exist or may have been removed.</p>
            <button onClick={() => navigate(-1)} className="px-6 py-3 bg-[#0B0F59] text-white rounded-xl text-sm font-semibold cursor-pointer hover:bg-indigo-900 transition-colors">
              ← Go Back
            </button>
          </div>
        </div>
        <PublicFooter />
      </div>
    );
  }

  const totalLessons = course.sections.reduce((a: number, s: any) => a + s.lessons.length, 0);
  const ratingBreakdown = [
    { stars: 5, pct: 68 }, { stars: 4, pct: 22 }, { stars: 3, pct: 7 },
    { stars: 2, pct: 2 }, { stars: 1, pct: 1 },
  ];
  const TABS = [
    { id: "overview", label: "Overview" },
    { id: "curriculum", label: "Curriculum" },
    { id: "instructor", label: "Instructor" },
    { id: "reviews", label: `Reviews (${course.reviewCount})` },
  ] as const;

  return (
    <div className="min-h-screen bg-[#F8FAFC] font-sans">
      <PublicHeader />

      {/* ── HERO ── */}
      <div className="bg-[#0B0F59] relative overflow-hidden">
        <div className="absolute inset-0">
          <img src={course.image} alt="" className="w-full h-full object-cover opacity-10" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0B0F59] via-[#0B0F59]/95 to-[#0B0F59]/60" />
        </div>
        <div className="relative z-10 max-w-[1200px] mx-auto px-6 py-12 lg:py-16">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-indigo-300/70 text-xs mb-6 flex-wrap">
            <Link to="/" className="hover:text-white transition-colors">Home</Link>
            <ChevronRight className="w-3 h-3 shrink-0" />
            <button onClick={() => navigate(-1)} className="hover:text-white transition-colors cursor-pointer">Courses</button>
            <ChevronRight className="w-3 h-3 shrink-0" />
            <span className="text-indigo-100 truncate max-w-xs">{course.title}</span>
          </nav>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
            {/* Left: details */}
            <div className="lg:col-span-7">
              <span className="inline-flex items-center gap-1.5 bg-indigo-500/20 border border-indigo-400/30 text-indigo-200 text-[10px] font-bold px-3 py-1 rounded-full mb-4 uppercase tracking-wider">
                <BarChart2 className="w-3 h-3" /> {course.level}
              </span>
              <h1 className="text-2xl md:text-4xl font-display font-bold text-white leading-tight mb-3">{course.title}</h1>
              <p className="text-indigo-200/80 text-sm leading-relaxed mb-5 max-w-xl">{course.subtitle}</p>

              <div className="flex flex-wrap items-center gap-4 mb-5">
                <div className="flex items-center gap-2">
                  <span className="text-amber-400 font-bold text-xl">{course.rating}</span>
                  <StarRating rating={course.rating} />
                  <span className="text-indigo-300/70 text-xs">({course.reviewCount.toLocaleString()} reviews)</span>
                </div>
                <div className="flex items-center gap-1.5 text-indigo-300 text-xs">
                  <Users className="w-3.5 h-3.5" />
                  {course.enrolled.toLocaleString()} students
                </div>
              </div>

              <div className="flex items-center gap-3 mb-6">
                <img src={course.instructorAvatar} alt={course.instructor} className="w-9 h-9 rounded-full object-cover border-2 border-indigo-400/40 shrink-0" />
                <div>
                  <span className="text-white text-sm font-semibold">{course.instructor}</span>
                  <span className="text-indigo-300/70 text-xs ml-1.5">· {course.instructorRole}</span>
                </div>
              </div>

              <div className="flex flex-wrap gap-4 text-xs text-indigo-200/70">
                <span className="flex items-center gap-1.5"><Clock className="w-3.5 h-3.5" /> {course.duration}</span>
                <span className="flex items-center gap-1.5"><BookOpen className="w-3.5 h-3.5" /> {totalLessons} lessons</span>
                <span className="flex items-center gap-1.5"><Globe className="w-3.5 h-3.5" /> {course.language}</span>
                <span className="flex items-center gap-1.5"><Award className="w-3.5 h-3.5" /> Certificate included</span>
                <span className="flex items-center gap-1.5"><Zap className="w-3.5 h-3.5" /> Updated {course.lastUpdated}</span>
              </div>
            </div>

            {/* Right: preview card — desktop */}
            <div className="lg:col-span-5 hidden lg:block">
              <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
                <div className="relative aspect-video bg-slate-900 cursor-pointer group">
                  <img src={course.image} alt="" className="w-full h-full object-cover opacity-70 group-hover:opacity-80 transition-opacity" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-16 h-16 bg-white/95 rounded-full flex items-center justify-center shadow-xl group-hover:scale-105 transition-transform">
                      <Play className="w-7 h-7 text-[#0B0F59] ml-0.5" />
                    </div>
                  </div>
                  <div className="absolute bottom-3 left-3 bg-black/60 text-white text-[10px] px-2 py-0.5 rounded font-mono">Free Preview</div>
                </div>
                <div className="p-5">
                  <div className="flex items-center gap-3 mb-4">
                    <span className="text-3xl font-display font-bold text-slate-900">GHC {course.price}</span>
                    {course.originalPrice && <span className="text-slate-400 text-sm line-through">GHC {course.originalPrice}</span>}
                    {course.originalPrice && <span className="ml-auto bg-rose-100 text-rose-600 text-xs font-bold px-2 py-0.5 rounded">{Math.round((1 - course.price / course.originalPrice) * 100)}% OFF</span>}
                  </div>
                  <button onClick={() => setEnrolled(true)} className={`w-full py-3 font-bold rounded-xl flex items-center justify-center gap-2 transition-colors cursor-pointer mb-3 text-sm ${enrolled ? "bg-emerald-600 hover:bg-emerald-700 text-white" : "bg-[#0B0F59] hover:bg-indigo-900 text-white shadow-lg shadow-indigo-900/20"}`}>
                    {enrolled ? <><Play className="w-4 h-4" /> Continue Learning</> : <><ShoppingCart className="w-4 h-4" /> Enroll Now — GHC {course.price}</>}
                  </button>
                  <button onClick={() => setIsWishlisted(!isWishlisted)} className={`w-full py-2.5 border rounded-xl text-sm font-semibold flex items-center justify-center gap-2 cursor-pointer transition-colors ${isWishlisted ? "border-rose-300 bg-rose-50 text-rose-600" : "border-slate-200 text-slate-600 hover:bg-slate-50"}`}>
                    <Heart className={`w-4 h-4 ${isWishlisted ? "fill-rose-500" : ""}`} />
                    {isWishlisted ? "Wishlisted" : "Add to Wishlist"}
                  </button>
                  <div className="mt-4 pt-4 border-t border-slate-100 space-y-2 text-xs text-slate-500">
                    {["30-day money-back guarantee", "Full lifetime access", "Access on all devices", "Certificate of completion"].map(f => (
                      <div key={f} className="flex items-center gap-2"><CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0" />{f}</div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── STICKY TABS ── */}
      <div className="sticky top-0 z-40 bg-white border-b border-slate-200 shadow-sm">
        <div className="max-w-[1200px] mx-auto px-6 flex items-center gap-1 overflow-x-auto">
          {TABS.map(tab => (
            <button key={tab.id} onClick={() => setActiveTab(tab.id as any)}
              className={`py-4 px-4 text-sm font-semibold border-b-2 whitespace-nowrap transition-colors cursor-pointer ${activeTab === tab.id ? "border-[#0B0F59] text-[#0B0F59]" : "border-transparent text-slate-500 hover:text-slate-800"}`}>
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* ── BODY ── */}
      <div className="max-w-[1200px] mx-auto px-6 py-10 grid grid-cols-1 lg:grid-cols-12 gap-10">
        {/* Left content */}
        <div className="lg:col-span-7 space-y-10">

          {/* OVERVIEW */}
          {activeTab === "overview" && (
            <>
              {/* What you'll learn */}
              <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
                <h2 className="text-lg font-display font-bold text-slate-900 mb-5">What you'll learn</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {course.whatYouLearn.map((item: string, i: number) => (
                    <div key={i} className="flex items-start gap-2.5">
                      <CheckCircle2 className="w-4 h-4 text-emerald-500 mt-0.5 shrink-0" />
                      <span className="text-sm text-slate-700 leading-snug">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
              {/* Description */}
              <div>
                <h2 className="text-lg font-display font-bold text-slate-900 mb-3">About this course</h2>
                <p className="text-slate-600 text-sm leading-relaxed">{course.description}</p>
              </div>
              {/* Requirements */}
              <div>
                <h2 className="text-lg font-display font-bold text-slate-900 mb-3">Requirements</h2>
                <ul className="space-y-2">
                  {course.requirements.map((req: string, i: number) => (
                    <li key={i} className="flex items-start gap-2.5 text-sm text-slate-600">
                      <div className="w-1.5 h-1.5 bg-slate-400 rounded-full mt-2 shrink-0" />{req}
                    </li>
                  ))}
                </ul>
              </div>
              {/* Tags */}
              <div>
                <h2 className="text-lg font-display font-bold text-slate-900 mb-3">Tags</h2>
                <div className="flex flex-wrap gap-2">
                  {course.tags.map((tag: string) => (
                    <span key={tag} className="px-3 py-1.5 bg-indigo-50 border border-indigo-100 text-indigo-700 text-xs font-medium rounded-full">{tag}</span>
                  ))}
                </div>
              </div>
            </>
          )}

          {/* CURRICULUM */}
          {activeTab === "curriculum" && (
            <div>
              <div className="flex items-center justify-between mb-5 flex-wrap gap-2">
                <h2 className="text-lg font-display font-bold text-slate-900">Course Curriculum</h2>
                <span className="text-xs text-slate-500">{course.sections.length} sections · {totalLessons} lectures · {course.duration} total</span>
              </div>
              <div className="space-y-2">
                {course.sections.map((section: any, si: number) => (
                  <div key={si} className="border border-slate-200 rounded-xl overflow-hidden">
                    <button onClick={() => setOpenSections(prev => ({ ...prev, [si]: !prev[si] }))}
                      className="w-full flex items-center justify-between p-4 bg-slate-50 hover:bg-slate-100 transition-colors cursor-pointer text-left">
                      <div className="flex items-center gap-3">
                        {openSections[si] ? <ChevronUp className="w-4 h-4 text-slate-500 shrink-0" /> : <ChevronDown className="w-4 h-4 text-slate-500 shrink-0" />}
                        <div>
                          <p className="font-semibold text-slate-800 text-sm">{section.title}</p>
                          <p className="text-[10px] text-slate-400 mt-0.5">{section.lectures} lectures · {section.duration}</p>
                        </div>
                      </div>
                    </button>
                    {openSections[si] && (
                      <div className="divide-y divide-slate-100">
                        {section.lessons.map((lesson: any, li: number) => (
                          <div key={li} className="flex items-center justify-between px-5 py-3 hover:bg-slate-50/50 transition-colors">
                            <div className="flex items-center gap-3 min-w-0">
                              {lesson.free ? <Play className="w-4 h-4 text-indigo-600 shrink-0" /> : <Lock className="w-3.5 h-3.5 text-slate-300 shrink-0" />}
                              <span className={`text-sm truncate ${lesson.free ? "text-indigo-600 hover:underline cursor-pointer" : "text-slate-700"}`}>{lesson.title}</span>
                              {lesson.free && <span className="text-[9px] bg-indigo-50 border border-indigo-200 text-indigo-600 px-1.5 py-0.5 rounded font-bold uppercase shrink-0">Free</span>}
                            </div>
                            <span className="text-xs text-slate-400 font-mono ml-3 shrink-0">{lesson.duration}</span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* INSTRUCTOR */}
          {activeTab === "instructor" && (
            <div>
              <h2 className="text-lg font-display font-bold text-slate-900 mb-6">Your Instructor</h2>
              <div className="flex items-start gap-5 mb-5">
                <img src={course.instructorAvatar} alt={course.instructor} className="w-20 h-20 rounded-2xl object-cover border-2 border-slate-200 shadow-sm shrink-0" />
                <div>
                  <h3 className="text-xl font-display font-bold text-slate-900">{course.instructor}</h3>
                  <p className="text-indigo-600 text-sm font-medium mb-3">{course.instructorRole}</p>
                  <div className="flex flex-wrap gap-5 text-xs text-slate-600">
                    <span className="flex items-center gap-1.5"><Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />{course.instructorRating} Instructor Rating</span>
                    <span className="flex items-center gap-1.5"><Users className="w-3.5 h-3.5 text-slate-400" />{course.instructorStudents.toLocaleString()} Students</span>
                    <span className="flex items-center gap-1.5"><BookOpen className="w-3.5 h-3.5 text-slate-400" />{course.instructorCourses} Courses</span>
                  </div>
                </div>
              </div>
              <p className="text-slate-600 text-sm leading-relaxed">{course.instructorBio}</p>
            </div>
          )}

          {/* REVIEWS */}
          {activeTab === "reviews" && (
            <div>
              <h2 className="text-lg font-display font-bold text-slate-900 mb-6">Student Reviews</h2>
              {/* Summary */}
              <div className="flex items-center gap-8 mb-8 p-5 bg-white border border-slate-200 rounded-2xl shadow-sm">
                <div className="text-center shrink-0">
                  <div className="text-5xl font-display font-bold text-slate-900 mb-1">{course.rating}</div>
                  <StarRating rating={course.rating} size="lg" />
                  <p className="text-xs text-slate-400 mt-1">Course Rating</p>
                </div>
                <div className="flex-1 space-y-2">
                  {ratingBreakdown.map(({ stars, pct }) => (
                    <div key={stars} className="flex items-center gap-3">
                      <div className="flex-1 h-2 bg-slate-100 rounded-full overflow-hidden">
                        <div className="h-full bg-amber-400 rounded-full transition-all" style={{ width: `${pct}%` }} />
                      </div>
                      <div className="flex items-center gap-1 text-xs text-slate-500 w-16 shrink-0">
                        <Star className="w-3 h-3 text-amber-400 fill-amber-400" /> {stars} ({pct}%)
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              {/* Review cards */}
              <div className="space-y-4">
                {course.reviews.map((review: any, i: number) => (
                  <div key={i} className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm">
                    <div className="flex items-start gap-4">
                      <img src={review.avatar} alt={review.name} className="w-10 h-10 rounded-full object-cover border border-slate-200 shrink-0" />
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center flex-wrap gap-2 mb-1.5">
                          <span className="font-semibold text-slate-800 text-sm">{review.name}</span>
                          <StarRating rating={review.rating} />
                          <span className="text-slate-400 text-xs ml-auto">{review.date}</span>
                        </div>
                        <p className="text-slate-600 text-sm leading-relaxed">{review.text}</p>
                        <button className="mt-3 flex items-center gap-1.5 text-xs text-slate-400 hover:text-slate-600 transition-colors cursor-pointer">
                          <ThumbsUp className="w-3.5 h-3.5" /> Helpful
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Right sidebar */}
        <div className="lg:col-span-5 hidden lg:block">
          <div className="sticky top-20 space-y-4">
            <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-lg">
              <div className="flex items-center gap-3 mb-4">
                <span className="text-2xl font-display font-bold text-slate-900">GHC {course.price}</span>
                {course.originalPrice && <span className="text-slate-400 text-sm line-through">GHC {course.originalPrice}</span>}
                {course.originalPrice && <span className="ml-auto bg-rose-100 text-rose-600 text-xs font-bold px-2 py-0.5 rounded">{Math.round((1 - course.price / course.originalPrice) * 100)}% OFF</span>}
              </div>
              <button onClick={() => setEnrolled(true)} className={`w-full py-3 font-bold rounded-xl flex items-center justify-center gap-2 text-sm cursor-pointer transition-colors mb-3 ${enrolled ? "bg-emerald-600 hover:bg-emerald-700 text-white" : "bg-[#0B0F59] hover:bg-indigo-900 text-white shadow-lg shadow-indigo-900/20"}`}>
                {enrolled ? <><Play className="w-4 h-4" /> Continue Learning</> : <><ShoppingCart className="w-4 h-4" /> Enroll Now</>}
              </button>
              <button onClick={() => setIsWishlisted(!isWishlisted)} className={`w-full py-2.5 border rounded-xl text-sm font-semibold flex items-center justify-center gap-2 cursor-pointer transition-colors mb-4 ${isWishlisted ? "border-rose-300 bg-rose-50 text-rose-600" : "border-slate-200 text-slate-600 hover:bg-slate-50"}`}>
                <Heart className={`w-4 h-4 ${isWishlisted ? "fill-rose-500" : ""}`} /> {isWishlisted ? "Wishlisted" : "Add to Wishlist"}
              </button>
              <div className="border-t border-slate-100 pt-4 space-y-2 text-xs text-slate-500">
                {["30-day money-back guarantee", "Full lifetime access", "Access on all devices", "Certificate of completion"].map(f => (
                  <div key={f} className="flex items-center gap-2"><CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0" />{f}</div>
                ))}
              </div>
              <button className="mt-4 w-full flex items-center justify-center gap-2 text-xs text-slate-400 hover:text-slate-600 cursor-pointer transition-colors">
                <Share2 className="w-3.5 h-3.5" /> Share this course
              </button>
            </div>
            <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm">
              <h3 className="font-display font-bold text-slate-800 text-sm mb-4">This course includes</h3>
              <div className="space-y-2.5 text-xs text-slate-600">
                <div className="flex items-center gap-2.5"><Clock className="w-4 h-4 text-slate-400 shrink-0" />{course.duration} on-demand video</div>
                <div className="flex items-center gap-2.5"><BookOpen className="w-4 h-4 text-slate-400 shrink-0" />{totalLessons} lessons in {course.sections.length} sections</div>
                <div className="flex items-center gap-2.5"><Globe className="w-4 h-4 text-slate-400 shrink-0" />Language: {course.language}</div>
                <div className="flex items-center gap-2.5"><Trophy className="w-4 h-4 text-amber-400 shrink-0" />Certificate upon completion</div>
                <div className="flex items-center gap-2.5"><MessageSquare className="w-4 h-4 text-slate-400 shrink-0" />Q&A community access</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile sticky enroll bar */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-slate-200 px-4 py-3 flex items-center gap-3 shadow-xl">
        <div className="flex-1">
          <span className="text-xl font-display font-bold text-slate-900">GHC {course.price}</span>
          {course.originalPrice && <span className="text-slate-400 text-xs line-through ml-2">GHC {course.originalPrice}</span>}
        </div>
        <button onClick={() => setEnrolled(true)} className="px-5 py-2.5 bg-[#0B0F59] text-white font-bold rounded-xl text-sm cursor-pointer hover:bg-indigo-900 transition-colors">
          {enrolled ? "Continue" : "Enroll Now"}
        </button>
      </div>

      <div className="pb-20 lg:pb-0">
        <PublicFooter />
      </div>
    </div>
  );
}
