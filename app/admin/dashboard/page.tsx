"use client";

import { useState, useEffect } from "react";
import { 
  BarChart3, User, Briefcase, FileText, PlusCircle, CheckCircle, 
  Trash2, Sparkles, Loader2, Award 
} from "lucide-react";

export default function AdminDashboard() {
  const [personalities, setPersonalities] = useState<any[]>([]);
  const [businesses, setBusinesses] = useState<any[]>([]);
  const [articles, setArticles] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // Form states for adding items
  const [persForm, setPersForm] = useState({ name: "", category: "Science", biography: "", achievements: "" });
  const [busForm, setBusForm] = useState({ name: "", category: "Technology", description: "", websiteUrl: "" });
  const [artForm, setArtForm] = useState({ title: "", category: "History", subtitle: "", content: "" });

  const fetchData = () => {
    setLoading(true);
    Promise.all([
      fetch("/api/personalities").then((r) => r.json()),
      fetch("/api/businesses").then((r) => r.json()),
      fetch("/api/articles").then((r) => r.json()),
    ])
      .then(([p, b, a]) => {
        if (Array.isArray(p)) setPersonalities(p);
        if (Array.isArray(b)) setBusinesses(b);
        if (Array.isArray(a)) setArticles(a);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  };

  useEffect(() => {
    let active = true;
    Promise.all([
      fetch("/api/personalities").then((r) => r.json()),
      fetch("/api/businesses").then((r) => r.json()),
      fetch("/api/articles").then((r) => r.json()),
    ])
      .then(([p, b, a]) => {
        if (active) {
          if (Array.isArray(p)) setPersonalities(p);
          if (Array.isArray(b)) setBusinesses(b);
          if (Array.isArray(a)) setArticles(a);
          setLoading(false);
        }
      })
      .catch(() => {
        if (active) setLoading(false);
      });
    return () => {
      active = false;
    };
  }, []);

  const handleAddPersonality = async (e: React.FormEvent) => {
    e.preventDefault();
    const achievementsArray = persForm.achievements.split(",").map((s) => s.trim()).filter(Boolean);
    const slug = persForm.name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");

    await fetch("/api/personalities", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...persForm, achievements: achievementsArray, slug, featured: true }),
    });
    setPersForm({ name: "", category: "Science", biography: "", achievements: "" });
    fetchData();
  };

  const handleAddBusiness = async (e: React.FormEvent) => {
    e.preventDefault();
    const slug = busForm.name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");

    await fetch("/api/businesses", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...busForm, slug, featured: true }),
    });
    setBusForm({ name: "", category: "Technology", description: "", websiteUrl: "" });
    fetchData();
  };

  const handleAddArticle = async (e: React.FormEvent) => {
    e.preventDefault();
    const slug = artForm.title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
    
    // Uses the default admin user seeded in dbConnect
    await fetch("/api/articles", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ 
        ...artForm, 
        slug, 
        authorId: "60c72b2f9b1d8b2a5c8e4f1a", // placeholder adminId
        readTime: "5 min",
        featured: true 
      }),
    });
    setArtForm({ title: "", category: "History", subtitle: "", content: "" });
    fetchData();
  };

  return (
    <div className="mx-auto max-w-7xl px-6 py-12 text-white bg-emerald-990">
      
      {/* Header Panel */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-emerald-500/10 pb-6 mb-8">
        <div>
          <h1 className="text-3xl font-display font-extrabold flex items-center gap-2">
            <Sparkles className="h-6 w-6 text-amber-400" /> Administrative CMS Dashboard
          </h1>
          <p className="text-xs text-emerald-100/50 mt-1">NO SIDEBAR. Fully integrated within Top Navigation bar parameters.</p>
        </div>
        <button 
          onClick={fetchData}
          className="px-4 py-2 bg-emerald-950/40 border border-emerald-500/20 rounded-lg hover:bg-emerald-950/80 transition-all text-xs font-semibold"
        >
          Refresh Live Metrics
        </button>
      </div>

      {loading ? (
        <div className="flex justify-center items-center py-20">
          <Loader2 className="h-10 w-10 text-amber-400 animate-spin" />
        </div>
      ) : (
        <>
          {/* Quick Metrics Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
            {[
              { label: "Total Articles", val: articles.length, icon: FileText, color: "text-blue-400 bg-blue-400/5 border-blue-400/10" },
              { label: "Featured People", val: personalities.length, icon: User, color: "text-amber-400 bg-amber-400/5 border-amber-400/10" },
              { label: "Listed Businesses", val: businesses.length, icon: Briefcase, color: "text-teal-400 bg-teal-400/5 border-teal-400/10" },
              { label: "Pending Reviews", val: 0, icon: BarChart3, color: "text-rose-400 bg-rose-400/5 border-rose-400/10" }
            ].map((stat, idx) => {
              const Icon = stat.icon;
              return (
                <div key={idx} className={`p-6 rounded-2xl border ${stat.color} backdrop-blur-md`}>
                  <div className="flex justify-between items-center mb-3">
                    <span className="text-xs font-medium uppercase tracking-wider">{stat.label}</span>
                    <Icon className="h-5 w-5" />
                  </div>
                  <span className="text-3xl font-display font-extrabold">{stat.val}</span>
                </div>
              );
            })}
          </div>

          {/* Quick CMS Creators */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            
            {/* 1. Add Personality */}
            <form onSubmit={handleAddPersonality} className="p-6 rounded-2xl bg-emerald-950/15 border border-emerald-500/10 flex flex-col gap-4">
              <h2 className="text-lg font-bold text-emerald-300 flex items-center gap-1.5 border-b border-emerald-500/10 pb-2">
                <PlusCircle className="h-5 w-5 text-amber-400" /> Add Featured Hero
              </h2>
              <input
                type="text"
                placeholder="Full Name"
                value={persForm.name}
                onChange={(e) => setPersForm({ ...persForm, name: e.target.value })}
                required
                className="w-full bg-emerald-990/60 border border-emerald-500/20 rounded-lg p-2.5 text-sm"
              />
              <select
                value={persForm.category}
                onChange={(e) => setPersForm({ ...persForm, category: e.target.value })}
                className="w-full bg-emerald-990 border border-emerald-500/20 rounded-lg p-2.5 text-sm"
              >
                <option value="Science">Science</option>
                <option value="Philanthropy">Philanthropy</option>
                <option value="Sports">Sports</option>
                <option value="Entrepreneurs">Entrepreneurs</option>
              </select>
              <textarea
                placeholder="Biography (Markdown/Rich text supported)"
                value={persForm.biography}
                onChange={(e) => setPersForm({ ...persForm, biography: e.target.value })}
                required
                rows={3}
                className="w-full bg-emerald-990/60 border border-emerald-500/20 rounded-lg p-2.5 text-sm"
              />
              <input
                type="text"
                placeholder="Key Achievements (comma separated)"
                value={persForm.achievements}
                onChange={(e) => setPersForm({ ...persForm, achievements: e.target.value })}
                className="w-full bg-emerald-990/60 border border-emerald-500/20 rounded-lg p-2.5 text-sm"
              />
              <button type="submit" className="w-full py-2.5 rounded-lg bg-amber-400 hover:bg-amber-300 text-emerald-950 font-bold transition-all text-xs">
                Save & Spotlight Live
              </button>
            </form>

            {/* 2. Add Business */}
            <form onSubmit={handleAddBusiness} className="p-6 rounded-2xl bg-emerald-950/15 border border-emerald-500/10 flex flex-col gap-4">
              <h2 className="text-lg font-bold text-emerald-300 flex items-center gap-1.5 border-b border-emerald-500/10 pb-2">
                <PlusCircle className="h-5 w-5 text-amber-400" /> Add Corporate Listing
              </h2>
              <input
                type="text"
                placeholder="Business Name"
                value={busForm.name}
                onChange={(e) => setBusForm({ ...busForm, name: e.target.value })}
                required
                className="w-full bg-emerald-990/60 border border-emerald-500/20 rounded-lg p-2.5 text-sm"
              />
              <select
                value={busForm.category}
                onChange={(e) => setBusForm({ ...busForm, category: e.target.value })}
                className="w-full bg-emerald-990 border border-emerald-500/20 rounded-lg p-2.5 text-sm"
              >
                <option value="Technology">Technology</option>
                <option value="Finance">Finance</option>
                <option value="Food & Retail">Food & Retail</option>
                <option value="Hotels">Hotels</option>
              </select>
              <textarea
                placeholder="Business Description"
                value={busForm.description}
                onChange={(e) => setBusForm({ ...busForm, description: e.target.value })}
                required
                rows={3}
                className="w-full bg-emerald-990/60 border border-emerald-500/20 rounded-lg p-2.5 text-sm"
              />
              <input
                type="url"
                placeholder="Website URL"
                value={busForm.websiteUrl}
                onChange={(e) => setBusForm({ ...busForm, websiteUrl: e.target.value })}
                className="w-full bg-emerald-990/60 border border-emerald-500/20 rounded-lg p-2.5 text-sm"
              />
              <button type="submit" className="w-full py-2.5 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-emerald-950 font-bold transition-all text-xs">
                Save & Add Listing
              </button>
            </form>

            {/* 3. Add Blog Article */}
            <form onSubmit={handleAddArticle} className="p-6 rounded-2xl bg-emerald-950/15 border border-emerald-500/10 flex flex-col gap-4">
              <h2 className="text-lg font-bold text-emerald-300 flex items-center gap-1.5 border-b border-emerald-500/10 pb-2">
                <PlusCircle className="h-5 w-5 text-amber-400" /> Write Blog Article
              </h2>
              <input
                type="text"
                placeholder="Article Title"
                value={artForm.title}
                onChange={(e) => setArtForm({ ...artForm, title: e.target.value })}
                required
                className="w-full bg-emerald-990/60 border border-emerald-500/20 rounded-lg p-2.5 text-sm"
              />
              <input
                type="text"
                placeholder="Article Subtitle / Hook"
                value={artForm.subtitle}
                onChange={(e) => setArtForm({ ...artForm, subtitle: e.target.value })}
                className="w-full bg-emerald-990/60 border border-emerald-500/20 rounded-lg p-2.5 text-sm"
              />
              <select
                value={artForm.category}
                onChange={(e) => setArtForm({ ...artForm, category: e.target.value })}
                className="w-full bg-emerald-990 border border-emerald-500/20 rounded-lg p-2.5 text-sm"
              >
                <option value="History">History</option>
                <option value="Tourism">Tourism</option>
                <option value="Culture">Culture</option>
                <option value="Business">Business</option>
              </select>
              <textarea
                placeholder="Write rich HTML/Text content..."
                value={artForm.content}
                onChange={(e) => setArtForm({ ...artForm, content: e.target.value })}
                required
                rows={3}
                className="w-full bg-emerald-990/60 border border-emerald-500/20 rounded-lg p-2.5 text-sm"
              />
              <button type="submit" className="w-full py-2.5 rounded-lg bg-teal-500 hover:bg-teal-400 text-emerald-950 font-bold transition-all text-xs">
                Publish Article Live
              </button>
            </form>

          </div>
        </>
      )}

    </div>
  );
}
