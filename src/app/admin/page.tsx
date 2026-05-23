"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  CalendarDays,
  Clock,
  CheckCircle,
  ArrowRight,
  ClipboardList,
  User,
  Heart
} from "lucide-react";
import StatsCards from "../../components/admin/StatsCards";
import { StatsSkeleton } from "../../components/admin/Skeletons";

interface Appointment {
  _id: string;
  fullName: string;
  phone: string;
  email: string;
  service: string;
  appointmentDate: string;
  status: "pending" | "confirmed" | "completed" | "cancelled";
  createdAt: string;
}

export default function AdminDashboard() {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [loading, setLoading] = useState(true);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    fetchAppointments();
  }, []);

  async function fetchAppointments() {
    try {
      const res = await fetch("/api/appointments");
      const data = await res.json();
      if (data.success) {
        setAppointments(data.appointments || []);
      }
    } catch (error) {
      console.error("Failed to load dashboard appointments:", error);
    } finally {
      setLoading(false);
    }
  }

  const pendingCount = appointments.filter((a) => a.status === "pending").length;
  const recentBookings = appointments.slice(0, 3); // Get top 3 newest

  if (!mounted) {
    return (
      <div className="space-y-4 animate-pulse">
        <div className="h-6 bg-slate-200 rounded w-48" />
        <div className="h-28 bg-slate-200 rounded w-full" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className="bg-white border border-slate-100 p-4 rounded-xl shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="space-y-1">
          <h1 className="text-lg font-bold text-slate-900 tracking-tight flex items-center space-x-1.5">
            <span>👋</span>
            <span>Welcome, Receptionist Portal</span>
          </h1>
          <p className="text-slate-500 text-[11px] font-medium">
            You have <span className="text-amber-600 font-bold">{pendingCount}</span> pending
            appointments awaiting review.
          </p>
        </div>
        <Link
          href="/admin/appointments"
          className="inline-flex items-center space-x-1.5 bg-slate-900 hover:bg-slate-800 text-white px-3 py-1.5 rounded-lg text-xs font-semibold shadow-sm transition-colors"
        >
          <span>Manage Queue</span>
          <ArrowRight className="h-3.5 w-3.5" />
        </Link>
      </div>

      {/* Stats Summary */}
      {loading ? (
        <StatsSkeleton />
      ) : (
        <StatsCards
          total={appointments.length}
          pending={pendingCount}
          confirmed={appointments.filter((a) => a.status === "confirmed").length}
          completed={appointments.filter((a) => a.status === "completed").length}
          cancelled={appointments.filter((a) => a.status === "cancelled").length}
        />
      )}

      {/* Grid of details */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Schedule Panel */}
        <div className="bg-white border border-slate-100 p-4 rounded-xl shadow-sm lg:col-span-2 space-y-3">
          <div className="flex items-center justify-between border-b border-slate-50 pb-2">
            <h3 className="text-xs font-bold text-slate-800 flex items-center space-x-1.5">
              <CalendarDays className="h-4 w-4 text-slate-400" />
              <span>Recently Booked Appointments</span>
            </h3>
            <Link
              href="/admin/appointments"
              className="text-[10px] font-semibold text-slate-500 hover:text-slate-900 flex items-center"
            >
              <span>View all</span>
              <ArrowRight className="h-3 w-3 ml-0.5" />
            </Link>
          </div>

          <div className="space-y-2">
            {loading ? (
              [...Array(2)].map((_, i) => (
                <div key={i} className="h-10 bg-slate-50 rounded-lg animate-pulse" />
              ))
            ) : recentBookings.length === 0 ? (
              <p className="text-[11px] text-slate-400 italic">No bookings recorded yet.</p>
            ) : (
              recentBookings.map((app) => (
                <div
                  key={app._id}
                  className="bg-slate-50/50 hover:bg-slate-50 border border-slate-100 p-2.5 rounded-lg flex items-center justify-between text-xs transition-colors"
                >
                  <div className="min-w-0">
                    <p className="font-bold text-slate-850 truncate">{app.fullName}</p>
                    <span className="text-[10px] text-slate-450 mt-0.5 block">
                      {app.service} • {app.appointmentDate}
                    </span>
                  </div>
                  <span
                    className={`text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded border shrink-0 ${
                      app.status === "pending"
                        ? "bg-amber-50 text-amber-600 border-amber-100"
                        : app.status === "confirmed"
                        ? "bg-blue-50 text-blue-600 border-blue-100"
                        : app.status === "completed"
                        ? "bg-emerald-50 text-emerald-600 border-emerald-100"
                        : "bg-rose-50 text-rose-600 border-rose-100"
                    }`}
                  >
                    {app.status}
                  </span>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Clinic Quick Stats/Info */}
        <div className="bg-white border border-slate-100 p-4 rounded-xl shadow-sm space-y-3">
          <div className="flex items-center border-b border-slate-50 pb-2">
            <Heart className="h-4 w-4 text-slate-400 mr-1.5" />
            <h3 className="text-xs font-bold text-slate-800">Quick Stats</h3>
          </div>

          <div className="space-y-2 text-[11px] text-slate-500 font-medium">
            <div className="flex justify-between items-center py-1 border-b border-slate-50/50">
              <span>Appointment Success Rate</span>
              <span className="text-slate-800 font-bold">
                {appointments.length > 0
                  ? Math.round(
                      (appointments.filter((a) => a.status === "completed").length /
                        appointments.length) *
                        100
                    )
                  : 0}
                %
              </span>
            </div>
            <div className="flex justify-between items-center py-1 border-b border-slate-50/50">
              <span>Confirmed Treatment Rate</span>
              <span className="text-slate-800 font-bold">
                {appointments.length > 0
                  ? Math.round(
                      (appointments.filter((a) => a.status === "confirmed").length /
                        appointments.length) *
                        100
                    )
                  : 0}
                %
              </span>
            </div>
            <div className="flex justify-between items-center py-1">
              <span>Awaiting Reception Review</span>
              <span className="text-amber-600 font-bold">{pendingCount}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}