import React, { useState, useRef, useEffect } from "react";
import { 
  Search, Bell, Sparkles, X, Check, HelpCircle, Award, Compass, MessageSquare,
  LayoutGrid, ChevronDown, ChevronRight, Code, Anchor, PieChart, Umbrella, 
  Heart, GraduationCap, Palette, Layout, Smartphone, Box, DollarSign, 
  TrendingUp, Layers, Megaphone, Gamepad2, Binary, Cpu, 
  MousePointerClick, Brush, Apple
} from "lucide-react";
import { Notification, Course, Mentor, Opportunity, BlogPost, UserProfile } from "../types";
import { INITIAL_COURSES, INITIAL_MENTORS, INITIAL_OPPORTUNITIES, INITIAL_BLOGS } from "../data";

interface HeaderProps {
  notifications: Notification[];
  setNotifications: React.Dispatch<React.SetStateAction<Notification[]>>;
  onViewCaseStudy: () => void;
  isCaseStudyActive: boolean;
  onExitCaseStudy: () => void;
  onNavigateToView: (view: string) => void;
  userProfile: UserProfile;
  onAddNotification?: (
    title: string,
    description: string,
    type: "message" | "alert" | "recommendation" | "application"
  ) => void;
}

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

const navLinks = [
  { label: "Home", view: "dashboard" },
  { label: "Courses", view: "courses" },
  { label: "Instructors", view: "mentorship" },
  { label: "Store", view: "mentorship" },
  { label: "Forums", view: "blogs" }
];

export default function Header({
  notifications,
  setNotifications,
  onViewCaseStudy,
  isCaseStudyActive,
  onExitCaseStudy,
  onNavigateToView,
  userProfile,
  onAddNotification
}: HeaderProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [showSearchDropdown, setShowSearchDropdown] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [isCategoriesOpen, setIsCategoriesOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState<MainCategory | null>(mainCategories[0]);

  const dropdownRef = useRef<HTMLDivElement>(null);
  const categoriesDropdownRef = useRef<HTMLDivElement>(null);

  // Close search & categories on click outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setShowSearchDropdown(false);
      }
      if (categoriesDropdownRef.current && !categoriesDropdownRef.current.contains(event.target as Node)) {
        setIsCategoriesOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const unreadCount = notifications.filter(n => !n.read).length;

  const handleMarkAllRead = () => {
    setNotifications(notifications.map(n => ({ ...n, read: true })));
  };

  const handleClearNotification = (id: string) => {
    setNotifications(notifications.filter(n => n.id !== id));
  };

  // Perform search against static data structures
  const filteredCourses = INITIAL_COURSES.filter(c => 
    c.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
    c.category.toLowerCase().includes(searchQuery.toLowerCase())
  );
  const filteredMentors = INITIAL_MENTORS.filter(m => 
    m.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    m.skills.some(s => s.toLowerCase().includes(searchQuery.toLowerCase()))
  );
  const filteredOpp = INITIAL_OPPORTUNITIES.filter(o => 
    o.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
    o.company.toLowerCase().includes(searchQuery.toLowerCase())
  );
  const filteredBlogs = INITIAL_BLOGS.filter(b => 
    b.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const hasSearchResults = searchQuery.length > 0 && (
    filteredCourses.length > 0 || 
    filteredMentors.length > 0 || 
    filteredOpp.length > 0 || 
    filteredBlogs.length > 0
  );

  const handleResultClick = (view: string) => {
    onNavigateToView(view);
    setSearchQuery("");
    setShowSearchDropdown(false);
  };

  const handleCategorySelect = (categoryName: string, subcategoryName?: string) => {
    const filterText = subcategoryName ? `${categoryName} ${subcategoryName}` : categoryName;
    setSearchQuery(filterText);
    setShowSearchDropdown(true);
    setIsCategoriesOpen(false);
    onNavigateToView("courses");
    
    if (onAddNotification) {
      onAddNotification(
        "Navigation Applied",
        `Browsing ${subcategoryName ? `${categoryName} > ${subcategoryName}` : categoryName} pathways.`,
        "recommendation"
      );
    }
  };

  return (
    <header className="h-16 bg-white border-b border-slate-200/80 px-6 flex items-center justify-between relative z-40 select-none font-sans">
      
      {/* LEFT SECTION: Categories Dropdown & Menu Links */}
      <div className="flex items-center gap-5">
        
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
            <div className="absolute top-12 left-0 w-56 bg-white border border-slate-200/90 rounded-2xl shadow-xl p-1.5 z-50 flex flex-col">
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
                      if (!hasSub) {
                        handleCategorySelect(cat.name);
                      }
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
                        onClick={() => handleCategorySelect(activeCategory.name, sub.name)}
                        className="w-full px-3 py-2 rounded-lg flex items-center gap-2.5 text-xs text-slate-600 hover:bg-slate-50 hover:text-indigo-600 transition-colors cursor-pointer font-medium"
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

        {/* Horizontal Nav Links */}
        <div className="hidden lg:flex items-center gap-5 text-xs font-semibold text-slate-500">
          {navLinks.map((link) => (
            <button
              key={link.label}
              onClick={() => onNavigateToView(link.view)}
              className="hover:text-indigo-600 transition-colors cursor-pointer py-1"
            >
              {link.label}
            </button>
          ))}
        </div>
      </div>

      {/* CENTER SECTION: Universal Search Input Container */}
      <div className="flex-1 max-w-xs xl:max-w-md mx-4 relative" ref={dropdownRef}>
        <div className="relative">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setShowSearchDropdown(true);
            }}
            onFocus={() => setShowSearchDropdown(true)}
            placeholder="Universal search (Cmd+K) - courses, mentors, jobs..."
            className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-200/80 focus:border-indigo-600 focus:bg-white focus:ring-1 focus:ring-indigo-600 rounded-xl text-xs text-slate-900 focus:outline-none placeholder:text-slate-400 transition-all"
          />
          <Search className="absolute left-3 top-2.5 w-3.5 h-3.5 text-slate-400" />
        </div>

        {/* Universal Search Results Dropdown */}
        {showSearchDropdown && searchQuery.length > 0 && (
          <div className="absolute top-12 left-0 w-[450px] bg-white border border-slate-200 rounded-2xl shadow-xl p-4 space-y-4 max-h-[400px] overflow-y-auto z-50">
            <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider block border-b border-slate-100 pb-1">Universal Search Results</span>

            {!hasSearchResults && (
              <p className="text-slate-400 text-xs text-center py-4">No matching courses, mentors, jobs, or blogs found.</p>
            )}

            {/* Courses section */}
            {filteredCourses.length > 0 && (
              <div className="space-y-1.5">
                <span className="text-[9px] font-mono text-indigo-600 block font-bold uppercase">Learning Pathways ({filteredCourses.length})</span>
                {filteredCourses.map(c => (
                  <div
                    key={c.id}
                    onClick={() => handleResultClick("courses")}
                    className="p-2 hover:bg-slate-50 rounded-lg cursor-pointer transition-colors flex justify-between items-center"
                  >
                    <span className="text-xs text-slate-700 line-clamp-1">{c.title}</span>
                    <span className="text-[10px] text-slate-400 font-mono shrink-0">{c.category}</span>
                  </div>
                ))}
              </div>
            )}

            {/* Mentors section */}
            {filteredMentors.length > 0 && (
              <div className="space-y-1.5 pt-1">
                <span className="text-[9px] font-mono text-indigo-600 block font-bold uppercase">Staff Mentors ({filteredMentors.length})</span>
                {filteredMentors.map(m => (
                  <div
                    key={m.id}
                    onClick={() => handleResultClick("mentorship")}
                    className="p-2 hover:bg-slate-50 rounded-lg cursor-pointer transition-colors flex justify-between items-center"
                  >
                    <span className="text-xs text-slate-700">{m.name}</span>
                    <span className="text-[10px] text-slate-400 font-mono shrink-0">{m.company} &bull; {m.role}</span>
                  </div>
                ))}
              </div>
            )}

            {/* Opportunities section */}
            {filteredOpp.length > 0 && (
              <div className="space-y-1.5 pt-1">
                <span className="text-[9px] font-mono text-indigo-600 block font-bold uppercase">Opportunities ({filteredOpp.length})</span>
                {filteredOpp.map(o => (
                  <div
                    key={o.id}
                    onClick={() => handleResultClick("opportunities")}
                    className="p-2 hover:bg-slate-50 rounded-lg cursor-pointer transition-colors flex justify-between items-center"
                  >
                    <span className="text-xs text-slate-700">{o.title}</span>
                    <span className="text-[10px] text-slate-400 font-mono shrink-0">{o.company}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>

      {/* RIGHT SECTION: Global quick-actions, notifications, user avatar */}
      <div className="flex items-center gap-4 shrink-0">
        
        {/* Toggle UX Design Case Study */}
        {isCaseStudyActive ? (
          <button
            onClick={onExitCaseStudy}
            className="px-3.5 py-1.5 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold rounded-xl flex items-center gap-1.5 cursor-pointer shadow-lg transition-all"
          >
            <Compass className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Resume Workspace</span>
          </button>
        ) : (
          <button
            onClick={onViewCaseStudy}
            className="px-3.5 py-1.5 bg-slate-50 hover:bg-slate-100 text-slate-700 text-xs font-semibold rounded-xl border border-slate-200/80 flex items-center gap-1.5 cursor-pointer transition-colors"
          >
            <Award className="w-3.5 h-3.5 text-indigo-600" />
            <span className="hidden md:inline">UX Case Study & System</span>
          </button>
        )}

        {/* Notifications Icon with unread Badge */}
        <div className="relative">
          <button
            onClick={() => setShowNotifications(!showNotifications)}
            className="w-8 h-8 rounded-lg hover:bg-slate-100 flex items-center justify-center text-slate-500 hover:text-slate-800 transition-colors relative cursor-pointer"
          >
            <Bell className="w-4 h-4" />
            {unreadCount > 0 && (
              <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-indigo-600" />
            )}
          </button>

          {/* Notifications List Popup Dropdown */}
          {showNotifications && (
            <div className="absolute right-0 top-11 w-80 bg-white border border-slate-200 rounded-2xl shadow-xl p-4 space-y-4 z-50">
              <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                <span className="text-xs font-semibold text-slate-800">Notifications</span>
                {unreadCount > 0 && (
                  <button
                    onClick={handleMarkAllRead}
                    className="text-[10px] text-indigo-600 hover:underline font-mono cursor-pointer"
                  >
                    Mark all read
                  </button>
                )}
              </div>

              {notifications.length === 0 ? (
                <p className="text-slate-400 text-xs text-center py-6">You are completely caught up!</p>
              ) : (
                <div className="space-y-2.5 max-h-[300px] overflow-y-auto">
                  {notifications.map((n) => (
                    <div
                      key={n.id}
                      className={`p-2.5 rounded-lg border text-xs transition-all relative ${
                        n.read ? "bg-slate-50/50 border-slate-100" : "bg-slate-50 border-slate-200"
                      }`}
                    >
                      <button
                        onClick={() => handleClearNotification(n.id)}
                        className="absolute top-2.5 right-2.5 text-slate-400 hover:text-slate-600 cursor-pointer"
                      >
                        <X className="w-3 h-3" />
                      </button>
                      <div className="flex items-center gap-2 mb-1">
                        <span className={`w-1.5 h-1.5 rounded-full ${n.read ? "bg-slate-300" : "bg-indigo-600"}`} />
                        <span className="font-semibold text-slate-800 text-[11px]">{n.title}</span>
                      </div>
                      <p className="text-slate-500 text-[10px] leading-relaxed pr-4">{n.description}</p>
                      <span className="text-slate-400 font-mono text-[8px] block mt-1.5">{n.time}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>

        {/* Interactive User Profile Badge */}
        <div className="flex items-center gap-2 pl-3 border-l border-slate-200/80">
          <img
            src={userProfile.avatar}
            alt="Profile Avatar"
            className="w-8 h-8 rounded-full object-cover border border-slate-200 shrink-0"
          />
          <div className="hidden xl:block text-left">
            <span className="text-xs font-bold text-slate-800 block leading-tight">{userProfile.fullName}</span>
            <span className="text-[9px] text-slate-400 block leading-none font-mono">Student Space</span>
          </div>
        </div>

      </div>
    </header>
  );
}
