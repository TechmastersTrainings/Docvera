"use client";

import React from "react";
import { Stethoscope } from "lucide-react";
import ActionButton from "@/components/dashboard/ActionButton";

interface Props {
  patientName: string;
  handleCompleteConsultation?: () => Promise<void>;
}

export default function ConsultationHeader({
  patientName,
  handleCompleteConsultation,
}: Props) {
  return (
    <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 w-full">
      <div className="flex items-center gap-4">
        <div className="p-3 bg-[#08A29E]/10 rounded-xl border border-[#08A29E]/20 text-[#08A29E]">
          <Stethoscope className="h-6 w-6 text-[#08A29E]" />
        </div>
        <div>
          <h1 className="text-xl font-black text-slate-800">
            Consultation: {patientName}
          </h1>
          <p className="text-sm text-slate-500 font-medium">Manage patient details and medical records</p>
        </div>
      </div>

      {handleCompleteConsultation && (
        <ActionButton
          onClick={handleCompleteConsultation}
          className="bg-amber-500 hover:bg-amber-600 text-white font-bold px-5 py-2.5 rounded-xl shadow-sm border-none transition-colors whitespace-nowrap"
        >
          Complete Consultation
        </ActionButton>
      )}
    </div>
  );
}
