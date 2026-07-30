"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Search, Building, Loader2 } from "lucide-react";

interface Business {
  name: string;
  category: string;
  description: string;
  slug: string;
}

export default function BusinessesPage() {
  const [businesses, setBusinesses] = useState<Business[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/businesses")
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setBusinesses(data);
        }
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to load businesses", err);
        setLoading(false);
      });
  }, []);

  const filtered = businesses.filter((b) =>
    b.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    b.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="text-center max-w-2xl mx-auto mb-12">
        <h1 className="text-4xl font-display font-extrabold tracking-tight text-white mb-4">
          Top Businesses & Enterprises
        </h1>
        <p className="text-emerald-100/60 text-sm">
          Spotlighting the industrial giants and technology leaders powering Pakistan's GDP and global imports.
        </p>
      </div>

      <div className="mb-12 bg-emerald-950/20 p-4 border border-emerald-950/30 rounded-xl max-w-md mx-auto">
        <div className="relative">
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-emerald-100/40" />
          <input
            type="text"
            placeholder="Search business sector..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-emerald-990/60 border border-emerald-950/50 rounded-lg py-2 pl-10 pr-4 text-sm text-white placeholder-emerald-100/30 focus:outline-none focus:border-amber-400"
          />
        </div>
      </div>

      {loading ? (
        <div className="flex justify-center py-20">
          <Loader2 className="h-10 w-10 text-amber-400 animate-spin" />
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {filtered.map((b, idx) => (
            <div
              key={idx}
              className="bg-emerald-950/15 border border-emerald-950/20 rounded-2xl p-6 hover:border-emerald-500/20 transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <span className="p-2.5 bg-amber-400/10 rounded-lg text-amber-400">
                    <Building className="h-5 w-5" />
                  </span>
                  <div>
                    <h2 className="text-xl font-bold text-white">{b.name}</h2>
                    <span className="text-xs text-emerald-300 font-medium">{b.category}</span>
                  </div>
                </div>
                <p className="text-emerald-100/60 text-sm leading-relaxed mb-4 line-clamp-3">{b.description}</p>
              </div>
              <div className="pt-4 border-t border-emerald-950/30 flex justify-between items-center">
                <span className="text-xs font-semibold px-2 py-1 rounded bg-emerald-500/10 text-emerald-300 border border-emerald-500/20">
                  Verified
                </span>
                <Link
                  href={`/businesses/${b.slug}`}
                  className="text-xs font-bold text-amber-400 hover:text-amber-300"
                >
                  View Details &rarr;
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
