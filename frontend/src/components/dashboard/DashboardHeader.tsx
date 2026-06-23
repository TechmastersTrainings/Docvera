"use client";

import React, { useState, useEffect } from "react";
import { Download, Sparkles, Calendar as CalendarIcon } from "lucide-react";
import { Appointment } from "@/types/dashboard";

interface Props {
  appointments: Appointment[];
}

export default function DashboardHeader({ appointments }: Props) {
  const [greeting, setGreeting] = useState("Welcome back");
  const [currentDate, setCurrentDate] = useState("");

  useEffect(() => {
    const hour = new Date().getHours();
    if (hour < 12) setGreeting("Good morning");
    else if (hour < 18) setGreeting("Good afternoon");
    else setGreeting("Good evening");

    const options: Intl.DateTimeFormatOptions = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    setCurrentDate(new Date().toLocaleDateString('en-US', options));
  }, []);

  const exportToCSV = () => {
    const headers = ["Patient Name", "Date", "Start Time", "End Time", "Base Amount", "Status"];
    const csvRows = appointments.map((appt) => [
      `"${appt.patient_name || "N/A"}"`,
      appt.booking_date,
      appt.start_time,
      appt.end_time,
      appt.base_amount,
      appt.status,
    ]);
    const csvContent = [headers.join(","), ...csvRows.map((row) => row.join(","))].join("\n");
    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `appointments_report_${new Date().toISOString().split("T")[0]}.csv`;
    a.click();
  };

  return (
    <div className="relative overflow-hidden bg-gradient-to-r from-[#0f4557] to-[#028597] rounded-3xl p-8 mb-8 shadow-lg">
      {/* Decorative background elements */}
      <div className="absolute top-0 right-0 -translate-y-12 translate-x-12 opacity-10">
        <Sparkles className="h-64 w-64 text-white" />
      </div>
      <div className="absolute bottom-0 left-0 translate-y-1/2 -translate-x-1/2 w-96 h-96 bg-white/5 rounded-full blur-3xl"></div>

      <div className="relative z-10 flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div className="space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/10 border border-white/20 rounded-full text-white/90 text-xs font-bold uppercase tracking-wider backdrop-blur-sm">
            <CalendarIcon className="h-3.5 w-3.5" />
            {currentDate}
          </div>
          
          <h1 className="text-3xl md:text-4xl font-black text-white tracking-tight">
            {greeting}, <span className="text-[#04defb]">Doctor.</span>
          </h1>
          
          <p className="text-white/80 font-medium text-sm max-w-xl leading-relaxed">
            Here's what's happening with your practice today. Manage your clinical schedule, track your earnings, and review patient medical records seamlessly.
          </p>
        </div>

        <button
          onClick={exportToCSV}
          className="shrink-0 flex items-center justify-center gap-2 bg-white text-[#0f4557] hover:bg-[#eef2f7] hover:-translate-y-0.5 px-6 py-3 rounded-xl text-sm font-black transition-all shadow-[0_8px_16px_rgba(0,0,0,0.15)] cursor-pointer"
        >
          <Download className="h-4 w-4 text-[#028597]" />
          Export Live Report
        </button>
      </div>
    </div>
  );
}
