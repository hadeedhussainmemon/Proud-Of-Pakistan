"use client";

import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import { useState } from "react";
import { LayoutDashboard, FileText, UserCheck, Calendar, Image as ImageIcon, Mail, LogOut, Menu, X, Globe } from "lucide-react";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const activeTab = searchParams.get("tab") || "";
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const adminNavigation = [
    { name: "Dashboard", href: "/admin", tab: "" },
    { name: "Profiles", href: "/admin?tab=personalities", tab: "personalities" },
    { name: "Articles", href: "/admin?tab=articles", tab: "articles" },
    { name: "Events", href: "/admin?tab=events", tab: "events" },
    { name: "Gallery", href: "/admin?tab=gallery", tab: "gallery" },
    { name: "Subscribers", href: "/admin?tab=subscribers", tab: "subscribers" },
  ];

  const getIcon = (name: string) => {
    switch (name) {
      case "Dashboard": return LayoutDashboard;
      case "Profiles": return UserCheck;
      case "Articles": return FileText;
      case "Events": return Calendar;
      case "Gallery": return ImageIcon;
      case "Subscribers": return Mail;
      default: return LayoutDashboard;
    }
  };

  return (
    <div className="min-h-screen bg-emerald-990 flex flex-col md:flex-row text-neutral-100">
      
      {/* Mobile Top Header */}
      <header className="sticky top-0 z-40 flex h-16 w-full items-center justify-between border-b border-emerald-500/10 bg-emerald-990/90 px-6 backdrop-blur-md md:hidden">
        <Link href="/admin" className="flex items-center gap-2">
          <span className="bg-amber-400 text-emerald-950 font-bold px-2 py-0.5 rounded text-[10px] tracking-wider uppercase">CMS</span>
          <span className="font-display font-extrabold text-sm text-white tracking-wider">PROUD OF PAKISTAN</span>
        </Link>
        <div className="flex items-center gap-2">
          <button 
            onClick={() => setIsMobileMenuOpen(true)}
            className="p-2 rounded-lg bg-emerald-950/40 border border-emerald-500/10 text-emerald-100 hover:text-white"
          >
            <Menu className="h-5 w-5" />
          </button>
        </div>
      </header>

      {/* Mobile Nav Drawer Overlay */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm md:hidden flex justify-start animate-fadeIn">
          <div className="w-72 bg-[#06180e] border-r border-emerald-500/15 p-6 flex flex-col h-full overflow-y-auto space-y-6 shadow-2xl">
            <div className="flex justify-between items-center pb-4 border-b border-emerald-500/10">
              <span className="font-display font-bold text-white tracking-wider flex items-center gap-2">
                <span className="bg-amber-400 text-emerald-950 font-extrabold px-1.5 py-0.5 rounded text-[9px]">CMS</span> ADMIN
              </span>
              <button 
                onClick={() => setIsMobileMenuOpen(false)}
                className="p-1 rounded bg-white/5 hover:bg-white/10 text-emerald-100"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            
            <div className="flex-grow flex flex-col gap-1.5">
              {adminNavigation.map((item) => {
                const isActive = (item.tab === "" && activeTab === "") || (item.tab !== "" && activeTab === item.tab);
                const Icon = getIcon(item.name);
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition-all ${
                      isActive
                        ? "bg-amber-400 text-emerald-950"
                        : "text-emerald-100/70 hover:text-white hover:bg-emerald-950/40 border border-transparent"
                    }`}
                  >
                    <Icon className="h-4 w-4" />
                    <span>{item.name}</span>
                  </Link>
                );
              })}
            </div>

            <div className="pt-4 border-t border-emerald-500/10 flex flex-col gap-2.5">
              <Link
                href="/"
                className="flex items-center justify-center gap-2 py-2.5 rounded-lg border border-emerald-500/20 text-xs font-bold text-emerald-300 hover:text-white bg-emerald-950/20"
              >
                <Globe className="h-3.5 w-3.5" /> View Website
              </Link>
              <button className="flex items-center justify-center gap-2 py-2.5 rounded-lg text-xs font-bold text-rose-400 hover:bg-rose-500/10 transition-colors">
                <LogOut className="h-3.5 w-3.5" /> Sign Out
              </button>
            </div>
          </div>
          <div className="flex-grow" onClick={() => setIsMobileMenuOpen(false)} />
        </div>
      )}

      {/* Desktop Permanent Sidebar Nav */}
      <aside className="hidden md:flex md:w-64 md:flex-col md:fixed md:inset-y-0 md:border-r md:border-emerald-500/10 md:bg-[#06180e] p-6">
        <div className="flex items-center gap-2.5 pb-6 border-b border-emerald-500/10 mb-6">
          <span className="bg-amber-400 text-emerald-950 font-extrabold px-2 py-0.5 rounded text-[10px] tracking-wider uppercase">CMS</span>
          <span className="font-display font-extrabold text-sm text-white tracking-wider">PROUD OF PAKISTAN</span>
        </div>

        <nav className="flex-grow flex flex-col gap-1.5">
          {adminNavigation.map((item) => {
            const isActive = (item.tab === "" && activeTab === "") || (item.tab !== "" && activeTab === item.tab);
            const Icon = getIcon(item.name);
            return (
              <Link
                key={item.name}
                href={item.href}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition-all ${
                  isActive
                    ? "bg-amber-400 text-emerald-950 shadow-md"
                    : "text-emerald-100/70 hover:text-white hover:bg-emerald-950/30"
                }`}
              >
                <Icon className="h-4 w-4" />
                <span>{item.name}</span>
              </Link>
            );
          })}
        </nav>

        <div className="pt-6 border-t border-emerald-500/10 flex flex-col gap-2">
          <Link
            href="/"
            className="flex items-center justify-center gap-2 py-2.5 rounded-xl border border-emerald-500/15 text-xs font-bold text-emerald-300 hover:text-white hover:bg-emerald-950/40 bg-emerald-950/10 transition-all"
          >
            <Globe className="h-3.5 w-3.5" /> View Website
          </Link>
          <button className="flex items-center justify-center gap-2 py-2.5 rounded-xl text-xs font-bold text-rose-400 hover:bg-rose-500/10 transition-colors">
            <LogOut className="h-3.5 w-3.5" /> Sign Out
          </button>
        </div>
      </aside>

      {/* Main CMS view wrapper */}
      <main className="flex-grow md:pl-64 flex flex-col min-h-screen">
        <div className="mx-auto max-w-7xl w-full px-4 py-8 sm:px-6 lg:px-8 flex-grow">
          {children}
        </div>
      </main>
    </div>
  );
}
