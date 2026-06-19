"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
 Plus, Calendar, Loader, Mail, Phone, MapPin,
 AlertCircle, Save, CheckCircle2, UserCheck, Camera, Clock, User
} from "lucide-react";
import { api } from "@/lib/api";
import Navbar from "@/components/Navbar";
import CancelAppointmentModal from "@/components/patients/components/CancelAppointmentModal";
import ReviewModal from "@/components/patients/components/ReviewModal";

export default function PatientDashboard() {
 const [profile, setProfile] = useState<any>(null);
 const [appointments, setAppointments] = useState<any[]>([]);
 const [loading, setLoading] = useState(true);
 const [activeTab, setActiveTab] = useState<"overview" | "edit-profile">("overview");
 const [fullName, setFullName] = useState("");
 const [gender, setGender] = useState("");
 const [city, setCity] = useState("");
 const [pinCode, setPinCode] = useState("");
 const [address, setAddress] = useState("");
 const [bloodGroup, setBloodGroup] = useState("");
 const [emergencyContact, setEmergencyContact] = useState("");
 const [selectedFile, setSelectedFile] = useState<File | null>(null);
 const [photoPreview, setPhotoPreview] = useState<string | null>(null);
 const [updating, setUpdating] = useState(false);
 const [formMessage, setFormMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);
 const [cancelModal, setCancelModal] = useState<{ open: boolean; id: string | null }>({ open: false, id: null });
 const [reviewModal, setReviewModal] = useState<{ open: boolean; id: string }>({ open: false, id: "" });

 useEffect(() => { fetchDashboardData(); }, []);

 const fetchDashboardData = async () => {
 setLoading(true);
 try {
 const [profileRes, apptRes] = await Promise.all([
 api.get("/patients/profile/"),
 api.get("/appointments/dashboard/patient/")
 ]);
 if (profileRes.data.success) {
 const p = profileRes.data.data;
 setProfile(p);
 setFullName(p.full_name || "");
 setGender(p.gender || "MALE");
 setCity(p.city || "");
 setPinCode(p.pin_code || "");
 setAddress(p.address || "");
 setBloodGroup(p.blood_group || "");
 setEmergencyContact(p.emergency_contact || "");
 if (p.profile_photo) {
 const baseUrl = process.env.NEXT_PUBLIC_API_URL || "https://docvera-0aa3.onrender.com";
 setPhotoPreview(p.profile_photo.startsWith("http") ? p.profile_photo : `${baseUrl}${p.profile_photo}`);
 }
 }
 if (apptRes.data.success) {
 setAppointments(apptRes.data.data);
 }
 } catch (err) {
 console.error("Error loading system metrics:", err);
 } finally {
 setLoading(false);
 }
 };

 const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
 if (e.target.files && e.target.files[0]) {
 const file = e.target.files[0];
 setSelectedFile(file);
 setPhotoPreview(URL.createObjectURL(file));
 }
 };

 const handleProfileUpdate = async (e: React.FormEvent) => {
 e.preventDefault();
 setUpdating(true);
 setFormMessage(null);
 const formData = new FormData();
 formData.append("full_name", fullName);
 formData.append("gender", gender);
 formData.append("city", city);
 formData.append("pin_code", pinCode);
 formData.append("address", address);
 if (bloodGroup) formData.append("blood_group", bloodGroup);
 if (emergencyContact) formData.append("emergency_contact", emergencyContact);
 if (selectedFile) formData.append("profile_photo", selectedFile);

 try {
 const response = await api.put("/patients/profile/", formData, {
 headers: { "Content-Type": "multipart/form-data" },
 });
 if (response.data.success) {
 const updatedData = response.data.data;
 setProfile(updatedData);
 setFormMessage({ type: "success", text: "Profile updated successfully!" });
 setSelectedFile(null);
 if (updatedData.profile_photo) {
 const baseUrl =
 process.env.NEXT_PUBLIC_API_URL ||
 "https://docvera-0aa3.onrender.com";
 setPhotoPreview(updatedData.profile_photo.startsWith("http") ? updatedData.profile_photo : `${baseUrl}${updatedData.profile_photo}`);
 }
 setTimeout(() => setActiveTab("overview"), 1500);
 }
 } catch (err: any) {
 setFormMessage({
 type: "error",
 text: err?.response?.data?.error ? JSON.stringify(err.response.data.error) : "Update failed."
 });
 } finally {
 setUpdating(false);
 }
 };

 if (loading) {
 return (
 <div className="min-h-screen bg-transparent flex items-center justify-center">
 <div className="text-center space-y-4">
 <Loader className="h-10 w-10 text-blue-600 animate-spin mx-auto" />
 <p className="text-slate-500 text-sm font-medium">Loading your health profile...</p>
 </div>
 </div>
 );
 }

 return (
 <div className="min-h-screen bg-transparent">
 <Navbar />
 <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-16 space-y-8">
 {/* Header */}
 <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6 pb-8 border-b border-slate-200">
 <div className="space-y-1">
 <h1 className="text-3xl sm:text-4xl font-bold text-slate-900 tracking-tight">Patient Dashboard</h1>
 <p className="text-slate-500 font-medium">Manage your appointments, update your profile, and track your health journey.</p>
 </div>
 <div className="flex items-center gap-3 w-full lg:w-auto">
 <button
 onClick={() => { setFormMessage(null); setActiveTab(activeTab === "overview" ? "edit-profile" : "overview"); }}
 className={`flex-1 lg:flex-none px-5 py-2.5 rounded-xl text-sm font-bold transition-all shadow-sm ${activeTab === "overview"
 ? "bg-white text-slate-700 border border-slate-200 hover:bg-slate-50"
 : "bg-blue-600 text-white hover:bg-blue-700"
 }`}
 >
 {activeTab === "overview" ? "Edit Profile" : "Back to Overview"}
 </button>
 <Link href="/doctors" className="flex-1 lg:flex-none inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl transition-all text-sm shadow-sm">
 <Plus className="h-4 w-4" />
 Book Appointment
 </Link>
 </div>
 </div>

 {activeTab === "overview" ? (
 <div className="grid lg:grid-cols-12 gap-8 items-start">
 {/* Profile Card */}
 <div className="lg:col-span-4 space-y-6">
 <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm">
 <div className="h-24 bg-gradient-to-r from-blue-600 to-indigo-500" />
 <div className="relative px-6 -mt-14">
 <div className="relative group w-fit">
 {photoPreview ? (
 <img src={photoPreview} alt="Profile" className="h-28 w-28 rounded-2xl object-cover border-4 border-white shadow-lg" />
 ) : (
 <div className="h-28 w-28 rounded-2xl bg-slate-100 border-4 border-white shadow-lg flex items-center justify-center">
 <span className="font-bold text-4xl text-blue-600">
 {profile?.full_name?.charAt(0) || "P"}
 </span>
 </div>
 )}
 <div className="absolute bottom-3 right-3 h-4 w-4 bg-emerald-500 rounded-full border-2 border-white shadow" />
 </div>
 </div>
 <div className="px-6 pt-3 pb-6 space-y-4">
 <div>
 <h3 className="font-bold text-xl text-slate-900">{profile?.full_name}</h3>
 <p className="text-slate-500 font-medium text-sm mt-0.5">Patient &bull; {profile?.city || "Location not set"}</p>
 </div>
 <div className="flex flex-wrap gap-2">
 <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-slate-100 border border-slate-200 rounded-lg text-xs text-slate-700 font-bold">
 {profile?.blood_group?.replace("_POSITIVE", "+")?.replace("_NEGATIVE", "-") || "N/A"}
 </span>
 <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-blue-50 border border-blue-100 rounded-lg text-xs text-blue-700 font-bold">
 <UserCheck className="h-3 w-3" />
 Verified
 </span>
 </div>
 </div>
 <hr className="border-slate-100" />
 <div className="p-6 space-y-4">
 <div className="flex items-center gap-4">
 <div className="p-2.5 bg-blue-50 rounded-xl border border-blue-100">
 <Mail className="h-5 w-5 text-blue-600" />
 </div>
 <div className="min-w-0 flex-1">
 <p className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Email</p>
 <p className="text-sm text-slate-900 font-bold truncate">{profile?.email}</p>
 </div>
 </div>
 <div className="flex items-center gap-4">
 <div className="p-2.5 bg-blue-50 rounded-xl border border-blue-100">
 <Phone className="h-5 w-5 text-blue-600" />
 </div>
 <div className="min-w-0 flex-1">
 <p className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Phone</p>
 <p className="text-sm text-slate-900 font-bold">{profile?.phone || "Not provided"}</p>
 </div>
 </div>
 <div className="flex items-center gap-4">
 <div className="p-2.5 bg-blue-50 rounded-xl border border-blue-100">
 <MapPin className="h-5 w-5 text-blue-600" />
 </div>
 <div className="min-w-0 flex-1">
 <p className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Location</p>
 <p className="text-sm text-slate-900 font-bold">{profile?.city || "Not set"}</p>
 </div>
 </div>
 </div>
 {profile?.address && (
 <>
 <hr className="border-slate-100" />
 <div className="p-6">
 <p className="text-[10px] uppercase font-bold text-slate-400 tracking-wider mb-2">Address</p>
 <p className="text-sm font-medium text-slate-600 leading-relaxed">{profile?.address}</p>
 </div>
 </>
 )}
 </div>
 </div>

 {/* Appointments */}
 <div className="lg:col-span-8 space-y-6">
 <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm">
 <div className="p-6 border-b border-slate-100 flex items-center justify-between">
 <div className="flex items-center gap-3">
 <div className="p-2.5 bg-blue-50 rounded-xl border border-blue-100">
 <Calendar className="h-5 w-5 text-blue-600" />
 </div>
 <div>
 <h2 className="text-lg font-bold text-slate-900">Your Appointments</h2>
 <p className="text-xs font-medium text-slate-500">Manage your scheduled visits</p>
 </div>
 </div>
 <span className="px-3 py-1 rounded-full text-xs bg-slate-100 border border-slate-200 font-bold text-slate-600">
 {appointments.length} Total
 </span>
 </div>

 <div className="divide-y divide-slate-100">
 {appointments.length > 0 ? (
 appointments.map((appt) => (
 <div key={appt.id} className="p-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-5 hover:bg-slate-50 transition-all group">
 <div className="space-y-2.5">
 <div className="flex flex-wrap items-center gap-2">
 <span className="inline-block px-2.5 py-0.5 rounded text-[10px] font-bold bg-slate-100 text-slate-600 border border-slate-200 uppercase tracking-widest">
 {appt.specialization || "General"}
 </span>
 <span className={`px-3 py-1 text-[11px] font-bold rounded-xl border uppercase tracking-wider ${appt.status === "COMPLETED" ? "bg-emerald-50 text-emerald-600 border-emerald-200" :
 appt.status === "CANCELLED" ? "bg-red-50 text-red-600 border-red-200" :
 "bg-blue-50 text-blue-600 border-blue-200"
 }`}>
 {appt.status}
 </span>
 </div>
 <h4 className="text-slate-900 font-bold text-lg group-hover:text-blue-600 transition-colors">Dr. {appt.doctor_name || "Specialist"}</h4>
 <div className="flex flex-wrap gap-4 text-sm font-medium text-slate-500">
 <div className="flex items-center gap-2">
 <Calendar className="h-4 w-4 text-blue-500" />
 <span>{appt.booking_date}</span>
 </div>
 <div className="flex items-center gap-2">
 <Clock className="h-4 w-4 text-blue-500" />
 <span>{appt.start_time} - {appt.end_time}</span>
 </div>
 </div>
 </div>

 <div className="flex items-center gap-4 w-full sm:w-auto justify-between sm:justify-end border-t sm:border-0 border-slate-100 pt-4 sm:pt-0">
 <div className="text-left sm:text-right space-y-1">
 <span className="block text-[10px] text-slate-400 font-bold uppercase tracking-wider">Fee</span>
 <span className="text-slate-900 font-bold text-lg">₹{appt.base_amount}</span>
 </div>
 <div className="flex items-center gap-2">
 {(appt.status === "PENDING" || appt.status === "CONFIRMED") && (
 <button
 onClick={() => setCancelModal({ open: true, id: appt.id })}
 className="px-4 py-2 bg-red-50 hover:bg-red-100 border border-red-200 text-red-600 text-xs font-bold rounded-xl transition-all"
 >
 Cancel
 </button>
 )}
 {appt.status === "COMPLETED" && (
 <button
 onClick={() => setReviewModal({ open: true, id: appt.id })}
 className="px-4 py-2 bg-white hover:bg-slate-50 border border-slate-200 text-slate-700 text-xs font-bold rounded-xl transition-all shadow-sm"
 >
 Review
 </button>
 )}
 </div>
 </div>
 </div>
 ))
 ) : (
 <div className="p-16 text-center space-y-4">
 <div className="p-4 bg-slate-50 border border-slate-200 rounded-2xl w-fit mx-auto">
 <Calendar className="h-6 w-6 text-slate-400" />
 </div>
 <div className="space-y-1">
 <p className="text-slate-900 font-bold">No appointments yet</p>
 <p className="text-slate-500 font-medium text-sm">Book your first appointment to get started</p>
 </div>
 </div>
 )}
 </div>
 </div>
 </div>
 </div>
 ) : (
 /* Edit Profile */
 <div className="max-w-3xl mx-auto">
 <div className="bg-white border border-slate-200 shadow-sm rounded-2xl p-6 sm:p-8">
 {formMessage && (
 <div className={`mb-6 p-4 rounded-xl flex items-center gap-3 text-sm font-bold border ${formMessage.type === "success" ? "bg-emerald-50 text-emerald-600 border-emerald-200" : "bg-red-50 text-red-600 border-red-200"
 }`}>
 {formMessage.type === "success" ? <CheckCircle2 className="h-5 w-5 shrink-0" /> : <AlertCircle className="h-5 w-5 shrink-0" />}
 <span>{formMessage.text}</span>
 </div>
 )}

 <form onSubmit={handleProfileUpdate} className="space-y-8">
 <div className="flex flex-col sm:flex-row items-center gap-6 p-6 bg-slate-50 border border-slate-200 rounded-2xl">
 <div className="relative group overflow-hidden rounded-xl shrink-0">
 {photoPreview ? (
 <img src={photoPreview} alt="Preview" className="h-24 w-24 rounded-xl object-cover border border-slate-200 shadow-sm" />
 ) : (
 <div className="h-24 w-24 rounded-xl bg-slate-200 border border-slate-300 flex items-center justify-center text-slate-400">
 <User className="h-8 w-8" />
 </div>
 )}
 <label htmlFor="photo-upload" className="absolute inset-0 flex items-center justify-center bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer rounded-xl">
 <Camera className="h-6 w-6 text-white" />
 </label>
 <input id="photo-upload" type="file" accept="image/*" onChange={handleFileChange} className="hidden" />
 </div>
 <div className="text-center sm:text-left">
 <h4 className="text-base font-bold text-slate-900">Profile Photo</h4>
 <p className="text-xs font-medium text-slate-500 mt-1">Click the photo to upload a new image.</p>
 </div>
 </div>

 <div className="grid sm:grid-cols-2 gap-5">
 <div className="space-y-1.5">
 <label className="text-xs font-bold text-slate-700 uppercase tracking-wide">Full Name</label>
 <input type="text" required value={fullName} onChange={(e) => setFullName(e.target.value)}
 className="w-full bg-white border border-slate-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 rounded-xl px-4 py-2.5 text-sm text-slate-900 font-medium outline-none transition-all shadow-sm" />
 </div>
 <div className="space-y-1.5">
 <label className="text-xs font-bold text-slate-700 uppercase tracking-wide">Gender</label>
 <select value={gender} onChange={(e) => setGender(e.target.value)}
 className="w-full bg-white border border-slate-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 rounded-xl px-4 py-2.5 text-sm text-slate-900 font-medium outline-none transition-all shadow-sm">
 <option value="MALE">Male</option>
 <option value="FEMALE">Female</option>
 <option value="OTHER">Other</option>
 </select>
 </div>
 <div className="space-y-1.5">
 <label className="text-xs font-bold text-slate-700 uppercase tracking-wide">Blood Group</label>
 <select value={bloodGroup} onChange={(e) => setBloodGroup(e.target.value)}
 className="w-full bg-white border border-slate-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 rounded-xl px-4 py-2.5 text-sm text-slate-900 font-medium outline-none transition-all shadow-sm">
 <option value="">Select</option>
 <option value="A_POSITIVE">A+</option>
 <option value="A_NEGATIVE">A-</option>
 <option value="B_POSITIVE">B+</option>
 <option value="B_NEGATIVE">B-</option>
 <option value="O_POSITIVE">O+</option>
 <option value="O_NEGATIVE">O-</option>
 <option value="AB_POSITIVE">AB+</option>
 <option value="AB_NEGATIVE">AB-</option>
 </select>
 </div>
 <div className="space-y-1.5">
 <label className="text-xs font-bold text-slate-700 uppercase tracking-wide">Emergency Contact</label>
 <input type="text" placeholder="+91 00000 00000" value={emergencyContact} onChange={(e) => setEmergencyContact(e.target.value)}
 className="w-full bg-white border border-slate-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 rounded-xl px-4 py-2.5 text-sm text-slate-900 font-medium outline-none transition-all placeholder:text-slate-400 shadow-sm" />
 </div>
 <div className="space-y-1.5">
 <label className="text-xs font-bold text-slate-700 uppercase tracking-wide">City</label>
 <input type="text" required value={city} onChange={(e) => setCity(e.target.value)}
 className="w-full bg-white border border-slate-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 rounded-xl px-4 py-2.5 text-sm text-slate-900 font-medium outline-none transition-all shadow-sm" />
 </div>
 <div className="space-y-1.5">
 <label className="text-xs font-bold text-slate-700 uppercase tracking-wide">PIN Code</label>
 <input type="text" required value={pinCode} onChange={(e) => setPinCode(e.target.value)}
 className="w-full bg-white border border-slate-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 rounded-xl px-4 py-2.5 text-sm text-slate-900 font-medium outline-none transition-all shadow-sm" />
 </div>
 <div className="sm:col-span-2 space-y-1.5">
 <label className="text-xs font-bold text-slate-700 uppercase tracking-wide">Full Address</label>
 <textarea required rows={3} value={address} onChange={(e) => setAddress(e.target.value)}
 className="w-full bg-white border border-slate-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 rounded-xl px-4 py-2.5 text-sm text-slate-900 font-medium outline-none transition-all resize-none shadow-sm" />
 </div>
 </div>

 <button type="submit" disabled={updating}
 className="w-full flex items-center justify-center gap-2.5 py-3.5 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl transition-all disabled:opacity-50 text-sm shadow-sm">
 {updating ? <Loader className="animate-spin h-5 w-5" /> : <Save className="h-5 w-5" />}
 <span>Save Changes</span>
 </button>
 </form>
 </div>
 </div>
 )}
 </main>

 <CancelAppointmentModal
 isOpen={cancelModal.open}
 appointmentId={cancelModal.id}
 onClose={() => setCancelModal({ open: false, id: null })}
 onSuccess={() => { setCancelModal({ open: false, id: null }); fetchDashboardData(); }}
 />
 <ReviewModal
 isOpen={reviewModal.open}
 appointmentId={reviewModal.id}
 onClose={() => setReviewModal({ open: false, id: "" })}
 onSuccess={() => { setReviewModal({ open: false, id: "" }); fetchDashboardData(); }}
 />
 </div>
 );
}
