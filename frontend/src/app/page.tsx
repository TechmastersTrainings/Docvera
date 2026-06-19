//src/app/page.tsx
"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
 Search,
 MapPin,
 ShieldCheck,
 Heart,
 Stethoscope,
 Activity,
 Compass,
 ArrowRight,
 Award,
 Eye,
 Plus,
 Hospital as HospitalIcon,
 CheckCircle,
 Shield,
 Sparkles
} from "lucide-react";
import AOS from "aos";

import { api } from "@/lib/api";
import Navbar from "@/components/Navbar";

interface Doctor {
 user: string;
 full_name: string;
 email: string;
 phone: string;
 gender: string;
 date_of_birth: string;
 city: string;
 pin_code: string;
 address: string;
 degree: string;
 specialization: string;
 experience_years: number;
 medical_council_number: string;
 consultation_fees: string;
 languages_spoken: string;
 about: string;
 clinic_name: string;
 clinic_address: string;
 clinic_city: string;
 clinic_pin_code: string;
 clinic_latitude: string | null;
 clinic_longitude: string | null;
 approval_status: string;
 profile_photo: string | null;
 availabilities: any[];
}

export default function LandingPage() {
 const router = useRouter();
 const [activeFaq, setActiveFaq] = useState<number | null>(null);
 const [searchMode, setSearchMode] = useState<'DOCTOR' | 'HOSPITAL'>('DOCTOR');
 const [latitude, setLatitude] = useState<number | null>(null);
 const [longitude, setLongitude] = useState<number | null>(null);
 const [cityInput, setCityInput] = useState("");
 const [pinInput, setPinInput] = useState("");
 const [geoStatus, setGeoStatus] = useState<"idle" | "loading" | "success" | "denied">("idle");
 const [searchQuery, setSearchQuery] = useState("");
 const [doctors, setDoctors] = useState<Doctor[]>([]);
 const [isLoadingDoctors, setIsLoadingDoctors] = useState(true);
 const [searchError, setSearchError] = useState<string | null>(null);
 const [selectedPreviewIdx, setSelectedPreviewIdx] = useState<number>(0);

 const handleGeoLocate = () => {
 if (!navigator.geolocation) {
 setGeoStatus("denied");
 setSearchError("Geolocation is not supported by your browser.");
 return;
 }
 setGeoStatus("loading");
 setSearchError(null);

 navigator.geolocation.getCurrentPosition(
 (position) => {
 setLatitude(position.coords.latitude);
 setLongitude(position.coords.longitude);
 setGeoStatus("success");
 },
 (error) => {
 setGeoStatus("denied");
 setSearchError("Location access denied. Please use PIN or City search.");
 },
 { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 }
 );
 };

 const handleSearch = () => {
 setSearchError(null);
 if (!latitude && !pinInput.trim() && !cityInput.trim()) {
 setSearchError("Please enable location access or enter a PIN Code/City to search.");
 return;
 }
 const params = new URLSearchParams();
 if (latitude && longitude) {
 params.append('lat', latitude.toString());
 params.append('lng', longitude.toString());
 }
 if (pinInput.trim()) params.append('pin_code', pinInput.trim());
 if (cityInput.trim()) params.append('city', cityInput.trim());

 if (searchMode === 'DOCTOR') {
 if (searchQuery.trim()) params.append('specialization', searchQuery.trim());
 router.push(`/doctors?${params.toString()}`);
 } else {
 if (searchQuery.trim()) params.append('name', searchQuery.trim());
 router.push(`/hospitals?${params.toString()}`);
 }
 };

 useEffect(() => {
 AOS.init({
 once: true,
 duration: 800,
 easing: 'ease-out-cubic'
 });

 const fetchDoctors = async () => {
 try {
 setIsLoadingDoctors(true);
 const response = await api.get("/doctors/search/");
 if (response.data.success && response.data.data) {
 setDoctors(response.data.data);
 }
 } catch (error) {
 console.error("Error fetching doctors:", error);
 } finally {
 setIsLoadingDoctors(false);
 }
 };
 fetchDoctors();
 }, []);

 const specializations = [
 { name: "Cardiology", icon: Heart, desc: "Heart disease diagnosis & advanced treatments" },
 { name: "Dermatology", icon: Stethoscope, desc: "Comprehensive skin health & clinical therapy" },
 { name: "Pediatrics", icon: Activity, desc: "Newborn health & pediatric wellness care" },
 { name: "Neurology", icon: Award, desc: "Expert neurological evaluation & care" },
 { name: "Orthopedics", icon: Compass, desc: "Bone restoration, joints & trauma surgeries" },
 { name: "Ophthalmology", icon: Eye, desc: "Precision eye testings & visual enhancements" },
 ];

 const faqs = [
 { q: "How does the 10-minute slot lock booking engine function?", a: "When you select a doctor's slot, the booking engine applies an atomic lock on that schedule for exactly 10 minutes. This guarantees that no other user can double-book or hijack the slot while you complete your Razorpay transaction." },
 { q: "Can I reschedule or cancel my appointment later?", a: "Yes. Through your patient dashboard, you can reschedule to any other open availability slot for the same doctor, or cancel. Cancellations automatically trigger transactional status updates and refund payloads." },
 { q: "What should I do if my browser geolocation is blocked?", a: "If you deny location privileges, Docvera falls back dynamically to PIN Code search, and then to City filtering to ensure you can locate certified clinicians in your proximity instantly." },
 ];

 const currentPreviewDoctor = doctors[selectedPreviewIdx] || doctors[0];

 /* Per-specialization accent colors using the new clean palette */
 const specColors = [
 { bg: "bg-blue-50", border: "border-blue-100", icon: "bg-blue-100", iconStroke: "text-blue-600", link: "text-blue-600" },
 { bg: "bg-teal-50", border: "border-teal-100", icon: "bg-teal-100", iconStroke: "text-teal-600", link: "text-teal-600" },
 { bg: "bg-indigo-50", border: "border-indigo-100", icon: "bg-indigo-100", iconStroke: "text-indigo-600", link: "text-indigo-600" },
 { bg: "bg-emerald-50", border: "border-emerald-100", icon: "bg-emerald-100", iconStroke: "text-emerald-600", link: "text-emerald-600" },
 { bg: "bg-sky-50", border: "border-sky-100", icon: "bg-sky-100", iconStroke: "text-sky-600", link: "text-sky-600" },
 { bg: "bg-violet-50", border: "border-violet-100", icon: "bg-violet-100", iconStroke: "text-violet-600", link: "text-violet-600" },
 ];

 return (
 <div className="font-sans min-h-screen bg-transparent flex flex-col">
 <Navbar />

 {/* ═══════ HERO ═══════ */}
 <section id="home" className="relative pt-12 pb-20 bg-transparent">
 <div className="max-w-7xl mx-auto px-6 relative z-10 mt-8">
 <div className="grid md:grid-cols-12 gap-12 items-center">

 {/* Left Content */}
 <div className="md:col-span-7 space-y-6 animate-fade-in" data-aos="fade-up" data-aos-duration="1000">
 <div className="inline-flex items-center gap-2 glass-secondary px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider text-primary shadow-sm">
 <ShieldCheck className="h-4 w-4 text-[var(--accent)]" /> Verified Healthcare Ecosystem
 </div>
 <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black leading-tight tracking-tight text-primary">
 Instant consultations. <br />
 <span className="text-[var(--accent)]">Zero double bookings.</span>
 </h1>
 <p className="text-secondary text-sm sm:text-base max-w-lg leading-relaxed font-medium">
 Connect with top-rated medical specialists and verified multi-specialty hospitals instantly.
 Pessimistic database locking protects your slot reservation in real-time.
 </p>

 <div className="flex flex-wrap gap-4 pt-4">
 <a
 href="#search-engine"
 className="btn-primary rounded-full px-8 py-3.5 font-bold text-sm flex items-center gap-2"
 >
 Find Providers <ArrowRight className="h-4 w-4" />
 </a>
 <a
 href="#specializations"
 className="btn-ghost rounded-full px-8 py-3.5 font-bold text-sm"
 >
 Clinical Specializations
 </a>
 </div>

 <div className="flex items-center gap-5 pt-6 text-muted text-xs font-medium">
 <div className="flex -space-x-3">
 <div className="w-10 h-10 rounded-full bg-[rgba(255,255,255,0.04)] border-2 border-[rgba(255,255,255,0.1)] flex items-center justify-center font-bold text-[10px] text-primary">MD</div>
 <div className="w-10 h-10 rounded-full bg-[rgba(255,255,255,0.04)] border-2 border-[rgba(255,255,255,0.1)] flex items-center justify-center font-bold text-[10px] text-[var(--accent)]">OB</div>
 <div className="w-10 h-10 rounded-full bg-[rgba(255,255,255,0.04)] border-2 border-[rgba(255,255,255,0.1)] flex items-center justify-center font-bold text-[10px] text-[var(--accent)]">P</div>
 <div className="w-10 h-10 rounded-full bg-[rgba(255,255,255,0.04)] border-2 border-[rgba(255,255,255,0.1)] flex items-center justify-center text-[10px] font-bold text-primary">1K+</div>
 </div>
 <span className="flex items-center gap-1.5"><CheckCircle className="h-4 w-4 text-[var(--accent)]" /> Trusted by patients</span>
 </div>
 </div>

 {/* Right: Floating booking card */}
 <div className="md:col-span-5 relative flex justify-center" data-aos="fade-left" data-aos-duration="1200">
 {isLoadingDoctors ? (
 <div className="w-full max-w-md p-8 glass-card h-64 animate-pulse" />
 ) : currentPreviewDoctor ? (
 <div className="w-full max-w-md p-6 glass-card space-y-5 relative ">
 <div className="absolute -top-4 -right-4 bg-[var(--accent)] rounded-full p-3 shadow-lg text-white">
 <Shield className="h-6 w-6" />
 </div>

 <div className="flex items-center justify-between pb-4 border-b border-[rgba(255,255,255,0.08)]">
 <div className="flex items-center space-x-2">
 <div className="h-2.5 w-2.5 rounded-full bg-[var(--accent)] animate-pulse" />
 <span className="text-[10px] font-bold uppercase tracking-wider text-muted">Booking Lock Engine Active</span>
 </div>
 <span className="px-2.5 py-1 bg-[rgba(11,170,244,0.15)] text-[var(--accent)] border border-[rgba(11,170,244,0.3)] rounded text-[10px] font-bold">10:00 LOCK TIMER</span>
 </div>

 <div className="p-4 glass-secondary rounded-2xl flex items-center justify-between">
 <div className="space-y-1">
 <span className="text-[10px] uppercase tracking-wider text-muted font-bold">Specialist MD</span>
 <h4 className="text-sm font-bold text-primary">Dr. {currentPreviewDoctor.full_name}</h4>
 <p className="text-[11px] font-medium text-secondary">{currentPreviewDoctor.specialization} • {currentPreviewDoctor.clinic_name || "Certified Facility"}</p>
 </div>
 <Heart className="h-6 w-6 text-[var(--accent)] fill-[var(--accent)]/20" />
 </div>

 <div className="space-y-4 pt-2">
 {[
 "Acquired pessimistic DB concurrency lock",
 "Initialized secure Razorpay transaction",
 ].map((step, i) => (
 <div key={i} className="flex items-center space-x-3 text-xs font-medium">
 <div className="h-7 w-7 rounded-lg glass-secondary text-[var(--accent)] flex items-center justify-center font-bold text-xs shrink-0">{i + 1}</div>
 <p className="text-secondary">{step}</p>
 </div>
 ))}
 <div className="flex items-center space-x-3 text-xs font-medium">
 <div className="h-7 w-7 rounded-lg glass-secondary text-[var(--accent)] flex items-center justify-center font-bold text-xs shrink-0">3</div>
 <Link
 href={`/booking?doctor_id=${currentPreviewDoctor.user}`}
 className="font-bold text-[var(--accent)] hover:text-[#0988C3] transition-colors"
 >
 Proceed with appointment reservation →
 </Link>
 </div>
 </div>
 </div>
 ) : (
 <div className="w-full max-w-md p-8 glass-card text-center py-12 text-sm font-medium text-muted">
 No active provider linked.
 </div>
 )}
 </div>
 </div>
 </div>
 </section>

 {/* ═══════ CLINICAL SPECIALIZATIONS ═══════ */}
 <section id="specializations" className="py-20 px-6 bg-transparent border-t border-[rgba(255,255,255,0.08)]">
 <div className="max-w-7xl mx-auto text-center space-y-4" data-aos="fade-up">
 <span className="text-[var(--accent)] font-bold tracking-wide uppercase text-[11px] bg-[rgba(50,109,205,0.1)] border border-[rgba(50,109,205,0.2)] px-4 py-1.5 rounded-full">
 Clinical Excellence
 </span>
 <h2 className="text-3xl sm:text-4xl font-extrabold text-primary tracking-tight">
 Clinical Specializations
 </h2>
 <p className="text-secondary max-w-2xl mx-auto text-base font-medium leading-relaxed">
 Discover and consult top-rated doctors categorized under certified medical specializations.
 </p>
 </div>

 <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto mt-14">
 {specializations.map((spec, idx) => {
 const Icon = spec.icon;
 return (
 <div
 key={idx}
 data-aos="fade-up"
 data-aos-delay={idx * 80}
 className="glass-card p-6 group"
 >
 <div className={`w-12 h-12 glass-secondary border rounded-xl flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300`}>
 <Icon className={`h-6 w-6 text-[var(--accent)]`} strokeWidth={2} />
 </div>
 <h3 className="text-lg font-bold text-primary mb-2">{spec.name}</h3>
 <p className="text-secondary font-medium text-sm leading-relaxed mb-5">{spec.desc}</p>
 <Link
 href={`/doctors?specialization=${spec.name.toUpperCase()}`}
 className={`inline-flex items-center gap-1.5 text-sm font-bold text-[var(--accent)] hover:text-[#0988C3] transition-colors`}
 >
 Explore Specialists <ArrowRight className="h-4 w-4" />
 </Link>
 </div>
 );
 })}
 </div>
 </section>

 {/* ═══════ TOP RATED SPECIALISTS ═══════ */}
 <section id="doctors" className="py-20 px-6 bg-transparent border-t border-[rgba(255,255,255,0.08)]">
 <div className="max-w-7xl mx-auto space-y-12" data-aos="fade-up">
 <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
 <div className="space-y-3">
 <span className="text-[var(--accent)] font-bold tracking-wide uppercase text-[11px] bg-[rgba(50,109,205,0.1)] border border-[rgba(50,109,205,0.2)] px-4 py-1.5 rounded-full">Verified Directory</span>
 <h2 className="text-3xl font-extrabold text-primary tracking-tight">Top Rated Specialists</h2>
 <p className="text-secondary font-medium">Docvera partners with premium healthcare professionals ensuring clinical quality.</p>
 </div>
 <Link
 href="/doctors"
 className="btn-ghost"
 >
 View All Doctors <ArrowRight className="h-4 w-4 ml-2" />
 </Link>
 </div>

 <div className="grid md:grid-cols-3 gap-6">
 {isLoadingDoctors ? (
 [...Array(3)].map((_, idx) => (
 <div key={idx} className="p-6 glass-card h-56 animate-pulse" />
 ))
 ) : doctors.length > 0 ? (
 doctors.slice(0, 3).map((doctor, idx) => (
 <div
 key={doctor.user || idx}
 onClick={() => setSelectedPreviewIdx(idx)}
 className={`p-6 border rounded-2xl space-y-5 relative cursor-pointer transition-all duration-300 ${selectedPreviewIdx === idx
 ? "glass-card border-[rgba(11,170,244,0.4)] ring-1 ring-[rgba(11,170,244,0.2)] -translate-y-1 shadow-[0_10px_40px_rgba(11,170,244,0.15)]"
 : "glass-secondary hover:border-[rgba(255,255,255,0.2)]"
 }`}
 >
 <div className="absolute top-0 right-0 px-3.5 py-1.5 bg-[rgba(255,255,255,0.04)] border-l border-b border-[rgba(255,255,255,0.08)] text-[10px] font-bold rounded-bl-xl text-secondary">
 {doctor.experience_years} Yrs Exp
 </div>

 <div className="space-y-3">
 <span className="px-2.5 py-1 bg-[rgba(50,109,205,0.1)] border border-[rgba(50,109,205,0.2)] text-[10px] font-bold rounded uppercase tracking-wider text-[var(--accent)]">
 {doctor.specialization}
 </span>
 <h3 className="text-lg font-bold text-primary pt-1">Dr. {doctor.full_name}</h3>
 <div className="flex items-center space-x-2 text-xs font-medium text-muted">
 <MapPin className="h-4 w-4 shrink-0" />
 <span>{doctor.clinic_city}, {doctor.clinic_pin_code}</span>
 </div>
 </div>

 <div className="h-px bg-[rgba(255,255,255,0.08)]" />

 <div className="flex items-center justify-between text-sm font-semibold">
 <span className="text-primary font-bold">₹{doctor.consultation_fees} <span className="text-muted font-medium text-xs">/ consult</span></span>
 <Link
 href={`/booking?doctor_id=${doctor.user}`}
 className="font-bold text-[var(--accent)] hover:text-[#0988C3] transition-colors"
 onClick={(e) => e.stopPropagation()}
 >
 Book Now →
 </Link>
 </div>
 </div>
 ))
 ) : (
 <div className="col-span-full text-center py-16 border border-dashed border-[rgba(255,255,255,0.15)] rounded-2xl text-sm font-medium text-muted glass-secondary">
 No doctors found in our network yet.
 </div>
 )}
 </div>
 </div>
 </section>

 {/* ═══════ HOW IT WORKS ═══════ */}
 <section id="howitworks" className="py-20 px-6 bg-transparent border-t border-[rgba(255,255,255,0.08)]">
 <div className="max-w-7xl mx-auto text-center space-y-4" data-aos="fade-up">
 <span className="bg-[rgba(11,170,244,0.1)] text-[var(--accent)] border border-[rgba(11,170,244,0.2)] px-4 py-1.5 rounded-full text-[11px] font-bold uppercase tracking-wide">
 Simple & Secure
 </span>
 <h2 className="text-3xl sm:text-4xl font-extrabold text-primary tracking-tight">
 From search to consultation in 4 steps
 </h2>
 <p className="text-secondary text-base font-medium max-w-xl mx-auto">
 How Docvera manages scheduling conflicts using state-of-the-art database slot allocations.
 </p>
 </div>

 <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto mt-14">
 {[
 { step: "1", title: "Locate & Filter", desc: "Find specialist doctors or clinic facilities using active GPS coordinates or city PIN code search.", color: "text-[var(--accent)]", bg: "glass-secondary" },
 { step: "2", title: "Pessimistic Lock", desc: "Select an open appointment slot. The engine locks it for 10 minutes to guarantee zero overlap.", color: "text-[var(--accent)]", bg: "glass-secondary" },
 { step: "3", title: "Secure Checkout", desc: "Complete transaction smoothly via Razorpay Sandbox supporting Net Banking, UPI, and Cards.", color: "text-white", bg: "glass-secondary" },
 { step: "4", title: "Consultation Room", desc: "Once verified, access the real-time doctor portal for prescriptions, diagnoses, and medical charts.", color: "text-[var(--accent)]", bg: "glass-secondary" },
 ].map((item, idx) => (
 <div
 key={idx}
 data-aos="zoom-in"
 data-aos-delay={idx * 100}
 className="glass-card p-8 text-center transition-all shadow-sm hover:-translate-y-1 duration-300 group"
 >
 <div
 className={`w-14 h-14 mx-auto rounded-2xl flex items-center justify-center text-xl font-black ${item.color} ${item.bg} border border-[rgba(255,255,255,0.08)] group-hover:scale-110 transition-transform`}
 >
 {item.step}
 </div>
 <h4 className="font-bold mt-5 text-base text-primary">{item.title}</h4>
 <p className="text-secondary font-medium text-sm mt-2.5 leading-relaxed">{item.desc}</p>
 </div>
 ))}
 </div>
 </section>

 {/* ═══════ TRUST & PIPELINE INTEGRITY ═══════ */}
 <section id="trust" className="py-20 px-6 bg-transparent border-t border-[rgba(255,255,255,0.08)]">
 <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-16 items-center">
 <div className="space-y-8" data-aos="fade-right">
 <div className="glass-secondary inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs text-secondary font-bold">
 <ShieldCheck className="h-4 w-4 text-[var(--accent)]" /> HIPAA-Compliant Data Pipeline
 </div>
 <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-primary tracking-tight leading-tight">
 Clinical scheduling <br /> engineered for <span className="text-[var(--accent)]">integrity.</span>
 </h2>
 <ul className="space-y-5 text-sm font-medium text-secondary">
 <li className="flex gap-4 items-start">
 <CheckCircle className="h-5 w-5 text-[var(--accent)] shrink-0 mt-0.5" />
 <span><strong className="text-primary">Zero Slot Overlaps:</strong> Atomic locking stops transaction conflicts instantly.</span>
 </li>
 <li className="flex gap-4 items-start">
 <CheckCircle className="h-5 w-5 text-[var(--accent)] shrink-0 mt-0.5" />
 <span><strong className="text-primary">Administrative Review:</strong> Every registered clinician undergoes strict identity checks.</span>
 </li>
 <li className="flex gap-4 items-start">
 <CheckCircle className="h-5 w-5 text-[var(--accent)] shrink-0 mt-0.5" />
 <span><strong className="text-primary">Clear Refund SLA:</strong> Easy cancelations directly initiate refund webhook sequences.</span>
 </li>
 </ul>
 <div className="flex gap-4 p-5 glass-secondary rounded-2xl">
 <Shield className="text-3xl text-muted shrink-0" />
 <span className="text-slate-500 font-medium text-sm leading-relaxed">
 Docvera locks appointments on verified servers. Payment tokens, credentials, and charts are fully encrypted under AES-256 protocols.
 </span>
 </div>
 </div>

 <div className="relative" data-aos="fade-left">
 <div className="glass-secondary rounded-3xl p-8 border border-[rgba(255,255,255,0.08)] shadow-xl relative">
 <div className="p-6 glass-card rounded-2xl space-y-5 border border-[rgba(255,255,255,0.08)]">
 <div className="flex items-center gap-4">
 <div className="h-12 w-12 bg-[rgba(11,170,244,0.1)] rounded-xl flex items-center justify-center font-extrabold text-base text-[var(--accent)]">DV</div>
 <div>
 <h4 className="font-bold text-sm text-primary">Dr. Sanidhya MD</h4>
 <p className="text-[11px] font-medium text-muted">Verification Code: <span className="text-[var(--accent)] font-bold">DV-ACTIVE-99</span></p>
 </div>
 </div>
 <div className="bg-[rgba(255,255,255,0.04)] px-4 py-3 rounded-xl border border-[rgba(255,255,255,0.08)] flex items-center justify-between text-[11px] font-bold text-secondary">
 <span>e-KYC & License Confirmed</span>
 <span className="text-[var(--accent)] flex items-center gap-1">ACTIVE <CheckCircle className="h-3 w-3" /></span>
 </div>
 </div>
 </div>
 </div>
 </div>
 </section>

 {/* ═══════ UNIFIED SEARCH ENGINE ═══════ */}
 <section id="search-engine" className="py-24 px-6 bg-transparent border-t border-[rgba(255,255,255,0.08)]">
 <div className="max-w-4xl mx-auto glass-card p-8 sm:p-10 relative z-10" data-aos="flip-up">
 <div className="text-center space-y-4 mb-10">
 <div className="inline-flex items-center gap-1.5 bg-[rgba(50,109,205,0.1)] border border-[rgba(50,109,205,0.2)] text-[var(--accent)] rounded-full px-4 py-1.5 text-xs font-bold">
 <Sparkles className="h-3.5 w-3.5" /> Real-time Locator
 </div>
 <h3 className="text-3xl font-black text-primary">Search Available Providers</h3>
 <p className="text-secondary text-sm font-medium max-w-md mx-auto">
 Find certified doctors and multi-specialty clinics in your neighborhood instantly.
 </p>
 </div>

 <div className="space-y-6">
 {/* Mode Selector */}
 <div className="inline-flex glass-secondary p-1.5 rounded-xl w-full sm:w-auto">
 <button
 onClick={() => setSearchMode('DOCTOR')}
 className={`flex-1 sm:flex-none px-6 py-2.5 rounded-lg text-sm font-bold flex items-center justify-center gap-2 transition-all ${searchMode === 'DOCTOR' ? 'bg-[rgba(255,255,255,0.1)] text-[var(--accent)] shadow-sm' : 'text-muted hover:text-secondary'
 }`}
 >
 <Stethoscope className="h-4 w-4" /> Find Doctors
 </button>
 <button
 onClick={() => setSearchMode('HOSPITAL')}
 className={`flex-1 sm:flex-none px-6 py-2.5 rounded-lg text-sm font-bold flex items-center justify-center gap-2 transition-all ${searchMode === 'HOSPITAL' ? 'bg-[rgba(255,255,255,0.1)] text-[var(--accent)] shadow-sm' : 'text-muted hover:text-secondary'
 }`}
 >
 <HospitalIcon className="h-4 w-4" /> Find Clinics
 </button>
 </div>

 {/* Fields Grid */}
 <div className="grid grid-cols-1 md:grid-cols-12 gap-5">

 {/* Geolocation Trigger */}
 <div className="md:col-span-4">
 <button
 onClick={handleGeoLocate}
 className={`w-full flex items-center justify-center gap-2 px-4 py-3.5 rounded-xl font-bold text-sm transition-all ${geoStatus === "success"
 ? "bg-[rgba(50,109,205,0.1)] border border-[rgba(50,109,205,0.3)] text-[var(--accent)]"
 : geoStatus === "loading"
 ? "glass-secondary text-muted animate-pulse"
 : "glass-secondary text-secondary hover:border-[var(--accent)]"
 }`}
 >
 <MapPin className="h-4 w-4 shrink-0" />
 <span className="truncate">
 {geoStatus === "success" ? "Location Detected" :
 geoStatus === "loading" ? "Locating..." :
 geoStatus === "denied" ? "Access Denied" : "Current Location"}
 </span>
 </button>
 </div>

 {/* Specialization Query */}
 <div className="md:col-span-4 relative flex items-center">
 <input
 type="text"
 placeholder={searchMode === 'DOCTOR' ? "Specialization or name..." : "Clinic or hospital..."}
 value={searchQuery}
 onChange={(e) => setSearchQuery(e.target.value)}
 className="w-full bg-[rgba(255,255,255,0.04)] border border-[rgba(255,255,255,0.08)] focus:border-[var(--accent)] focus:ring-4 focus:ring-[rgba(50,109,205,0.15)] rounded-xl pl-4 pr-10 py-3.5 text-sm outline-none transition-all text-primary placeholder:text-muted font-medium"
 />
 <Search className="absolute right-3.5 text-muted h-4 w-4 pointer-events-none" />
 </div>

 {/* Location Input */}
 <div className="md:col-span-4 relative flex items-center">
 <MapPin className="absolute left-3.5 text-muted h-4 w-4 pointer-events-none" />
 <input
 type="text"
 placeholder="City or PIN Code"
 value={cityInput || pinInput}
 onChange={(e) => {
 const val = e.target.value;
 if (/^\d+$/.test(val)) {
 setPinInput(val);
 setCityInput("");
 } else {
 setCityInput(val);
 setPinInput("");
 }
 }}
 className="w-full bg-[rgba(255,255,255,0.04)] border border-[rgba(255,255,255,0.08)] focus:border-[var(--accent)] focus:ring-4 focus:ring-[rgba(50,109,205,0.15)] rounded-xl pl-10 pr-4 py-3.5 text-sm outline-none transition-all text-primary placeholder:text-muted font-medium"
 />
 </div>
 </div>

 {/* Search CTA */}
 <button
 onClick={handleSearch}
 className="w-full btn-primary py-4"
 >
 <Search className="h-4 w-4" />
 <span>Search Available Providers</span>
 </button>

 {searchError && (
 <div className="p-4 bg-[rgba(11,170,244,0.1)] border border-[rgba(11,170,244,0.2)] rounded-xl text-sm font-medium text-[var(--accent)] text-center">
 {searchError}
 </div>
 )}
 </div>

 <p className="text-center text-xs font-medium text-muted mt-6">
 <Shield className="inline h-4 w-4 mr-1 opacity-50" /> Data runs through verified API servers. No spam guaranteed.
 </p>
 </div>
 </section>
 </div>
 );
}
