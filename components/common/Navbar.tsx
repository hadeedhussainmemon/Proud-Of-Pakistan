"use client";

import Link from "next/link";
import { useState, useRef, useEffect } from "react";
import { Search, Menu, X, ChevronDown, User, Sparkles, Bell, Globe } from "lucide-react";
import { animate } from "animejs";

export default function Navbar() {
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const sidebarRef = useRef<HTMLDivElement>(null);

  const navigation = {
    Explore: [
      "Provinces", "Cities", "History", "Culture", "Tourism", 
      "Heritage", "Food", "Mountains", "Lakes", "Deserts", "Beaches", "National Parks"
    ],
    "Featured Pakistanis": [
      "Entrepreneurs", "CEOs", "Scientists", "Doctors", "Engineers", 
      "Athletes", "Artists", "Influencers", "Teachers", "Social Workers", 
      "Politicians", "Military Heroes", "Students"
    ],
    Businesses: [
      "Startups", "IT Companies", "Restaurants", "Hotels", "NGOs", 
      "Universities", "Schools", "Hospitals", "Manufacturers", "Agencies"
    ],
    Categories: [
      "Success Stories", "Technology", "Innovation", "Sports", 
      "Fashion", "Photography", "Podcasts", "Videos", "Interviews"
    ],
    Community: [
      "Submit Story", "Nominate Personality", "Submit Business", "Become Contributor"
    ],
    Resources: [
      "Awards", "Hall of Fame", "Timeline", "Pakistan Facts", "Maps", "Statistics"
    ]
  };

  // Close menus on click outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setActiveMenu(null);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Slide-in animation for mobile sidebar
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
            <span className="bg-gradient-to-r from-emerald-400 to-amber-400 p-1.5 rounded-lg text-emerald-950">
              <Globe className="h-5 w-5" />
            </span>
            <span className="hidden sm:inline-block">PROUD OF PAKISTAN</span>
          </Link>

          {/* Desktop Navigation Links */}
          <div className="hidden lg:flex items-center space-x-1">
            {Object.keys(navigation).map((key) => (
              <div key={key} className="relative">
                <button
                  onClick={() => setActiveMenu(activeMenu === key ? null : key)}
                  className={`flex items-center gap-1 px-4 py-2 text-sm font-semibold tracking-wide transition-all rounded-lg ${
                    activeMenu === key 
                      ? "text-amber-400 bg-white/5" 
                      : "text-emerald-100/80 hover:text-white hover:bg-white/5"
                  }`}
                >
                  {key}
                  <ChevronDown className={`h-4 w-4 transition-transform duration-200 ${activeMenu === key ? "rotate-180" : ""}`} />
                </button>
              </div>
            ))}
            <Link href="/about" className="px-4 py-2 text-sm font-semibold tracking-wide text-emerald-100/80 hover:text-white hover:bg-white/5 rounded-lg">
              About
            </Link>
          </div>

          {/* Action Icons */}
          <div className="flex items-center gap-4">
            <button className="p-2 text-emerald-100/80 hover:text-amber-400 transition-colors">
              <Search className="h-5 w-5" />
            </button>
            <button className="p-2 text-emerald-100/80 hover:text-amber-400 transition-colors relative">
              <Bell className="h-5 w-5" />
              <span className="absolute top-1.5 right-1.5 h-2 w-2 rounded-full bg-amber-400 animate-pulse" />
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

      {/* Desktop Mega Menu Dropdown */}
      {activeMenu && (
        <div className="hidden lg:block absolute left-0 right-0 top-20 border-b border-emerald-500/10 bg-emerald-990/95 backdrop-blur-2xl shadow-2xl py-8">
          <div className="mx-auto max-w-7xl px-8 grid grid-cols-4 gap-8">
            <div className="col-span-1 border-r border-emerald-500/10 pr-8">
              <div className="flex items-center gap-2 text-amber-400 font-display font-bold text-lg mb-3">
                <Sparkles className="h-5 w-5" />
                <span>Explore {activeMenu}</span>
              </div>
              <p className="text-sm text-emerald-100/60 leading-relaxed">
                Discover the best of Pakistan's rich traditions, heritage, and modern accomplishments.
              </p>
            </div>
            <div className="col-span-3 grid grid-cols-3 gap-y-4 gap-x-8">
              {navigation[activeMenu as keyof typeof navigation].map((item) => (
                <Link
                  key={item}
                  href={`/${activeMenu.toLowerCase().replace(" ", "-")}/${item.toLowerCase().replace(" ", "-")}`}
                  onClick={() => setActiveMenu(null)}
                  className="text-sm text-emerald-100/80 hover:text-amber-400 font-medium transition-colors py-1 flex items-center gap-2"
                >
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-500/50" />
                  {item}
                </Link>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Mobile Slide-out Sidebar */}
      {isMobileOpen && (
        <div className="lg:hidden fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex justify-end">
          {/* Overlay Close Trigger */}
          <div className="flex-1" onClick={closeMobileMenu} />
          
          {/* Sidebar Drawer */}
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
            
            {/* Nav list inside Sidebar */}
            <div className="flex-grow space-y-6">
              {Object.keys(navigation).map((key) => (
                <div key={key} className="space-y-2">
                  <h3 className="text-amber-400 font-display font-bold text-sm tracking-wider uppercase">{key}</h3>
                  <div className="grid grid-cols-1 gap-1.5 pl-3 border-l border-emerald-500/10">
                    {navigation[key as keyof typeof navigation].map((item) => (
                      <Link
                        key={item}
                        href={`/${key.toLowerCase().replace(" ", "-")}/${item.toLowerCase().replace(" ", "-")}`}
                        onClick={closeMobileMenu}
                        className="text-sm text-emerald-100/70 hover:text-white py-1 transition-colors"
                      >
                        {item}
                      </Link>
                    ))}
                  </div>
                </div>
              ))}
              <div className="pt-4 border-t border-emerald-500/10">
                <Link 
                  href="/about" 
                  onClick={closeMobileMenu} 
                  className="block text-emerald-100 hover:text-amber-400 font-display font-bold text-base"
                >
                  About
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
