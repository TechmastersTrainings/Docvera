"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Activity, ShieldCheck, Mail, Lock, AlertCircle, ArrowRight } from "lucide-react";
import { api } from "@/lib/api";
import Navbar from "@/components/Navbar";

export default function LoginPage() {
 const [email, setEmail] = useState("");
 const [password, setPassword] = useState("");
 const [error, setError] = useState<string | null>(null);
 const [loading, setLoading] = useState(false);
 const router = useRouter();

 const handleLogin = async (e: React.FormEvent) => {
 e.preventDefault();
 if (!email || !password) {
 setError("Please fill in all email and password fields.");
 return;
 }

 setError(null);
 setLoading(true);

 try {
 const response = await api.post("/auth/token/", { email, password });

 if (response.data.success) {
 const { access, refresh, user } = response.data.data;

 localStorage.setItem("access_token", access);
 localStorage.setItem("refresh_token", refresh);
 localStorage.setItem("user_role", user.role);
 localStorage.setItem("user_email", user.email);
 localStorage.setItem("user_id", user.id);

 if (user.role === "ADMIN") {
 router.push("/dashboard/admin");
 } else if (user.role === "DOCTOR") {
 router.push("/dashboard/doctor");
 } else {
 router.push("/dashboard/patient");
 }
 }
 } catch (err: any) {
  let errMsg = "Invalid authentication credentials. Please try again.";
  if (err?.response?.data) {
    if (typeof err.response.data === 'string') {
      errMsg = err.response.data;
    } else if (err.response.data.detail) {
      errMsg = err.response.data.detail;
    } else if (err.response.data.error) {
      errMsg = typeof err.response.data.error === 'string' ? err.response.data.error : JSON.stringify(err.response.data.error);
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
 <div className="w-full max-w-md">
 <div className="glass-card p-8 space-y-8">
 <div className="text-center space-y-3">
 <Link href="/" className="inline-flex items-center gap-2.5 group">
 <div className="p-2 bg-[rgba(2,133,151,0.1)] group-hover:bg-[#ee1123] transition-colors rounded-xl">
 <Activity className="h-5 w-5 text-[#ee1123] group-hover:text-white" />
 </div>
 <span className="text-xl font-bold text-primary tracking-tight">Docvera</span>
 </Link>
 <h2 className="text-2xl font-bold text-primary tracking-tight">Welcome Back</h2>
 <p className="text-sm text-secondary font-medium">Access your healthcare portal securely.</p>
 </div>

 <form onSubmit={handleLogin} className="space-y-5">
 {error && (
 <div className="p-4 bg-[#fde7e9] border border-[#f8a0a7] rounded-xl flex items-start gap-3 text-[#ee1123] text-sm font-medium">
 <AlertCircle className="h-5 w-5 shrink-0 mt-0.5" />
 <span>{error}</span>
 </div>
 )}

 <div className="space-y-1.5">
 <label className="flex items-center gap-1.5 text-xs font-bold text-muted uppercase tracking-wide">
 <Mail className="h-4 w-4 text-[#537eac]" /> Email Address
 </label>
 <input
 type="email"
 placeholder="doctor@docvera.com"
 value={email}
 onChange={(e) => setEmail(e.target.value)}
 className="w-full font-medium h-[48px] rounded-xl border border-gray-200 outline-none focus:border-[#ee1123] focus:ring-2 focus:ring-[#ee1123]/10"
 />
 </div>

 <div className="space-y-1.5">
 <label className="flex items-center gap-1.5 text-xs font-bold text-muted uppercase tracking-wide">
 <Lock className="h-4 w-4 text-[#537eac]" /> Password
 </label>
 <input
 type="password"
 placeholder="Enter your password"
 value={password}
 onChange={(e) => setPassword(e.target.value)}
 className="w-full font-medium h-[48px] rounded-xl border border-gray-200 outline-none focus:border-[#ee1123] focus:ring-2 focus:ring-[#ee1123]/10"
 />
 </div>

 <button
 type="submit"
 disabled={loading}
 className="w-full btn-primary h-[48px]"
 >
 <span>{loading ? "Signing in..." : "Sign In"}</span>
 <ArrowRight className="h-4 w-4 ml-2" />
 </button>
 </form>

 <hr className="border-[#bacbde]" />

 <div className="text-center text-sm font-medium text-secondary space-y-4">
 <div>
 Don't have an account?{" "}
 <Link href="/register" className="text-[#ee1123] font-bold hover:text-[#025964]">
 Create one
 </Link>
 </div>
 <div className="inline-flex items-center gap-1.5 text-xs text-muted">
 <ShieldCheck className="h-4 w-4 text-[#ee1123]" />
 <span>256-bit AES Encrypted</span>
 </div>
 </div>
 </div>
 </div>
 </div>
 </div>
 );
}
