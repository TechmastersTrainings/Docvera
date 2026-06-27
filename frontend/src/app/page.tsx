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
 Sparkles,
 Building2,
 CalendarCheck,
 Clock,
 CreditCard,
 ClipboardList,
 UserCheck,
 FileText
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
 router.push(`/doctors?${params.toString()}`);
 } else {
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
 { name: "Cardiology", icon: Heart, desc: "Book appointments with heart disease specialists & cardiologists" },
 { name: "Dermatology", icon: Stethoscope, desc: "Schedule visits for skin health & dermatology treatments" },
 { name: "Pediatrics", icon: Activity, desc: "Find pediatricians for child health & wellness checkups" },
 { name: "Neurology", icon: Award, desc: "Book in-clinic neurological evaluation & specialist visits" },
 { name: "Orthopedics", icon: Compass, desc: "Schedule appointments for bone, joint & trauma care" },
 { name: "Ophthalmology", icon: Eye, desc: "Book eye examinations & vision care appointments" },
 ];

 const faqs = [
 { q: "How does the appointment slot locking system work?", a: "When you select a doctor's available slot, DocVera applies an atomic lock on that schedule for 10 minutes. This guarantees that no other patient can book the same slot while you complete your payment, ensuring zero double bookings." },
 { q: "Can I reschedule or cancel my appointment?", a: "Yes. Through your patient dashboard, you can reschedule to any other open availability slot for the same doctor, or cancel your appointment. Cancellations automatically trigger status updates and refund processing." },
 { q: "What happens during the appointment?", a: "DocVera helps you book an in-person appointment at the doctor's clinic or hospital. You visit the doctor physically for your consultation. After the visit, the doctor can update your digital medical records on the platform." },
 { q: "What should I do if my browser location is blocked?", a: "If you deny location access, DocVera falls back to PIN Code search, and then to City filtering to help you find verified doctors and clinics near you." },
 ];

 const currentPreviewDoctor = doctors[selectedPreviewIdx] || doctors[0];

 return (
 <div className="font-sans min-h-screen bg-transparent flex flex-col">
 <Navbar />

  {/* ═══════ HERO ═══════ */}
  <section id="home" className="relative pt-24 pb-32 bg-[#08222b] overflow-hidden">
  <div className="max-w-[1400px] mx-auto px-6 relative z-10" data-aos="fade-up" data-aos-duration="1000">
  <div className="grid lg:grid-cols-2 gap-16 lg:gap-12 items-center">
  
  {/* Left Content: Search Engine */}
  <div id="search" className="w-full">
  <div className="bg-transparent p-4 sm:p-6 relative z-10">
  <div className="text-center sm:text-left space-y-4 mb-8">
  <div className="inline-flex items-center gap-1.5 bg-[rgba(83,126,172,0.1)] border border-[rgba(83,126,172,0.2)] text-[#028597] rounded-full px-4 py-1.5 text-xs font-bold">
  <Sparkles className="h-3.5 w-3.5" /> Clinic Locator
  </div>
  <h3 className="text-2xl lg:text-3xl font-extrabold text-white">Find Doctors & Book Appointments</h3>
  <p className="text-white/80 text-sm font-medium">
  Discover verified doctors and clinics in your area. Book in-person appointments instantly.
  </p>
  </div>

  <div className="space-y-6">
  {/* Mode Selector */}
  <div className="inline-flex glass-secondary p-1.5 rounded-xl w-full sm:w-auto">
  <button
  onClick={() => setSearchMode('DOCTOR')}
  className={`flex-1 sm:flex-none px-6 py-2.5 rounded-lg text-sm font-bold flex items-center justify-center gap-2 transition-all ${searchMode === 'DOCTOR' ? 'bg-[#0a1128] text-white shadow-sm' : 'text-muted hover:text-secondary'}`}
  >
  <Stethoscope className="h-4 w-4" /> Find Doctors
  </button>
  <button
  onClick={() => setSearchMode('HOSPITAL')}
  className={`flex-1 sm:flex-none px-6 py-2.5 rounded-lg text-sm font-bold flex items-center justify-center gap-2 transition-all ${searchMode === 'HOSPITAL' ? 'bg-[#0a1128] text-white shadow-sm' : 'text-muted hover:text-secondary'}`}
  >
  <Building2 className="h-4 w-4" /> Find Clinics
  </button>
  </div>

   {/* Inputs */}
   <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-3/4">
     <div className="relative flex-1">
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
       className="w-full bg-[rgba(255,255,255,0.04)] border border-[rgba(255,255,255,0.08)] focus:border-white focus:ring-4 focus:ring-[rgba(83,126,172,0.15)] rounded-xl px-4 py-3.5 text-sm outline-none transition-all text-white placeholder:text-muted font-medium"
       />
     </div>
     <button
       onClick={handleGeoLocate}
       disabled={geoStatus === 'loading'}
       className={`shrink-0 px-5 py-3.5 rounded-xl font-bold flex items-center justify-center gap-2 transition-all border ${geoStatus === 'loading' ? 'bg-[rgba(255,255,255,0.08)] border-transparent text-white/50 cursor-not-allowed' : geoStatus === 'success' ? 'bg-[#028597]/20 border-[#028597]/50 text-[#04defb]' : 'bg-[rgba(255,255,255,0.04)] border-[rgba(255,255,255,0.08)] text-white hover:bg-[rgba(255,255,255,0.08)]'}`}
     >
       <MapPin className="h-4 w-4" />
       <span className="text-sm">{geoStatus === 'loading' ? 'Locating...' : geoStatus === 'success' ? 'Located' : 'Use Location'}</span>
     </button>
   </div>

  {/* Search CTA */}
  <button
  onClick={handleSearch}
  className="bg-[#028597] hover:bg-[#0f4557] text-white rounded-full px-8 py-4 font-bold text-base flex items-center justify-center gap-2 transition-all shadow-lg w-full sm:w-3/4"
  >
  Find Doctors <ArrowRight className="h-5 w-5" />
  </button>

  {searchError && (
  <div className="p-4 bg-[rgba(2,133,151,0.1)] border border-[rgba(2,133,151,0.2)] rounded-xl text-sm font-medium text-white text-center">
  {searchError}
  </div>
  )}
  </div>

  <p className="text-center sm:text-left text-xs font-medium text-muted mt-6">
  <Shield className="inline h-4 w-4 mr-1 opacity-50" /> Secure scheduling with verified healthcare providers.
  </p>
  </div>
  </div>

  {/* Right Content: Text & Badges */}
  <div className="space-y-8 max-w-2xl pl-0 lg:pl-12">
  <h1 className="text-4xl sm:text-5xl lg:text-[54px] font-black leading-[1.1] tracking-tight text-white">
  Book Appointments. <br />
  <span className="text-white">Visit Doctors In-Person.</span>
  </h1>
  
  <p className="text-white/80 text-lg sm:text-xl leading-relaxed font-medium">
  Find and book appointments with verified healthcare professionals near you. Visit clinics and hospitals for in-person consultations with guaranteed slot protection.
  </p>

  <div className="flex flex-col sm:flex-row items-center gap-4 pt-4">
  <Link
  href="#specializations"
  className="bg-[rgba(2,133,151,0.1)] hover:bg-[rgba(2,133,151,0.2)] text-white border border-[rgba(2,133,151,0.3)] rounded-full px-8 py-4 font-bold text-base flex items-center justify-center transition-all w-full sm:w-auto"
  >
  Browse Specializations
  </Link>
  </div>

  <div className="flex items-center gap-5 pt-8 text-white text-sm font-bold">
  <div className="flex -space-x-3">
  <div className="w-12 h-12 rounded-full bg-[#08222b] border-2 border-[#028597] flex items-center justify-center text-[11px] text-white z-40">MD</div>
  <div className="w-12 h-12 rounded-full bg-[#08222b] border-2 border-[#028597] flex items-center justify-center text-[11px] text-white z-30">OB</div>
  <div className="w-12 h-12 rounded-full bg-[#08222b] border-2 border-[#028597] flex items-center justify-center text-[11px] text-white z-20">P</div>
  <div className="w-12 h-12 rounded-full bg-[#08222b] border-2 border-[#028597] flex items-center justify-center text-[11px] text-white z-10">1K+</div>
  </div>
  <span className="flex items-center gap-2"><CheckCircle className="h-5 w-5 text-white" /> Trusted by patients</span>
  </div>
  </div>

  </div>
  </div>
  </section>

 {/* ═══════ CLINICAL SPECIALIZATIONS ═══════ */}
 <section id="specializations" className="py-20 px-6 bg-transparent border-t border-[rgba(4,222,251,0.08)]">
 <div className="max-w-7xl mx-auto text-center space-y-4" data-aos="fade-up">
 <span className="text-white font-bold tracking-wide uppercase text-[11px] bg-[#08222b] border border-[#08222b]/50 px-4 py-1.5 rounded-full">
 Book By Specialty
 </span>
 <h2 className="text-3xl sm:text-4xl font-extrabold text-primary tracking-tight">
 Find Doctors by Specialization
 </h2>
 <p className="text-secondary max-w-2xl mx-auto text-base font-medium leading-relaxed">
 Browse verified doctors across certified medical specializations and book your in-person clinic visit today.
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
  className="rounded-[20px] p-6 sm:p-8 group bg-[#20063b] border-none shadow-lg"
  >
  <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 shadow-sm">
  <Icon className="h-6 w-6 text-[#ee1123]" strokeWidth={2.5} />
  </div>
  <h3 className="text-[17px] sm:text-lg font-bold text-white mb-2">{spec.name}</h3>
  <p className="text-white/80 font-medium text-[13px] sm:text-sm leading-relaxed mb-8">{spec.desc}</p>
  <Link
  href={`/doctors?specialization=${spec.name.toUpperCase()}`}
  className="inline-flex items-center gap-1.5 text-[13px] sm:text-sm font-bold text-white hover:opacity-80 transition-opacity"
  >
  Book Appointment <ArrowRight className="h-4 w-4" />
  </Link>
  </div>
 );
 })}
 </div>
 </section>

 {/* ═══════ TOP RATED SPECIALISTS ═══════ */}
 <section id="doctors" className="py-20 px-6 bg-transparent border-t border-[rgba(4,222,251,0.08)]">
 <div className="max-w-7xl mx-auto space-y-12" data-aos="fade-up">
 <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
 <div className="space-y-3">
 <span className="text-[#028597] font-bold tracking-wide uppercase text-[11px] bg-[rgba(83,126,172,0.1)] border border-[rgba(83,126,172,0.2)] px-4 py-1.5 rounded-full">Verified Directory</span>
 <h2 className="text-3xl font-extrabold text-[#031d44] tracking-tight">Verified Healthcare Professionals</h2>
 <p className="text-[#031d44]/80 font-medium">All doctors listed on DocVera are verified and available for in-person clinic appointments.</p>
 </div>
 <Link
 href="/doctors"
 className="btn-ghost"
 >
 View All Doctors <ArrowRight className="h-4 w-4 ml-2" />
 </Link>
 </div>

 <div className="grid lg:grid-cols-2 gap-6">
 {isLoadingDoctors ? (
 [...Array(2)].map((_, idx) => (
 <div key={idx} className="p-6 glass-card bg-[#031d44]/50 h-56 animate-pulse border-none" />
 ))
 ) : doctors.length > 0 ? (
 doctors.slice(0, 4).map((doctor, idx) => (
 <div
 key={doctor.user || idx}
 onClick={() => setSelectedPreviewIdx(idx)}
 className={`p-6 border rounded-2xl space-y-5 relative cursor-pointer transition-all duration-300 ${selectedPreviewIdx === idx
 ? "glass-card bg-[#031d44] ring-2 ring-[#04defb]/20 -translate-y-1 shadow-[0_20px_40px_rgba(3,29,68,0.3)]"
 : "glass-secondary bg-[#031d44]/90 hover:bg-[#031d44] hover:ring-1 hover:ring-[#04defb]/10"
 }`}
 >
  <div className="absolute top-0 right-0 px-3.5 py-1.5 bg-[rgba(255,255,255,0.06)] border-l border-b border-[rgba(255,255,255,0.12)] text-[10px] font-bold rounded-bl-xl text-white z-10">
   {doctor.experience_years} Yrs Exp
   </div>

   <div className="flex gap-5 sm:gap-6">
     <div className="shrink-0 w-32 h-32 sm:w-40 sm:h-40 rounded-2xl overflow-hidden bg-white/5 border border-white/10 mt-1">
       {doctor.profile_photo ? (
         <img src={doctor.profile_photo} alt={doctor.full_name} className="w-full h-full object-cover" />
       ) : (
         <div className="w-full h-full flex items-center justify-center bg-[#028597]/20 text-[#04defb] text-4xl font-bold">
            {doctor.full_name.charAt(0)}
         </div>
       )}
     </div>
     <div className="space-y-3 flex-1 pt-2 sm:pt-4">
       <span className="px-3 py-1.5 bg-[rgba(255,255,255,0.08)] border border-[rgba(255,255,255,0.15)] text-[11px] font-bold rounded uppercase tracking-wider text-white inline-block">
       {doctor.specialization}
       </span>
       <h3 className="text-2xl font-bold text-white pt-1 line-clamp-1">Dr. {doctor.full_name}</h3>
       <div className="flex items-center space-x-2 text-sm font-medium text-white/80">
       <MapPin className="h-4 w-4 shrink-0 text-[#04defb]" />
       <span className="line-clamp-1">{doctor.clinic_city}, {doctor.clinic_pin_code}</span>
       </div>
     </div>
   </div>

  <div className="h-px bg-[rgba(255,255,255,0.12)]" />

  <div className="flex items-center justify-between text-sm font-semibold">
  <span className="text-white font-bold">₹{doctor.consultation_fees} <span className="text-white/60 font-medium text-xs">/ visit</span></span>
  <Link
  href={`/booking?doctor_id=${doctor.user}`}
  className="font-bold text-white hover:text-white/80 hover:underline transition-all"
  onClick={(e) => e.stopPropagation()}
  >
  Book Appointment →
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
 <section id="howitworks" className="py-20 px-6 bg-transparent border-t border-[rgba(4,222,251,0.08)]">
 <div className="max-w-7xl mx-auto text-center space-y-4" data-aos="fade-up">
 <span className="bg-[rgba(2,133,151,0.1)] text-[#028597] border border-[rgba(2,133,151,0.2)] px-4 py-1.5 rounded-full text-[11px] font-bold uppercase tracking-wide">
 Simple & Secure
 </span>
 <h2 className="text-3xl sm:text-4xl font-extrabold text-primary tracking-tight">
 From Search to Clinic Visit in 4 Steps
 </h2>
 <p className="text-secondary text-base font-medium max-w-xl mx-auto">
 Book your in-person doctor appointment in minutes with our secure scheduling system.
 </p>
 </div>

 <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto mt-14">
 {[
 { step: "1", title: "Find a Doctor", desc: "Search for verified doctors or clinic facilities using GPS location, city name, or PIN code.", color: "text-[#04defb]", bg: "bg-[rgba(4,222,251,0.1)]", icon: Search },
 { step: "2", title: "Select a Time Slot", desc: "Choose an available appointment slot. The system locks it for 10 minutes to prevent double bookings.", color: "text-[#04defb]", bg: "bg-[rgba(4,222,251,0.1)]", icon: CalendarCheck },
 { step: "3", title: "Pay Booking Fee", desc: "Complete your appointment booking fee securely via UPI, Net Banking, or Cards.", color: "text-[#04defb]", bg: "bg-[rgba(4,222,251,0.1)]", icon: CreditCard },
 { step: "4", title: "Visit the Clinic", desc: "Visit the doctor at their clinic or hospital for your in-person consultation. Digital records are maintained after your visit.", color: "text-[#04defb]", bg: "bg-[rgba(4,222,251,0.1)]", icon: ClipboardList },
 ].map((item, idx) => (
 <div
 key={idx}
 data-aos="zoom-in"
 data-aos-delay={idx * 100}
 className="glass-card bg-[#20063b] p-8 text-center transition-all shadow-xl hover:-translate-y-1 duration-300 group border-none"
 >
 <div
 className={`w-14 h-14 mx-auto rounded-2xl flex items-center justify-center text-xl font-black ${item.color} ${item.bg} border border-[rgba(4,222,251,0.08)] group-hover:scale-110 transition-transform`}
 >
 {item.step}
 </div>
 <h4 className="font-bold mt-5 text-base text-white">{item.title}</h4>
 <p className="text-white/80 font-medium text-sm mt-2.5 leading-relaxed">{item.desc}</p>
 </div>
 ))}
 </div>
 </section>

 {/* ═══════ TRUST & PLATFORM INTEGRITY ═══════ */}
 <section id="trust" className="py-20 px-6 bg-transparent border-t border-[rgba(4,222,251,0.08)]">
 <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-16 items-center">
 <div className="space-y-8" data-aos="fade-right">
 <div className="glass-secondary inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs text-secondary font-bold">
 <ShieldCheck className="h-4 w-4 text-[#028597]" /> Secure Scheduling Platform
 </div>
 <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-primary tracking-tight leading-tight">
 Appointment booking <br />engineered for <span className="text-[#028597]">reliability.</span>
 </h2>
 <ul className="space-y-5 text-sm font-medium text-secondary">
 <li className="flex gap-4 items-start">
 <CheckCircle className="h-5 w-5 text-[#028597] shrink-0 mt-0.5" />
 <span><strong className="text-primary">Zero Double Bookings:</strong> Atomic slot locking prevents scheduling conflicts instantly.</span>
 </li>
 <li className="flex gap-4 items-start">
 <CheckCircle className="h-5 w-5 text-[#028597] shrink-0 mt-0.5" />
 <span><strong className="text-primary">Verified Doctors:</strong> Every registered healthcare professional undergoes identity and credential verification.</span>
 </li>
 <li className="flex gap-4 items-start">
 <CheckCircle className="h-5 w-5 text-[#028597] shrink-0 mt-0.5" />
 <span><strong className="text-primary">Easy Cancellations:</strong> Cancel or reschedule appointments with transparent refund processing.</span>
 </li>
 <li className="flex gap-4 items-start">
 <CheckCircle className="h-5 w-5 text-[#028597] shrink-0 mt-0.5" />
 <span><strong className="text-primary">Digital Records:</strong> Doctors can securely maintain digital records of in-clinic visits and prescriptions after your appointment.</span>
 </li>
 </ul>
 <div className="flex gap-4 p-5 glass-secondary rounded-2xl">
 <Shield className="text-3xl text-muted shrink-0" />
 <span className="text-[#537eac] font-medium text-sm leading-relaxed">
 DocVera is a technology platform that facilitates appointment scheduling and digital clinic management. All medical consultations are conducted exclusively by independent healthcare professionals during physical in-person visits.
 </span>
 </div>
 </div>

      {/* Empty column or future graphic can go here */}
      <div className="hidden md:block"></div>
    </div>
 </section>

 {/* ═══════ FAQ ═══════ */}
 <section id="faq" className="py-20 px-6 bg-transparent border-t border-[rgba(4,222,251,0.08)]">
 <div className="max-w-3xl mx-auto" data-aos="fade-up">
 <div className="text-center space-y-4 mb-14">
 <span className="bg-[rgba(2,133,151,0.1)] text-[#028597] border border-[rgba(2,133,151,0.2)] px-4 py-1.5 rounded-full text-[11px] font-bold uppercase tracking-wide">
 Common Questions
 </span>
 <h2 className="text-3xl sm:text-4xl font-extrabold text-primary tracking-tight">
 Frequently Asked Questions
 </h2>
 </div>

 <div className="space-y-4">
 {faqs.map((faq, idx) => (
 <div
 key={idx}
 className="glass-secondary rounded-2xl overflow-hidden border border-[rgba(255,255,255,0.06)] transition-all"
 >
 <button
  onClick={() => setActiveFaq(activeFaq === idx ? null : idx)}
  className="w-full text-left px-6 py-5 flex items-center justify-between text-sm font-bold text-primary hover:text-[#028597] transition-colors"
 >
  <span>{faq.q}</span>
  <Plus className={`h-5 w-5 shrink-0 transition-transform duration-300 ${activeFaq === idx ? 'rotate-45' : ''}`} />
 </button>
 {activeFaq === idx && (
  <div className="px-6 pb-5 text-sm text-secondary font-medium leading-relaxed">
  {faq.a}
  </div>
 )}
 </div>
 ))}
 </div>
 </div>
 </section>

 {/* ═══════ COMPLIANCE DISCLAIMERS ═══════ */}
 <section className="py-12 px-6 bg-[#05181e] border-t border-[rgba(4,222,251,0.08)]">
 <div className="max-w-5xl mx-auto space-y-6" data-aos="fade-up">
 <div className="grid sm:grid-cols-2 gap-6">
 <div className="p-5 rounded-2xl bg-[rgba(255,255,255,0.03)] border border-[rgba(255,255,255,0.06)]">
 <div className="flex items-center gap-2 mb-3">
 <FileText className="h-4 w-4 text-[#028597]" />
 <h4 className="text-xs font-bold text-white uppercase tracking-wider">Platform Disclaimer</h4>
 </div>
 <p className="text-xs text-[#7598bd] leading-relaxed">
 DocVera is a technology platform that facilitates appointment scheduling and digital clinic management. Medical consultations are conducted exclusively by independent healthcare professionals during physical in-person visits.
 </p>
 </div>
 <div className="p-5 rounded-2xl bg-[rgba(255,255,255,0.03)] border border-[rgba(255,255,255,0.06)]">
 <div className="flex items-center gap-2 mb-3">
 <CreditCard className="h-4 w-4 text-[#028597]" />
 <h4 className="text-xs font-bold text-white uppercase tracking-wider">Payment Disclaimer</h4>
 </div>
 <p className="text-xs text-[#7598bd] leading-relaxed">
 Payments made on DocVera are solely for appointment booking and related clinic services. DocVera does not provide medical consultation services.
 </p>
 </div>
 <div className="p-5 rounded-2xl bg-[rgba(255,255,255,0.03)] border border-[rgba(255,255,255,0.06)]">
 <div className="flex items-center gap-2 mb-3">
 <UserCheck className="h-4 w-4 text-[#028597]" />
 <h4 className="text-xs font-bold text-white uppercase tracking-wider">Doctor Disclaimer</h4>
 </div>
 <p className="text-xs text-[#7598bd] leading-relaxed">
 Doctors and healthcare providers listed on DocVera are independent professionals and are solely responsible for the medical services they provide.
 </p>
 </div>
 <div className="p-5 rounded-2xl bg-[rgba(255,255,255,0.03)] border border-[rgba(255,255,255,0.06)]">
 <div className="flex items-center gap-2 mb-3">
 <ClipboardList className="h-4 w-4 text-[#028597]" />
 <h4 className="text-xs font-bold text-white uppercase tracking-wider">Medical Records Disclaimer</h4>
 </div>
 <p className="text-xs text-[#7598bd] leading-relaxed">
 Digital prescriptions and medical records available on the platform are generated only after an in-person consultation between the patient and the healthcare provider.
 </p>
 </div>
 </div>
 </div>
 </section>

 </div>
 );
}
