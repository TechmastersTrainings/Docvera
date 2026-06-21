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
        <div className="p-4 rounded-2xl bg-[#eef2f7] border border-[#537eac]/20">
          <CalendarX2 className="h-10 w-10 text-[#537eac]" />
        </div>
      </div>
      <h2 className="text-xl font-bold text-[#0f4557] mb-2">{title}</h2>
      <p className="text-sm font-medium text-[#537eac]">{description}</p>
    </div>
  );
}
