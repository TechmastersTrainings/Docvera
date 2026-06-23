"use client";

import React from "react";
import { TrendingUp, TrendingDown, Minus } from "lucide-react";

interface Props {
  icon: React.ReactNode;
  title: string;
  value: string | number;
  subtext: string;
  color: "emerald" | "blue" | "amber";
  trend?: number; // percentage trend
}

export default function StatCard({ icon, title, value, subtext, color, trend }: Props) {
  // Define color themes
  const themes = {
    emerald: {
      bg: "bg-emerald-500/5",
      border: "border-emerald-500/20",
      text: "text-emerald-700",
      iconBg: "bg-emerald-100/50",
      iconColor: "text-emerald-600",
      sparkline: "stroke-emerald-400"
    },
    blue: {
      bg: "bg-[#04defb]/5",
      border: "border-[#04defb]/20",
      text: "text-[#028597]",
      iconBg: "bg-[#04defb]/10",
      iconColor: "text-[#028597]",
      sparkline: "stroke-[#04defb]"
    },
    amber: {
      bg: "bg-amber-500/5",
      border: "border-amber-500/20",
      text: "text-amber-700",
      iconBg: "bg-amber-100/50",
      iconColor: "text-amber-600",
      sparkline: "stroke-amber-400"
    }
  };

  const theme = themes[color];

  return (
    <div className={`p-6 rounded-[24px] border ${theme.border} bg-white shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 relative overflow-hidden group`}>
      {/* Decorative background blob */}
      <div className={`absolute -right-6 -top-6 w-32 h-32 rounded-full blur-3xl opacity-50 ${theme.bg} transition-all group-hover:scale-150`}></div>

      <div className="relative z-10 flex flex-col h-full justify-between gap-6">
        <div className="flex items-start justify-between">
          <div className={`p-3 rounded-2xl ${theme.iconBg} ${theme.iconColor} border ${theme.border} backdrop-blur-sm shrink-0`}>
            {icon}
          </div>
          
          {/* Trend Badge */}
          {trend !== undefined && (
            <div className={`flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold ${
              trend > 0 ? "bg-emerald-50 text-emerald-600 border border-emerald-100" :
              trend < 0 ? "bg-rose-50 text-rose-600 border border-rose-100" :
              "bg-slate-50 text-slate-500 border border-slate-100"
            }`}>
              {trend > 0 ? <TrendingUp className="h-3 w-3" /> : trend < 0 ? <TrendingDown className="h-3 w-3" /> : <Minus className="h-3 w-3" />}
              {Math.abs(trend)}%
            </div>
          )}
        </div>

        <div>
          <h3 className="text-3xl font-black text-[#0f4557] tracking-tight">{value}</h3>
          <p className="text-[#537eac] text-sm font-bold mt-1">{title}</p>
          
          <div className="flex items-center justify-between mt-4">
            <p className="text-slate-400 text-xs font-semibold">{subtext}</p>
            
            {/* Simple SVG Sparkline for dynamic feel */}
            <div className="w-16 h-6 opacity-60">
              <svg viewBox="0 0 100 30" className="w-full h-full overflow-visible">
                {trend !== undefined && trend > 0 ? (
                  <path d="M0,30 L20,20 L40,25 L60,10 L80,15 L100,0" fill="none" className={theme.sparkline} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
                ) : trend !== undefined && trend < 0 ? (
                  <path d="M0,0 L20,15 L40,10 L60,25 L80,20 L100,30" fill="none" className={theme.sparkline} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
                ) : (
                  <path d="M0,15 L20,18 L40,12 L60,16 L80,14 L100,15" fill="none" className={theme.sparkline} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
                )}
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
