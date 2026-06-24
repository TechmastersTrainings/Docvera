"use client";

import React from "react";
import Link from "next/link";
import { Activity, ShieldCheck, MapPin } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-[#05181e] border-t border-[#213245] text-white pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">


        {/* Middle Section - Links & Brand */}
        <div className="grid lg:grid-cols-12 gap-12 border-b border-[rgba(255,255,255,0.08)] pb-16 mb-8">
          {/* Brand & Certs */}
          <div className="lg:col-span-4 space-y-8">
            <Link href="/" className="flex items-center gap-3 group">
              <div className="p-2 rounded-lg bg-[#028597] group-hover:bg-[#04defb] transition-colors text-white">
                <Activity className="h-5 w-5" />
              </div>
              <span className="text-xl font-bold tracking-tight text-white">DocVera</span>
            </Link>
            
            <div className="space-y-4">
              <div className="flex items-center gap-3 text-sm text-[#7598bd]">
                <MapPin className="h-5 w-5 text-[#04defb]" />
                <span>TechmastersInnovations Pvt Ltd, Karnataka</span>
              </div>
            </div>
          </div>

          {/* Links */}
          <div className="lg:col-span-8 grid grid-cols-2 md:grid-cols-3 gap-8">
            <div className="space-y-6">
              <h4 className="text-sm font-bold text-white tracking-wider">For Patients</h4>
              <ul className="space-y-3">
                <li><Link href="/doctors" className="text-sm transition-colors text-[#7598bd] hover:text-[#04defb]">Search Doctors</Link></li>
                <li><Link href="/hospitals" className="text-sm transition-colors text-[#7598bd] hover:text-[#04defb]">Find Hospitals</Link></li>
                <li><Link href="/login" className="text-sm transition-colors text-[#7598bd] hover:text-[#04defb]">Patient Login</Link></li>
                <li><Link href="/register" className="text-sm transition-colors text-[#7598bd] hover:text-[#04defb]">Registration</Link></li>
              </ul>
            </div>

            <div className="space-y-6">
              <h4 className="text-sm font-bold text-white tracking-wider">For Providers</h4>
              <ul className="space-y-3">
                <li><Link href="/register" className="text-sm transition-colors text-[#7598bd] hover:text-[#04defb]">Doctor Registration</Link></li>
                <li><Link href="/hospitals" className="text-sm transition-colors text-[#7598bd] hover:text-[#04defb]">Hospital Affiliations</Link></li>
                <li><Link href="/login" className="text-sm transition-colors text-[#7598bd] hover:text-[#04defb]">Provider Login</Link></li>
              </ul>
            </div>

            <div className="space-y-6">
              <h4 className="text-sm font-bold text-white tracking-wider">Company</h4>
              <ul className="space-y-3">
                <li><Link href="/about" className="text-sm transition-colors text-[#7598bd] hover:text-[#04defb]">About Us</Link></li>
                <li><Link href="/contact" className="text-sm transition-colors text-[#7598bd] hover:text-[#04defb]">Contact Us</Link></li>
                <li><Link href="/privacy-policy" className="text-sm transition-colors text-[#7598bd] hover:text-[#04defb]">Privacy Policy</Link></li>
                <li><Link href="/terms" className="text-sm transition-colors text-[#7598bd] hover:text-[#04defb]">Terms & Conditions</Link></li>
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-[#537eac]">
          <div className="flex items-center gap-4">
            <span>&copy; 2026 TechmastersInnovations Private Limited</span>
          </div>
          <div className="flex items-center gap-6">
            <Link href="/privacy-policy" className="hover:text-[#04defb] transition-colors">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-[#04defb] transition-colors">Terms & Conditions</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
