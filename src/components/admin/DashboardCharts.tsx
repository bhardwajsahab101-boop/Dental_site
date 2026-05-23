"use client";

import React from "react";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  PieChart,
  Pie,
  Cell,
  Legend
} from "recharts";

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

interface DashboardChartsProps {
  appointments: Appointment[];
}

export default function DashboardCharts({ appointments }: DashboardChartsProps) {
  // 1. Prepare Daily Appointments Chart Data (last 7 days)
  const getDailyData = () => {
    const data = [];
    for (let i = 6; i >= 0; i--) {
      const d = new Date();
      d.setDate(d.getDate() - i);
      const dateStr = d.toISOString().split("T")[0]; // YYYY-MM-DD
      const count = appointments.filter((a) => a.appointmentDate === dateStr).length;
      
      const label = d.toLocaleDateString("en-US", { month: "short", day: "numeric" });
      data.push({
        name: label,
        Appointments: count,
      });
    }
    return data;
  };

  const barData = getDailyData();

  // 2. Prepare Status Distribution Data
  const pendingCount = appointments.filter((a) => a.status === "pending").length;
  const confirmedCount = appointments.filter((a) => a.status === "confirmed").length;
  const completedCount = appointments.filter((a) => a.status === "completed").length;
  const cancelledCount = appointments.filter((a) => a.status === "cancelled").length;

  const pieData = [
    { name: "Pending", value: pendingCount, color: "#f59e0b" },
    { name: "Confirmed", value: confirmedCount, color: "#3b82f6" },
    { name: "Completed", value: completedCount, color: "#10b981" },
    { name: "Cancelled", value: cancelledCount, color: "#ef4444" },
  ].filter((item) => item.value > 0); // Hide 0 counts for clean donut

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Appointments Per Day Bar Chart */}
      <div className="bg-white border border-slate-100 p-4 rounded-xl shadow-sm lg:col-span-2 space-y-4">
        <div>
          <h3 className="text-xs font-bold text-slate-800">Booking Volume</h3>
          <p className="text-slate-400 text-[10px] font-semibold uppercase tracking-wider">Appointments per day (Last 7 days)</p>
        </div>

        <div className="h-64 w-full text-[10px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={barData} margin={{ top: 10, right: 10, left: -25, bottom: 0 }}>
              <XAxis dataKey="name" stroke="#94a3b8" tickLine={false} axisLine={false} />
              <YAxis stroke="#94a3b8" tickLine={false} axisLine={false} allowDecimals={false} />
              <Tooltip
                contentStyle={{ background: "#ffffff", border: "1px solid #f1f5f9", borderRadius: "8px", fontSize: "11px" }}
                cursor={{ fill: "#f8fafc" }}
              />
              <Bar dataKey="Appointments" fill="#0f172a" radius={[4, 4, 0, 0]} barSize={28} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Status Distribution Donut Chart */}
      <div className="bg-white border border-slate-100 p-4 rounded-xl shadow-sm space-y-4">
        <div>
          <h3 className="text-xs font-bold text-slate-800">Status Allocation</h3>
          <p className="text-slate-400 text-[10px] font-semibold uppercase tracking-wider">Breakdown of appointments by state</p>
        </div>

        <div className="h-64 w-full flex flex-col justify-center items-center text-[10px]">
          {pieData.length === 0 ? (
            <p className="text-[11px] text-slate-450 italic">No status data to present.</p>
          ) : (
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="45%"
                  innerRadius={55}
                  outerRadius={75}
                  paddingAngle={4}
                  dataKey="value"
                >
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{ background: "#ffffff", border: "1px solid #f1f5f9", borderRadius: "8px", fontSize: "11px" }}
                />
                <Legend
                  verticalAlign="bottom"
                  height={36}
                  iconType="circle"
                  iconSize={6}
                  wrapperStyle={{ fontSize: "10.5px", fontWeight: "600", color: "#64748b" }}
                />
              </PieChart>
            </ResponsiveContainer>
          )}
        </div>
      </div>
    </div>
  );
}
