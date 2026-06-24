"use client";

import React from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import { ShieldCheck, Mail, ArrowLeft, Phone, MapPin } from "lucide-react";

export default function PrivacyPolicy() {
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
            <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">Privacy Policy</h1>
          </div>
          <p className="text-[#7598bd] text-sm font-medium">Last Updated: June 24, 2026</p>
        </div>

        <hr className="border-[rgba(255,255,255,0.08)]" />

        <div className="space-y-10 text-[#a9c7eb] leading-relaxed text-sm sm:text-base">
          <section className="space-y-4">
            <h2 className="text-xl font-bold text-white tracking-wider">1. Introduction</h2>
            <p>
              Welcome to DocVera, a healthcare appointment and consultation platform owned and operated by TechmastersInnovations Private Limited ("Company", "we", "our", or "us").
            </p>
            <p>
              This Privacy Policy explains how we collect, use, store, process, and protect your personal information when you access or use the DocVera platform, website, mobile applications, and related services.
            </p>
            <p>
              By using DocVera, you agree to the collection and use of information in accordance with this Privacy Policy.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl font-bold text-white tracking-wider">2. Company Information</h2>
            <div className="space-y-2 p-5 bg-[rgba(255,255,255,0.02)] border border-[rgba(255,255,255,0.06)] rounded-xl w-fit">
              <p><strong className="text-white">Company Name:</strong> TechmastersInnovations Private Limited</p>
              <p><strong className="text-white">Business Name:</strong> DocVera</p>
              <div className="flex items-start gap-2 pt-2">
                <MapPin className="h-5 w-5 text-[#04defb] shrink-0 mt-1" />
                <address className="not-italic">
                  <strong className="text-white block">Registered Address:</strong>
                  113-6-9 Mascat Enclave Building<br />
                  1st Floor<br />
                  Sai Nagar, GND Engineering College Road<br />
                  Mailoor, Bidar – 585401<br />
                  Karnataka, India
                </address>
              </div>
              <div className="flex items-center gap-2 pt-2">
                <Mail className="h-5 w-5 text-[#04defb]" />
                <a href="mailto:TechmastersInnovations@gmail.com" className="hover:text-[#04defb] transition-colors">TechmastersInnovations@gmail.com</a>
              </div>
              <div className="flex items-center gap-2 pt-1">
                <Phone className="h-5 w-5 text-[#04defb]" />
                <a href="tel:+919880768222" className="hover:text-[#04defb] transition-colors">+91 9880768222</a>
              </div>
            </div>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl font-bold text-white tracking-wider">3. Information We Collect</h2>
            <div className="space-y-6">
              <div className="space-y-2">
                <h3 className="text-lg font-semibold text-[#04defb]">3.1 Personal Information</h3>
                <p>We may collect the following information from users:</p>
                <ul className="list-disc pl-5 space-y-1">
                  <li>Full Name</li>
                  <li>Email Address</li>
                  <li>Mobile Number</li>
                  <li>Gender</li>
                  <li>Date of Birth</li>
                  <li>State, City, PIN Code, Residential Address</li>
                  <li>Account Credentials (encrypted password)</li>
                </ul>
              </div>
              <div className="space-y-2">
                <h3 className="text-lg font-semibold text-[#04defb]">3.2 Healthcare Information</h3>
                <p>Where applicable, we may collect:</p>
                <ul className="list-disc pl-5 space-y-1">
                  <li>Consultation records & Medical history</li>
                  <li>Prescriptions & Diagnostic reports</li>
                  <li>Appointment records</li>
                  <li>Doctor notes and recommendations</li>
                  <li>Documents uploaded by users</li>
                </ul>
              </div>
              <div className="space-y-2">
                <h3 className="text-lg font-semibold text-[#04defb]">3.3 Technical Information</h3>
                <p>We may automatically collect:</p>
                <ul className="list-disc pl-5 space-y-1">
                  <li>IP Address & Browser Information</li>
                  <li>Device Information & Operating System Details</li>
                  <li>Login Activity & Platform Usage Data</li>
                </ul>
              </div>
            </div>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl font-bold text-white tracking-wider">4. Purpose of Data Collection</h2>
            <p>We collect information to:</p>
            <ul className="list-disc pl-5 space-y-1">
              <li>Create and manage user accounts</li>
              <li>Schedule appointments and facilitate consultations</li>
              <li>Enable communication between patients and doctors</li>
              <li>Store consultation records</li>
              <li>Process payments and refunds</li>
              <li>Improve platform performance</li>
              <li>Detect fraud and security threats</li>
              <li>Comply with legal and regulatory obligations</li>
            </ul>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl font-bold text-white tracking-wider">5. Doctor Access to Patient Information</h2>
            <p>
              Patients acknowledge that information shared during appointment booking or consultation may be accessible to the consulting doctor for the purpose of providing healthcare services. Doctors may access only the information necessary to provide consultation and treatment-related services.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl font-bold text-white tracking-wider">6. Data Sharing</h2>
            <p>We do not sell personal information. Information may be shared with:</p>
            <ul className="list-disc pl-5 space-y-1">
              <li>Verified doctors registered on the platform</li>
              <li>Payment service providers</li>
              <li>Cloud hosting and infrastructure providers</li>
              <li>Government authorities when legally required</li>
              <li>Regulatory bodies pursuant to applicable laws</li>
            </ul>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl font-bold text-white tracking-wider">7. Data Security</h2>
            <p>We implement commercially reasonable security measures including:</p>
            <ul className="list-disc pl-5 space-y-1">
              <li>Encrypted password storage & Secure server infrastructure</li>
              <li>Access controls & Authentication mechanisms</li>
              <li>Activity monitoring and logging</li>
            </ul>
            <p className="italic">
              While we strive to protect user information, no method of transmission or storage can be guaranteed to be completely secure.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl font-bold text-white tracking-wider">8. Data Retention</h2>
            <p>We retain user information only for as long as necessary to provide services, maintain medical records, resolve disputes, enforce agreements, and comply with applicable laws. We reserve the right to retain certain records where legally required.</p>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl font-bold text-white tracking-wider">9. User Rights</h2>
            <p>Users may:</p>
            <ul className="list-disc pl-5 space-y-1">
              <li>Access their account information</li>
              <li>Update profile details</li>
              <li>Request correction of inaccurate information</li>
              <li>Request account deactivation</li>
            </ul>
            <p className="italic">Certain medical or transactional records may be retained where required by law or operational necessity.</p>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl font-bold text-white tracking-wider">10. Cookies and Tracking Technologies</h2>
            <p>DocVera may use cookies and similar technologies to maintain user sessions, improve user experience, analyze platform usage, and enhance platform security. Users may manage cookie preferences through their browser settings.</p>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl font-bold text-white tracking-wider">11. Third-Party Services</h2>
            <p>Our platform may integrate with third-party service providers including payment gateways, hosting providers, communication services, and analytics tools. Use of such services may be subject to their respective privacy policies.</p>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl font-bold text-white tracking-wider">12. Children's Privacy</h2>
            <p>DocVera is not intended for use by individuals under the age of 18 without the supervision or consent of a parent or legal guardian.</p>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl font-bold text-white tracking-wider">13. Changes to this Privacy Policy</h2>
            <p>We may update this Privacy Policy periodically. Updated versions will be published on the platform along with the revised effective date. Continued use of the platform after updates constitutes acceptance of the revised Privacy Policy.</p>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl font-bold text-white tracking-wider">14. Contact Us</h2>
            <p>For privacy-related concerns, complaints, or requests, please contact us at:</p>
            <div className="space-y-2 p-5 bg-[rgba(255,255,255,0.02)] border border-[rgba(255,255,255,0.06)] rounded-xl w-fit">
              <p><strong className="text-white">TechmastersInnovations Private Limited</strong></p>
              <div className="flex items-center gap-2 pt-2">
                <Mail className="h-5 w-5 text-[#04defb]" />
                <a href="mailto:TechmastersInnovations@gmail.com" className="hover:text-[#04defb] transition-colors">TechmastersInnovations@gmail.com</a>
              </div>
              <div className="flex items-center gap-2 pt-1">
                <Phone className="h-5 w-5 text-[#04defb]" />
                <a href="tel:+919880768222" className="hover:text-[#04defb] transition-colors">+91 9880768222</a>
              </div>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}
