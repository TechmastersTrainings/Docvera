"use client";

import React from "react";
import { Download } from "lucide-react";
import { Appointment } from "@/types/dashboard";

interface Props {
  appointments: Appointment[];
}

export default function DashboardHeader({ appointments }: Props) {
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
    <div className="flex justify-between items-center">
      <div className="space-y-1">
        <h1 className="text-2xl font-bold text-[#0f4557] tracking-tight">Provider Dashboard</h1>
        <p className="text-[#537eac] font-medium text-sm">Manage your schedule, earnings, and patient records.</p>
      </div>
      <button
        onClick={exportToCSV}
        className="flex items-center gap-2 bg-white border border-[#537eac]/20 hover:bg-[#eef2f7] text-[#0f4557] px-4 py-2.5 rounded-xl text-sm font-bold transition-all shadow-sm cursor-pointer"
      >
        <Download className="h-4 w-4 text-[#537eac]" />
        Export CSV
      </button>
    </div>
  );
}
