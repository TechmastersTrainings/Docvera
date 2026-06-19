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
 const errMsg = err?.detail || err?.message || "Invalid authentication credentials. Please try again.";
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
 <div className="p-2 bg-[rgba(11,170,244,0.1)] group-hover:bg-[var(--accent)] transition-colors rounded-xl">
 <Activity className="h-5 w-5 text-[var(--accent)] group-hover:text-white" />
 </div>
 <span className="text-xl font-bold text-primary tracking-tight">Docvera</span>
 </Link>
 <h2 className="text-2xl font-bold text-primary tracking-tight">Welcome Back</h2>
 <p className="text-sm text-secondary font-medium">Access your healthcare portal securely.</p>
 </div>

 <form onSubmit={handleLogin} className="space-y-5">
 {error && (
 <div className="p-4 bg-[rgba(11,170,244,0.1)] border border-[rgba(11,170,244,0.2)] rounded-xl flex items-start gap-3 text-[var(--accent)] text-sm font-medium">
 <AlertCircle className="h-5 w-5 shrink-0 mt-0.5" />
 <span>{error}</span>
 </div>
 )}

 <div className="space-y-1.5">
 <label className="text-xs font-bold text-muted uppercase tracking-wide">Email Address</label>
 <div className="relative">
 <Mail className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted" />
 <input
 type="email"
 placeholder="doctor@docvera.com"
 value={email}
 onChange={(e) => setEmail(e.target.value)}
 className="w-full bg-[rgba(255,255,255,0.04)] border border-[rgba(255,255,255,0.08)] focus:border-[var(--accent)] focus:ring-4 focus:ring-[rgba(50,109,205,0.15)] rounded-xl pl-11 pr-4 py-3 text-sm outline-none text-primary transition-all placeholder:text-muted font-medium"
 />
 </div>
 </div>

 <div className="space-y-1.5">
 <label className="text-xs font-bold text-muted uppercase tracking-wide">Password</label>
 <div className="relative">
 <Lock className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted" />
 <input
 type="password"
 placeholder="Enter your password"
 value={password}
 onChange={(e) => setPassword(e.target.value)}
 className="w-full bg-[rgba(255,255,255,0.04)] border border-[rgba(255,255,255,0.08)] focus:border-[var(--accent)] focus:ring-4 focus:ring-[rgba(50,109,205,0.15)] rounded-xl pl-11 pr-4 py-3 text-sm outline-none text-primary transition-all placeholder:text-muted font-medium"
 />
 </div>
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

 <hr className="border-[rgba(255,255,255,0.08)]" />

 <div className="text-center text-sm font-medium text-secondary space-y-4">
 <div>
 Don't have an account?{" "}
 <Link href="/register" className="text-[var(--accent)] font-bold hover:text-[#0988C3]">
 Create one
 </Link>
 </div>
 <div className="inline-flex items-center gap-1.5 text-xs text-muted">
 <ShieldCheck className="h-4 w-4 text-[var(--accent)]" />
 <span>256-bit AES Encrypted</span>
 </div>
 </div>
 </div>
 </div>
 </div>
 </div>
 );
}
