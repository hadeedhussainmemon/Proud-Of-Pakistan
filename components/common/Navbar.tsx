"use client";

import Link from "next/link";
import { useState, useRef, useEffect } from "react";
import { Search, Menu, X, User, Globe } from "lucide-react";
import { animate } from "animejs";
import { useSession } from "next-auth/react";

export default function Navbar() {
  const { data: session } = useSession();
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [logoUrl, setLogoUrl] = useState("/logo.jpg");
  const menuRef = useRef<HTMLDivElement>(null);
  const sidebarRef = useRef<HTMLDivElement>(null);

  const navigation = [
    { name: "News", href: "/blog" },
    { name: "Gallery", href: "/gallery" },
    { name: "Upcoming Events", href: "/events" },
    { name: "Past Events", href: "/events" },
    { name: "Profile Features", href: "/personalities" },
    { name: "About", href: "/about" },
    ...(session?.user && (session.user as any).role === "Admin"
      ? [{ name: "Admin Dashboard", href: "/admin/dashboard" }]
      : [])
  ];

  useEffect(() => {
    fetch("/api/config")
      .then((r) => r.json())
      .then((data) => {
        if (data && data.logoUrl) {
          setLogoUrl(data.logoUrl);
        }
      })
      .catch(() => {});
  }, []);

  useEffect(() => {
    if (isMobileOpen && sidebarRef.current) {
      animate(sidebarRef.current, {
        translateX: ["100%", "0%"],
        duration: 350,
        easing: "easeOutQuad"
      });
    }
  }, [isMobileOpen]);

  const closeMobileMenu = () => {
    if (sidebarRef.current) {
      animate(sidebarRef.current, {
        translateX: ["0%", "100%"],
        duration: 300,
        easing: "easeInQuad",
        complete: () => setIsMobileOpen(false)
      });
    } else {
      setIsMobileOpen(false);
    }
  };

  return (
    <nav ref={menuRef} className="fixed top-0 left-0 right-0 z-50 border-b border-emerald-500/10 bg-emerald-990/80 backdrop-blur-xl">
      <div className="mx-auto max-w-7xl px-6">
        <div className="flex h-20 items-center justify-between">
          
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5 text-xl font-display font-extrabold tracking-wider text-white">
            <img src={logoUrl} alt="Proud of Pakistan Logo" className="h-10 w-10 rounded-full object-cover border border-amber-400" />
            <span className="text-base sm:text-lg">PROUD OF PAKISTAN</span>
          </Link>

          {/* Navigation Links */}
          <div className="hidden lg:flex items-center space-x-1">
            {navigation.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="px-4 py-2 text-sm font-semibold tracking-wide text-emerald-100/80 hover:text-amber-400 hover:bg-white/5 rounded-lg transition-colors"
              >
                {link.name}
              </Link>
            ))}
          </div>

          {/* Action Icons */}
          <div className="flex items-center gap-4">
            <button className="p-2 text-emerald-100/80 hover:text-amber-400 transition-colors">
              <Search className="h-5 w-5" />
            </button>
            <Link href="/profile" className="flex h-9 w-9 items-center justify-center rounded-full bg-emerald-500/20 border border-emerald-500/30 text-emerald-300 hover:border-amber-400 transition-colors">
              <User className="h-4 w-4" />
            </Link>

            {/* Mobile Hamburger */}
            <button
              onClick={() => setIsMobileOpen(true)}
              className="lg:hidden p-2 text-emerald-100/80 hover:text-white hover:bg-white/5 rounded-lg"
            >
              <Menu className="h-6 w-6" />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Slide-out Sidebar */}
      {isMobileOpen && (
        <div className="lg:hidden fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex justify-end">
          <div className="flex-1" onClick={closeMobileMenu} />
          
          <div 
            ref={sidebarRef}
            className="w-80 h-full bg-emerald-990/95 border-l border-emerald-500/15 p-6 flex flex-col overflow-y-auto space-y-6 shadow-2xl transform"
          >
            <div className="flex justify-between items-center pb-4 border-b border-emerald-500/10">
              <span className="font-display font-bold text-white tracking-wider flex items-center gap-2">
                <Globe className="h-5 w-5 text-amber-400" /> NAVIGATION
              </span>
              <button 
                onClick={closeMobileMenu}
                className="p-1 rounded bg-white/5 hover:bg-white/10 text-emerald-100"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            
            <div className="flex-grow space-y-3">
              {navigation.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={closeMobileMenu}
                  className="block text-emerald-100 hover:text-amber-400 font-display font-bold text-base py-2 transition-colors border-b border-emerald-500/5"
                >
                  {link.name}
                </Link>
              ))}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
