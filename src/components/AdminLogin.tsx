import React, { useState } from "react";
import { Lock, Mail, ArrowRight, AlertCircle, ShieldCheck, Eye, EyeOff } from "lucide-react";
import { AdminProfile } from "../types";

interface AdminLoginProps {
  onLogin: (profile: AdminProfile) => void;
  onBack: () => void;
}

export default function AdminLogin({ onLogin, onBack }: AdminLoginProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!email || !password) {
      setError("Please enter both email and password.");
      return;
    }

    setLoading(true);

    setTimeout(() => {
      let role: "Admin" | "Instructor" | "Student" | "Employer" | "Institution" = "Admin";
      let name = "Alex (System Admin)";

      if (email.toLowerCase().includes("instructor") || email.toLowerCase().includes("mentor")) {
        role = "Instructor";
        name = "Jordan (Instructor)";
      } else if (email.toLowerCase().includes("student")) {
        role = "Student";
        name = "Taylor (Student)";
      } else if (email.toLowerCase().includes("employer")) {
        role = "Employer";
        name = "Acme Corp (Employer)";
      } else if (email.toLowerCase().includes("school") || email.toLowerCase().includes("institution")) {
        role = "Institution";
        name = "Stanford (Institution)";
      }

      onLogin({
        fullName: name,
        email: email,
        role: role,
        avatar: "https://picsum.photos/seed/l3exxlz/800/600"
      });
      setLoading(false);
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex font-sans">

      {/* ── LEFT PANEL ── */}
      <div className="hidden lg:flex flex-col w-[480px] shrink-0 bg-[#0B0F59] relative overflow-hidden">
        {/* Ambient glows */}
        <div className="absolute top-0 left-0 w-[400px] h-[400px] bg-indigo-500/10 rounded-full blur-[100px]" />
        <div className="absolute bottom-0 right-0 w-[300px] h-[300px] bg-violet-500/10 rounded-full blur-[80px]" />

        {/* Logo */}
        <div className="relative z-10 p-10">
          <img
            src="https://corelify.io/store/1/CORELIFY%20LOGO.png"
            alt="Corelify Logo"
            className="h-8 w-auto brightness-0 invert"
          />
        </div>

        {/* Center content */}
        <div className="relative z-10 flex-1 flex flex-col justify-center px-10 pb-16">
          <div className="inline-flex items-center gap-2 bg-indigo-500/10 border border-indigo-400/20 px-3 py-1.5 rounded-full mb-6 w-fit">
            <ShieldCheck className="w-3.5 h-3.5 text-indigo-300" />
            <span className="text-[10px] font-semibold text-indigo-300 uppercase tracking-widest">Admin Portal</span>
          </div>

          <h1 className="text-4xl font-display font-bold text-white leading-tight mb-4">
            Control Panel<br />
            <span className="text-indigo-300">Access</span>
          </h1>

          <p className="text-indigo-200/70 text-sm leading-relaxed mb-10">
            Manage courses, users, mentors, scholarships, and platform content from the Corelify administration dashboard.
          </p>

          {/* Feature list */}
          <div className="space-y-4">
            {[
              "Manage all courses & instructors",
              "Monitor user enrollment & activity",
              "Review support tickets & reports",
              "Configure platform settings",
            ].map((item) => (
              <div key={item} className="flex items-center gap-3">
                <div className="w-5 h-5 bg-indigo-500/20 border border-indigo-400/30 rounded-full flex items-center justify-center shrink-0">
                  <div className="w-1.5 h-1.5 bg-indigo-400 rounded-full" />
                </div>
                <span className="text-indigo-100/80 text-[12px] font-medium">{item}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom decoration */}
        <div className="relative z-10 px-10 pb-8">
          <div className="border-t border-indigo-800/60 pt-6 flex items-center justify-between">
            <span className="text-[10px] text-indigo-400/60 font-medium">© 2026 Corelify Edu Systems</span>
            <div className="flex items-center gap-1.5 text-[10px] text-indigo-400/60 font-medium">
              <Lock className="w-3 h-3" />
              Secured
            </div>
          </div>
        </div>
      </div>

      {/* ── RIGHT PANEL ── */}
      <div className="flex-1 flex items-center justify-center p-6 relative">
        {/* Ambient bg glows */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-100/30 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-violet-100/20 rounded-full blur-[120px] pointer-events-none" />

        <div className="w-full max-w-md relative z-10">
          {/* Mobile logo */}
          <div className="lg:hidden flex justify-center mb-8">
            <img
              src="https://corelify.io/store/1/CORELIFY%20LOGO.png"
              alt="Corelify Logo"
              className="h-10 w-auto"
            />
          </div>

          {/* Card */}
          <div className="bg-white border border-slate-200 rounded-3xl p-8 shadow-xl shadow-slate-200/50">

            {/* Header */}
            <div className="mb-8">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-9 h-9 bg-[#0B0F59] rounded-xl flex items-center justify-center shadow-lg shadow-indigo-900/30">
                  <ShieldCheck className="w-4.5 h-4.5 text-white" style={{ width: 18, height: 18 }} />
                </div>
                <span className="text-[10px] font-bold tracking-widest text-slate-400 uppercase">Admin Authentication</span>
              </div>
              <h2 className="text-2xl font-display font-bold text-slate-900 leading-tight">
                Sign in to<br />Control Panel
              </h2>
              <p className="text-slate-500 text-xs mt-2">Enter your administrator credentials to continue</p>
            </div>

            {/* Error message */}
            {error && (
              <div className="mb-5 p-3 bg-rose-50 border border-rose-200 rounded-xl flex items-center gap-3 text-rose-600 text-xs">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{error}</span>
              </div>
            )}

            <form onSubmit={handleLogin} className="space-y-4">

              {/* Email */}
              <div className="space-y-1.5">
                <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider">
                  Work Email
                </label>
                <div className="relative">
                  <Mail className="absolute left-3.5 top-3 w-4 h-4 text-slate-400" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:bg-white focus:border-[#0B0F59] focus:ring-2 focus:ring-[#0B0F59]/10 transition-all"
                    placeholder="admin@corelify.com"
                  />
                </div>
              </div>

              {/* Password */}
              <div className="space-y-1.5">
                <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider">
                  Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-3.5 top-3 w-4 h-4 text-slate-400" />
                  <input
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full pl-10 pr-10 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:bg-white focus:border-[#0B0F59] focus:ring-2 focus:ring-[#0B0F59]/10 transition-all"
                    placeholder="••••••••"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3.5 top-3 text-slate-400 hover:text-slate-600 transition-colors cursor-pointer"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {/* Submit */}
              <button
                type="submit"
                disabled={loading}
                className="w-full flex justify-center items-center gap-2 py-3 px-4 bg-[#0B0F59] hover:bg-indigo-900 text-white text-sm font-bold rounded-xl transition-all shadow-lg shadow-indigo-900/20 disabled:opacity-60 disabled:cursor-not-allowed mt-2 cursor-pointer"
              >
                {loading ? (
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                ) : (
                  <>
                    Sign In to Control Panel
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </form>

            {/* Hint text */}
            <p className="text-center text-[10px] text-slate-400 mt-5 leading-relaxed">
              Use any email with <span className="font-mono font-semibold text-slate-500">instructor</span>, <span className="font-mono font-semibold text-slate-500">student</span>, or <span className="font-mono font-semibold text-slate-500">employer</span> in the address to login as different roles.
            </p>
          </div>

          {/* Back link */}
          <div className="mt-6 flex flex-col items-center gap-3">
            <button
              onClick={onBack}
              className="text-xs text-slate-500 hover:text-[#0B0F59] transition-colors inline-flex items-center gap-1.5 font-medium cursor-pointer"
            >
              <ArrowRight className="w-3.5 h-3.5 rotate-180" />
              Return to Homepage
            </button>
            <div className="flex items-center gap-1.5 text-[10px] text-slate-400 font-medium">
              <Lock className="w-3 h-3" />
              <span>Secure Mock Authentication Environment</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
