"use client";

import React from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import { MessageSquare, ArrowLeft, Mail } from "lucide-react";

export default function ContactUs() {
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
              <MessageSquare className="h-6 w-6 text-[#04defb]" />
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">Contact Us</h1>
          </div>
          <p className="text-[#7598bd] text-sm font-medium">We are here to help.</p>
        </div>

        <hr className="border-[rgba(255,255,255,0.08)]" />

        <div className="space-y-8 text-[#a9c7eb] leading-relaxed text-sm sm:text-base">
          <section className="space-y-3">
            <h2 className="text-lg font-bold text-white uppercase tracking-wider">Get in Touch</h2>
            <p className="font-semibold text-white">DocVera<br/>TechmastersInnovations Private Limited</p>
            
            <div className="flex flex-col gap-2 mt-4">
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
                  Mailoor, Bidar – 585401,<br />
                  Karnataka, India.
                </address>
              </div>
            </div>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-bold text-white uppercase tracking-wider">Support</h2>
            <p>For assistance related to:</p>
            <ul className="list-disc pl-6 space-y-1">
              <li>Appointment bookings</li>
              <li>Payments and refunds</li>
              <li>Doctor registration</li>
              <li>Account issues</li>
              <li>General inquiries</li>
            </ul>
            <p>
              Please contact our support team using the details above.
            </p>
          </section>
        </div>
      </main>
    </div>
  );
}
