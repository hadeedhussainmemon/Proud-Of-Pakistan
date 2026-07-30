"use client";

import { useState, useEffect } from "react";
import { 
  BarChart3, User, Calendar, FileText, PlusCircle, CheckCircle, 
  Sparkles, Loader2, Settings, Lock, Trash2, Edit3 
} from "lucide-react";

export default function AdminDashboard() {
  const [personalities, setPersonalities] = useState<any[]>([]);
  const [articles, setArticles] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // Creator & Editor Form states
  const [persForm, setPersForm] = useState({ name: "", category: "Science", biography: "", achievements: "", images: "" });
  const [artForm, setArtForm] = useState({ title: "", category: "History", subtitle: "", content: "", heroImage: "" });
  
  // Tracking if we are editing an item
  const [editPersSlug, setEditPersSlug] = useState<string | null>(null);
  const [editArtSlug, setEditArtSlug] = useState<string | null>(null);

  // Site Config & Security states
  const [siteConfig, setSiteConfig] = useState({ 
    headline: "", 
    subheadline: "",
    logoUrl: "",
    faviconUrl: "",
    heroImageUrl: ""
  });
  const [securityForm, setSecurityForm] = useState({ newPassword: "" });

  const fetchData = () => {
    setLoading(true);
    Promise.all([
      fetch("/api/personalities").then((r) => r.json()),
      fetch("/api/articles").then((r) => r.json()),
      fetch("/api/config").then((r) => r.json()),
    ])
      .then(([p, a, c]) => {
        if (Array.isArray(p)) setPersonalities(p);
        if (Array.isArray(a)) setArticles(a);
        if (c && c.headline) {
          setSiteConfig({ 
            headline: c.headline, 
            subheadline: c.subheadline,
            logoUrl: c.logoUrl || "/logo.jpg",
            faviconUrl: c.faviconUrl || "/favicon.ico",
            heroImageUrl: c.heroImageUrl || "/hero_visual.jpg"
          });
        }
        setLoading(false);
      })
      .catch(() => setLoading(false));
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleUpdateConfig = async (e: React.FormEvent) => {
    e.preventDefault();
    await fetch("/api/config", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(siteConfig),
    });
    alert("Site configuration updated successfully!");
  };

  const handleUpdatePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    await fetch("/api/auth/update-password", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(securityForm),
    });
    setSecurityForm({ newPassword: "" });
    alert("Admin password updated successfully!");
  };

  // --- CRUD: Personalities ---
  const handleSavePersonality = async (e: React.FormEvent) => {
    e.preventDefault();
    const achievementsArray = persForm.achievements.split(",").map((s) => s.trim()).filter(Boolean);
    const imagesArray = persForm.images.split(",").map((s) => s.trim()).filter(Boolean);
    const slug = persForm.name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");

    const payload = { ...persForm, achievements: achievementsArray, images: imagesArray, slug, featured: true };

    if (editPersSlug) {
      // Update
      await fetch(`/api/personalities/${editPersSlug}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      setEditPersSlug(null);
      alert("Personality profile updated!");
    } else {
      // Create
      await fetch("/api/personalities", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      alert("Personality profile created!");
    }

    setPersForm({ name: "", category: "Science", biography: "", achievements: "", images: "" });
    fetchData();
  };

  const startEditPersonality = (p: any) => {
    setEditPersSlug(p.slug);
    setPersForm({
      name: p.name,
      category: p.category,
      biography: p.biography,
      achievements: Array.isArray(p.achievements) ? p.achievements.join(", ") : "",
      images: Array.isArray(p.images) ? p.images.join(", ") : ""
    });
  };

  const handleDeletePersonality = async (slug: string) => {
    if (confirm("Are you sure you want to delete this profile?")) {
      await fetch(`/api/personalities/${slug}`, { method: "DELETE" });
      fetchData();
    }
  };

  // --- CRUD: Articles (News) ---
  const handleSaveArticle = async (e: React.FormEvent) => {
    e.preventDefault();
    const slug = artForm.title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
    const payload = { 
      ...artForm, 
      slug, 
      authorId: "60c72b2f9b1d8b2a5c8e4f1a", 
      readTime: "5 min",
      featured: true 
    };

    if (editArtSlug) {
      // Update
      await fetch(`/api/articles/${editArtSlug}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      setEditArtSlug(null);
      alert("News article updated!");
    } else {
      // Create
      await fetch("/api/articles", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      alert("News article published!");
    }

    setArtForm({ title: "", category: "History", subtitle: "", content: "", heroImage: "" });
    fetchData();
  };

  const startEditArticle = (art: any) => {
    setEditArtSlug(art.slug);
    setArtForm({
      title: art.title,
      category: art.category,
      subtitle: art.subtitle || "",
      content: art.content,
      heroImage: art.heroImage || ""
    });
  };

  const handleDeleteArticle = async (slug: string) => {
    if (confirm("Are you sure you want to delete this article?")) {
      await fetch(`/api/articles/${slug}`, { method: "DELETE" });
      fetchData();
    }
  };

  return (
    <div className="mx-auto max-w-7xl px-6 py-12 text-white bg-emerald-990">
      
      {/* Header Panel */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-emerald-500/10 pb-6 mb-8">
        <div>
          <h1 className="text-3xl font-display font-extrabold flex items-center gap-2">
            <Sparkles className="h-6 w-6 text-amber-400" /> Administrative CMS Dashboard
          </h1>
          <p className="text-xs text-emerald-100/50 mt-1">Manage content, site configurations, and security credentials.</p>
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
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            {[
              { label: "Total Articles (News)", val: articles.length, icon: FileText, color: "text-blue-400 bg-blue-400/5 border-blue-400/10" },
              { label: "Featured People", val: personalities.length, icon: User, color: "text-amber-400 bg-amber-400/5 border-amber-400/10" },
              { label: "Scheduled Events", val: 4, icon: Calendar, color: "text-teal-400 bg-teal-400/5 border-teal-400/10" },
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

          {/* Configuration and Security Forms */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            
            {/* Site Configuration */}
            <form onSubmit={handleUpdateConfig} className="p-6 rounded-2xl bg-emerald-950/15 border border-emerald-500/10 flex flex-col gap-4">
              <h2 className="text-lg font-bold text-amber-400 flex items-center gap-1.5 border-b border-emerald-500/10 pb-2">
                <Settings className="h-5 w-5" /> Homepage Headline & Brand Assets
              </h2>
              <div>
                <label className="text-xs text-neutral-300 block mb-1">Headline Text</label>
                <input
                  type="text"
                  value={siteConfig.headline}
                  onChange={(e) => setSiteConfig({ ...siteConfig, headline: e.target.value })}
                  required
                  className="w-full bg-emerald-990/60 border border-emerald-500/20 rounded-lg p-2.5 text-sm"
                />
              </div>
              <div>
                <label className="text-xs text-neutral-300 block mb-1">Subheadline Text</label>
                <textarea
                  value={siteConfig.subheadline}
                  onChange={(e) => setSiteConfig({ ...siteConfig, subheadline: e.target.value })}
                  required
                  rows={2}
                  className="w-full bg-emerald-990/60 border border-emerald-500/20 rounded-lg p-2.5 text-sm"
                />
              </div>
              <div>
                <label className="text-xs text-neutral-300 block mb-1">Logo Asset URL</label>
                <input
                  type="text"
                  value={siteConfig.logoUrl}
                  onChange={(e) => setSiteConfig({ ...siteConfig, logoUrl: e.target.value })}
                  required
                  className="w-full bg-emerald-990/60 border border-emerald-500/20 rounded-lg p-2.5 text-sm"
                />
              </div>
              <div>
                <label className="text-xs text-neutral-300 block mb-1">Favicon Asset URL</label>
                <input
                  type="text"
                  value={siteConfig.faviconUrl}
                  onChange={(e) => setSiteConfig({ ...siteConfig, faviconUrl: e.target.value })}
                  required
                  className="w-full bg-emerald-990/60 border border-emerald-500/20 rounded-lg p-2.5 text-sm"
                />
              </div>
              <div>
                <label className="text-xs text-neutral-300 block mb-1">Hero Image Visual URL</label>
                <input
                  type="text"
                  value={siteConfig.heroImageUrl}
                  onChange={(e) => setSiteConfig({ ...siteConfig, heroImageUrl: e.target.value })}
                  required
                  className="w-full bg-emerald-990/60 border border-emerald-500/20 rounded-lg p-2.5 text-sm"
                />
              </div>
              <button type="submit" className="w-full py-2.5 rounded-lg bg-amber-400 hover:bg-amber-300 text-emerald-950 font-bold transition-all text-xs">
                Update Brand & Content Config
              </button>
            </form>

            {/* Change Admin Password */}
            <form onSubmit={handleUpdatePassword} className="p-6 rounded-2xl bg-emerald-950/15 border border-emerald-500/10 flex flex-col gap-4">
              <h2 className="text-lg font-bold text-amber-400 flex items-center gap-1.5 border-b border-emerald-500/10 pb-2">
                <Lock className="h-5 w-5" /> Admin Security Settings
              </h2>
              <div>
                <label className="text-xs text-neutral-300 block mb-1">New Password</label>
                <input
                  type="password"
                  placeholder="Enter new admin password"
                  value={securityForm.newPassword}
                  onChange={(e) => setSecurityForm({ newPassword: e.target.value })}
                  required
                  className="w-full bg-emerald-990/60 border border-emerald-500/20 rounded-lg p-2.5 text-sm"
                />
              </div>
              <button type="submit" className="w-full py-2.5 rounded-lg bg-rose-500 hover:bg-rose-400 text-white font-bold transition-all text-xs mt-6">
                Update Admin Password
              </button>
            </form>

          </div>

          {/* Quick CMS Creators */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            
            {/* 1. Add/Edit Personality */}
            <form onSubmit={handleSavePersonality} className="p-6 rounded-2xl bg-emerald-950/15 border border-emerald-500/10 flex flex-col gap-4">
              <h2 className="text-lg font-bold text-emerald-300 flex items-center justify-between border-b border-emerald-500/10 pb-2">
                <span className="flex items-center gap-1.5">
                  <PlusCircle className="h-5 w-5 text-amber-400" /> 
                  {editPersSlug ? "Edit Profile Feature" : "Add Featured Hero"}
                </span>
                {editPersSlug && (
                  <button type="button" onClick={() => { setEditPersSlug(null); setPersForm({ name: "", category: "Science", biography: "", achievements: "", images: "" }); }} className="text-xs text-rose-400">Cancel Edit</button>
                )}
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
                <option value="Leadership">Leadership</option>
                <option value="Literature">Literature</option>
              </select>
              <textarea
                placeholder="Biography (Markdown/Rich text supported)"
                value={persForm.biography}
                onChange={(e) => setPersForm({ ...persForm, biography: e.target.value })}
                required
                rows={4}
                className="w-full bg-emerald-990/60 border border-emerald-500/20 rounded-lg p-2.5 text-sm"
              />
              <input
                type="text"
                placeholder="Key Achievements (comma separated)"
                value={persForm.achievements}
                onChange={(e) => setPersForm({ ...persForm, achievements: e.target.value })}
                className="w-full bg-emerald-990/60 border border-emerald-500/20 rounded-lg p-2.5 text-sm"
              />
              <input
                type="text"
                placeholder="Profile Images URLs (comma separated)"
                value={persForm.images}
                onChange={(e) => setPersForm({ ...persForm, images: e.target.value })}
                className="w-full bg-emerald-990/60 border border-emerald-500/20 rounded-lg p-2.5 text-sm"
              />
              <button type="submit" className="w-full py-2.5 rounded-lg bg-amber-400 hover:bg-amber-300 text-emerald-950 font-bold transition-all text-xs">
                {editPersSlug ? "Update & Save Spotlight" : "Save & Spotlight Live"}
              </button>
            </form>

            {/* 2. Add/Edit Blog Article */}
            <form onSubmit={handleSaveArticle} className="p-6 rounded-2xl bg-emerald-950/15 border border-emerald-500/10 flex flex-col gap-4">
              <h2 className="text-lg font-bold text-emerald-300 flex items-center justify-between border-b border-emerald-500/10 pb-2">
                <span className="flex items-center gap-1.5">
                  <PlusCircle className="h-5 w-5 text-amber-400" /> 
                  {editArtSlug ? "Edit News Article" : "Write News & Article"}
                </span>
                {editArtSlug && (
                  <button type="button" onClick={() => { setEditArtSlug(null); setArtForm({ title: "", category: "History", subtitle: "", content: "", heroImage: "" }); }} className="text-xs text-rose-400">Cancel Edit</button>
                )}
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
              <input
                type="text"
                placeholder="Hero Image URL (e.g. /images/news1.jpg)"
                value={artForm.heroImage}
                onChange={(e) => setArtForm({ ...artForm, heroImage: e.target.value })}
                className="w-full bg-emerald-990/60 border border-emerald-500/20 rounded-lg p-2.5 text-sm"
              />
              <textarea
                placeholder="Write rich HTML/Text content..."
                value={artForm.content}
                onChange={(e) => setArtForm({ ...artForm, content: e.target.value })}
                required
                rows={4}
                className="w-full bg-emerald-990/60 border border-emerald-500/20 rounded-lg p-2.5 text-sm"
              />
              <button type="submit" className="w-full py-2.5 rounded-lg bg-teal-500 hover:bg-teal-400 text-emerald-950 font-bold transition-all text-xs">
                {editArtSlug ? "Update & Save Article" : "Publish Article Live"}
              </button>
            </form>

          </div>

          {/* Manage Existing items lists */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 border-t border-emerald-500/10 pt-12">
            
            {/* List Personalities */}
            <div className="space-y-4">
              <h2 className="text-xl font-display font-bold">Manage Profile Features</h2>
              <div className="space-y-2 max-h-[300px] overflow-y-auto pr-2">
                {personalities.map((p) => (
                  <div key={p.slug} className="flex justify-between items-center p-3.5 rounded-xl bg-emerald-950/20 border border-emerald-500/10">
                    <div>
                      <h4 className="font-bold text-white text-sm">{p.name}</h4>
                      <span className="text-xs text-neutral-400">{p.category}</span>
                    </div>
                    <div className="flex gap-2">
                      <button onClick={() => startEditPersonality(p)} className="p-2 bg-amber-400/10 border border-amber-400/20 hover:bg-amber-400/25 rounded-lg text-amber-400 transition-colors">
                        <Edit3 className="h-4 w-4" />
                      </button>
                      <button onClick={() => handleDeletePersonality(p.slug)} className="p-2 bg-rose-500/10 border border-rose-500/20 hover:bg-rose-500/25 rounded-lg text-rose-400 transition-colors">
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* List News Articles */}
            <div className="space-y-4">
              <h2 className="text-xl font-display font-bold">Manage News Articles</h2>
              <div className="space-y-2 max-h-[300px] overflow-y-auto pr-2">
                {articles.map((art) => (
                  <div key={art.slug} className="flex justify-between items-center p-3.5 rounded-xl bg-emerald-950/20 border border-emerald-500/10">
                    <div>
                      <h4 className="font-bold text-white text-sm truncate max-w-[200px]">{art.title}</h4>
                      <span className="text-xs text-neutral-400">{art.category}</span>
                    </div>
                    <div className="flex gap-2">
                      <button onClick={() => startEditArticle(art)} className="p-2 bg-amber-400/10 border border-amber-400/20 hover:bg-amber-400/25 rounded-lg text-amber-400 transition-colors">
                        <Edit3 className="h-4 w-4" />
                      </button>
                      <button onClick={() => handleDeleteArticle(art.slug)} className="p-2 bg-rose-500/10 border border-rose-500/20 hover:bg-rose-500/25 rounded-lg text-rose-400 transition-colors">
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>

        </>
      )}

    </div>
  );
}
