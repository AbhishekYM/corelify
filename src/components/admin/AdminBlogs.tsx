import React, { useState } from "react";
import { FileText, Plus, Trash2, Tag, ShieldCheck, Globe } from "lucide-react";
import { BlogPost } from "../../types";

interface AdminBlogsProps {
  blogs: BlogPost[];
  setBlogs: React.Dispatch<React.SetStateAction<BlogPost[]>>;
  onAddNotification: (title: string, description: string, type: "message" | "alert" | "recommendation" | "application") => void;
}

export default function AdminBlogs({ blogs, setBlogs, onAddNotification }: AdminBlogsProps) {
  const [subTab, setSubTab] = useState<"manage" | "categories" | "moderation" | "seo">("manage");

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <span className="text-xs font-bold text-slate-800">Blog Management</span>
        <button className="px-3 py-1.5 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold rounded-xl flex items-center gap-1.5 shadow">
          <Plus className="w-3.5 h-3.5" /><span>Publish Post</span>
        </button>
      </div>

      <div className="flex gap-2 border-b border-slate-200 pb-2 overflow-x-auto">
        <button onClick={() => setSubTab("manage")} className={`px-3 py-1.5 rounded-lg text-[10px] font-bold flex items-center gap-1 ${subTab === "manage" ? "bg-slate-200 text-slate-800" : "text-slate-500 hover:bg-slate-100"}`}><FileText className="w-3 h-3"/> Manage Posts</button>
        <button onClick={() => setSubTab("categories")} className={`px-3 py-1.5 rounded-lg text-[10px] font-bold flex items-center gap-1 ${subTab === "categories" ? "bg-slate-200 text-slate-800" : "text-slate-500 hover:bg-slate-100"}`}><Tag className="w-3 h-3"/> Categories</button>
        <button onClick={() => setSubTab("moderation")} className={`px-3 py-1.5 rounded-lg text-[10px] font-bold flex items-center gap-1 ${subTab === "moderation" ? "bg-slate-200 text-slate-800" : "text-slate-500 hover:bg-slate-100"}`}><ShieldCheck className="w-3 h-3"/> Moderation</button>
        <button onClick={() => setSubTab("seo")} className={`px-3 py-1.5 rounded-lg text-[10px] font-bold flex items-center gap-1 ${subTab === "seo" ? "bg-slate-200 text-slate-800" : "text-slate-500 hover:bg-slate-100"}`}><Globe className="w-3 h-3"/> SEO</button>
      </div>

      {subTab === "manage" && (
        <div className="bg-white rounded-2xl border border-slate-200/80 overflow-hidden text-xs">
          <table className="w-full text-left">
            <thead className="bg-slate-50 text-slate-400 font-semibold border-b border-slate-200">
              <tr><th className="p-4">Title & Author</th><th className="p-4">Category</th><th className="p-4">Date</th><th className="p-4 text-right">Actions</th></tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {blogs.map(b => (
                <tr key={b.id}>
                  <td className="p-4"><span className="font-bold text-slate-900 block">{b.title}</span><span className="text-[10px] text-slate-400">By {b.author}</span></td>
                  <td className="p-4"><span className="px-2 py-0.5 bg-slate-100 rounded-full">{b.category}</span></td>
                  <td className="p-4 font-mono text-[10px]">{b.date}</td>
                  <td className="p-4 text-right">
                    <button onClick={() => { setBlogs(blogs.filter(x => x.id !== b.id)); onAddNotification("Deleted", "Post removed", "alert"); }} className="p-1 text-rose-500 hover:bg-rose-50 rounded"><Trash2 className="w-4 h-4" /></button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {subTab === "categories" && (
        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 text-xs">
          <h3 className="font-bold mb-3 text-slate-800">Blog Categories</h3>
          <div className="flex flex-wrap gap-2">
            {["Technology", "Career Advice", "Industry News", "Community"].map((cat) => (
              <span key={cat} className="px-3 py-1.5 bg-indigo-50 text-indigo-700 rounded-lg flex items-center gap-2 border border-indigo-100">{cat}</span>
            ))}
          </div>
        </div>
      )}

      {subTab === "moderation" && (
        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 text-xs">
          <h3 className="font-bold mb-3 text-slate-800">Community Post Moderation</h3>
          <p className="text-slate-500 mb-4">Review posts submitted by community members before publishing.</p>
          <div className="p-4 border border-slate-200 rounded-xl bg-slate-50">
            <p className="text-slate-400 italic">No posts pending review.</p>
          </div>
        </div>
      )}

      {subTab === "seo" && (
        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 text-xs">
          <h3 className="font-bold mb-3 text-slate-800">Blog SEO Management</h3>
          <p className="text-slate-500 mb-4">Manage meta tags and URL slugs for individual posts.</p>
          <div className="space-y-4">
            {blogs.slice(0,2).map(b => (
              <div key={b.id} className="p-4 border border-slate-200 rounded-xl">
                <span className="font-bold block mb-2">{b.title}</span>
                <div className="space-y-2">
                  <div><label className="text-[10px] text-slate-400">Slug</label><input className="w-full p-2 border rounded text-xs font-mono" defaultValue={`/blog/${b.id}`} /></div>
                  <div><label className="text-[10px] text-slate-400">Meta Title</label><input className="w-full p-2 border rounded text-xs" defaultValue={`${b.title} | Lumina Blog`} /></div>
                  <div><label className="text-[10px] text-slate-400">Meta Description</label><input className="w-full p-2 border rounded text-xs" defaultValue={b.title} /></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
