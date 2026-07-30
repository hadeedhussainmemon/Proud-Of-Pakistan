"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

export default function Footer() {
  const [logoUrl, setLogoUrl] = useState("/logo.jpg");
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<string | null>(null);

  const links = [
    { name: "News", href: "/blog" },
    { name: "Gallery", href: "/gallery" },
    { name: "Events", href: "/events" },
    { name: "Profile Features", href: "/personalities" },
    { name: "About", href: "/about" }
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

  const handleSubscribe = async () => {
    if (!email || !email.includes("@")) {
      setStatus("Please enter a valid email address.");
      return;
    }
    setStatus("Subscribing...");
    try {
      const res = await fetch("/api/newsletter/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();
      if (res.ok) {
        setStatus("Thank you for subscribing!");
        setEmail("");
      } else {
        setStatus(data.error || "Subscription failed.");
      }
    } catch (err) {
      setStatus("Failed to subscribe due to connection error.");
    }
  };

  return (
    <footer className="border-t border-emerald-950/40 bg-[#020805] text-neutral-400 py-16 px-6 font-sans">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-12 items-start">
        
        {/* Brand identity block */}
        <div className="md:col-span-5 space-y-6">
          <div className="flex items-center gap-3">
            <img 
              src={logoUrl} 
              alt="Proud of Pakistan Logo" 
              className="h-12 w-12 rounded-full object-cover border border-amber-400/35"
            />
            <span className="text-lg font-display font-extrabold tracking-wider text-white">
              PROUD OF PAKISTAN
            </span>
          </div>
          <p className="text-sm text-neutral-500 font-light leading-relaxed max-w-sm">
            A premium digital archive dedicated to documenting, archiving, and showcasing the achievements, culture, and events that define the honor of Pakistan.
          </p>
        </div>

        {/* Navigation links block */}
        <div className="md:col-span-3 space-y-4">
          <h4 className="text-xs font-bold tracking-widest uppercase text-white">Navigation</h4>
          <ul className="space-y-2 text-sm">
            {links.map((link) => (
              <li key={link.name}>
                <Link 
                  href={link.href}
                  className="hover:text-amber-400 transition-colors duration-200"
                >
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Newsletter signup block */}
        <div className="md:col-span-4 space-y-4">
          <h4 className="text-xs font-bold tracking-widest uppercase text-white">Newsletter</h4>
          <p className="text-sm text-neutral-500 font-light leading-relaxed">
            Receive curated notifications regarding national events and featured profile launches.
          </p>
          <div className="space-y-2">
            <div className="flex gap-2 max-w-sm pt-2">
              <input 
                type="email" 
                placeholder="Your email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="bg-neutral-900 border border-emerald-950/60 rounded px-3 py-2 text-sm text-white placeholder-neutral-500 focus:outline-none focus:border-amber-500 flex-grow"
              />
              <button 
                onClick={handleSubscribe}
                className="bg-amber-400 hover:bg-amber-300 text-[#020805] text-xs font-bold px-4 py-2 rounded transition-colors duration-200 uppercase tracking-wider"
              >
                Subscribe
              </button>
            </div>
            {status && (
              <p className={`text-xs ${status.includes("Thank you") ? "text-emerald-400" : "text-amber-400"}`}>
                {status}
              </p>
            )}
          </div>
        </div>

      </div>

      {/* Copy note */}
      <div className="max-w-6xl mx-auto border-t border-emerald-950/40 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center text-xs text-neutral-600 gap-4">
        <span>
          &copy; {new Date().getFullYear()} Proud of Pakistan. All rights reserved.
        </span>
        <span className="font-light">
          Honoring national excellence, heritage, and character.
        </span>
      </div>
    </footer>
  );
}
