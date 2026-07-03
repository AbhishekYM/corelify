import React, { useState } from "react";
import { BookOpen, Plus, Trash2, CheckCircle, Ban, Tag, Users, Activity, ShieldCheck, X } from "lucide-react";
import { Course } from "../../types";

interface AdminCoursesProps {
  courses: Course[];
  setCourses: React.Dispatch<React.SetStateAction<Course[]>>;
  onAddNotification: (title: string, description: string, type: "message" | "alert" | "recommendation" | "application") => void;
}

export default function AdminCourses({ courses, setCourses, onAddNotification }: AdminCoursesProps) {
  const [subTab, setSubTab] = useState<"manage" | "categories" | "instructors" | "approvals" | "analytics">("manage");
  
  const [showCourseModal, setShowCourseModal] = useState(false);
  const [courseForm, setCourseForm] = useState({
    title: "", provider: "Lumina Academy", category: "Design", level: "Beginner" as "Beginner" | "Intermediate" | "Advanced",
    instructor: "", duration: "10h 00m", price: 49, description: "", curriculumTitle: "Course Overview"
  });

  const [categories, setCategories] = useState(["Design", "Engineering", "Product", "Marketing"]);
  const [newCat, setNewCat] = useState("");

  const [instructors, setInstructors] = useState(["Dr. Alan Turing", "Grace Hopper", "Design Faculty"]);
  const [newInst, setNewInst] = useState("");

  const handleCreateCourse = (e: React.FormEvent) => {
    e.preventDefault();
    const newCourse: Course = {
      id: `course-${Date.now()}`,
      title: courseForm.title, provider: courseForm.provider, category: courseForm.category, level: courseForm.level,
      rating: 5.0, reviewCount: 1, instructor: courseForm.instructor || "Lumina Faculty", duration: courseForm.duration,
      lessonsCount: 8, enrolled: false, progress: 0, image: "https://picsum.photos/seed/8g2iiod/800/600",
      description: courseForm.description, price: courseForm.price,
      curriculum: [{ id: `cur-${Date.now()}`, title: courseForm.curriculumTitle, lessons: [{ id: `les-${Date.now()}-1`, title: "Kickoff", duration: "45m", isCompleted: false }] }]
    };
    setCourses([...courses, newCourse]);
    onAddNotification("Course Added", `"${courseForm.title}" is submitted for approval.`, "recommendation");
    setShowCourseModal(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <span className="text-xs font-bold text-slate-800">Course Administration</span>
        <button onClick={() => setShowCourseModal(true)} className="px-3 py-1.5 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold rounded-xl flex items-center gap-1.5 shadow">
          <Plus className="w-3.5 h-3.5" /><span>Create Course</span>
        </button>
      </div>

      {/* Sub-navigation for requested features */}
      <div className="flex gap-2 border-b border-slate-200 pb-2 overflow-x-auto">
        <button onClick={() => setSubTab("manage")} className={`px-3 py-1.5 rounded-lg text-[10px] font-bold ${subTab === "manage" ? "bg-slate-200 text-slate-800" : "text-slate-500 hover:bg-slate-100"}`}>Manage Courses & Pricing</button>
        <button onClick={() => setSubTab("categories")} className={`px-3 py-1.5 rounded-lg text-[10px] font-bold flex items-center gap-1 ${subTab === "categories" ? "bg-slate-200 text-slate-800" : "text-slate-500 hover:bg-slate-100"}`}><Tag className="w-3 h-3"/> Categories</button>
        <button onClick={() => setSubTab("instructors")} className={`px-3 py-1.5 rounded-lg text-[10px] font-bold flex items-center gap-1 ${subTab === "instructors" ? "bg-slate-200 text-slate-800" : "text-slate-500 hover:bg-slate-100"}`}><Users className="w-3 h-3"/> Instructors</button>
        <button onClick={() => setSubTab("approvals")} className={`px-3 py-1.5 rounded-lg text-[10px] font-bold flex items-center gap-1 ${subTab === "approvals" ? "bg-slate-200 text-slate-800" : "text-slate-500 hover:bg-slate-100"}`}><ShieldCheck className="w-3 h-3"/> Moderation & Approvals</button>
        <button onClick={() => setSubTab("analytics")} className={`px-3 py-1.5 rounded-lg text-[10px] font-bold flex items-center gap-1 ${subTab === "analytics" ? "bg-slate-200 text-slate-800" : "text-slate-500 hover:bg-slate-100"}`}><Activity className="w-3 h-3"/> Analytics</button>
      </div>

      {subTab === "manage" && (
        <div className="bg-white rounded-2xl border border-slate-200/80 overflow-hidden text-xs">
          <table className="w-full text-left">
            <thead className="bg-slate-50 text-slate-400 font-semibold border-b border-slate-200">
              <tr>
                <th className="p-4">Title & Provider</th><th className="p-4">Instructor</th><th className="p-4">Category</th><th className="p-4">Pricing</th><th className="p-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {courses.map(c => (
                <tr key={c.id}>
                  <td className="p-4"><span className="font-bold text-slate-900 block">{c.title}</span><span className="text-[10px] text-slate-400">{c.provider}</span></td>
                  <td className="p-4 font-mono text-[10px]">{c.instructor}</td>
                  <td className="p-4"><span className="px-2 py-0.5 bg-slate-100 rounded-full">{c.category}</span></td>
                  <td className="p-4 font-bold text-emerald-600">${c.price || 0}</td>
                  <td className="p-4 text-right">
                    <button onClick={() => { setCourses(courses.filter(x => x.id !== c.id)); onAddNotification("Deleted", "Course removed", "alert"); }} className="p-1 text-rose-500 hover:bg-rose-50 rounded"><Trash2 className="w-4 h-4" /></button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {subTab === "categories" && (
        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 text-xs">
          <h3 className="font-bold mb-3 text-slate-800">Course Categories</h3>
          <div className="flex gap-2 mb-4">
            <input type="text" value={newCat} onChange={e=>setNewCat(e.target.value)} placeholder="New Category Name" className="flex-1 p-2 border rounded-xl focus:border-indigo-500 outline-none" />
            <button onClick={() => { if(newCat) { setCategories([...categories, newCat]); setNewCat(""); } }} className="px-3 bg-indigo-600 text-white rounded-xl font-bold">Add</button>
          </div>
          <div className="flex flex-wrap gap-2">
            {categories.map((cat, i) => (
              <span key={i} className="px-3 py-1.5 bg-indigo-50 text-indigo-700 rounded-lg flex items-center gap-2 border border-indigo-100">
                {cat} <button onClick={() => setCategories(categories.filter(c => c !== cat))}><X className="w-3 h-3 hover:text-rose-500" /></button>
              </span>
            ))}
          </div>
        </div>
      )}

      {subTab === "instructors" && (
        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 text-xs">
          <h3 className="font-bold mb-3 text-slate-800">Instructor Management</h3>
          <div className="flex gap-2 mb-4">
            <input type="text" value={newInst} onChange={e=>setNewInst(e.target.value)} placeholder="Instructor Name / ID" className="flex-1 p-2 border rounded-xl focus:border-indigo-500 outline-none" />
            <button onClick={() => { if(newInst) { setInstructors([...instructors, newInst]); setNewInst(""); } }} className="px-3 bg-indigo-600 text-white rounded-xl font-bold">Assign</button>
          </div>
          <ul className="space-y-2">
            {instructors.map((inst, i) => (
              <li key={i} className="p-3 bg-slate-50 border rounded-xl flex justify-between items-center">
                <span className="font-bold">{inst}</span>
                <button onClick={() => setInstructors(instructors.filter(c => c !== inst))} className="text-rose-500 hover:underline text-[10px]">Revoke Access</button>
              </li>
            ))}
          </ul>
        </div>
      )}

      {subTab === "approvals" && (
        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 text-xs">
          <h3 className="font-bold mb-3 text-slate-800">Content Moderation & Approvals</h3>
          <p className="text-slate-500 mb-4">Review courses submitted by instructors before they go live on the platform.</p>
          <div className="p-4 border border-dashed border-slate-300 rounded-xl flex items-center justify-between">
            <div>
              <span className="font-bold block">Draft: Advanced Node.js Architectures</span>
              <span className="text-[10px] text-slate-400">By: Grace Hopper</span>
            </div>
            <div className="flex gap-2">
              <button onClick={() => onAddNotification("Approved", "Course published to catalog.", "recommendation")} className="px-3 py-1.5 bg-green-500 text-white rounded-lg flex items-center gap-1"><CheckCircle className="w-3 h-3"/> Approve</button>
              <button onClick={() => onAddNotification("Rejected", "Course sent back for revisions.", "alert")} className="px-3 py-1.5 bg-rose-500 text-white rounded-lg flex items-center gap-1"><Ban className="w-3 h-3"/> Reject</button>
            </div>
          </div>
        </div>
      )}

      {subTab === "analytics" && (
        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 text-xs">
          <h3 className="font-bold mb-3 text-slate-800">Course Level Analytics</h3>
          <div className="grid grid-cols-3 gap-4">
            <div className="p-4 bg-indigo-50 text-indigo-800 rounded-xl">
              <span className="block text-[10px] uppercase font-mono">Total Course Revenue</span>
              <span className="text-xl font-bold">${courses.reduce((acc, c) => acc + (c.price || 0)*12, 0)}</span>
            </div>
            <div className="p-4 bg-emerald-50 text-emerald-800 rounded-xl">
              <span className="block text-[10px] uppercase font-mono">Average Completion Rate</span>
              <span className="text-xl font-bold">64%</span>
            </div>
            <div className="p-4 bg-amber-50 text-amber-800 rounded-xl">
              <span className="block text-[10px] uppercase font-mono">Pending Reviews</span>
              <span className="text-xl font-bold">14</span>
            </div>
          </div>
        </div>
      )}

      {showCourseModal && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <form onSubmit={handleCreateCourse} className="bg-white rounded-2xl max-w-lg w-full border border-slate-200 p-6 space-y-4">
            <div className="flex justify-between items-center border-b border-slate-100 pb-2">
              <span className="font-bold text-slate-900">Create New Course</span>
              <button type="button" onClick={() => setShowCourseModal(false)} className="text-slate-400 hover:text-slate-600"><X className="w-4 h-4" /></button>
            </div>
            <div className="grid grid-cols-2 gap-3 text-xs">
              <div className="col-span-2">
                <label className="text-[10px] font-mono text-slate-400 block mb-1">Title</label>
                <input required value={courseForm.title} onChange={e=>setCourseForm({...courseForm, title:e.target.value})} className="w-full p-2 border rounded-xl" />
              </div>
              <div>
                <label className="text-[10px] font-mono text-slate-400 block mb-1">Category</label>
                <select value={courseForm.category} onChange={e=>setCourseForm({...courseForm, category:e.target.value})} className="w-full p-2 border rounded-xl">
                  {categories.map(c => <option key={c} value={c}>{c}</option>)}
                </select>
              </div>
              <div>
                <label className="text-[10px] font-mono text-slate-400 block mb-1">Pricing (USD)</label>
                <input type="number" required value={courseForm.price} onChange={e=>setCourseForm({...courseForm, price:Number(e.target.value)})} className="w-full p-2 border rounded-xl" />
              </div>
            </div>
            <div className="flex justify-end gap-2.5 pt-4">
              <button type="button" onClick={() => setShowCourseModal(false)} className="px-4 py-2 bg-slate-100 rounded-xl">Cancel</button>
              <button type="submit" className="px-4 py-2 bg-indigo-600 text-white rounded-xl shadow-lg">Save Course</button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
