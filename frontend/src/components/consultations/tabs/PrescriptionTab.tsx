import React from "react";
import { FileText } from "lucide-react";

interface PrescriptionTabProps {
  diagnosis: string;
  setDiagnosis: React.Dispatch<React.SetStateAction<string>>;
  notes: string;
  setNotes: React.Dispatch<React.SetStateAction<string>>;
  isCompleted: boolean;
}

export default function PrescriptionTab({
  diagnosis,
  setDiagnosis,
  notes,
  setNotes,
  isCompleted,
}: PrescriptionTabProps) {
  return (
    <div className="bg-white shadow-[0_8px_30px_rgb(0,0,0,0.06)] border border-slate-200 rounded-3xl p-8 space-y-6">
      <div className="flex items-center gap-4">
        <div className="p-4 rounded-2xl w-fit bg-[#08A29E]/10 border border-[#08A29E]/20 text-[#08A29E]">
          <FileText className="h-7 w-7 text-[#08A29E]" />
        </div>
        <div>
          <h2 className="text-2xl font-black text-slate-800">Prescription Details</h2>
          <p className="text-sm text-slate-500 mt-1">
            {isCompleted ? "Stored clinical notes" : "Enter today's diagnosis and notes"}
          </p>
        </div>
      </div>

      <div className="space-y-6 mt-4">
        <div>
          <label className="block text-sm font-semibold text-slate-800 mb-2">
            Diagnosis
          </label>
          {isCompleted ? (
            <div className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-5 py-4 text-slate-800 min-h-[100px] whitespace-pre-wrap text-base leading-relaxed">
              {diagnosis || "No diagnosis recorded."}
            </div>
          ) : (
            <textarea
              rows={4}
              placeholder="Enter today's diagnosis..."
              value={diagnosis}
              onChange={(e) => setDiagnosis(e.target.value)}
              className="w-full bg-white border border-slate-200 rounded-2xl px-5 py-4 text-slate-800 focus:bg-white focus:shadow-sm focus:border-[#08A29E] outline-none transition-colors resize-none text-base"
            />
          )}
        </div>
        <div>
          <label className="block text-sm font-semibold text-slate-800 mb-2">
            Doctor Notes
          </label>
          {isCompleted ? (
            <div className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-5 py-4 text-slate-800 min-h-[100px] whitespace-pre-wrap text-base leading-relaxed">
              {notes || "No notes recorded."}
            </div>
          ) : (
            <textarea
              rows={4}
              placeholder="Additional instructions or notes..."
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className="w-full bg-white border border-slate-200 rounded-2xl px-5 py-4 text-slate-800 focus:bg-white focus:shadow-sm focus:border-[#08A29E] outline-none transition-colors resize-none text-base"
            />
          )}
        </div>
      </div>
    </div>
  );
}
