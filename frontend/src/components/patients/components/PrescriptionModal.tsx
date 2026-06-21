import React from "react";
import { X, FileText, Pill } from "lucide-react";

interface Prescription {
  medicine_name: string;
  dosage: string;
  frequency: string;
  duration: string;
  instructions: string;
}

interface Props {
  open: boolean;
  onClose: () => void;
  prescriptions: Prescription[];
  doctorName: string;
  date: string;
}

export default function PrescriptionModal({ open, onClose, prescriptions, doctorName, date }: Props) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm">
      <div className="bg-white rounded-2xl w-full max-w-lg shadow-xl overflow-hidden border border-[#537eac]/20">
        <div className="flex items-center justify-between p-5 border-b border-[#537eac]/15 bg-[#f8fafc]">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-[#eef2f7] rounded-xl border border-blue-100">
              <FileText className="h-5 w-5 text-[#028597]" />
            </div>
            <div>
              <h3 className="font-bold text-lg text-[#0f4557]">Prescription</h3>
              <p className="text-xs font-medium text-[#537eac]">Dr. {doctorName} &bull; {date}</p>
            </div>
          </div>
          <button onClick={onClose} className="p-2 text-[#537eac] hover:bg-[#eef2f7] rounded-xl transition-all">
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="p-6">
          {prescriptions && prescriptions.length > 0 ? (
            <div className="space-y-4">
              {prescriptions.map((presc, idx) => (
                <div key={idx} className="p-4 border border-[#537eac]/20 rounded-xl bg-white shadow-sm flex items-start gap-4">
                  <div className="p-2 bg-[#eef2f7] rounded-lg">
                    <Pill className="h-5 w-5 text-[#028597]" />
                  </div>
                  <div className="space-y-1 w-full">
                    <h4 className="font-bold text-[#0f4557] text-md">{presc.medicine_name}</h4>
                    <div className="grid grid-cols-2 gap-2 text-sm text-[#537eac]">
                      <p><strong>Dosage:</strong> {presc.dosage}</p>
                      <p><strong>Frequency:</strong> {presc.frequency}</p>
                      <p><strong>Duration:</strong> {presc.duration}</p>
                    </div>
                    {presc.instructions && (
                      <p className="text-xs text-[#537eac] mt-2 pt-2 border-t border-[#537eac]/15">
                        <strong>Instructions:</strong> {presc.instructions}
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <p className="text-[#537eac] font-medium">No prescriptions found for this consultation.</p>
            </div>
          )}
        </div>

        <div className="p-5 border-t border-[#537eac]/15 bg-[#f8fafc] flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2.5 bg-white border border-[#537eac]/20 text-[#0f4557] font-bold text-sm rounded-xl hover:bg-[#eef2f7] transition-all"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
