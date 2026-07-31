"use client";

export const dynamic = "force-dynamic";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Search, Loader2, Globe, Mail, Share2, PlusCircle, User } from "lucide-react";

interface SocialLinks {
  linkedin?: string;
  twitter?: string;
  facebook?: string;
  instagram?: string;
  contact?: string;
}

interface Personality {
  name: string;
  category: string;
  biography: string;
  profilePicture?: string;
  socialLinks?: SocialLinks;
  website?: string;
  slug: string;
}

export default function PersonalitiesPage() {
  const [personalities, setPersonalities] = useState<Personality[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [activeFilter, setActiveFilter] = useState("All");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/personalities")
      .then((res) => { if (!res.ok) return null; return res.json(); })
      .then((data) => {
        if (Array.isArray(data)) setPersonalities(data);
        setLoading(false);
      })
      .catch((err) => { console.error(err); setLoading(false); });
  }, []);

  const categories = ["All", ...Array.from(new Set(personalities.map((p) => p.category)))];

  const filteredList = personalities.filter((p) => {
    const matchesSearch = p.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = activeFilter === "All" || p.category.toLowerCase() === activeFilter.toLowerCase();
    return matchesSearch && matchesFilter;
  });

  const handleShare = async (slug: string) => {
    const url = `${window.location.origin}/personalities/${slug}`;
    if (navigator.share) {
      try {
        await navigator.share({ title: 'View Profile', url });
      } catch (err) {}
    } else {
      navigator.clipboard.writeText(url);
      alert("Profile link copied to clipboard!");
    }
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="flex flex-col md:flex-row justify-between items-center mb-12 gap-6">
        <div className="max-w-2xl">
          <h1 className="text-4xl font-display font-extrabold tracking-tight text-white mb-4">
            Profile Features
          </h1>
          <p className="text-emerald-100/60 text-sm">
            Discover the legendary visionaries, entrepreneurs, and leaders of Pakistan.
          </p>
        </div>
        <Link 
          href="/personalities/submit"
          className="flex items-center gap-2 bg-amber-400 hover:bg-amber-300 text-emerald-950 px-5 py-3 rounded-xl font-bold transition-all shrink-0"
        >
          <PlusCircle className="h-5 w-5" />
          Get Featured
        </Link>
      </div>

      {/* Filters & Search */}
      <div className="flex flex-col md:flex-row gap-4 justify-between items-center mb-12 bg-emerald-950/20 p-4 border border-emerald-950/30 rounded-xl">
        <div className="relative w-full md:w-80">
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-emerald-100/40" />
          <input
            type="text"
            placeholder="Search profiles..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-emerald-990/60 border border-emerald-950/50 rounded-lg py-2 pl-10 pr-4 text-sm text-white placeholder-emerald-100/30 focus:outline-none focus:border-amber-400"
          />
        </div>
        <div className="flex gap-2 flex-wrap">
          {categories.map((filter) => (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={`px-4 py-2 rounded-lg text-xs font-semibold transition-all ${
                activeFilter === filter
                  ? "bg-amber-400 text-emerald-950"
                  : "bg-emerald-950/40 text-emerald-100/70 hover:bg-emerald-950/70"
              }`}
            >
              {filter}
            </button>
          ))}
        </div>
      </div>

      {loading ? (
        <div className="flex justify-center py-20">
          <Loader2 className="h-10 w-10 text-amber-400 animate-spin" />
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredList.length === 0 ? (
            <div className="col-span-full text-center text-neutral-500 text-sm py-12">
              No profiles found matching search criteria.
            </div>
          ) : (
            filteredList.map((p, idx) => (
              <div
                key={idx}
                className="bg-[#0a120e] rounded-3xl overflow-hidden border border-emerald-900/40 hover:border-amber-400/50 transition-all duration-300 flex flex-col group"
              >
                {/* Top Image Section */}
                <div className="h-64 w-full bg-emerald-950/40 relative overflow-hidden flex items-center justify-center">
                  {p.profilePicture ? (
                    <img src={p.profilePicture} alt={p.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  ) : (
                    <User className="h-20 w-20 text-emerald-900/50" />
                  )}
                  <div className="absolute top-4 left-4 bg-black/60 backdrop-blur-md px-3 py-1 rounded-full text-xs font-bold text-amber-400 border border-white/10">
                    {p.category}
                  </div>
                </div>

                {/* Bottom Details Section */}
                <div className="p-6 flex flex-col flex-grow">
                  <h2 className="text-2xl font-display font-bold text-white mb-2">{p.name}</h2>
                  <p className="text-emerald-100/60 text-sm mb-6 line-clamp-2">{p.biography}</p>
                  
                  {/* Social Icons row */}
                  <div className="flex flex-wrap items-center gap-2 mb-6">
                    {p.socialLinks?.linkedin && <a href={p.socialLinks.linkedin} target="_blank" rel="noreferrer" className="text-[10px] uppercase font-bold px-2 py-1 bg-emerald-950/60 rounded text-emerald-400 hover:text-amber-400 border border-emerald-500/20">LinkedIn</a>}
                    {p.socialLinks?.twitter && <a href={p.socialLinks.twitter} target="_blank" rel="noreferrer" className="text-[10px] uppercase font-bold px-2 py-1 bg-emerald-950/60 rounded text-emerald-400 hover:text-amber-400 border border-emerald-500/20">Twitter</a>}
                    {p.socialLinks?.instagram && <a href={p.socialLinks.instagram} target="_blank" rel="noreferrer" className="text-[10px] uppercase font-bold px-2 py-1 bg-emerald-950/60 rounded text-emerald-400 hover:text-amber-400 border border-emerald-500/20">Instagram</a>}
                    {p.socialLinks?.facebook && <a href={p.socialLinks.facebook} target="_blank" rel="noreferrer" className="text-[10px] uppercase font-bold px-2 py-1 bg-emerald-950/60 rounded text-emerald-400 hover:text-amber-400 border border-emerald-500/20">Facebook</a>}
                    {p.website && <a href={p.website} target="_blank" rel="noreferrer" className="flex items-center gap-1 text-[10px] uppercase font-bold px-2 py-1 bg-emerald-950/60 rounded text-emerald-400 hover:text-amber-400 border border-emerald-500/20"><Globe className="h-3 w-3" /> Web</a>}
                    {p.socialLinks?.contact && <a href={`mailto:${p.socialLinks.contact}`} className="flex items-center gap-1 text-[10px] uppercase font-bold px-2 py-1 bg-emerald-950/60 rounded text-emerald-400 hover:text-amber-400 border border-emerald-500/20"><Mail className="h-3 w-3" /> Mail</a>}
                  </div>

                  {/* Actions */}
                  <div className="mt-auto flex gap-3 pt-4 border-t border-emerald-900/30">
                    <Link
                      href={`/personalities/${p.slug}`}
                      className="flex-1 bg-emerald-950 text-white text-sm font-bold py-2.5 rounded-xl text-center hover:bg-emerald-900 transition-colors"
                    >
                      View Profile
                    </Link>
                    <button 
                      onClick={() => handleShare(p.slug)}
                      className="bg-emerald-950 hover:bg-emerald-900 text-amber-400 p-2.5 rounded-xl transition-colors"
                      title="Share Profile"
                    >
                      <Share2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
}
