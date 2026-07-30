"use client";

import { useState, useEffect, use } from "react";
import { Award, Calendar, CheckCircle, ArrowLeft, Loader2, Star } from "lucide-react";
import Link from "next/link";

interface Personality {
  name: string;
  category: string;
  biography: string;
  achievements: string[];
  birthDate?: string;
  deathDate?: string;
  featured: boolean;
}

export default function PersonalityDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = use(params);
  const [profile, setProfile] = useState<Personality | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`/api/personalities/${slug}`)
      .then((res) => res.json())
      .then((data) => {
        if (!data.error) {
          setProfile(data);
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

  if (!profile) {
    return (
      <div className="text-center py-20">
        <h1 className="text-2xl font-bold text-white mb-4">Profile Not Found</h1>
        <Link href="/personalities" className="text-amber-400 underline">Back to Directory</Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-4xl px-6 py-12">
      <Link href="/personalities" className="inline-flex items-center gap-2 text-sm text-emerald-300 hover:text-white mb-8">
        <ArrowLeft className="h-4 w-4" /> Back to directory
      </Link>

      <div className="bg-emerald-950/20 border border-emerald-500/10 rounded-3xl p-8 md:p-12 backdrop-blur-md">
        <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
          <span className="text-xs font-bold text-amber-400 tracking-wider uppercase border border-amber-400/20 px-2 py-0.5 rounded">
            {profile.category}
          </span>
          {profile.featured && (
            <span className="inline-flex items-center gap-1 text-emerald-300 text-xs font-semibold">
              <Star className="h-4 w-4 fill-amber-400 text-amber-400" /> Featured Hero
            </span>
          )}
        </div>

        <h1 className="text-4xl md:text-5xl font-display font-extrabold text-white mb-4">{profile.name}</h1>

        <div className="flex items-center gap-2 text-sm text-emerald-100/50 mb-8">
          <Calendar className="h-4 w-4" />
          <span>
            {profile.birthDate ? new Date(profile.birthDate).getFullYear() : "N/A"} -{" "}
            {profile.deathDate ? new Date(profile.deathDate).getFullYear() : "Present"}
          </span>
        </div>

        <div className="border-t border-emerald-500/10 pt-8">
          <h2 className="text-xl font-bold mb-4 text-emerald-300">Biography</h2>
          <p className="text-emerald-100/80 leading-relaxed text-base mb-8 whitespace-pre-line">{profile.biography}</p>
        </div>

        <div className="border-t border-emerald-500/10 pt-8">
          <h2 className="text-xl font-bold mb-4 text-emerald-300">Major Achievements</h2>
          <div className="space-y-3">
            {profile.achievements?.map((ach, idx) => (
              <div key={idx} className="flex gap-3 items-start bg-emerald-950/40 p-4 rounded-xl border border-emerald-950/50">
                <CheckCircle className="h-5 w-5 text-amber-400 flex-shrink-0 mt-0.5" />
                <span className="text-emerald-100/90 text-sm leading-relaxed">{ach}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
