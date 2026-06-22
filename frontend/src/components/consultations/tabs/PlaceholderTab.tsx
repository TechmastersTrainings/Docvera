import React from "react";
import { Wrench } from "lucide-react";

interface PlaceholderTabProps {
  title: string;
  description: string;
}

export default function PlaceholderTab({ title, description }: PlaceholderTabProps) {
  return (
    <div className="bg-white shadow-[0_8px_30px_rgb(0,0,0,0.06)] border border-slate-200 rounded-3xl p-12 space-y-6 flex flex-col items-center justify-center min-h-[400px] text-center">
      <div className="p-6 rounded-3xl bg-slate-50 border border-slate-200 text-slate-400 mb-2">
        <Wrench className="h-12 w-12" />
      </div>
      <div>
        <h2 className="text-2xl font-black text-slate-800">{title}</h2>
        <p className="text-base text-slate-500 mt-2 max-w-md mx-auto">
          {description}
        </p>
      </div>
      <div className="mt-6 px-6 py-3 bg-[#08A29E]/10 text-[#08A29E] rounded-full text-sm font-bold">
        Coming Soon
      </div>
    </div>
  );
}
