import { Metadata } from "next";
import { ArrowLeft, Calendar, BookOpen, User, CheckCircle } from "lucide-react";
import Link from "next/link";
import dbConnect from "@/lib/db";
import ArticleModel from "@/models/Article";
import "@/models/Personality";
import "@/models/Business";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  try {
    await dbConnect();
    const article = await ArticleModel.findOne({ slug });
    
    if (!article) {
      return { title: "Article Not Found | Proud of Pakistan" };
    }

    return {
      title: `${article.title} | Proud of Pakistan`,
      description: article.subtitle || article.content.replace(/<[^>]*>?/gm, '').substring(0, 160) + "...",
      openGraph: {
        title: article.title,
        description: article.subtitle || article.content.replace(/<[^>]*>?/gm, '').substring(0, 160) + "...",
        url: `https://www.proudofpakistan.com/blog/${slug}`,
        siteName: "Proud of Pakistan",
        type: "article",
        publishedTime: article.publishedAt.toISOString(),
      },
      twitter: {
        card: "summary_large_image",
        title: article.title,
        description: article.subtitle || article.content.replace(/<[^>]*>?/gm, '').substring(0, 160) + "...",
      },
    };
  } catch (error) {
    return { title: "Article | Proud of Pakistan" };
  }
}

export default async function BlogDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  let article = null;

  try {
    await dbConnect();
    const data = await ArticleModel.findOne({ slug }).populate("authorId").populate("relatedPersonalities").populate("relatedBusinesses");
    if (data) {
      article = JSON.parse(JSON.stringify(data));
    }
  } catch (error) {
    console.error(error);
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
            <BookOpen className="h-4 w-4 text-emerald-400" /> {article.readTime || "5 min"} Read
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

        <div 
          className="prose prose-invert max-w-none text-emerald-100/80 leading-relaxed text-base space-y-6"
          dangerouslySetInnerHTML={{ __html: article.content }}
        />

        {(article.relatedPersonalities?.length > 0 || article.relatedBusinesses?.length > 0) && (
          <div className="border-t border-emerald-500/10 pt-8 mt-12 space-y-6">
            <h3 className="text-lg font-bold text-emerald-300">Connected Directory Profiles</h3>
            
            {article.relatedPersonalities?.length > 0 && (
              <div>
                <span className="text-xs text-emerald-100/50 block mb-2">Personalities:</span>
                <div className="flex flex-wrap gap-3">
                  {article.relatedPersonalities.map((p: any, idx: number) => (
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
                  {article.relatedBusinesses.map((b: any, idx: number) => (
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
