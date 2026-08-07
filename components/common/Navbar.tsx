"use client";

import Link from "next/link";
import { useState, useRef, useEffect } from "react";
import { usePathname } from "next/navigation";
import { Search, Menu, X, User, Globe, LogIn, FileText, Calendar, Award, LayoutDashboard, LogOut } from "lucide-react";
import { animate } from "animejs";
import { useSession, signOut } from "next-auth/react";

export default function Navbar() {
  const pathname = usePathname();
  const { data: session } = useSession();
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [logoUrl, setLogoUrl] = useState("/logo.jpg");
  const menuRef = useRef<HTMLDivElement>(null);
  const sidebarRef = useRef<HTMLDivElement>(null);

  if (pathname?.startsWith("/admin")) return null;

  const navigation = [
    { name: "News", href: "/blog" },
    { name: "Gallery", href: "/gallery" },
    { name: "Events", href: "/events" },
    { name: "Profile Features", href: "/personalities" },
    { name: "About", href: "/about" },
    ...(session?.user && (session.user as any).role === "Admin"
      ? [{ name: "Admin Dashboard", href: "/admin" }]
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
    <>
      <nav ref={menuRef} className={`fixed top-0 left-0 right-0 border-b border-emerald-500/10 bg-emerald-990/80 backdrop-blur-xl transition-all ${isMobileOpen ? 'z-[9999]' : 'z-50'}`}>
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
            <form 
              onSubmit={(e) => {
                e.preventDefault();
                const form = e.target as HTMLFormElement;
                const q = (form.elements.namedItem('q') as HTMLInputElement).value;
                if (q.trim()) {
                  window.location.href = `/search?q=${encodeURIComponent(q.trim())}`;
                }
              }}
              className="relative hidden sm:block"
            >
              <input
                type="text"
                name="q"
                placeholder="Search..."
                className="w-32 lg:w-48 bg-emerald-950/40 border border-emerald-500/20 rounded-full py-1.5 pl-9 pr-3 text-sm text-white placeholder-emerald-100/40 focus:outline-none focus:border-amber-400 focus:w-48 lg:focus:w-64 transition-all duration-300"
              />
              <Search className="absolute left-3 top-2 h-4 w-4 text-emerald-100/60" />
            </form>

            {/* Mobile Search Icon (Links to search page) */}
            <Link href="/search" className="sm:hidden p-2 text-emerald-100/80 hover:text-amber-400 transition-colors">
              <Search className="h-5 w-5" />
            </Link>
            {session?.user ? (
              <button
                onClick={() => signOut({ callbackUrl: "/" })}
                title="Sign out"
                className="flex h-9 w-9 items-center justify-center rounded-full bg-emerald-500/20 border border-emerald-500/30 text-emerald-300 hover:border-amber-400 transition-colors font-bold text-sm uppercase"
              >
                {session.user.name?.charAt(0) || <User className="h-4 w-4" />}
              </button>
            ) : (
              <Link
                href="/login"
                className="flex items-center gap-1.5 px-3 py-2 bg-amber-400 hover:bg-amber-300 text-emerald-950 text-xs font-bold rounded-lg transition-colors"
              >
                <LogIn className="h-3.5 w-3.5" />
                Login
              </Link>
            )}

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

      </nav>

      {/* Mobile Slide-out Sidebar */}
      {isMobileOpen && (
        <div className="lg:hidden fixed inset-0 z-[9999] bg-black/75 backdrop-blur-md flex justify-end animate-fadeIn">
          <div className="flex-1" onClick={closeMobileMenu} />
          
          <div 
            ref={sidebarRef}
            className="w-80 h-full bg-[#06180e] border-l border-emerald-500/15 p-6 flex flex-col justify-between overflow-y-auto shadow-2xl transform"
          >
            <div className="space-y-6 flex-grow">
              {/* Brand Header inside Sidebar */}
              <div className="flex justify-between items-center pb-4 border-b border-emerald-500/10">
                <Link href="/" onClick={closeMobileMenu} className="flex items-center gap-2.5 font-display font-extrabold tracking-wider text-white text-sm">
                  <img src={logoUrl} alt="Proud of Pakistan Logo" className="h-8 w-8 rounded-full object-cover border border-amber-400" />
                  <span>PROUD OF PAKISTAN</span>
                </Link>
                <button 
                  onClick={closeMobileMenu}
                  className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-emerald-100 border border-emerald-500/10"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
              
              {/* Search Bar inside Sidebar */}
              <form 
                onSubmit={(e) => {
                  e.preventDefault();
                  const form = e.target as HTMLFormElement;
                  const q = (form.elements.namedItem('mobile-q') as HTMLInputElement).value;
                  if (q.trim()) {
                    closeMobileMenu();
                    window.location.href = `/search?q=${encodeURIComponent(q.trim())}`;
                  }
                }}
                className="relative w-full"
              >
                <input
                  type="text"
                  name="mobile-q"
                  placeholder="Search articles & heroes..."
                  className="w-full bg-emerald-950/40 border border-emerald-500/15 rounded-xl py-2.5 pl-10 pr-4 text-sm text-white placeholder-emerald-100/40 focus:outline-none focus:border-amber-400"
                />
                <Search className="absolute left-3.5 top-3 h-4 w-4 text-emerald-100/60" />
              </form>

              {/* Navigation list with Icons */}
              <div className="space-y-2">
                {navigation.map((link) => {
                  const IconComp = 
                    link.name === "News" ? FileText :
                    link.name === "Gallery" ? Award :
                    link.name === "Events" ? Calendar :
                    link.name === "Profile Features" ? Award :
                    link.name === "About" ? FileText :
                    link.name === "Admin Dashboard" ? LayoutDashboard : Globe;
                  
                  return (
                    <Link
                      key={link.name}
                      href={link.href}
                      onClick={closeMobileMenu}
                      className="flex items-center gap-3 text-emerald-100 hover:text-amber-400 font-semibold text-sm py-3 px-4 rounded-xl hover:bg-emerald-950/30 transition-all border border-transparent hover:border-emerald-500/5"
                    >
                      <IconComp className="h-4 w-4 text-amber-400" />
                      <span>{link.name}</span>
                    </Link>
                  );
                })}
              </div>
            </div>

            {/* Login / Logout at bottom of sidebar */}
            <div className="pt-4 border-t border-emerald-500/10 mt-6">
              {session?.user ? (
                <button
                  onClick={() => { closeMobileMenu(); signOut({ callbackUrl: "/" }); }}
                  className="w-full flex items-center justify-center gap-2 text-rose-400 hover:bg-rose-500/10 font-bold text-xs py-3 rounded-xl border border-rose-500/10 transition-colors"
                >
                  <LogOut className="h-4 w-4" /> Sign Out
                </button>
              ) : (
                <Link
                  href="/login"
                  onClick={closeMobileMenu}
                  className="w-full flex items-center gap-2 bg-amber-400 hover:bg-amber-300 text-emerald-950 font-bold text-xs py-3 px-4 rounded-xl justify-center transition-colors"
                >
                  <LogIn className="h-4 w-4" /> Sign In
                </Link>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
