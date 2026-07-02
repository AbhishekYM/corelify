import React, { useState } from "react";
import { Plus, HelpCircle, MessageSquare, Clock, AlertCircle, X, Check, Send, ShieldAlert } from "lucide-react";
import { SupportTicket, SupportMessage } from "../types";

interface SupportModuleProps {
  tickets: SupportTicket[];
  setTickets: React.Dispatch<React.SetStateAction<SupportTicket[]>>;
  onAddNotification: (title: string, desc: string, type: "message" | "alert" | "recommendation" | "application") => void;
}

export default function SupportModule({ tickets, setTickets, onAddNotification }: SupportModuleProps) {
  const [selectedTicketId, setSelectedTicketId] = useState<string | null>("ticket-109");
  const [showAddForm, setShowAddForm] = useState(false);

  // New ticket states
  const [newSubject, setNewSubject] = useState("");
  const [newCategory, setNewCategory] = useState("Billing");
  const [newPriority, setNewPriority] = useState<"Low" | "Medium" | "High">("Medium");
  const [newMsg, setNewMsg] = useState("");

  // Ticket reply states
  const [replyText, setReplyText] = useState("");

  const filteredTickets = tickets;
  const selectedTicket = tickets.find((t) => t.id === selectedTicketId) || tickets[0];

  const handleCreateTicket = () => {
    if (newSubject.trim() === "" || newMsg.trim() === "") return;

    const ticketId = `ticket-${Math.floor(100 + Math.random() * 900)}`;
    const ticketObj: SupportTicket = {
      id: ticketId,
      subject: newSubject,
      category: newCategory,
      status: "Open",
      priority: newPriority,
      createdAt: "July 02, 2026",
      messages: [
        { id: "msg-1", sender: "user", message: newMsg, time: "July 02, 2026 at 10:20 AM" }
      ]
    };

    setTickets([ticketObj, ...tickets]);
    setSelectedTicketId(ticketId);

    onAddNotification(
      "Support Ticket Created",
      `Ticket ${ticketId} has been filed under ${newCategory}. Our support team will align shortly.`,
      "alert"
    );

    // Reset Form
    setNewSubject("");
    setNewMsg("");
    setShowAddForm(false);
  };

  const handleSendReply = (ticketId: string) => {
    if (replyText.trim() === "") return;

    const replyMsg: SupportMessage = {
      id: `m-${Date.now()}`,
      sender: "user",
      message: replyText,
      time: "July 02, 2026 at 10:22 AM"
    };

    setTickets(
      tickets.map((t) => {
        if (t.id === ticketId) {
          return {
            ...t,
            messages: [...t.messages, replyMsg]
          };
        }
        return t;
      })
    );
    setReplyText("");

    // Simulate Agent response
    setTimeout(() => {
      const supportAgentReply: SupportMessage = {
        id: `m-agent-${Date.now()}`,
        sender: "support",
        message: "Acknowledged! I've escalated this payload to our core API infrastructure division. Expect a patch fix shortly.",
        time: "July 02, 2026 at 10:23 AM"
      };

      setTickets((prevTickets) =>
        prevTickets.map((t) => {
          if (t.id === ticketId) {
            return {
              ...t,
              messages: [...t.messages, supportAgentReply]
            };
          }
          return t;
        })
      );
    }, 1500);
  };

  return (
    <div className="h-full flex flex-col md:flex-row gap-6 select-none font-sans overflow-hidden">
      {/* LEFT: Tickets ledger List */}
      <div className="w-full md:w-80 flex flex-col gap-4 shrink-0 overflow-y-auto pr-1">
        <div className="flex justify-between items-center border-b border-slate-200 pb-2">
          <h3 className="text-slate-850 font-display font-semibold text-sm">Support Tickets</h3>
          <button
            onClick={() => setShowAddForm(!showAddForm)}
            className="w-6 h-6 rounded bg-indigo-600 text-white flex items-center justify-center hover:bg-indigo-700 cursor-pointer text-xs font-bold shadow-sm"
          >
            +
          </button>
        </div>

        <div className="space-y-3 pt-2">
          {filteredTickets.map((t) => {
            const isSelected = t.id === selectedTicketId;
            return (
              <div
                key={t.id}
                onClick={() => setSelectedTicketId(t.id)}
                className={`p-3.5 border rounded-xl cursor-pointer transition-all space-y-2 ${
                  isSelected ? "bg-indigo-50/50 border-indigo-500 shadow-sm" : "bg-white border-slate-200 hover:border-slate-300 shadow-sm"
                }`}
              >
                <div className="flex justify-between items-center text-[9px] font-mono">
                  <span className="text-slate-400">{t.id} &bull; {t.createdAt}</span>
                  <span className={`px-1.5 py-0.5 rounded uppercase font-bold text-[8px] ${
                    t.priority === "High" ? "bg-rose-50 text-rose-700 border border-rose-200" : "bg-slate-50 text-slate-500 border border-slate-200"
                  }`}>
                    {t.priority}
                  </span>
                </div>

                <h4 className="text-slate-800 text-xs font-semibold font-display line-clamp-1">{t.subject}</h4>

                <div className="flex justify-between items-center text-[9px] font-mono pt-2 border-t border-slate-100">
                  <span className="text-slate-500">{t.category}</span>
                  <span className={t.status === "Open" ? "text-amber-750 font-semibold" : "text-slate-400"}>{t.status}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* RIGHT: Ticket details & chat timeline responses */}
      {selectedTicket ? (
        <div className="flex-1 flex flex-col gap-6 overflow-y-auto pb-6">
          <div className="border-b border-slate-200 pb-4 flex justify-between items-center flex-wrap gap-3">
            <div>
              <span className="text-[9px] font-mono text-slate-400 uppercase block">{selectedTicket.id} &bull; {selectedTicket.category}</span>
              <h2 className="text-lg font-display font-bold text-slate-900 tracking-tight mt-0.5 leading-snug">{selectedTicket.subject}</h2>
            </div>

            <span className="px-2.5 py-1 bg-amber-50 text-amber-700 border border-amber-200 rounded-full font-mono text-[9px] uppercase tracking-wider font-semibold shadow-sm">
              {selectedTicket.status} Status
            </span>
          </div>

          <div className="grid lg:grid-cols-3 gap-6 flex-1 overflow-hidden">
            {/* Messages timeline chats */}
            <div className="lg:col-span-2 flex flex-col justify-between h-[400px] bg-white border border-slate-200 rounded-2xl p-4 shadow-sm">
              <div className="flex-grow overflow-y-auto space-y-4 mb-4 pr-1">
                {selectedTicket.messages.map((msg) => (
                  <div
                    key={msg.id}
                    className={`flex gap-3 max-w-[80%] ${
                      msg.sender === "support" ? "self-start" : "ml-auto flex-row-reverse"
                    }`}
                  >
                    <div className={`p-3.5 rounded-2xl text-xs leading-relaxed ${
                      msg.sender === "support"
                        ? "bg-slate-50 text-slate-700"
                        : "bg-indigo-50 border border-indigo-100 text-indigo-800"
                    }`}>
                      <p>{msg.message}</p>
                      <span className="text-[8px] text-slate-400 block text-right mt-1.5 font-mono">{msg.time}</span>
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex gap-2 pt-3 border-t border-slate-100">
                <input
                  type="text"
                  value={replyText}
                  onChange={(e) => setReplyText(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleSendReply(selectedTicket.id)}
                  placeholder="Type message response to support division..."
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-800 focus:outline-none focus:bg-white focus:border-indigo-600 focus:ring-1 focus:ring-indigo-600 transition-colors"
                />
                <button
                  onClick={() => handleSendReply(selectedTicket.id)}
                  className="px-4 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-xs font-semibold cursor-pointer shadow-sm"
                >
                  Send
                </button>
              </div>
            </div>

            {/* Ticket Metadata details column */}
            <div className="bg-white border border-slate-200 p-5 rounded-2xl h-fit space-y-4 text-xs text-slate-500 shadow-sm">
              <span className="text-[10px] text-slate-400 font-mono uppercase block font-semibold">SLA METRIC SPEC</span>
              <p>Your support priority tier is <strong className="text-slate-800 font-bold">{selectedTicket.priority}</strong>.</p>
              <p>Average response response division speed: <strong className="text-slate-800 font-bold">12 minutes</strong>.</p>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex-1 flex flex-col items-center justify-center text-center p-12 text-slate-400">
          <AlertCircle className="w-8 h-8 mb-2 text-slate-300" />
          <p className="text-xs">Select a ticket from index list to open logs.</p>
        </div>
      )}

      {/* CREATE NEW TICKET FORM POPUP OVERLAY */}
      {showAddForm && (
        <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-50 flex items-center justify-center p-6 animate-fade-in">
          <div className="bg-white border border-slate-200 p-6 rounded-2xl w-full max-w-sm space-y-4 relative shadow-2xl">
            <button
              onClick={() => setShowAddForm(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>

            <div>
              <span className="text-[9px] font-mono text-indigo-600 uppercase tracking-widest block font-semibold">FILE SUPPORT CASE</span>
              <h3 className="text-slate-900 font-display font-bold text-base mt-0.5">Submit Support Ticket</h3>
            </div>

            <div className="space-y-3 text-xs">
              <div className="space-y-1">
                <span className="text-[10px] text-slate-400 font-mono uppercase block font-semibold">Subject / Incident Summary</span>
                <input
                  type="text"
                  value={newSubject}
                  onChange={(e) => setNewSubject(e.target.value)}
                  placeholder="Credential verification failed..."
                  className="w-full px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-slate-800 focus:outline-none focus:bg-white focus:border-indigo-600 focus:ring-1 focus:ring-indigo-600 transition-colors"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <span className="text-[10px] text-slate-400 font-mono uppercase block font-semibold">Category</span>
                  <select
                    value={newCategory}
                    onChange={(e) => setNewCategory(e.target.value)}
                    className="w-full px-3 py-1 bg-slate-50 border border-slate-200 rounded-lg text-slate-800 focus:outline-none focus:bg-white focus:border-indigo-600 focus:ring-1 focus:ring-indigo-600 transition-colors"
                  >
                    <option>Billing</option>
                    <option>Scholarships</option>
                    <option>Mentors Access</option>
                    <option>Other Technical</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <span className="text-[10px] text-slate-400 font-mono uppercase block font-semibold">Priority</span>
                  <select
                    value={newPriority}
                    onChange={(e) => setNewPriority(e.target.value as any)}
                    className="w-full px-3 py-1 bg-slate-50 border border-slate-200 rounded-lg text-slate-800 focus:outline-none focus:bg-white focus:border-indigo-600 focus:ring-1 focus:ring-indigo-600 transition-colors"
                  >
                    <option>Low</option>
                    <option>Medium</option>
                    <option>High</option>
                  </select>
                </div>
              </div>

              <div className="space-y-1">
                <span className="text-[10px] text-slate-400 font-mono uppercase block font-semibold">Case Description Details</span>
                <textarea
                  value={newMsg}
                  onChange={(e) => setNewMsg(e.target.value)}
                  placeholder="Tell our division what happened..."
                  rows={3}
                  className="w-full p-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-850 focus:outline-none focus:bg-white focus:border-indigo-600 focus:ring-1 focus:ring-indigo-600 transition-colors placeholder:text-slate-400"
                />
              </div>
            </div>

            <button
              onClick={handleCreateTicket}
              className="w-full py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold rounded-lg shadow-sm cursor-pointer"
            >
              Confirm and Open Ticket
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
