"use client";

import React from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import { ShieldCheck, Mail, ArrowLeft } from "lucide-react";

export default function TermsOfService() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#021127] via-[#031d44] to-[#010915] text-white">
      <Navbar />
      <main className="max-w-4xl mx-auto px-6 py-16 space-y-10">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm text-[#04defb] hover:opacity-80 transition-opacity"
        >
          <ArrowLeft className="h-4 w-4" /> Back to Home
        </Link>

        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-[rgba(4,222,251,0.06)] border border-[rgba(4,222,251,0.15)] rounded-2xl">
              <ShieldCheck className="h-6 w-6 text-[#04defb]" />
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">Terms of Service</h1>
          </div>
          <p className="text-[#7598bd] text-sm font-medium">Last updated: June 22, 2026</p>
        </div>

        <hr className="border-[rgba(255,255,255,0.08)]" />

        <div className="space-y-8 text-[#a9c7eb] leading-relaxed text-sm sm:text-base">
          <section className="space-y-3">
            <h2 className="text-lg font-bold text-white uppercase tracking-wider">1. Acceptance of Terms</h2>
            <p>
              By accessing and registering an account on Docvera ("Platform"), you agree to comply with and be bound by these Terms of Service. If you do not agree to these terms, please do not use our services.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-bold text-white uppercase tracking-wider">2. Medical Disclaimer</h2>
            <p>
              Docvera is a scheduling and logistics platform facilitating connections between patients and verified independent medical providers. Docvera does not provide medical services directly and is not responsible for any clinical advice, prescriptions, or consultations provided by doctors on the Platform.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-bold text-white uppercase tracking-wider">3. Account Integrity & Security</h2>
            <p>
              Users are responsible for maintaining the confidentiality of their credentials. You agree to provide accurate information (including name, DOB, and valid contact details) during registration. Registering duplicate profiles or spoofing credentials may result in suspension.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-bold text-white uppercase tracking-wider">4. Payments & Cancellation Policies</h2>
            <p>
              Appointments booked on the Platform include the doctor's consultation fee and a constant Platform Charge of ₹39.00 (inclusive of GST). Cancellations and refunds are processed in accordance with our cancellation windows. Failed payments are cancelled automatically.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-bold text-white uppercase tracking-wider">5. Doctor Verification</h2>
            <p>
              All healthcare providers listed on DocVera are required to submit a valid Medical Registration Number and supporting professional information. Profiles become visible to patients only after successful verification and approval by the DocVera administration team.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-bold text-white uppercase tracking-wider">6. Limitation of Liability</h2>
            <p>
              DocVera acts solely as a technology platform connecting patients with independent healthcare providers. Medical decisions, diagnoses, prescriptions, and treatment recommendations are the sole responsibility of the consulting doctor.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-bold text-white uppercase tracking-wider">7. Contact Us</h2>
            <p className="font-semibold text-white">TechmastersInnovations Private Limited</p>
            <div className="flex flex-col gap-2 mt-2">
              <div className="flex items-center gap-3 p-4 bg-[rgba(255,255,255,0.02)] border border-[rgba(255,255,255,0.06)] rounded-xl w-fit">
                <Mail className="h-5 w-5 text-[#04defb]" />
                <span className="text-sm font-semibold text-white">
                  TechmastersInnovations@gmail.com
                </span>
              </div>
              <div className="flex items-center gap-3 p-4 bg-[rgba(255,255,255,0.02)] border border-[rgba(255,255,255,0.06)] rounded-xl w-fit">
                <span className="text-sm font-semibold text-white">
                  Phone: +91 9880768222
                </span>
              </div>
              <div className="p-4 bg-[rgba(255,255,255,0.02)] border border-[rgba(255,255,255,0.06)] rounded-xl w-fit">
                <address className="text-sm text-white not-italic leading-relaxed">
                  113-6-9 Mascat Enclave Building,<br />
                  1st Floor, Sai Nagar,<br />
                  GND Engineering College Road,<br />
                  Mailoor, Bidar - 585401,<br />
                  Karnataka, India.
                </address>
              </div>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}
