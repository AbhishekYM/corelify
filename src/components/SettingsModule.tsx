import React, { useState } from "react";
import {
  User,
  Shield,
  Bell,
  Link2,
  Sparkles,
  AlertCircle,
  Check,
  Eye,
  GraduationCap,
  Briefcase,
  Sliders,
  CheckCircle,
  Trash2,
  Plus,
  Lock,
  Globe
} from "lucide-react";
import { UserProfile } from "../types";

interface SettingsModuleProps {
  userProfile: UserProfile;
  setUserProfile: React.Dispatch<React.SetStateAction<UserProfile>>;
  onAddNotification: (title: string, desc: string, type: "message" | "alert" | "recommendation" | "application") => void;
}

export default function SettingsModule({ userProfile, setUserProfile, onAddNotification }: SettingsModuleProps) {
  // Navigation: "profile" | "education" | "experience" | "privacy" | "security" | "integrations"
  const [activeSubTab, setActiveSubTab] = useState<"profile" | "education" | "experience" | "privacy" | "security" | "integrations">("profile");

  // Profile local form state
  const [fullName, setFullName] = useState(userProfile.fullName);
  const [headline, setHeadline] = useState(userProfile.headline);
  const [bio, setBio] = useState(userProfile.bio);

  // Skills state (allow adding new custom skills)
  const [skillsList, setSkillsList] = useState<string[]>(userProfile.skills || ["Figma", "Design Systems", "React", "UX Research"]);
  const [newSkillText, setNewSkillText] = useState("");

  // Education state list
  const [educationList, setEducationList] = useState([
    { id: "e1", school: "Stanford University", degree: "B.S. Product Design &amp; Semantics", year: "2024" },
    { id: "e2", school: "Interaction Design Foundation", degree: "Design Systems Specialization", year: "2022" }
  ]);
  const [eduSchool, setEduSchool] = useState("");
  const [eduDegree, setEduDegree] = useState("");
  const [eduYear, setEduYear] = useState("");

  // Work experience list
  const [experienceList, setExperienceList] = useState([
    { id: "w1", company: "Linear App", role: "Product Design Associate", duration: "2024 - Present" },
    { id: "w2", company: "Stripe", role: "Interface Engineering Intern", duration: "2023 - 2024" }
  ]);
  const [workCompany, setWorkCompany] = useState("");
  const [workRole, setWorkRole] = useState("");
  const [workDuration, setWorkDuration] = useState("");

  // Privacy Settings state
  const [profileVisibility, setProfileVisibility] = useState<"public" | "recruiters" | "private">("public");
  const [allowAiMatching, setAllowAiMatching] = useState(true);

  // Connection toggles
  const [connections, setConnections] = useState([
    { id: "figma", name: "Figma App Integration", status: "Connected", desc: "Allows direct syncing of portfolio vector assets and variables." },
    { id: "github", name: "GitHub Developer OAuth", status: "Connected", desc: "Indexes project source repos for AI compatibility evaluation." },
    { id: "google", name: "Google Workspace calendar", status: "Disconnected", desc: "Syncs 1:1 mentor slots directly with your Google Calendar." }
  ]);

  // Calculate dynamic Profile Completion Checklist percentage
  const checklistItems = [
    { label: "Bio Summary Finished", weight: 20, done: bio.trim().length > 10 },
    { label: "Education Credentials Logged", weight: 20, done: educationList.length > 0 },
    { label: "Work Experience Specified", weight: 20, done: experienceList.length > 0 },
    { label: "Skills specialties mapped", weight: 20, done: skillsList.length > 2 },
    { label: "Corporate Integrations Synced", weight: 20, done: connections.some(c => c.status === "Connected") }
  ];

  const profileCompletionPct = checklistItems.reduce((acc, item) => acc + (item.done ? item.weight : 0), 0);

  const handleSaveProfile = () => {
    setUserProfile({
      ...userProfile,
      fullName,
      headline,
      bio,
      skills: skillsList
    });

    onAddNotification(
      "Profile settings saved",
      "All biographical records, bio, and executive skills were successfully saved.",
      "alert"
    );
  };

  const handleAddSkill = () => {
    if (newSkillText.trim() === "") return;
    if (skillsList.includes(newSkillText.trim())) return;
    setSkillsList([...skillsList, newSkillText.trim()]);
    setNewSkillText("");
  };

  const handleDeleteSkill = (tag: string) => {
    setSkillsList(skillsList.filter(s => s !== tag));
  };

  const handleAddEducation = () => {
    if (eduSchool.trim() === "" || eduDegree.trim() === "") return;
    setEducationList([
      ...educationList,
      { id: `edu-${Date.now()}`, school: eduSchool, degree: eduDegree, year: eduYear || "2026" }
    ]);
    setEduSchool("");
    setEduDegree("");
    setEduYear("");
    onAddNotification(
      "Education Record added",
      "New academic verification credential mapped and added to your profile.",
      "alert"
    );
  };

  const handleAddExperience = () => {
    if (workCompany.trim() === "" || workRole.trim() === "") return;
    setExperienceList([
      ...experienceList,
      { id: `work-${Date.now()}`, company: workCompany, role: workRole, duration: workDuration || "2026" }
    ]);
    setWorkCompany("");
    setWorkRole("");
    setWorkDuration("");
    onAddNotification(
      "Work Experience updated",
      "Professional work background indexed for optimized AI recruiter pairing matches.",
      "alert"
    );
  };

  const handleToggleConnection = (id: string) => {
    setConnections(
      connections.map((c) => {
        if (c.id === id) {
          const newStatus = c.status === "Connected" ? "Disconnected" : "Connected";
          if (newStatus === "Connected") {
            onAddNotification(
              "Integration Synced",
              `OAuth handshake mapped to ${c.name} successfully.`,
              "alert"
            );
          }
          return { ...c, status: newStatus };
        }
        return c;
      })
    );
  };

  return (
    <div className="h-full flex flex-col md:flex-row gap-6 select-none font-sans overflow-hidden">
      
      {/* LEFT: Checklist & Settings Subnavigation links */}
      <div className="w-full md:w-80 flex flex-col gap-4 shrink-0 overflow-y-auto pr-1 border-r border-slate-200/60 pb-6">
        
        {/* Dynamic Profile Completion tracking indicator */}
        <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 space-y-3.5">
          <div className="flex justify-between items-center">
            <span className="text-[10px] text-slate-400 font-mono uppercase font-bold">Profile Completion</span>
            <span className="text-indigo-600 font-bold font-mono text-xs">{profileCompletionPct}%</span>
          </div>

          <div className="h-1.5 bg-slate-200 rounded-full overflow-hidden">
            <div className="h-full bg-indigo-600 rounded-full transition-all" style={{ width: `${profileCompletionPct}%` }} />
          </div>

          {/* Checklist elements */}
          <div className="space-y-2 pt-1 text-[11px] text-slate-500">
            {checklistItems.map((item, idx) => (
              <div key={idx} className="flex items-center gap-2">
                <CheckCircle className={`w-3.5 h-3.5 ${item.done ? "text-emerald-650" : "text-slate-300"}`} />
                <span className={item.done ? "text-slate-700" : "text-slate-400"}>{item.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Subnavigation Menu links */}
        <div className="space-y-1.5">
          <span className="text-[10px] text-slate-400 font-mono uppercase block font-bold px-1.5">Settings Directory</span>
          {[
            { id: "profile", label: "Profile biographical" },
            { id: "education", label: "Education Credentials" },
            { id: "experience", label: "Work Background" },
            { id: "privacy", label: "Visibility &amp; Privacy" },
            { id: "security", label: "Credentials Security" },
            { id: "integrations", label: "OAuth Integrations" }
          ].map((sub) => (
            <button
              key={sub.id}
              onClick={() => setActiveSubTab(sub.id as any)}
              className={`w-full p-2.5 rounded-lg text-xs text-left font-medium transition-all cursor-pointer ${
                activeSubTab === sub.id
                  ? "bg-indigo-50 border-l-4 border-l-indigo-650 text-indigo-750 font-bold"
                  : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
              }`}
            >
              <span dangerouslySetInnerHTML={{ __html: sub.label }} />
            </button>
          ))}
        </div>
      </div>

      {/* RIGHT: Active config panel workspace */}
      <div className="flex-grow overflow-y-auto pb-10 pr-1">
        
        {/* SUBTAB 1: BIOGRAPHICAL EDITING */}
        {activeSubTab === "profile" && (
          <div className="space-y-6 max-w-xl pb-6">
            <div className="border-b border-slate-100 pb-3">
              <h3 className="text-slate-850 font-display font-bold text-sm">Personal biographical Coordinate</h3>
              <p className="text-slate-500 text-xs">Set your name, social bio, and manage skills specialties checklist.</p>
            </div>

            <div className="grid grid-cols-2 gap-4 text-xs">
              <div className="space-y-1.5">
                <span className="text-[10px] text-slate-400 font-mono uppercase block font-semibold">Full Legal Name</span>
                <input
                  type="text"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="w-full px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-slate-800 focus:outline-none focus:bg-white focus:border-indigo-600"
                />
              </div>

              <div className="space-y-1.5">
                <span className="text-[10px] text-slate-400 font-mono uppercase block font-semibold">Headline / Specialty Title</span>
                <input
                  type="text"
                  value={headline}
                  onChange={(e) => setHeadline(e.target.value)}
                  className="w-full px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-slate-800 focus:outline-none focus:bg-white focus:border-indigo-600"
                />
              </div>
            </div>

            <div className="space-y-1.5 text-xs">
              <span className="text-[10px] text-slate-400 font-mono uppercase block font-semibold">Public Bio Management</span>
              <textarea
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                rows={4}
                className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg text-slate-855 focus:outline-none focus:bg-white focus:border-indigo-600 placeholder:text-slate-400 leading-relaxed"
              />
            </div>

            {/* SKILLS AND INTERESTS MANAGEMENT */}
            <div className="space-y-3 pt-3 border-t border-slate-100">
              <span className="text-[10px] text-slate-400 font-mono uppercase block font-bold">Skills &amp; Interests Specialties Management</span>
              
              <div className="flex flex-wrap gap-1.5">
                {skillsList.map((skill) => (
                  <span
                    key={skill}
                    className="px-2.5 py-1 bg-indigo-50 border border-indigo-150 text-indigo-800 rounded-full text-xs font-semibold flex items-center gap-1.5"
                  >
                    <span>{skill}</span>
                    <button
                      onClick={() => handleDeleteSkill(skill)}
                      className="text-indigo-400 hover:text-indigo-700 font-bold"
                    >
                      &times;
                    </button>
                  </span>
                ))}
              </div>

              <div className="flex gap-2 max-w-sm text-xs pt-1">
                <input
                  type="text"
                  placeholder="Type skill tag (e.g., Figma variables, UI Design)"
                  value={newSkillText}
                  onChange={(e) => setNewSkillText(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleAddSkill()}
                  className="w-full px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-slate-800 focus:outline-none"
                />
                <button
                  onClick={handleAddSkill}
                  className="px-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg font-semibold cursor-pointer"
                >
                  Add
                </button>
              </div>
            </div>

            <button
              onClick={handleSaveProfile}
              className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold rounded-lg shadow-sm cursor-pointer"
            >
              Save Profile coordinates
            </button>
          </div>
        )}

        {/* SUBTAB 2: EDUCATION MANAGEMENT */}
        {activeSubTab === "education" && (
          <div className="space-y-6 max-w-xl pb-6 text-xs">
            <div className="border-b border-slate-100 pb-3">
              <h3 className="text-slate-850 font-display font-bold text-sm">Education Details Management</h3>
              <p className="text-slate-500 text-xs">Append degrees, specialized certificates, and Stanford design systems courses.</p>
            </div>

            <div className="space-y-4">
              {educationList.map((edu) => (
                <div key={edu.id} className="p-4 bg-white border border-slate-200 rounded-xl flex justify-between items-center shadow-sm">
                  <div className="flex gap-3 items-center">
                    <div className="w-9 h-9 rounded-lg bg-indigo-50 border border-indigo-100 flex items-center justify-center text-indigo-600">
                      <GraduationCap className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-slate-800 text-xs">{edu.school}</h4>
                      <p className="text-slate-500 text-[11px] mt-0.5" dangerouslySetInnerHTML={{ __html: edu.degree }} />
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="text-[10px] font-mono text-slate-400 block">Class of {edu.year}</span>
                    <button
                      onClick={() => setEducationList(educationList.filter(e => e.id !== edu.id))}
                      className="text-slate-400 hover:text-red-500 mt-1"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Add Education form block */}
            <div className="p-5 bg-slate-50 border border-slate-200 rounded-2xl space-y-3.5">
              <span className="font-semibold text-slate-800 block">Add Academic Record</span>
              <div className="grid grid-cols-2 gap-3 text-xs">
                <div className="space-y-1">
                  <span className="text-[10px] text-slate-400 font-mono block">School / University</span>
                  <input
                    type="text"
                    value={eduSchool}
                    onChange={(e) => setEduSchool(e.target.value)}
                    placeholder="e.g. Stanford University"
                    className="w-full px-3 py-1.5 bg-white border border-slate-200 rounded-lg focus:outline-none"
                  />
                </div>
                <div className="space-y-1">
                  <span className="text-[10px] text-slate-400 font-mono block">Graduation Year</span>
                  <input
                    type="text"
                    value={eduYear}
                    onChange={(e) => setEduYear(e.target.value)}
                    placeholder="e.g. 2026"
                    className="w-full px-3 py-1.5 bg-white border border-slate-200 rounded-lg focus:outline-none"
                  />
                </div>
                <div className="space-y-1 col-span-2">
                  <span className="text-[10px] text-slate-400 font-mono block">Degree &amp; Course specialism</span>
                  <input
                    type="text"
                    value={eduDegree}
                    onChange={(e) => setEduDegree(e.target.value)}
                    placeholder="e.g. B.S. Interaction Design systems"
                    className="w-full px-3 py-1.5 bg-white border border-slate-200 rounded-lg focus:outline-none"
                  />
                </div>
              </div>

              <button
                onClick={handleAddEducation}
                className="px-3 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-lg text-xs flex items-center gap-1 cursor-pointer"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Add Record</span>
              </button>
            </div>
          </div>
        )}

        {/* SUBTAB 3: WORK EXPERIENCE MANAGEMENT */}
        {activeSubTab === "experience" && (
          <div className="space-y-6 max-w-xl pb-6 text-xs">
            <div className="border-b border-slate-100 pb-3">
              <h3 className="text-slate-850 font-display font-bold text-sm">Work Experience Details</h3>
              <p className="text-slate-500 text-xs">Document corporate employments to calibrate compatibility indices.</p>
            </div>

            <div className="space-y-4">
              {experienceList.map((exp) => (
                <div key={exp.id} className="p-4 bg-white border border-slate-200 rounded-xl flex justify-between items-center shadow-sm">
                  <div className="flex gap-3 items-center">
                    <div className="w-9 h-9 rounded-lg bg-indigo-50 border border-indigo-100 flex items-center justify-center text-indigo-600">
                      <Briefcase className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-slate-800 text-xs">{exp.company}</h4>
                      <p className="text-slate-500 text-[11px] mt-0.5">{exp.role}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="text-[10px] font-mono text-slate-400 block">{exp.duration}</span>
                    <button
                      onClick={() => setExperienceList(experienceList.filter(e => e.id !== exp.id))}
                      className="text-slate-400 hover:text-red-500 mt-1"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Add Experience form block */}
            <div className="p-5 bg-slate-50 border border-slate-200 rounded-2xl space-y-3.5">
              <span className="font-semibold text-slate-800 block">Add Career Record</span>
              <div className="grid grid-cols-2 gap-3 text-xs">
                <div className="space-y-1">
                  <span className="text-[10px] text-slate-400 font-mono block">Company Name</span>
                  <input
                    type="text"
                    value={workCompany}
                    onChange={(e) => setWorkCompany(e.target.value)}
                    placeholder="e.g. Stripe Inc."
                    className="w-full px-3 py-1.5 bg-white border border-slate-200 rounded-lg focus:outline-none"
                  />
                </div>
                <div className="space-y-1">
                  <span className="text-[10px] text-slate-400 font-mono block">Employment Period</span>
                  <input
                    type="text"
                    value={workDuration}
                    onChange={(e) => setWorkDuration(e.target.value)}
                    placeholder="e.g. 2024 - Present"
                    className="w-full px-3 py-1.5 bg-white border border-slate-200 rounded-lg focus:outline-none"
                  />
                </div>
                <div className="space-y-1 col-span-2">
                  <span className="text-[10px] text-slate-400 font-mono block">Role Designation</span>
                  <input
                    type="text"
                    value={workRole}
                    onChange={(e) => setWorkRole(e.target.value)}
                    placeholder="e.g. Senior Product Design Lead"
                    className="w-full px-3 py-1.5 bg-white border border-slate-200 rounded-lg focus:outline-none"
                  />
                </div>
              </div>

              <button
                onClick={handleAddExperience}
                className="px-3 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-lg text-xs flex items-center gap-1 cursor-pointer"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Add Record</span>
              </button>
            </div>
          </div>
        )}

        {/* SUBTAB 4: PRIVACY SETTINGS PROFILE VISIBILITY */}
        {activeSubTab === "privacy" && (
          <div className="space-y-6 max-w-xl pb-6 text-xs">
            <div className="border-b border-slate-100 pb-3">
              <h3 className="text-slate-850 font-display font-bold text-sm">Privacy Settings &amp; Profile Visibility</h3>
              <p className="text-slate-500 text-xs">Control public routing, SEO caching, and AI recommendation scans visibility.</p>
            </div>

            <div className="p-5 bg-white border border-slate-200 rounded-2xl space-y-4 shadow-sm">
              <div className="space-y-1">
                <span className="text-[10px] text-slate-450 font-mono uppercase font-bold block">Account Exposure Channel</span>
                
                <div className="grid sm:grid-cols-3 gap-3 text-xs pt-1.5">
                  <button
                    onClick={() => setProfileVisibility("public")}
                    className={`p-3.5 border rounded-xl text-left transition-all cursor-pointer ${
                      profileVisibility === "public"
                        ? "bg-indigo-50 border-indigo-300 text-indigo-750 font-semibold"
                        : "bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100"
                    }`}
                  >
                    <Globe className="w-4 h-4 text-indigo-600 mb-1.5" />
                    <span className="block font-bold">Public Directory</span>
                    <span className="text-[9px] text-slate-400 block font-normal mt-1 leading-normal">Visible to mentors, recruiters and search queries.</span>
                  </button>

                  <button
                    onClick={() => setProfileVisibility("recruiters")}
                    className={`p-3.5 border rounded-xl text-left transition-all cursor-pointer ${
                      profileVisibility === "recruiters"
                        ? "bg-indigo-50 border-indigo-300 text-indigo-750 font-semibold"
                        : "bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100"
                    }`}
                  >
                    <Eye className="w-4 h-4 text-indigo-600 mb-1.5" />
                    <span className="block font-bold">Verified Recruiters</span>
                    <span className="text-[9px] text-slate-400 block font-normal mt-1 leading-normal">Only visible to active verified employer partners.</span>
                  </button>

                  <button
                    onClick={() => setProfileVisibility("private")}
                    className={`p-3.5 border rounded-xl text-left transition-all cursor-pointer ${
                      profileVisibility === "private"
                        ? "bg-indigo-50 border-indigo-300 text-indigo-750 font-semibold"
                        : "bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100"
                    }`}
                  >
                    <Lock className="w-4 h-4 text-indigo-600 mb-1.5" />
                    <span className="block font-bold">Strict Private</span>
                    <span className="text-[9px] text-slate-400 block font-normal mt-1 leading-normal">Completely unlisted from indices and SEO cache.</span>
                  </button>
                </div>
              </div>

              {/* AI pairing matching toggle */}
              <div className="flex items-center justify-between pt-4 border-t border-slate-100 text-xs">
                <div>
                  <span className="font-semibold text-slate-800 block">AI Recruiter Auto-pairing Match Scan</span>
                  <span className="text-slate-400 text-[10px] block mt-0.5">Allows automated ML matching algorithm to suggest jobs.</span>
                </div>
                <input
                  type="checkbox"
                  checked={allowAiMatching}
                  onChange={() => setAllowAiMatching(!allowAiMatching)}
                  className="w-4 h-4 accent-indigo-600 cursor-pointer text-white"
                />
              </div>
            </div>
          </div>
        )}

        {/* SUBTAB 5: CREDENTIALS SECURITY */}
        {activeSubTab === "security" && (
          <div className="space-y-5 max-w-md pb-6 text-xs">
            <div className="p-5 bg-white border border-slate-200 rounded-2xl space-y-4 shadow-sm">
              <div className="flex justify-between items-center border-b border-slate-100 pb-2">
                <div>
                  <span className="font-semibold text-slate-850 block">Account Password Coordinates</span>
                  <span className="text-slate-400 text-[10px] block">Keep credentials robust to secure tokens.</span>
                </div>
                <Shield className="w-5 h-5 text-indigo-600" />
              </div>

              <div className="space-y-1.5">
                <span className="text-[10px] text-slate-400 font-mono uppercase block font-semibold">Define New Secure Password</span>
                <input
                  type="password"
                  placeholder="••••••••••••"
                  className="w-full px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-slate-800 focus:outline-none focus:bg-white focus:border-indigo-600"
                />
              </div>

              <button
                onClick={() => alert("Credentials matrix reset successfully.")}
                className="px-3.5 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg font-bold text-[11px] cursor-pointer shadow-sm"
              >
                Reset Password
              </button>
            </div>

            <div className="p-4 bg-white border border-slate-200 rounded-2xl flex justify-between items-center shadow-sm text-xs">
              <div>
                <span className="font-semibold text-slate-850 block font-sans">Multi-Factor Session Handshake (MFA)</span>
                <span className="text-[10px] text-slate-400 block mt-0.5">Locks workspace sessions with secure SMS tokens.</span>
              </div>
              <input type="checkbox" defaultChecked={true} className="w-4 h-4 accent-indigo-600 cursor-pointer" />
            </div>
          </div>
        )}

        {/* SUBTAB 6: OAUTH INTEGRATIONS */}
        {activeSubTab === "integrations" && (
          <div className="space-y-4 max-w-xl pb-6 text-xs">
            <span className="text-[10px] text-slate-450 font-mono uppercase block font-bold">Connected Corporate Handshakes</span>

            <div className="space-y-3">
              {connections.map((c) => (
                <div key={c.id} className="p-4 bg-white border border-slate-200 rounded-2xl flex justify-between items-center gap-4 shadow-sm">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-slate-850 text-xs">{c.name}</span>
                      {c.status === "Connected" && (
                        <span className="text-emerald-700 text-[8px] font-mono border border-emerald-200 bg-emerald-50 px-1.5 rounded uppercase leading-none py-0.5 font-bold">CONNECTED</span>
                      )}
                    </div>
                    <p className="text-slate-500 text-[10.5px] leading-relaxed max-w-sm">{c.desc}</p>
                  </div>

                  <button
                    onClick={() => handleToggleConnection(c.id)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold border cursor-pointer transition-colors ${
                      c.status === "Connected"
                        ? "bg-slate-50 border-slate-200 text-slate-500 hover:text-red-600 hover:bg-red-50 hover:border-red-200"
                        : "bg-indigo-600 border-indigo-600 text-white hover:bg-indigo-700 shadow-sm"
                    }`}
                  >
                    {c.status === "Connected" ? "Disconnect" : "Connect"}
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
