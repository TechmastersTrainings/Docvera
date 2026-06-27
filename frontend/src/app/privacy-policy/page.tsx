"use client";

import React from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import { ShieldCheck, ArrowLeft, Info } from "lucide-react";

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

        <div className="space-y-12 text-[#a9c7eb] leading-relaxed text-sm sm:text-base font-medium">
          <section className="space-y-4">
            <p>
              Thank you for choosing DocVera. Your privacy and data security are of paramount importance to us, and we are committed to protecting your personal and healthcare information. If you have any questions regarding this Privacy Policy or our data practices, please contact us at <a href="mailto:TechmastersInnovations@gmail.com" className="text-[#04defb] hover:underline"><strong>TechmastersInnovations@gmail.com</strong></a>.
            </p>
            <p>
              This Privacy Policy explains what information we collect, how we use it, how we protect it, and the rights you have regarding your information when you use the DocVera platform.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl font-bold text-white tracking-wider border-b border-[rgba(255,255,255,0.08)] pb-2">About DocVera</h2>
            <p>
              DocVera is a technology platform owned and operated by <strong>TechmastersInnovations Private Limited</strong>, Karnataka, India. Our platform facilitates the discovery of verified doctors and clinics, appointment scheduling and booking, secure online payments for appointment-related services, and the digital management of in-clinic records and prescriptions.
            </p>
            <p>
              Please note that DocVera does <strong>not</strong> provide online consultations, video consultations, telemedicine services, medical advice, diagnosis, or treatment services. All medical consultations are conducted exclusively by independent healthcare professionals during physical in-person visits.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl font-bold text-white tracking-wider border-b border-[rgba(255,255,255,0.08)] pb-2">Cookies & Other Tracking Technologies</h2>
            <p>
              You can set your browser to refuse all or some browser cookies, or to alert you when cookies are being sent. We use analytics and tracking technologies to understand how visitors interact with our platform. These technologies may collect data such as your IP address, device information, browser type, operating system, pages visited, timestamps, and usage patterns. This information is utilized strictly to improve platform performance, enhance security, and optimize appointment scheduling functionality.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl font-bold text-white tracking-wider border-b border-[rgba(255,255,255,0.08)] pb-2">Information Collected</h2>
            <p>
              We collect several types of information from and about users of our platform. <strong>Personal information</strong> may include your full name, email address, phone number, date of birth, gender, address details, emergency contact information, and profile photographs if voluntarily uploaded.
            </p>
            <p>
              When scheduling through our platform, we collect <strong>appointment information</strong> including your selected doctor and clinic, appointment date and time, appointment history, and payment status. 
            </p>
            <p>
              Given the healthcare nature of our platform, we may also collect <strong>medical information</strong> such as your medical history, prescriptions, diagnostic reports, clinical notes, visit records, and any allergies or health conditions voluntarily provided by you or entered by your healthcare provider. 
            </p>
            <p>
              Additionally, we automatically collect <strong>technical information</strong>, which encompasses your IP address, browser type, device information, log files, access timestamps, session information, and security logs.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl font-bold text-white tracking-wider border-b border-[rgba(255,255,255,0.08)] pb-2">Information Usage</h2>
            <p>
              We use the information we collect to provide our appointment scheduling services and facilitate bookings with verified healthcare professionals. Furthermore, this data is essential to manage patient accounts, provide appointment reminders and notifications, securely process payments, detect and prevent fraud, and continuously improve our platform's functionality and performance. We also utilize this information to comply with legal and regulatory obligations and to resolve support requests and disputes.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl font-bold text-white tracking-wider border-b border-[rgba(255,255,255,0.08)] pb-2">Information Sharing</h2>
            <p>
              We respect your privacy and do not sell your personal information to third parties. We may share information with your selected healthcare provider to ensure they have the necessary details during your booking and treatment for providing appropriate medical services.
            </p>
            <p>
              We may also share information with trusted service providers who assist us in operating our platform, including payment gateways, cloud hosting providers, SMS and email providers, analytics services, and security providers. Additionally, your information may be disclosed if required by law or regulatory authorities, or in the event of a business transfer such as a merger, acquisition, or restructuring.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl font-bold text-white tracking-wider border-b border-[rgba(255,255,255,0.08)] pb-2">Payment Information</h2>
            <p>
              All payments made on the DocVera platform are processed securely through third-party payment service providers. To ensure your financial security, DocVera does not store sensitive payment details such as debit or credit card numbers, CVV numbers, UPI PINs, or net banking passwords. The processing of your payment information is governed exclusively by the privacy policies and security practices of our respective payment providers.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl font-bold text-white tracking-wider border-b border-[rgba(255,255,255,0.08)] pb-2">Data Retention</h2>
            <p>
              We retain personal information, appointment records, and medical records only for as long as necessary to provide our services, comply with legal obligations, resolve disputes, enforce agreements, and prevent fraud and abuse. Medical records specifically may be retained in accordance with applicable healthcare and record retention laws.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl font-bold text-white tracking-wider border-b border-[rgba(255,255,255,0.08)] pb-2">Data Storage and Security</h2>
            <p>
              We have implemented reasonable administrative, technical, and physical safeguards designed to secure your personal information. These measures include encrypted password storage, secure network communications, strict access controls, robust authentication mechanisms, comprehensive audit logging, continuous server monitoring, and role-based access controls. While we strive to protect your personal and medical information, no method of transmission over the internet or electronic storage is completely secure, and we cannot guarantee absolute security.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl font-bold text-white tracking-wider border-b border-[rgba(255,255,255,0.08)] pb-2">Cross-Border Data Transfers</h2>
            <p>
              Our cloud infrastructure providers and service partners may process or store your information on servers located outside your state or country of residence. By utilizing the DocVera platform, you expressly consent to such cross-border data transfers, subject to all applicable data protection laws.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl font-bold text-white tracking-wider border-b border-[rgba(255,255,255,0.08)] pb-2">Children's Privacy</h2>
            <p>
              DocVera is not intended for use by children under the age of 18 without the direct involvement and consent of a parent or legal guardian. If we become aware that personal information has been collected from a minor without appropriate verification of parental consent, we will take immediate and reasonable steps to remove such information from our systems.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl font-bold text-white tracking-wider border-b border-[rgba(255,255,255,0.08)] pb-2">Third-Party Services</h2>
            <p>
              Our platform may integrate with various third-party services to enhance your experience, including payment gateways, cloud hosting providers, analytics providers, communication providers, and mapping or location services. Please be aware that these external services operate independently and are governed under their own respective privacy policies.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl font-bold text-white tracking-wider border-b border-[rgba(255,255,255,0.08)] pb-2">Data Breach Notification</h2>
            <p>
              In the unlikely event of an actual or suspected data breach that may compromise your personal or medical information, DocVera is committed to taking immediate action. We will thoroughly investigate the incident, implement mitigation strategies, and promptly notify all affected users and relevant authorities where required by applicable law.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl font-bold text-white tracking-wider border-b border-[rgba(255,255,255,0.08)] pb-2">Consent to Electronic Communication</h2>
            <p>
              By creating an account and utilizing the DocVera platform, you affirmatively consent to receive electronic communications from us. These communications may include appointment reminders, critical security alerts, payment confirmations, service announcements, and notifications delivered via email, SMS, WhatsApp, or natively within the application.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl font-bold text-white tracking-wider border-b border-[rgba(255,255,255,0.08)] pb-2">Your Personal Data Rights</h2>
            <p>
              Subject to applicable law, you possess certain rights regarding your personal data. You may request access to your personal data, seek correction of any inaccurate information, initiate account deactivation, or request the deletion of certain information. You may also request details regarding our data collection practices. Please note that some information may continue to be retained where legally required or for legitimate business purposes.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl font-bold text-white tracking-wider border-b border-[rgba(255,255,255,0.08)] pb-2">Account Deactivation and Data Deletion</h2>
            <p>
              You may request the deletion or deactivation of your account at any time by contacting our support team at <a href="mailto:TechmastersInnovations@gmail.com" className="text-[#04defb] hover:underline"><strong>TechmastersInnovations@gmail.com</strong></a>. Following such a request, certain records may continue to be securely retained to fulfill legal obligations, assist in fraud prevention, maintain security, resolve ongoing disputes, or ensure regulatory compliance.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl font-bold text-white tracking-wider border-b border-[rgba(255,255,255,0.08)] pb-2">Changes to this Privacy Policy</h2>
            <p>
              We reserve the right to update or modify this Privacy Policy from time to time. Any such modifications will be posted directly on this page along with an updated "Last Updated" date at the top of the document. Your continued use of the DocVera platform following the posting of any changes constitutes your acceptance of the revised Privacy Policy.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl font-bold text-white tracking-wider border-b border-[rgba(255,255,255,0.08)] pb-2">Contact Information</h2>
            <address className="not-italic text-[#7598bd] space-y-1">
              <strong>TechmastersInnovations Private Limited</strong><br />
              Karnataka, India<br /><br />
              Email: <a href="mailto:TechmastersInnovations@gmail.com" className="text-[#04defb] hover:underline">TechmastersInnovations@gmail.com</a><br />
              Website: <a href="https://docvera.techmaster.space" target="_blank" rel="noopener noreferrer" className="text-[#04defb] hover:underline">https://docvera.techmaster.space</a>
            </address>
          </section>

          <div className="pt-8 pb-4">
            <div className="p-6 bg-[rgba(2,133,151,0.05)] border border-[rgba(2,133,151,0.2)] rounded-2xl space-y-6">
              <div className="flex items-center gap-3 border-b border-[rgba(2,133,151,0.2)] pb-4">
                <Info className="h-6 w-6 text-[#04defb]" />
                <h2 className="text-2xl font-bold text-white tracking-wider">Important Disclaimers</h2>
              </div>
              
              <div className="grid sm:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <h3 className="text-sm font-bold text-white uppercase tracking-wider">Platform Disclaimer</h3>
                  <p className="text-sm text-[#7598bd] leading-relaxed">DocVera is a technology platform that facilitates appointment scheduling and digital clinic management. Medical consultations are conducted exclusively by independent healthcare professionals during physical in-person visits.</p>
                </div>

                <div className="space-y-2">
                  <h3 className="text-sm font-bold text-white uppercase tracking-wider">Payment Disclaimer</h3>
                  <p className="text-sm text-[#7598bd] leading-relaxed">Payments made on DocVera are solely for appointment booking and related clinic services. DocVera does not provide medical consultation services.</p>
                </div>

                <div className="space-y-2">
                  <h3 className="text-sm font-bold text-white uppercase tracking-wider">Doctor Disclaimer</h3>
                  <p className="text-sm text-[#7598bd] leading-relaxed">Doctors and healthcare providers listed on DocVera are independent professionals and are solely responsible for the medical services they provide.</p>
                </div>

                <div className="space-y-2">
                  <h3 className="text-sm font-bold text-white uppercase tracking-wider">Medical Records Disclaimer</h3>
                  <p className="text-sm text-[#7598bd] leading-relaxed">Digital prescriptions and medical records available on the platform are generated only after an in-person consultation between the patient and the healthcare provider.</p>
                </div>

                <div className="space-y-2 sm:col-span-2">
                  <h3 className="text-sm font-bold text-white uppercase tracking-wider">Platform Role Disclaimer</h3>
                  <p className="text-sm text-[#7598bd] leading-relaxed">DocVera does not provide online consultations, video consultations, telemedicine services, medical advice, diagnosis, or treatment services. All consultations occur in person at the doctor's clinic or hospital.</p>
                </div>
              </div>
            </div>
          </div>

          <div className="text-center pt-8 text-sm text-[#7598bd] border-t border-[rgba(255,255,255,0.08)]">
            &copy; 2026 TechmastersInnovations Private Limited. All Rights Reserved.
          </div>
        </div>
      </main>
    </div>
  );
}
