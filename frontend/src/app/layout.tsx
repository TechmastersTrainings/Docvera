import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import Footer from "@/components/Footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
 title: "DocVera | Book Doctor Appointments Online – In-Person Clinic Visits",
 description: "DocVera is a doctor appointment booking and clinic management platform. Find verified doctors, book in-person appointments, and manage clinic visits securely.",
};

export default function RootLayout({
 children,
}: Readonly<{
 children: React.ReactNode;
}>) {
 return (
 <html lang="en" className="scroll-smooth">
 <body className={`${inter.className} min-h-screen flex flex-col antialiased`}>
 <Script src="https://checkout.razorpay.com/v1/checkout.js" strategy="beforeInteractive" />
 <main className="flex-grow">
 {children}
 </main>
 <Footer />
 </body>
 </html>
 );
}
