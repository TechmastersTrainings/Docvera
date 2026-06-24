"use client";

import React from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import { Info, ArrowLeft, Mail } from "lucide-react";

export default function AboutUs() {
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
              <Info className="h-6 w-6 text-[#04defb]" />
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">About Us</h1>
          </div>
        </div>

        <hr className="border-[rgba(255,255,255,0.08)]" />

        <div className="space-y-8 text-[#a9c7eb] leading-relaxed text-sm sm:text-base">
          <section className="space-y-3">
            <h2 className="text-lg font-bold text-white uppercase tracking-wider">Welcome to DocVera</h2>
            <p>
              DocVera is a healthcare appointment and consultation platform operated by TechmastersInnovations Private Limited.
            </p>
            <p>
              Our mission is to make healthcare access simple, reliable, and convenient by helping patients connect with verified medical professionals through a secure digital platform.
            </p>
            <p>Through DocVera, patients can:</p>
            <ul className="list-disc pl-6 space-y-1">
              <li>Search and discover doctors</li>
              <li>Book appointments online</li>
              <li>Manage consultations</li>
              <li>Access consultation records and medical information</li>
            </ul>
            <p>
              All doctors listed on the platform undergo a verification process before their profiles are made available to patients.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-bold text-white uppercase tracking-wider">Our Commitment</h2>
            <p>
              We are committed to providing a secure, transparent, and user-friendly healthcare experience for both patients and healthcare professionals.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-bold text-white uppercase tracking-wider">Company Information</h2>
            <p className="font-semibold text-white">TechmastersInnovations Private Limited</p>
            <div className="flex flex-col gap-2 mt-2">
              <div className="flex items-center gap-3 p-4 bg-[rgba(255,255,255,0.02)] border border-[rgba(255,255,255,0.06)] rounded-xl w-fit">
                <address className="text-sm text-white not-italic leading-relaxed">
                  113-6-9 Mascat Enclave Building,<br />
                  1st Floor, Sai Nagar,<br />
                  GND Engineering College Road,<br />
                  Mailoor, Bidar – 585401,<br />
                  Karnataka, India.
                </address>
              </div>
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
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}
