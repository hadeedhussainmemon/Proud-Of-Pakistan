"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { animate, stagger } from "animejs";
import { 
  Search, ArrowRight, Award, Compass, Landmark, Briefcase, 
  User, CheckCircle, Sparkles, MapPin, Play, Star, Heart, Share2, Mail 
} from "lucide-react";

export default function Home() {
  const heroRef = useRef<HTMLDivElement>(null);
  const searchRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    // Reveal hero content
    animate(".hero-reveal", {
      translateY: [40, 0],
      opacity: [0, 1],
      delay: stagger(100),
      duration: 1000,
      ease: "outExpo"
    });
    
    // Animate stats numbers
    animate(".stat-num", {
      innerHTML: [0, 100],
      round: 1,
      easing: "easeInOutExpo",
      duration: 2000
    });
  }, []);

  const provinces = [
    { name: "Punjab", capital: "Lahore", bg: "from-emerald-500/20 to-emerald-700/20", img: "🕌" },
    { name: "Sindh", capital: "Karachi", bg: "from-blue-500/20 to-indigo-700/20", img: "🌊" },
    { name: "Khyber Pakhtunkhwa", capital: "Peshawar", bg: "from-teal-500/20 to-teal-700/20", img: "🏔️" },
    { name: "Balochistan", capital: "Quetta", bg: "from-amber-500/20 to-orange-700/20", img: "🏜️" },
    { name: "Gilgit-Baltistan", capital: "Gilgit", bg: "from-cyan-500/20 to-blue-700/20", img: "🏔️" },
    { name: "Azad Jammu & Kashmir", capital: "Muzaffarabad", bg: "from-rose-500/20 to-red-700/20", img: "🏞️" },
  ];

  return (
    <div className="flex flex-col w-full min-h-screen text-white bg-emerald-990 overflow-hidden">
      
      {/* 1. Announcement Bar */}
      <div className="bg-gradient-to-r from-emerald-950 via-emerald-800 to-emerald-950 py-3 text-center text-xs font-semibold tracking-wider text-amber-400 border-b border-emerald-500/10">
        🚀 SPOTLIGHT: Celebrating Pakistan's newest technology champions & mountaineering pioneers. 
        <Link href="/personalities" className="underline ml-2 hover:text-white transition-colors">Learn More &rarr;</Link>
      </div>

      {/* 2. Hero Section */}
      <div ref={heroRef} className="relative py-24 px-6 md:px-12 max-w-7xl mx-auto text-center flex flex-col items-center">
        {/* Glow effects */}
        <div className="absolute top-10 left-1/3 w-72 h-72 bg-emerald-500/10 rounded-full blur-3xl -z-10" />
        <div className="absolute top-20 right-1/3 w-72 h-72 bg-amber-500/10 rounded-full blur-3xl -z-10" />

        <div className="hero-reveal inline-flex items-center gap-2 rounded-full border border-emerald-500/20 bg-emerald-950/40 px-4 py-1.5 text-xs text-emerald-300 mb-8 font-medium">
          <Sparkles className="h-4 w-4 text-amber-400" />
          <span>CELEBRATING HERITAGE, TRAILBLAZERS & PROGRESS</span>
        </div>

        <h1 className="hero-reveal text-5xl md:text-7xl font-display font-extrabold tracking-tight mb-8 leading-[1.1]">
          The Prestigious Directory of <br />
          <span className="bg-gradient-to-r from-emerald-400 via-amber-300 to-emerald-400 bg-clip-text text-transparent">
            Pakistan's Finest
          </span>
        </h1>

        <p className="hero-reveal text-lg md:text-xl text-emerald-100/70 max-w-2xl mx-auto mb-10 leading-relaxed font-sans">
          A premium digital archive spotlighting outstanding personalities, landmark historical milestones, breathtaking destinations, and innovative local brands.
        </p>

        <div className="hero-reveal flex flex-wrap gap-4 justify-center">
          <Link href="/personalities" className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-amber-400 text-emerald-950 font-bold hover:bg-amber-300 transition-all shadow-lg hover:shadow-amber-400/20">
            Explore Hall of Fame
            <ArrowRight className="h-4 w-4" />
          </Link>
          <Link href="/about" className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 transition-all font-semibold">
            About Project
          </Link>
        </div>
      </div>

      {/* 3. Search Pakistan */}
      <div ref={searchRef} className="max-w-3xl w-full mx-auto px-6 mb-24">
        <div className="relative p-2 rounded-2xl bg-emerald-950/40 border border-emerald-500/20 backdrop-blur-xl shadow-2xl flex items-center">
          <Search className="h-6 w-6 text-emerald-300/60 ml-4" />
          <input
            type="text"
            placeholder="Search personalities, startups, historic landmarks, or tourism gems..."
            className="w-full bg-transparent border-0 outline-none text-white placeholder-emerald-100/40 px-4 py-3 text-base focus:ring-0"
          />
          <button className="px-6 py-3 bg-emerald-500 hover:bg-emerald-400 text-emerald-950 font-bold rounded-xl transition-all shadow">
            Search
          </button>
        </div>
      </div>

      {/* 4. Featured Personality Spotlight */}
      <div className="max-w-7xl mx-auto px-6 mb-28 w-full">
        <div className="text-xs font-bold uppercase tracking-widest text-emerald-400 mb-4 flex items-center gap-2">
          <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
          <span>Editorial Spotlight</span>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-emerald-950/20 border border-emerald-500/10 rounded-3xl p-8 lg:p-12 backdrop-blur-md">
          {/* Avatar Area */}
          <div className="lg:col-span-4 aspect-square rounded-2xl bg-gradient-to-tr from-emerald-900 to-emerald-950 border border-emerald-500/20 flex flex-col items-center justify-center p-8 text-center text-emerald-100/20 relative overflow-hidden">
            <User className="h-28 w-28 text-emerald-400/80 mb-4" />
            <span className="absolute bottom-4 bg-black/40 backdrop-blur px-3 py-1 rounded-full text-xs font-semibold text-amber-400 border border-white/10">
              PHYSICS & SCIENCE
            </span>
          </div>
          {/* Info Details */}
          <div className="lg:col-span-8 space-y-6">
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold tracking-wider text-amber-400 px-2 py-0.5 border border-amber-400/30 rounded bg-amber-400/5">
                NOBEL LAUREATE
              </span>
              <span className="flex items-center gap-1 text-emerald-300 text-xs font-semibold">
                <CheckCircle className="h-4 w-4 text-emerald-400 fill-emerald-950" /> Verified Profile
              </span>
            </div>
            <h2 className="text-3xl lg:text-4xl font-display font-extrabold">Dr. Abdus Salam</h2>
            <p className="text-emerald-100/70 text-base leading-relaxed">
              Dr. Abdus Salam was a Pakistani theoretical physicist who shared the 1979 Nobel Prize in Physics with Sheldon Glashow and Steven Weinberg for his contribution to the electroweak unification theory.
            </p>
            <div className="flex flex-wrap gap-6 pt-4 border-t border-emerald-500/10">
              <div>
                <span className="block text-xs text-emerald-100/50 uppercase">Born</span>
                <span className="font-semibold text-white">Jhang, Punjab (1926)</span>
              </div>
              <div>
                <span className="block text-xs text-emerald-100/50 uppercase">Alma Mater</span>
                <span className="font-semibold text-white">Punjab University, Cambridge</span>
              </div>
            </div>
            <div className="pt-4">
              <Link href="/personalities/abdus-salam" className="inline-flex items-center gap-2 text-sm font-bold text-amber-400 hover:text-amber-300">
                Read Biography & Timeline &rarr;
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* 5. Trending Success Stories */}
      <div className="max-w-7xl mx-auto px-6 mb-28 w-full">
        <h2 className="text-3xl font-display font-bold mb-8">Trending Success Stories</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { tag: "TECH INNOVATION", title: "How Pak-based IT Hubs are Dominating Global Freelance Tech Exports.", icon: Award },
            { tag: "SPORTS GLORY", title: "Arshad Nadeem: The Historic Javelin Gold Thrower Who Inspired a Nation.", icon: CheckCircle },
            { tag: "CLIMATE ACTION", title: "Restoring the Delta: The Mangrove Planting Success Stories of Sindh Coastline.", icon: Compass }
          ].map((item, idx) => {
            const Icon = item.icon;
            return (
              <div key={idx} className="p-6 rounded-2xl bg-emerald-950/15 border border-emerald-500/5 hover:border-emerald-500/20 transition-all">
                <span className="text-xs font-bold text-amber-400 tracking-wider block mb-3">{item.tag}</span>
                <h3 className="text-lg font-bold text-white mb-6 leading-snug">{item.title}</h3>
                <Link href="/categories" className="text-xs font-semibold text-emerald-400 hover:underline flex items-center gap-1">
                  Read Interview &rarr;
                </Link>
              </div>
            );
          })}
        </div>
      </div>

      {/* 6. Explore Provinces */}
      <div className="max-w-7xl mx-auto px-6 mb-28 w-full">
        <h2 className="text-3xl font-display font-bold mb-2">Explore Provinces & Territories</h2>
        <p className="text-sm text-emerald-100/60 mb-8">Embark on journeys across Pakistan's diverse federal landscapes.</p>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
          {provinces.map((prov, idx) => (
            <div key={idx} className={`p-6 rounded-2xl bg-gradient-to-b ${prov.bg} border border-white/5 hover:border-white/10 transition-all text-center flex flex-col items-center justify-center cursor-pointer hover:-translate-y-1`}>
              <span className="text-3xl mb-3 block">{prov.img}</span>
              <h3 className="font-display font-bold text-base text-white">{prov.name}</h3>
              <span className="text-xs text-emerald-100/40 mt-1">{prov.capital}</span>
            </div>
          ))}
        </div>
      </div>

      {/* 7. Featured Businesses */}
      <div className="max-w-7xl mx-auto px-6 mb-28 w-full">
        <h2 className="text-3xl font-display font-bold mb-8">Featured Local Enterprises & Brands</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { name: "Systems Limited", cat: "IT Solutions", desc: "Pakistan's leading global technology company driving software exports." },
            { name: "National Foods", cat: "Food Processing", desc: "A premium packaged food brand bringing traditional Pakistani cuisine globally." },
            { name: "Habib Bank Limited", cat: "Financial Sector", desc: "The country's largest commercial financial institution supporting GDP." }
          ].map((b, idx) => (
            <div key={idx} className="p-6 rounded-2xl bg-emerald-950/20 border border-emerald-500/10 hover:border-emerald-500/20 transition-all">
              <div className="flex items-center gap-3 mb-4">
                <span className="p-2 bg-emerald-500/10 rounded-lg text-emerald-400">
                  <Briefcase className="h-5 w-5" />
                </span>
                <div>
                  <h3 className="font-bold text-white text-lg">{b.name}</h3>
                  <span className="text-xs text-amber-400 font-semibold">{b.cat}</span>
                </div>
              </div>
              <p className="text-emerald-100/60 text-sm leading-relaxed mb-4">{b.desc}</p>
              <Link href="/businesses" className="text-xs font-bold text-emerald-300 hover:text-white">
                View Profile Directory &rarr;
              </Link>
            </div>
          ))}
        </div>
      </div>

      {/* 8. Latest Articles */}
      <div className="max-w-7xl mx-auto px-6 mb-28 w-full">
        <h2 className="text-3xl font-display font-bold mb-8">Latest Editorial Analysis</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {[
            { title: "Indus Valley Architecture: Unearthing 5,000 Years of Sewerage & Grid Infrastructure.", date: "July 2026", author: "Dr. Ayesha Malik" },
            { title: "The Digitization Paradigm: Pakistan's E-Commerce Startups Reaching Series A Funding.", date: "June 2026", author: "Kamran Qureshi" }
          ].map((art, idx) => (
            <div key={idx} className="p-8 rounded-3xl bg-emerald-950/10 border border-emerald-500/10 hover:border-emerald-500/20 transition-all flex flex-col justify-between">
              <div>
                <span className="text-xs text-amber-400 font-bold block mb-2">{art.date}</span>
                <h3 className="text-xl font-bold text-white mb-4 leading-snug">{art.title}</h3>
              </div>
              <div className="flex justify-between items-center border-t border-emerald-500/10 pt-4">
                <span className="text-xs text-emerald-100/50">By {art.author}</span>
                <span className="text-xs font-semibold text-emerald-300 hover:text-white">Read Article &rarr;</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 9. Travel Destinations */}
      <div className="max-w-7xl mx-auto px-6 mb-28 w-full">
        <h2 className="text-3xl font-display font-bold mb-8">Breathtaking Destinations</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { name: "K2 Mountain Peak", peak: "8,611m", tag: "Gilgit-Baltistan" },
            { name: "Lake Saif-ul-Mulook", peak: "Alps Valley", tag: "Kaghan Valley" },
            { name: "Derawar Fort", peak: "Cholistan Desert", tag: "Bahawalpur" }
          ].map((dest, idx) => (
            <div key={idx} className="group rounded-2xl overflow-hidden border border-emerald-500/10 bg-emerald-950/20 hover:border-emerald-500/30 transition-all">
              <div className="h-44 bg-gradient-to-tr from-emerald-900 to-emerald-950 flex items-center justify-center text-emerald-300/40 relative">
                <Compass className="h-10 w-10 group-hover:scale-110 transition-transform duration-300" />
                <span className="absolute top-3 left-3 bg-black/40 backdrop-blur px-2.5 py-0.5 rounded text-xs text-amber-400 font-semibold border border-white/10">
                  {dest.tag}
                </span>
              </div>
              <div className="p-6">
                <h3 className="font-display font-bold text-xl text-white mb-2">{dest.name}</h3>
                <p className="text-emerald-100/60 text-sm mb-4">Discover climbing trails, travel guides, and historic backgrounds.</p>
                <Link href="/tourism" className="text-xs font-bold text-amber-400 hover:underline">
                  View Guide &rarr;
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 10. Pakistan Timeline */}
      <div className="max-w-7xl mx-auto px-6 mb-28 w-full">
        <div className="bg-gradient-to-b from-emerald-950/40 to-emerald-990/60 border border-emerald-500/10 rounded-3xl p-8 lg:p-12">
          <h2 className="text-3xl font-display font-extrabold mb-4 text-center">Journey Across Time</h2>
          <p className="text-center text-emerald-100/60 text-sm max-w-xl mx-auto mb-10">A historic roadmap detailing the rise of Pakistan from pre-ancient civilizations to digital sovereignty.</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative">
            {[
              { year: "3300 BCE", title: "Indus Valley Civilization", desc: "Architectural wonders and cities of Mohenjo-daro & Harappa." },
              { year: "1947 CE", title: "National Independence", desc: "The birth of Pakistan as a sovereign republic state." },
              { year: "2026 CE", title: "Modern Technology Era", desc: "Rise of tech incubation hubs, digital freelancers, and international exports." }
            ].map((ev, idx) => (
              <div key={idx} className="p-6 rounded-2xl bg-emerald-950/30 border border-white/5 relative">
                <span className="absolute -top-3 left-6 px-3 py-0.5 bg-amber-400 text-emerald-950 font-bold text-xs rounded-full">
                  {ev.year}
                </span>
                <h3 className="font-bold text-lg text-white mb-2 mt-2">{ev.title}</h3>
                <p className="text-emerald-100/60 text-xs leading-relaxed">{ev.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 11. Today's Pakistan Fact */}
      <div className="max-w-3xl mx-auto px-6 mb-28 w-full text-center">
        <div className="p-8 rounded-2xl bg-amber-400/5 border border-amber-400/20 backdrop-blur-md">
          <span className="text-amber-400 text-xs font-bold uppercase tracking-wider block mb-2">Did You Know?</span>
          <p className="text-xl font-display font-medium text-white mb-4 italic">
            "Pakistan is home to the world's highest paved international road: the Karakoram Highway (KKH), often referred to as the Eighth Wonder of the World."
          </p>
          <span className="text-xs text-emerald-300 font-semibold">Fact Check Source: National Geographic & Tourism archives</span>
        </div>
      </div>

      {/* 12. Featured Videos */}
      <div className="max-w-7xl mx-auto px-6 mb-28 w-full">
        <h2 className="text-3xl font-display font-bold mb-8">Featured Cultural Reels</h2>
        <div className="aspect-video w-full max-w-5xl mx-auto rounded-3xl bg-gradient-to-tr from-emerald-950 to-emerald-900 border border-emerald-500/20 flex flex-col items-center justify-center p-8 text-center text-emerald-100/20 relative overflow-hidden group cursor-pointer">
          <span className="p-5 bg-amber-400 text-emerald-950 rounded-full group-hover:scale-110 transition-transform shadow-lg shadow-amber-400/20">
            <Play className="h-8 w-8 fill-emerald-950" />
          </span>
          <span className="mt-4 font-display font-bold text-white tracking-wide text-lg">
            Watch: The Majestic Landscapes of Hunza & Skardu Valleys (4K)
          </span>
        </div>
      </div>

      {/* 13. Instagram Feed Mock */}
      <div className="max-w-7xl mx-auto px-6 mb-28 w-full">
        <h2 className="text-3xl font-display font-bold mb-2">Captured Moments</h2>
        <p className="text-sm text-emerald-100/60 mb-8">Scenic captures of cultural festivals and mountain landscapes shared by local contributors.</p>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {[
            { desc: "Badshahi Mosque, Lahore", count: "1.2K Likes" },
            { desc: "Karakoram Highway View", count: "2.4K Likes" },
            { desc: "Traditional Sindhi Ajrak Craft", count: "920 Likes" },
            { desc: "Passu Cones Golden Hour", count: "3K Likes" }
          ].map((item, idx) => (
            <div key={idx} className="group aspect-square bg-emerald-950/20 border border-emerald-500/10 rounded-2xl relative overflow-hidden flex flex-col justify-end p-4 cursor-pointer hover:border-emerald-500/30 transition-all">
              <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-tr from-emerald-900/60 to-emerald-950/80 text-emerald-300/20 group-hover:scale-105 transition-transform duration-300">
                📷
              </div>
              <div className="relative z-10 bg-black/40 backdrop-blur-md p-3 rounded-lg border border-white/5">
                <span className="block text-xs font-bold text-white">{item.desc}</span>
                <span className="text-[10px] text-amber-400 font-semibold mt-0.5 block">{item.count}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 14. Newsletter Signup */}
      <div className="max-w-4xl mx-auto px-6 mb-28 w-full text-center">
        <div className="p-8 lg:p-12 bg-gradient-to-b from-emerald-950/30 to-emerald-990/60 border border-emerald-500/10 rounded-3xl backdrop-blur-md">
          <Mail className="h-10 w-10 text-amber-400 mx-auto mb-4" />
          <h2 className="text-3xl font-display font-bold text-white mb-2">Subscribe to Hall of Fame Digests</h2>
          <p className="text-sm text-emerald-100/60 max-w-md mx-auto mb-8">
            Receive monthly updates on newly verified personalities, national achievements, and travel itineraries.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email address"
              className="w-full bg-emerald-990/60 border border-emerald-500/20 rounded-lg px-4 py-2.5 text-sm text-white placeholder-emerald-100/30 focus:outline-none focus:border-amber-400"
            />
            <button className="px-6 py-2.5 bg-amber-400 hover:bg-amber-300 text-emerald-950 font-bold rounded-lg transition-all text-sm whitespace-nowrap">
              Subscribe
            </button>
          </div>
        </div>
      </div>

    </div>
  );
}
