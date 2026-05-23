"use client";

import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import {
  Mail,
  Search,
  Trash2,
  CheckCircle2,
  Clock,
  User,
  Copy,
  RefreshCw,
  Inbox,
  Loader2,
  X,
  Reply
} from "lucide-react";

interface ContactMessage {
  _id: string;
  fullName: string;
  email: string;
  message: string;
  status: "unread" | "read" | "replied";
  createdAt: string;
  updatedAt: string;
}

export default function AdminMessagesPage() {
  const [messages, setMessages] = useState<ContactMessage[]>([]);
  const [loading, setLoading] = useState(true);
  const [updatingId, setUpdatingId] = useState<string | null>(null);
  const [selectedMessage, setSelectedMessage] = useState<ContactMessage | null>(null);

  // Search & Filters state
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [sortOrder, setSortOrder] = useState<"newest" | "oldest">("newest");

  const fetchMessages = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/messages");
      const data = await res.json();
      if (data.success) {
        setMessages(data.messages || []);
      } else {
        throw new Error(data.message || "Failed to load messages");
      }
    } catch (err) {
      console.error(err);
      toast.error("Failed to load messages");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    Promise.resolve().then(() => {
      fetchMessages();
    });
  }, []);

  const updateStatus = async (id: string, newStatus: "unread" | "read" | "replied") => {
    setUpdatingId(id);
    try {
      const res = await fetch(`/api/messages?id=${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ status: newStatus }),
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.message || "Failed to update status");
      }

      setMessages((prev) =>
        prev.map((msg) => (msg._id === id ? { ...msg, status: newStatus } : msg))
      );

      // If the selected message is open, update its local instance too
      if (selectedMessage?._id === id) {
        setSelectedMessage((prev) => (prev ? { ...prev, status: newStatus } : null));
      }

      toast.success(`Marked as ${newStatus}`);
    } catch (err) {
      console.error(err);
      toast.error(err instanceof Error ? err.message : "Failed to update message status");
    } finally {
      setUpdatingId(null);
    }
  };

  const deleteMessage = async (id: string) => {
    if (!confirm("Are you sure you want to delete this message permanently?")) {
      return;
    }
    setUpdatingId(id);
    try {
      const res = await fetch(`/api/messages?id=${id}`, {
        method: "DELETE",
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.message || "Failed to delete message");
      }

      setMessages((prev) => prev.filter((msg) => msg._id !== id));
      if (selectedMessage?._id === id) {
        setSelectedMessage(null);
      }
      toast.success("Message deleted successfully");
    } catch (err) {
      console.error(err);
      toast.error(err instanceof Error ? err.message : "Failed to delete message");
    } finally {
      setUpdatingId(null);
    }
  };

  const copyEmail = (email: string) => {
    navigator.clipboard.writeText(email);
    toast.success("Email copied to clipboard");
  };

  // Derive message stats
  const totalCount = messages.length;
  const unreadCount = messages.filter((m) => m.status === "unread").length;
  const readCount = messages.filter((m) => m.status === "read").length;
  const repliedCount = messages.filter((m) => m.status === "replied").length;

  // Filter and sort logic
  const filteredMessages = messages
    .filter((msg) => {
      const matchesSearch =
        msg.fullName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        msg.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
        msg.message.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesStatus = selectedStatus === "all" || msg.status === selectedStatus;

      return matchesSearch && matchesStatus;
    })
    .sort((a, b) => {
      const dateA = new Date(a.createdAt).getTime();
      const dateB = new Date(b.createdAt).getTime();
      return sortOrder === "newest" ? dateB - dateA : dateA - dateB;
    });

  return (
    <div className="space-y-6">
      {/* Header Panel */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold text-slate-900 tracking-tight">Customer Messages</h1>
          <p className="text-slate-500 text-[11px] font-medium">
            Read and respond to messages submitted via the Contact Us form.
          </p>
        </div>
        <button
          onClick={fetchMessages}
          disabled={loading}
          className="inline-flex items-center justify-center space-x-1.5 bg-white hover:bg-slate-50 border border-slate-200 px-3 py-1.5 rounded-lg text-xs font-semibold text-slate-700 shadow-sm transition-colors disabled:opacity-50 self-start sm:self-auto"
        >
          {loading ? (
            <Loader2 className="h-3.5 w-3.5 animate-spin text-slate-600" />
          ) : (
            <RefreshCw className="h-3.5 w-3.5 text-slate-500" />
          )}
          <span>Refresh</span>
        </button>
      </div>

      {/* KPI Stats widgets */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white border border-slate-100 p-4 rounded-xl shadow-sm space-y-1">
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Total Received</p>
          <p className="text-xl font-bold text-slate-900">{loading ? "..." : totalCount}</p>
        </div>
        <div className="bg-white border border-slate-100 p-4 rounded-xl shadow-sm space-y-1 border-l-4 border-l-amber-500">
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Unread Inquiries</p>
          <p className="text-xl font-bold text-amber-600">{loading ? "..." : unreadCount}</p>
        </div>
        <div className="bg-white border border-slate-100 p-4 rounded-xl shadow-sm space-y-1 border-l-4 border-l-blue-500">
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Reviewed</p>
          <p className="text-xl font-bold text-blue-600">{loading ? "..." : readCount}</p>
        </div>
        <div className="bg-white border border-slate-100 p-4 rounded-xl shadow-sm space-y-1 border-l-4 border-l-emerald-500">
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Replied</p>
          <p className="text-xl font-bold text-emerald-600">{loading ? "..." : repliedCount}</p>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white border border-slate-100 p-3.5 rounded-xl shadow-sm space-y-3.5">
        <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3">
          {/* Search Inputs */}
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-slate-400" />
            <input
              type="text"
              placeholder="Search by customer name, email, or message keyword..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-slate-50 border border-slate-150 focus:border-slate-900 rounded-lg pl-9 pr-3 py-1.5 text-xs text-slate-800 focus:outline-none transition-colors"
            />
          </div>

          {/* Sort Selector */}
          <div className="flex items-center space-x-2">
            <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider shrink-0">Sort:</span>
            <select
              value={sortOrder}
              onChange={(e) => setSortOrder(e.target.value as "newest" | "oldest")}
              className="bg-slate-50 border border-slate-150 rounded-lg px-2.5 py-1.5 text-xs text-slate-700 focus:outline-none cursor-pointer font-semibold"
            >
              <option value="newest">Newest First</option>
              <option value="oldest">Oldest First</option>
            </select>
          </div>
        </div>

        {/* Tab Filters */}
        <div className="flex flex-wrap items-center gap-1.5 pt-1.5 border-t border-slate-50">
          {[
            { value: "all", label: "All Messages", count: totalCount },
            { value: "unread", label: "Unread", count: unreadCount },
            { value: "read", label: "Read", count: readCount },
            { value: "replied", label: "Replied", count: repliedCount },
          ].map((tab) => (
            <button
              key={tab.value}
              onClick={() => setSelectedStatus(tab.value)}
              className={`inline-flex items-center space-x-1.5 px-3 py-1 rounded-full text-xs font-semibold border transition-all ${
                selectedStatus === tab.value
                  ? "bg-slate-900 text-white border-slate-900"
                  : "bg-slate-50 text-slate-600 border-slate-150 hover:bg-slate-100"
              }`}
            >
              <span>{tab.label}</span>
              <span
                className={`text-[9px] px-1 rounded-full ${
                  selectedStatus === tab.value ? "bg-slate-800 text-slate-200" : "bg-slate-200 text-slate-600"
                }`}
              >
                {tab.count}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Main List Layout */}
      <div className="space-y-3">
        {loading ? (
          // Loading Skeletons
          [...Array(3)].map((_, idx) => (
            <div key={idx} className="bg-white border border-slate-100 rounded-xl p-4 space-y-3 animate-pulse">
              <div className="flex items-center justify-between">
                <div className="h-4 bg-slate-100 rounded w-1/4" />
                <div className="h-4 bg-slate-100 rounded w-12" />
              </div>
              <div className="h-3 bg-slate-100 rounded w-1/3" />
              <div className="h-10 bg-slate-50 rounded w-full" />
            </div>
          ))
        ) : filteredMessages.length === 0 ? (
          // Empty State
          <div className="bg-white border border-slate-150 rounded-xl p-10 text-center">
            <Inbox className="h-10 w-10 text-slate-350 mx-auto mb-3" />
            <h3 className="text-xs font-bold text-slate-800">No Messages Found</h3>
            <p className="text-slate-450 text-[11px] mt-1 max-w-xs mx-auto">
              {searchQuery || selectedStatus !== "all"
                ? "Try refining your search text or shifting tabs."
                : "No customer contact message inquiries have been submitted yet."}
            </p>
          </div>
        ) : (
          // List of messages
          filteredMessages.map((msg) => {
            const isUnread = msg.status === "unread";
            return (
              <div
                key={msg._id}
                onClick={() => setSelectedMessage(msg)}
                className={`bg-white border border-slate-100 hover:border-slate-200 rounded-xl p-4 shadow-sm transition-all duration-150 cursor-pointer relative overflow-hidden flex flex-col md:flex-row md:items-center justify-between gap-3 ${
                  isUnread ? "border-l-4 border-l-amber-500 font-medium" : ""
                }`}
              >
                <div className="flex-1 min-w-0 space-y-1.5">
                  <div className="flex items-center space-x-2">
                    <span className="text-xs font-bold text-slate-800 flex items-center space-x-1.5">
                      <User className="h-3.5 w-3.5 text-slate-400 shrink-0" />
                      <span>{msg.fullName}</span>
                    </span>
                    <span
                      className={`text-[9px] font-bold uppercase tracking-wider px-1.5 py-0.25 rounded border shrink-0 ${
                        msg.status === "unread"
                          ? "bg-amber-50 text-amber-600 border-amber-100"
                          : msg.status === "read"
                          ? "bg-blue-50 text-blue-600 border-blue-100"
                          : "bg-emerald-50 text-emerald-600 border-emerald-100"
                      }`}
                    >
                      {msg.status}
                    </span>
                  </div>

                  <div className="text-[11px] text-slate-500 flex flex-wrap items-center gap-x-3">
                    <span>{msg.email}</span>
                    <span>•</span>
                    <span className="flex items-center">
                      <Clock className="h-3 w-3 mr-1 text-slate-400" />
                      {new Date(msg.createdAt).toLocaleString("en-US", {
                        month: "short",
                        day: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </span>
                  </div>

                  <p className="text-xs text-slate-600 line-clamp-2 pt-1 font-normal leading-relaxed">
                    {msg.message}
                  </p>
                </div>

                {/* Quick actions panel */}
                <div
                  className="flex items-center space-x-2 border-t md:border-t-0 pt-2.5 md:pt-0 border-slate-50 shrink-0 self-end md:self-center"
                  onClick={(e) => e.stopPropagation()} // Prevent modal trigger
                >
                  <button
                    onClick={() => copyEmail(msg.email)}
                    title="Copy Email"
                    className="p-1.5 bg-slate-50 hover:bg-slate-100 border border-slate-100 rounded-lg text-slate-500 hover:text-slate-800 transition-colors"
                  >
                    <Copy className="h-3.5 w-3.5" />
                  </button>

                  {isUnread && (
                    <button
                      onClick={() => updateStatus(msg._id, "read")}
                      disabled={updatingId === msg._id}
                      title="Mark as Read"
                      className="p-1.5 bg-blue-50 hover:bg-blue-100 border border-blue-100 rounded-lg text-blue-600 transition-colors"
                    >
                      <CheckCircle2 className="h-3.5 w-3.5" />
                    </button>
                  )}

                  {msg.status !== "replied" && (
                    <button
                      onClick={() => updateStatus(msg._id, "replied")}
                      disabled={updatingId === msg._id}
                      title="Mark as Replied"
                      className="p-1.5 bg-emerald-50 hover:bg-emerald-100 border border-emerald-100 rounded-lg text-emerald-600 transition-colors"
                    >
                      <Reply className="h-3.5 w-3.5" />
                    </button>
                  )}

                  <button
                    onClick={() => deleteMessage(msg._id)}
                    disabled={updatingId === msg._id}
                    title="Delete message"
                    className="p-1.5 bg-rose-50 hover:bg-rose-100 border border-rose-100 rounded-lg text-rose-600 transition-colors"
                  >
                    <Trash2 className="h-3.5 w-3.5" />
                  </button>
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* Expanded Message Detail Modal */}
      {selectedMessage && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="fixed inset-0 bg-slate-900/30 backdrop-blur-[2px]"
            onClick={() => setSelectedMessage(null)}
          />
          <div className="bg-white border border-slate-200 rounded-2xl shadow-xl w-full max-w-xl p-5 relative z-10 flex flex-col max-h-[85vh]">
            {/* Modal Title */}
            <div className="flex items-center justify-between border-b border-slate-100 pb-3 mb-4">
              <h2 className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center">
                <Mail className="h-4 w-4 mr-1.5 text-slate-500" />
                <span>Message Details</span>
              </h2>
              <button
                onClick={() => setSelectedMessage(null)}
                className="p-1 text-slate-400 hover:text-slate-900 focus:outline-none"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            {/* Content Body */}
            <div className="flex-1 overflow-y-auto space-y-4 pr-1 text-xs">
              {/* Sender info */}
              <div className="bg-slate-50 border border-slate-100 rounded-xl p-3.5 space-y-1.5">
                <div className="flex justify-between items-center">
                  <span className="font-bold text-slate-800 text-[13px]">{selectedMessage.fullName}</span>
                  <span
                    className={`text-[9px] font-bold uppercase tracking-wider px-1.5 py-0.25 rounded border ${
                      selectedMessage.status === "unread"
                        ? "bg-amber-50 text-amber-600 border-amber-100"
                        : selectedMessage.status === "read"
                        ? "bg-blue-50 text-blue-600 border-blue-100"
                        : "bg-emerald-50 text-emerald-600 border-emerald-100"
                    }`}
                  >
                    {selectedMessage.status}
                  </span>
                </div>
                <div className="text-[11px] text-slate-500 space-y-0.5">
                  <p className="flex items-center">
                    <span className="font-semibold text-slate-600 mr-1.5 w-10">Email:</span>
                    <span className="text-slate-800">{selectedMessage.email}</span>
                  </p>
                  <p className="flex items-center">
                    <span className="font-semibold text-slate-600 mr-1.5 w-10">Received:</span>
                    <span className="text-slate-800">
                      {new Date(selectedMessage.createdAt).toLocaleString("en-US", {
                        weekday: "short",
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </span>
                  </p>
                </div>
              </div>

              {/* Message text */}
              <div className="space-y-1.5">
                <p className="font-bold text-slate-700">Message Content:</p>
                <div className="bg-slate-50/50 border border-slate-100 rounded-xl p-4 text-[12px] text-slate-800 whitespace-pre-wrap leading-relaxed">
                  {selectedMessage.message}
                </div>
              </div>

              {/* Reply Section Placeholder */}
              <div className="space-y-2 border-t border-slate-100 pt-3">
                <p className="font-bold text-slate-700">Quick Reply:</p>
                <textarea
                  placeholder="Draft your email response here..."
                  rows={3}
                  className="w-full bg-slate-50 border border-slate-150 focus:border-slate-900 rounded-lg p-2.5 text-xs text-slate-800 focus:outline-none transition-colors"
                />
                <button
                  onClick={() => {
                    toast.success(`Opening mailto to send email reply to ${selectedMessage.email}`);
                    window.location.href = `mailto:${selectedMessage.email}?subject=Re: Contact Inquiry - City Dental Group`;
                  }}
                  className="inline-flex items-center space-x-1.5 bg-slate-900 hover:bg-slate-800 text-white px-3 py-1.5 rounded-lg text-xs font-semibold shadow-sm transition-colors"
                >
                  <Reply className="h-3.5 w-3.5" />
                  <span>Send Reply via Client</span>
                </button>
              </div>
            </div>

            {/* Actions Footer */}
            <div className="border-t border-slate-100 pt-3.5 mt-4 flex items-center justify-between gap-2">
              <button
                onClick={() => {
                  deleteMessage(selectedMessage._id);
                }}
                className="inline-flex items-center space-x-1 text-rose-600 hover:text-rose-700 font-semibold transition-colors"
              >
                <Trash2 className="h-3.5 w-3.5" />
                <span>Delete Message</span>
              </button>

              <div className="flex space-x-2">
                {selectedMessage.status === "unread" && (
                  <button
                    onClick={() => updateStatus(selectedMessage._id, "read")}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1.5 rounded-lg text-xs font-semibold shadow-sm transition-colors"
                  >
                    Mark as Read
                  </button>
                )}
                {selectedMessage.status !== "replied" && (
                  <button
                    onClick={() => updateStatus(selectedMessage._id, "replied")}
                    className="bg-emerald-600 hover:bg-emerald-700 text-white px-3 py-1.5 rounded-lg text-xs font-semibold shadow-sm transition-colors"
                  >
                    Mark as Replied
                  </button>
                )}
                <button
                  onClick={() => setSelectedMessage(null)}
                  className="bg-slate-100 hover:bg-slate-200 text-slate-700 px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
