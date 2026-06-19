"use client";

import React, { useState, useEffect, Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Search, MapPin, Stethoscope, ShieldCheck, ArrowLeft, ArrowRight, Loader, Filter } from "lucide-react";
import { api } from "@/lib/api";
import Navbar from "@/components/Navbar";

function SearchResults() {
 const searchParams = useSearchParams();
 const [doctors, setDoctors] = useState<any[]>([]);
 const [loading, setLoading] = useState(true);
 const [error, setError] = useState<string | null>(null);

 const lat = searchParams.get("lat") || "";
 const lng = searchParams.get("lng") || "";
 const pin = searchParams.get("pin") || "";
 const city = searchParams.get("city") || "";
 const initialSpecialization = searchParams.get("specialization") || "";

 const [selectedSpecialty, setSelectedSpecialty] = useState(initialSpecialization);
 const [cityFilter, setCityFilter] = useState(city);

 const fetchDoctors = async () => {
 setLoading(true);
 setError(null);
 try {
 const response = await api.get("/doctors/search/", {
 params: { lat, lng, pin_code: pin, city: cityFilter, specialization: selectedSpecialty },
 });
 if (response.data.success) {
 setDoctors(response.data.data);
 }
 } catch (err: any) {
 setError(err?.message || "Failed to load doctor directory listings.");
 } finally {
 setLoading(false);
 }
 };

 useEffect(() => {
 fetchDoctors();
 }, [selectedSpecialty, cityFilter, lat, lng, pin]);

 return (
 <div className="space-y-6">
 {/* Filters */}
 <div className="glass-card p-6 rounded-2xl grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
 <div className="space-y-1.5">
 <label className="text-xs font-bold text-muted uppercase tracking-wide">Specialty</label>
 <select
 value={selectedSpecialty}
 onChange={(e) => setSelectedSpecialty(e.target.value)}
 className="w-full bg-[rgba(255,255,255,0.04)] border border-[rgba(255,255,255,0.08)] focus:border-[var(--accent)] focus:ring-4 focus:ring-[rgba(50,109,205,0.15)] rounded-xl px-4 py-2.5 text-sm text-primary outline-none font-medium transition-all"
 >
 <option value="" className="bg-[#180c0c] text-primary">All Specializations</option>
 <option value="CARDIOLOGY" className="bg-[#180c0c] text-primary">Cardiology</option>
 <option value="DERMATOLOGY" className="bg-[#180c0c] text-primary">Dermatology</option>
 <option value="PEDIATRICS" className="bg-[#180c0c] text-primary">Pediatrics</option>
 <option value="GENERAL_MEDICINE" className="bg-[#180c0c] text-primary">General Medicine</option>
 <option value="ORTHOPEDICS" className="bg-[#180c0c] text-primary">Orthopedics</option>
 <option value="GYNECOLOGY" className="bg-[#180c0c] text-primary">Gynecology</option>
 <option value="NEUROLOGY" className="bg-[#180c0c] text-primary">Neurology</option>
 <option value="OPHTHALMOLOGY" className="bg-[#180c0c] text-primary">Ophthalmology</option>
 </select>
 </div>

 <div className="space-y-1.5">
 <label className="text-xs font-bold text-muted uppercase tracking-wide">City</label>
 <input
 type="text"
 placeholder="e.g. Bengaluru"
 value={cityFilter}
 onChange={(e) => setCityFilter(e.target.value)}
 className="w-full bg-[rgba(255,255,255,0.04)] border border-[rgba(255,255,255,0.08)] focus:border-[var(--accent)] focus:ring-4 focus:ring-[rgba(50,109,205,0.15)] rounded-xl px-4 py-2.5 text-sm text-primary outline-none placeholder:text-muted font-medium transition-all"
 />
 </div>

 <button
 onClick={fetchDoctors}
 className="sm:col-span-2 lg:col-span-1 mt-auto btn-primary w-full py-3 h-[48px]"
 >
 <Search className="h-4 w-4" />
 Search
 </button>
 </div>

 {/* Results */}
 {loading ? (
 <div className="flex flex-col items-center justify-center py-20 space-y-4">
 <Loader className="h-8 w-8 text-[var(--accent)] animate-spin" />
 <span className="text-secondary text-sm font-medium">Searching our certified medical registry...</span>
 </div>
 ) : error ? (
 <div className="p-6 bg-[rgba(11,170,244,0.1)] border border-[rgba(11,170,244,0.2)] text-[var(--accent)] text-sm rounded-2xl font-medium">
 {error}
 </div>
 ) : doctors.length === 0 ? (
 <div className="text-center py-20 glass-card space-y-4">
 <Stethoscope className="h-12 w-12 text-muted mx-auto opacity-50" />
 <h3 className="text-lg font-bold text-primary">No Verified Specialists Match</h3>
 <p className="text-sm font-medium text-secondary max-w-sm mx-auto">
 Try adjusting your specialized category, removing city filters, or enabling browser geolocation.
 </p>
 </div>
 ) : (
 <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
 {doctors.map((doc) => (
 <div key={doc.user} className="glass-secondary hover:border-[var(--accent)] hover:shadow-[0_4px_20px_rgba(50,109,205,0.1)] p-6 flex flex-col justify-between transition-all relative overflow-hidden group">
 <div className="absolute top-0 right-0 px-3 py-1.5 bg-[rgba(255,255,255,0.04)] border-l border-b border-[rgba(255,255,255,0.08)] text-muted text-xs font-bold rounded-bl-xl group-hover:bg-[rgba(50,109,205,0.1)] group-hover:text-[var(--accent)] group-hover:border-[rgba(50,109,205,0.2)] transition-colors">
 {doc.experience_years} Years
 </div>

 <div className="space-y-4">
 <span className="px-2.5 py-1 bg-[rgba(50,109,205,0.1)] text-[var(--accent)] border border-[rgba(50,109,205,0.2)] rounded-md text-[10px] font-bold tracking-wider uppercase">
 {doc.specialization}
 </span>
 <div className="space-y-1">
 <h3 className="text-lg font-bold text-primary group-hover:text-[var(--accent)] transition-colors">
 Dr. {doc.full_name}
 </h3>
 <p className="text-xs font-medium text-secondary">{doc.degree}</p>
 </div>
 <div className="flex items-center gap-2 text-xs font-medium text-muted">
 <MapPin className="h-4 w-4 text-[var(--accent)]" />
 <span>{doc.clinic_city} ({doc.clinic_pin_code})</span>
 </div>
 <p className="text-xs text-secondary line-clamp-2 leading-relaxed font-medium">
 {doc.about || "Clinical provider offering high-fidelity consultations, general diagnostics, and tailored therapeutic strategies."}
 </p>
 </div>

 <hr className="border-[rgba(255,255,255,0.08)] my-5" />

 <div className="flex items-center justify-between">
 <div>
 <span className="text-[10px] text-muted uppercase tracking-wider block font-bold">Consultation Fee</span>
 <span className="text-base font-bold text-primary">₹{doc.consultation_fees}</span>
 </div>
 <Link
 href={`/booking?doctor_id=${doc.user}`}
 className="inline-flex items-center gap-2 px-4 py-2.5 bg-[var(--accent)] text-white hover:bg-[#0988C3] text-xs font-bold rounded-xl transition-all shadow-[0_4px_15px_rgba(11,170,244,0.3)] hover:shadow-[0_6px_20px_rgba(11,170,244,0.4)] hover:-translate-y-0.5"
 >
 Book Now
 <ArrowRight className="h-3.5 w-3.5" />
 </Link>
 </div>
 </div>
 ))}
 </div>
 )}
 </div>
 );
}

export default function DoctorsSearchPage() {
 return (
 <div className="min-h-screen bg-transparent">
 <Navbar />
 <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-8">
 <div className="space-y-2">
 <Link href="/" className="inline-flex items-center gap-2 text-xs font-bold text-secondary hover:text-[var(--accent)] transition-colors">
 <ArrowLeft className="h-4 w-4" />
 Back to Home
 </Link>
 <h1 className="text-3xl font-bold text-primary tracking-tight">Verified Specialist Directory</h1>
 <p className="text-secondary font-medium text-sm">Review certified clinicians and book appointments.</p>
 </div>

 <Suspense fallback={
 <div className="flex flex-col items-center justify-center py-20 space-y-4">
 <Loader className="h-8 w-8 text-[var(--accent)] animate-spin" />
 <span className="text-secondary font-medium text-sm">Loading...</span>
 </div>
 }>
 <SearchResults />
 </Suspense>
 </div>
 </div>
 );
}
