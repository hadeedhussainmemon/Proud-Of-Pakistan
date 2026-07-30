"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { animate, stagger } from "animejs";
import { Search, Loader2 } from "lucide-react";

interface Personality {
  name: string;
  category: string;
  biography: string;
  slug: string;
}

interface Article {
  title: string;
  subtitle?: string;
  slug: string;
  category: string;
}

interface SiteConfig {
  headline: string;
  subheadline: string;
  aboutText: string[];
}

export default function Home() {
  const heroRef = useRef<HTMLDivElement>(null);
  const [personalities, setPersonalities] = useState<Personality[]>([]);
  const [articles, setArticles] = useState<Article[]>([]);
  const [config, setConfig] = useState<SiteConfig>({
    headline: "Proud of Pakistan – A Symbol of National Honor, Excellence, and Inspiration",
    subheadline: "Honoring exceptional citizens whose achievements, character, and service represent the strength and future of our nation.",
    aboutText: [
      "\"Proud of Pakistan\" is not merely a title or an award; it is a prestigious recognition dedicated to individuals whose character, commitment, achievements, and selfless service have brought honor and pride to Pakistan. It is a tribute to those who have made a meaningful impact on society through their talent, integrity, hard work, and unwavering dedication.",
      "A true Proud of Pakistan is not defined by fame alone, but by the positive difference they create in the lives of others. These are individuals who place the interests of their nation above personal gain, inspire future generations, and contribute to the progress and prosperity of Pakistan through their actions.",
      "The title \"Proud of Pakistan\" is reserved for exceptional individuals who have demonstrated excellence in diverse fields, including education, healthcare, science, technology, sports, literature, journalism, arts and culture, social welfare, entrepreneurship, public service, law, research, environmental protection, humanitarian work, and national defense.",
      "This recognition also honors young achievers, women, men, and senior citizens who, despite limited resources and countless challenges, have pursued their dreams with determination, perseverance, and integrity."
    ]
  });
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    animate(".hero-reveal", {
      translateY: [20, 0],
      opacity: [0, 1],
      delay: stagger(80),
      duration: 800,
      ease: "outQuad"
    });

    Promise.all([
      fetch("/api/personalities").then(r => r.json()),
      fetch("/api/articles").then(r => r.json()),
      fetch("/api/config").then(r => r.json())
    ])
      .then(([persData, artData, configData]) => {
        if (Array.isArray(persData)) setPersonalities(persData);
        if (Array.isArray(artData)) setArticles(artData);
        if (configData && configData.headline) setConfig(configData);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to fetch homepage data", err);
        setLoading(false);
      });
  }, []);

  return (
    <div className="flex flex-col w-full min-h-screen text-neutral-100 bg-[#020805] font-sans selection:bg-amber-400 selection:text-[#020805]">
      
      {/* 1. Header Hero section */}
      <header ref={heroRef} className="relative py-20 px-6 max-w-6xl mx-auto border-b border-emerald-950/40 w-full">
        <div className="space-y-6 max-w-4xl">
          <div className="hero-reveal mb-8">
            <img src="/logo.jpg" alt="Proud of Pakistan Logo" className="h-24 w-24 md:h-32 md:w-32 rounded-full object-cover border border-amber-400/30 shadow-2xl" />
          </div>
          <span className="hero-reveal block text-xs font-bold uppercase tracking-widest text-amber-500">
            A Premium National Archive
          </span>
          <h1 className="hero-reveal text-4xl md:text-6xl font-display font-extrabold tracking-tight leading-[1.1] text-white">
            {config.headline}
          </h1>
          <p className="hero-reveal text-lg md:text-xl text-neutral-400 font-light leading-relaxed max-w-2xl pt-4">
            {config.subheadline}
          </p>
        </div>
      </header>

      {/* 2. Main content: Two Columns Layout */}
      <section className="max-w-6xl mx-auto px-6 py-20 w-full grid grid-cols-1 lg:grid-cols-12 gap-16">
        
        {/* Left Column: Platform Statement (About Text) */}
        <div className="lg:col-span-7 space-y-8 pr-4">
          <h2 className="text-xs font-bold tracking-widest text-emerald-500 uppercase border-b border-emerald-950/40 pb-2">
            The Platform Mission
          </h2>
          <div className="space-y-6 text-neutral-300 font-light leading-relaxed text-base text-justify">
            {config.aboutText.map((p, idx) => (
              <p key={idx} className={idx === 0 ? "text-lg text-white font-normal leading-relaxed" : ""}>
                {p}
              </p>
            ))}
          </div>
        </div>

        {/* Right Column: Dynamic Lists (News & Profiles) */}
        <div className="lg:col-span-5 space-y-16">
          
          {/* Search bar */}
          <div className="relative">
            <input
              type="text"
              placeholder="Search directory..."
              className="w-full bg-neutral-900/20 border border-emerald-950/60 rounded-lg py-3 px-4 text-sm text-neutral-100 placeholder-neutral-500 focus:outline-none focus:border-amber-500 transition-colors"
            />
          </div>

          {/* Profile Features List */}
          <div className="space-y-6">
            <h3 className="text-xs font-bold tracking-widest text-emerald-500 uppercase border-b border-emerald-950/40 pb-2">
              Profile Features
            </h3>
            {loading ? (
              <Loader2 className="h-5 w-5 text-amber-400 animate-spin" />
            ) : (
              <div className="divide-y divide-emerald-950/30">
                {personalities.slice(0, 3).map((p, idx) => (
                  <div key={idx} className="py-4 first:pt-0">
                    <span className="text-[10px] uppercase font-bold text-amber-500/80 tracking-wider">
                      0{idx + 1} &bull; {p.category}
                    </span>
                    <h4 className="text-lg font-bold text-white mt-1 hover:text-amber-400 transition-colors">
                      <Link href={`/personalities/${p.slug}`}>{p.name}</Link>
                    </h4>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* News & Editorial List */}
          <div className="space-y-6">
            <h3 className="text-xs font-bold tracking-widest text-emerald-500 uppercase border-b border-emerald-950/40 pb-2">
              Latest News
            </h3>
            {loading ? (
              <Loader2 className="h-5 w-5 text-amber-400 animate-spin" />
            ) : (
              <div className="divide-y divide-emerald-950/30">
                {articles.slice(0, 3).map((art, idx) => (
                  <div key={idx} className="py-4 first:pt-0">
                    <span className="text-[10px] uppercase font-bold text-amber-500/80 tracking-wider">
                      {art.category}
                    </span>
                    <h4 className="text-base font-bold text-white mt-1 hover:text-amber-400 transition-colors leading-snug">
                      <Link href={`/blog/${art.slug}`}>{art.title}</Link>
                    </h4>
                  </div>
                ))}
              </div>
            )}
          </div>

        </div>
      </section>

      {/* 3. Visual Gallery (Minimalist Grid Layout) */}
      <section className="max-w-6xl mx-auto px-6 py-20 border-t border-emerald-950/40 w-full">
        <h2 className="text-xs font-bold tracking-widest text-emerald-500 uppercase mb-8">
          Visual Gallery
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {[
            "Badshahi Mosque, Lahore",
            "Passu Cones Peak, Hunza",
            "Lake Saif-ul-Mulook, Kaghan",
            "Kund Malir Coastline, Balochistan"
          ].map((title, idx) => (
            <div key={idx} className="group aspect-[3/4] bg-neutral-900/10 border border-emerald-950/40 p-4 rounded-xl flex flex-col justify-end transition-all hover:bg-neutral-900/20">
              <span className="text-[10px] text-amber-500 font-bold block mb-1">0{idx + 1}</span>
              <h3 className="text-sm font-bold text-white tracking-tight leading-snug">{title}</h3>
            </div>
          ))}
        </div>
      </section>

      {/* 4. Events timeline (Clean lists) */}
      <section className="max-w-6xl mx-auto px-6 py-20 border-t border-emerald-950/40 w-full grid grid-cols-1 md:grid-cols-2 gap-12">
        <div className="space-y-6">
          <h3 className="text-xs font-bold tracking-widest text-amber-500 uppercase">Upcoming Events</h3>
          <div className="space-y-4">
            {[
              { date: "AUG 14", title: "79th Independence Day Award Ceremony" },
              { date: "OCT 10", title: "Annual Young Achievers Roundtable" }
            ].map((e, idx) => (
              <div key={idx} className="flex gap-4 items-center py-2 border-b border-emerald-950/20">
                <span className="font-mono text-sm text-neutral-400">{e.date}</span>
                <span className="font-semibold text-white text-sm">{e.title}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="space-y-6">
          <h3 className="text-xs font-bold tracking-widest text-emerald-500 uppercase">Past Events</h3>
          <div className="space-y-4">
            {[
              { date: "MAR 23", title: "Pakistan Day Commemoration & Heritage Exhibition" },
              { date: "JAN 05", title: "Winter Sports Awards & Mountaineering Honors" }
            ].map((e, idx) => (
              <div key={idx} className="flex gap-4 items-center py-2 border-b border-emerald-950/20 opacity-60">
                <span className="font-mono text-sm text-neutral-400">{e.date}</span>
                <span className="font-semibold text-white text-sm">{e.title}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
}
