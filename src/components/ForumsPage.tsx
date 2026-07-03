import React from "react";
import PublicHeader from "./PublicHeader";
import PublicFooter from "./PublicFooter";

export default function ForumsPage() {
  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <PublicHeader />
      <main className="flex-1 py-12 px-6">
        <div className="max-w-[1400px] mx-auto text-center">
          <h1 className="text-4xl font-display font-bold text-slate-900 mb-4">Community Forums</h1>
          <p className="text-slate-600 max-w-2xl mx-auto">Connect with other learners, ask questions, share your projects, and grow together.</p>
          
          <div className="mt-16 p-12 bg-white rounded-2xl border border-slate-200 shadow-sm flex flex-col items-center justify-center min-h-[400px]">
            <div className="w-16 h-16 bg-indigo-100 text-indigo-600 rounded-full flex items-center justify-center mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z" />
              </svg>
            </div>
            <h2 className="text-xl font-bold text-slate-800 mb-2">Forums</h2>
            <p className="text-sm text-slate-500">The community forums are currently being set up. Stay tuned!</p>
          </div>
        </div>
      </main>
      <PublicFooter />
    </div>
  );
}
