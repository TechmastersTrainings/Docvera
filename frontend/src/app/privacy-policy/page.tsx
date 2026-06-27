"use client";

import React from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import { ShieldCheck, ArrowLeft } from "lucide-react";

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
            <p>
              Thank you for choosing DocVera. Your privacy and data security are of paramount importance to us, and we are committed to protecting your personal and healthcare information. If you have any questions regarding this Privacy Policy or our data practices, please contact us at <a href="mailto:TechmastersInnovations@gmail.com" className="text-[#04defb] hover:underline"><strong>TechmastersInnovations@gmail.com</strong></a>.
            </p>
            <p>
              This Privacy Policy explains what information we collect, how we use it, how we protect it, and the rights you have regarding your information when you use the DocVera platform.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl font-bold text-white tracking-wider">About DocVera</h2>
            <p>DocVera is a technology platform owned and operated by <strong>TechmastersInnovations Private Limited</strong>, Karnataka, India.</p>
            
            <p>DocVera facilitates:</p>
            <ul className="list-disc pl-5 space-y-1">
              <li>Discovery of verified doctors and clinics.</li>
              <li>Appointment scheduling and booking.</li>
              <li>Secure online payment for appointment-related services.</li>
              <li>Digital management of in-clinic records and prescriptions.</li>
            </ul>

            <p>DocVera does <strong>not</strong> provide:</p>
            <ul className="list-disc pl-5 space-y-1">
              <li>Online consultations</li>
              <li>Video consultations</li>
              <li>Telemedicine services</li>
              <li>Medical advice</li>
              <li>Diagnosis or treatment services</li>
            </ul>
            <p>All medical consultations are conducted exclusively by independent healthcare professionals during physical in-person visits.</p>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl font-bold text-white tracking-wider">Cookies & Other Tracking Technologies</h2>
            <p>
              You can set your browser to refuse all or some browser cookies or alert you when cookies are being sent.
            </p>
            <p>
              We use analytics and tracking technologies to understand how visitors interact with our platform. These technologies may collect:
            </p>
            <ul className="list-disc pl-5 space-y-1">
              <li>IP address</li>
              <li>Device information</li>
              <li>Browser type</li>
              <li>Operating system</li>
              <li>Pages visited</li>
              <li>Timestamps</li>
              <li>Usage patterns</li>
            </ul>
            <p>
              This information is used to improve platform performance, security, and appointment scheduling functionality.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl font-bold text-white tracking-wider">Information Collected</h2>
            
            <h3 className="text-lg font-semibold text-white mt-4">Personal Information</h3>
            <p>We may collect:</p>
            <ul className="list-disc pl-5 space-y-1">
              <li>Full name</li>
              <li>Email address</li>
              <li>Phone number</li>
              <li>Date of Birth</li>
              <li>Gender</li>
              <li>Address details</li>
              <li>Emergency contact information</li>
              <li>Profile photographs (if voluntarily uploaded)</li>
            </ul>

            <h3 className="text-lg font-semibold text-white mt-4">Appointment Information</h3>
            <p>We may collect:</p>
            <ul className="list-disc pl-5 space-y-1">
              <li>Doctor selected</li>
              <li>Clinic selected</li>
              <li>Appointment date and time</li>
              <li>Appointment history</li>
              <li>Payment status</li>
            </ul>

            <h3 className="text-lg font-semibold text-white mt-4">Medical Information</h3>
            <p>Given the nature of our platform, we may collect:</p>
            <ul className="list-disc pl-5 space-y-1">
              <li>Medical history</li>
              <li>Prescriptions</li>
              <li>Diagnostic reports</li>
              <li>Clinical notes</li>
              <li>Visit records</li>
              <li>Allergies and health conditions voluntarily provided by patients or entered by healthcare providers.</li>
            </ul>

            <h3 className="text-lg font-semibold text-white mt-4">Technical Information</h3>
            <p>We may automatically collect:</p>
            <ul className="list-disc pl-5 space-y-1">
              <li>IP address</li>
              <li>Browser type</li>
              <li>Device information</li>
              <li>Log files</li>
              <li>Access timestamps</li>
              <li>Session information</li>
              <li>Security logs</li>
            </ul>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl font-bold text-white tracking-wider">Information Usage</h2>
            <p>We use your information for the following purposes:</p>
            <ul className="list-disc pl-5 space-y-1">
              <li>To provide appointment scheduling services.</li>
              <li>To facilitate bookings with verified healthcare professionals.</li>
              <li>To manage patient accounts.</li>
              <li>To provide appointment reminders and notifications.</li>
              <li>To process payments securely.</li>
              <li>To detect and prevent fraud.</li>
              <li>To improve platform functionality and performance.</li>
              <li>To comply with legal and regulatory obligations.</li>
              <li>To resolve support requests and disputes.</li>
            </ul>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl font-bold text-white tracking-wider">Information Sharing</h2>
            <p>We do not sell your personal information.</p>
            <p>We may share information:</p>

            <h3 className="text-lg font-semibold text-white mt-4">With Healthcare Providers</h3>
            <p>Information shared during booking and treatment may be accessible to your selected healthcare provider for providing medical services.</p>

            <h3 className="text-lg font-semibold text-white mt-4">With Service Providers</h3>
            <p>Including:</p>
            <ul className="list-disc pl-5 space-y-1">
              <li>Payment gateways</li>
              <li>Cloud hosting providers</li>
              <li>SMS providers</li>
              <li>Email providers</li>
              <li>Analytics services</li>
              <li>Security providers</li>
            </ul>

            <h3 className="text-lg font-semibold text-white mt-4">Legal Requirements</h3>
            <p>If required by law or regulatory authorities.</p>

            <h3 className="text-lg font-semibold text-white mt-4">Business Transfers</h3>
            <p>In the event of a merger, acquisition, or restructuring.</p>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl font-bold text-white tracking-wider">Payment Information</h2>
            <p>Payments made on DocVera are processed through third-party payment service providers.</p>
            <p>DocVera does not store:</p>
            <ul className="list-disc pl-5 space-y-1">
              <li>Debit card numbers</li>
              <li>Credit card numbers</li>
              <li>CVV numbers</li>
              <li>UPI PINs</li>
              <li>Net banking passwords</li>
            </ul>
            <p>Payment processing is governed by the privacy policies and security practices of the respective payment providers.</p>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl font-bold text-white tracking-wider">Data Retention</h2>
            <p>
              We retain personal information, appointment records, and medical records only for as long as necessary to:
            </p>
            <ul className="list-disc pl-5 space-y-1">
              <li>Provide our services</li>
              <li>Comply with legal obligations</li>
              <li>Resolve disputes</li>
              <li>Enforce agreements</li>
              <li>Prevent fraud and abuse</li>
            </ul>
            <p>
              Medical records may be retained in accordance with applicable healthcare and record retention laws.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl font-bold text-white tracking-wider">Data Storage and Security</h2>
            <p>We implement reasonable administrative, technical, and physical safeguards, including:</p>
            <ul className="list-disc pl-5 space-y-1">
              <li>Encrypted password storage</li>
              <li>Secure network communications</li>
              <li>Access controls</li>
              <li>Authentication mechanisms</li>
              <li>Audit logging</li>
              <li>Server monitoring</li>
              <li>Role-based access controls</li>
            </ul>
            <p>
              Although we strive to protect your information, no method of transmission or electronic storage is completely secure.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl font-bold text-white tracking-wider">Cross-Border Data Transfers</h2>
            <p>
              Our cloud infrastructure providers and service partners may process or store information outside your state or country of residence.
            </p>
            <p>
              By using the platform, you consent to such transfers, subject to applicable data protection laws.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl font-bold text-white tracking-wider">Children's Privacy</h2>
            <p>
              DocVera is not intended for use by children under the age of 18 without the involvement of a parent or legal guardian.
            </p>
            <p>
              If we become aware that information has been collected without appropriate consent, we will take reasonable steps to remove such information.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl font-bold text-white tracking-wider">Third-Party Services</h2>
            <p>
              Our platform may integrate with third-party services, including:
            </p>
            <ul className="list-disc pl-5 space-y-1">
              <li>Payment gateways</li>
              <li>Cloud hosting providers</li>
              <li>Analytics providers</li>
              <li>Communication providers</li>
              <li>Mapping and location services</li>
            </ul>
            <p>These services operate under their own privacy policies.</p>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl font-bold text-white tracking-wider">Data Breach Notification</h2>
            <p>
              In the event of an actual or suspected data breach that may compromise personal information, DocVera will investigate, mitigate, and notify affected users and authorities where required by law.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl font-bold text-white tracking-wider">Consent to Electronic Communication</h2>
            <p>
              By creating an account and using DocVera, you consent to receive:
            </p>
            <ul className="list-disc pl-5 space-y-1">
              <li>Appointment reminders</li>
              <li>Security alerts</li>
              <li>Payment confirmations</li>
              <li>Service announcements</li>
              <li>Email notifications</li>
              <li>SMS notifications</li>
              <li>WhatsApp notifications</li>
              <li>In-app notifications</li>
            </ul>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl font-bold text-white tracking-wider">Your Personal Data Rights</h2>
            <p>
              Subject to applicable law, you may request:
            </p>
            <ul className="list-disc pl-5 space-y-1">
              <li>Access to your personal data</li>
              <li>Correction of inaccurate information</li>
              <li>Account deactivation</li>
              <li>Deletion of certain information</li>
              <li>Information regarding our data collection practices</li>
            </ul>
            <p>
              Some information may continue to be retained where required by law or for legitimate business purposes.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl font-bold text-white tracking-wider">Account Deactivation and Data Deletion</h2>
            <p>
              You may request account deletion or deactivation by contacting:<br/>
              <a href="mailto:TechmastersInnovations@gmail.com" className="text-[#04defb] hover:underline"><strong>TechmastersInnovations@gmail.com</strong></a>
            </p>
            <p>Certain records may continue to be retained for:</p>
            <ul className="list-disc pl-5 space-y-1">
              <li>Legal obligations</li>
              <li>Fraud prevention</li>
              <li>Security purposes</li>
              <li>Dispute resolution</li>
              <li>Regulatory compliance</li>
            </ul>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl font-bold text-white tracking-wider">Changes to this Privacy Policy</h2>
            <p>We may update this Privacy Policy from time to time.</p>
            <p>Any modifications will be posted on this page with an updated "Last Updated" date.</p>
            <p>Continued use of the platform constitutes acceptance of the revised Privacy Policy.</p>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl font-bold text-white tracking-wider">Contact Information</h2>
            <address className="not-italic text-[#7598bd] space-y-1">
              <strong>TechmastersInnovations Private Limited</strong><br />
              Karnataka, India<br /><br />
              Email: <a href="mailto:TechmastersInnovations@gmail.com" className="text-[#04defb] hover:underline">TechmastersInnovations@gmail.com</a><br />
              Website: <a href="https://docvera.techmaster.space" target="_blank" rel="noopener noreferrer" className="text-[#04defb] hover:underline">https://docvera.techmaster.space</a>
            </address>
          </section>

          <hr className="border-[rgba(255,255,255,0.08)] my-8" />

          <section className="space-y-6">
            <h2 className="text-2xl font-bold text-white tracking-wider text-center">Important Disclaimers</h2>
            
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-white">Platform Disclaimer</h3>
              <p>DocVera is a technology platform that facilitates appointment scheduling and digital clinic management. Medical consultations are conducted exclusively by independent healthcare professionals during physical in-person visits.</p>

              <h3 className="text-lg font-semibold text-white">Payment Disclaimer</h3>
              <p>Payments made on DocVera are solely for appointment booking and related clinic services. DocVera does not provide medical consultation services.</p>

              <h3 className="text-lg font-semibold text-white">Doctor Disclaimer</h3>
              <p>Doctors and healthcare providers listed on DocVera are independent professionals and are solely responsible for the medical services they provide.</p>

              <h3 className="text-lg font-semibold text-white">Medical Records Disclaimer</h3>
              <p>Digital prescriptions and medical records available on the platform are generated only after an in-person consultation between the patient and the healthcare provider.</p>

              <h3 className="text-lg font-semibold text-white">Platform Role Disclaimer</h3>
              <p>DocVera does not provide online consultations, video consultations, telemedicine services, medical advice, diagnosis, or treatment services. All consultations occur in person at the doctor's clinic or hospital.</p>
            </div>
          </section>

          <div className="text-center pt-8 text-sm text-[#7598bd]">
            &copy; 2026 TechmastersInnovations Private Limited. All Rights Reserved.
          </div>
        </div>
      </main>
    </div>
  );
}
