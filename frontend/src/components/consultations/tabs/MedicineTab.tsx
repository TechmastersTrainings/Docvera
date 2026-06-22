import React from "react";
import { Pill } from "lucide-react";
import MedicineRow from "@/components/prescriptions/MedicineRow";

interface MedicineTabProps {
  medicines: any[];
  addMedicine: () => void;
  updateMedicine: any;
  removeMedicine: any;
  isCompleted: boolean;
}

export default function MedicineTab({
  medicines,
  addMedicine,
  updateMedicine,
  removeMedicine,
  isCompleted,
}: MedicineTabProps) {
  if (!medicines) return null;

  return (
    <div className="bg-white shadow-[0_8px_30px_rgb(0,0,0,0.06)] border border-slate-200 rounded-3xl p-8 space-y-6">
      <div className="flex items-center gap-4">
        <div className="p-4 rounded-2xl w-fit bg-[#08A29E]/10 border border-[#08A29E]/20 text-[#08A29E]">
          <Pill className="h-7 w-7 text-[#08A29E]" />
        </div>
        <div>
          <h2 className="text-2xl font-black text-slate-800">Medicines</h2>
          <p className="text-sm text-slate-500 mt-1">
            {isCompleted ? "Prescribed medicines" : "Add medicines for today's visit"}
          </p>
        </div>
      </div>

      <div className="space-y-6 flex-grow mt-4">
        {isCompleted ? (
          <div className="grid gap-3">
            {medicines.filter(m => m.medicine_name).map((med: any, medIndex: number) => (
              <div key={medIndex} className="bg-slate-50 border border-slate-200 rounded-2xl p-4 text-sm text-slate-800 flex items-center justify-between">
                <div>
                  <span className="font-bold text-slate-800 text-base">{med.medicine_name}</span>
                  <span className="text-slate-500 text-xs block mt-1">{med.dosage} • {med.frequency} • {med.duration}</span>
                </div>
                {med.instructions && (
                  <span className="text-xs font-semibold px-3 py-1 bg-white border border-slate-200 rounded-lg text-slate-800">{med.instructions}</span>
                )}
              </div>
            ))}
          </div>
        ) : (
          <>
            {medicines.map((medicine, index) => (
              <MedicineRow
                key={index}
                index={index}
                medicine={medicine}
                updateMedicine={updateMedicine}
                removeMedicine={removeMedicine}
              />
            ))}

            <button
              type="button"
              onClick={addMedicine}
              className="w-full py-4 border-2 border-dashed border-[#08A29E]/30 text-[#08A29E] hover:border-[#08A29E] hover:bg-[#08A29E]/5 rounded-2xl text-base font-bold transition-colors cursor-pointer"
            >
              + Add Medicine
            </button>
          </>
        )}
      </div>
    </div>
  );
}
