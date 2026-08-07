import { Metadata } from "next";
import { Award, CheckCircle, ArrowLeft, Star, Globe, Mail, Sparkles, Calendar, MapPin, Building, Trophy, User } from "lucide-react";
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
  let relatedProfiles: any[] = [];

  try {
    await dbConnect();
    const data = await PersonalityModel.findOne({ slug });
    if (data) {
      profile = JSON.parse(JSON.stringify(data));
      
      // Fetch related profiles prioritising same category
      const sameCategory = await PersonalityModel.find({
        category: data.category,
        slug: { $ne: slug },
        status: "approved"
      }).limit(3);
      
      let relatedList = [...sameCategory];
      
      if (relatedList.length < 3) {
        const needed = 3 - relatedList.length;
        const excludedSlugs = [slug, ...relatedList.map((p: any) => p.slug)];
        const others = await PersonalityModel.find({
          slug: { $nin: excludedSlugs },
          status: "approved"
        }).limit(needed);
        relatedList = [...relatedList, ...others];
      }
      relatedProfiles = JSON.parse(JSON.stringify(relatedList));
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

  const formatDate = (dateString?: Date | string) => {
    if (!dateString) return null;
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" });
  };

  return (
    <div className="relative min-h-screen bg-[#020805] text-neutral-100 overflow-hidden py-12 px-4 sm:px-6 lg:px-8">
      {/* Glowing backdrop blurs */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-emerald-500/5 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute top-10 left-10 w-[300px] h-[300px] bg-amber-400/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="relative mx-auto max-w-5xl z-10">
        {/* Back Link */}
        <Link href="/personalities" className="inline-flex items-center gap-2 text-sm font-bold text-emerald-400 hover:text-amber-400 mb-8 transition-colors duration-200 group">
          <ArrowLeft className="h-4 w-4 group-hover:-translate-x-1 transition-transform" /> Back to directory
        </Link>

        {/* Main Redesigned Layout */}
        <div className="bg-emerald-950/10 border border-emerald-500/10 rounded-3xl p-6 sm:p-10 backdrop-blur-md shadow-xl space-y-10">
          
          {/* Top Title Section */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b border-emerald-500/10 pb-6">
            <div className="flex items-center gap-3.5">
              <div className="h-12 w-12 rounded-xl bg-emerald-950/60 border border-emerald-500/20 flex items-center justify-center text-amber-400">
                <User className="h-6 w-6" />
              </div>
              <div>
                <h1 className="text-3xl sm:text-4xl font-display font-extrabold text-white flex items-center gap-2.5">
                  {profile.name}
                  {profile.featured && (
                    <span className="bg-amber-400/10 border border-amber-400/20 text-amber-400 text-[10px] font-extrabold px-2.5 py-1 rounded-full uppercase tracking-wider flex items-center gap-1 shrink-0">
                      <Star className="h-3 w-3 fill-amber-400 stroke-none" /> Featured Hero
                    </span>
                  )}
                </h1>
                <p className="text-xs text-neutral-400 uppercase tracking-widest mt-1 font-bold">Verified Archival Record</p>
              </div>
            </div>
          </div>

          {/* Main Grid: Info + Image */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
            
            {/* Left Column: Metadata & Biography (70%) */}
            <div className="lg:col-span-8 space-y-8">
              
              {/* Structured Mini Metadata Rows */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-emerald-950/20 border border-emerald-500/5 p-5 rounded-2xl text-sm">
                <div className="flex items-center gap-3">
                  <span className="text-emerald-100/50 font-medium w-24 shrink-0">Profession:</span>
                  <span className="text-amber-400 font-bold">{profile.category}</span>
                </div>
                
                <div className="flex items-center gap-3">
                  <span className="text-emerald-100/50 font-medium w-24 shrink-0">Nationality:</span>
                  <span className="flex items-center gap-2 text-white font-semibold">
                    {/* Premium Pakistani Flag SVG */}
                    <svg className="w-5 h-3.5 rounded-[2px] border border-white/10" viewBox="0 0 3 2" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <rect width="1" height="2" fill="#ffffff" />
                      <rect x="1" width="2" height="2" fill="#006600" />
                      <circle cx="2" cy="1" r="0.4" fill="#ffffff" />
                      <circle cx="2.06" cy="0.94" r="0.4" fill="#006600" />
                      <path d="M 2.05 0.72 L 2.08 0.82 L 2.18 0.82 L 2.1 0.88 L 2.13 0.98 L 2.05 0.92 L 1.97 0.98 L 2.0 0.88 L 1.92 0.82 L 2.02 0.82 Z" fill="#ffffff" />
                    </svg>
                    Pakistani
                  </span>
                </div>
              </div>

              {/* Biography Section */}
              <div className="space-y-4">
                <h3 className="text-base font-bold text-emerald-400 uppercase tracking-wider flex items-center gap-2">
                  <Sparkles className="h-4 w-4 text-amber-400" /> Biography
                </h3>
                <div className="text-neutral-200 font-light leading-relaxed text-base whitespace-pre-line text-justify sm:text-left space-y-4">
                  {profile.biography}
                </div>
              </div>

              {/* Bottom Structured Facts Grid */}
              {(profile.birthDate || profile.deathDate || profile.company) && (
                <div className="border-t border-emerald-500/10 pt-6 space-y-4">
                  <h3 className="text-base font-bold text-emerald-400 uppercase tracking-wider">Key Details</h3>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm bg-emerald-950/15 p-5 rounded-2xl border border-emerald-500/5">
                    {profile.birthDate && (
                      <div className="flex items-center gap-3">
                        <Calendar className="h-4 w-4 text-amber-400 shrink-0" />
                        <div>
                          <span className="text-[11px] text-emerald-100/50 block font-bold uppercase tracking-wider">Born</span>
                          <span className="text-white font-semibold">{formatDate(profile.birthDate)}</span>
                        </div>
                      </div>
                    )}
                    {profile.deathDate && (
                      <div className="flex items-center gap-3">
                        <Calendar className="h-4 w-4 text-amber-400 shrink-0" />
                        <div>
                          <span className="text-[11px] text-emerald-100/50 block font-bold uppercase tracking-wider">Died</span>
                          <span className="text-white font-semibold">{formatDate(profile.deathDate)}</span>
                        </div>
                      </div>
                    )}
                    {profile.company && (
                      <div className="flex items-center gap-3 sm:col-span-2">
                        <Building className="h-4 w-4 text-amber-400 shrink-0" />
                        <div>
                          <span className="text-[11px] text-emerald-100/50 block font-bold uppercase tracking-wider">Organization / Association</span>
                          <span className="text-white font-semibold">{profile.company}</span>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* Right Column: Rectangular Photo & Links (30%) */}
            <div className="lg:col-span-4 space-y-6">
              
              {/* Rectangular Image Frame */}
              <div className="relative w-full aspect-[3/4] rounded-2xl overflow-hidden border border-emerald-500/20 shadow-2xl bg-emerald-950/40 flex items-center justify-center shrink-0">
                {profile.profilePicture || profile.images?.[0] ? (
                  <img 
                    src={profile.profilePicture || profile.images[0]} 
                    alt={profile.name} 
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <User className="h-20 w-20 text-emerald-500/20" />
                )}
              </div>

              {/* Verified Links Container */}
              <div className="bg-emerald-950/20 border border-emerald-500/10 rounded-2xl p-5 space-y-4">
                <h4 className="text-xs font-bold text-emerald-500/70 tracking-widest uppercase border-b border-emerald-500/10 pb-2 flex items-center gap-1.5">
                  <Globe className="h-3.5 w-3.5" /> Online Channels
                </h4>
                
                <div className="flex flex-col gap-2">
                  {profile.website && (
                    <a href={profile.website} target="_blank" rel="noopener noreferrer" className="flex items-center justify-between px-3 py-2 bg-emerald-950/40 border border-emerald-500/10 rounded-xl text-xs font-bold text-emerald-300 hover:text-white hover:bg-emerald-950/80 transition-all">
                      <span>Official Website</span>
                      <Globe className="h-3.5 w-3.5" />
                    </a>
                  )}
                  {profile.socialLinks?.linkedin && (
                    <a href={profile.socialLinks.linkedin} target="_blank" rel="noopener noreferrer" className="flex items-center justify-between px-3 py-2 bg-emerald-950/40 border border-emerald-500/10 rounded-xl text-xs font-bold text-emerald-300 hover:text-white hover:bg-emerald-950/80 transition-all">
                      <span>LinkedIn Profile</span>
                      <Globe className="h-3.5 w-3.5" />
                    </a>
                  )}
                  {profile.socialLinks?.twitter && (
                    <a href={profile.socialLinks.twitter} target="_blank" rel="noopener noreferrer" className="flex items-center justify-between px-3 py-2 bg-emerald-950/40 border border-emerald-500/10 rounded-xl text-xs font-bold text-emerald-300 hover:text-white hover:bg-emerald-950/80 transition-all">
                      <span>X / Twitter</span>
                      <Globe className="h-3.5 w-3.5" />
                    </a>
                  )}
                  {profile.socialLinks?.contact && (
                    <a href={`mailto:${profile.socialLinks.contact}`} className="flex items-center justify-between px-3 py-2 bg-emerald-950/40 border border-emerald-500/10 rounded-xl text-xs font-bold text-emerald-300 hover:text-white hover:bg-emerald-950/80 transition-all">
                      <span>Email Channel</span>
                      <Mail className="h-3.5 w-3.5" />
                    </a>
                  )}
                  {!profile.website && !profile.socialLinks?.linkedin && !profile.socialLinks?.twitter && !profile.socialLinks?.contact && (
                    <p className="text-xs text-neutral-500 italic text-center py-2">No public links associated.</p>
                  )}
                </div>
              </div>
            </div>

          </div>

          {/* Connected Achievements Block (stretches full width below the main grid) */}
          {profile.achievements && profile.achievements.length > 0 && (
            <div className="border-t border-emerald-500/10 pt-8 mt-4">
              <h2 className="text-lg font-bold text-emerald-400 mb-6 flex items-center gap-2 uppercase tracking-wider">
                <Trophy className="h-5 w-5 text-amber-400" /> Key National Achievements
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {profile.achievements.map((ach: string, idx: number) => (
                  <div key={idx} className="flex gap-4 items-start bg-emerald-950/20 p-5 rounded-2xl border border-emerald-500/5 hover:border-emerald-500/15 transition-all duration-200 group">
                    <CheckCircle className="h-5 w-5 text-amber-400 shrink-0 mt-0.5 group-hover:scale-110 transition-transform" />
                    <span className="text-neutral-200 text-sm leading-relaxed">{ach}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Related Profiles Section */}
          {relatedProfiles && relatedProfiles.length > 0 && (
            <div className="border-t border-emerald-500/10 pt-8 mt-8">
              <h2 className="text-lg font-bold text-emerald-400 mb-6 flex items-center gap-2 uppercase tracking-wider">
                <User className="h-5 w-5 text-amber-400" /> Discover More Heroes
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {relatedProfiles.map((p: any) => (
                  <Link 
                    key={p.slug} 
                    href={`/personalities/${p.slug}`}
                    className="flex flex-col bg-[#030e07] border border-emerald-500/10 hover:border-emerald-500/30 rounded-2xl overflow-hidden hover:scale-[1.02] transition-all duration-300 group shadow-lg"
                  >
                    <div className="relative aspect-[4/3] w-full bg-emerald-950/20 overflow-hidden">
                      {p.profilePicture || p.images?.[0] ? (
                        <img 
                          src={p.profilePicture || p.images[0]} 
                          alt={p.name} 
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-emerald-500/10">
                          <User className="h-12 w-12" />
                        </div>
                      )}
                      <span className="absolute top-3 left-3 bg-emerald-950/90 border border-emerald-500/20 text-emerald-300 text-[9px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider">
                        {p.category}
                      </span>
                    </div>
                    <div className="p-5 flex-grow flex flex-col justify-between">
                      <div>
                        <h4 className="font-bold text-white text-base group-hover:text-amber-400 transition-colors line-clamp-1">
                          {p.name}
                        </h4>
                        <p className="text-xs text-neutral-400 line-clamp-2 mt-2 leading-relaxed font-light">
                          {p.biography}
                        </p>
                      </div>
                      <span className="text-[10px] text-amber-400 font-bold uppercase tracking-wider mt-4 block group-hover:translate-x-1 transition-transform">
                        Read Biography &rarr;
                      </span>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
