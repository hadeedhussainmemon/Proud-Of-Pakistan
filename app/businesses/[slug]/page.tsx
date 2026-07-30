"use client";

import { useState, useEffect, use } from "react";
import { Building, MapPin, Globe, ArrowLeft, Loader2, Award } from "lucide-react";
import Link from "next/link";

interface Business {
  name: string;
  category: string;
  description: string;
  websiteUrl?: string;
}

export default function BusinessDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = use(params);
  const [business, setBusiness] = useState<Business | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`/api/businesses/${slug}`)
      .then((res) => res.json())
      .then((data) => {
        if (!data.error) {
          setBusiness(data);
        }
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [slug]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Loader2 className="h-10 w-10 text-amber-400 animate-spin" />
      </div>
    );
  }

  if (!business) {
    return (
      <div className="text-center py-20">
        <h1 className="text-2xl font-bold text-white mb-4">Business Not Found</h1>
        <Link href="/businesses" className="text-amber-400 underline">Back to Directory</Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-4xl px-6 py-12">
      <Link href="/businesses" className="inline-flex items-center gap-2 text-sm text-emerald-300 hover:text-white mb-8">
        <ArrowLeft className="h-4 w-4" /> Back to directory
      </Link>

      <div className="bg-emerald-950/20 border border-emerald-500/10 rounded-3xl p-8 md:p-12 backdrop-blur-md">
        <div className="flex items-center gap-3 mb-6">
          <span className="p-3 bg-amber-400/10 rounded-xl text-amber-400">
            <Building className="h-6 w-6" />
          </span>
          <div>
            <h1 className="text-3xl font-display font-extrabold text-white">{business.name}</h1>
            <span className="text-sm text-emerald-300 font-semibold">{business.category}</span>
          </div>
        </div>

        <div className="border-t border-emerald-500/10 pt-8 mt-8">
          <h2 className="text-xl font-bold mb-4 text-emerald-300">About the Enterprise</h2>
          <p className="text-emerald-100/80 leading-relaxed text-base mb-8 whitespace-pre-line">
            {business.description}
          </p>
        </div>

        {business.websiteUrl && (
          <div className="border-t border-emerald-500/10 pt-8 flex flex-wrap gap-6">
            <a
              href={business.websiteUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-emerald-500 text-emerald-950 font-bold hover:bg-emerald-400 transition-all shadow"
            >
              <Globe className="h-4 w-4" /> Visit Website
            </a>
          </div>
        )}
      </div>
    </div>
  );
}
