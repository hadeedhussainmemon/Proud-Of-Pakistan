"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { animate, stagger } from "animejs";
import { 
  Search, ArrowRight, Award, Compass, Landmark, Briefcase, 
  User, CheckCircle, Sparkles, MapPin, Play, Star, Mail, Loader2
} from "lucide-react";

interface Personality {
  name: string;
  category: string;
  biography: string;
  slug: string;
  achievements?: string[];
  featured?: boolean;
}

interface Article {
  title: string;
  subtitle?: string;
  slug: string;
  category: string;
  publishedAt: string;
}

export default function Home() {
  const heroRef = useRef<HTMLDivElement>(null);
  const searchRef = useRef<HTMLDivElement>(null);

  const [personalities, setPersonalities] = useState<Personality[]>([]);
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    animate(".hero-reveal", {
      translateY: [40, 0],
      opacity: [0, 1],
      delay: stagger(100),
      duration: 1000,
      ease: "outExpo"
    });

    Promise.all([
      fetch("/api/personalities").then(r => r.json()),
      fetch("/api/articles").then(r => r.json())
    ])
      .then(([persData, artData]) => {
        if (Array.isArray(persData)) setPersonalities(persData);
        if (Array.isArray(artData)) setArticles(artData);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to fetch homepage data", err);
        setLoading(false);
      });
  }, []);

  return (
    <div className="flex flex-col w-full min-h-screen text-white bg-emerald-990 overflow-hidden">
      
      {/* Hero Section */}
      <div ref={heroRef} className="relative py-24 px-6 md:px-12 max-w-7xl mx-auto text-center flex flex-col items-center">
        <div className="absolute top-10 left-1/3 w-72 h-72 bg-emerald-500/10 rounded-full blur-3xl -z-10" />
        <div className="absolute top-20 right-1/3 w-72 h-72 bg-amber-500/10 rounded-full blur-3xl -z-10" />

        <div className="hero-reveal inline-flex items-center gap-2 rounded-full border border-emerald-500/20 bg-emerald-950/40 px-4 py-1.5 text-xs text-emerald-300 mb-8 font-medium">
          <Sparkles className="h-4 w-4 text-amber-400" />
          <span>NATIONAL HONOR & EXCELLENCE</span>
        </div>

        <h1 className="hero-reveal text-4xl md:text-6xl font-display font-extrabold tracking-tight mb-8 leading-[1.1] max-w-4xl">
          Proud of Pakistan – A Symbol of <br />
          <span className="bg-gradient-to-r from-emerald-400 via-amber-300 to-emerald-400 bg-clip-text text-transparent">
            National Honor, Excellence, and Inspiration
          </span>
        </h1>
      </div>

      {/* Primary Narrative Text */}
      <div className="max-w-4xl mx-auto px-6 mb-24 space-y-6 text-emerald-100/80 leading-relaxed text-base text-justify">
        <p>
          &quot;Proud of Pakistan&quot; is not merely a title or an award; it is a prestigious recognition dedicated to individuals whose character, commitment, achievements, and selfless service have brought honor and pride to Pakistan. It is a tribute to those who have made a meaningful impact on society through their talent, integrity, hard work, and unwavering dedication.
        </p>
        <p>
          A true Proud of Pakistan is not defined by fame alone, but by the positive difference they create in the lives of others. These are individuals who place the interests of their nation above personal gain, inspire future generations, and contribute to the progress and prosperity of Pakistan through their actions.
        </p>
        <p>
          The title &quot;Proud of Pakistan&quot; is reserved for exceptional individuals who have demonstrated excellence in diverse fields, including education, healthcare, science, technology, sports, literature, journalism, arts and culture, social welfare, entrepreneurship, public service, law, research, environmental protection, humanitarian work, and national defense. Through their remarkable contributions, they showcase the immense talent, resilience, and potential of Pakistan on both national and international platforms.
        </p>
        <p>
          This recognition also honors young achievers, women, men, and senior citizens who, despite limited resources and countless challenges, have pursued their dreams with determination, perseverance, and integrity. Whether they have represented Pakistan internationally, served their communities quietly, or transformed lives through their dedication, they embody the true spirit of patriotism and excellence.
        </p>
        <p>
          The purpose of Proud of Pakistan is not only to celebrate extraordinary accomplishments but also to inspire future generations. It seeks to encourage young people to believe that with honesty, discipline, hard work, and commitment, every citizen has the potential to become a source of pride for the nation.
        </p>
        <p>
          Every individual who uses their knowledge, skills, and abilities to serve humanity, strengthen society, and elevate the image of Pakistan deserves to be recognized as a Proud of Pakistan. Such individuals become symbols of hope, leadership, and inspiration, motivating others to contribute positively toward national development.
        </p>
        <p>
          Ultimately, Proud of Pakistan is a celebration of those remarkable people whose lives reflect excellence, compassion, responsibility, and patriotism. They remind us that a strong, progressive, and respected Pakistan is built not only by institutions but by honorable citizens whose actions inspire change and whose achievements bring dignity to the nation.
        </p>
        <p className="font-semibold text-amber-400 text-center text-lg mt-8">
          The true pride of Pakistan lies in those who place their country, their people, and humanity above personal success. They are the real &quot;Proud of Pakistan,&quot; and they represent the hope, strength, and bright future of our nation.
        </p>
      </div>

      {/* Global Search Bar */}
      <div ref={searchRef} className="max-w-3xl w-full mx-auto px-6 mb-24">
        <div className="relative p-2 rounded-2xl bg-emerald-950/40 border border-emerald-500/20 backdrop-blur-xl shadow-2xl flex items-center">
          <Search className="h-6 w-6 text-emerald-300/60 ml-4" />
          <input
            type="text"
            placeholder="Search verified personalities, events, and news articles..."
            className="w-full bg-transparent border-0 outline-none text-white placeholder-emerald-100/40 px-4 py-3 text-base focus:ring-0"
          />
        </div>
      </div>

      {loading ? (
        <div className="flex justify-center py-20">
          <Loader2 className="h-10 w-10 text-amber-400 animate-spin" />
        </div>
      ) : (
        <>
          {/* Profile Features Showcase */}
          <div className="max-w-7xl mx-auto px-6 mb-28 w-full">
            <h2 className="text-3xl font-display font-bold mb-8">Profile Features</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {personalities.slice(0, 3).map((p, idx) => (
                <div key={idx} className="p-6 rounded-2xl bg-emerald-950/15 border border-emerald-500/10 hover:border-emerald-500/20 transition-all flex flex-col justify-between">
                  <div>
                    <span className="text-xs font-bold text-amber-400 tracking-wider uppercase mb-2 block">{p.category}</span>
                    <h3 className="text-xl font-bold text-white mb-3">{p.name}</h3>
                    <p className="text-emerald-100/65 text-sm leading-relaxed line-clamp-3">{p.biography}</p>
                  </div>
                  <Link href={`/personalities/${p.slug}`} className="text-xs font-bold text-emerald-300 hover:text-white mt-4 block self-start">
                    Read Profile Detail &rarr;
                  </Link>
                </div>
              ))}
            </div>
          </div>

          {/* News Section */}
          <div className="max-w-7xl mx-auto px-6 mb-28 w-full">
            <h2 className="text-3xl font-display font-bold mb-8">Featured News</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {articles.slice(0, 2).map((art, idx) => (
                <div key={idx} className="p-8 rounded-3xl bg-emerald-950/10 border border-emerald-500/10 hover:border-emerald-500/20 transition-all flex flex-col justify-between">
                  <div>
                    <h3 className="text-xl font-bold text-white mb-2 leading-snug">{art.title}</h3>
                    <p className="text-emerald-100/60 text-sm mb-6 line-clamp-2">{art.subtitle}</p>
                  </div>
                  <div className="flex justify-between items-center border-t border-emerald-500/10 pt-4">
                    <span className="text-xs text-emerald-100/50">Latest Update</span>
                    <Link href={`/blog/${art.slug}`} className="text-xs font-semibold text-emerald-300 hover:text-white">
                      Read Article &rarr;
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </>
      )}

      {/* Gallery Section */}
      <div className="max-w-7xl mx-auto px-6 mb-28 w-full">
        <h2 className="text-3xl font-display font-bold mb-8">Visual Gallery</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {[
            { desc: "Badshahi Mosque Heritage", count: "1.2K Likes" },
            { desc: "Passu Cones Golden Hour", count: "3K Likes" },
            { desc: "Hunza Valley Autumn", count: "2.4K Likes" },
            { desc: "Karachi Coastline Dusk", count: "920 Likes" }
          ].map((item, idx) => (
            <div key={idx} className="group aspect-square bg-emerald-950/20 border border-emerald-500/10 rounded-2xl relative overflow-hidden flex flex-col justify-end p-4 cursor-pointer hover:border-emerald-500/30 transition-all">
              <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-tr from-emerald-900/60 to-emerald-950/80 text-emerald-300/20 group-hover:scale-105 transition-transform duration-300">
                📷
              </div>
              <div className="relative z-10 bg-black/40 backdrop-blur-md p-3 rounded-lg border border-white/5">
                <span className="block text-xs font-bold text-white">{item.desc}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Events Section (Upcoming & Past) */}
      <div className="max-w-7xl mx-auto px-6 mb-28 w-full grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <h2 className="text-2xl font-display font-bold mb-6 text-amber-400">Upcoming Events</h2>
          <div className="space-y-4">
            <div className="p-4 rounded-xl border border-emerald-500/10 bg-emerald-950/20">
              <span className="text-xs text-amber-400 font-bold">AUGUST 14, 2026</span>
              <h3 className="font-bold text-white mt-1">79th Independence Day Celebration & Award Ceremony</h3>
            </div>
            <div className="p-4 rounded-xl border border-emerald-500/10 bg-emerald-950/20">
              <span className="text-xs text-amber-400 font-bold">OCTOBER 10, 2026</span>
              <h3 className="font-bold text-white mt-1">Annual Young Achievers & Pioneers Roundtable</h3>
            </div>
          </div>
        </div>
        <div>
          <h2 className="text-2xl font-display font-bold mb-6 text-emerald-300">Past Events</h2>
          <div className="space-y-4">
            <div className="p-4 rounded-xl border border-emerald-500/10 bg-emerald-950/20 opacity-70">
              <span className="text-xs text-emerald-400 font-bold">MARCH 23, 2026</span>
              <h3 className="font-bold text-white mt-1">Pakistan Day Commemoration & Heritage Exhibition</h3>
            </div>
            <div className="p-4 rounded-xl border border-emerald-500/10 bg-emerald-950/20 opacity-70">
              <span className="text-xs text-emerald-400 font-bold">JANUARY 05, 2026</span>
              <h3 className="font-bold text-white mt-1">Winter Sports Awards & Mountaineering Honors</h3>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
}
