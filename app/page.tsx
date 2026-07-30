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
  heroImageUrl?: string;
}

interface EventData {
  title: string;
  date: string;
  status: string;
}

interface GalleryItem {
  title: string;
  imageUrl: string;
}

export default function Home() {
  const heroRef = useRef<HTMLDivElement>(null);
  const [personalities, setPersonalities] = useState<Personality[]>([]);
  const [articles, setArticles] = useState<Article[]>([]);
  const [events, setEvents] = useState<EventData[]>([]);
  const [gallery, setGallery] = useState<GalleryItem[]>([]);
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

    const safeFetch = async (url: string) => {
      try {
        const res = await fetch(url);
        if (!res.ok) return null;
        return await res.json();
      } catch (err) {
        return null;
      }
    };

    Promise.all([
      safeFetch("/api/personalities"),
      safeFetch("/api/articles"),
      safeFetch("/api/config"),
      safeFetch("/api/events"),
      safeFetch("/api/gallery")
    ])
      .then(([persData, artData, configData, evtData, galData]) => {
        if (Array.isArray(persData)) setPersonalities(persData);
        if (Array.isArray(artData)) setArticles(artData);
        if (configData && configData.headline) setConfig(configData);
        if (Array.isArray(evtData)) setEvents(evtData);
        if (Array.isArray(galData)) setGallery(galData);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to fetch homepage data", err);
        setLoading(false);
      });
  }, []);

  const upcomingEvents = events.filter(e => e.status === "upcoming").slice(0, 3);
  const pastEvents = events.filter(e => e.status === "past").slice(0, 3);

  return (
    <div className="flex flex-col w-full min-h-screen text-neutral-100 bg-[#020805] font-sans selection:bg-amber-400 selection:text-[#020805]">
      
      {/* 1. Header Hero section */}
      <header ref={heroRef} className="relative py-20 px-6 max-w-6xl mx-auto border-b border-emerald-950/40 w-full grid grid-cols-1 md:grid-cols-12 gap-12 items-center">
        <div className="space-y-6 md:col-span-7">
          <span className="hero-reveal block text-xs font-bold uppercase tracking-widest text-amber-500">
            A Premium National Archive
          </span>
          <h1 className="hero-reveal text-4xl md:text-6xl font-display font-extrabold tracking-tight leading-[1.1] text-white">
            {config.headline}
          </h1>
          <p className="hero-reveal text-lg md:text-xl text-neutral-400 font-light leading-relaxed pt-4">
            {config.subheadline}
          </p>
        </div>
        <div className="md:col-span-5 hero-reveal flex justify-center">
          <img 
            src={config.heroImageUrl || "/hero_visual.jpg"} 
            alt="Pakistan Heritage Artwork" 
            className="h-72 w-72 md:h-96 md:w-96 rounded-2xl object-cover border border-emerald-950/40 shadow-2xl animate-fade-in"
          />
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
          
          {/* Profile Features List */}
          <div className="space-y-6">
            <h3 className="text-xs font-bold tracking-widest text-emerald-500 uppercase border-b border-emerald-950/40 pb-2">
              Profile Features
            </h3>
            {loading ? (
              <div className="flex items-center gap-2 text-neutral-500 text-sm py-4">
                <Loader2 className="h-4 w-4 animate-spin text-amber-500" />
                <span>Loading features...</span>
              </div>
            ) : (
              <div className="divide-y divide-emerald-950/30">
                {personalities.length === 0 ? (
                  <p className="text-neutral-500 text-sm py-4">No features loaded. Seed database to populate.</p>
                ) : (
                  personalities.slice(0, 3).map((p, idx) => (
                    <div key={idx} className="py-4 first:pt-0">
                      <span className="text-[10px] uppercase font-bold text-amber-500/80 tracking-wider">
                        0{idx + 1} &bull; {p.category}
                      </span>
                      <h4 className="text-lg font-bold text-white mt-1 hover:text-amber-400 transition-colors">
                        <Link href={`/personalities/${p.slug}`}>{p.name}</Link>
                      </h4>
                    </div>
                  ))
                )}
              </div>
            )}
          </div>

          {/* News & Editorial List */}
          <div className="space-y-6">
            <h3 className="text-xs font-bold tracking-widest text-emerald-500 uppercase border-b border-emerald-950/40 pb-2">
              Latest News
            </h3>
            {loading ? (
              <div className="flex items-center gap-2 text-neutral-500 text-sm py-4">
                <Loader2 className="h-4 w-4 animate-spin text-amber-500" />
                <span>Loading news...</span>
              </div>
            ) : (
              <div className="divide-y divide-emerald-950/30">
                {articles.length === 0 ? (
                  <p className="text-neutral-500 text-sm py-4">No news articles found. Seed database to populate.</p>
                ) : (
                  articles.slice(0, 3).map((art, idx) => (
                    <div key={idx} className="py-4 first:pt-0">
                      <span className="text-[10px] uppercase font-bold text-amber-500/80 tracking-wider">
                        {art.category}
                      </span>
                      <h4 className="text-base font-bold text-white mt-1 hover:text-amber-400 transition-colors leading-snug">
                        <Link href={`/blog/${art.slug}`}>{art.title}</Link>
                      </h4>
                    </div>
                  ))
                )}
              </div>
            )}
          </div>

        </div>
      </section>

      {/* 3. Visual Gallery (Minimalist Grid Layout) */}
      <section className="max-w-6xl mx-auto px-6 py-20 border-t border-emerald-950/40 w-full">
        <div className="flex justify-between items-end mb-8">
          <h2 className="text-xs font-bold tracking-widest text-emerald-500 uppercase">
            Visual Gallery
          </h2>
          <Link href="/gallery" className="text-xs font-bold text-amber-400 hover:underline">View All &rarr;</Link>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {loading ? (
            <div className="col-span-4 py-10 flex justify-center">
              <Loader2 className="h-8 w-8 text-amber-400 animate-spin" />
            </div>
          ) : gallery.length === 0 ? (
             <div className="col-span-4 text-center py-10 text-neutral-500 text-sm">No images uploaded yet.</div>
          ) : gallery.slice(0, 4).map((item, idx) => (
            <div key={idx} className="group aspect-[3/4] relative overflow-hidden rounded-xl border border-emerald-950/40">
              <img src={item.imageUrl} alt={item.title} className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent flex flex-col justify-end p-4 opacity-80 group-hover:opacity-100 transition-opacity">
                <span className="text-[10px] text-amber-500 font-bold block mb-1">0{idx + 1}</span>
                <h3 className="text-sm font-bold text-white tracking-tight leading-snug">{item.title}</h3>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 4. Events timeline (Clean lists) */}
      <section className="max-w-6xl mx-auto px-6 py-20 border-t border-emerald-950/40 w-full grid grid-cols-1 md:grid-cols-2 gap-12">
        <div className="space-y-6">
          <div className="flex justify-between items-center border-b border-emerald-950/40 pb-2">
            <h3 className="text-xs font-bold tracking-widest text-amber-500 uppercase">Upcoming Events</h3>
            <Link href="/events" className="text-[10px] font-bold text-emerald-300 hover:underline">VIEW ALL</Link>
          </div>
          <div className="space-y-4">
            {loading ? (
              <Loader2 className="h-4 w-4 animate-spin text-amber-500" />
            ) : upcomingEvents.length === 0 ? (
              <p className="text-neutral-500 text-sm">No upcoming events.</p>
            ) : upcomingEvents.map((e, idx) => (
              <div key={idx} className="flex gap-4 items-center py-2 border-b border-emerald-950/20">
                <span className="font-mono text-sm text-neutral-400 uppercase w-24 flex-shrink-0">{new Date(e.date).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}</span>
                <span className="font-semibold text-white text-sm leading-snug hover:text-amber-400 transition-colors cursor-pointer"><Link href="/events">{e.title}</Link></span>
              </div>
            ))}
          </div>
        </div>
        <div className="space-y-6">
          <div className="flex justify-between items-center border-b border-emerald-950/40 pb-2">
            <h3 className="text-xs font-bold tracking-widest text-emerald-500 uppercase">Past Events</h3>
          </div>
          <div className="space-y-4">
            {loading ? (
              <Loader2 className="h-4 w-4 animate-spin text-amber-500" />
            ) : pastEvents.length === 0 ? (
              <p className="text-neutral-500 text-sm">No past events.</p>
            ) : pastEvents.map((e, idx) => (
              <div key={idx} className="flex gap-4 items-center py-2 border-b border-emerald-950/20 opacity-60 hover:opacity-100 transition-opacity">
                <span className="font-mono text-sm text-neutral-400 uppercase w-24 flex-shrink-0">{new Date(e.date).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}</span>
                <span className="font-semibold text-white text-sm leading-snug hover:text-amber-400 transition-colors cursor-pointer"><Link href="/events">{e.title}</Link></span>
              </div>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
}
