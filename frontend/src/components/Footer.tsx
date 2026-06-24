import React from "react";
import Link from "next/link";
import { Activity } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-[#05181e] border-t border-[#213245] text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-12">
          <div className="col-span-2 space-y-6">
            <Link href="/" className="flex items-center gap-3 group">
              <div className="p-2 rounded-lg bg-[#028597] group-hover:bg-[#04defb] transition-colors text-white">
                <Activity className="h-5 w-5" />
              </div>
              <span className="text-xl font-bold tracking-tight text-white">Docvera</span>
            </Link>
            <p className="text-sm leading-relaxed max-w-sm text-[#7598bd]">
              Enterprise-grade scheduling with 10-minute pessimistic checkout holds. Connecting patients with verified healthcare providers.
            </p>
            <div className="text-xs text-[#537eac]">
              &copy; 2026 Docvera Technologies Pvt Ltd. All rights reserved.
            </div>
          </div>

          <div className="space-y-4">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#98b2cd]">For Patients</h4>
            <ul className="space-y-2.5">
              <li><Link href="/doctors" className="text-sm transition-colors text-[#7598bd] hover:text-[#04defb]">Search Doctors</Link></li>
              <li><Link href="/hospitals" className="text-sm transition-colors text-[#7598bd] hover:text-[#04defb]">Find Hospitals</Link></li>
              <li><Link href="/login" className="text-sm transition-colors text-[#7598bd] hover:text-[#04defb]">Patient Login</Link></li>
              <li><Link href="/register" className="text-sm transition-colors text-[#7598bd] hover:text-[#04defb]">Registration</Link></li>
            </ul>
          </div>

          <div className="space-y-4">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#98b2cd]">For Providers</h4>
            <ul className="space-y-2.5">
              <li><Link href="/register" className="text-sm transition-colors text-[#7598bd] hover:text-[#04defb]">Doctor Registration</Link></li>
              <li><Link href="/hospitals" className="text-sm transition-colors text-[#7598bd] hover:text-[#04defb]">Hospital Affiliations</Link></li>
              <li><Link href="/login" className="text-sm transition-colors text-[#7598bd] hover:text-[#04defb]">Provider Login</Link></li>
              <li><Link href="/terms" className="text-sm transition-colors text-[#7598bd] hover:text-[#04defb]">Terms of Service</Link></li>
            </ul>
          </div>

          <div className="space-y-4">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#98b2cd]">Company</h4>
            <ul className="space-y-2.5">
              <li><a href="#" className="text-sm transition-colors text-[#7598bd] hover:text-[#04defb]">About Us</a></li>
              <li><a href="#" className="text-sm transition-colors text-[#7598bd] hover:text-[#04defb]">Careers</a></li>
              <li><Link href="/privacy-policy" className="text-sm transition-colors text-[#7598bd] hover:text-[#04defb]">Privacy Policy</Link></li>
              <li><a href="#" className="text-sm transition-colors text-[#7598bd] hover:text-[#04defb]">Contact Support</a></li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
}
