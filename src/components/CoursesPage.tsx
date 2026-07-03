import React from "react";
import PublicHeader from "./PublicHeader";
import PublicFooter from "./PublicFooter";

export default function CoursesPage() {
  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <PublicHeader />
      <main className="flex-1 py-12 px-6">
        <div className="max-w-[1400px] mx-auto text-center">
          <h1 className="text-4xl font-display font-bold text-slate-900 mb-4">All Courses</h1>
          <p className="text-slate-600 max-w-2xl mx-auto">Explore our extensive catalog of courses designed to help you master new skills and advance your career.</p>
          
          <div className="mt-16 p-12 bg-white rounded-2xl border border-slate-200 shadow-sm flex flex-col items-center justify-center min-h-[400px]">
            <div className="w-16 h-16 bg-indigo-100 text-indigo-600 rounded-full flex items-center justify-center mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
            </div>
            <h2 className="text-xl font-bold text-slate-800 mb-2">Courses Directory</h2>
            <p className="text-sm text-slate-500">This page is currently under construction. Check back soon for our full course catalog.</p>
          </div>
        </div>
      </main>
      <PublicFooter />
    </div>
  );
}
