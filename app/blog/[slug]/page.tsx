"use client";

import { useState, useEffect, use } from "react";
import { ArrowLeft, Calendar, BookOpen, User, CheckCircle, Loader2 } from "lucide-react";
import Link from "next/link";

interface Article {
  title: string;
  subtitle?: string;
  category: string;
  content: string;
  readTime: string;
  publishedAt: string;
  authorId?: { name: string };
  relatedPersonalities: { name: string; slug: string }[];
  relatedBusinesses: { name: string; slug: string }[];
}

export default function BlogDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = use(params);
  const [article, setArticle] = useState<Article | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`/api/articles/${slug}`)
      .then((res) => res.json())
      .then((data) => {
        if (!data.error) {
          setArticle(data);
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

  if (!article) {
    return (
      <div className="text-center py-20">
        <h1 className="text-2xl font-bold text-white mb-4">Article Not Found</h1>
        <Link href="/blog" className="text-amber-400 underline">Back to Blog</Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-4xl px-6 py-12">
      <Link href="/blog" className="inline-flex items-center gap-2 text-sm text-emerald-300 hover:text-white mb-8">
        <ArrowLeft className="h-4 w-4" /> Back to blog posts
      </Link>

      <article className="bg-emerald-950/20 border border-emerald-500/10 rounded-3xl p-8 md:p-12 backdrop-blur-md">
        <div className="flex items-center justify-between text-xs text-emerald-100/50 mb-6">
          <span className="text-amber-400 font-bold uppercase tracking-wider">
            {article.category}
          </span>
          <span className="flex items-center gap-1">
            <BookOpen className="h-4 w-4 text-emerald-400" /> {article.readTime} Read
          </span>
        </div>

        <h1 className="text-3xl md:text-5xl font-display font-extrabold text-white mb-4 leading-tight">
          {article.title}
        </h1>
        {article.subtitle && (
          <p className="text-lg text-emerald-100/60 leading-relaxed mb-8">{article.subtitle}</p>
        )}

        <div className="flex items-center gap-6 border-y border-emerald-500/10 py-4 mb-8 text-xs text-emerald-100/50">
          <div className="flex items-center gap-2">
            <User className="h-4 w-4 text-amber-400" />
            <span>By {article.authorId?.name || "Editorial Board"}</span>
          </div>
          <div className="flex items-center gap-2">
            <Calendar className="h-4 w-4 text-emerald-400" />
            <span>Published {new Date(article.publishedAt).toLocaleDateString()}</span>
          </div>
        </div>

        {/* Dynamic Table of Contents (ToC) */}
        <div className="bg-emerald-950/40 border border-emerald-950/50 rounded-xl p-5 mb-8">
          <h3 className="text-xs font-bold text-amber-400 uppercase tracking-widest mb-3">Table of Contents</h3>
          <ul className="text-xs text-emerald-100/70 space-y-2">
            <li>• Introduction & Unification Theory Overview</li>
            <li>• The Physics Achievements & World Accolades</li>
            <li>• International Foundations & Continuing Legacies</li>
          </ul>
        </div>

        {/* Article Body */}
        <div 
          className="prose prose-invert max-w-none text-emerald-100/80 leading-relaxed text-base space-y-6"
          dangerouslySetInnerHTML={{ __html: article.content }}
        />

        {/* Cross linkages: Connected Profiles */}
        {(article.relatedPersonalities?.length > 0 || article.relatedBusinesses?.length > 0) && (
          <div className="border-t border-emerald-500/10 pt-8 mt-12 space-y-6">
            <h3 className="text-lg font-bold text-emerald-300">Connected Directory Profiles</h3>
            
            {article.relatedPersonalities?.length > 0 && (
              <div>
                <span className="text-xs text-emerald-100/50 block mb-2">Personalities:</span>
                <div className="flex flex-wrap gap-3">
                  {article.relatedPersonalities.map((p, idx) => (
                    <Link
                      key={idx}
                      href={`/personalities/${p.slug}`}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-amber-400/20 bg-amber-400/5 text-xs text-amber-400 hover:bg-amber-400/10 transition-colors"
                    >
                      <CheckCircle className="h-3.5 w-3.5" />
                      {p.name}
                    </Link>
                  ))}
                </div>
              </div>
            )}

            {article.relatedBusinesses?.length > 0 && (
              <div>
                <span className="text-xs text-emerald-100/50 block mb-2">Businesses:</span>
                <div className="flex flex-wrap gap-3">
                  {article.relatedBusinesses.map((b, idx) => (
                    <Link
                      key={idx}
                      href={`/businesses/${b.slug}`}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-emerald-400/20 bg-emerald-500/5 text-xs text-emerald-300 hover:bg-emerald-500/10 transition-colors"
                    >
                      {b.name}
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </article>
    </div>
  );
}
