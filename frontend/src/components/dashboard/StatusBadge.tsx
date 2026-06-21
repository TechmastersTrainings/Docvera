"use client";

import React from "react";

interface Props {
  status: string;
}

export default function StatusBadge({ status }: Props) {
  const styles: Record<string, string> = {
    PENDING: "bg-amber-50 border-amber-200 text-amber-600",
    CONFIRMED: "bg-[#eef2f7] border-[#028597]/30 text-[#028597]",
    COMPLETED: "bg-[#eef2f7] border-[#028597]/30 text-[#028597]",
    CANCELLED: "bg-[#fde7e9] border-[#ee1123]/30 text-[#ee1123]",
  };

  return (
    <span className={`px-3 py-1 rounded-full border text-xs font-bold ${styles[status] || "bg-[#eef2f7] border-[#537eac]/20 text-[#537eac]"}`}>
      {status}
    </span>
  );
}
