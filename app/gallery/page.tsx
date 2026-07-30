"use client";

import { useState } from "react";
import { Sparkles, Compass } from "lucide-react";

export default function GalleryPage() {
  const items = [
    { desc: "Badshahi Mosque, Lahore", category: "Heritage" },
    { desc: "Passu Cones Peak, Hunza", category: "Mountains" },
    { desc: "Lake Saif-ul-Mulook, Kaghan", category: "Lakes" },
    { desc: "Kund Malir Coastline, Balochistan", category: "Beaches" },
    { desc: "Deosai Plains Plateau, GB", category: "National Parks" },
    { desc: "Derawar Fort Ruins, Cholistan", category: "Heritage" }
  ];

  return (
    <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="text-center max-w-3xl mx-auto mb-16">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-400/10 border border-amber-400/20 text-amber-400 text-xs font-semibold mb-4">
          <Sparkles className="h-3 w-3" />
          <span>Visual Heritage Archive</span>
        </div>
        <h1 className="text-4xl md:text-5xl font-display font-extrabold tracking-tight text-white mb-6 leading-tight">
          Visual Gallery
        </h1>
        <p className="text-emerald-100/60 text-base md:text-lg leading-relaxed">
          High-resolution showcases of Pakistan's diverse landscape, architecture, and heritage.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {items.map((item, idx) => (
          <div
            key={idx}
            className="group overflow-hidden rounded-3xl border border-emerald-500/10 bg-emerald-950/20 hover:border-emerald-500/30 transition-all duration-300"
          >
            <div className="h-48 bg-gradient-to-tr from-emerald-900/60 to-emerald-950/80 flex items-center justify-center text-emerald-300/30 relative">
              <Compass className="h-10 w-10 group-hover:scale-110 transition-transform duration-300" />
              <span className="absolute top-3 left-3 bg-black/40 backdrop-blur px-2.5 py-0.5 rounded text-xs text-amber-400 font-semibold border border-white/10">
                {item.category}
              </span>
            </div>
            <div className="p-6">
              <h3 className="font-display font-bold text-xl text-white mb-2">{item.desc}</h3>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
