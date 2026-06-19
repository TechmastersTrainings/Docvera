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
    <div className="bg-white p-6 flex flex-col gap-5 border border-slate-200 rounded-3xl shadow-sm hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-blue-50 rounded-2xl border border-blue-100 shrink-0 text-blue-600">
            <User className="h-5 w-5" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-slate-900 leading-tight">{appointment.patient_name}</h2>
            <p className="text-sm font-medium text-slate-500 mt-0.5">Consultation</p>
          </div>
        </div>
        <span className={`shrink-0 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider border ${isCompleted ? "bg-emerald-50 text-emerald-600 border-emerald-200" :
            isCancelled ? "bg-red-50 text-red-600 border-red-200" :
              "bg-amber-50 text-amber-600 border-amber-200"
          }`}>
          {appointment.status}
        </span>
      </div>

      <div className="flex flex-col gap-3 text-sm font-medium text-slate-600 bg-slate-50 p-4 rounded-2xl border border-slate-100">
        <div className="flex items-center gap-3">
          <Calendar className="h-4 w-4 text-slate-400" />
          <span className="font-bold text-slate-900">{appointment.booking_date}</span>
        </div>
        <div className="flex items-center gap-3">
          <Clock className="h-4 w-4 text-slate-400" />
          <span className="font-bold text-slate-900">{appointment.start_time} - {appointment.end_time}</span>
        </div>
      </div>

      <div className="flex items-center gap-3 mt-auto pt-2">
        {!isCancelled && (
          <Link href={`/dashboard/doctor/consultation?appointment=${appointment.id}`} className="flex-1">
            <button
              className={`w-full justify-center px-4 py-2.5 rounded-xl text-sm font-bold transition-all flex items-center gap-2 cursor-pointer shadow-sm ${isCompleted
                  ? "bg-white border border-slate-200 text-slate-700 hover:bg-slate-50"
                  : "bg-blue-600 border border-blue-600 text-white hover:bg-blue-700"
                }`}
            >
              {isCompleted ? "View Details" : "Start Consultation"}
            </button>
          </Link>
        )}

        {!isCompleted && !isCancelled && (
          <button
            onClick={() => handleStatusChange(appointment.id, "COMPLETED")}
            className="shrink-0 h-[46px] w-[46px] bg-emerald-50 text-emerald-600 rounded-xl hover:bg-emerald-100 flex items-center justify-center transition-colors border border-emerald-200"
          >
            <CheckCircle className="h-5 w-5" />
          </button>
        )}

        {!isCancelled && (
          <button
            onClick={() => handleStatusChange(appointment.id, "CANCELLED")}
            className="shrink-0 h-[46px] w-[46px] bg-red-50 text-red-600 rounded-xl hover:bg-red-100 flex items-center justify-center transition-colors border border-red-200"
          >
            <XCircle className="h-5 w-5" />
          </button>
        )}
      </div>
    </div>
  );
}
