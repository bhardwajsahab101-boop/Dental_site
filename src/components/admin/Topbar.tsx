"use client";

import React, { useEffect, useState } from "react";
import { CalendarDays } from "lucide-react";

export default function Topbar() {
  const [dateStr, setDateStr] = useState<string>("");

  useEffect(() => {
    const today = new Date();
    setDateStr(
      today.toLocaleDateString("en-US", {
        weekday: "short",
        month: "short",
        day: "numeric",
        year: "numeric",
      })
    );
  }, []);

  return (
    <div className="hidden md:flex items-center justify-between h-12 px-6 border-b border-slate-100 bg-white sticky top-0 z-30 shrink-0 w-full">
      {/* Greetings */}
      <div>
        <h2 className="text-[12.5px] font-semibold text-slate-800 tracking-tight">
          Welcome back, Receptionist
        </h2>
      </div>

      {/* Utilities */}
      <div className="flex items-center space-x-4">
        {/* Date Display */}
        <div className="flex items-center space-x-1.5 text-slate-500 text-[11px] font-medium bg-slate-50 border border-slate-100 px-2 py-0.5 rounded-md">
          <CalendarDays className="h-3.5 w-3.5" />
          <span>{dateStr || "Loading date..."}</span>
        </div>

        {/* Office Status */}
        <div className="flex items-center space-x-1">
          <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
          <span className="text-[11px] text-slate-500 font-semibold">Live Portal</span>
        </div>
      </div>
    </div>
  );
}
