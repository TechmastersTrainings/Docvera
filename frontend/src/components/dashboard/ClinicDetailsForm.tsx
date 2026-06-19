"use client";

import React from "react";
import { AlertCircle } from "lucide-react";
import { ProfileMessage } from "@/types/dashboard";
import DashboardCard from "./DashboardCard";
import SectionHeader from "./SectionHeader";
import ActionButton from "./ActionButton";

interface Props {
  clinicName: string;
  clinicAddress: string;
  clinicCity: string;
  consultationFees: string;
  setClinicName: (value: string) => void;
  setClinicAddress: (value: string) => void;
  setClinicCity: (value: string) => void;
  setConsultationFees: (value: string) => void;
  handleProfileUpdate: (e: React.FormEvent) => Promise<void>;
  profileMessage: ProfileMessage | null;
}

export default function ClinicDetailsForm({
  clinicName, clinicAddress, clinicCity, consultationFees,
  setClinicName, setClinicAddress, setClinicCity, setConsultationFees,
  handleProfileUpdate, profileMessage,
}: Props) {
  return (
    <DashboardCard className="max-w-2xl mx-auto p-6 sm:p-8">
      <SectionHeader title="Update Clinic Details" subtitle="Manage clinic information and consultation pricing." />

      {profileMessage && (
        <div className="mt-6 mb-6 p-4 rounded-xl flex items-center gap-2 bg-accent/5 text-accent border border-accent/10 text-sm">
          <AlertCircle className="h-5 w-5 shrink-0" />
          {profileMessage.text}
        </div>
      )}

      <form onSubmit={handleProfileUpdate} className="mt-8 space-y-5">
        <div className="space-y-1.5">
          <label className="text-xs font-bold text-slate-700 uppercase tracking-wide">Clinic Name</label>
          <input type="text" value={clinicName} onChange={(e) => setClinicName(e.target.value)}
            className="w-full bg-white border border-slate-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 rounded-xl px-4 py-3 text-sm text-slate-900 font-medium outline-none transition-all shadow-sm" placeholder="Clinic Name" />
        </div>
        <div className="space-y-1.5">
          <label className="text-xs font-bold text-slate-700 uppercase tracking-wide">City</label>
          <input type="text" value={clinicCity} onChange={(e) => setClinicCity(e.target.value)}
            className="w-full bg-white border border-slate-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 rounded-xl px-4 py-3 text-sm text-slate-900 font-medium outline-none transition-all shadow-sm" placeholder="City" />
        </div>
        <div className="space-y-1.5">
          <label className="text-xs font-bold text-slate-700 uppercase tracking-wide">Address</label>
          <textarea rows={3} value={clinicAddress} onChange={(e) => setClinicAddress(e.target.value)}
            className="w-full bg-white border border-slate-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 rounded-xl px-4 py-3 text-sm text-slate-900 font-medium outline-none transition-all resize-none shadow-sm" placeholder="Address" />
        </div>
        <div className="space-y-1.5">
          <label className="text-xs font-bold text-slate-700 uppercase tracking-wide">Consultation Fee (INR)</label>
          <input type="number" value={consultationFees} onChange={(e) => setConsultationFees(e.target.value)}
            className="w-full bg-white border border-slate-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 rounded-xl px-4 py-3 text-sm text-slate-900 font-medium outline-none transition-all shadow-sm" placeholder="Fee" />
        </div>

        <ActionButton type="submit" className="w-full justify-center">
          Save Details
        </ActionButton>
      </form>
    </DashboardCard>
  );
}
