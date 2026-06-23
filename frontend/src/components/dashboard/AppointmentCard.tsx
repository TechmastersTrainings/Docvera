"use client";

import React from "react";
import { CheckCircle, XCircle, Calendar, Clock, Video, User } from "lucide-react";
import Link from "next/link";
import { Appointment } from "@/types/dashboard";

interface Props {
  appointment: Appointment;
  handleStatusChange: (id: string, status: string) => Promise<void>;
}

export default function AppointmentCard({ appointment, handleStatusChange }: Props) {
  const isCompleted = appointment.status === "COMPLETED";
  const isCancelled = appointment.status === "CANCELLED";

  // Get initials for Avatar
  const getInitials = (name: string) => {
    if (!name) return "U";
    const parts = name.split(" ");
    if (parts.length >= 2) {
      return (parts[0][0] + parts[1][0]).toUpperCase();
    }
    return name[0].toUpperCase();
  };

  const getStatusColor = () => {
    if (isCompleted) return "bg-emerald-50 text-emerald-600 border-emerald-200 ring-emerald-500/20";
    if (isCancelled) return "bg-rose-50 text-rose-600 border-rose-200 ring-rose-500/20";
    return "bg-amber-50 text-amber-600 border-amber-200 ring-amber-500/20";
  };

  const getStatusDotColor = () => {
    if (isCompleted) return "bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.8)]";
    if (isCancelled) return "bg-rose-500 shadow-[0_0_8px_rgba(244,63,94,0.8)]";
    return "bg-amber-500 shadow-[0_0_8px_rgba(245,158,11,0.8)] animate-pulse";
  };

  return (
    <div className="bg-white p-6 flex flex-col gap-5 border border-slate-200 rounded-[24px] shadow-[0_2px_10px_rgba(0,0,0,0.02)] hover:shadow-[0_8px_24px_rgba(0,0,0,0.06)] hover:border-slate-300 transition-all duration-300 relative overflow-hidden group">
      
      {/* Top Banner / Color Accents */}
      <div className={`absolute top-0 left-0 w-full h-1 ${isCompleted ? 'bg-emerald-500' : isCancelled ? 'bg-rose-500' : 'bg-amber-500'}`}></div>

      <div className="flex items-start justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="relative">
            {/* Avatar */}
            <div className={`h-12 w-12 rounded-full flex items-center justify-center font-black text-lg ${
              isCompleted ? "bg-emerald-100 text-emerald-700" :
              isCancelled ? "bg-rose-100 text-rose-700" :
              "bg-indigo-100 text-indigo-700"
            }`}>
              {getInitials(appointment.patient_name || "Patient")}
            </div>
            {/* Online Indicator Badge */}
            <div className={`absolute bottom-0 right-0 h-3.5 w-3.5 rounded-full border-2 border-white ${getStatusDotColor()}`}></div>
          </div>
          <div>
            <h2 className="text-lg font-black text-slate-800 leading-tight group-hover:text-[#028597] transition-colors">{appointment.patient_name || "Unknown Patient"}</h2>
            <div className="flex items-center gap-1.5 mt-1">
              <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Consultation</span>
            </div>
          </div>
        </div>
        
        {/* Status Badge */}
        <span className={`shrink-0 px-3 py-1.5 rounded-full text-[10px] font-black uppercase tracking-wider border ring-2 ring-offset-1 ${getStatusColor()}`}>
          {appointment.status}
        </span>
      </div>

      {/* Date & Time Timeline View */}
      <div className="grid grid-cols-2 gap-3 p-4 bg-slate-50 rounded-2xl border border-slate-100">
        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-1.5 text-slate-400 text-xs font-bold uppercase">
            <Calendar className="h-3.5 w-3.5" /> Date
          </div>
          <span className="font-bold text-slate-700 text-sm">{appointment.booking_date}</span>
        </div>
        <div className="flex flex-col gap-1 border-l border-slate-200 pl-3">
          <div className="flex items-center gap-1.5 text-slate-400 text-xs font-bold uppercase">
            <Clock className="h-3.5 w-3.5" /> Time Slot
          </div>
          <span className="font-bold text-slate-700 text-sm">{appointment.start_time} - {appointment.end_time}</span>
        </div>
      </div>

      {appointment.review && (
        <div className="p-4 bg-amber-50/50 rounded-2xl border border-amber-100 mt-1 space-y-2 relative">
          <div className="absolute top-4 right-4 text-amber-200">
             <User className="h-6 w-6 opacity-50" />
          </div>
          <div className="flex items-center gap-1">
            {[...Array(5)].map((_, i) => (
              <svg key={i} className={`w-4 h-4 ${i < (appointment.review?.rating || 0) ? "text-amber-400" : "text-amber-200"}`} fill="currentColor" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            ))}
          </div>
          <p className="text-sm text-amber-900/80 italic font-medium leading-relaxed">"{appointment.review?.comment}"</p>
        </div>
      )}

      {/* Action Buttons */}
      <div className="flex items-center gap-3 mt-auto pt-3">
        {!isCancelled && (
          <Link href={`/dashboard/doctor/consultation?appointment=${appointment.id}`} className="flex-1">
            <button
              className={`w-full justify-center px-4 py-3 rounded-xl text-sm font-bold transition-all duration-300 flex items-center gap-2 shadow-sm border ${
                isCompleted
                  ? "bg-white text-slate-700 border-slate-200 hover:bg-slate-50 hover:border-slate-300"
                  : "bg-gradient-to-r from-[#028597] to-[#04defb] text-white border-transparent hover:shadow-[0_4px_12px_rgba(2,133,151,0.3)] hover:-translate-y-0.5"
              }`}
            >
              {!isCompleted && <Video className="h-4 w-4" />}
              {isCompleted ? "View Medical Records" : "Start Consultation Room"}
            </button>
          </Link>
        )}

        {!isCompleted && !isCancelled && (
          <button
            onClick={() => handleStatusChange(appointment.id, "COMPLETED")}
            className="shrink-0 h-[48px] px-4 bg-emerald-50 text-emerald-600 rounded-xl hover:bg-emerald-100 hover:text-emerald-700 flex items-center justify-center transition-colors border border-emerald-200 font-bold text-sm gap-2"
            title="Mark as Completed"
          >
            <CheckCircle className="h-5 w-5" />
            <span className="hidden sm:inline">Done</span>
          </button>
        )}

        {!isCancelled && (
          <button
            onClick={() => handleStatusChange(appointment.id, "CANCELLED")}
            className="shrink-0 h-[48px] w-[48px] bg-rose-50 text-rose-500 rounded-xl hover:bg-rose-100 hover:text-rose-600 flex items-center justify-center transition-colors border border-rose-200"
            title="Cancel Appointment"
          >
            <XCircle className="h-5 w-5" />
          </button>
        )}
      </div>
    </div>
  );
}
