import React, { useState } from "react";
import PublicHeader from "./PublicHeader";
import PublicFooter from "./PublicFooter";
import { INITIAL_BLOGS } from "../data";
import { Search, Clock, User, Bookmark, MessageSquare, ArrowLeft, Send, Sparkles } from "lucide-react";

export default function BlogsPage() {
  const [blogs, setBlogs] = useState(INITIAL_BLOGS);
  const [selectedBlogId, setSelectedBlogId] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [newComment, setNewComment] = useState("");
  const [commentsList, setCommentsList] = useState<Record<string, typeof INITIAL_BLOGS[0]['comments']>>({});

  const filteredBlogs = blogs.filter((b) => {
    const matchesSearch = b.title.toLowerCase().includes(searchQuery.toLowerCase()) || b.snippet.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCat = selectedCategory === "All" || b.category === selectedCategory;
    return matchesSearch && matchesCat;
  });

  const selectedBlog = blogs.find((b) => b.id === selectedBlogId);

  const handleToggleBookmark = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
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

    const commentObj = {
      id: `c-${Date.now()}`,
      author: "Guest Reader",
      comment: newComment,
      date: "Just now"
    };

    const currentComments = commentsList[blogId] || selectedBlog?.comments || [];
    setCommentsList({
      ...commentsList,
      [blogId]: [...currentComments, commentObj]
    });
    setNewComment("");
  };

  const getBlogComments = (blogId: string) => {
    return commentsList[blogId] || blogs.find(b => b.id === blogId)?.comments || [];
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 font-sans">
      <PublicHeader />
      
      <main className="flex-1 py-12 px-6">
        <div className="max-w-[1400px] mx-auto">
          
          {!selectedBlogId ? (
            /* ── BLOG LISTING VIEW ── */
            <div className="space-y-10">
              
              {/* Hero Banner */}
              <div className="relative bg-gradient-to-r from-[#0B0F59] via-indigo-950 to-slate-900 rounded-3xl p-8 md:p-12 text-white overflow-hidden shadow-xl text-center md:text-left">
                <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-550/10 rounded-full blur-3xl" />
                <div className="relative z-10 max-w-2xl space-y-4">
                  <div className="inline-flex items-center gap-1.5 bg-white/10 backdrop-blur-md px-3 py-1 rounded-full text-[10px] font-semibold tracking-wider uppercase">
                    <Sparkles className="w-3 h-3 text-amber-300 fill-amber-300" />
                    <span>Corelify Insights</span>
                  </div>
                  <h1 className="text-3xl md:text-5xl font-display font-bold leading-tight">
                    Ecosystem Articles &amp; Insights
                  </h1>
                  <p className="text-indigo-200 text-xs md:text-sm leading-relaxed">
                    Explore high-fidelity engineering practices, product design tokens hierarchy, and industry reviews curated by verified specialists.
                  </p>
                </div>
              </div>

              {/* Controls bar */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-5">
                
                {/* Categories */}
                <div className="flex flex-wrap gap-2">
                  {["All", "Design Systems", "Design"].map((cat) => (
                    <button
                      key={cat}
                      onClick={() => setSelectedCategory(cat)}
                      className={`px-4 py-2 rounded-xl text-xs font-semibold border transition-all cursor-pointer ${
                        selectedCategory === cat
                          ? "bg-indigo-50 border-indigo-200 text-indigo-750 shadow-sm"
                          : "bg-white border-slate-200 text-slate-550 hover:bg-slate-50"
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>

                {/* Search */}
                <div className="relative w-full sm:w-72">
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search articles..."
                    className="w-full pl-9 pr-3 py-2 bg-white border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-none focus:border-[#0B0F59] transition-all placeholder:text-slate-400"
                  />
                  <Search className="absolute left-3 top-2.5 w-3.5 h-3.5 text-slate-400" />
                </div>
              </div>

              {/* Grid Layout */}
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredBlogs.map((blog) => (
                  <div
                    key={blog.id}
                    onClick={() => setSelectedBlogId(blog.id)}
                    className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm flex flex-col justify-between hover:shadow-md hover:border-indigo-250 transition-all cursor-pointer group"
                  >
                    <div>
                      <div className="relative h-48 overflow-hidden">
                        <img
                          src={blog.image}
                          alt={blog.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                        <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm px-2.5 py-1 rounded-md text-[9px] font-bold text-indigo-700 border border-slate-100 uppercase tracking-wider">
                          {blog.category}
                        </div>
                      </div>
                      <div className="p-5 space-y-3">
                        <div className="flex items-center gap-1.5 text-slate-400 text-[10px] font-mono">
                          <span>{blog.date}</span>
                          <span>&bull;</span>
                          <span>{blog.readTime}</span>
                        </div>
                        <h4 className="text-slate-900 font-display font-semibold text-sm leading-snug group-hover:text-indigo-650 transition-colors line-clamp-2">
                          {blog.title}
                        </h4>
                        <p className="text-slate-500 text-xs line-clamp-2 leading-relaxed">
                          {blog.snippet}
                        </p>
                      </div>
                    </div>

                    <div className="p-5 pt-3 border-t border-slate-100 flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="w-6 h-6 rounded-full bg-indigo-50 border border-indigo-100 text-indigo-700 flex items-center justify-center text-[10px] font-bold">
                          {blog.author.charAt(0)}
                        </div>
                        <div>
                          <span className="text-[10px] font-bold text-slate-800 block leading-none">{blog.author}</span>
                          <span className="text-[8px] text-slate-400 block mt-0.5">{blog.authorRole}</span>
                        </div>
                      </div>

                      <div className="flex items-center gap-3 text-slate-400 text-xs">
                        <button
                          onClick={(e) => handleToggleBookmark(blog.id, e)}
                          className={`flex items-center gap-1 hover:text-indigo-600 transition-colors cursor-pointer ${blog.bookmarked ? "text-indigo-600 font-semibold" : ""}`}
                        >
                          <Bookmark className={`w-3.5 h-3.5 ${blog.bookmarked ? "fill-indigo-600" : ""}`} />
                          <span className="text-[10px] font-mono">{blog.bookmarksCount}</span>
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
                
                {filteredBlogs.length === 0 && (
                  <div className="col-span-full py-16 text-center text-slate-400 text-xs italic">
                    No articles match your search filter criteria.
                  </div>
                )}
              </div>

            </div>
          ) : (
            /* ── BLOG DETAIL READER VIEW ── */
            selectedBlog && (
              <div className="max-w-3xl mx-auto space-y-6">
                
                {/* Back button */}
                <button
                  onClick={() => setSelectedBlogId(null)}
                  className="inline-flex items-center gap-2 text-slate-500 hover:text-[#0B0F59] text-xs font-semibold cursor-pointer transition-colors"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>Back to Articles</span>
                </button>

                <article className="bg-white border border-slate-200 rounded-3xl overflow-hidden shadow-sm">
                  
                  {/* Hero Image */}
                  <img src={selectedBlog.image} alt={selectedBlog.title} className="w-full h-80 object-cover" />
                  
                  <div className="p-8 space-y-6">
                    
                    {/* Header */}
                    <div className="space-y-4">
                      <span className="px-2.5 py-1 bg-indigo-50 border border-indigo-150 text-indigo-700 rounded-md text-[10px] font-bold uppercase tracking-wider">
                        {selectedBlog.category}
                      </span>
                      <h1 className="text-2xl md:text-3xl font-display font-bold text-slate-900 leading-tight">
                        {selectedBlog.title}
                      </h1>
                      
                      {/* Meta */}
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-y border-slate-100 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-9 h-9 rounded-full bg-[#0B0F59] text-white flex items-center justify-center text-xs font-bold shadow-md shadow-indigo-900/10">
                            {selectedBlog.author.charAt(0)}
                          </div>
                          <div>
                            <span className="text-xs font-bold text-slate-800 block leading-tight">{selectedBlog.author}</span>
                            <span className="text-[10px] text-slate-400 block mt-0.5">{selectedBlog.authorRole}</span>
                          </div>
                        </div>
                        <div className="flex items-center gap-4 text-slate-400 text-[10px] font-mono">
                          <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" /> {selectedBlog.readTime}</span>
                          <span>&bull;</span>
                          <span>Published {selectedBlog.date}</span>
                        </div>
                      </div>
                    </div>

                    {/* Content Body */}
                    <div className="prose max-w-none text-slate-600 text-xs md:text-sm leading-relaxed space-y-4 whitespace-pre-line">
                      {selectedBlog.content}
                    </div>

                    {/* Bookmark action */}
                    <div className="pt-6 border-t border-slate-100 flex items-center justify-between">
                      <button
                        onClick={(e) => handleToggleBookmark(selectedBlog.id, e)}
                        className={`flex items-center gap-1.5 px-4 py-2 rounded-xl border text-xs font-semibold cursor-pointer transition-all ${
                          selectedBlog.bookmarked
                            ? "bg-indigo-50 border-indigo-200 text-indigo-750"
                            : "bg-slate-50 border-slate-200 text-slate-550 hover:bg-slate-100"
                        }`}
                      >
                        <Bookmark className={`w-3.5 h-3.5 ${selectedBlog.bookmarked ? "fill-indigo-600" : ""}`} />
                        <span>{selectedBlog.bookmarked ? "Bookmarked!" : "Bookmark Article"}</span>
                      </button>
                    </div>

                  </div>
                </article>

                {/* ── COMMENTS COMPONENT ── */}
                <div className="bg-white border border-slate-200 rounded-3xl p-6 md:p-8 space-y-6 shadow-sm">
                  <h4 className="font-display font-semibold text-sm text-slate-800 border-b border-slate-100 pb-3 flex items-center gap-2">
                    <MessageSquare className="w-4 h-4 text-indigo-500" />
                    <span>Discussions ({getBlogComments(selectedBlog.id).length})</span>
                  </h4>

                  {/* Add comment */}
                  <div className="space-y-2">
                    <label className="text-[10px] text-slate-400 font-mono uppercase block font-semibold">Join the discussion</label>
                    <div className="flex gap-3">
                      <input
                        type="text"
                        value={newComment}
                        onChange={(e) => setNewComment(e.target.value)}
                        placeholder="Write a public comment..."
                        className="flex-grow px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:bg-white focus:border-[#0B0F59] transition-all"
                      />
                      <button
                        onClick={() => handleAddComment(selectedBlog.id)}
                        className="px-4 py-2 bg-[#0B0F59] hover:bg-indigo-900 text-white rounded-xl flex items-center justify-center shrink-0 cursor-pointer shadow-md"
                      >
                        <Send className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>

                  {/* Comments list */}
                  <div className="space-y-4 pt-2">
                    {getBlogComments(selectedBlog.id).map((comment) => (
                      <div key={comment.id} className="p-4 bg-slate-50/50 border border-slate-200/50 rounded-2xl flex gap-3.5 items-start">
                        <div className="w-7 h-7 rounded-full bg-slate-200 text-slate-600 flex items-center justify-center text-[10px] font-bold uppercase shrink-0 border border-slate-200">
                          {comment.author.charAt(0)}
                        </div>
                        <div className="space-y-1 min-w-0">
                          <div className="flex items-center gap-2">
                            <span className="text-[11px] font-bold text-slate-800 leading-none">{comment.author}</span>
                            <span className="text-[9px] text-slate-400 font-mono leading-none">{comment.date}</span>
                          </div>
                          <p className="text-xs text-slate-600 leading-relaxed font-sans mt-1">
                            {comment.comment}
                          </p>
                        </div>
                      </div>
                    ))}

                    {getBlogComments(selectedBlog.id).length === 0 && (
                      <p className="text-center text-slate-400 text-xs italic py-4">No comments posted yet. Be the first to start the discussion!</p>
                    )}
                  </div>

                </div>

              </div>
            )
          )}

        </div>
      </main>

      <PublicFooter />
    </div>
  );
}
