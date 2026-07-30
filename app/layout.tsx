import type { Metadata } from "next";
import { Outfit, Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/common/Navbar";
import Footer from "@/components/common/Footer";
import AuthProvider from "@/components/providers/AuthProvider";
import dbConnect from "@/lib/db";
import SiteConfig from "@/models/SiteConfig";

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export async function generateMetadata(): Promise<Metadata> {
  let favicon = "/logo.jpg"; // Default fallback
  try {
    await dbConnect();
    const config = await SiteConfig.findOne({ key: "main" });
    if (config && config.faviconUrl) {
      favicon = config.faviconUrl;
    }
  } catch (e) {
    console.error("Failed to load favicon from DB:", e);
  }

  return {
    title: "Proud of Pakistan | Celebrating Heroes, History, and Tourism",
    description: "A premium digital archive celebrating Pakistan's rich history, top businesses, key personalities, and tourism destinations.",
    icons: {
      icon: favicon,
      shortcut: favicon,
      apple: favicon,
    },
    openGraph: {
      title: "Proud of Pakistan",
      description: "A premium digital archive celebrating Pakistan's rich history, top businesses, key personalities, and tourism destinations.",
      url: "https://proudofpakistan.com",
      siteName: "Proud of Pakistan",
      images: [
        {
          url: favicon,
          width: 1200,
          height: 630,
          alt: "Proud of Pakistan Logo Preview Card",
        },
      ],
      locale: "en_US",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: "Proud of Pakistan",
      description: "A premium digital archive celebrating Pakistan's rich history, top businesses, key personalities, and tourism destinations.",
      images: [favicon],
    },
  };
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${outfit.variable} ${inter.variable} h-full antialiased dark`}>
      <body className="min-h-full flex flex-col bg-[#020805] text-white font-sans selection:bg-amber-400 selection:text-[#020805]">
        <AuthProvider>
          <Navbar />
          <main className="flex-grow pt-16 flex flex-col">{children}</main>
          <Footer />
        </AuthProvider>
      </body>
    </html>
  );
}
