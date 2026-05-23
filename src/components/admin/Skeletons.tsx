import React from "react";

export function StatsSkeleton() {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 animate-pulse">
      {[...Array(5)].map((_, i) => (
        <div
          key={i}
          className="bg-white border border-gray-100 rounded-xl p-3.5 flex items-center space-x-3 h-[72px]"
        >
          <div className="h-9 w-9 bg-gray-100 rounded-lg shrink-0" />
          <div className="space-y-1.5 w-full">
            <div className="h-3 bg-gray-100 rounded w-16" />
            <div className="h-5 bg-gray-100 rounded w-8" />
          </div>
        </div>
      ))}
    </div>
  );
}

export function AppointmentListSkeleton() {
  return (
    <div className="space-y-2.5 animate-pulse">
      {[...Array(5)].map((_, i) => (
        <div
          key={i}
          className="bg-white border border-gray-100 rounded-xl p-3.5 flex flex-col md:flex-row md:items-center justify-between gap-4 h-auto md:h-14"
        >
          <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
            <div className="h-4 bg-gray-100 rounded w-32" />
            <div className="h-4.5 bg-gray-100 rounded w-20" />
            <div className="h-4.5 bg-gray-100 rounded w-16" />
          </div>
          <div className="flex items-center gap-4 w-full md:w-auto">
            <div className="h-4 bg-gray-100 rounded w-24 hidden md:block" />
            <div className="h-4 bg-gray-100 rounded w-24 hidden md:block" />
            <div className="h-8 bg-gray-100 rounded w-28 md:w-36 ml-auto md:ml-0" />
          </div>
        </div>
      ))}
    </div>
  );
}
