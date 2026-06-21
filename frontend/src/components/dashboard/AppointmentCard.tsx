"use client";

import React from "react";
import { CheckCircle, XCircle, Calendar, Clock, User } from "lucide-react";
import Link from "next/link";
import { Appointment } from "@/types/dashboard";
import ActionButton from "./ActionButton";

interface Props {
  appointment: Appointment;
  handleStatusChange: (id: string, status: string) => Promise<void>;
}

export default function AppointmentCard({ appointment, handleStatusChange }: Props) {
  const isCompleted = appointment.status === "COMPLETED";
  const isCancelled = appointment.status === "CANCELLED";

  return (
    <div className="bg-white p-6 flex flex-col gap-5 border border-[#537eac]/20 rounded-3xl shadow-sm hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-[#eef2f7] rounded-2xl border border-blue-100 shrink-0 text-[#028597]">
            <User className="h-5 w-5" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-[#0f4557] leading-tight">{appointment.patient_name}</h2>
            <p className="text-sm font-medium text-[#537eac] mt-0.5">Consultation</p>
          </div>
        </div>
        <span className={`shrink-0 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider border ${isCompleted ? "bg-[#eef2f7] text-[#028597] border-[#028597]/30" :
            isCancelled ? "bg-[#fde7e9] text-[#ee1123] border-[#ee1123]/30" :
              "bg-amber-50 text-amber-600 border-amber-200"
          }`}>
          {appointment.status}
        </span>
      </div>

      <div className="flex flex-col gap-3 text-sm font-medium text-[#537eac] bg-[#eef2f7] p-4 rounded-2xl border border-[#537eac]/15">
        <div className="flex items-center gap-3">
          <Calendar className="h-4 w-4 text-[#537eac]" />
          <span className="font-bold text-[#0f4557]">{appointment.booking_date}</span>
        </div>
        <div className="flex items-center gap-3">
          <Clock className="h-4 w-4 text-[#537eac]" />
          <span className="font-bold text-[#0f4557]">{appointment.start_time} - {appointment.end_time}</span>
        </div>
      </div>

      <div className="flex items-center gap-3 mt-auto pt-2">
        {!isCancelled && (
          <Link href={`/dashboard/doctor/consultation?appointment=${appointment.id}`} className="flex-1">
            <button
              className={`w-full justify-center px-4 py-2.5 rounded-xl text-sm font-bold transition-all flex items-center gap-2 cursor-pointer shadow-sm ${isCompleted
                  ? "bg-white border border-[#537eac]/20 text-[#0f4557] hover:bg-[#eef2f7]"
                  : "bg-[#028597] border border-blue-600 text-white hover:bg-[#025964]"
                }`}
            >
              {isCompleted ? "View Details" : "Start Consultation"}
            </button>
          </Link>
        )}

        {!isCompleted && !isCancelled && (
          <button
            onClick={() => handleStatusChange(appointment.id, "COMPLETED")}
            className="shrink-0 h-[46px] w-[46px] bg-[#eef2f7] text-[#028597] rounded-xl hover:bg-[#eef2f7] flex items-center justify-center transition-colors border border-[#028597]/30"
          >
            <CheckCircle className="h-5 w-5" />
          </button>
        )}

        {!isCancelled && (
          <button
            onClick={() => handleStatusChange(appointment.id, "CANCELLED")}
            className="shrink-0 h-[46px] w-[46px] bg-[#fde7e9] text-[#ee1123] rounded-xl hover:bg-[#fde7e9] flex items-center justify-center transition-colors border border-[#ee1123]/30"
          >
            <XCircle className="h-5 w-5" />
          </button>
        )}
      </div>
    </div>
  );
}
