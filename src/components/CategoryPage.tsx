import React, { useState, useMemo } from "react";
import {
  ChevronDown, ChevronUp, Clock, LayoutGrid, List, Star, Play,
  ArrowLeft, ChevronRight, SlidersHorizontal, X, BookOpen, Users, Award
} from "lucide-react";
import { useNavigate, useParams, Link } from "react-router-dom";
import { INITIAL_COURSES } from "../data";
import PublicHeader, { mainCategories, MainCategory } from "./PublicHeader";
import PublicFooter from "./PublicFooter";

// Extended course data per subcategory for richer demo
const SUBCATEGORY_COURSES: Record<string, Array<{
  id: string; title: string; instructor: string; instructorRole: string;
  rating: number; reviewCount: number; price: number; originalPrice?: number;
  duration: string; image: string; level: string; enrolled?: number; discount?: boolean;
}>> = {
  "web-dev": [
    { id: "wdev-1", title: "Complete React & Next.js Developer Bootcamp", instructor: "Sarah Jenkins", instructorRole: "Next.js Core Team", rating: 4.9, reviewCount: 512, price: 89, originalPrice: 149, duration: "42h 30m", image: "https://picsum.photos/seed/webdev1/800/450", level: "Intermediate", enrolled: 8430, discount: true },
    { id: "wdev-2", title: "Advanced CSS & Modern Animations", instructor: "Mark Chen", instructorRole: "CSS Expert at Google", rating: 4.8, reviewCount: 310, price: 59, duration: "18h 15m", image: "https://picsum.photos/seed/webdev2/800/450", level: "Intermediate", enrolled: 5120 },
    { id: "wdev-3", title: "TypeScript Mastery: From Beginner to Pro", instructor: "Ana Rodrigues", instructorRole: "TypeScript Advocate", rating: 4.7, reviewCount: 288, price: 45, originalPrice: 90, duration: "24h 00m", image: "https://picsum.photos/seed/webdev3/800/450", level: "Beginner", enrolled: 6780, discount: true },
    { id: "wdev-4", title: "Full-Stack Web Apps with Node.js & GraphQL", instructor: "James Wright", instructorRole: "Senior Engineer, Shopify", rating: 4.8, reviewCount: 198, price: 75, duration: "30h 45m", image: "https://picsum.photos/seed/webdev4/800/450", level: "Advanced", enrolled: 3400 },
  ],
  "mobile-dev": [
    { id: "mob-1", title: "React Native: Build iOS & Android Apps", instructor: "Priya Nair", instructorRole: "Mobile Lead at Meta", rating: 4.9, reviewCount: 422, price: 79, originalPrice: 130, duration: "36h 00m", image: "https://picsum.photos/seed/mobile1/800/450", level: "Intermediate", enrolled: 7200, discount: true },
    { id: "mob-2", title: "Flutter & Dart for Beginners", instructor: "Luca Bianchi", instructorRole: "Flutter GDE", rating: 4.7, reviewCount: 275, price: 55, duration: "28h 30m", image: "https://picsum.photos/seed/mobile2/800/450", level: "Beginner", enrolled: 4800 },
    { id: "mob-3", title: "Native iOS Development with Swift", instructor: "Emily Hart", instructorRole: "iOS Engineer, Apple", rating: 4.8, reviewCount: 350, price: 95, duration: "44h 00m", image: "https://picsum.photos/seed/mobile3/800/450", level: "Advanced", enrolled: 5600 },
    { id: "mob-4", title: "Android Development with Kotlin", instructor: "Noah Kim", instructorRole: "Senior Android Dev", rating: 4.6, reviewCount: 195, price: 65, originalPrice: 110, duration: "32h 15m", image: "https://picsum.photos/seed/mobile4/800/450", level: "Intermediate", enrolled: 3900, discount: true },
  ],
  "game-dev": [
    { id: "game-1", title: "Unity Game Development Complete Course", instructor: "Chris Morgan", instructorRole: "Unity Certified Expert", rating: 4.9, reviewCount: 640, price: 85, originalPrice: 160, duration: "50h 00m", image: "https://picsum.photos/seed/game1/800/450", level: "Beginner", enrolled: 12400, discount: true },
    { id: "game-2", title: "Unreal Engine 5: AAA Game Creation", instructor: "Sam Fischer", instructorRole: "Ex-Epic Games", rating: 4.8, reviewCount: 320, price: 99, duration: "38h 30m", image: "https://picsum.photos/seed/game2/800/450", level: "Advanced", enrolled: 6700 },
    { id: "game-3", title: "2D Game Design with Godot 4", instructor: "Maria Santos", instructorRole: "Indie Developer", rating: 4.7, reviewCount: 210, price: 40, duration: "22h 00m", image: "https://picsum.photos/seed/game3/800/450", level: "Beginner", enrolled: 5800 },
  ],
  "finance": [
    { id: "fin-1", title: "Financial Modeling & Valuation (DCF, LBO)", instructor: "David Park", instructorRole: "CFA, Goldman Sachs Alum", rating: 4.9, reviewCount: 480, price: 99, originalPrice: 180, duration: "28h 45m", image: "https://picsum.photos/seed/fin1/800/450", level: "Advanced", enrolled: 9200, discount: true },
    { id: "fin-2", title: "Personal Finance & Investment Essentials", instructor: "Rachel Moore", instructorRole: "CFP Certified Planner", rating: 4.8, reviewCount: 390, price: 49, duration: "16h 00m", image: "https://picsum.photos/seed/fin2/800/450", level: "Beginner", enrolled: 14500 },
    { id: "fin-3", title: "Crypto & DeFi Investment Strategies", instructor: "Tom Nakamura", instructorRole: "Blockchain Analyst", rating: 4.6, reviewCount: 222, price: 69, originalPrice: 120, duration: "20h 30m", image: "https://picsum.photos/seed/fin3/800/450", level: "Intermediate", enrolled: 7800, discount: true },
  ],
  "strategy": [
    { id: "str-1", title: "Business Strategy: From Vision to Execution", instructor: "Laura Kim", instructorRole: "McKinsey Consultant", rating: 4.9, reviewCount: 354, price: 89, originalPrice: 150, duration: "22h 00m", image: "https://picsum.photos/seed/str1/800/450", level: "Intermediate", enrolled: 6600, discount: true },
    { id: "str-2", title: "Competitive Analysis & Market Positioning", instructor: "Robert Clarke", instructorRole: "Strategy Director, BCG", rating: 4.7, reviewCount: 218, price: 69, duration: "18h 15m", image: "https://picsum.photos/seed/str2/800/450", level: "Advanced", enrolled: 4200 },
  ],
  "digital-marketing": [
    { id: "dm-1", title: "Complete Digital Marketing Masterclass", instructor: "Sophie Turner", instructorRole: "CMO, Growth Agency", rating: 4.9, reviewCount: 720, price: 79, originalPrice: 149, duration: "40h 30m", image: "https://picsum.photos/seed/dm1/800/450", level: "Beginner", enrolled: 18200, discount: true },
    { id: "dm-2", title: "Meta & Google Ads: Performance Marketing", instructor: "Jake Williams", instructorRole: "Paid Media Specialist", rating: 4.8, reviewCount: 440, price: 59, duration: "24h 00m", image: "https://picsum.photos/seed/dm2/800/450", level: "Intermediate", enrolled: 9800 },
    { id: "dm-3", title: "Email Marketing Automation with HubSpot", instructor: "Nina Patel", instructorRole: "HubSpot Partner", rating: 4.7, reviewCount: 290, price: 45, originalPrice: 85, duration: "14h 30m", image: "https://picsum.photos/seed/dm3/800/450", level: "Beginner", enrolled: 7600, discount: true },
  ],
  "seo": [
    { id: "seo-1", title: "SEO Mastery: Rank #1 on Google in 2025", instructor: "Brian Dean", instructorRole: "Founder, Backlinko", rating: 4.9, reviewCount: 880, price: 85, originalPrice: 160, duration: "32h 00m", image: "https://picsum.photos/seed/seo1/800/450", level: "Intermediate", enrolled: 22000, discount: true },
    { id: "seo-2", title: "Content Strategy & Editorial Planning", instructor: "Amy Foster", instructorRole: "Content Lead, HubSpot", rating: 4.8, reviewCount: 340, price: 55, duration: "20h 15m", image: "https://picsum.photos/seed/seo2/800/450", level: "Beginner", enrolled: 10400 },
  ],
  "ui-ux": [
    { id: "uiux-1", title: "Product Design Strategy & Systems", instructor: "Adrian Thompson", instructorRole: "Ex-Figma Designer", rating: 4.9, reviewCount: 342, price: 95, originalPrice: 180, duration: "18h 45m", image: "https://picsum.photos/seed/msq1rw8/800/450", level: "Intermediate", enrolled: 7400, discount: true },
    { id: "uiux-2", title: "Figma Advanced: Auto Layout & Variables", instructor: "Lisa Wong", instructorRole: "Figma Ambassador", rating: 4.8, reviewCount: 510, price: 65, duration: "14h 00m", image: "https://picsum.photos/seed/uiux2/800/450", level: "Advanced", enrolled: 9100 },
    { id: "uiux-3", title: "UX Research & User Testing Methods", instructor: "Carlos Reyes", instructorRole: "UX Lead, Microsoft", rating: 4.7, reviewCount: 220, price: 55, duration: "16h 30m", image: "https://picsum.photos/seed/uiux3/800/450", level: "Beginner", enrolled: 5600 },
    { id: "uiux-4", title: "Motion Design & Micro-Interactions", instructor: "Zoe Baker", instructorRole: "Senior Animator, Stripe", rating: 4.8, reviewCount: 188, price: 75, originalPrice: 130, duration: "12h 00m", image: "https://picsum.photos/seed/uiux4/800/450", level: "Intermediate", enrolled: 4300, discount: true },
  ],
  "graphic": [
    { id: "gfx-1", title: "Adobe Illustrator Masterclass", instructor: "Marco Falchi", instructorRole: "Creative Director", rating: 4.8, reviewCount: 410, price: 69, originalPrice: 120, duration: "26h 00m", image: "https://picsum.photos/seed/gfx1/800/450", level: "Beginner", enrolled: 11200, discount: true },
    { id: "gfx-2", title: "Brand Identity Design from Scratch", instructor: "Hannah Lee", instructorRole: "Brand Designer, Dribbble", rating: 4.9, reviewCount: 290, price: 79, duration: "18h 30m", image: "https://picsum.photos/seed/gfx2/800/450", level: "Intermediate", enrolled: 6800 },
  ],
  "yoga": [
    { id: "yoga-1", title: "Yoga for Beginners: Mind, Body & Breath", instructor: "Ananya Sharma", instructorRole: "RYT-500 Certified Yogi", rating: 4.9, reviewCount: 620, price: 39, duration: "14h 00m", image: "https://picsum.photos/seed/yoga1/800/450", level: "Beginner", enrolled: 16800 },
    { id: "yoga-2", title: "Advanced Vinyasa & Meditation Practices", instructor: "Kiran Patel", instructorRole: "Senior Yoga Instructor", rating: 4.8, reviewCount: 280, price: 55, originalPrice: 90, duration: "20h 30m", image: "https://picsum.photos/seed/yoga2/800/450", level: "Advanced", enrolled: 7200, discount: true },
  ],
  "nutrition": [
    { id: "nut-1", title: "Sports Nutrition & Performance Fueling", instructor: "Dr. Kevin Walsh", instructorRole: "Registered Dietitian", rating: 4.9, reviewCount: 340, price: 65, duration: "18h 00m", image: "https://picsum.photos/seed/nut1/800/450", level: "Intermediate", enrolled: 9400 },
    { id: "nut-2", title: "Plant-Based Nutrition & Meal Planning", instructor: "Claire Banks", instructorRole: "Certified Nutritionist", rating: 4.7, reviewCount: 220, price: 45, originalPrice: 80, duration: "12h 30m", image: "https://picsum.photos/seed/nut2/800/450", level: "Beginner", enrolled: 12100, discount: true },
  ],
  "math": [
    { id: "math-1", title: "Calculus 1-3: Complete University Course", instructor: "Prof. Alan Grant", instructorRole: "MIT Mathematics", rating: 4.9, reviewCount: 890, price: 49, originalPrice: 99, duration: "60h 00m", image: "https://picsum.photos/seed/math1/800/450", level: "Beginner", enrolled: 24500, discount: true },
    { id: "math-2", title: "Linear Algebra for Machine Learning", instructor: "Dr. Sasha Petrov", instructorRole: "Stanford AI Lab", rating: 4.8, reviewCount: 440, price: 55, duration: "28h 30m", image: "https://picsum.photos/seed/math2/800/450", level: "Intermediate", enrolled: 13800 },
  ],
  "science": [
    { id: "sci-1", title: "Quantum Computing: Theory to Practice", instructor: "Dr. Maya Chen", instructorRole: "IBM Quantum Research", rating: 4.9, reviewCount: 310, price: 99, originalPrice: 199, duration: "40h 00m", image: "https://picsum.photos/seed/sci1/800/450", level: "Advanced", enrolled: 5600, discount: true },
    { id: "sci-2", title: "Data Science & Machine Learning Bootcamp", instructor: "Roberto Silva", instructorRole: "Senior DS at Google", rating: 4.8, reviewCount: 1200, price: 79, duration: "52h 30m", image: "https://picsum.photos/seed/sci2/800/450", level: "Intermediate", enrolled: 34000 },
  ],
  "gaming": [
    { id: "gam-1", title: "Competitive Gaming: Strategy & Mindset", instructor: "Alex 'Apex' Kim", instructorRole: "Pro Esports Coach", rating: 4.8, reviewCount: 380, price: 35, duration: "12h 00m", image: "https://picsum.photos/seed/gam1/800/450", level: "Intermediate", enrolled: 18900 },
    { id: "gam-2", title: "Streaming & Content Creation for Gamers", instructor: "Jade Morrison", instructorRole: "Top Twitch Streamer", rating: 4.7, reviewCount: 290, price: 45, originalPrice: 75, duration: "16h 30m", image: "https://picsum.photos/seed/gam2/800/450", level: "Beginner", enrolled: 14200, discount: true },
  ],
  "travel": [
    { id: "trav-1", title: "Travel Photography & Storytelling Masterclass", instructor: "Jordan Blake", instructorRole: "National Geographic Contributor", rating: 4.9, reviewCount: 440, price: 55, duration: "20h 00m", image: "https://picsum.photos/seed/trav1/800/450", level: "Intermediate", enrolled: 11600 },
    { id: "trav-2", title: "Budget Travel: See the World for Less", instructor: "Mia Torres", instructorRole: "Full-Time Traveler & Author", rating: 4.8, reviewCount: 320, price: 29, originalPrice: 59, duration: "10h 00m", image: "https://picsum.photos/seed/trav2/800/450", level: "Beginner", enrolled: 22800, discount: true },
  ],
  "product-mgmt": [
    { id: "pm-1", title: "AI Product Management & Agentic AI", instructor: "Dr. Ryan Vance", instructorRole: "AI Architect", rating: 4.9, reviewCount: 201, price: 99, originalPrice: 180, duration: "14h 30m", image: "https://picsum.photos/seed/z1c92ca/800/450", level: "Intermediate", enrolled: 7600, discount: true },
    { id: "pm-2", title: "Product Analytics: Data-Driven Decisions", instructor: "Emma Wilson", instructorRole: "PM at Airbnb", rating: 4.8, reviewCount: 330, price: 79, duration: "20h 00m", image: "https://picsum.photos/seed/pm2/800/450", level: "Advanced", enrolled: 9200 },
  ],
};

// Hero images per category
const CATEGORY_HERO_IMAGES: Record<string, string> = {
  "development": "https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?auto=format&fit=crop&w=1600&q=80",
  "web-dev": "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&w=1600&q=80",
  "mobile-dev": "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&w=1600&q=80",
  "game-dev": "https://images.unsplash.com/photo-1511512578047-dfb367046420?auto=format&fit=crop&w=1600&q=80",
  "business": "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1600&q=80",
  "finance": "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?auto=format&fit=crop&w=1600&q=80",
  "strategy": "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=1600&q=80",
  "product-mgmt": "https://images.unsplash.com/photo-1531403009284-440f080d1e12?auto=format&fit=crop&w=1600&q=80",
  "marketing": "https://images.unsplash.com/photo-1533750516457-a7f992034fec?auto=format&fit=crop&w=1600&q=80",
  "digital-marketing": "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1600&q=80",
  "seo": "https://images.unsplash.com/photo-1432888498266-38ffec3eaf0a?auto=format&fit=crop&w=1600&q=80",
  "lifestyle": "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=1600&q=80",
  "gaming": "https://images.unsplash.com/photo-1493711662062-fa541adb3fc8?auto=format&fit=crop&w=1600&q=80",
  "travel": "https://images.unsplash.com/photo-1488646953014-85cb44e25828?auto=format&fit=crop&w=1600&q=80",
  "health-fitness": "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?auto=format&fit=crop&w=1600&q=80",
  "yoga": "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&w=1600&q=80",
  "nutrition": "https://images.unsplash.com/photo-1490645935967-10de6ba17061?auto=format&fit=crop&w=1600&q=80",
  "academics": "https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?auto=format&fit=crop&w=1600&q=80",
  "math": "https://images.unsplash.com/photo-1509228627152-72ae9ae6848d?auto=format&fit=crop&w=1600&q=80",
  "science": "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=1600&q=80",
  "design": "https://images.unsplash.com/photo-1558655146-9f40138edfeb?auto=format&fit=crop&w=1600&q=80",
  "ui-ux": "https://images.unsplash.com/photo-1561070791-2526d30994b5?auto=format&fit=crop&w=1600&q=80",
  "graphic": "https://images.unsplash.com/photo-1609921212029-bb5a28e60960?auto=format&fit=crop&w=1600&q=80",
};

// 3D icon images for hero card
const CATEGORY_ICONS: Record<string, string> = {
  "development": "https://picsum.photos/seed/devicon/300/300",
  "web-dev": "https://picsum.photos/seed/webicon/300/300",
  "mobile-dev": "https://picsum.photos/seed/mobileicon/300/300",
  "game-dev": "https://picsum.photos/seed/gameicon/300/300",
  "business": "https://picsum.photos/seed/briefcase/300/300",
  "finance": "https://picsum.photos/seed/finicon/300/300",
  "strategy": "https://picsum.photos/seed/straticon/300/300",
  "product-mgmt": "https://picsum.photos/seed/pmicon/300/300",
  "marketing": "https://picsum.photos/seed/mkticon/300/300",
  "digital-marketing": "https://picsum.photos/seed/dmicon/300/300",
  "seo": "https://picsum.photos/seed/seoicon/300/300",
  "lifestyle": "https://picsum.photos/seed/lifeicon/300/300",
  "gaming": "https://picsum.photos/seed/gamingicon/300/300",
  "travel": "https://picsum.photos/seed/travelicon/300/300",
  "health-fitness": "https://picsum.photos/seed/healthicon/300/300",
  "yoga": "https://picsum.photos/seed/yogaicon/300/300",
  "nutrition": "https://picsum.photos/seed/nutriicon/300/300",
  "academics": "https://picsum.photos/seed/acadicon/300/300",
  "math": "https://picsum.photos/seed/mathicon/300/300",
  "science": "https://picsum.photos/seed/sciicon/300/300",
  "design": "https://picsum.photos/seed/designicon/300/300",
  "ui-ux": "https://picsum.photos/seed/uiuxicon/300/300",
  "graphic": "https://picsum.photos/seed/gfxicon/300/300",
};

type FilterState = {
  upcoming: boolean;
  free: boolean;
  discount: boolean;
  downloadable: boolean;
};

type AccordionState = Record<string, boolean>;

export default function CategoryPage() {
  const navigate = useNavigate();
  const { categoryId, subCategoryId } = useParams<{ categoryId: string; subCategoryId?: string }>();

  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [activeFilters, setActiveFilters] = useState<FilterState>({
    upcoming: false,
    free: false,
    discount: false,
    downloadable: false,
  });
  const [selectedLevels, setSelectedLevels] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState("most-popular");
  const [expandedAccordions, setExpandedAccordions] = useState<AccordionState>({
    type: true, level: true, language: false, topic: false, price: true, instructor: false, rating: true
  });
  const [selectedRating, setSelectedRating] = useState<number | null>(null);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 200]);

  const toggleAccordion = (key: string) =>
    setExpandedAccordions(prev => ({ ...prev, [key]: !prev[key] }));

  const toggleLevel = (level: string) =>
    setSelectedLevels(prev => prev.includes(level) ? prev.filter(l => l !== level) : [...prev, level]);

  // Resolve parent category and subcategory info
  const parentCategory = mainCategories.find(c => c.id === categoryId);
  const currentSubCategory = parentCategory?.subcategories?.find(s => s.id === subCategoryId);

  // Build page identity
  const pageTitle = currentSubCategory?.name || parentCategory?.name || "Courses";
  const pageDescription = currentSubCategory
    ? parentCategory?.description || ""
    : parentCategory?.description || "Explore our comprehensive courses designed to accelerate your learning and career growth.";
  const heroImageKey = subCategoryId || categoryId || "development";
  const heroImage = CATEGORY_HERO_IMAGES[heroImageKey] || CATEGORY_HERO_IMAGES["development"];
  const heroIcon = CATEGORY_ICONS[heroImageKey] || CATEGORY_ICONS["development"];

  // Build courses list
  const rawCourses = useMemo(() => {
    if (subCategoryId && SUBCATEGORY_COURSES[subCategoryId]) {
      return SUBCATEGORY_COURSES[subCategoryId];
    }
    // fallback: aggregate subcategories of the parent
    if (parentCategory?.subcategories) {
      return parentCategory.subcategories.flatMap(s => SUBCATEGORY_COURSES[s.id] || []);
    }
    return INITIAL_COURSES.map(c => ({
      id: c.id, title: c.title, instructor: c.instructor,
      instructorRole: "Instructor", rating: c.rating, reviewCount: c.reviewCount,
      price: 49, duration: c.duration, image: c.image, level: c.level, enrolled: 1000,
    }));
  }, [categoryId, subCategoryId, parentCategory]);

  // Apply filters & sort
  const filteredCourses = useMemo(() => {
    let list = [...rawCourses];
    if (activeFilters.free) list = list.filter(c => c.price === 0);
    if (activeFilters.discount) list = list.filter(c => (c as any).discount);
    if (selectedLevels.length > 0) list = list.filter(c => selectedLevels.includes(c.level));
    if (selectedRating !== null) list = list.filter(c => c.rating >= selectedRating);
    list = list.filter(c => c.price >= priceRange[0] && c.price <= priceRange[1]);
    if (sortBy === "highest-rated") list.sort((a, b) => b.rating - a.rating);
    else if (sortBy === "newest") list.sort((a, b) => a.id.localeCompare(b.id));
    else list.sort((a, b) => (b.enrolled || 0) - (a.enrolled || 0));
    return list;
  }, [rawCourses, activeFilters, selectedLevels, selectedRating, priceRange, sortBy]);

  const totalStudents = rawCourses.reduce((s, c) => s + (c.enrolled || 0), 0);
  const avgRating = rawCourses.length
    ? (rawCourses.reduce((s, c) => s + c.rating, 0) / rawCourses.length).toFixed(1)
    : "4.8";

  return (
    <div className="bg-[#F8FAFC] text-slate-800 min-h-screen relative overflow-x-hidden font-sans flex flex-col">
      <PublicHeader />

      <main className="flex-1 w-full relative">

        {/* ── HERO SECTION ── */}
        <div className="w-full relative h-[300px] bg-[#0B0F59] overflow-hidden">
          <div
            className="absolute inset-0 opacity-25"
            style={{
              backgroundImage: `url('${heroImage}')`,
              backgroundSize: "cover", backgroundPosition: "center",
              filter: "blur(2px)",
            }}
          />
          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#0B0F59]/90 via-[#0B0F59]/60 to-transparent" />

          <div className="max-w-[1200px] mx-auto h-full relative z-10 flex items-end px-6 pb-12">
            {/* Floating white card */}
            <div className="bg-white rounded-3xl p-6 md:p-8 shadow-2xl flex items-center justify-between w-full max-w-[860px] -mb-20 relative z-20 border border-slate-100/80">
              <div className="space-y-3 max-w-lg flex-1">

                {/* Breadcrumb */}
                <nav className="flex items-center gap-1.5 text-[10px] font-medium text-slate-400">
                  <button
                    onClick={() => navigate("/")}
                    className="hover:text-indigo-600 transition-colors cursor-pointer"
                  >Corelify Edu Systems</button>
                  <ChevronRight className="w-3 h-3" />
                  {subCategoryId ? (
                    <>
                      <button
                        onClick={() => navigate(`/category/${categoryId}`)}
                        className="hover:text-indigo-600 transition-colors cursor-pointer"
                      >{parentCategory?.name}</button>
                      <ChevronRight className="w-3 h-3" />
                      <span className="text-slate-700 font-semibold">{currentSubCategory?.name}</span>
                    </>
                  ) : (
                    <span className="text-slate-700 font-semibold">{parentCategory?.name}</span>
                  )}
                </nav>

                {/* Icon + Title */}
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-indigo-50 rounded-xl flex items-center justify-center border border-indigo-100 shrink-0">
                    <Play className="w-5 h-5 text-indigo-600 fill-indigo-600" />
                  </div>
                  <h1 className="text-2xl md:text-3xl font-display font-bold text-slate-900 leading-tight">
                    {pageTitle}
                  </h1>
                </div>

                <p className="text-[11px] text-slate-500 leading-relaxed line-clamp-2">{pageDescription}</p>

                {/* Stats row */}
                <div className="flex items-center gap-5 pt-1">
                  <div className="flex items-center gap-1.5 text-[10px] text-slate-600">
                    <BookOpen className="w-3.5 h-3.5 text-indigo-500" />
                    <span className="font-semibold">{rawCourses.length}</span> Courses
                  </div>
                  <div className="flex items-center gap-1.5 text-[10px] text-slate-600">
                    <Users className="w-3.5 h-3.5 text-indigo-500" />
                    <span className="font-semibold">{(totalStudents / 1000).toFixed(1)}k</span> Students
                  </div>
                  <div className="flex items-center gap-1.5 text-[10px] text-slate-600">
                    <Award className="w-3.5 h-3.5 text-amber-500" />
                    <span className="font-semibold">{avgRating}</span> Avg Rating
                  </div>
                </div>
              </div>

              {/* Hero icon image */}
              <div className="hidden md:block pr-4 shrink-0">
                <img
                  src={heroIcon}
                  alt={pageTitle}
                  className="w-40 h-40 object-cover rounded-2xl shadow-inner border border-slate-100 mix-blend-multiply"
                />
              </div>
            </div>
          </div>
        </div>

        {/* ── MAIN CONTENT AREA ── */}
        <div className="max-w-[1200px] mx-auto px-6 pt-28 pb-16">

          {/* Subcategory chips (only show when on parent category) */}
          {!subCategoryId && parentCategory?.subcategories && parentCategory.subcategories.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-6">
              <button
                onClick={() => navigate(`/category/${categoryId}`)}
                className="px-3 py-1.5 bg-[#0B0F59] text-white rounded-lg text-[11px] font-semibold"
              >All {parentCategory.name}</button>
              {parentCategory.subcategories.map(sub => {
                const SubIcon = sub.icon;
                return (
                  <button
                    key={sub.id}
                    onClick={() => navigate(`/category/${categoryId}/${sub.id}`)}
                    className="px-3 py-1.5 bg-white border border-slate-200 hover:border-indigo-300 hover:bg-indigo-50 hover:text-indigo-700 text-slate-600 rounded-lg text-[11px] font-semibold transition-all flex items-center gap-1.5 cursor-pointer"
                  >
                    <SubIcon className="w-3.5 h-3.5" />
                    {sub.name}
                  </button>
                );
              })}
            </div>
          )}

          {/* Back button for sub-category */}
          {subCategoryId && (
            <button
              onClick={() => navigate(`/category/${categoryId}`)}
              className="flex items-center gap-2 text-[11px] font-semibold text-slate-500 hover:text-indigo-600 transition-colors mb-5 cursor-pointer group"
            >
              <ArrowLeft className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" />
              Back to {parentCategory?.name}
            </button>
          )}

          {/* Filter Bar */}
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-8">
            <div className="flex flex-wrap items-center gap-6">
              {(["upcoming", "free", "discount", "downloadable"] as const).map(filterId => (
                <label key={filterId} className="flex items-center gap-2 cursor-pointer group">
                  <button
                    onClick={() => setActiveFilters(prev => ({ ...prev, [filterId]: !prev[filterId] }))}
                    className={`relative w-9 h-5 rounded-full transition-colors ${activeFilters[filterId] ? "bg-indigo-600" : "bg-slate-200"}`}
                  >
                    <span className={`absolute top-0.5 w-4 h-4 bg-white rounded-full shadow-sm transform transition-transform duration-200 ${activeFilters[filterId] ? "left-4" : "left-0.5"}`} />
                  </button>
                  <span className="text-[11px] font-medium text-slate-600 group-hover:text-slate-900 capitalize">{filterId}</span>
                </label>
              ))}
            </div>

            <div className="flex items-center gap-3">
              <div className="relative">
                <select
                  value={sortBy}
                  onChange={e => setSortBy(e.target.value)}
                  className="appearance-none bg-white border border-slate-200 rounded-lg text-xs font-medium pl-4 pr-8 py-2 text-slate-700 cursor-pointer focus:outline-none focus:border-indigo-500 min-w-[140px]"
                >
                  <option value="most-popular">Most Popular</option>
                  <option value="highest-rated">Highest Rated</option>
                  <option value="newest">Newest</option>
                </select>
                <ChevronDown className="absolute right-2.5 top-2.5 w-3.5 h-3.5 text-slate-400 pointer-events-none" />
              </div>
              <div className="flex items-center gap-1 bg-white border border-slate-200 rounded-lg p-1">
                {(["grid", "list"] as const).map(mode => (
                  <button
                    key={mode}
                    onClick={() => setViewMode(mode)}
                    className={`p-1.5 rounded transition-colors ${viewMode === mode ? "bg-indigo-50 text-indigo-600" : "text-slate-400 hover:text-slate-600"}`}
                  >
                    {mode === "grid" ? <LayoutGrid className="w-3.5 h-3.5" /> : <List className="w-3.5 h-3.5" />}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="flex flex-col lg:flex-row gap-8">

            {/* ── LEFT SIDEBAR FILTERS ── */}
            <div className="w-full lg:w-64 shrink-0 space-y-1">

              {/* Active filter chips */}
              {(selectedLevels.length > 0 || selectedRating !== null) && (
                <div className="flex flex-wrap gap-1.5 mb-3">
                  {selectedLevels.map(l => (
                    <span key={l} className="flex items-center gap-1 bg-indigo-50 text-indigo-700 rounded-full px-2.5 py-1 text-[10px] font-medium">
                      {l}
                      <button onClick={() => toggleLevel(l)} className="cursor-pointer hover:text-indigo-900"><X className="w-3 h-3" /></button>
                    </span>
                  ))}
                  {selectedRating !== null && (
                    <span className="flex items-center gap-1 bg-amber-50 text-amber-700 rounded-full px-2.5 py-1 text-[10px] font-medium">
                      {selectedRating}+ Stars
                      <button onClick={() => setSelectedRating(null)} className="cursor-pointer hover:text-amber-900"><X className="w-3 h-3" /></button>
                    </span>
                  )}
                </div>
              )}

              {/* Filter Accordions */}
              {[
                {
                  id: "type", title: "Type",
                  children: (
                    <div className="space-y-2.5 pt-2">
                      {["Live Class", "Course", "Text Lesson"].map(t => (
                        <label key={t} className="flex items-center gap-3 cursor-pointer group">
                          <div className="w-4 h-4 rounded border-2 border-slate-200 group-hover:border-indigo-500 transition-colors flex items-center justify-center shrink-0" />
                          <span className="text-[11px] text-slate-600 font-medium group-hover:text-slate-900">{t}</span>
                        </label>
                      ))}
                    </div>
                  )
                },
                {
                  id: "level", title: "Level",
                  children: (
                    <div className="space-y-2.5 pt-2">
                      {["Beginner", "Intermediate", "Advanced"].map(level => (
                        <label key={level} className="flex items-center gap-3 cursor-pointer group">
                          <div
                            onClick={() => toggleLevel(level)}
                            className={`w-4 h-4 rounded border-2 transition-colors flex items-center justify-center shrink-0 cursor-pointer ${selectedLevels.includes(level) ? "bg-indigo-600 border-indigo-600" : "border-slate-200 group-hover:border-indigo-400"}`}
                          >
                            {selectedLevels.includes(level) && (
                              <svg className="w-2.5 h-2.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                              </svg>
                            )}
                          </div>
                          <span className={`text-[11px] font-medium transition-colors ${selectedLevels.includes(level) ? "text-indigo-700" : "text-slate-600 group-hover:text-slate-900"}`}>{level}</span>
                        </label>
                      ))}
                    </div>
                  )
                },
                {
                  id: "price", title: "Price",
                  children: (
                    <div className="space-y-4 pt-2">
                      <div className="flex items-center justify-between gap-2">
                        <div className="flex-1 bg-white border border-slate-200 rounded-lg py-1.5 px-3 text-[10px] text-slate-600 text-center font-semibold">
                          {priceRange[0] === 0 ? "Free" : `GHC ${priceRange[0]}`}
                        </div>
                        <div className="text-slate-300 text-xs">—</div>
                        <div className="flex-1 bg-white border border-slate-200 rounded-lg py-1.5 px-3 text-[10px] text-slate-600 text-center font-semibold">
                          GHC {priceRange[1]}
                        </div>
                      </div>
                      <div className="relative h-1.5 bg-slate-100 rounded-full w-full">
                        <div
                          className="absolute h-full bg-[#0B0F59] rounded-full"
                          style={{ left: `${(priceRange[0] / 200) * 100}%`, right: `${100 - (priceRange[1] / 200) * 100}%` }}
                        />
                        <input type="range" min={0} max={200} value={priceRange[0]}
                          onChange={e => setPriceRange([Math.min(Number(e.target.value), priceRange[1] - 10), priceRange[1]])}
                          className="absolute w-full h-full opacity-0 cursor-pointer" />
                        <div className="absolute top-1/2 -translate-y-1/2 w-4 h-4 bg-white border-2 border-[#0B0F59] rounded-full shadow cursor-grab"
                          style={{ left: `calc(${(priceRange[0] / 200) * 100}% - 8px)` }} />
                        <div className="absolute top-1/2 -translate-y-1/2 w-4 h-4 bg-white border-2 border-[#0B0F59] rounded-full shadow cursor-grab"
                          style={{ left: `calc(${(priceRange[1] / 200) * 100}% - 8px)` }} />
                      </div>
                    </div>
                  )
                },
                {
                  id: "instructor", title: "Instructor",
                  children: (
                    <div className="pt-2">
                      <label className="text-[9px] font-semibold text-slate-400 block mb-2 uppercase tracking-wider">Course Instructor</label>
                      <div className="relative">
                        <input
                          type="text"
                          placeholder="Search and select an instructor"
                          className="w-full bg-white border border-slate-200 rounded-lg text-[10px] pl-3 pr-8 py-2.5 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-100"
                        />
                        <ChevronDown className="absolute right-3 top-3 w-3 h-3 text-slate-400" />
                      </div>
                    </div>
                  )
                },
                {
                  id: "rating", title: "Rating",
                  children: (
                    <div className="space-y-2.5 pt-2">
                      {[5, 4, 3, 2, 1].map(rating => (
                        <button
                          key={rating}
                          onClick={() => setSelectedRating(selectedRating === rating ? null : rating)}
                          className={`w-full flex items-center gap-3 rounded-lg px-2 py-1 transition-colors cursor-pointer ${selectedRating === rating ? "bg-amber-50" : "hover:bg-slate-50"}`}
                        >
                          <div className={`w-4 h-4 rounded border-2 transition-colors flex items-center justify-center shrink-0 ${selectedRating === rating ? "bg-amber-500 border-amber-500" : "border-slate-200"}`}>
                            {selectedRating === rating && (
                              <svg className="w-2.5 h-2.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                              </svg>
                            )}
                          </div>
                          <div className="flex gap-0.5">
                            {Array.from({ length: 5 }).map((_, i) => (
                              <Star key={i} className={`w-3.5 h-3.5 ${i < rating ? "fill-amber-400 text-amber-400" : "text-slate-200 fill-slate-200"}`} />
                            ))}
                          </div>
                          <span className="text-[10px] text-slate-400 font-medium">& up</span>
                        </button>
                      ))}
                    </div>
                  )
                },
              ].map(acc => (
                <div key={acc.id} className="border-b border-slate-100 pb-3">
                  <button
                    onClick={() => toggleAccordion(acc.id)}
                    className="w-full flex items-center justify-between py-2.5 text-slate-800 font-bold text-xs cursor-pointer group"
                  >
                    <div className="flex items-center gap-2">
                      <div className="w-1 h-3.5 bg-[#0B0F59] rounded-sm" />
                      <span>{acc.title}</span>
                    </div>
                    {expandedAccordions[acc.id]
                      ? <ChevronUp className="w-3.5 h-3.5 text-slate-400 group-hover:text-[#0B0F59] transition-colors" />
                      : <ChevronDown className="w-3.5 h-3.5 text-slate-400 group-hover:text-[#0B0F59] transition-colors" />}
                  </button>
                  {expandedAccordions[acc.id] && (
                    <div className="mb-2">{acc.children}</div>
                  )}
                </div>
              ))}
            </div>

            {/* ── RIGHT: COURSE GRID ── */}
            <div className="flex-1 space-y-8">

              {/* Results count */}
              <div className="flex items-center justify-between">
                <p className="text-xs text-slate-500 font-medium">
                  Showing <span className="font-bold text-slate-800">{filteredCourses.length}</span> courses
                  {subCategoryId && currentSubCategory && (
                    <> in <span className="text-indigo-600 font-semibold">{currentSubCategory.name}</span></>
                  )}
                </p>
                {(selectedLevels.length > 0 || selectedRating !== null || activeFilters.free || activeFilters.discount) && (
                  <button
                    onClick={() => { setSelectedLevels([]); setSelectedRating(null); setActiveFilters({ upcoming: false, free: false, discount: false, downloadable: false }); }}
                    className="flex items-center gap-1.5 text-[11px] text-slate-400 hover:text-rose-500 transition-colors cursor-pointer"
                  >
                    <X className="w-3.5 h-3.5" />
                    Clear all filters
                  </button>
                )}
              </div>

              {filteredCourses.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-20 text-center">
                  <div className="w-16 h-16 bg-slate-100 rounded-2xl flex items-center justify-center mb-4">
                    <SlidersHorizontal className="w-7 h-7 text-slate-300" />
                  </div>
                  <h3 className="font-display font-bold text-slate-700 text-sm mb-2">No courses match your filters</h3>
                  <p className="text-[11px] text-slate-400 mb-4">Try adjusting or clearing your filter settings</p>
                  <button
                    onClick={() => { setSelectedLevels([]); setSelectedRating(null); setActiveFilters({ upcoming: false, free: false, discount: false, downloadable: false }); }}
                    className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-[11px] font-semibold transition-colors cursor-pointer"
                  >Clear Filters</button>
                </div>
              ) : (
                <div className={`grid gap-5 ${viewMode === "grid" ? "grid-cols-1 md:grid-cols-2" : "grid-cols-1"}`}>
                  {filteredCourses.map((course) => (
                    viewMode === "grid" ? (
                      /* GRID CARD */
                      <div
                        key={course.id}
                        onClick={() => navigate(`/course/${course.id}`)}
                        className="bg-white border border-slate-200 rounded-2xl overflow-hidden hover:shadow-xl hover:border-indigo-200 transition-all duration-300 cursor-pointer group flex flex-col"
                      >
                        <div className="relative h-44 overflow-hidden">
                          <img
                            src={course.image}
                            alt={course.title}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                          />
                          {(course as any).discount && (
                            <div className="absolute top-3 left-3 bg-rose-500 text-white px-2 py-1 rounded-md text-[9px] font-bold tracking-wider flex items-center gap-1 shadow-sm">
                              <span>%</span> OFF
                            </div>
                          )}
                          <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-md text-[9px] font-bold text-slate-600 border border-slate-100">
                            {course.level}
                          </div>
                        </div>
                        <div className="p-5 flex-1 flex flex-col">
                          <h3 className="font-display font-bold text-slate-900 text-[14px] leading-snug mb-2 line-clamp-2">
                            {course.title}
                          </h3>
                          <div className="flex items-center gap-2 mb-3">
                            <div className="flex gap-0.5">
                              {Array.from({ length: 5 }).map((_, i) => (
                                <Star key={i} className={`w-3 h-3 ${i < Math.floor(course.rating) ? "fill-amber-400 text-amber-400" : "text-slate-200 fill-slate-200"}`} />
                              ))}
                            </div>
                            <span className="text-[10px] font-bold text-amber-600">{course.rating}</span>
                            <span className="text-[10px] text-slate-400">({course.reviewCount})</span>
                          </div>

                          <div className="mt-auto pt-4 border-t border-slate-100">
                            <div className="flex items-center justify-between mb-3">
                              <div className="flex items-center gap-2">
                                <img
                                  src={`https://picsum.photos/seed/${course.id}avatar/50/50`}
                                  alt={course.instructor}
                                  className="w-7 h-7 rounded-full object-cover border-2 border-white shadow-sm"
                                />
                                <div>
                                  <span className="text-[10px] font-bold text-slate-800 block leading-none">{course.instructor}</span>
                                  <span className="text-[9px] text-slate-400 block mt-0.5">{course.instructorRole}</span>
                                </div>
                              </div>
                              <div className="flex items-center gap-1.5 text-slate-400">
                                <Clock className="w-3.5 h-3.5" />
                                <span className="text-[10px] font-mono">{course.duration}</span>
                              </div>
                            </div>
                            <div className="flex items-center justify-between">
                              <div className="flex items-baseline gap-1.5">
                                <span className="text-[#0B0F59] font-bold text-lg">
                                  {course.price === 0 ? "Free" : `GHC ${course.price}`}
                                </span>
                                {(course as any).originalPrice && (
                                  <span className="text-slate-400 text-[10px] font-medium line-through">GHC {(course as any).originalPrice}</span>
                                )}
                              </div>
                              {course.enrolled && (
                                <span className="text-[9px] text-slate-400 font-medium">
                                  {course.enrolled >= 1000 ? `${(course.enrolled / 1000).toFixed(1)}k` : course.enrolled} students
                                </span>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    ) : (
                      /* LIST CARD */
                      <div
                        key={course.id}
                        onClick={() => navigate(`/course/${course.id}`)}
                        className="bg-white border border-slate-200 rounded-2xl overflow-hidden hover:shadow-lg hover:border-indigo-200 transition-all duration-300 cursor-pointer group flex flex-row"
                      >
                        <div className="relative w-48 shrink-0 overflow-hidden">
                          <img
                            src={course.image}
                            alt={course.title}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                          />
                          {(course as any).discount && (
                            <div className="absolute top-3 left-3 bg-rose-500 text-white px-2 py-1 rounded-md text-[9px] font-bold tracking-wider">OFF</div>
                          )}
                        </div>
                        <div className="p-5 flex-1 flex flex-col justify-between">
                          <div>
                            <div className="flex items-start justify-between gap-4 mb-2">
                              <h3 className="font-display font-bold text-slate-900 text-sm leading-snug line-clamp-2">{course.title}</h3>
                              <span className="shrink-0 text-[9px] font-bold text-indigo-600 bg-indigo-50 px-2 py-1 rounded-md">{course.level}</span>
                            </div>
                            <div className="flex items-center gap-2 mb-3">
                              <div className="flex gap-0.5">
                                {Array.from({ length: 5 }).map((_, i) => (
                                  <Star key={i} className={`w-3 h-3 ${i < Math.floor(course.rating) ? "fill-amber-400 text-amber-400" : "text-slate-200 fill-slate-200"}`} />
                                ))}
                              </div>
                              <span className="text-[10px] font-bold text-amber-600">{course.rating}</span>
                              <span className="text-[10px] text-slate-400">({course.reviewCount} reviews)</span>
                            </div>
                          </div>
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <img src={`https://picsum.photos/seed/${course.id}avatar/50/50`} alt={course.instructor} className="w-6 h-6 rounded-full object-cover" />
                              <div>
                                <span className="text-[10px] font-bold text-slate-800 block leading-none">{course.instructor}</span>
                                <span className="text-[9px] text-slate-400">{course.instructorRole}</span>
                              </div>
                            </div>
                            <div className="flex items-center gap-4">
                              <div className="flex items-center gap-1.5 text-slate-400">
                                <Clock className="w-3.5 h-3.5" />
                                <span className="text-[10px] font-mono">{course.duration}</span>
                              </div>
                              <div className="flex items-baseline gap-1.5">
                                <span className="text-[#0B0F59] font-bold text-base">
                                  {course.price === 0 ? "Free" : `GHC ${course.price}`}
                                </span>
                                {(course as any).originalPrice && (
                                  <span className="text-slate-400 text-[10px] line-through">GHC {(course as any).originalPrice}</span>
                                )}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    )
                  ))}
                </div>
              )}

              {/* ABOUT SECTION */}
              <div className="bg-white border border-slate-100 rounded-2xl p-6 shadow-sm">
                <h4 className="text-sm font-display font-bold text-slate-900 mb-3">About {pageTitle} Courses</h4>
                <p className="text-[11px] text-slate-500 leading-relaxed">
                  Enhance your capabilities with our {pageTitle.toLowerCase()} courses designed for professionals at all levels.
                  Learn essential skills and practical approaches that combine theoretical frameworks with real-world case studies
                  and interactive exercises. Whether you're just starting out or an experienced professional, our curated curriculum
                  will help you navigate complex challenges and inspire you to achieve exceptional results in {pageTitle.toLowerCase()}.
                  Invest in your professional growth and join {(totalStudents / 1000).toFixed(0)}k+ students already learning on Corelify.
                </p>
              </div>
            </div>

          </div>
        </div>
      </main>

      <PublicFooter />
    </div>
  );
}
