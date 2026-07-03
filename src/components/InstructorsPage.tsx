import React from "react";
import PublicHeader from "./PublicHeader";
import PublicFooter from "./PublicFooter";

export default function InstructorsPage() {
  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <PublicHeader />
      <main className="flex-1 py-12 px-6">
        <div className="max-w-[1400px] mx-auto text-center">
          <h1 className="text-4xl font-display font-bold text-slate-900 mb-4">Meet Our Instructors</h1>
          <p className="text-slate-600 max-w-2xl mx-auto">Learn from industry experts, thought leaders, and passionate educators from around the globe.</p>
          
          <div className="mt-16 p-12 bg-white rounded-2xl border border-slate-200 shadow-sm flex flex-col items-center justify-center min-h-[400px]">
            <div className="w-16 h-16 bg-indigo-100 text-indigo-600 rounded-full flex items-center justify-center mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
            </div>
            <h2 className="text-xl font-bold text-slate-800 mb-2">Instructors Directory</h2>
            <p className="text-sm text-slate-500">This page is currently under construction. Check back soon for our full list of instructors.</p>
          </div>
        </div>
      </main>
      <PublicFooter />
    </div>
  );
}
