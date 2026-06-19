import React from "react";
import Link from "next/link";
import { Activity } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-slate-900 border-t border-slate-800 text-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-12">
          <div className="col-span-2 space-y-6">
            <Link href="/" className="flex items-center gap-3 group">
              <div className="p-2 rounded-lg bg-blue-600 group-hover:bg-blue-500 transition-colors text-white">
                <Activity className="h-5 w-5" />
              </div>
              <span className="text-xl font-bold tracking-tight text-white">Docvera</span>
            </Link>
            <p className="text-sm leading-relaxed max-w-sm text-slate-400">
              Enterprise-grade scheduling with 10-minute pessimistic checkout holds. Connecting patients with verified healthcare providers.
            </p>
            <div className="text-xs text-slate-500">
              &copy; 2026 Docvera Technologies Pvt Ltd. All rights reserved.
            </div>
          </div>

          <div className="space-y-4">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-300">For Patients</h4>
            <ul className="space-y-2.5">
              <li><Link href="/doctors" className="text-sm transition-colors text-slate-400 hover:text-white">Search Doctors</Link></li>
              <li><Link href="/hospitals" className="text-sm transition-colors text-slate-400 hover:text-white">Find Hospitals</Link></li>
              <li><Link href="/login" className="text-sm transition-colors text-slate-400 hover:text-white">Patient Login</Link></li>
              <li><Link href="/register" className="text-sm transition-colors text-slate-400 hover:text-white">Registration</Link></li>
            </ul>
          </div>

          <div className="space-y-4">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-300">For Providers</h4>
            <ul className="space-y-2.5">
              <li><Link href="/register" className="text-sm transition-colors text-slate-400 hover:text-white">Doctor Registration</Link></li>
              <li><Link href="/hospitals" className="text-sm transition-colors text-slate-400 hover:text-white">Hospital Affiliations</Link></li>
              <li><Link href="/login" className="text-sm transition-colors text-slate-400 hover:text-white">Provider Login</Link></li>
              <li><Link href="/terms" className="text-sm transition-colors text-slate-400 hover:text-white">Terms of Service</Link></li>
            </ul>
          </div>

          <div className="space-y-4">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-300">Company</h4>
            <ul className="space-y-2.5">
              <li><a href="#" className="text-sm transition-colors text-slate-400 hover:text-white">About Us</a></li>
              <li><a href="#" className="text-sm transition-colors text-slate-400 hover:text-white">Careers</a></li>
              <li><a href="#" className="text-sm transition-colors text-slate-400 hover:text-white">Privacy Policy</a></li>
              <li><a href="#" className="text-sm transition-colors text-slate-400 hover:text-white">Contact Support</a></li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
}
