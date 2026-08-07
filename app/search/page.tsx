"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { Loader2, Search, ArrowRight, User, BookOpen, Calendar } from "lucide-react";

interface SearchResult {
  _id: string;
  title: string;
  type: "Article" | "Event" | "Personality";
  subtitle: string;
  image?: string;
  url: string;
}

function SearchResults() {
  const searchParams = useSearchParams();
  const q = searchParams.get("q") || "";
  
  const [results, setResults] = useState<SearchResult[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<"All" | "Article" | "Event" | "Personality">("All");

  useEffect(() => {
    if (!q) {
      return;
    }

    setLoading(true);
    fetch(`/api/search?q=${encodeURIComponent(q)}`)
      .then(res => res.json())
      .then(data => {
        if (data.results) {
          setResults(data.results);
        }
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [q]);

  const displayResults = !q ? [] : results;
  const filteredResults = filter === "All" ? displayResults : displayResults.filter(r => r.type === filter);

  const getIcon = (type: string) => {
    if (type === "Article") return <BookOpen className="h-4 w-4 text-emerald-400" />;
    if (type === "Event") return <Calendar className="h-4 w-4 text-amber-400" />;
    return <User className="h-4 w-4 text-emerald-300" />;
  };

  return (
    <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8 min-h-screen">
      <div className="mb-12">
        <h1 className="text-3xl font-display font-extrabold text-white mb-2 flex items-center gap-3">
          <Search className="h-8 w-8 text-amber-400" />
          Search Results
        </h1>
        <p className="text-emerald-100/60">
          {q ? `Showing results for "${q}"` : "Enter a search query to begin."}
        </p>
      </div>

      {q && !loading && results.length > 0 && (
        <div className="flex gap-2 mb-8 overflow-x-auto pb-2">
          {["All", "Personality", "Article", "Event"].map(f => (
            <button
              key={f}
              onClick={() => setFilter(f as any)}
              className={`px-4 py-1.5 rounded-full text-xs font-bold whitespace-nowrap transition-colors ${
                filter === f 
                  ? "bg-amber-400 text-emerald-950"
                  : "bg-emerald-950/40 text-emerald-100/70 hover:bg-emerald-900/60 border border-emerald-500/20"
              }`}
            >
              {f === "All" ? `All Results (${results.length})` : `${f}s (${results.filter(r => r.type === f).length})`}
            </button>
          ))}
        </div>
      )}

      <div className="space-y-4">
        {loading ? (
          <div className="py-20 flex justify-center">
            <Loader2 className="h-10 w-10 text-amber-400 animate-spin" />
          </div>
        ) : !q ? (
          <div className="py-20 text-center text-neutral-500 bg-emerald-950/10 border border-emerald-950/40 rounded-3xl">
            Search for personalities, events, or news articles.
          </div>
        ) : filteredResults.length === 0 ? (
          <div className="py-20 text-center text-neutral-500 bg-emerald-950/10 border border-emerald-950/40 rounded-3xl">
            No results found for "{q}". Try a different term.
          </div>
        ) : (
          filteredResults.map(result => (
            <Link 
              key={`${result.type}-${result._id}`} 
              href={result.url}
              className="group flex flex-col sm:flex-row sm:items-center justify-between p-5 rounded-2xl bg-emerald-950/20 border border-emerald-500/10 hover:border-amber-400/40 gap-4 transition-all"
            >
              <div className="flex items-center gap-4">
                {result.image ? (
                  <img src={result.image} alt={result.title} className="h-14 w-14 rounded-full object-cover border border-emerald-500/20" />
                ) : (
                  <div className="h-14 w-14 rounded-full bg-emerald-900/40 flex items-center justify-center border border-emerald-500/20">
                    {getIcon(result.type)}
                  </div>
                )}
                <div>
                  <h3 className="text-white font-bold text-lg group-hover:text-amber-400 transition-colors">{result.title}</h3>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-[10px] uppercase font-bold text-emerald-400 bg-emerald-400/10 px-2 py-0.5 rounded">
                      {result.type}
                    </span>
                    <span className="text-xs text-emerald-100/50">{result.subtitle}</span>
                  </div>
                </div>
              </div>
              <ArrowRight className="h-5 w-5 text-emerald-500/30 group-hover:text-amber-400 group-hover:translate-x-1 transition-all" />
            </Link>
          ))
        )}
      </div>
    </div>
  );
}

export default function SearchPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center bg-emerald-990">
        <Loader2 className="h-10 w-10 text-amber-400 animate-spin" />
      </div>
    }>
      <SearchResults />
    </Suspense>
  );
}
