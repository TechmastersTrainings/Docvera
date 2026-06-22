"use client";

import React, { useState } from "react";
import {
  Clock3,
  FileText,
  Activity,
  Pill,
  ChevronDown,
  ChevronUp,
  Stethoscope,
} from "lucide-react";

interface VitalsData {
  blood_pressure?: string;
  pulse_rate?: string;
  temperature?: string;
  oxygen_saturation?: string;
}

interface MedicineItem {
  medicine_name: string;
  dosage?: string;
  frequency?: string;
  duration?: string;
  instructions?: string;
}

interface HistoryItem {
  id: string;
  created_at: string;
  diagnosis?: string;
  notes?: string;
  vitals?: VitalsData | null;
  medicines?: MedicineItem[];
}

interface Props {
  prescriptionHistory: HistoryItem[];
}

function HistoryCard({ item, index }: { item: HistoryItem; index: number }) {
  const [expanded, setExpanded] = useState(index === 0); // First card expanded by default

  const hasMedicines = item.medicines && item.medicines.length > 0;
  const hasVitals =
    item.vitals &&
    (item.vitals.blood_pressure ||
      item.vitals.pulse_rate ||
      item.vitals.temperature ||
      item.vitals.oxygen_saturation);

  const visitDate = new Date(item.created_at);
  const formattedDate = visitDate.toLocaleDateString("en-IN", {
    weekday: "short",
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <div className="bg-[#6c757d] border border-white/10 rounded-3xl overflow-hidden shadow-xl shadow-black/40 transition-all duration-300">
      {/* Card Header - always visible */}
      <button
        onClick={() => setExpanded(!expanded)}
        className="w-full text-left p-6 flex items-center justify-between gap-4 hover:bg-white/5 transition-colors"
      >
        <div className="flex items-center gap-4">
          <div className="p-3 rounded-2xl bg-[#08A29E]/15 border border-[#08A29E]/30 shrink-0">
            <Stethoscope className="h-6 w-6 text-white" />
          </div>
          <div>
            <p className="text-sm font-bold uppercase tracking-widest text-white mb-1">
              Visit Record
            </p>
            <h3 className="text-xl font-black text-white leading-tight">
              {item.diagnosis || "General Consultation"}
            </h3>
            <div className="flex items-center gap-2 mt-1.5 text-sm text-white">
              <Clock3 className="h-4 w-4" />
              <span>{formattedDate}</span>
            </div>
          </div>
        </div>
        <div className="shrink-0 flex items-center gap-3">
          {hasMedicines && (
            <span className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 bg-[#4F8EF7]/15 border border-[#4F8EF7]/30 rounded-full text-sm font-bold text-white">
              <Pill className="h-4 w-4" />
              {item.medicines!.length} Med{item.medicines!.length > 1 ? "s" : ""}
            </span>
          )}
          <div className="p-2 rounded-xl bg-white/5 border border-white/10 text-white">
            {expanded ? (
              <ChevronUp className="h-4 w-4" />
            ) : (
              <ChevronDown className="h-4 w-4" />
            )}
          </div>
        </div>
      </button>

      {/* Expandable Content */}
      {expanded && (
        <div className="border-t border-white/10">

          {/* Vitals Row */}
          {hasVitals && (
            <div className="p-6 border-b border-white/10">
              <div className="flex items-center gap-2 mb-4">
                <Activity className="h-5 w-5 text-white" />
                <p className="text-sm font-black uppercase tracking-widest text-white">
                  Recorded Vitals
                </p>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {item.vitals?.blood_pressure && (
                  <div className="bg-white/5 border border-white/10 rounded-2xl p-3 text-center">
                    <p className="text-sm text-white font-semibold uppercase tracking-wider mb-1">
                      Blood Pressure
                    </p>
                    <p className="text-xl font-black text-white">
                      {item.vitals.blood_pressure}
                    </p>
                  </div>
                )}
                {item.vitals?.pulse_rate && (
                  <div className="bg-white/5 border border-white/10 rounded-2xl p-3 text-center">
                    <p className="text-sm text-white font-semibold uppercase tracking-wider mb-1">
                      Pulse Rate
                    </p>
                    <p className="text-xl font-black text-white">
                      {item.vitals.pulse_rate}
                    </p>
                  </div>
                )}
                {item.vitals?.temperature && (
                  <div className="bg-white/5 border border-white/10 rounded-2xl p-3 text-center">
                    <p className="text-sm text-white font-semibold uppercase tracking-wider mb-1">
                      Temperature
                    </p>
                    <p className="text-xl font-black text-white">
                      {item.vitals.temperature}
                    </p>
                  </div>
                )}
                {item.vitals?.oxygen_saturation && (
                  <div className="bg-white/5 border border-white/10 rounded-2xl p-3 text-center">
                    <p className="text-sm text-white font-semibold uppercase tracking-wider mb-1">
                      O2 Saturation
                    </p>
                    <p className="text-xl font-black text-white">
                      {item.vitals.oxygen_saturation}
                    </p>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Diagnosis & Notes */}
          {(item.diagnosis || item.notes) && (
            <div className="p-6 border-b border-white/10 space-y-4">
              <div className="flex items-center gap-2 mb-2">
                <FileText className="h-5 w-5 text-white" />
                <p className="text-sm font-black uppercase tracking-widest text-white">
                  Prescription Details
                </p>
              </div>
              {item.diagnosis && (
                <div>
                  <p className="text-sm font-bold text-white mb-1.5 uppercase tracking-wider">
                    Diagnosis
                  </p>
                  <p className="text-base text-white leading-relaxed bg-white/5 border border-white/10 rounded-2xl px-4 py-3">
                    {item.diagnosis}
                  </p>
                </div>
              )}
              {item.notes && (
                <div>
                  <p className="text-sm font-bold text-white mb-1.5 uppercase tracking-wider">
                    Doctor Notes
                  </p>
                  <p className="text-base text-white leading-relaxed bg-white/5 border border-white/10 rounded-2xl px-4 py-3">
                    {item.notes}
                  </p>
                </div>
              )}
            </div>
          )}

          {/* Medicines */}
          {hasMedicines && (
            <div className="p-6">
              <div className="flex items-center gap-2 mb-4">
                <Pill className="h-5 w-5 text-white" />
                <p className="text-sm font-black uppercase tracking-widest text-white">
                  Prescribed Medicines
                </p>
              </div>
              <div className="space-y-3">
                {item.medicines!.map((med, medIndex) => (
                  <div
                    key={medIndex}
                    className="bg-white/5 border border-white/10 rounded-2xl p-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3"
                  >
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="h-2 w-2 rounded-full bg-[#4F8EF7] inline-block" />
                        <p className="text-lg font-black text-white">
                          {med.medicine_name}
                        </p>
                      </div>
                      <div className="flex flex-wrap gap-x-4 gap-y-1 text-sm text-white ml-4">
                        {med.dosage && (
                          <span>
                            <span className="text-white">Dosage: </span>
                            <span className="text-white font-semibold">
                              {med.dosage}
                            </span>
                          </span>
                        )}
                        {med.frequency && (
                          <span>
                            <span className="text-white">Freq: </span>
                            <span className="text-white font-semibold">
                              {med.frequency}
                            </span>
                          </span>
                        )}
                        {med.duration && (
                          <span>
                            <span className="text-white">Duration: </span>
                            <span className="text-white font-semibold">
                              {med.duration}
                            </span>
                          </span>
                        )}
                      </div>
                    </div>
                    {med.instructions && (
                      <span className="shrink-0 text-sm font-semibold px-3 py-1.5 bg-amber-500/10 border border-amber-500/20 rounded-xl text-white">
                        {med.instructions}
                      </span>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default function PrescriptionHistory({ prescriptionHistory }: Props) {
  return (
    <div className="space-y-6 mt-4 pb-12 max-w-4xl mx-auto">
      {prescriptionHistory.length === 0 ? (
        <div className="bg-[#6c757d] border border-white/10 rounded-3xl p-12 text-center">
          <p className="text-white text-base">
            No previous prescription history found for this patient.
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {prescriptionHistory.map((item, index) => (
            <HistoryCard key={item.id} item={item} index={index} />
          ))}
        </div>
      )}
    </div>
  );
}