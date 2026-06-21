"use client";

import React from "react";

interface Props {
  icon: React.ReactNode;
  title: string;
  value: string | number;
  subtext: string;
  color: "emerald" | "blue" | "amber";
}

export default function StatCard({ icon, title, value, subtext, color }: Props) {
  return (
    <div className="p-6 rounded-3xl border border-[#537eac]/20 bg-white shadow-sm flex items-start justify-between hover:border-[#028597]/30 hover:shadow-md hover:-translate-y-0.5 transition-all duration-300">
      <div>
        <p className="text-[#537eac] text-xs font-bold uppercase tracking-wider mb-1">{title}</p>
        <h3 className="text-2xl font-black text-[#0f4557]">{value}</h3>
        <p className="text-[#537eac] text-[10px] mt-1.5 font-bold">{subtext}</p>
      </div>
      <div className={`p-3 rounded-xl border flex items-center justify-center shrink-0 ${
        color === 'emerald' ? 'bg-[#eef2f7] text-[#028597] border-emerald-100' :
        color === 'blue' ? 'bg-[#eef2f7] text-[#028597] border-blue-100' :
        'bg-amber-50 text-amber-600 border-amber-100'
      }`}>
        {icon}
      </div>
    </div>
  );
}
