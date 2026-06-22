"use client";

import React, { useState } from "react";
import { useSearchParams } from "next/navigation";
import {
  Activity,
  FileText,
  Pill,
  History,
  ClipboardList,
  Scan,
  ShieldCheck,
  Save,
} from "lucide-react";

import ConsultationHeader from "@/components/consultations/ConsultationHeader";
import VitalsTab from "@/components/consultations/tabs/VitalsTab";
import PrescriptionTab from "@/components/consultations/tabs/PrescriptionTab";
import MedicineTab from "@/components/consultations/tabs/MedicineTab";
import PlaceholderTab from "@/components/consultations/tabs/PlaceholderTab";
import PrescriptionHistory from "@/components/prescriptions/PrescriptionHistory";
import ActionButton from "@/components/dashboard/ActionButton";

import useConsultationRoom from "@/hooks/useConsultationRoom";
import usePrescription from "@/hooks/usePrescription";

type TabId =
  | "vitals"
  | "prescription"
  | "medicine"
  | "history"
  | "reports"
  | "scanning"
  | "audit";

interface TabItem {
  id: TabId;
  label: string;
  icon: React.ElementType;
}

const TABS: TabItem[] = [
  { id: "vitals", label: "Vitals", icon: Activity },
  { id: "prescription", label: "Prescription", icon: FileText },
  { id: "medicine", label: "Medicine", icon: Pill },
  { id: "history", label: "Previous history", icon: History },
  { id: "reports", label: "Reports", icon: ClipboardList },
  { id: "scanning", label: "Scanning reports", icon: Scan },
  { id: "audit", label: "Audit logs", icon: ShieldCheck },
];

export default function ConsultationPageContent() {
  const searchParams = useSearchParams();
  const appointmentId = searchParams.get("appointment") || "";

  const [activeTab, setActiveTab] = useState<TabId>("vitals");
  const [isSaving, setIsSaving] = useState(false);

  const {
    session,
    loading,
    vitals,
    setVitals,
    handleCompleteConsultation,
  } = useConsultationRoom(appointmentId);

  const {
    medicines,
    diagnosis: prescriptionDiagnosis,
    notes,
    setDiagnosis: setPrescriptionDiagnosis,
    setNotes,
    addMedicine,
    updateMedicine,
    removeMedicine,
    savePrescription,
    prescriptionHistory,
  } = usePrescription(appointmentId, session?.patient_name || "", vitals);

  const isCompleted = session?.status === "COMPLETED";

  if (loading) {
    return (
      <div className="h-[80vh] flex items-center justify-center text-slate-500">
        <div className="flex flex-col items-center gap-4">
          <Activity className="h-10 w-10 text-[#08A29E] animate-pulse" />
          <p className="font-semibold text-lg text-slate-600">Loading Consultation...</p>
        </div>
      </div>
    );
  }

  // Determine what data to display based on whether it's completed
  const displayDiagnosis = isCompleted ? session?.diagnosis || "" : prescriptionDiagnosis;
  const displayNotes = isCompleted ? session?.notes || "" : notes;
  const displayMedicines = isCompleted ? session?.medicines || [] : medicines;

  const handleSaveAll = async () => {
    setIsSaving(true);
    try {
      await savePrescription();
      alert("Consultation details saved successfully!");
    } catch (err) {
      console.error(err);
      alert("Failed to save consultation details.");
    } finally {
      setIsSaving(false);
    }
  };

  const renderActiveTabContent = () => {
    switch (activeTab) {
      case "vitals":
        return (
          <VitalsTab
            vitals={vitals}
            setVitals={setVitals}
            isCompleted={isCompleted}
          />
        );
      case "prescription":
        return (
          <PrescriptionTab
            diagnosis={displayDiagnosis}
            setDiagnosis={setPrescriptionDiagnosis}
            notes={displayNotes}
            setNotes={setNotes}
            isCompleted={isCompleted}
          />
        );
      case "medicine":
        return (
          <MedicineTab
            medicines={displayMedicines}
            addMedicine={addMedicine}
            updateMedicine={updateMedicine}
            removeMedicine={removeMedicine}
            isCompleted={isCompleted}
          />
        );
      case "history":
        return (
          <div className="bg-white shadow-[0_8px_30px_rgb(0,0,0,0.06)] border border-slate-200 rounded-3xl p-8">
            <PrescriptionHistory prescriptionHistory={prescriptionHistory || []} />
          </div>
        );
      case "reports":
        return (
          <PlaceholderTab
            title="Lab Reports"
            description="View and attach laboratory reports, blood work, and other diagnostic test results here."
          />
        );
      case "scanning":
        return (
          <PlaceholderTab
            title="Scanning Reports"
            description="View X-rays, MRIs, CT scans, and other imaging results associated with the patient."
          />
        );
      case "audit":
        return (
          <PlaceholderTab
            title="Audit Logs"
            description="Review the complete timeline of changes, edits, and access history for this consultation record."
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="max-w-[1400px] mx-auto px-6 py-8 space-y-8">
      {/* Top Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-6 rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-200">
        <ConsultationHeader
          patientName={session?.patient_name || "Patient"}
          handleCompleteConsultation={
            !isCompleted ? handleCompleteConsultation : undefined
          }
        />

        {/* Global Save Button */}
        {!isCompleted && (
          <div className="flex-shrink-0">
            <ActionButton
              onClick={handleSaveAll}
              disabled={isSaving}
              variant="primary"
              className="px-6 py-3.5 bg-[#08A29E] hover:bg-[#06827E] text-white text-sm font-black shadow-[0_4px_20px_rgba(8,162,158,0.3)] hover:shadow-[0_4px_25px_rgba(8,162,158,0.4)] border-none rounded-xl transition-all flex items-center gap-2"
            >
              <Save className="h-4 w-4" />
              {isSaving ? "Saving..." : "Save Details"}
            </ActionButton>
          </div>
        )}
      </div>

      {/* Main Layout: Sidebar + Content */}
      <div className="flex flex-col lg:flex-row gap-8 items-start">
        {/* Left Sidebar */}
        <div className="w-full lg:w-72 flex-shrink-0 bg-white rounded-3xl p-4 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-200 flex flex-col gap-2">
          <p className="px-4 py-2 text-xs font-black text-slate-400 uppercase tracking-widest mb-2">
            Consultation Menu
          </p>
          {TABS.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-4 w-full px-4 py-3.5 rounded-2xl text-left font-bold transition-all duration-200 ${
                  isActive
                    ? "bg-[#08A29E]/10 text-[#08A29E] shadow-sm"
                    : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                }`}
              >
                <Icon className={`h-5 w-5 ${isActive ? "text-[#08A29E]" : "text-slate-400"}`} />
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* Right Content Area */}
        <div className="flex-grow w-full min-w-0">
          <div className="animate-in fade-in slide-in-from-bottom-2 duration-300">
            {renderActiveTabContent()}
          </div>
        </div>
      </div>
    </div>
  );
}
