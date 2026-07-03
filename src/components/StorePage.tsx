import React from "react";
import PublicHeader from "./PublicHeader";
import PublicFooter from "./PublicFooter";

export default function StorePage() {
  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <PublicHeader />
      <main className="flex-1 py-12 px-6">
        <div className="max-w-[1400px] mx-auto text-center">
          <h1 className="text-4xl font-display font-bold text-slate-900 mb-4">Corelify Store</h1>
          <p className="text-slate-600 max-w-2xl mx-auto">Get official merchandise, exclusive study materials, and premium resources.</p>
          
          <div className="mt-16 p-12 bg-white rounded-2xl border border-slate-200 shadow-sm flex flex-col items-center justify-center min-h-[400px]">
            <div className="w-16 h-16 bg-indigo-100 text-indigo-600 rounded-full flex items-center justify-center mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
              </svg>
            </div>
            <h2 className="text-xl font-bold text-slate-800 mb-2">Store Opening Soon</h2>
            <p className="text-sm text-slate-500">Our digital and physical merchandise store is currently under construction.</p>
          </div>
        </div>
      </main>
      <PublicFooter />
    </div>
  );
}
