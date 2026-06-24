"use client";

import React from "react";
import Link from "next/link";
import { Activity, ArrowRight, ShieldCheck, MapPin } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-[#05181e] border-t border-[#213245] text-white pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Section - Let's Talk & Newsletter */}
        <div className="grid lg:grid-cols-2 gap-12 border-b border-[rgba(255,255,255,0.08)] pb-16 mb-16">
          {/* Left: Let's Talk */}
          <div className="space-y-6">
            <h3 className="text-3xl font-extrabold text-white">Let's Talk</h3>
            <div className="space-y-3 text-[#a9c7eb] text-sm">
              <p>For general inquiries: <a href="mailto:TechmastersInnovations@gmail.com" className="text-[#04defb] hover:underline">TechmastersInnovations@gmail.com</a></p>
              <p>For provider partnerships: <a href="mailto:TechmastersInnovations@gmail.com" className="text-[#04defb] hover:underline">TechmastersInnovations@gmail.com</a></p>
            </div>
            <Link href="#" className="inline-flex items-center gap-2 bg-[rgba(255,255,255,0.05)] border border-[rgba(255,255,255,0.1)] hover:bg-[rgba(255,255,255,0.1)] px-6 py-3 rounded-xl transition-colors font-semibold text-sm">
              Schedule a Meeting
            </Link>
          </div>

          {/* Right: Newsletter */}
          <div className="space-y-6 bg-[rgba(4,222,251,0.03)] p-8 rounded-3xl border border-[rgba(4,222,251,0.1)]">
            <div className="space-y-2">
              <h3 className="text-2xl font-extrabold text-white">Sign up for our Newsletter</h3>
              <p className="text-[#7598bd] text-sm">Don’t miss out updates</p>
            </div>
            <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
              <div className="flex gap-3">
                <input type="email" placeholder="Enter your email" className="bg-[#021127] border border-[#213245] focus:border-[#04defb] focus:ring-1 focus:ring-[#04defb] rounded-xl px-4 py-3 flex-1 text-sm outline-none" />
                <button type="submit" className="bg-[#04defb] text-[#05181e] px-6 py-3 rounded-xl font-bold hover:bg-[#03c0d8] transition-colors flex items-center gap-2">
                  Sign Up <ArrowRight className="h-4 w-4" />
                </button>
              </div>
              <label className="flex items-start gap-3 cursor-pointer group">
                <input type="checkbox" className="mt-1 w-4 h-4 rounded border-[#213245] bg-[#021127] text-[#04defb] focus:ring-[#04defb] focus:ring-offset-[#05181e]" />
                <span className="text-[#7598bd] text-xs leading-relaxed group-hover:text-[#a9c7eb] transition-colors">
                  I agree to receiving marketing and product communications from DocVera.
                </span>
              </label>
            </form>
          </div>
        </div>

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
                <ShieldCheck className="h-5 w-5 text-[#04defb]" />
                <span>Enterprise-grade Security</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-[#7598bd]">
                <MapPin className="h-5 w-5 text-[#04defb]" />
                <span>TechmastersInnovations Pvt Ltd, Karnataka</span>
              </div>
            </div>
          </div>

          {/* Links */}
          <div className="lg:col-span-8 grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="space-y-6">
              <h4 className="text-sm font-bold text-white tracking-wider">Solutions</h4>
              <ul className="space-y-3">
                <li><Link href="/doctors" className="text-sm transition-colors text-[#7598bd] hover:text-[#04defb]">Search Specialists</Link></li>
                <li><Link href="/hospitals" className="text-sm transition-colors text-[#7598bd] hover:text-[#04defb]">Hospital Affiliations</Link></li>
                <li><Link href="/register" className="text-sm transition-colors text-[#7598bd] hover:text-[#04defb]">Patient Registration</Link></li>
                <li><Link href="/register" className="text-sm transition-colors text-[#7598bd] hover:text-[#04defb]">Provider Registration</Link></li>
              </ul>
            </div>

            <div className="space-y-6">
              <h4 className="text-sm font-bold text-white tracking-wider">Services</h4>
              <ul className="space-y-3">
                <li><Link href="#" className="text-sm transition-colors text-[#7598bd] hover:text-[#04defb]">Cardiology Clinics</Link></li>
                <li><Link href="#" className="text-sm transition-colors text-[#7598bd] hover:text-[#04defb]">Dermatology Care</Link></li>
                <li><Link href="#" className="text-sm transition-colors text-[#7598bd] hover:text-[#04defb]">Pediatrics</Link></li>
                <li><Link href="#" className="text-sm transition-colors text-[#7598bd] hover:text-[#04defb]">Neurology Evaluation</Link></li>
              </ul>
            </div>

            <div className="space-y-6">
              <h4 className="text-sm font-bold text-white tracking-wider">Resources</h4>
              <ul className="space-y-3">
                <li><Link href="#" className="text-sm transition-colors text-[#7598bd] hover:text-[#04defb]">Blogs</Link></li>
                <li><Link href="#" className="text-sm transition-colors text-[#7598bd] hover:text-[#04defb]">Webinars</Link></li>
                <li><Link href="#" className="text-sm transition-colors text-[#7598bd] hover:text-[#04defb]">News</Link></li>
                <li><Link href="#" className="text-sm transition-colors text-[#7598bd] hover:text-[#04defb]">Glossary</Link></li>
              </ul>
            </div>

            <div className="space-y-6">
              <h4 className="text-sm font-bold text-white tracking-wider">Join Us</h4>
              <ul className="space-y-3">
                <li><Link href="#" className="text-sm transition-colors text-[#7598bd] hover:text-[#04defb]">About DocVera</Link></li>
                <li>
                  <Link href="#" className="text-sm transition-colors text-[#7598bd] hover:text-[#04defb] flex items-center gap-2">
                    Careers <span className="px-2 py-0.5 rounded-full bg-[#04defb]/10 text-[#04defb] text-[10px] font-bold uppercase">Hiring</span>
                  </Link>
                </li>
                <li><Link href="#" className="text-sm transition-colors text-[#7598bd] hover:text-[#04defb]">Events</Link></li>
                <li><Link href="#" className="text-sm transition-colors text-[#7598bd] hover:text-[#04defb]">Open Positions</Link></li>
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
            <div className="flex items-center gap-4 ml-4">
              <Link href="#" className="hover:text-[#04defb] transition-colors">LinkedIn</Link>
              <Link href="#" className="hover:text-[#04defb] transition-colors">X-Twitter</Link>
              <Link href="#" className="hover:text-[#04defb] transition-colors">YouTube</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
