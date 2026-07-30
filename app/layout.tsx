import type { Metadata } from "next";
import { Outfit, Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/common/Navbar";
import Footer from "@/components/common/Footer";

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Proud of Pakistan | Celebrating Heroes, History, and Tourism",
  description: "A premium digital archive celebrating Pakistan's rich history, top businesses, key personalities, and tourism destinations.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${outfit.variable} ${inter.variable} h-full antialiased dark`}>
      <body className="min-h-full flex flex-col bg-emerald-990 text-white font-sans selection:bg-amber-400 selection:text-emerald-950">
        <Navbar />
        <main className="flex-grow pt-16 flex flex-col">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
