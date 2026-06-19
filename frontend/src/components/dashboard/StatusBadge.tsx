"use client";

import React from "react";

interface Props {
  status: string;
}

export default function StatusBadge({ status }: Props) {
  const styles: Record<string, string> = {
    PENDING: "bg-amber-50 border-amber-200 text-amber-600",
    CONFIRMED: "bg-blue-50 border-blue-200 text-blue-600",
    COMPLETED: "bg-emerald-50 border-emerald-200 text-emerald-600",
    CANCELLED: "bg-red-50 border-red-200 text-red-600",
  };

  return (
    <span className={`px-3 py-1 rounded-full border text-xs font-bold ${styles[status] || "bg-slate-50 border-slate-200 text-slate-600"}`}>
      {status}
    </span>
  );
}
