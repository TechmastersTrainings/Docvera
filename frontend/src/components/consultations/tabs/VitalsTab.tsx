import React from "react";
import { Activity } from "lucide-react";

interface VitalsTabProps {
  vitals: any;
  setVitals: any;
  isCompleted: boolean;
}

export default function VitalsTab({ vitals, setVitals, isCompleted }: VitalsTabProps) {
  if (!vitals) return null;

  return (
    <div className="bg-white shadow-[0_8px_30px_rgb(0,0,0,0.06)] border border-slate-200 rounded-3xl p-8 space-y-6">
      <div className="flex items-center gap-4">
        <div className="p-4 rounded-2xl w-fit bg-[#08A29E]/10 border border-[#08A29E]/20 text-[#08A29E]">
          <Activity className="h-7 w-7 text-[#08A29E]" />
        </div>
        <div>
          <h2 className="text-2xl font-black text-slate-800">Vitals</h2>
          <p className="text-sm text-slate-500 mt-1">
            {isCompleted ? "Stored vitals for this visit" : "Enter today's vitals"}
          </p>
        </div>
      </div>

      <div className="space-y-6 mt-4">
        <div className="grid grid-cols-2 gap-6">
          <div className="flex flex-col gap-2">
            <label className="text-sm font-semibold text-slate-800">Blood Pressure</label>
            <input
              type="text"
              placeholder="e.g. 120/80"
              value={vitals.blood_pressure || ""}
              disabled={isCompleted}
              onChange={(e) => setVitals({ ...vitals, blood_pressure: e.target.value })}
              className="bg-white border border-slate-200 rounded-2xl px-4 py-3.5 text-slate-800 focus:bg-white focus:shadow-sm focus:border-[#08A29E] text-base outline-none transition-all w-full"
            />
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-sm font-semibold text-slate-800">Pulse Rate</label>
            <input
              type="text"
              placeholder="e.g. 80"
              value={vitals.pulse_rate || ""}
              disabled={isCompleted}
              onChange={(e) => setVitals({ ...vitals, pulse_rate: e.target.value })}
              className="bg-white border border-slate-200 rounded-2xl px-4 py-3.5 text-slate-800 focus:bg-white focus:shadow-sm focus:border-[#08A29E] text-base outline-none transition-all w-full"
            />
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-sm font-semibold text-slate-800">Temperature</label>
            <input
              type="text"
              placeholder="e.g. 98.6"
              value={vitals.temperature || ""}
              disabled={isCompleted}
              onChange={(e) => setVitals({ ...vitals, temperature: e.target.value })}
              className="bg-white border border-slate-200 rounded-2xl px-4 py-3.5 text-slate-800 focus:bg-white focus:shadow-sm focus:border-[#08A29E] text-base outline-none transition-all w-full"
            />
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-sm font-semibold text-slate-800">O2 Saturation</label>
            <input
              type="text"
              placeholder="e.g. 98"
              value={vitals.oxygen_saturation || ""}
              disabled={isCompleted}
              onChange={(e) => setVitals({ ...vitals, oxygen_saturation: e.target.value })}
              className="bg-white border border-slate-200 rounded-2xl px-4 py-3.5 text-slate-800 focus:bg-white focus:shadow-sm focus:border-[#08A29E] text-base outline-none transition-all w-full"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
