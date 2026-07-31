"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Search, Calendar, Loader2 } from "lucide-react";

interface Article {
  title: string;
  subtitle?: string;
  category: string;
  slug: string;
  readTime: string;
  publishedAt: string;
  authorId?: { name: string };
  heroImage?: string;
}

export default function BlogPage() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/articles")
      .then((res) => {
        if (!res.ok) return null;
        return res.json();
      })
      .then((data) => {
        if (Array.isArray(data)) {
          setArticles(data);
        }
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to load articles", err);
        setLoading(false);
      });
  }, []);

  // Dynamically extract categories from loaded articles
  const categories = ["All", ...Array.from(new Set(articles.map((art) => art.category)))];

  const filtered = articles.filter((art) => {
    const matchesSearch = art.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          art.subtitle?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = activeCategory === "All" || art.category.toLowerCase() === activeCategory.toLowerCase();
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="text-center max-w-2xl mx-auto mb-12">
        <h1 className="text-4xl font-display font-extrabold tracking-tight text-white mb-4">
          Pakistan Editorial Blog & Articles
        </h1>
        <p className="text-emerald-100/60 text-sm">
          Deep dives into Pakistan's historical milestones, local startups, and scenic mountain ranges.
        </p>
      </div>

      {/* Search and Filters */}
      <div className="flex flex-col md:flex-row gap-4 justify-between items-center mb-12 bg-emerald-950/20 p-4 border border-emerald-950/30 rounded-xl">
        <div className="relative w-full md:w-80">
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-emerald-100/40" />
          <input
            type="text"
            placeholder="Search articles..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-emerald-990/60 border border-emerald-950/50 rounded-lg py-2 pl-10 pr-4 text-sm text-white placeholder-emerald-100/30 focus:outline-none focus:border-amber-400"
          />
        </div>
        <div className="flex gap-2 flex-wrap">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 rounded-lg text-xs font-semibold transition-all ${
                activeCategory === cat
                  ? "bg-amber-400 text-emerald-950"
                  : "bg-emerald-950/40 text-emerald-100/70 hover:bg-emerald-950/70"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {loading ? (
        <div className="flex justify-center py-20">
          <Loader2 className="h-10 w-10 text-amber-400 animate-spin" />
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {filtered.length === 0 ? (
            <div className="col-span-2 text-center text-neutral-500 text-sm py-12">
              No news articles found.
            </div>
          ) : (
            filtered.map((art, idx) => (
              <div
                key={idx}
                className="rounded-3xl bg-[#0a120e] border border-emerald-900/40 hover:border-amber-400/40 transition-all flex flex-col md:flex-row overflow-hidden group"
              >
                {art.heroImage && (
                  <div className="w-full md:w-44 h-48 md:h-auto relative shrink-0 overflow-hidden bg-emerald-950/20 border-b md:border-b-0 md:border-r border-emerald-900/40">
                    <img src={art.heroImage} alt={art.title} className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  </div>
                )}
                <div className="p-8 flex flex-col justify-between flex-grow">
                  <div>
                    <div className="flex justify-between items-center mb-3">
                      <span className="text-xs text-amber-400 font-bold uppercase tracking-wider">
                        {art.category}
                      </span>
                      <span className="text-xs text-emerald-100/40">{art.readTime} read</span>
                    </div>
                    <h2 className="text-xl font-bold text-white mb-2 leading-snug group-hover:text-amber-400 transition-colors">
                      <Link href={`/blog/${art.slug}`}>{art.title}</Link>
                    </h2>
                    <p className="text-emerald-100/60 text-sm mb-6 leading-relaxed line-clamp-2">{art.subtitle}</p>
                  </div>
                  <div className="flex justify-between items-center border-t border-emerald-900/25 pt-4">
                    <div className="flex items-center gap-1 text-xs text-emerald-100/50">
                      <Calendar className="h-3.5 w-3.5" />
                      <span>{new Date(art.publishedAt).toLocaleDateString()}</span>
                    </div>
                    <Link
                      href={`/blog/${art.slug}`}
                      className="text-xs font-semibold text-emerald-300 hover:text-white"
                    >
                      Read Article &rarr;
                    </Link>
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
