import React, { useState } from "react";
import { Mail, Lock, ShieldCheck, Sparkles, Chrome, Github, ArrowRight, ArrowLeft, Upload, CheckCircle2, User, UserCheck, Eye, EyeOff } from "lucide-react";
import { motion } from "motion/react";
import { UserProfile } from "../types";

interface AuthFlowProps {
  onAuthSuccess: (profile: Partial<UserProfile>) => void;
  onBackToLanding?: () => void;
  initialScreen?: "login" | "signup";
}

type ScreenType = "login" | "signup" | "forgot" | "otp" | "reset-password" | "verified" | "onboarding-1" | "onboarding-2";

export default function AuthFlow({ onAuthSuccess, onBackToLanding, initialScreen }: AuthFlowProps) {
  const [screen, setScreen] = useState<ScreenType>(initialScreen || "login");
  const [email, setEmail] = useState("abhishek.makwana@sapphiresolutions.net");
  const [password, setPassword] = useState("••••••••");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [fullName, setFullName] = useState("Abhishek Makwana");
  const [otp, setOtp] = useState(["", "", "", ""]);
  const [loading, setLoading] = useState(false);
  const [isResetFlow, setIsResetFlow] = useState(false);

  // Onboarding parameters
  const [roleSelection, setRoleSelection] = useState("Design");
  const [selectedSkills, setSelectedSkills] = useState<string[]>([]);
  const [uploadedFileName, setUploadedFileName] = useState<string | null>(null);

  const availableSkillsByRole: Record<string, string[]> = {
    Design: ["Figma", "Design Systems", "Framer", "Prototyping", "UX Research", "Motion Design"],
    Frontend: ["React", "TypeScript", "Tailwind CSS", "Next.js", "Vite", "Zustand", "HTML/CSS"],
    Backend: ["Node.js", "Express", "PostgreSQL", "MongoDB", "Docker", "API Design", "System Design"],
    PM: ["Product Spec", "User Research", "Agile", "SQL", "Metrics", "Roadmapping"]
  };

  const handleToggleSkill = (skill: string) => {
    if (selectedSkills.includes(skill)) {
      setSelectedSkills(selectedSkills.filter(s => s !== skill));
    } else {
      setSelectedSkills([...selectedSkills, skill]);
    }
  };

  const handleNextStep = (next: ScreenType) => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setScreen(next);
    }, 600);
  };

  const handleCompleteOnboarding = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      // Construct onboarded profile details
      onAuthSuccess({
        fullName,
        email,
        headline: `${roleSelection === "Design" ? "Product Designer" : roleSelection + " Engineer"} & Craftsperson`,
        skills: selectedSkills.length > 0 ? selectedSkills : availableSkillsByRole[roleSelection].slice(0, 4),
        resumeUrl: uploadedFileName || "abhishek_resume_2026.pdf"
      });
    }, 800);
  };

  const handleOtpChange = (index: number, val: string) => {
    if (val.length > 1) return;
    const newOtp = [...otp];
    newOtp[index] = val;
    setOtp(newOtp);

    // Focus next input
    if (val !== "" && index < 3) {
      const nextInput = document.getElementById(`otp-${index + 1}`);
      nextInput?.focus();
    }
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex font-sans">

      {/* ── LEFT PANEL ── */}
      <div className="hidden lg:flex flex-col w-[440px] shrink-0 bg-[#0B0F59] relative overflow-hidden">
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
            <span className="text-[10px] font-semibold text-indigo-300 uppercase tracking-widest">Learning Ecosystem</span>
          </div>

          <h1 className="text-4xl font-display font-bold text-white leading-tight mb-4">
            Accelerate your<br />
            <span className="text-indigo-300">digital craft</span>
          </h1>

          <p className="text-indigo-200/70 text-sm leading-relaxed mb-10">
            Join thousands of developers and designers building careers with Corelify's AI-powered mentorship ecosystem.
          </p>

          {/* Feature list */}
          <div className="space-y-4">
            {[
              "AI-matched courses for your skill gaps",
              "1:1 sessions with staff-level mentors",
              "Live internships & job applications",
              "Portfolio builder with AI feedback",
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

          <div className="w-full bg-white border border-slate-200 rounded-3xl p-8 shadow-xl shadow-slate-200/50 relative overflow-hidden">
            {/* Loading overlay */}
            {loading && (
              <div className="absolute inset-0 bg-white/80 backdrop-blur-sm z-50 flex flex-col items-center justify-center gap-3">
                <div className="w-8 h-8 border-2 border-[#0B0F59] border-t-transparent rounded-full animate-spin" />
                <span className="text-xs text-slate-500 font-mono">Setting up your workspace...</span>
              </div>
            )}

            {/* Back navigation */}
            <button
              onClick={() => {
                if (screen === "login") onBackToLanding();
                else if (screen === "signup") setScreen("login");
                else if (screen === "forgot") setScreen("login");
                else if (screen === "otp") setScreen(isResetFlow ? "forgot" : "signup");
                else if (screen === "reset-password") setScreen("otp");
                else if (screen === "onboarding-1") setScreen("verified");
                else if (screen === "onboarding-2") setScreen("onboarding-1");
              }}
              className="absolute top-6 left-6 text-slate-400 hover:text-[#0B0F59] transition-colors flex items-center gap-1.5 text-xs font-medium cursor-pointer"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back</span>
            </button>

            {/* Auth branding */}
            <div className="text-center mb-7 pt-4">
              <img src="https://corelify.io/store/1/CORELIFY%20LOGO.png" alt="Corelify Logo" className="h-10 w-auto mx-auto mb-3" />
              <h2 className="font-display font-bold text-xl text-slate-900 tracking-tight">Welcome Back</h2>
              <p className="text-slate-500 text-xs mt-1">Sign in to continue to your workspace</p>
            </div>

            {/* SCREEN 1: LOGIN */}
            {screen === "login" && (
              <div className="space-y-5">
                <div className="space-y-1">
                  <label className="text-[10px] text-slate-400 font-mono uppercase block">Corporate Email Address</label>
                  <div className="relative">
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full pl-9 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-none focus:bg-white focus:border-indigo-600 focus:ring-1 focus:ring-indigo-600 transition-all placeholder:text-slate-400"
                      placeholder="name@company.com"
                    />
                    <Mail className="absolute left-3 top-2.5 w-3.5 h-3.5 text-slate-400" />
                  </div>
                </div>

                <div className="space-y-1">
                  <div className="flex justify-between items-center">
                    <label className="text-[10px] text-slate-400 font-mono uppercase block">Account Password</label>
                    <button
                      onClick={() => { setIsResetFlow(true); setScreen("forgot"); }}
                      className="text-[10px] text-indigo-600 font-mono hover:underline cursor-pointer"
                    >
                      Forgot?
                    </button>
                  </div>
                  <div className="relative">
                    <input
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full pl-9 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-none focus:bg-white focus:border-indigo-600 focus:ring-1 focus:ring-indigo-600 transition-all placeholder:text-slate-400"
                    />
                    <Lock className="absolute left-3 top-2.5 w-3.5 h-3.5 text-slate-400" />
                  </div>
                </div>

                <button
                  onClick={() => handleNextStep("onboarding-1")}
                  className="w-full py-2.5 bg-[#0B0F59] hover:bg-indigo-900 text-white text-xs font-semibold rounded-xl transition-all shadow-lg shadow-indigo-900/20 flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  Sign In to Workspace
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>

                {/* Social Logins */}
                <div className="relative flex py-2 items-center">
                  <div className="flex-grow border-t border-slate-200"></div>
                  <span className="flex-shrink mx-3 text-slate-400 font-mono text-[9px] uppercase">Or Authenticate with</span>
                  <div className="flex-grow border-t border-slate-200"></div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <button
                    onClick={() => handleNextStep("onboarding-1")}
                    className="py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium text-slate-600 hover:text-slate-800 hover:bg-slate-100 hover:border-slate-350 transition-all flex items-center justify-center gap-2 cursor-pointer shadow-sm"
                  >
                    <Chrome className="w-3.5 h-3.5" />
                    <span>Google</span>
                  </button>
                  <button
                    onClick={() => handleNextStep("onboarding-1")}
                    className="py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium text-slate-600 hover:text-slate-800 hover:bg-slate-100 hover:border-slate-350 transition-all flex items-center justify-center gap-2 cursor-pointer shadow-sm"
                  >
                    <Github className="w-3.5 h-3.5" />
                    <span>GitHub</span>
                  </button>
                </div>

                <p className="text-center text-xs text-slate-500 pt-2">
                  New to Corelify?{" "}
                  <button onClick={() => setScreen("signup")} className="text-indigo-650 hover:underline font-semibold cursor-pointer">
                    Create account
                  </button>
                </p>
              </div>
            )}

            {/* SCREEN 2: SIGNUP */}
            {screen === "signup" && (
              <div className="space-y-5">
                <div className="space-y-1">
                  <label className="text-[10px] text-slate-400 font-mono uppercase block">Full Name</label>
                  <div className="relative">
                    <input
                      type="text"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      className="w-full pl-9 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-none focus:bg-white focus:border-indigo-600 focus:ring-1 focus:ring-indigo-600 transition-all placeholder:text-slate-400"
                      placeholder="Abhishek Makwana"
                    />
                    <User className="absolute left-3 top-2.5 w-3.5 h-3.5 text-slate-400" />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] text-slate-400 font-mono uppercase block">Email or Phone</label>
                  <div className="relative">
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full pl-9 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-none focus:bg-white focus:border-indigo-600 focus:ring-1 focus:ring-indigo-600 transition-all placeholder:text-slate-400"
                      placeholder="name@company.com"
                    />
                    <Mail className="absolute left-3 top-2.5 w-3.5 h-3.5 text-slate-400" />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] text-slate-400 font-mono uppercase block">Define Password</label>
                  <div className="relative">
                    <input
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full pl-9 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-none focus:bg-white focus:border-indigo-600 focus:ring-1 focus:ring-indigo-600 transition-all placeholder:text-slate-400"
                    />
                    <Lock className="absolute left-3 top-2.5 w-3.5 h-3.5 text-slate-400" />
                  </div>
                </div>

                <button
                  onClick={() => { setIsResetFlow(false); handleNextStep("otp"); }}
                  className="w-full py-2.5 bg-[#0B0F59] hover:bg-indigo-900 text-white text-xs font-semibold rounded-xl transition-all shadow-lg shadow-indigo-900/20 flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  Generate Verification Code
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>

                {/* Social Logins */}
                <div className="relative flex py-2 items-center">
                  <div className="flex-grow border-t border-slate-200"></div>
                  <span className="flex-shrink mx-3 text-slate-400 font-mono text-[9px] uppercase">Or Sign up with</span>
                  <div className="flex-grow border-t border-slate-200"></div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <button
                    onClick={() => handleNextStep("onboarding-1")}
                    className="py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium text-slate-600 hover:text-slate-800 hover:bg-slate-100 hover:border-slate-350 transition-all flex items-center justify-center gap-2 cursor-pointer shadow-sm"
                  >
                    <Chrome className="w-3.5 h-3.5" />
                    <span>Google</span>
                  </button>
                  <button
                    onClick={() => handleNextStep("onboarding-1")}
                    className="py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium text-slate-600 hover:text-slate-800 hover:bg-slate-100 hover:border-slate-350 transition-all flex items-center justify-center gap-2 cursor-pointer shadow-sm"
                  >
                    <Github className="w-3.5 h-3.5" />
                    <span>GitHub</span>
                  </button>
                </div>

                <p className="text-center text-xs text-slate-500 pt-2">
                  Already have an account?{" "}
                  <button onClick={() => setScreen("login")} className="text-indigo-650 hover:underline font-semibold cursor-pointer">
                    Sign In
                  </button>
                </p>
              </div>
            )}

            {/* SCREEN 3: FORGOT PASSWORD */}
            {screen === "forgot" && (
              <div className="space-y-5">
                <p className="text-xs text-slate-500 leading-relaxed text-center">
                  Enter your email below. We will transmit a 4-digit verification code to reset your credential matrix.
                </p>
                <div className="space-y-1">
                  <label className="text-[10px] text-slate-400 font-mono uppercase block">Registered Email</label>
                  <div className="relative">
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full pl-9 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-none focus:bg-white focus:border-indigo-600 focus:ring-1 focus:ring-indigo-600 transition-all placeholder:text-slate-400"
                      placeholder="name@company.com"
                    />
                    <Mail className="absolute left-3 top-2.5 w-3.5 h-3.5 text-slate-400" />
                  </div>
                </div>

                <button
                  onClick={() => handleNextStep("otp")}
                  className="w-full py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold rounded-xl transition-all shadow-lg flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  Transmit Code
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            )}

            {/* SCREEN 4: OTP VERIFICATION */}
            {screen === "otp" && (
              <div className="space-y-6 text-center">
                <p className="text-xs text-slate-500 leading-relaxed">
                  Transmit complete. Type the 4-digit token synced to your inbox:
                </p>

                <div className="flex justify-center gap-3">
                  {otp.map((digit, i) => (
                    <input
                      key={i}
                      id={`otp-${i}`}
                      type="text"
                      maxLength={1}
                      value={digit}
                      onChange={(e) => handleOtpChange(i, e.target.value)}
                      className="w-12 h-12 text-center bg-slate-50 border border-slate-200 focus:border-indigo-600 focus:bg-white focus:ring-1 focus:ring-indigo-600 rounded-xl text-lg font-bold text-slate-800 focus:outline-none transition-all"
                    />
                  ))}
                </div>

                <button
                  onClick={() => handleNextStep(isResetFlow ? "reset-password" : "verified")}
                  className="w-full py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold rounded-xl transition-all shadow-lg flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  Verify Token
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>

                <p className="text-[10px] text-slate-450 font-mono">
                  Didn't receive? <button className="text-indigo-600 hover:underline cursor-pointer">Resend Token</button> (59s)
                </p>
              </div>
            )}

            {/* SCREEN 4.5: RESET PASSWORD */}
            {screen === "reset-password" && (
              <div className="space-y-4">
                <div>
                  <span className="text-[9px] font-mono text-indigo-600 uppercase tracking-wider block mb-1 font-bold">Secure your account</span>
                  <h3 className="text-slate-800 font-display font-medium text-base mb-4">Create a new password</h3>
                </div>
                <div>
                  <label className="text-[10px] text-slate-400 font-mono uppercase block mb-1">New Password</label>
                  <div className="relative">
                    <input
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full pl-9 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-none focus:bg-white focus:border-indigo-600 transition-all"
                      placeholder="••••••••"
                    />
                    <Lock className="absolute left-3 top-2.5 w-3.5 h-3.5 text-slate-400" />
                  </div>
                </div>

                <div>
                  <label className="text-[10px] text-slate-400 font-mono uppercase block mb-1">Retype New Password</label>
                  <div className="relative">
                    <input
                      type="password"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      className="w-full pl-9 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-none focus:bg-white focus:border-indigo-600 transition-all"
                      placeholder="••••••••"
                    />
                    <Lock className="absolute left-3 top-2.5 w-3.5 h-3.5 text-slate-400" />
                  </div>
                </div>

                <button
                  onClick={() => handleNextStep("login")}
                  className="w-full py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold rounded-xl transition-all shadow-lg flex items-center justify-center gap-1.5 cursor-pointer mt-2"
                >
                  Reset Password & Login
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            )}

            {/* SCREEN 5: VERIFIED STATUS */}
            {screen === "verified" && (
              <div className="text-center space-y-6 py-4">
                <div className="w-14 h-14 bg-emerald-50 text-emerald-600 border border-emerald-200 rounded-full flex items-center justify-center mx-auto shadow-lg shadow-emerald-500/5">
                  <CheckCircle2 className="w-7 h-7" />
                </div>
                <div>
                  <h3 className="text-lg font-display font-semibold text-slate-800">Email Verified Successfully</h3>
                  <p className="text-slate-500 text-xs mt-1">Let's set up your custom career workspace profile.</p>
                </div>
                <button
                  onClick={() => handleNextStep("onboarding-1")}
                  className="w-full py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold rounded-xl transition-all shadow-lg flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  Begin Profile Builder
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            )}

            {/* SCREEN 6: ONBOARDING DISCIPLINE */}
            {screen === "onboarding-1" && (
              <div className="space-y-6">
                <div>
                  <span className="text-[9px] font-mono text-indigo-600 uppercase tracking-wider block mb-1 font-bold">Step 1 of 2</span>
                  <h3 className="text-slate-800 font-display font-medium text-base">Select your primary discipline</h3>
                  <p className="text-slate-500 text-xs">This feeds into our dynamic AI job recommendations algorithm.</p>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  {["Design", "Frontend", "Backend", "PM"].map((role) => (
                    <button
                      key={role}
                      onClick={() => {
                        setRoleSelection(role);
                        setSelectedSkills([]);
                      }}
                      className={`p-4 rounded-xl border text-left transition-all cursor-pointer ${roleSelection === role
                          ? "bg-indigo-50 border-indigo-450 text-indigo-800 shadow-sm"
                          : "bg-slate-50 border-slate-200 text-slate-600 hover:border-slate-300 hover:text-slate-800 hover:bg-slate-100"
                        }`}
                    >
                      <span className="font-display font-medium text-xs block">{role}</span>
                      <span className="text-[10px] text-slate-400 block mt-1 leading-normal">
                        {role === "Design" ? "UI/UX, tokens" : role === "Frontend" ? "React, Tailwind" : role === "Backend" ? "Node, SQL" : "Roadmaps, specs"}
                      </span>
                    </button>
                  ))}
                </div>

                <button
                  onClick={() => handleNextStep("onboarding-2")}
                  className="w-full py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold rounded-xl transition-all shadow-lg flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  Continue to Skills Mapping
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            )}

            {/* SCREEN 7: ONBOARDING SKILLS & RESUME */}
            {screen === "onboarding-2" && (
              <div className="space-y-5">
                <div>
                  <span className="text-[9px] font-mono text-indigo-600 uppercase tracking-wider block mb-1 font-bold">Step 2 of 2</span>
                  <h3 className="text-slate-800 font-display font-medium text-base">Verify your active skills</h3>
                  <p className="text-slate-500 text-xs">Tap to check the skill tags you are currently confident with:</p>
                </div>

                <div className="flex flex-wrap gap-1.5">
                  {availableSkillsByRole[roleSelection].map((skill) => {
                    const isSelected = selectedSkills.includes(skill);
                    return (
                      <button
                        key={skill}
                        onClick={() => handleToggleSkill(skill)}
                        className={`px-3 py-1.5 rounded-full text-xs font-medium border transition-all cursor-pointer ${isSelected
                            ? "bg-indigo-50 border-indigo-300 text-indigo-750"
                            : "bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100 hover:border-slate-300 hover:text-slate-800"
                          }`}
                      >
                        {skill}
                      </button>
                    );
                  })}
                </div>

                {/* Resume Upload Drag Sandbox */}
                <div className="space-y-1.5">
                  <label className="text-[10px] text-slate-400 font-mono uppercase block">Add your PDF Resume (Optional)</label>
                  <div
                    onClick={() => setUploadedFileName("abhishek_resume_verified_2026.pdf")}
                    className="border border-dashed border-slate-200 hover:border-indigo-400 bg-slate-50 p-4 rounded-xl text-center cursor-pointer transition-colors"
                  >
                    <Upload className="w-5 h-5 text-slate-400 mx-auto mb-2" />
                    <span className="text-[10px] text-slate-600 block font-medium">
                      {uploadedFileName ? (
                        <span className="text-emerald-600 font-mono font-semibold">{uploadedFileName} uploaded</span>
                      ) : (
                        "Click to simulate dragging PDF resume"
                      )}
                    </span>
                    <span className="text-[9px] text-slate-400 block mt-0.5">Supports PDF up to 10MB</span>
                  </div>
                </div>

                <button
                  onClick={handleCompleteOnboarding}
                  className="w-full py-2.5 bg-gradient-to-tr from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 text-white text-xs font-semibold rounded-xl transition-all shadow-lg flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  Launch Corelify Workspace
                  <Sparkles className="w-3.5 h-3.5" />
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
