import React, { useState } from "react";
import { Search, BookOpen, Bookmark, MessageSquare, ArrowLeft, Send, ThumbsUp, AlertCircle } from "lucide-react";
import { BlogPost, BlogComment } from "../types";

interface CommunityBlogsModuleProps {
  blogs: BlogPost[];
  setBlogs: React.Dispatch<React.SetStateAction<BlogPost[]>>;
}

export default function CommunityBlogsModule({ blogs, setBlogs }: CommunityBlogsModuleProps) {
  const [selectedBlogId, setSelectedBlogId] = useState<string | null>("blog-1");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  // Comments state
  const [newComment, setNewComment] = useState("");

  const filteredBlogs = blogs.filter((b) => {
    const matchesSearch = b.title.toLowerCase().includes(searchQuery.toLowerCase()) || b.snippet.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCat = selectedCategory === "All" || b.category === selectedCategory;
    return matchesSearch && matchesCat;
  });

  const selectedBlog = blogs.find((b) => b.id === selectedBlogId) || blogs[0];

  const handleToggleBookmark = (id: string) => {
    setBlogs(
      blogs.map((b) => {
        if (b.id === id) {
          return {
            ...b,
            bookmarked: !b.bookmarked,
            bookmarksCount: b.bookmarked ? b.bookmarksCount - 1 : b.bookmarksCount + 1
          };
        }
        return b;
      })
    );
  };

  const handleAddComment = (blogId: string) => {
    if (newComment.trim() === "") return;

    const commentObj: BlogComment = {
      id: `c-${Date.now()}`,
      author: "Abhishek Makwana",
      comment: newComment,
      date: "Just now"
    };

    setBlogs(
      blogs.map((b) => {
        if (b.id === blogId) {
          return {
            ...b,
            comments: [...b.comments, commentObj]
          };
        }
        return b;
      })
    );
    setNewComment("");
  };

  return (
    <div className="h-full flex flex-col md:flex-row gap-6 select-none font-sans overflow-hidden">
      {/* LEFT: Articles List & categories */}
      <div className="w-full md:w-80 flex flex-col gap-4 shrink-0 overflow-y-auto pr-1">
        <h3 className="text-slate-800 font-display font-semibold text-sm border-b border-slate-200 pb-2">Ecosystem Blogs</h3>

        {/* Search */}
        <div className="relative">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search articles..."
            className="w-full pl-9 pr-3 py-1.5 bg-white border border-slate-200 rounded-lg text-xs text-slate-850 focus:outline-none focus:border-indigo-600 focus:ring-1 focus:ring-indigo-600 transition-colors"
          />
          <Search className="absolute left-3 top-2.5 w-3.5 h-3.5 text-slate-400" />
        </div>

        {/* Categories toggler */}
        <div className="space-y-1.5">
          <span className="text-[10px] text-slate-400 font-mono uppercase block font-semibold">Filter Category</span>
          <div className="flex flex-wrap gap-1.5">
            {["All", "Design Systems", "Design"].map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-2 py-1 rounded text-[10px] font-medium border transition-colors cursor-pointer ${
                  selectedCategory === cat
                    ? "bg-indigo-50 text-indigo-700 border-indigo-200 font-semibold shadow-sm"
                    : "bg-slate-50 border-slate-200 text-slate-500 hover:text-slate-900 hover:bg-slate-100"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Article listings */}
        <div className="space-y-3 pt-2">
          {filteredBlogs.map((b) => {
            const isSelected = b.id === selectedBlogId;
            return (
              <div
                key={b.id}
                onClick={() => setSelectedBlogId(b.id)}
                className={`p-3.5 border rounded-xl cursor-pointer transition-all ${
                  isSelected ? "bg-indigo-50/50 border-indigo-500 shadow-sm" : "bg-white border-slate-200 hover:border-slate-300 shadow-sm"
                }`}
              >
                <div className="flex justify-between items-center text-[9px] font-mono text-slate-400">
                  <span>{b.category}</span>
                  <span>{b.readTime}</span>
                </div>

                <h4 className="text-slate-800 font-display font-semibold text-xs mt-1.5 line-clamp-2 leading-tight">{b.title}</h4>
                <p className="text-slate-500 text-[10px] line-clamp-1 mt-0.5">{b.snippet}</p>

                <div className="flex justify-between items-center pt-3 mt-3 border-t border-slate-100 text-[9px] text-slate-400">
                  <span>{b.author}</span>
                  <div className="flex gap-2 text-slate-400">
                    <span className="flex items-center gap-0.5">
                      <Bookmark className={`w-2.5 h-2.5 ${b.bookmarked ? "fill-indigo-600 text-indigo-600" : ""}`} />
                      <span>{b.bookmarksCount}</span>
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* RIGHT: Selected Article Reader view */}
      {selectedBlog ? (
        <div className="flex-1 flex flex-col gap-6 overflow-y-auto pb-6">
          {/* Header metadata */}
          <div className="border-b border-slate-200 pb-4 space-y-3">
            <div>
              <span className="text-[9px] font-mono text-indigo-600 uppercase tracking-widest font-semibold">{selectedBlog.category}</span>
              <h2 className="text-xl font-display font-bold text-slate-900 tracking-tight mt-0.5 leading-snug">{selectedBlog.title}</h2>
            </div>

            <div className="flex justify-between items-center flex-wrap gap-3 text-xs">
              <div className="flex gap-2.5 items-center">
                <span className="w-8 h-8 rounded-full bg-indigo-50 border border-indigo-200 flex items-center justify-center font-bold text-indigo-700 text-[11px] shadow-sm">
                  {selectedBlog.author.split(" ")[0][0]}{selectedBlog.author.split(" ")[1]?.[0] || ""}
                </span>
                <div>
                  <span className="text-slate-850 font-bold block">{selectedBlog.author}</span>
                  <span className="text-[10px] text-slate-400 block leading-none mt-0.5">{selectedBlog.authorRole} &bull; {selectedBlog.date}</span>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleToggleBookmark(selectedBlog.id)}
                  className={`p-2 rounded-lg border transition-all cursor-pointer ${
                    selectedBlog.bookmarked
                      ? "bg-indigo-50 border-indigo-300 text-indigo-700 shadow-sm"
                      : "bg-white border-slate-200 text-slate-400 hover:text-slate-950 hover:bg-slate-50"
                  }`}
                >
                  <Bookmark className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          <div className="grid lg:grid-cols-3 gap-6">
            {/* Article Content */}
            <div className="lg:col-span-2 space-y-4">
              <img src={selectedBlog.image} alt={selectedBlog.title} className="w-full h-56 object-cover border border-slate-200 rounded-2xl mb-4 shadow-sm" />
              <div className="text-slate-750 text-xs leading-relaxed space-y-4 whitespace-pre-line font-sans">
                {selectedBlog.content}
              </div>
            </div>

            {/* Comment Section Panel */}
            <div className="space-y-4">
              <span className="text-[10px] text-slate-400 font-mono uppercase block font-semibold">Thread Discussions</span>

              <div className="space-y-3">
                {selectedBlog.comments.map((comment) => (
                  <div key={comment.id} className="p-3 bg-slate-50 border border-slate-150 rounded-xl space-y-1 shadow-sm">
                    <div className="flex justify-between text-[10px] font-mono">
                      <span className="text-slate-800 font-semibold">{comment.author}</span>
                      <span className="text-slate-400">{comment.date}</span>
                    </div>
                    <p className="text-slate-600 text-[11px] leading-relaxed">"{comment.comment}"</p>
                  </div>
                ))}

                {selectedBlog.comments.length === 0 && (
                  <p className="text-slate-400 text-center text-[10px] italic py-6">No discussions logged yet. Be the first to reply!</p>
                )}
              </div>

              <div className="flex gap-2 pt-3 border-t border-slate-100">
                <input
                  type="text"
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleAddComment(selectedBlog.id)}
                  placeholder="Leave comment feedback..."
                  className="w-full px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-800 focus:outline-none focus:bg-white focus:border-indigo-600 placeholder:text-slate-400 transition-colors"
                />
                <button
                  onClick={() => handleAddComment(selectedBlog.id)}
                  className="px-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-xs font-semibold cursor-pointer shadow-sm"
                >
                  Reply
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex-1 flex flex-col items-center justify-center text-center p-12 text-slate-400">
          <AlertCircle className="w-8 h-8 mb-2 text-slate-300" />
          <p className="text-xs">Select an article from list to open reader.</p>
        </div>
      )}
    </div>
  );
}
