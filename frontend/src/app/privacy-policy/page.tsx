"use client";

import React from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import { ShieldCheck, Mail, ArrowLeft } from "lucide-react";

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
              Thank you for choosing DocVera! Your privacy and data security are of paramount importance to us, and we’re committed to protecting your sensitive healthcare information. In case you have any doubts or questions about this privacy policy, please connect with us at <strong>TechmastersInnovations@gmail.com</strong>.
            </p>
            <p>
              This Privacy Policy aims to clear out any of your doubts related to the information we collect, its usage, and your rights in relation to it.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl font-bold text-white tracking-wider">Cookies & Other Tracking Technologies</h2>
            <p>
              You can set your browser to refuse all or some browser cookies or other tracking technology files, or to alert you when these files are being sent. You can also choose whether to allow the website to collect your personal information through the tracking technologies we use by contacting us at <strong>TechmastersInnovations@gmail.com</strong>.
            </p>
            <p>
              We use third-party website analytics and tracking tools to collect information about how visitors interact with our platform. These tools automatically collect certain information, which may include your IP address, device and browser information, pages visited, timestamps, and other usage data. The information collected is used by us to understand platform performance, improve scheduling functionality, and evaluate traffic patterns.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl font-bold text-white tracking-wider">Information Collected</h2>
            <p>
              Personal information that we collect includes information you provide voluntarily at the time of registering an account or booking a consultation. It could be personal information like your email address, phone number, gender, Date of Birth, and address details.
            </p>
            <p>
              Given the nature of our healthcare platform, we may also collect sensitive consultation records, medical history, prescriptions, diagnostic reports, and notes provided by your consulting doctor.
            </p>
            <p>
              We may also collect information such as IP address, device characteristics, and browser type when you visit our site. We collect log files that our servers automatically log as you visit our platform to ensure security and compliance.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl font-bold text-white tracking-wider">Information Usage</h2>
            <p>We’re committed to using your information responsibly. Here’s how we leverage the information we collect:</p>
            <ul className="list-disc pl-5 space-y-1">
              <li>To provide you with scheduling services and facilitate consultations with verified doctors.</li>
              <li>To solve any of your queries and support issues.</li>
              <li>To send you relevant updates, appointment reminders, and platform announcements.</li>
              <li>To process payments securely.</li>
              <li>To detect and prevent fraudulent activities or security threats.</li>
            </ul>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl font-bold text-white tracking-wider">Information Sharing</h2>
            <p>Here’s an overview of how we handle information sharing. We do not sell your personal data. We may share your data on the following basis:</p>
            <ul className="list-disc pl-5 space-y-1">
              <li>With your consulting doctor: Information shared during booking is accessible to your chosen doctor to provide adequate healthcare services.</li>
              <li>With payment gateways and hosting infrastructure providers to fulfill the terms of our service.</li>
              <li>If required to do so by law or if disclosing your information is necessary to comply with a regulatory or legal obligation.</li>
              <li>In the event of any merger or acquisition, we may transfer your personal information to the involved parties.</li>
            </ul>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl font-bold text-white tracking-wider">Prioritizing the Safety of Your Information</h2>
            <p>
              We handle your sensitive medical and personal data with the utmost care and employ advanced security measures to protect it from unauthorized access, disclosure, or misuse. This includes encrypted password storage and secure server infrastructures.
            </p>
            <p>
              Your information is confidential, and we do not share it with unauthorized third parties without your explicit consent. Your privacy and security remain our top priority.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl font-bold text-white tracking-wider">Your Personal Data Rights</h2>
            <p>
              Under certain circumstances, you have the right to request the deletion of your personal data or account deactivation. We will respect your decision and evaluate your requests in accordance with applicable medical retention laws.
            </p>
            <p>
              You have the right to request access to the personal data we hold about you, the information on how we use and collect data, and the purpose of collecting data. You can also update your profile details at any time from your dashboard.
            </p>
            <p>
              To exercise any of these rights, or if you have any questions, you can connect with us at <strong>TechmastersInnovations@gmail.com</strong>.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl font-bold text-white tracking-wider">Data Retention</h2>
            <p>
              We retain personal information, appointment records, and medical records only for as long as necessary to provide our services, comply with legal obligations, resolve disputes, and enforce our agreements.
            </p>
            <p>
              Patient medical records and prescriptions may be retained in accordance with applicable healthcare and record retention laws. Upon account deletion requests, certain information may be retained where legally required or necessary for fraud prevention, security, and regulatory compliance.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl font-bold text-white tracking-wider">Data Storage and Security</h2>
            <p>
              All information stored by DocVera is protected using industry-standard security measures, including encryption of passwords, secured network communications, access controls, and regular security monitoring.
            </p>
            <p>
              Although we implement reasonable safeguards to protect your information, no electronic storage method or transmission over the Internet is completely secure, and therefore we cannot guarantee absolute security.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl font-bold text-white tracking-wider">Cross-Border Data Transfers</h2>
            <p>
              Our servers, cloud infrastructure providers, analytics providers, and service partners may process and store information in jurisdictions outside your state or country of residence. By using our platform, you consent to such processing and storage, subject to applicable data protection laws.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl font-bold text-white tracking-wider">Children&apos;s Privacy</h2>
            <p>
              DocVera is not intended for use by children under the age of 18 without the involvement of a parent or legal guardian. If we become aware that personal information of a minor has been collected without appropriate consent, we will take reasonable steps to delete such information.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl font-bold text-white tracking-wider">Third-Party Services</h2>
            <p>
              Our platform may integrate with third-party service providers, including payment gateways, cloud hosting providers, analytics services, communication providers, and notification services. These third parties have their own privacy policies, and DocVera is not responsible for the privacy practices of such third parties.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl font-bold text-white tracking-wider">Data Breach Notification</h2>
            <p>
              In the event of an actual or suspected data breach that may compromise your personal information, DocVera will take reasonable steps to investigate, mitigate, and notify affected users and regulatory authorities where required under applicable laws.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl font-bold text-white tracking-wider">Consent to Electronic Communication</h2>
            <p>
              By creating an account and using DocVera, you consent to receive electronic communications, including appointment reminders, notifications, security alerts, payment confirmations, and service-related communications via email, SMS, WhatsApp, or in-app notifications.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl font-bold text-white tracking-wider">Account Deactivation and Data Deletion</h2>
            <p>
              You may request account deactivation or deletion by contacting us at{" "}
              <a href="mailto:TechmastersInnovations@gmail.com" className="text-[#04defb] hover:underline font-semibold">TechmastersInnovations@gmail.com</a>.
              Certain records may continue to be retained where required by law, regulatory obligations, fraud prevention requirements, dispute resolution processes, or legitimate business purposes.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl font-bold text-white tracking-wider">Changes to this Privacy Policy</h2>
            <p>
              We may update this Privacy Policy from time to time to reflect changes in our services, legal requirements, or business operations. Any updates will be posted on this page with a revised &quot;Last Updated&quot; date. Continued use of the platform after such modifications constitutes acceptance of the updated Privacy Policy.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl font-bold text-white tracking-wider">Contact Information</h2>
            <p>
              If you have any questions regarding this Privacy Policy, your personal information, or your data protection rights, you may contact:
            </p>
            <div className="p-5 rounded-2xl bg-[rgba(255,255,255,0.03)] border border-[rgba(255,255,255,0.08)] space-y-2">
              <p className="font-semibold text-white">TechmastersInnovations Private Limited</p>
              <p>Karnataka, India</p>
              <p>Email: <a href="mailto:TechmastersInnovations@gmail.com" className="text-[#04defb] hover:underline font-semibold">TechmastersInnovations@gmail.com</a></p>
              <p>Website: <a href="https://docvera.techmaster.space" className="text-[#04defb] hover:underline font-semibold">https://docvera.techmaster.space</a></p>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}
