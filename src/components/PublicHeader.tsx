import React, { useState, useRef, useEffect } from "react";
import { Search, ChevronDown, ChevronRight, LayoutGrid, Phone, Mail, Moon, ShoppingBag, Code, Smartphone, Box, Anchor, DollarSign, TrendingUp, Layers, PieChart, Megaphone, Umbrella, Gamepad2, Compass, Heart, Sparkles, Apple, GraduationCap, Binary, Cpu, Palette, MousePointerClick, Brush } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";

interface SubCategory {
  id: string;
  name: string;
  icon: React.ComponentType<any>;
}

export interface MainCategory {
  id: string;
  name: string;
  description?: string;
  icon: React.ComponentType<any>;
  subcategories?: SubCategory[];
}

export const mainCategories: MainCategory[] = [
  {
    id: "development",
    name: "Development",
    description: "Master modern programming languages, frameworks, and software engineering practices to build scalable applications.",
    icon: Code,
    subcategories: [
      { id: "web-dev", name: "Web Development", icon: LayoutGrid },
      { id: "mobile-dev", name: "Mobile Development", icon: Smartphone },
      { id: "game-dev", name: "Game Development", icon: Box },
    ]
  },
  {
    id: "business",
    name: "Business",
    description: "Develop leadership and organizational skills to effectively manage teams, projects, and business operations.",
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
    description: "Learn strategies to grow audiences, optimize conversions, and build powerful brand narratives in the digital age.",
    icon: PieChart,
    subcategories: [
      { id: "digital-marketing", name: "Digital Marketing", icon: Megaphone },
      { id: "seo", name: "SEO & Content Strategy", icon: Search },
    ]
  },
  {
    id: "lifestyle",
    name: "Lifestyle",
    description: "Explore diverse interests from personal development and productivity to travel, hobbies, and creative pursuits.",
    icon: Umbrella,
    subcategories: [
      { id: "gaming", name: "Gaming & Esports", icon: Gamepad2 },
      { id: "travel", name: "Travel & Leisure", icon: Compass },
    ]
  },
  {
    id: "health-fitness",
    name: "Health & Fitness",
    description: "Discover comprehensive approaches to physical wellness, mental health, nutrition, and holistic well-being.",
    icon: Heart,
    subcategories: [
      { id: "yoga", name: "Yoga & Mindfulness", icon: Sparkles },
      { id: "nutrition", name: "Nutrition & Dietetics", icon: Apple },
    ]
  },
  {
    id: "academics",
    name: "Academics",
    description: "Master foundational and advanced concepts in mathematics, sciences, humanities, and academic research.",
    icon: GraduationCap,
    subcategories: [
      { id: "math", name: "Mathematics & Logic", icon: Binary },
      { id: "science", name: "Science & Technology", icon: Cpu },
    ]
  },
  {
    id: "design",
    name: "Design",
    description: "Develop your creative potential with courses in user experience, graphic design, and visual communication.",
    icon: Palette,
    subcategories: [
      { id: "ui-ux", name: "UI/UX Design", icon: MousePointerClick },
      { id: "graphic", name: "Graphic Design", icon: Brush },
    ]
  }
];

export default function PublicHeader() {
  const navigate = useNavigate();
  const location = useLocation();
  const [isCategoriesOpen, setIsCategoriesOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState<MainCategory | null>(mainCategories[0]);
  const categoriesDropdownRef = useRef<HTMLDivElement>(null);

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

  return (
    <div className="w-full font-sans relative z-50">
      {/* Top Bar (Dark Blue) */}
      <div className="bg-[#0B0F59] text-white text-[10px] sm:text-xs">
        <div className="max-w-[1400px] mx-auto px-6 h-10 flex items-center justify-between">
          
          {/* Left: Contact Info */}
          <div className="flex items-center gap-6 text-indigo-100">
            <div className="flex items-center gap-2 cursor-pointer hover:text-white transition-colors">
              <Phone className="w-3.5 h-3.5" />
              <span>+233 26 107 2492</span>
            </div>
            <div className="flex items-center gap-2 cursor-pointer hover:text-white transition-colors">
              <Mail className="w-3.5 h-3.5" />
              <span>info@corelify.io</span>
            </div>
            <button className="cursor-pointer hover:text-white transition-colors ml-2">
              <Moon className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Right: Actions */}
          <div className="flex items-center gap-6">
            {/* Search */}
            <div className="relative hidden md:block">
              <input 
                type="text" 
                placeholder="Search..." 
                className="bg-[#151978] border border-indigo-800 rounded text-white text-[10px] pl-3 pr-8 py-1.5 focus:outline-none focus:ring-1 focus:ring-indigo-400 placeholder:text-indigo-300 w-48"
              />
              <Search className="absolute right-2.5 top-1.5 w-3.5 h-3.5 text-indigo-300" />
            </div>

            {/* Language */}
            <div className="flex items-center gap-1.5 cursor-pointer hover:text-indigo-100">
              <span className="text-[14px]">🇺🇸</span>
              <span>English</span>
              <ChevronDown className="w-3 h-3 text-indigo-300" />
            </div>

            {/* Cart */}
            <button className="cursor-pointer hover:text-indigo-100">
              <ShoppingBag className="w-4 h-4" />
            </button>

            {/* Auth */}
            <div className="flex items-center gap-4 font-semibold text-indigo-100 ml-2">
              <button onClick={() => navigate("/student/login")} className="hover:text-white transition-colors cursor-pointer">Login</button>
              <button onClick={() => navigate("/student/register")} className="hover:text-white transition-colors cursor-pointer">Register</button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Nav (White) */}
      <div className="bg-white border-b border-slate-200">
        <div className="max-w-[1400px] mx-auto px-6 h-16 flex items-center justify-between">
          
          <div className="flex items-center gap-8">
            {/* Logo */}
            <img 
              src="https://corelify.io/store/1/CORELIFY%20LOGO.png" 
              alt="Corelify Logo" 
              className="h-7 w-auto cursor-pointer" 
              onClick={() => navigate("/")}
            />

            {/* Categories */}
            <div className="relative" ref={categoriesDropdownRef}>
              <button
                onClick={() => {
                  setIsCategoriesOpen(!isCategoriesOpen);
                  if (!isCategoriesOpen && mainCategories.length > 0) {
                    setActiveCategory(mainCategories[0]);
                  }
                }}
                className={`px-3 py-1.5 rounded-xl border text-xs font-semibold flex items-center gap-1.5 cursor-pointer transition-all ${
                  isCategoriesOpen
                    ? "bg-indigo-50 border-indigo-200 text-indigo-700"
                    : "bg-slate-50 border-slate-200 hover:bg-slate-100 text-slate-700"
                }`}
              >
                <LayoutGrid className="w-3.5 h-3.5 text-slate-500" />
                <span>Categories</span>
              </button>

              {/* Categories Dropdown */}
              {isCategoriesOpen && (
                <div className="absolute top-12 left-0 w-56 bg-white border border-slate-200/90 rounded-2xl shadow-xl p-1.5 flex flex-col select-none z-50">
                  {mainCategories.map((cat) => {
                    const CatIcon = cat.icon;
                    const hasSub = cat.subcategories && cat.subcategories.length > 0;
                    const isHovered = activeCategory?.id === cat.id;

                    return (
                      <div
                        key={cat.id}
                        onMouseEnter={() => {
                          if (hasSub) setActiveCategory(cat);
                          else setActiveCategory(null);
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
                </div>
              )}

              {/* Subcategories Panel */}
              {isCategoriesOpen && activeCategory?.subcategories && (
                <div className="absolute top-12 left-[230px] w-64 bg-white border border-slate-200/90 rounded-2xl shadow-xl p-4 flex flex-col select-none z-50 animate-fade-in">
                  <span className="text-[9px] font-bold tracking-widest uppercase text-indigo-600 mb-3">{activeCategory.name} Subcategories</span>
                  <div className="space-y-1">
                    {activeCategory.subcategories.map((sub) => {
                      const SubIcon = sub.icon;
                      return (
                        <div
                          key={sub.id}
                          onClick={(e) => { e.stopPropagation(); handleCategorySelect(activeCategory.id, sub.id); }}
                          className="w-full px-3 py-2 rounded-xl flex items-center gap-3 text-xs font-medium text-slate-600 hover:bg-indigo-50 hover:text-indigo-700 transition-colors cursor-pointer"
                        >
                          <SubIcon className="w-4 h-4 text-slate-400" />
                          <span>{sub.name}</span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>

            {/* Nav Links */}
            <nav className="hidden lg:flex items-center gap-8 text-xs font-semibold text-slate-600">
              <span onClick={() => navigate("/")} className={`hover:text-indigo-600 transition-colors py-5 cursor-pointer ${location.pathname === '/' ? 'text-indigo-900 border-b-2 border-indigo-900' : ''}`}>Home</span>
              <span onClick={() => navigate("/courses")} className={`hover:text-indigo-600 transition-colors py-5 cursor-pointer ${location.pathname === '/courses' ? 'text-indigo-900 border-b-2 border-indigo-900' : ''}`}>Courses</span>
              <span onClick={() => navigate("/instructors")} className={`hover:text-indigo-600 transition-colors py-5 cursor-pointer ${location.pathname === '/instructors' ? 'text-indigo-900 border-b-2 border-indigo-900' : ''}`}>Instructors</span>
              <span onClick={() => navigate("/store")} className={`hover:text-indigo-600 transition-colors py-5 cursor-pointer ${location.pathname === '/store' ? 'text-indigo-900 border-b-2 border-indigo-900' : ''}`}>Store</span>
              <span onClick={() => navigate("/forums")} className={`hover:text-indigo-600 transition-colors py-5 cursor-pointer ${location.pathname === '/forums' ? 'text-indigo-900 border-b-2 border-indigo-900' : ''}`}>Forums</span>
              <span onClick={() => navigate("/blogs")} className={`hover:text-indigo-600 transition-colors py-5 cursor-pointer ${location.pathname === '/blogs' ? 'text-indigo-900 border-b-2 border-indigo-900' : ''}`}>Blogs</span>
            </nav>
          </div>

          {/* CTA */}
          <button 
            onClick={() => navigate("/student/login")}
            className="px-6 py-2 bg-[#0B0F59] hover:bg-indigo-900 text-white rounded-lg text-xs font-semibold transition-colors cursor-pointer"
          >
            Start Learning
          </button>
        </div>
      </div>
    </div>
  );
}
