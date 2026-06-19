"use client";

import React from "react";
import { CalendarX2 } from "lucide-react";

interface Props {
  title: string;
  description: string;
}

export default function EmptyAppointments({ title, description }: Props) {
  return (
    <div className="p-12 text-center">
      <div className="flex justify-center mb-5">
        <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200">
          <CalendarX2 className="h-10 w-10 text-slate-400" />
        </div>
      </div>
      <h2 className="text-xl font-bold text-slate-900 mb-2">{title}</h2>
      <p className="text-sm font-medium text-slate-500">{description}</p>
    </div>
  );
}
