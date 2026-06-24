"use client";



import React, { useState } from "react";

import Link from "next/link";

import { useRouter } from "next/navigation";

import { Activity, ShieldCheck, Mail, Lock, User, MapPin, Briefcase, Plus, AlertCircle, Building2, IndianRupee, ChevronDown, CheckCircle } from "lucide-react";

import { api } from "@/lib/api";

import Navbar from "@/components/Navbar";



export default function RegisterPage() {

 const [role, setRole] = useState<"PATIENT" | "DOCTOR">("PATIENT");

 const [email, setEmail] = useState("");

 const [password, setPassword] = useState("");

 const [phone, setPhone] = useState("");

 const [fullName, setFullName] = useState("");

 const [gender, setGender] = useState("MALE");

 const [dob, setDob] = useState("");

 const [city, setCity] = useState("Bengaluru");
 const [stateVal, setStateVal] = useState("Karnataka");

 const [pinCode, setPinCode] = useState("");

 const [address, setAddress] = useState("");
 
 const [profilePhoto, setProfilePhoto] = useState<File | null>(null);

 const KARNATAKA_CITIES = [
   "Bengaluru", "Mysuru", "Hubballi", "Mangaluru", "Belagavi",
   "Dharwad", "Kalaburagi", "Ballari", "Vijayapura", "Tumakuru",
   "Udupi", "Davangere", "Shivamogga", "Hassan", "Bidar"
 ];

 const [degree, setDegree] = useState("");

 const [specialization, setSpecialization] = useState("CARDIOLOGY");

 const [experienceYears, setExperienceYears] = useState("");

 const [medicalCouncilNumber, setMedicalCouncilNumber] = useState("");

 const [consultationFees, setConsultationFees] = useState("");

 const [clinicName, setClinicName] = useState("");

 const [clinicAddress, setClinicAddress] = useState("");

 const [clinicCity, setClinicCity] = useState("");

 const [clinicPinCode, setClinicPinCode] = useState("");



 const [loading, setLoading] = useState(false);

 const [error, setError] = useState<string | null>(null);

 const [success, setSuccess] = useState<string | null>(null);

 const router = useRouter();



 const handleRegister = async (e: React.FormEvent) => {

 e.preventDefault();

 setError(null);

 setSuccess(null);

 setLoading(true);



 const basePayload = {
 email, password, phone, full_name: fullName, gender, date_of_birth: dob, state: stateVal, city, pin_code: pinCode, address: role === "PATIENT" ? address : "",
 };



 try {

 if (role === "PATIENT") {

 const response = await api.post("/auth/register/patient/", basePayload);

 if (response.data.success) {

 setSuccess("Patient profile created successfully! Redirecting to login...");

 setTimeout(() => router.push("/login"), 2500);

 } else {

 setError(response.data.error || "Registration failed.");

 }

 } else {

 const doctorFormData = new FormData();
 Object.entries(basePayload).forEach(([key, val]) => doctorFormData.append(key, val as string));
 doctorFormData.append("degree", degree);
 doctorFormData.append("specialization", specialization);
 doctorFormData.append("experience_years", experienceYears || "0");
 doctorFormData.append("medical_council_number", medicalCouncilNumber);
 doctorFormData.append("consultation_fees", consultationFees || "0");
 doctorFormData.append("clinic_name", clinicName);
 doctorFormData.append("clinic_address", clinicAddress);
 doctorFormData.append("clinic_city", clinicCity);
 doctorFormData.append("clinic_pin_code", clinicPinCode);
 if (profilePhoto) {
   doctorFormData.append("profile_photo", profilePhoto);
 }

 const response = await api.post("/auth/register/doctor/", doctorFormData, {
   headers: { "Content-Type": "multipart/form-data" }
 });

 if (response.data.success) {

 setSuccess("Doctor application submitted! Admin must approve your credentials before login.");

 setTimeout(() => router.push("/login"), 4500);

 } else {

 setError(response.data.error || "Registration failed.");

 }

 }

 } catch (err: any) {
  let errMsg = "Registration failed.";
  if (err?.response?.data) {
    if (typeof err.response.data === 'string') {
      errMsg = err.response.data;
    } else if (err.response.data.error) {
      errMsg = typeof err.response.data.error === 'string' ? err.response.data.error : JSON.stringify(err.response.data.error);
    } else if (err.response.data.detail) {
      errMsg = err.response.data.detail;
    } else {
      errMsg = JSON.stringify(err.response.data);
    }
  } else if (err?.message) {
    errMsg = err.message;
  }
  setError(errMsg);
 } finally {

 setLoading(false);

 }

 };



 return (
 <div className="min-h-screen flex flex-col bg-transparent">
 <Navbar />
 <div className="flex-1 flex items-center justify-center px-4 py-12">
 <div className="w-full max-w-3xl">
 <div className="glass-card p-6 sm:p-8 space-y-8">
 <div className="text-center space-y-2">
 <Link href="/" className="inline-flex items-center gap-2 group">
 <div className="p-2 bg-[#028597] group-hover:bg-[#025964] transition-colors rounded-lg">
 <Activity className="h-5 w-5 text-white" />
 </div>
 <span className="text-lg font-bold text-primary tracking-tight">Docvera</span>
 </Link>
 <h2 className="text-2xl font-bold text-primary">Create Platform Account</h2>
 <p className="text-sm font-medium text-muted">Choose your clinical profile role to configure variables.</p>
 </div>

 {/* Role Selector */}
 <div className="flex p-1.5 glass-secondary">
 <button
 type="button"
 onClick={() => setRole("PATIENT")}
 className={`flex-1 py-3 text-sm font-bold rounded-lg transition-all ${role === "PATIENT"
 ? "bg-[rgba(2,133,151,0.1)] text-accent border border-[rgba(2,133,151,0.2)]"
 : "text-muted hover:text-secondary"
 }`}
 >
 Patient
 </button>
 <button
 type="button"
 onClick={() => setRole("DOCTOR")}
 className={`flex-1 py-3 text-sm font-bold rounded-lg transition-all ${role === "DOCTOR"
 ? "bg-[rgba(2,133,151,0.1)] text-accent border border-[rgba(2,133,151,0.2)]"
 : "text-muted hover:text-secondary"
 }`}
 >
 Doctor / Provider
 </button>
 </div>

 <form onSubmit={handleRegister} className="space-y-6">
 {error && (
 <div className="p-4 bg-[#fde7e9] border border-red-100 rounded-xl flex items-start gap-3 text-[#ee1123] text-sm font-medium">
 <AlertCircle className="h-5 w-5 shrink-0 mt-0.5" />
 <span className="break-all">{error}</span>
 </div>
 )}

 {success && (
 <div className="p-4 bg-[#eef2f7] border border-emerald-100 rounded-xl flex items-start gap-3 text-[#028597] text-sm font-medium">
 <CheckCircle className="h-5 w-5 shrink-0 mt-0.5" />
 <span>{success}</span>
 </div>
 )}

 <div className="grid md:grid-cols-2 gap-5">
 <div className="space-y-1.5">
 <label className="text-xs font-bold text-secondary uppercase tracking-wide">Full Name</label>
 <input type="text" required placeholder="Sarah Jenkins" value={fullName}
 onChange={(e) => setFullName(e.target.value)}
 className="w-full bg-white border border-[rgba(255,255,255,0.08)] focus:border-[#028597] focus:ring-4 focus:ring-[#028597]/10 rounded-xl px-4 py-2.5 text-sm text-primary outline-none transition-all placeholder:text-muted opacity-60 font-medium" />
 </div>
 <div className="space-y-1.5">
 <label className="text-xs font-bold text-secondary uppercase tracking-wide">Email Address</label>
 <input type="email" required placeholder="jenkins@docvera.com" value={email}
 onChange={(e) => setEmail(e.target.value)}
 className="w-full bg-white border border-[rgba(255,255,255,0.08)] focus:border-[#028597] focus:ring-4 focus:ring-[#028597]/10 rounded-xl px-4 py-2.5 text-sm text-primary outline-none transition-all placeholder:text-muted opacity-60 font-medium" />
 </div>
 <div className="space-y-1.5">
 <label className="text-xs font-bold text-secondary uppercase tracking-wide">Password</label>
 <input type="password" required placeholder="Create a password" value={password}
 onChange={(e) => setPassword(e.target.value)}
 className="w-full bg-white border border-[rgba(255,255,255,0.08)] focus:border-[#028597] focus:ring-4 focus:ring-[#028597]/10 rounded-xl px-4 py-2.5 text-sm text-primary outline-none transition-all placeholder:text-muted opacity-60 font-medium" />
 </div>
 <div className="space-y-1.5">
 <label className="text-xs font-bold text-secondary uppercase tracking-wide">Mobile Number</label>
 <input type="text" required placeholder="+91 9876543210" value={phone}
 onChange={(e) => setPhone(e.target.value)}
 className="w-full bg-white border border-[rgba(255,255,255,0.08)] focus:border-[#028597] focus:ring-4 focus:ring-[#028597]/10 rounded-xl px-4 py-2.5 text-sm text-primary outline-none transition-all placeholder:text-muted opacity-60 font-medium" />
 </div>
 <div className="space-y-1.5">
 <label className="text-xs font-bold text-secondary uppercase tracking-wide">Gender</label>
 <select value={gender} onChange={(e) => setGender(e.target.value)}
 className="w-full bg-white border border-[rgba(255,255,255,0.08)] focus:border-[#028597] focus:ring-4 focus:ring-[#028597]/10 rounded-xl px-4 py-2.5 text-sm text-primary outline-none transition-all font-medium">
 <option value="MALE">Male</option>
 <option value="FEMALE">Female</option>
 <option value="OTHER">Other</option>
 </select>
 </div>
 <div className="space-y-1.5">
 <label className="text-xs font-bold text-secondary uppercase tracking-wide">Date of Birth</label>
 <input type="date" required value={dob} onChange={(e) => setDob(e.target.value)}
 className="w-full bg-white border border-[rgba(255,255,255,0.08)] focus:border-[#028597] focus:ring-4 focus:ring-[#028597]/10 rounded-xl px-4 py-2.5 text-sm text-primary outline-none transition-all font-medium" />
 </div>
 <div className="space-y-1.5">
 <label className="text-xs font-bold text-secondary uppercase tracking-wide">State</label>
 <select disabled value={stateVal} className="w-full bg-white/50 border border-[rgba(255,255,255,0.08)] rounded-xl px-4 py-2.5 text-sm text-muted outline-none transition-all font-medium cursor-not-allowed">
   <option value="Karnataka">Karnataka</option>
 </select>
 </div>
 <div className="space-y-1.5">
 <label className="text-xs font-bold text-secondary uppercase tracking-wide">City</label>
 <select required value={city} onChange={(e) => setCity(e.target.value)}
 className="w-full bg-white border border-[rgba(255,255,255,0.08)] focus:border-[#028597] focus:ring-4 focus:ring-[#028597]/10 rounded-xl px-4 py-2.5 text-sm text-primary outline-none transition-all font-medium">
   {KARNATAKA_CITIES.map(c => <option key={c} value={c}>{c}</option>)}
 </select>
 </div>
 <div className="space-y-1.5">
 <label className="text-xs font-bold text-secondary uppercase tracking-wide">PIN Code</label>
 <input type="text" required placeholder="560001" value={pinCode}
 onChange={(e) => setPinCode(e.target.value)}
 className="w-full bg-white border border-[rgba(255,255,255,0.08)] focus:border-[#028597] focus:ring-4 focus:ring-[#028597]/10 rounded-xl px-4 py-2.5 text-sm text-primary outline-none transition-all placeholder:text-muted opacity-60 font-medium" />
 </div>
 {role === "PATIENT" && (
 <div className="space-y-1.5 md:col-span-2">
 <label className="text-xs font-bold text-secondary uppercase tracking-wide">Residential Address</label>
 <textarea required rows={2} placeholder="House No, Street, Landmark..." value={address}
 onChange={(e) => setAddress(e.target.value)}
 className="w-full bg-white border border-[rgba(255,255,255,0.08)] focus:border-[#028597] focus:ring-4 focus:ring-[#028597]/10 rounded-xl px-4 py-2.5 text-sm text-primary outline-none transition-all placeholder:text-muted opacity-60 resize-none font-medium" />
 </div>
 )}
 </div>

 {role === "DOCTOR" && (
 <div className="border-t border-[rgba(255,255,255,0.08)] pt-6 space-y-8">
 <div className="space-y-5">
 <h3 className="text-sm font-bold text-primary flex items-center gap-2">
 <Briefcase className="h-4 w-4 text-[#ee1123]" />
 Professional Medical Credentials
 </h3>
 <div className="grid md:grid-cols-2 gap-5">
 <div className="space-y-1.5">
 <label className="text-xs font-bold text-secondary uppercase tracking-wide">Medical Degree</label>
 <input type="text" required placeholder="MBBS, MD - Cardiology" value={degree}
 onChange={(e) => setDegree(e.target.value)}
 className="w-full bg-white border border-[rgba(255,255,255,0.08)] focus:border-[#028597] focus:ring-4 focus:ring-[#028597]/10 rounded-xl px-4 py-2.5 text-sm text-primary outline-none transition-all font-medium" />
 </div>
 <div className="space-y-1.5">
 <label className="text-xs font-bold text-secondary uppercase tracking-wide">Specialization</label>
 <select value={specialization} onChange={(e) => setSpecialization(e.target.value)}
 className="w-full bg-white border border-[rgba(255,255,255,0.08)] focus:border-[#028597] focus:ring-4 focus:ring-[#028597]/10 rounded-xl px-4 py-2.5 text-sm text-primary outline-none transition-all font-medium">
 <option value="CARDIOLOGY">Cardiology</option>
 <option value="DERMATOLOGY">Dermatology</option>
 <option value="PEDIATRICS">Pediatrics</option>
 <option value="GENERAL_MEDICINE">General Medicine</option>
 <option value="ORTHOPEDICS">Orthopedics</option>
 <option value="GYNECOLOGY">Gynecology</option>
 <option value="NEUROLOGY">Neurology</option>
 <option value="OPHTHALMOLOGY">Ophthalmology</option>
 </select>
 </div>
 <div className="space-y-1.5">
 <label className="text-xs font-bold text-secondary uppercase tracking-wide">Experience (Years)</label>
 <input type="number" required placeholder="12" value={experienceYears}
 onChange={(e) => setExperienceYears(e.target.value)}
 className="w-full bg-white border border-[rgba(255,255,255,0.08)] focus:border-[#028597] focus:ring-4 focus:ring-[#028597]/10 rounded-xl px-4 py-2.5 text-sm text-primary outline-none transition-all font-medium" />
 </div>
 <div className="space-y-1.5">
 <label className="text-xs font-bold text-secondary uppercase tracking-wide">Medical Council Number</label>
 <input type="text" required placeholder="KMC-87654" value={medicalCouncilNumber}
 onChange={(e) => setMedicalCouncilNumber(e.target.value)}
 className="w-full bg-white border border-[rgba(255,255,255,0.08)] focus:border-[#028597] focus:ring-4 focus:ring-[#028597]/10 rounded-xl px-4 py-2.5 text-sm text-primary outline-none transition-all font-medium" />
 </div>
 <div className="space-y-1.5 md:col-span-2">
 <label className="text-xs font-bold text-secondary uppercase tracking-wide">Consultation Fees (INR)</label>
 <div className="relative">
 <IndianRupee className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted opacity-60" />
 <input type="number" required placeholder="800" value={consultationFees}
 onChange={(e) => setConsultationFees(e.target.value)}
 className="w-full bg-white border border-[rgba(255,255,255,0.08)] focus:border-[#028597] focus:ring-4 focus:ring-[#028597]/10 rounded-xl pl-10 pr-4 py-2.5 text-sm text-primary outline-none transition-all font-medium" />
 </div>
 </div>
 <div className="space-y-1.5 md:col-span-2">
 <label className="text-xs font-bold text-secondary uppercase tracking-wide">Profile Picture</label>
 <input type="file" accept="image/*" onChange={(e) => {
   if (e.target.files && e.target.files[0]) {
     setProfilePhoto(e.target.files[0]);
   }
 }} className="w-full bg-white border border-[rgba(255,255,255,0.08)] focus:border-[#028597] focus:ring-4 focus:ring-[#028597]/10 rounded-xl px-4 py-2.5 text-sm text-primary outline-none transition-all font-medium" />
 <p className="text-[11px] text-muted font-medium mt-1">Upload a professional headshot. Max 5MB.</p>
 </div>
 </div>
 </div>

 <div className="space-y-5">
 <h3 className="text-sm font-bold text-primary flex items-center gap-2">
 <Building2 className="h-4 w-4 text-[#ee1123]" />
 Clinic / Hospital Information
 </h3>
 <div className="grid md:grid-cols-2 gap-5">
 <div className="space-y-1.5 md:col-span-2">
 <label className="text-xs font-bold text-secondary uppercase tracking-wide">Clinic / Hospital Name</label>
 <input type="text" required placeholder="City Heart Care Center" value={clinicName}
 onChange={(e) => setClinicName(e.target.value)}
 className="w-full bg-white border border-[rgba(255,255,255,0.08)] focus:border-[#028597] focus:ring-4 focus:ring-[#028597]/10 rounded-xl px-4 py-2.5 text-sm text-primary outline-none transition-all font-medium" />
 </div>
 <div className="space-y-1.5">
 <label className="text-xs font-bold text-secondary uppercase tracking-wide">Clinic City</label>
 <input type="text" required placeholder="Bengaluru" value={clinicCity}
 onChange={(e) => setClinicCity(e.target.value)}
 className="w-full bg-white border border-[rgba(255,255,255,0.08)] focus:border-[#028597] focus:ring-4 focus:ring-[#028597]/10 rounded-xl px-4 py-2.5 text-sm text-primary outline-none transition-all font-medium" />
 </div>
 <div className="space-y-1.5">
 <label className="text-xs font-bold text-secondary uppercase tracking-wide">Clinic PIN Code</label>
 <input type="text" required placeholder="560001" value={clinicPinCode}
 onChange={(e) => setClinicPinCode(e.target.value)}
 className="w-full bg-white border border-[rgba(255,255,255,0.08)] focus:border-[#028597] focus:ring-4 focus:ring-[#028597]/10 rounded-xl px-4 py-2.5 text-sm text-primary outline-none transition-all font-medium" />
 </div>
 </div>
 <div className="space-y-1.5">
 <label className="text-xs font-bold text-secondary uppercase tracking-wide">Clinic Full Address</label>
 <textarea required rows={2} placeholder="100 Feet Road, Near Metro Station" value={clinicAddress}
 onChange={(e) => setClinicAddress(e.target.value)}
 className="w-full bg-white border border-[rgba(255,255,255,0.08)] focus:border-[#028597] focus:ring-4 focus:ring-[#028597]/10 rounded-xl px-4 py-2.5 text-sm text-primary outline-none transition-all placeholder:text-muted opacity-60 resize-none font-medium" />
 </div>
 </div>
 </div>
 )}

 <button
 type="submit"
 disabled={loading}
 className="w-full flex items-center justify-center gap-2 py-3.5 bg-[#028597] text-white font-bold rounded-xl hover:bg-[#025964] transition-all disabled:opacity-50 text-sm shadow-sm"
 >
 <span>{loading ? "Registering..." : "Complete Registration"}</span>
 </button>
 </form>

 <hr className="border-[rgba(255,255,255,0.08)]" />

 <div className="text-center text-sm font-medium text-muted space-y-4">
 <div>
 Already have an account?{" "}
 <Link href="/login" className="text-[#ee1123] font-bold hover:text-[#025964]">
 Sign In
 </Link>
 </div>
 <div className="inline-flex items-center gap-1.5 text-xs text-muted opacity-60">
 <ShieldCheck className="h-4 w-4 text-[var(--cerulean)]" />
 <span>Verifiable Doctor Credential Registry</span>
 </div>
 </div>
 </div>
 </div>
 </div>
 </div>
 );

}