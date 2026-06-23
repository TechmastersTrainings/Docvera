"use client";

import React from "react";
import { IndianRupee, User, Calendar } from "lucide-react";
import StatCard from "./StatCard";
import { DashboardStats } from "@/types/dashboard";

interface Props {
  stats: DashboardStats;
}

export default function DoctorStats({ stats }: Props) {
  return (
    <div className="grid md:grid-cols-3 gap-6 mb-8">
      <StatCard
        icon={<IndianRupee className="h-6 w-6" />}
        title="Total Earnings"
        value={`₹${stats.totalEarnings.toLocaleString('en-IN', { minimumFractionDigits: 2 })}`}
        subtext="Refreshes every 24h"
        color="emerald"
        trend={12} // Mock trend for premium feel
      />

      <StatCard
        icon={<User className="h-6 w-6" />}
        title="Patients Seen"
        value={stats.patientsSeen}
        subtext="Paid consultations"
        color="blue"
        trend={5} // Mock trend
      />

      <StatCard
        icon={<Calendar className="h-6 w-6" />}
        title="Recent Consultations"
        value={stats.successfulPayments}
        subtext="Successfully paid (24h)"
        color="emerald"
        trend={15} // Mock positive trend 
      />
    </div>
  );
}