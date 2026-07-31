"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, FileText, UserCheck, Calendar, Image as ImageIcon, Mail, LogOut } from "lucide-react";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  const adminNavigation = [
    { name: "Dashboard", href: "/admin", icon: LayoutDashboard },
    { name: "Profiles", href: "/admin?tab=personalities", icon: UserCheck },
    { name: "Articles", href: "/admin?tab=articles", icon: FileText },
    { name: "Events", href: "/admin?tab=events", icon: Calendar },
    { name: "Gallery", href: "/admin?tab=gallery", icon: ImageIcon },
    { name: "Subscribers", href: "/admin?tab=subscribers", icon: Mail },
  ];

  return (
    <div className="min-h-screen bg-emerald-990 flex flex-col">
      {/* Premium Top Navigation CMS */}
      <header className="sticky top-0 z-40 border-b border-emerald-500/10 bg-emerald-990/90 backdrop-blur-md">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <div className="flex items-center gap-6">
              <Link href="/admin" className="flex items-center gap-2">
                <span className="bg-amber-400 text-emerald-950 font-bold px-2.5 py-1 rounded text-xs tracking-wider">
                  CMS
                </span>
                <span className="font-display font-extrabold text-sm text-white tracking-wider hidden md:inline-block">
                  PROUD OF PAKISTAN
                </span>
              </Link>

              {/* Top Navigation Row */}
              <nav className="flex space-x-1">
                {adminNavigation.map((item) => {
                  const isActive = pathname === item.href;
                  const Icon = item.icon;
                  return (
                    <Link
                      key={item.name}
                      href={item.href}
                      className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-semibold transition-all ${
                        isActive
                          ? "bg-amber-400 text-emerald-950"
                          : "text-emerald-100/70 hover:text-white hover:bg-emerald-950/50"
                      }`}
                    >
                      <Icon className="h-3.5 w-3.5" />
                      <span className="hidden lg:inline">{item.name}</span>
                    </Link>
                  );
                })}
              </nav>
            </div>

            {/* Right side items */}
            <div className="flex items-center gap-4">
              <Link
                href="/"
                className="text-xs font-bold text-emerald-300 hover:text-white transition-colors"
              >
                View Website
              </Link>
              <button className="p-2 text-emerald-100/60 hover:text-amber-400 transition-colors">
                <LogOut className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main CMS view wrapper */}
      <main className="flex-grow max-w-7xl w-full mx-auto px-4 py-8 sm:px-6 lg:px-8">
        {children}
      </main>
    </div>
  );
}
