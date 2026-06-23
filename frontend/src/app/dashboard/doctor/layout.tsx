"use client";

import React, { Suspense, useState, useEffect } from "react";
import Link from "next/link";
import { useSearchParams, useRouter } from "next/navigation";
import { Activity, LogOut, LayoutDashboard, Calendar, MapPin, Clock, Menu, X, User } from "lucide-react";

function DoctorNav() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const currentTab = searchParams.get("tab") || "dashboard";
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [userEmail, setUserEmail] = useState<string | null>(null);

  useEffect(() => {
    setUserEmail(localStorage.getItem("user_email"));
  }, []);

  const handleLogout = () => {
    localStorage.clear();
    router.push("/login");
  };

  const navLinks = [
    { name: "Dashboard", tab: "dashboard", icon: LayoutDashboard },
    { name: "Appointments", tab: "appointments", icon: Calendar },
    { name: "Clinic Details", tab: "address", icon: MapPin },
    { name: "Availability", tab: "availability", icon: Clock },
  ];

  return (
    <>
      <header className="sticky top-0 z-40 bg-[#08222b] border-b border-[#213245] shadow-lg shadow-[#08222b]/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link href="/" className="flex items-center gap-2.5 group shrink-0">
              <div className="p-1.5 bg-[#028597] rounded-lg group-hover:bg-[#04defb] transition-all">
                <Activity className="h-5 w-5 text-white" />
              </div>
              <span className="text-xl font-bold text-white tracking-tight">Docvera</span>
            </Link>

            <nav className="hidden md:flex items-center gap-1">
              {navLinks.map((link) => (
                <Link
                  key={link.tab}
                  href={`/dashboard/doctor?tab=${link.tab}`}
                  className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-bold transition-all ${
                    currentTab === link.tab
                      ? "bg-[#04defb]/10 text-[#04defb] border border-[#04defb]/20 shadow-sm"
                      : "text-[#98b2cd] hover:text-white hover:bg-white/5"
                  }`}
                >
                  <link.icon className="h-4 w-4" />
                  <span>{link.name}</span>
                </Link>
              ))}
              
              {userEmail && (
                <div className="ml-4 mr-2 flex items-center gap-2 px-3 py-1.5 bg-white/5 rounded-full border border-white/10 text-[#98b2cd] text-xs font-semibold">
                  <User className="h-3.5 w-3.5 text-[#04defb]" />
                  {userEmail}
                </div>
              )}

              <button onClick={handleLogout} className="ml-2 flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-bold text-[#ee1123] hover:bg-[#ee1123]/10 transition-all border border-transparent hover:border-[#ee1123]/20">
                <LogOut className="h-4 w-4" /> Logout
              </button>
            </nav>

            <button className="md:hidden text-[#98b2cd] hover:text-white p-2" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
              {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </header>

      {isMobileMenuOpen && (
        <div className="md:hidden border-b border-[#213245] bg-[#08222b] px-4 py-3 space-y-2 shadow-sm">
          {userEmail && (
            <div className="flex items-center gap-2 px-4 py-2 mb-2 bg-white/5 rounded-xl border border-white/10 text-[#98b2cd] text-sm font-semibold">
              <User className="h-4 w-4 text-[#04defb]" />
              {userEmail}
            </div>
          )}
          {navLinks.map((link) => (
            <Link
              key={link.tab}
              href={`/dashboard/doctor?tab=${link.tab}`}
              onClick={() => setIsMobileMenuOpen(false)}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-bold ${
                currentTab === link.tab ? "bg-[#04defb]/10 text-[#04defb]" : "text-[#98b2cd]"
              }`}
            >
              <link.icon className="h-4 w-4" />
              {link.name}
            </Link>
          ))}
          <button onClick={handleLogout} className="flex items-center gap-2 px-4 py-2 text-sm font-bold text-[#ee1123] w-full">
            <LogOut className="h-4 w-4" /> Logout
          </button>
        </div>
      )}
    </>
  );
}

export default function DoctorDashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-transparent flex flex-col">
      <Suspense fallback={
        <header className="sticky top-0 z-40 bg-[#08222b] border-b border-[#213245] shadow-lg shadow-[#08222b]/30">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16">
              <div className="flex items-center gap-2.5">
                <div className="p-1.5 bg-[#028597] rounded-lg">
                  <Activity className="h-5 w-5 text-white" />
                </div>
                <span className="text-xl font-bold text-white tracking-tight">Docvera</span>
              </div>
            </div>
          </div>
        </header>
      }>
        <DoctorNav />
      </Suspense>

      <main className="flex-grow w-full max-w-7xl mx-auto p-4 sm:p-6 lg:p-10">
        {children}
      </main>
    </div>
  );
}
