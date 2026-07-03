import React, { useState } from "react";
import { Search, Calendar, MapPin, Clock, Users, ArrowRight, CheckCircle2, Video, Ticket } from "lucide-react";
import { Workshop } from "../types";

interface WorkshopsModuleProps {
  workshops: Workshop[];
  setWorkshops: React.Dispatch<React.SetStateAction<Workshop[]>>;
  onAddNotification: (title: string, desc: string, type: "message" | "alert" | "recommendation" | "application") => void;
}

export default function WorkshopsModule({ workshops, setWorkshops, onAddNotification }: WorkshopsModuleProps) {
  const [activeTab, setActiveTab] = useState<"upcoming" | "registered">("upcoming");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredWorkshops = workshops.filter(w => {
    const matchesTab = activeTab === "registered" ? w.registered : !w.registered;
    const matchesSearch = w.title.toLowerCase().includes(searchQuery.toLowerCase()) || w.host.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesTab && matchesSearch;
  });

  const handleRegister = (id: string) => {
    const workshop = workshops.find(w => w.id === id);
    if (!workshop) return;

    setWorkshops(workshops.map(w => w.id === id ? { ...w, registered: true, registrants: w.registrants + 1 } : w));
    onAddNotification("Workshop Registration Confirmed", `You have successfully registered for ${workshop.title}.`, "application");
  };

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-800">Live Workshops</h2>
          <p className="text-sm text-slate-500 mt-1">Interactive sessions with industry leaders and experts.</p>
        </div>
        <div className="relative w-full md:w-72">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
          <input
            type="text"
            placeholder="Search workshops..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2 bg-white border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 shadow-sm"
          />
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-6 border-b border-slate-200">
        <button
          onClick={() => setActiveTab("upcoming")}
          className={`pb-4 text-sm font-medium transition-colors relative ${activeTab === "upcoming" ? "text-indigo-600" : "text-slate-500 hover:text-slate-700"}`}
        >
          Discover Workshops
          {activeTab === "upcoming" && <span className="absolute bottom-0 left-0 w-full h-0.5 bg-indigo-600 rounded-t-full" />}
        </button>
        <button
          onClick={() => setActiveTab("registered")}
          className={`pb-4 text-sm font-medium transition-colors relative flex items-center gap-2 ${activeTab === "registered" ? "text-indigo-600" : "text-slate-500 hover:text-slate-700"}`}
        >
          My Registrations
          <span className="px-2 py-0.5 bg-slate-100 text-slate-600 text-[10px] rounded-full font-bold">
            {workshops.filter(w => w.registered).length}
          </span>
          {activeTab === "registered" && <span className="absolute bottom-0 left-0 w-full h-0.5 bg-indigo-600 rounded-t-full" />}
        </button>
      </div>

      {/* Grid */}
      {filteredWorkshops.length === 0 ? (
        <div className="text-center py-20 bg-white border border-slate-200 rounded-2xl border-dashed">
          <Ticket className="w-12 h-12 text-slate-300 mx-auto mb-3" />
          <h3 className="text-slate-800 font-semibold mb-1">No workshops found</h3>
          <p className="text-slate-500 text-sm">
            {activeTab === "registered" ? "You haven't registered for any workshops yet." : "Try adjusting your search query."}
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredWorkshops.map((workshop) => (
            <div key={workshop.id} className="bg-white rounded-2xl border border-slate-200/80 overflow-hidden hover:shadow-xl hover:shadow-indigo-900/5 transition-all group flex flex-col">
              <div className="h-40 bg-slate-100 relative overflow-hidden">
                <img src={workshop.image} alt={workshop.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                <div className="absolute top-3 left-3 px-2 py-1 bg-white/90 backdrop-blur-md rounded-lg text-[10px] font-bold text-slate-700 flex items-center gap-1 shadow-sm">
                  <Video className="w-3 h-3 text-indigo-500" /> Online
                </div>
                {workshop.price === 0 && (
                  <div className="absolute top-3 right-3 px-2 py-1 bg-emerald-500 text-white rounded-lg text-[10px] font-bold shadow-sm">
                    FREE
                  </div>
                )}
              </div>
              
              <div className="p-5 flex flex-col flex-1">
                <div className="flex items-start justify-between gap-4 mb-2">
                  <h3 className="font-bold text-slate-800 text-lg leading-tight group-hover:text-indigo-600 transition-colors">{workshop.title}</h3>
                </div>
                <p className="text-sm text-slate-500 line-clamp-2 mb-4">{workshop.description}</p>
                
                <div className="space-y-2 mb-6">
                  <div className="flex items-center gap-2 text-xs text-slate-600">
                    <Calendar className="w-3.5 h-3.5 text-slate-400" />
                    <span>{workshop.date} at {workshop.time}</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-slate-600">
                    <Clock className="w-3.5 h-3.5 text-slate-400" />
                    <span>{workshop.duration} Session</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-slate-600">
                    <Users className="w-3.5 h-3.5 text-slate-400" />
                    <span>{workshop.registrants} Attending • Hosted by <strong>{workshop.host}</strong> ({workshop.company})</span>
                  </div>
                </div>
                
                <div className="mt-auto pt-4 border-t border-slate-100 flex items-center justify-between">
                  {workshop.price > 0 ? (
                    <span className="font-bold text-slate-800">${workshop.price}</span>
                  ) : (
                    <span className="font-bold text-emerald-600">Free Access</span>
                  )}
                  
                  {workshop.registered ? (
                    <button disabled className="px-4 py-2 bg-emerald-50 text-emerald-700 rounded-xl text-xs font-semibold flex items-center gap-1.5 border border-emerald-200">
                      <CheckCircle2 className="w-4 h-4" /> Registered
                    </button>
                  ) : (
                    <button 
                      onClick={() => handleRegister(workshop.id)}
                      className="px-4 py-2 bg-slate-900 hover:bg-indigo-600 text-white rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-colors"
                    >
                      Reserve Spot <ArrowRight className="w-3 h-3" />
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
