import React, { useState } from "react";
import { Users, Plus, Trash2, Edit3, Ban, X, FileText, Globe } from "lucide-react";

export interface AdminUser {
  id: string;
  fullName: string;
  email: string;
  role: "Admin" | "Instructor" | "Student" | "Employer" | "Institution";
  status: "Active" | "Suspended";
  verified: boolean;
  engagementScore: number;
  joinedDate: string;
  resumeReviewStatus: "Pending" | "Reviewed";
  portfolioLink: string;
  resumeFileName: string;
  feedback?: string;
}

interface AdminUsersProps {
  adminUsers: AdminUser[];
  setAdminUsers: React.Dispatch<React.SetStateAction<AdminUser[]>>;
  onAddNotification: (
    title: string,
    description: string,
    type: "message" | "alert" | "recommendation" | "application"
  ) => void;
}

export default function AdminUsers({ adminUsers, setAdminUsers, onAddNotification }: AdminUsersProps) {
  const [showUserModal, setShowUserModal] = useState(false);
  const [editingUser, setEditingUser] = useState<AdminUser | null>(null);
  const [userForm, setUserForm] = useState({
    fullName: "",
    email: "",
    role: "Student" as "Admin" | "Instructor" | "Student" | "Employer" | "Institution",
    status: "Active" as "Active" | "Suspended",
    verified: false,
    engagementScore: 50,
    joinedDate: "2026-07-02",
    resumeReviewStatus: "Pending" as "Pending" | "Reviewed",
    portfolioLink: "",
    resumeFileName: ""
  });

  const [reviewingUser, setReviewingUser] = useState<AdminUser | null>(null);
  const [reviewFeedback, setReviewFeedback] = useState("");

  const handleAddEditUser = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingUser) {
      setAdminUsers(adminUsers.map(u => u.id === editingUser.id ? { ...u, ...userForm } : u));
      onAddNotification("User Modified", `Updated details for ${userForm.fullName}.`, "alert");
    } else {
      const newUser: AdminUser = {
        id: `user-${Date.now()}`,
        ...userForm
      };
      setAdminUsers([...adminUsers, newUser]);
      onAddNotification("User Created", `Registered ${userForm.fullName} into platform directories.`, "alert");
    }
    setShowUserModal(false);
    setEditingUser(null);
  };

  const handleEditUserClick = (u: AdminUser) => {
    setEditingUser(u);
    setUserForm({
      fullName: u.fullName,
      email: u.email,
      role: u.role,
      status: u.status,
      verified: u.verified,
      engagementScore: u.engagementScore,
      joinedDate: u.joinedDate,
      resumeReviewStatus: u.resumeReviewStatus,
      portfolioLink: u.portfolioLink,
      resumeFileName: u.resumeFileName
    });
    setShowUserModal(true);
  };

  const handleDeleteUser = (id: string) => {
    setAdminUsers(adminUsers.filter(u => u.id !== id));
    onAddNotification("User Removed", `Successfully removed user catalog ID ${id}.`, "alert");
  };

  const handleToggleBlock = (id: string) => {
    setAdminUsers(adminUsers.map(u => {
      if (u.id === id) {
        const nextStatus = u.status === "Active" ? "Suspended" : "Active";
        onAddNotification(
          nextStatus === "Suspended" ? "User Blocked" : "User Reactivated",
          `${u.fullName}'s login and catalog access has been updated.`,
          "alert"
        );
        return { ...u, status: nextStatus as "Active" | "Suspended" };
      }
      return u;
    }));
  };

  const handleVerifyUserToggle = (id: string) => {
    setAdminUsers(adminUsers.map(u => {
      if (u.id === id) {
        const nextVer = !u.verified;
        onAddNotification(
          nextVer ? "User Verified" : "User Unverified",
          `${u.fullName} verification mark updated.`,
          "recommendation"
        );
        return { ...u, verified: nextVer };
      }
      return u;
    }));
  };

  const handleSaveResumeFeedback = () => {
    if (!reviewingUser) return;
    setAdminUsers(adminUsers.map(u => {
      if (u.id === reviewingUser.id) {
        return {
          ...u,
          resumeReviewStatus: "Reviewed",
          feedback: reviewFeedback
        };
      }
      return u;
    }));
    onAddNotification(
      "Resume Feedback Dispatched",
      `Sent custom portfolio feedback to ${reviewingUser.fullName}.`,
      "message"
    );
    setReviewingUser(null);
    setReviewFeedback("");
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <span className="text-xs font-bold text-slate-800">User Records & Directory</span>
        <button
          onClick={() => {
            setEditingUser(null);
            setUserForm({
              fullName: "",
              email: "",
              role: "Student",
              status: "Active",
              verified: false,
              engagementScore: 75,
              joinedDate: "2026-07-02",
              resumeReviewStatus: "Pending",
              portfolioLink: "https://portfolio.me",
              resumeFileName: "resume.pdf"
            });
            setShowUserModal(true);
          }}
          className="px-3 py-1.5 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold rounded-xl flex items-center gap-1.5 cursor-pointer shadow transition-colors"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>Onboard User</span>
        </button>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200/80 shadow-sm overflow-hidden">
        <table className="w-full border-collapse text-left text-xs">
          <thead>
            <tr className="bg-slate-50 border-b border-slate-200 text-slate-400 font-semibold">
              <th className="p-4">Name & Email</th>
              <th className="p-4">Role</th>
              <th className="p-4">Verified</th>
              <th className="p-4">Account Status</th>
              <th className="p-4">Resume Portfolio Review</th>
              <th className="p-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 text-slate-700">
            {adminUsers.map(u => (
              <tr key={u.id} className="hover:bg-slate-50/50 transition-colors">
                <td className="p-4">
                  <div>
                    <span className="font-bold text-slate-900 block">{u.fullName}</span>
                    <span className="text-[10px] text-slate-400 font-mono">{u.email}</span>
                  </div>
                </td>
                <td className="p-4">
                  <span className={`px-2 py-0.5 rounded-full text-[10px] font-semibold ${
                    u.role === "Admin" ? "bg-amber-100 text-amber-800" :
                    u.role === "Instructor" ? "bg-indigo-100 text-indigo-800" : 
                    u.role === "Employer" ? "bg-emerald-100 text-emerald-800" :
                    u.role === "Institution" ? "bg-purple-100 text-purple-800" :
                    "bg-slate-100 text-slate-800"
                  }`}>{u.role}</span>
                </td>
                <td className="p-4">
                  <button
                    onClick={() => handleVerifyUserToggle(u.id)}
                    className={`px-2 py-1 rounded-lg text-[10px] font-semibold cursor-pointer ${
                      u.verified ? "bg-green-50 text-green-700 border border-green-200" : "bg-slate-50 text-slate-400 border border-slate-200"
                    }`}
                  >
                    {u.verified ? "Verified ✅" : "Unverified"}
                  </button>
                </td>
                <td className="p-4">
                  <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                    u.status === "Active" ? "bg-green-100 text-green-800" : "bg-rose-100 text-rose-800"
                  }`}>{u.status}</span>
                </td>
                <td className="p-4">
                  <div className="flex items-center gap-2">
                    <span className={`px-2 py-0.5 rounded-full text-[10px] font-semibold ${
                      u.resumeReviewStatus === "Reviewed" ? "bg-emerald-100 text-emerald-800" : "bg-orange-100 text-orange-800"
                    }`}>{u.resumeReviewStatus}</span>
                    <button
                      onClick={() => {
                        setReviewingUser(u);
                        setReviewFeedback(u.feedback || "");
                      }}
                      className="text-xs text-indigo-600 hover:underline cursor-pointer"
                    >
                      Review
                    </button>
                  </div>
                </td>
                <td className="p-4 text-right">
                  <div className="flex items-center justify-end gap-2">
                    <button
                      onClick={() => handleToggleBlock(u.id)}
                      className={`p-1 rounded hover:bg-slate-100 cursor-pointer ${u.status === "Active" ? "text-rose-500" : "text-green-600"}`}
                      title={u.status === "Active" ? "Suspend Account" : "Activate Account"}
                    >
                      <Ban className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => handleEditUserClick(u)}
                      className="p-1 hover:bg-slate-100 text-slate-500 hover:text-slate-900 rounded cursor-pointer"
                    >
                      <Edit3 className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => handleDeleteUser(u.id)}
                      className="p-1 hover:bg-rose-50 text-rose-500 hover:text-rose-700 rounded cursor-pointer"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {showUserModal && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <form onSubmit={handleAddEditUser} className="bg-white rounded-2xl max-w-md w-full border border-slate-200 p-6 space-y-4">
            <div className="flex justify-between items-center border-b border-slate-100 pb-2">
              <span className="font-bold text-slate-900">{editingUser ? "Edit User Record" : "Onboard New User"}</span>
              <button type="button" onClick={() => setShowUserModal(false)} className="text-slate-400 hover:text-slate-600"><X className="w-4 h-4" /></button>
            </div>
            <div className="space-y-3">
              <div>
                <label className="text-[10px] font-mono text-slate-400 uppercase tracking-wider block mb-1">Full Name</label>
                <input type="text" required value={userForm.fullName} onChange={e => setUserForm({ ...userForm, fullName: e.target.value })} className="w-full px-3 py-2 border border-slate-200 rounded-xl text-xs focus:outline-none focus:border-indigo-600" />
              </div>
              <div>
                <label className="text-[10px] font-mono text-slate-400 uppercase tracking-wider block mb-1">Email Address</label>
                <input type="email" required value={userForm.email} onChange={e => setUserForm({ ...userForm, email: e.target.value })} className="w-full px-3 py-2 border border-slate-200 rounded-xl text-xs focus:outline-none focus:border-indigo-600" />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-[10px] font-mono text-slate-400 uppercase tracking-wider block mb-1">Role</label>
                  <select value={userForm.role} onChange={e => setUserForm({ ...userForm, role: e.target.value as any })} className="w-full px-3 py-2 border border-slate-200 rounded-xl text-xs focus:outline-none focus:border-indigo-600">
                    <option value="Student">Participant/Student</option>
                    <option value="Instructor">Instructor/Mentor/Host</option>
                    <option value="Employer">Employer</option>
                    <option value="Institution">School/Colleges/University</option>
                    <option value="Admin">Admin</option>
                  </select>
                </div>
                <div>
                  <label className="text-[10px] font-mono text-slate-400 uppercase tracking-wider block mb-1">Account Status</label>
                  <select value={userForm.status} onChange={e => setUserForm({ ...userForm, status: e.target.value as any })} className="w-full px-3 py-2 border border-slate-200 rounded-xl text-xs focus:outline-none focus:border-indigo-600">
                    <option value="Active">Active</option>
                    <option value="Suspended">Suspended</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="text-[10px] font-mono text-slate-400 uppercase tracking-wider block mb-1">Portfolio Link</label>
                <input type="url" placeholder="https://" value={userForm.portfolioLink} onChange={e => setUserForm({ ...userForm, portfolioLink: e.target.value })} className="w-full px-3 py-2 border border-slate-200 rounded-xl text-xs focus:outline-none focus:border-indigo-600" />
              </div>
            </div>
            <div className="flex justify-end gap-2.5 pt-4">
              <button type="button" onClick={() => setShowUserModal(false)} className="px-4 py-2 bg-slate-100 text-slate-600 text-xs font-semibold rounded-xl">Cancel</button>
              <button type="submit" className="px-4 py-2 bg-indigo-600 text-white text-xs font-semibold rounded-xl shadow-lg">Save Record</button>
            </div>
          </form>
        </div>
      )}

      {reviewingUser && (
        <div className="fixed inset-y-0 right-0 w-96 bg-white border-l border-slate-200 shadow-2xl z-50 p-6 flex flex-col justify-between">
          <div>
            <div className="flex justify-between items-center border-b border-slate-100 pb-3 mb-4">
              <span className="font-bold text-slate-900">Resume & Portfolio Review</span>
              <button onClick={() => setReviewingUser(null)} className="p-1 hover:bg-slate-100 rounded text-slate-400"><X className="w-4 h-4" /></button>
            </div>
            <div className="space-y-4 text-xs">
              <div className="bg-slate-50 p-3 rounded-xl border border-slate-100">
                <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider block mb-1">Target Account</span>
                <span className="font-bold text-slate-800 block text-sm">{reviewingUser.fullName}</span>
                <span className="text-slate-400 block">{reviewingUser.email}</span>
              </div>
              <div>
                <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider block mb-1">Submitted Resume</span>
                <div className="flex items-center gap-2 p-2.5 bg-slate-50/50 rounded-xl border border-dashed border-slate-200">
                  <FileText className="w-4 h-4 text-indigo-600 shrink-0" />
                  <span className="truncate font-mono text-[10px]">{reviewingUser.resumeFileName}</span>
                  <a href="#" onClick={(e) => e.preventDefault()} className="text-[10px] text-indigo-600 font-bold hover:underline shrink-0 ml-auto">Download</a>
                </div>
              </div>
              <div>
                <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider block mb-1">Portfolio link</span>
                <a href={reviewingUser.portfolioLink} target="_blank" rel="noreferrer" className="flex items-center gap-1.5 p-2 bg-indigo-50 rounded-lg text-indigo-700 hover:underline">
                  <Globe className="w-3.5 h-3.5" />
                  <span>{reviewingUser.portfolioLink || "No link submitted"}</span>
                </a>
              </div>
              <div>
                <label className="text-[10px] font-mono text-slate-400 uppercase tracking-wider block mb-1">Review Feedback</label>
                <textarea rows={5} value={reviewFeedback} onChange={e => setReviewFeedback(e.target.value)} placeholder="Provide specific feedback..." className="w-full p-2.5 border border-slate-200 rounded-xl text-xs focus:outline-none focus:border-indigo-600 resize-none" />
              </div>
            </div>
          </div>
          <div className="pt-4 border-t border-slate-100 flex gap-2">
            <button onClick={() => setReviewingUser(null)} className="flex-1 py-2 bg-slate-100 text-slate-600 text-xs font-semibold rounded-xl">Cancel</button>
            <button onClick={handleSaveResumeFeedback} className="flex-1 py-2 bg-indigo-600 text-white text-xs font-semibold rounded-xl shadow-lg">Submit Feedback</button>
          </div>
        </div>
      )}
    </div>
  );
}
