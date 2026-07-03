import React, { useState } from "react";
import {
  Search,
  Star,
  Calendar,
  MessageSquare,
  CreditCard,
  ChevronRight,
  X,
  Check,
  Sparkles,
  AlertCircle,
  Video,
  Play,
  Phone,
  LogOut,
  ShoppingBag,
  Download,
  Clock,
  User,
  CheckCircle,
  TrendingUp,
  Sliders,
  Send,
  Bell
} from "lucide-react";
import { Mentor, MentorReview, MentorProduct } from "../types";

interface MentorshipModuleProps {
  mentors: Mentor[];
  mentorProducts?: MentorProduct[];
  onAddNotification: (title: string, desc: string, type: "message" | "alert" | "recommendation" | "application") => void;
}

export default function MentorshipModule({ mentors, mentorProducts = [], onAddNotification }: MentorshipModuleProps) {
  // Navigation tabs: "consultation" | "store"
  const [activeTab, setActiveTab] = useState<"consultation" | "store">("consultation");

  const [selectedMentorId, setSelectedMentorId] = useState<string | null>("mentor-1");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedSkillFilter, setSelectedSkillFilter] = useState("All");

  // Booking states
  const [activeDateSlot, setActiveDateSlot] = useState<string | null>(null);
  const [bookingType, setBookingType] = useState<"1on1" | "group">("1on1");
  const [showCheckoutDrawer, setShowCheckoutDrawer] = useState(false);
  const [couponCode, setCouponCode] = useState("");
  const [discountApplied, setDiscountApplied] = useState(false);
  const [cardNumber, setCardNumber] = useState("4111 2222 3333 4444");
  const [bookingSuccess, setBookingSuccess] = useState(false);
  const [calendarReminderEnabled, setCalendarReminderEnabled] = useState(false);

  // Active meeting states
  const [showMeetingRoom, setShowMeetingRoom] = useState(false);
  const [meetingMessages, setMeetingMessages] = useState<{ sender: string; text: string; time: string }[]>([
    { sender: "mentor", text: "Hey! Glad to connect today. Let's look over your Synthetix Figma project.", time: "10:02 AM" }
  ]);
  const [newChatText, setNewChatText] = useState("");

  // Store interactive states
  const [storeSearchQuery, setStoreSearchQuery] = useState("");
  const [storeFilterCategory, setStoreFilterCategory] = useState("All");
  const [purchasedProducts, setPurchasedProducts] = useState<string[]>([]);
  const [productCheckoutId, setProductCheckoutId] = useState<string | null>(null);

  const selectedMentor = mentors.find((m) => m.id === selectedMentorId) || mentors[0];
  const allSkills = ["All", ...Array.from(new Set(mentors.flatMap((m) => m.skills)))];

  const filteredMentors = mentors.filter((m) => {
    const matchesSearch = m.name.toLowerCase().includes(searchQuery.toLowerCase()) || m.company.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesSkill = selectedSkillFilter === "All" || m.skills.includes(selectedSkillFilter);
    return matchesSearch && matchesSkill;
  });

  // Mentor Digital Products Store list
  const storeItems = mentorProducts;

  const filteredStoreItems = storeItems.filter(item => {
    const mentorName = mentors.find(m => m.id === item.mentorId)?.name || "";
    const matchesQuery = item.title.toLowerCase().includes(storeSearchQuery.toLowerCase()) || mentorName.toLowerCase().includes(storeSearchQuery.toLowerCase());
    const matchesCategory = storeFilterCategory === "All" || item.type === storeFilterCategory;
    return matchesQuery && matchesCategory;
  });

  const handleApplyCoupon = () => {
    if (couponCode.toUpperCase() === "LUMINA50") {
      setDiscountApplied(true);
    }
  };

  const handleFinalizeBooking = () => {
    setBookingSuccess(true);
    onAddNotification(
      "Booking Confirmed",
      `Session (${bookingType === "1on1" ? "1:1 Consultation" : "Group Masterclass"}) with ${selectedMentor.name} is booked for ${activeDateSlot}.`,
      "alert"
    );
  };

  const handleRescheduleSession = () => {
    setActiveDateSlot(null);
    setBookingSuccess(false);
    onAddNotification(
      "Reschedule Triggered",
      "Consultation timeline cleared. Choose a new slot to finalize scheduling parameters.",
      "recommendation"
    );
  };

  const handleCancelSession = () => {
    setActiveDateSlot(null);
    setBookingSuccess(false);
    onAddNotification(
      "Booking Cancelled",
      "Consultation slot has been successfully removed and refunded to your payment token.",
      "recommendation"
    );
  };

  const handlePurchaseProduct = (id: string) => {
    setPurchasedProducts([...purchasedProducts, id]);
    setProductCheckoutId(null);
    const item = storeItems.find(p => p.id === id);
    onAddNotification(
      "Product Purchased",
      `Digital resource "${item?.title}" acquired. Your download link is verified and active.`,
      "message"
    );
  };

  const handleSendMessageInMeeting = () => {
    if (newChatText.trim() === "") return;
    setMeetingMessages([
      ...meetingMessages,
      { sender: "user", text: newChatText, time: "10:04 AM" }
    ]);
    setNewChatText("");

    setTimeout(() => {
      setMeetingMessages((prev) => [
        ...prev,
        { sender: "mentor", text: "I highly recommend splitting those tokens into nested semantic blocks. It prevents theme collisions.", time: "10:04 AM" }
      ]);
    }, 1200);
  };

  return (
    <div className="h-full flex flex-col gap-6 select-none font-sans overflow-hidden">
      
      {/* Visual Overlay: Live Consultation Zoom Room */}
      {showMeetingRoom && (
        <div className="fixed inset-0 bg-[#070a13] z-50 flex flex-col">
          {/* Top meeting bar */}
          <div className="bg-gray-950 border-b border-gray-900 px-6 py-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-2.5 h-2.5 rounded-full bg-rose-500 animate-pulse" />
              <h3 className="text-white font-display font-semibold text-xs">Live Consultation Slot &bull; {selectedMentor.name}</h3>
            </div>
            <button
              onClick={() => setShowMeetingRoom(false)}
              className="px-3 py-1.5 bg-gray-900 hover:bg-gray-800 text-gray-300 rounded-lg text-xs font-semibold flex items-center gap-1 cursor-pointer"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Leave Consulting Studio</span>
            </button>
          </div>

          <div className="flex-grow flex flex-col md:flex-row">
            {/* Live Video Frame */}
            <div className="flex-grow bg-gray-950 p-6 flex flex-col justify-between items-center relative">
              <div className="absolute top-6 left-6 bg-black/60 px-2.5 py-1 rounded-lg text-[10px] text-gray-400 font-mono">
                Consultant Channel (1080p WebRTC Secure)
              </div>

              <div className="flex-grow w-full max-w-2xl flex items-center justify-center">
                <div className="grid grid-cols-2 gap-4 w-full">
                  {/* Mentor visual container */}
                  <div className="aspect-video bg-[#111827] border border-gray-800 rounded-2xl relative overflow-hidden flex items-center justify-center shadow-lg">
                    <img src={selectedMentor.image} alt={selectedMentor.name} className="w-20 h-20 rounded-full object-cover border border-gray-700" />
                    <span className="absolute bottom-3 left-3 bg-black/50 px-2 py-0.5 rounded text-[10px] text-white font-mono">{selectedMentor.name} (Host)</span>
                  </div>
                  {/* User visual container */}
                  <div className="aspect-video bg-[#111827] border border-gray-800 rounded-2xl relative overflow-hidden flex items-center justify-center shadow-lg">
                    <div className="w-20 h-20 rounded-full bg-indigo-600/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400 font-bold text-xl">
                      AM
                    </div>
                    <span className="absolute bottom-3 left-3 bg-black/50 px-2 py-0.5 rounded text-[10px] text-white font-mono">Abhishek (You)</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-3 bg-gray-900 px-4 py-2 rounded-xl border border-gray-800 text-white text-xs">
                <span className="text-[10px] text-gray-400 font-mono">Audio: Connected &bull; Video: Active</span>
              </div>
            </div>

            {/* Chat Log Sidebar */}
            <div className="w-full md:w-80 bg-gray-950 border-l border-gray-900 flex flex-col justify-between h-full p-4 shrink-0">
              <div className="space-y-4">
                <h4 className="text-white text-xs font-semibold font-display border-b border-gray-900 pb-2 flex items-center gap-1.5">
                  <MessageSquare className="w-4 h-4 text-indigo-400" />
                  <span>Interactive Chat Log</span>
                </h4>

                <div className="space-y-3 max-h-[350px] overflow-y-auto pr-1">
                  {meetingMessages.map((msg, i) => (
                    <div key={i} className={`p-2.5 rounded-lg text-xs max-w-[85%] ${
                      msg.sender === "mentor" ? "bg-gray-900 text-gray-300 self-start" : "bg-indigo-600/15 border border-indigo-500/20 text-indigo-300 ml-auto"
                    }`}>
                      <p className="leading-relaxed">{msg.text}</p>
                      <span className="text-[8px] text-gray-500 block text-right mt-1 font-mono">{msg.time}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex gap-2 pt-3 border-t border-gray-900">
                <input
                  type="text"
                  value={newChatText}
                  onChange={(e) => setNewChatText(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleSendMessageInMeeting()}
                  placeholder="Type advice response..."
                  className="w-full px-3 py-1.5 bg-gray-900 border border-gray-800 rounded-lg text-xs text-white focus:outline-none"
                />
                <button
                  onClick={handleSendMessageInMeeting}
                  className="px-3 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg text-xs font-semibold cursor-pointer"
                >
                  Send
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Navigation and workspace header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-slate-200 pb-4">
        <div>
          <div className="flex items-center gap-1.5 text-indigo-650 font-mono text-xs mb-1 font-bold">
            <Sliders className="w-4 h-4 text-indigo-600" />
            <span>EXECUTIVE MENTORSHIP MATRIX</span>
          </div>
          <h2 className="text-xl font-display font-bold text-slate-900 tracking-tight">Mentorship Workspace</h2>
        </div>

        <div className="flex bg-white p-1 rounded-xl border border-slate-200 shadow-sm shrink-0">
          <button
            onClick={() => setActiveTab("consultation")}
            className={`px-4 py-1.5 rounded-lg text-xs font-medium transition-all cursor-pointer ${
              activeTab === "consultation" ? "bg-indigo-600 text-white shadow-sm font-semibold" : "text-slate-500 hover:text-slate-900 hover:bg-slate-50"
            }`}
          >
            1:1 &amp; Group Booking
          </button>
          <button
            onClick={() => setActiveTab("store")}
            className={`px-4 py-1.5 rounded-lg text-xs font-medium transition-all cursor-pointer flex items-center gap-1 ${
              activeTab === "store" ? "bg-indigo-600 text-white shadow-sm font-semibold" : "text-slate-500 hover:text-slate-900 hover:bg-slate-50"
            }`}
          >
            <ShoppingBag className="w-3.5 h-3.5" />
            <span>Mentor Store</span>
          </button>
        </div>
      </div>

      {/* TAB 1: CONSULTATION WORKSPACE */}
      {activeTab === "consultation" && (
        <div className="flex-1 flex flex-col md:flex-row gap-6 overflow-hidden">
          
          {/* LEFT: Mentors catalog */}
          <div className="w-full md:w-80 flex flex-col gap-4 shrink-0 overflow-y-auto pr-1 border-r border-slate-200/60">
            <span className="text-[10px] text-slate-400 font-mono uppercase block font-bold">Discover Executive Advisors</span>

            {/* Search */}
            <div className="relative">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search mentors..."
                className="w-full pl-9 pr-3 py-1.5 bg-white border border-slate-200 rounded-lg text-xs text-slate-800 focus:outline-none focus:border-indigo-600 focus:ring-1 focus:ring-indigo-600 transition-colors"
              />
              <Search className="absolute left-3 top-2.5 w-3.5 h-3.5 text-slate-400" />
            </div>

            {/* Skill tags */}
            <div className="space-y-1.5 p-2 bg-slate-50 rounded-xl border border-slate-200">
              <span className="text-[9px] text-slate-450 font-mono uppercase block">Filter by specialty</span>
              <div className="flex flex-wrap gap-1">
                {allSkills.slice(0, 5).map((skill) => (
                  <button
                    key={skill}
                    onClick={() => setSelectedSkillFilter(skill)}
                    className={`px-2 py-0.5 rounded text-[9px] font-medium border transition-colors cursor-pointer ${
                      selectedSkillFilter === skill
                        ? "bg-indigo-50 text-indigo-750 border-indigo-250 font-semibold"
                        : "bg-white border-slate-200 text-slate-600 hover:text-slate-900 hover:bg-slate-50"
                    }`}
                  >
                    {skill}
                  </button>
                ))}
              </div>
            </div>

            {/* Mentors List */}
            <div className="space-y-2.5">
              {filteredMentors.map((m) => {
                const isSelected = m.id === selectedMentorId;
                return (
                  <div
                    key={m.id}
                    onClick={() => {
                      setSelectedMentorId(m.id);
                      setActiveDateSlot(null);
                      setBookingSuccess(false);
                    }}
                    className={`p-3.5 border rounded-xl cursor-pointer transition-all flex gap-3 ${
                      isSelected ? "bg-indigo-50/30 border-indigo-500 ring-1 ring-indigo-500 shadow-sm" : "bg-white border-slate-200 hover:border-slate-300 shadow-sm"
                    }`}
                  >
                    <img src={m.image} alt={m.name} className="w-10 h-10 rounded-xl object-cover border border-slate-200 shrink-0 shadow-sm" />
                    <div className="min-w-0">
                      <h4 className="text-slate-800 text-xs font-bold leading-tight">{m.name}</h4>
                      <p className="text-[10px] text-indigo-600 font-mono mt-0.5 leading-none">{m.role}</p>
                      <p className="text-[9px] text-slate-400 truncate block mt-0.5">{m.company}</p>

                      <div className="flex items-center gap-1 text-[9px] text-amber-500 mt-2">
                        <Star className="w-2.5 h-2.5 fill-amber-500" />
                        <span>{m.rating} ({m.reviewsCount})</span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* RIGHT: Selected Advisor workspace & calendar */}
          {selectedMentor ? (
            <div className="flex-grow flex flex-col gap-6 overflow-y-auto pb-10 pr-1">
              
              <div className="border-b border-slate-100 pb-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex gap-4 items-center">
                  <img src={selectedMentor.image} alt={selectedMentor.name} className="w-14 h-14 rounded-2xl object-cover border border-slate-200 shadow-sm" />
                  <div>
                    <h3 className="text-lg font-display font-bold text-slate-900 leading-tight">{selectedMentor.name}</h3>
                    <p className="text-xs text-indigo-600 font-mono mt-0.5">{selectedMentor.role} &bull; <span className="text-slate-500">{selectedMentor.company}</span></p>
                    <div className="flex items-center gap-1 text-xs text-amber-500 mt-1">
                      <Star className="w-3.5 h-3.5 fill-amber-500" />
                      <span className="font-semibold">{selectedMentor.rating}</span>
                      <span className="text-slate-400 text-[10px]">({selectedMentor.reviewsCount} reviews)</span>
                    </div>
                  </div>
                </div>

                {bookingSuccess && (
                  <button
                    onClick={() => setShowMeetingRoom(true)}
                    className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold rounded-xl flex items-center gap-1.5 shadow cursor-pointer transition-colors"
                  >
                    <Video className="w-4 h-4" />
                    <span>Launch Consulting Studio</span>
                  </button>
                )}
              </div>

              <div className="grid lg:grid-cols-3 gap-6">
                
                {/* Advisor profile specifications */}
                <div className="lg:col-span-2 space-y-6">
                  <div className="space-y-2">
                    <span className="text-[10px] text-slate-400 font-mono uppercase block font-bold">Profile Bio</span>
                    <p className="text-slate-600 text-xs leading-relaxed">{selectedMentor.bio}</p>
                  </div>

                  <div className="space-y-2">
                    <span className="text-[10px] text-slate-400 font-mono uppercase block font-bold">Skills Specialties</span>
                    <div className="flex flex-wrap gap-1.5">
                      {selectedMentor.skills.map((s) => (
                        <span key={s} className="px-2.5 py-1 bg-slate-50 border border-slate-200 text-slate-600 rounded-lg font-mono text-[10px] font-medium">
                          {s}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Student reviews feedback list */}
                  <div className="space-y-3 pt-4 border-t border-slate-150">
                    <span className="text-[10px] text-slate-400 font-mono uppercase block font-bold">Advising Endorsements</span>
                    <div className="space-y-3">
                      {selectedMentor.reviews.map((rev) => (
                        <div key={rev.id} className="p-3 bg-slate-50 border border-slate-150 rounded-xl space-y-1">
                          <div className="flex justify-between text-[10px] font-mono">
                            <span className="text-slate-800 font-semibold">{rev.user}</span>
                            <span className="text-slate-400">{rev.date}</span>
                          </div>
                          <p className="text-slate-600 text-xs leading-relaxed italic">"{rev.comment}"</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Scheduling Workspace Panel */}
                <div className="space-y-4">
                  <div className="bg-white border border-slate-200 rounded-2xl p-5 space-y-4 shadow-sm">
                    
                    {/* Booking Mode Selector (1:1 vs Group Masterclass) */}
                    <div className="space-y-1.5">
                      <span className="text-[9px] text-slate-400 font-mono uppercase block">Consultation Format</span>
                      <div className="grid grid-cols-2 gap-2 bg-slate-50 p-1 rounded-lg border border-slate-200">
                        <button
                          onClick={() => setBookingType("1on1")}
                          className={`py-1 text-[10px] font-semibold rounded transition-all cursor-pointer ${
                            bookingType === "1on1" ? "bg-white text-slate-800 shadow-sm" : "text-slate-500 hover:text-slate-800"
                          }`}
                        >
                          1:1 Session
                        </button>
                        <button
                          onClick={() => setBookingType("group")}
                          className={`py-1 text-[10px] font-semibold rounded transition-all cursor-pointer ${
                            bookingType === "group" ? "bg-white text-slate-800 shadow-sm" : "text-slate-500 hover:text-slate-800"
                          }`}
                        >
                          Group Session
                        </button>
                      </div>
                    </div>

                    <div className="pt-2">
                      <span className="text-[9px] text-slate-400 font-mono uppercase block">Rate</span>
                      <div className="text-xl font-display font-bold text-slate-900 mt-1">
                        {bookingType === "1on1" ? `$${selectedMentor.price}` : `$${Math.round(selectedMentor.price * 0.4)}`}{" "}
                        <span className="text-slate-400 text-xs font-normal">/ slot seat</span>
                      </div>
                    </div>

                    {/* Booking Dates Matrix */}
                    <div className="space-y-2">
                      <span className="text-[10px] text-slate-400 font-mono uppercase block">Select Calendar Slot</span>
                      <div className="space-y-1.5">
                        {selectedMentor.availability.map((slot) => {
                          const isSelected = activeDateSlot === slot;
                          return (
                            <button
                              key={slot}
                              disabled={bookingSuccess}
                              onClick={() => setActiveDateSlot(slot)}
                              className={`w-full p-2.5 border rounded-xl text-xs text-left flex justify-between items-center transition-all ${
                                isSelected
                                  ? "bg-indigo-600 border-indigo-600 text-white font-semibold shadow"
                                  : "bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100"
                              }`}
                            >
                              <span>{slot}</span>
                              {isSelected ? <Check className="w-3.5 h-3.5" /> : <ChevronRight className="w-3.5 h-3.5 text-slate-400" />}
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    {/* Reminders SMS configuration */}
                    <div className="flex items-center justify-between p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-600">
                      <div className="flex items-center gap-2">
                        <Bell className="w-4 h-4 text-indigo-600" />
                        <span>SMS &amp; Email reminders</span>
                      </div>
                      <input
                        type="checkbox"
                        checked={calendarReminderEnabled}
                        onChange={() => setCalendarReminderEnabled(!calendarReminderEnabled)}
                        className="w-4 h-4 accent-indigo-600 cursor-pointer"
                      />
                    </div>

                    {activeDateSlot && !bookingSuccess && (
                      <button
                        onClick={() => setShowCheckoutDrawer(true)}
                        className="w-full py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold rounded-xl flex items-center justify-center gap-1.5 shadow-sm cursor-pointer transition-colors"
                      >
                        <CreditCard className="w-4 h-4" />
                        <span>Proceed to Checkout</span>
                      </button>
                    )}

                    {bookingSuccess && (
                      <div className="space-y-3 p-3.5 bg-emerald-50 border border-emerald-150 rounded-xl text-center shadow-inner">
                        <div>
                          <span className="text-[9px] font-mono text-emerald-800 font-bold block uppercase">BOOKING COMPLETED</span>
                          <span className="text-[10px] text-slate-600 block font-medium mt-1">Confirmed for: {activeDateSlot}</span>
                        </div>
                        
                        <div className="flex justify-center gap-2 pt-1.5 text-[10px]">
                          <button
                            onClick={handleRescheduleSession}
                            className="px-2 py-1 bg-white hover:bg-slate-50 border border-slate-200 text-slate-700 font-bold rounded"
                          >
                            Reschedule Slot
                          </button>
                          <button
                            onClick={handleCancelSession}
                            className="px-2 py-1 bg-rose-50 hover:bg-rose-100 border border-rose-150 text-rose-700 font-bold rounded"
                          >
                            Cancel Session
                          </button>
                        </div>
                      </div>
                    )}

                  </div>
                </div>

              </div>
            </div>
          ) : (
            <div className="flex-grow flex flex-col items-center justify-center text-center p-12 text-slate-400">
              <AlertCircle className="w-8 h-8 mb-2 text-slate-300" />
              <p className="text-xs">Select an executive advisor from catalog directory.</p>
            </div>
          )}

        </div>
      )}

      {/* TAB 2: MENTOR STORE WORKSPACE */}
      {activeTab === "store" && (
        <div className="flex-grow overflow-y-auto pb-10 pr-1 space-y-6">
          
          {/* Store search filter block */}
          <div className="flex flex-col md:flex-row gap-4 justify-between items-start md:items-center border-b border-slate-150 pb-4">
            <div>
              <h3 className="text-slate-850 font-display font-bold text-sm">Download Premium Mentor Materials</h3>
              <p className="text-slate-500 text-xs">Buy design systems, CV blueprints, and learning code bases compiled by top experts.</p>
            </div>

            <div className="flex gap-2.5 items-center w-full md:w-auto">
              <div className="relative w-full md:w-56">
                <input
                  type="text"
                  value={storeSearchQuery}
                  onChange={(e) => setStoreSearchQuery(e.target.value)}
                  placeholder="Search products..."
                  className="w-full pl-8 pr-3 py-1.5 bg-white border border-slate-200 rounded-lg text-xs text-slate-800 focus:outline-none focus:border-indigo-600"
                />
                <Search className="absolute left-2.5 top-2.5 w-3.5 h-3.5 text-slate-400" />
              </div>

              <select
                value={storeFilterCategory}
                onChange={(e) => setStoreFilterCategory(e.target.value)}
                className="bg-white border border-slate-200 rounded-lg px-2.5 py-1.5 text-xs text-slate-600 font-semibold focus:outline-none focus:border-indigo-600"
              >
                <option value="All">All Items</option>
                <option value="Digital Product">Design Tokens</option>
                <option value="Career Guide">Career Guides</option>
                <option value="Learning Material">Code &amp; Templates</option>
              </select>
            </div>
          </div>

          {/* Store Items Grid */}
          <div className="grid sm:grid-cols-2 gap-6">
            {filteredStoreItems.map((item) => {
              const isPurchased = purchasedProducts.includes(item.id);

              return (
                <div key={item.id} className="p-5 bg-white border border-slate-200 rounded-2xl flex flex-col justify-between shadow-sm hover:border-slate-300 transition-all">
                  <div className="space-y-2.5">
                    <div className="flex justify-between items-start gap-4">
                      <div>
                        <span className="text-[9px] font-mono text-indigo-600 bg-indigo-50 border border-indigo-150 px-2 py-0.5 rounded font-bold uppercase">
                          {item.type}
                        </span>
                        <h4 className="text-slate-850 font-display font-bold text-xs mt-2 leading-tight">{item.title}</h4>
                        <span className="text-slate-400 text-[10px] block mt-0.5">Compiled by {mentors.find(m => m.id === item.mentorId)?.name || "Unknown Mentor"}</span>
                      </div>

                      <div className="text-right">
                        <div className="flex gap-1 text-slate-500 items-center justify-end text-[10px]">
                          <Download className="w-3.5 h-3.5" />
                          <span className="font-semibold font-mono">{item.downloads}</span>
                        </div>
                      </div>
                    </div>

                    <p className="text-slate-500 text-xs leading-relaxed">{item.description}</p>
                  </div>

                  <div className="pt-4 mt-4 border-t border-slate-100 flex justify-between items-center text-xs">
                    <span className="text-slate-900 font-bold font-mono text-sm">${item.price} USD</span>
                    
                    {isPurchased ? (
                      <button
                        onClick={() => {
                          alert(`Downloading item file attachment: ${item.title}`);
                        }}
                        className="px-3.5 py-1.5 bg-emerald-50 border border-emerald-250 text-emerald-800 text-[11px] font-bold rounded-lg flex items-center gap-1 cursor-pointer hover:bg-emerald-100 transition-colors"
                      >
                        <Download className="w-3.5 h-3.5" />
                        <span>Download Asset File</span>
                      </button>
                    ) : (
                      <button
                        onClick={() => setProductCheckoutId(item.id)}
                        className="px-3.5 py-1.5 bg-indigo-600 hover:bg-indigo-750 text-white text-[10px] font-bold rounded-lg cursor-pointer shadow-sm transition-colors"
                      >
                        Buy instantly
                      </button>
                    )}
                  </div>
                </div>
              );
            })}

            {filteredStoreItems.length === 0 && (
              <div className="col-span-full py-10 text-center text-slate-400 italic text-xs bg-white border border-dashed border-slate-200 rounded-xl">
                No matching store products available.
              </div>
            )}
          </div>
        </div>
      )}

      {/* checkout Drawer simulation popup */}
      {showCheckoutDrawer && (
        <div className="fixed inset-0 bg-black/45 backdrop-blur-sm z-50 flex items-center justify-center p-6">
          <div className="bg-white border border-slate-250 p-6 rounded-3xl w-full max-w-sm space-y-6 relative shadow-2xl text-slate-800 border-t-8 border-t-indigo-600">
            <button
              onClick={() => setShowCheckoutDrawer(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>

            <div>
              <span className="text-[9px] font-mono text-indigo-600 uppercase tracking-widest block font-bold">SECURE PAYMENT TOKEN</span>
              <h3 className="text-slate-900 font-display font-bold text-base mt-0.5">Secure Mentor Payment</h3>
            </div>

            <div className="space-y-2 border-b border-slate-100 pb-3.5 text-xs text-slate-500">
              <div className="flex justify-between">
                <span>1:1 consultation slot price</span>
                <span className="text-slate-850 font-bold">${selectedMentor.price}</span>
              </div>
              <div className="flex justify-between">
                <span>Format discount</span>
                <span className="text-slate-850 font-bold">
                  {bookingType === "group" ? `-$${Math.round(selectedMentor.price * 0.6)} (Group masterclass discount)` : "$0.00"}
                </span>
              </div>
              {discountApplied && (
                <div className="flex justify-between text-emerald-700 font-bold">
                  <span>Coupon discount (LUMINA50)</span>
                  <span>-${bookingType === "group" ? Math.round(selectedMentor.price * 0.2) : selectedMentor.price / 2}</span>
                </div>
              )}
              <div className="flex justify-between text-slate-900 font-bold text-sm pt-2.5 border-t border-slate-150">
                <span>Total due</span>
                <span className="text-indigo-600">
                  ${discountApplied 
                    ? (bookingType === "group" ? Math.round(selectedMentor.price * 0.2) : selectedMentor.price / 2) 
                    : (bookingType === "group" ? Math.round(selectedMentor.price * 0.4) : selectedMentor.price)
                  }
                </span>
              </div>
            </div>

            <div className="space-y-3">
              <div className="space-y-1">
                <span className="text-[9px] font-mono text-slate-400 uppercase block">Credit Card Token</span>
                <div className="relative">
                  <input
                    type="text"
                    value={cardNumber}
                    onChange={(e) => setCardNumber(e.target.value)}
                    className="w-full pl-9 pr-3 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-900 focus:outline-none"
                  />
                  <CreditCard className="absolute left-3 top-2.5 w-3.5 h-3.5 text-slate-400" />
                </div>
              </div>

              <div className="space-y-1">
                <span className="text-[9px] font-mono text-slate-400 uppercase block">Coupon code</span>
                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="Enter LUMINA50"
                    value={couponCode}
                    onChange={(e) => setCouponCode(e.target.value)}
                    className="w-full px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-xs focus:outline-none"
                  />
                  <button
                    onClick={handleApplyCoupon}
                    className="px-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-xs font-semibold cursor-pointer"
                  >
                    Apply
                  </button>
                </div>
              </div>
            </div>

            <button
              onClick={() => {
                handleFinalizeBooking();
                setShowCheckoutDrawer(false);
              }}
              className="w-full py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold rounded-xl flex items-center justify-center gap-1.5 cursor-pointer shadow-md"
            >
              <Check className="w-4 h-4" />
              <span>Transact Payment</span>
            </button>
          </div>
        </div>
      )}

      {/* Mentor product purchase checkout popup */}
      {productCheckoutId && (
        <div className="fixed inset-0 bg-black/45 backdrop-blur-sm z-50 flex items-center justify-center p-6">
          <div className="bg-white border border-slate-250 p-6 rounded-3xl w-full max-w-sm space-y-4 relative shadow-2xl text-slate-800">
            <button
              onClick={() => setProductCheckoutId(null)}
              className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>

            <div>
              <span className="text-[9px] font-mono text-indigo-600 uppercase block font-semibold">BUY RESOURCE INSTANTLY</span>
              <h3 className="text-slate-900 font-display font-bold text-sm mt-0.5">
                Confirm: "{storeItems.find(p => p.id === productCheckoutId)?.title}"
              </h3>
            </div>

            <div className="flex justify-between items-center text-xs text-slate-500 py-3 border-y border-slate-100">
              <span>Immediate payment amount:</span>
              <span className="text-slate-850 font-bold font-mono text-sm">
                ${storeItems.find(p => p.id === productCheckoutId)?.price} USD
              </span>
            </div>

            <div className="space-y-1">
              <span className="text-[9px] font-mono text-slate-400 uppercase block">Simulated Card Token</span>
              <input
                type="text"
                disabled
                value="•••• •••• •••• 4444"
                className="w-full px-3 py-1.5 bg-slate-50 border border-slate-250 rounded-lg text-xs"
              />
            </div>

            <button
              onClick={() => handlePurchaseProduct(productCheckoutId)}
              className="w-full py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold rounded-xl flex items-center justify-center gap-1.5 cursor-pointer shadow-md"
            >
              <Check className="w-4 h-4" />
              <span>Confirm &amp; Purchase</span>
            </button>
          </div>
        </div>
      )}

    </div>
  );
}
