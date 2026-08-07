import { Metadata } from "next";
import { Award, CheckCircle, ArrowLeft, Star, Globe, Mail, Sparkles } from "lucide-react";
import Link from "next/link";
import dbConnect from "@/lib/db";
import PersonalityModel from "@/models/Personality";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  try {
    await dbConnect();
    const profile = await PersonalityModel.findOne({ slug });
    
    if (!profile) {
      return { title: "Profile Not Found | Proud of Pakistan" };
    }

    return {
      title: `${profile.name} - ${profile.category} | Proud of Pakistan`,
      description: profile.biography.substring(0, 160) + (profile.biography.length > 160 ? "..." : ""),
      openGraph: {
        title: `${profile.name} - ${profile.category}`,
        description: profile.biography.substring(0, 160) + (profile.biography.length > 160 ? "..." : ""),
        url: `https://www.proudofpakistan.com/personalities/${slug}`,
        siteName: "Proud of Pakistan",
        images: [
          {
            url: profile.profilePicture || profile.images?.[0] || "https://www.proudofpakistan.com/logo.jpg",
            width: 1200,
            height: 630,
            alt: profile.name,
          },
        ],
        type: "profile",
      },
      twitter: {
        card: "summary_large_image",
        title: `${profile.name} - ${profile.category}`,
        description: profile.biography.substring(0, 160) + (profile.biography.length > 160 ? "..." : ""),
        images: [profile.profilePicture || profile.images?.[0] || "https://www.proudofpakistan.com/logo.jpg"],
      },
    };
  } catch (error) {
    return { title: "Personality | Proud of Pakistan" };
  }
}

export default async function PersonalityDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  let profile = null;

  try {
    await dbConnect();
    const data = await PersonalityModel.findOne({ slug });
    if (data) {
      profile = JSON.parse(JSON.stringify(data));
    }
  } catch (error) {
    console.error(error);
  }

  if (!profile) {
    return (
      <div className="text-center py-32 bg-[#020805] min-h-screen">
        <h1 className="text-3xl font-bold text-white mb-4">Profile Not Found</h1>
        <Link href="/personalities" className="text-amber-400 hover:text-amber-300 underline font-semibold transition-all">Back to Directory</Link>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen bg-[#020805] text-neutral-100 overflow-hidden py-12 px-4 sm:px-6 lg:px-8">
      {/* Glowing backdrop blurs */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-emerald-500/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute top-10 left-10 w-[300px] h-[300px] bg-amber-400/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="relative mx-auto max-w-5xl z-10">
        {/* Back Link */}
        <Link href="/personalities" className="inline-flex items-center gap-2 text-sm font-bold text-emerald-400 hover:text-amber-400 mb-8 transition-colors duration-200 group">
          <ArrowLeft className="h-4 w-4 group-hover:-translate-x-1 transition-transform" /> Back to directory
        </Link>

        {/* Main Card Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Profile Left Sidebar Card */}
          <div className="lg:col-span-4 bg-emerald-950/10 border border-emerald-500/10 rounded-3xl p-6 backdrop-blur-md flex flex-col items-center text-center shadow-xl">
            <div className="relative w-full aspect-square max-w-[240px] rounded-2xl overflow-hidden border-2 border-emerald-500/20 shadow-2xl mb-6 bg-emerald-950/40 flex items-center justify-center shrink-0">
              {profile.profilePicture || profile.images?.[0] ? (
                <img 
                  src={profile.profilePicture || profile.images[0]} 
                  alt={profile.name} 
                  className="w-full h-full object-cover"
                />
              ) : (
                <span className="text-4xl font-extrabold text-emerald-500/40">{profile.name.charAt(0)}</span>
              )}
              {profile.featured && (
                <div className="absolute top-3 right-3 bg-amber-400/90 text-emerald-950 text-[10px] font-extrabold px-2.5 py-1 rounded-full shadow-md flex items-center gap-1 uppercase tracking-wider">
                  <Star className="h-3 w-3 fill-emerald-950 stroke-none" /> Featured
                </div>
              )}
            </div>

            <span className="text-[10px] font-bold text-amber-400 tracking-widest uppercase bg-amber-400/10 border border-amber-400/20 px-3 py-1 rounded-full mb-3\">
              {profile.category}
            </span>
            
            <h1 className="text-2xl font-display font-extrabold text-white leading-tight mb-4">{profile.name}</h1>

            {/* Social Links */}
            <div className="w-full border-t border-emerald-500/10 pt-5 mt-2 flex flex-col gap-2.5">
              <h4 className="text-xs font-bold text-emerald-500/70 tracking-widest uppercase mb-1">Verify / Connect</h4>
              
              <div className="flex flex-col gap-2">
                {profile.website && (
                  <a href={profile.website} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2.5 px-4 py-2 bg-emerald-950/20 border border-emerald-500/10 rounded-xl text-xs font-bold text-emerald-300 hover:text-white hover:bg-emerald-950/40 transition-all justify-center">
                    <Globe className="h-3.5 w-3.5" /> Official Website
                  </a>
                )}
                {profile.socialLinks?.linkedin && (
                  <a href={profile.socialLinks.linkedin} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2.5 px-4 py-2 bg-emerald-950/20 border border-emerald-500/10 rounded-xl text-xs font-bold text-emerald-300 hover:text-white hover:bg-emerald-950/40 transition-all justify-center">
                    <Globe className="h-3.5 w-3.5" /> LinkedIn Profile
                  </a>
                )}
                {profile.socialLinks?.twitter && (
                  <a href={profile.socialLinks.twitter} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2.5 px-4 py-2 bg-emerald-950/20 border border-emerald-500/10 rounded-xl text-xs font-bold text-emerald-300 hover:text-white hover:bg-emerald-950/40 transition-all justify-center">
                    <Globe className="h-3.5 w-3.5" /> X / Twitter
                  </a>
                )}
                {profile.socialLinks?.contact && (
                  <a href={`mailto:${profile.socialLinks.contact}`} className="flex items-center gap-2.5 px-4 py-2 bg-emerald-950/20 border border-emerald-500/10 rounded-xl text-xs font-bold text-emerald-300 hover:text-white hover:bg-emerald-950/40 transition-all justify-center">
                    <Mail className="h-3.5 w-3.5" /> Contact Channel
                  </a>
                )}
                {!profile.website && !profile.socialLinks?.linkedin && !profile.socialLinks?.twitter && !profile.socialLinks?.contact && (
                  <p className="text-xs text-neutral-500 italic">No public social channels linked.</p>
                )}
              </div>
            </div>
          </div>

          {/* Biography & Achievements Card */}
          <div className="lg:col-span-8 space-y-8">
            {/* Biography details */}
            <div className="bg-emerald-950/10 border border-emerald-500/10 rounded-3xl p-8 sm:p-10 backdrop-blur-md shadow-xl">
              <h2 className="text-lg font-bold text-emerald-400 mb-5 flex items-center gap-2 border-b border-emerald-500/10 pb-3 uppercase tracking-wider">
                <Sparkles className="h-4 w-4 text-amber-400" /> Biography
              </h2>
              <p className="text-neutral-200 font-light leading-relaxed text-base whitespace-pre-line text-justify sm:text-left">
                {profile.biography}
              </p>
            </div>

            {/* Major Achievements */}
            {profile.achievements && profile.achievements.length > 0 && (
              <div className="bg-emerald-950/10 border border-emerald-500/10 rounded-3xl p-8 sm:p-10 backdrop-blur-md shadow-xl">
                <h2 className="text-lg font-bold text-emerald-400 mb-6 flex items-center gap-2 border-b border-emerald-500/10 pb-3 uppercase tracking-wider">
                  <Award className="h-5 w-5 text-amber-400" /> Major Achievements
                </h2>
                <div className="grid grid-cols-1 gap-4">
                  {profile.achievements.map((ach: string, idx: number) => (
                    <div key={idx} className="flex gap-4 items-start bg-emerald-950/20 p-5 rounded-2xl border border-emerald-500/5 hover:border-emerald-500/15 transition-all duration-200 group">
                      <CheckCircle className="h-5 w-5 text-amber-400 shrink-0 mt-0.5 group-hover:scale-110 transition-transform" />
                      <span className="text-neutral-200 text-sm leading-relaxed">{ach}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

        </div>
      </div>
    </div>
  );
}
