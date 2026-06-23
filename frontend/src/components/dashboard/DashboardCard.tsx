"use client";

import React from "react";

interface Props {
  children: React.ReactNode;
  className?: string;
}

export default function DashboardCard({ children, className = "" }: Props) {
  return (
    <div className={`bg-white rounded-[24px] border border-slate-200 shadow-sm mb-8 overflow-hidden ${className}`}>
      {children}
    </div>
  );
}
