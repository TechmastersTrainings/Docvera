"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Activity, LogOut, User, Shield, Calendar, Menu, X } from "lucide-react";

export default function Navbar() {
  const router = useRouter();
  const [role, setRole] = useState<string | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const checkAuth = () => {
      const token = localStorage.getItem("access_token");
      const userRole = localStorage.getItem("user_role");
      setIsLoggedIn(!!token);
      setRole(userRole);
    };
    checkAuth();
    window.addEventListener('storage', checkAuth);
    return () => window.removeEventListener('storage', checkAuth);
  }, []);

  const handleLogout = () => {
    localStorage.clear();
    setIsLoggedIn(false);
    setRole(null);
    router.push("/login");
    router.refresh();
  };

  const navLinks = [
    { href: "/doctors", label: "Find Doctors" },
    { href: "/hospitals", label: "Hospitals" },
  ];

  const dashboardLink = role === 'PATIENT'
    ? { href: "/dashboard/patient", label: "My Appointments", icon: Calendar }
    : role === 'DOCTOR'
    ? { href: "/dashboard/doctor", label: "Appointments", icon: Calendar }
    : role === 'ADMIN'
    ? { href: "/dashboard/admin", label: "Admin", icon: Shield }
    : null;

  return (
    <header className="sticky top-0 z-50 bg-[#08222b] border-b border-[#213245] shadow-lg shadow-[#08222b]/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center gap-2.5 group shrink-0">
            <div className="p-1.5 bg-[#028597] rounded-lg group-hover:bg-[#04defb] transition-all">
              <Activity className="h-5 w-5 text-white" />
            </div>
            <span className="text-xl font-bold text-white tracking-tight">Docvera</span>
          </Link>

          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm font-medium text-[#98b2cd] hover:text-white transition-colors"
              >
                {link.label}
              </Link>
            ))}
            {dashboardLink && (
              <Link
                href={dashboardLink.href}
                className="flex items-center gap-2 text-sm font-semibold text-[#04defb] bg-[#04defb]/10 px-4 py-2 rounded-full border border-[#04defb]/20 hover:bg-[#04defb]/20 transition-colors"
              >
                <dashboardLink.icon className="h-4 w-4" />
                {dashboardLink.label}
              </Link>
            )}
          </nav>

          <div className="hidden md:flex items-center gap-3">
            {isLoggedIn ? (
              <button
                onClick={handleLogout}
                className="flex items-center gap-2 px-4 py-2 text-sm font-semibold text-[#ee1123] bg-[#ee1123]/10 border border-[#ee1123]/20 rounded-xl hover:bg-[#ee1123]/20 transition-all"
              >
                <LogOut className="h-4 w-4" />
                Logout
              </button>
            ) : (
              <>
                <Link href="/login" className="text-sm font-semibold text-[#98b2cd] hover:text-white transition-colors">
                  Sign In
                </Link>
                <Link
                  href="/register"
                  className="px-5 py-2.5 text-sm font-semibold text-white bg-[#028597] hover:bg-[#025964] rounded-xl transition-all shadow-lg shadow-[#028597]/20"
                >
                  Register
                </Link>
              </>
            )}
          </div>

          <button
            className="md:hidden text-white p-2"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {mobileOpen && (
        <div className="md:hidden border-t border-[#213245] bg-[#08222b] px-4 py-4 space-y-3">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMobileOpen(false)}
              className="block text-sm font-medium text-[#98b2cd] hover:text-white py-2"
            >
              {link.label}
            </Link>
          ))}
          {dashboardLink && (
            <Link
              href={dashboardLink.href}
              onClick={() => setMobileOpen(false)}
              className="flex items-center gap-2 text-sm font-semibold text-[#04defb] py-2"
            >
              <dashboardLink.icon className="h-4 w-4" />
              {dashboardLink.label}
            </Link>
          )}
          <hr className="border-[#213245]" />
          {isLoggedIn ? (
            <button onClick={handleLogout} className="flex items-center gap-2 text-sm font-semibold text-[#ee1123] py-2">
              <LogOut className="h-4 w-4" /> Logout
            </button>
          ) : (
            <div className="flex items-center gap-3 pt-2">
              <Link href="/login" onClick={() => setMobileOpen(false)} className="text-sm font-semibold text-[#98b2cd]">
                Sign In
              </Link>
              <Link href="/register" onClick={() => setMobileOpen(false)} className="px-5 py-2 text-sm font-semibold text-white bg-[#028597] rounded-xl">
                Register
              </Link>
            </div>
          )}
        </div>
      )}
    </header>
  );
}
