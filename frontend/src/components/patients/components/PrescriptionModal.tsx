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
      <div className="bg-gradient-to-br from-[#4682B4] to-[#2B547E] rounded-3xl w-full max-w-lg shadow-2xl overflow-hidden border border-white/30">
        <div className="flex items-center justify-between p-5 border-b border-white/20">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-white/20 shadow-inner backdrop-blur-md rounded-xl border border-white/30">
              <FileText className="h-5 w-5 text-white" />
            </div>
            <div>
              <h3 className="font-bold text-lg text-white">Prescription</h3>
              <p className="text-xs font-medium text-white/80">Dr. {doctorName} &bull; {date}</p>
            </div>
          </div>
          <button onClick={onClose} className="p-2 text-white hover:bg-black/10 rounded-xl transition-all">
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="p-6">
          {prescriptions && prescriptions.length > 0 ? (
            <div className="space-y-4">
              {prescriptions.map((presc, idx) => (
                <div key={idx} className="p-5 border border-white/30 rounded-2xl bg-white/10 hover:bg-white/20 transition-all backdrop-blur-md shadow-lg flex items-start gap-4">
                  <div className="p-2.5 bg-white/20 shadow-inner rounded-xl">
                    <Pill className="h-5 w-5 text-white" />
                  </div>
                  <div className="space-y-1 w-full">
                    <h4 className="font-bold text-white text-md">{presc.medicine_name}</h4>
                    <div className="grid grid-cols-2 gap-2 text-sm text-white/80">
                      <p><strong>Dosage:</strong> {presc.dosage}</p>
                      <p><strong>Frequency:</strong> {presc.frequency}</p>
                      <p><strong>Duration:</strong> {presc.duration}</p>
                    </div>
                    {presc.instructions && (
                      <p className="text-xs text-white/80 mt-2 pt-2 border-t border-white/10">
                        <strong>Instructions:</strong> {presc.instructions}
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <p className="text-white/80 font-medium">No prescriptions found for this consultation.</p>
            </div>
          )}
        </div>

        <div className="p-5 border-t border-white/20 flex justify-end">
          <button
            onClick={onClose}
            className="px-6 py-2.5 bg-white/10 border border-white/30 shadow-sm backdrop-blur-md text-white font-bold text-sm rounded-xl hover:bg-white/20 transition-all"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
