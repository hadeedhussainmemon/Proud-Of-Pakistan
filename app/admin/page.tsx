"use client";
import { useState, useEffect, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import {
  BarChart3, User, Calendar, FileText, PlusCircle, CheckCircle,
  Sparkles, Loader2, Settings, Lock, Trash2, Edit3, Upload, Mail,
  Image as ImageIcon, Globe, ShieldAlert, Heart, Clock
} from "lucide-react";
function CMSContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const activeTab = searchParams.get("tab") || "dashboard";
  // Global States
  const [personalities, setPersonalities] = useState<any[]>([]);
  const [articles, setArticles] = useState<any[]>([]);
  const [subscribers, setSubscribers] = useState<any[]>([]);
  const [events, setEvents] = useState<any[]>([]);
  const [gallery, setGallery] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState<string | null>(null);
  // Pagination States
  const [persPage, setPersPage] = useState(1);
  const [persTotalPages, setPersTotalPages] = useState(1);
  // Forms States
  const [persForm, setPersForm] = useState({ 
    name: "", 
    category: "Science", 
    biography: "", 
    achievements: "", 
    images: "", 
    profilePicture: "",
    birthDate: "",
    deathDate: "",
    company: "",
    website: "",
    linkedin: "",
    twitter: "",
    contact: "",
    isDeceased: "no"
  });
  const [artForm, setArtForm] = useState({ title: "", category: "History", subtitle: "", content: "", heroImage: "" });
  const [eventForm, setEventForm] = useState({ title: "", date: "", description: "", location: "", status: "upcoming" });
  const [galleryForm, setGalleryForm] = useState({ title: "", category: "", imageUrl: "" });
  const [siteConfig, setSiteConfig] = useState({ headline: "", subheadline: "", logoUrl: "", faviconUrl: "", heroImageUrl: "" });
  const [securityForm, setSecurityForm] = useState({ newPassword: "" });
  // Edit Trackers
  const [editPersSlug, setEditPersSlug] = useState<string | null>(null);
  const [editArtSlug, setEditArtSlug] = useState<string | null>(null);
  const [editEventId, setEditEventId] = useState<string | null>(null);
  const [editGalleryId, setEditGalleryId] = useState<string | null>(null);
  const fetchData = () => {
    setLoading(true);
    Promise.all([
      fetch(`/api/personalities?all=true&page=${persPage}&limit=10`).then((r) => r.json()),
      fetch("/api/articles").then((r) => r.json()),
      fetch("/api/config").then((r) => r.json()),
      fetch("/api/newsletter").then((r) => r.json()),
      fetch("/api/events").then((r) => r.json()),
      fetch("/api/gallery").then((r) => r.json()),
    ])
      .then(([p, a, c, s, ev, g]) => {
        if (p && Array.isArray(p.data)) {
          setPersonalities(p.data);
          setPersTotalPages(p.totalPages || 1);
          setPersPage(p.page || 1);
        } else if (Array.isArray(p)) {
          setPersonalities(p);
        }
        if (Array.isArray(a)) setArticles(a);
        if (Array.isArray(s)) setSubscribers(s);
        if (Array.isArray(ev)) setEvents(ev);
        if (Array.isArray(g)) setGallery(g);
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
  }, [persPage]);
  const fetchPersonalities = (page: number) => {
    fetch(`/api/personalities?all=true&page=${page}&limit=10`)
      .then(r => r.json())
      .then(p => {
        if (p && Array.isArray(p.data)) {
          setPersonalities(p.data);
          setPersTotalPages(p.totalPages || 1);
          setPersPage(p.page || 1);
        }
      });
  };
  // Stale state safe upload function using functional state updaters
  const uploadFile = async (e: React.ChangeEvent<HTMLInputElement>, targetKey: string, callback: (url: string) => void) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(targetKey);
    const formData = new FormData();
    formData.append("file", file);
    try {
      const res = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });
      const data = await res.json();
      if (data.url || data.secure_url) {
        callback(data.url || data.secure_url);
      } else {
        alert("Upload failed: " + (data.error || "Unknown error"));
      }
    } catch (err) {
      alert("Upload failed due to connection error.");
    } finally {
      setUploading(null);
    }
  };
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
  // CRUD handlers with clean resetting
  const handleSavePersonality = async (e: React.FormEvent) => {
    e.preventDefault();
    const achievementsArray = persForm.achievements.split(",").map((s) => s.trim()).filter(Boolean);
    const imagesArray = persForm.images.split(",").map((s) => s.trim()).filter(Boolean);
    const slug = persForm.name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
    const payload = {
      name: persForm.name,
      category: persForm.category,
      biography: persForm.biography,
      profilePicture: persForm.profilePicture,
      achievements: achievementsArray,
      images: imagesArray,
      slug,
      featured: true,
      status: "approved",
      company: persForm.company || undefined,
      website: persForm.website || undefined,
      birthDate: persForm.birthDate ? new Date(persForm.birthDate) : undefined,
      deathDate: persForm.isDeceased === "yes" && persForm.deathDate ? new Date(persForm.deathDate) : undefined,
      socialLinks: {
        linkedin: persForm.linkedin || undefined,
        twitter: persForm.twitter || undefined,
        contact: persForm.contact || undefined,
      }
    };
    if (editPersSlug) {
      await fetch(`/api/personalities/${editPersSlug}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      setEditPersSlug(null);
      alert("Personality profile updated!");
    } else {
      await fetch("/api/personalities", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      alert("Personality profile created!");
    }
    setPersForm({ name: "", category: "Science", biography: "", achievements: "", images: "", profilePicture: "", birthDate: "", deathDate: "", company: "", website: "", linkedin: "", twitter: "", contact: "", isDeceased: "no" });
    fetchData();
  };
  const handleSaveArticle = async (e: React.FormEvent) => {
    e.preventDefault();
    const slug = artForm.title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
    const payload = { ...artForm, slug, authorId: "60c72b2f9b1d8b2a5c8e4f1a", readTime: "5 min", featured: true };
    if (editArtSlug) {
      await fetch(`/api/articles/${editArtSlug}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      setEditArtSlug(null);
      alert("Article updated!");
    } else {
      await fetch("/api/articles", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      alert("Article published!");
    }
    setArtForm({ title: "", category: "History", subtitle: "", content: "", heroImage: "" });
    fetchData();
  };
  const handleSaveEvent = async (e: React.FormEvent) => {
    e.preventDefault();
    if (editEventId) {
      await fetch(`/api/events/${editEventId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(eventForm),
      });
      setEditEventId(null);
    } else {
      await fetch("/api/events", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(eventForm),
      });
    }
    setEventForm({ title: "", date: "", description: "", location: "", status: "upcoming" });
    fetchData();
  };
  const handleSaveGallery = async (e: React.FormEvent) => {
    e.preventDefault();
    if (editGalleryId) {
      await fetch(`/api/gallery/${editGalleryId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(galleryForm),
      });
      setEditGalleryId(null);
    } else {
      await fetch("/api/gallery", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(galleryForm),
      });
    }
    setGalleryForm({ title: "", category: "", imageUrl: "" });
    fetchData();
  };
  // Helpers to start edit state
  const startEditPersonality = (p: any) => {
    setEditPersSlug(p.slug);
    setPersForm({
      name: p.name,
      category: p.category,
      biography: p.biography,
      achievements: Array.isArray(p.achievements) ? p.achievements.join(", ") : "",
      images: Array.isArray(p.images) ? p.images.join(", ") : "",
      profilePicture: p.profilePicture || "",
      birthDate: p.birthDate ? new Date(p.birthDate).toISOString().split('T')[0] : "",
      deathDate: p.deathDate ? new Date(p.deathDate).toISOString().split('T')[0] : "",
      company: p.company || "",
      website: p.website || "",
      linkedin: p.socialLinks?.linkedin || "",
      twitter: p.socialLinks?.twitter || "",
      contact: p.socialLinks?.contact || "",
      isDeceased: p.deathDate ? "yes" : "no",
    });
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
  const startEditEvent = (ev: any) => {
    setEditEventId(ev._id);
    setEventForm({
      title: ev.title,
      date: new Date(ev.date).toISOString().split('T')[0],
      description: ev.description || "",
      location: ev.location || "",
      status: ev.status || "upcoming",
    });
  };
  const startEditGallery = (g: any) => {
    setEditGalleryId(g._id);
    setGalleryForm({
      title: g.title,
      category: g.category,
      imageUrl: g.imageUrl,
    });
  };
  return (
    <div className="space-y-8">
      {/* Dashboard Section Metrics Card Panel */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-emerald-500/10 pb-6 mb-4\">
        <div>
          <h1 className="text-3xl font-display font-extrabold text-white uppercase tracking-wider flex items-center gap-2">
            <Sparkles className="h-6 w-6 text-amber-400" />
            Administrative CMS Portal
          </h1>
          <p className="text-xs text-emerald-100/50 mt-1">Manage database objects, dynamic configuration and search optimization.</p>
        </div>
        <button
          onClick={fetchData}
          className="px-4 py-2 bg-emerald-950/40 border border-emerald-500/20 rounded-lg hover:bg-emerald-950/80 transition-all text-xs font-semibold text-emerald-300"
        >
          Refresh Metrics
        </button>
      </div>
      {loading ? (
        <div className="flex justify-center items-center py-20">
          <Loader2 className="h-10 w-10 text-amber-400 animate-spin" />
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-8">
          {/* 1. TAB: DASHBOARD (METRICS & CONFIG) */}
          {activeTab === "dashboard" && (
            <div className="space-y-8 animate-fadeIn">
              <div className="grid grid-cols-2 md:grid-cols-6 gap-4">
                {[
                  { label: "Articles", val: articles.length, icon: FileText, color: "text-blue-400" },
                  { label: "Profiles (Approved)", val: personalities.filter(p => p.status !== 'pending').length, icon: User, color: "text-emerald-400" },
                  { label: "Pending Nominees", val: personalities.filter(p => p.status === 'pending').length, icon: Clock, color: "text-amber-400" },
                  { label: "Events", val: events.length, icon: Calendar, color: "text-teal-400" },
                  { label: "Gallery", val: gallery.length, icon: ImageIcon, color: "text-purple-400" },
                  { label: "Subscribers", val: subscribers.length, icon: Mail, color: "text-rose-400" },
                ].map((stat, idx) => {
                  const Icon = stat.icon;
                  return (
                    <div key={idx} className={`p-4 rounded-xl border border-emerald-500/10 bg-emerald-950/10 ${stat.color} backdrop-blur-md`}>
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-[10px] font-medium uppercase tracking-wider text-emerald-100/70">{stat.label}</span>
                        <Icon className="h-4 w-4" />
                      </div>
                      <span className="text-2xl font-display font-extrabold text-white">{stat.val}</span>
                    </div>
                  );
                })}
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Site Configuration form */}
                <form onSubmit={handleUpdateConfig} className="p-6 rounded-2xl bg-emerald-950/15 border border-emerald-500/10 flex flex-col gap-4">
                  <h2 className="text-sm font-bold text-amber-400 flex items-center gap-1.5 border-b border-emerald-500/10 pb-2 uppercase tracking-wide">
                    <Settings className="h-4 w-4" /> Platform Copy & Images Config
                  </h2>
                  <div>
                    <label className="text-xs text-neutral-300 block mb-1">Headline Text</label>
                    <input type="text" value={siteConfig.headline} onChange={(e) => setSiteConfig({ ...siteConfig, headline: e.target.value })} required className="w-full bg-emerald-990/60 border border-emerald-500/20 rounded-lg p-2.5 text-sm text-white" />
                  </div>
                  <div>
                    <label className="text-xs text-neutral-300 block mb-1">Subheadline Subtitle</label>
                    <textarea value={siteConfig.subheadline} onChange={(e) => setSiteConfig({ ...siteConfig, subheadline: e.target.value })} required rows={2} className="w-full bg-emerald-990/60 border border-emerald-500/20 rounded-lg p-2.5 text-sm text-white" />
                  </div>
                  <div>
                    <label className="text-xs text-neutral-300 block mb-1">Hero Image URL</label>
                    <div className="flex gap-2">
                      <input type="text" value={siteConfig.heroImageUrl} onChange={(e) => setSiteConfig({ ...siteConfig, heroImageUrl: e.target.value })} className="flex-grow bg-emerald-990/60 border border-emerald-500/20 rounded-lg p-2.5 text-sm text-white" />
                      <label className="bg-emerald-950/40 hover:bg-emerald-900 border border-emerald-500/20 px-3 flex items-center rounded-lg cursor-pointer text-xs font-bold text-emerald-300">
                        {uploading === "heroImg" ? <Loader2 className="h-4 w-4 animate-spin" /> : <Upload className="h-4 w-4" />}
                        <input type="file" className="hidden" onChange={(e) => uploadFile(e, "heroImg", (url) => setSiteConfig(prev => ({ ...prev, heroImageUrl: url })))} />
                      </label>
                    </div>
                  </div>
                  <button type="submit" className="py-2.5 rounded-lg bg-amber-400 hover:bg-amber-300 text-emerald-950 font-bold transition-all text-xs uppercase tracking-wide">
                    Save Config
                  </button>
                </form>
                {/* Security Pass Form */}
                <form onSubmit={handleUpdatePassword} className="p-6 rounded-2xl bg-emerald-950/15 border border-emerald-500/10 flex flex-col gap-4 h-fit">
                  <h2 className="text-sm font-bold text-amber-400 flex items-center gap-1.5 border-b border-emerald-500/10 pb-2 uppercase tracking-wide">
                    <Lock className="h-4 w-4" /> Administrative Passcode
                  </h2>
                  <div>
                    <label className="text-xs text-neutral-300 block mb-1">New CMS Password</label>
                    <input type="password" value={securityForm.newPassword} onChange={(e) => setSecurityForm({ newPassword: e.target.value })} required className="w-full bg-emerald-990/60 border border-emerald-500/20 rounded-lg p-2.5 text-sm text-white" />
                  </div>
                  <button type="submit" className="py-2.5 rounded-lg bg-emerald-950 border border-emerald-500/20 hover:bg-emerald-900 text-emerald-300 font-bold transition-all text-xs uppercase tracking-wide">
                    Update Credentials
                  </button>
                </form>
              </div>
            </div>
          )}
          {/* 2. TAB: PERSONALITIES */}
          {activeTab === "personalities" && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 animate-fadeIn">
              <form onSubmit={handleSavePersonality} className="p-6 rounded-2xl bg-emerald-950/15 border border-emerald-500/10 flex flex-col gap-4 md:col-span-1 h-fit">
                <h2 className="text-sm font-bold text-amber-400 flex items-center justify-between border-b border-emerald-500/10 pb-2 uppercase tracking-wide">
                  <span>{editPersSlug ? "Edit Profile" : "Add Profile"}</span>
                  {editPersSlug && <button type="button" onClick={() => { setEditPersSlug(null); setPersForm({ name: "", category: "Science", biography: "", achievements: "", images: "", profilePicture: "", birthDate: "", deathDate: "", company: "", website: "", linkedin: "", twitter: "", contact: "", isDeceased: "no" }); }} className="text-xs text-rose-400">Cancel</button>}
                </h2>
                <input type="text" placeholder="Full Name" value={persForm.name} onChange={(e) => setPersForm({ ...persForm, name: e.target.value })} required className="w-full bg-emerald-990/60 border border-emerald-500/20 rounded-lg p-2.5 text-sm text-white" />
                <select value={persForm.category} onChange={(e) => setPersForm({ ...persForm, category: e.target.value })} className="w-full bg-emerald-990 border border-emerald-500/20 rounded-lg p-2.5 text-sm text-emerald-300">
                  <option value="Science">Science</option>
                  <option value="Philanthropy">Philanthropy</option>
                  <option value="Sports">Sports</option>
                  <option value="Entrepreneurs">Entrepreneurs</option>
                  <option value="Leadership">Leadership</option>
                  <option value="Literature">Literature</option>
                  <option value="Technology">Technology</option>
                </select>
                <textarea placeholder="Biography (Markdown/Rich text)" value={persForm.biography} onChange={(e) => setPersForm({ ...persForm, biography: e.target.value })} required rows={5} className="w-full bg-emerald-990/60 border border-emerald-500/20 rounded-lg p-2.5 text-sm text-white" />
                <div>
                  <label className="text-xs text-neutral-300 block mb-1">Profile Picture</label>
                  <div className="flex gap-2">
                    <input type="text" placeholder="Profile Pic URL" value={persForm.profilePicture} onChange={(e) => setPersForm({ ...persForm, profilePicture: e.target.value })} className="flex-grow bg-emerald-990/60 border border-emerald-500/20 rounded-lg p-2.5 text-sm text-white" />
                    <label className="bg-emerald-950/40 hover:bg-emerald-900 border border-emerald-500/20 px-3 flex items-center rounded-lg cursor-pointer text-xs font-bold text-emerald-300">
                      {uploading === "persPic" ? <Loader2 className="h-4 w-4 animate-spin" /> : <Upload className="h-4 w-4" />}
                      <input type="file" className="hidden" onChange={(e) => uploadFile(e, "persPic", (url) => setPersForm(prev => ({ ...prev, profilePicture: url })))} />
                    </label>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-[10px] text-neutral-300 block mb-0.5">Birth Date</label>
                    <input type="date" value={persForm.birthDate} onChange={(e) => setPersForm({ ...persForm, birthDate: e.target.value })} className="w-full bg-emerald-990/60 border border-emerald-500/20 rounded-lg p-2 text-xs text-white" />
                  </div>
                  <div>
                    <label className="text-[10px] text-neutral-300 block mb-0.5">Life Status</label>
                    <select value={persForm.isDeceased} onChange={(e) => {
                      const val = e.target.value;
                      setPersForm({ 
                        ...persForm, 
                        isDeceased: val,
                        deathDate: val === "no" ? "" : persForm.deathDate 
                      });
                    }} className="w-full bg-[#030e07] border border-emerald-500/20 rounded-lg p-2 text-xs text-emerald-300">
                      <option value="no">Living / Active</option>
                      <option value="yes">Deceased</option>
                    </select>
                  </div>
                </div>
                {persForm.isDeceased === "yes" && (
                  <div>
                    <label className="text-[10px] text-neutral-300 block mb-0.5">Death Date</label>
                    <input type="date" value={persForm.deathDate} onChange={(e) => setPersForm({ ...persForm, deathDate: e.target.value })} className="w-full bg-emerald-990/60 border border-emerald-500/20 rounded-lg p-2 text-xs text-white" />
                  </div>
                )}
                <input type="text" placeholder="Associated Organization" value={persForm.company} onChange={(e) => setPersForm({ ...persForm, company: e.target.value })} className="w-full bg-emerald-990/60 border border-emerald-500/20 rounded-lg p-2.5 text-xs text-white" />
                <input type="url" placeholder="Official Website Link" value={persForm.website} onChange={(e) => setPersForm({ ...persForm, website: e.target.value })} className="w-full bg-emerald-990/60 border border-emerald-500/20 rounded-lg p-2.5 text-xs text-white" />
                <input type="url" placeholder="LinkedIn Profile Link" value={persForm.linkedin} onChange={(e) => setPersForm({ ...persForm, linkedin: e.target.value })} className="w-full bg-emerald-990/60 border border-emerald-500/20 rounded-lg p-2.5 text-xs text-white" />
                <input type="url" placeholder="X / Twitter Link" value={persForm.twitter} onChange={(e) => setPersForm({ ...persForm, twitter: e.target.value })} className="w-full bg-emerald-990/60 border border-emerald-500/20 rounded-lg p-2.5 text-xs text-white" />
                <input type="text" placeholder="Contact Email / Phone" value={persForm.contact} onChange={(e) => setPersForm({ ...persForm, contact: e.target.value })} className="w-full bg-emerald-990/60 border border-emerald-500/20 rounded-lg p-2.5 text-xs text-white" />
                <button type="submit" className="w-full py-2.5 rounded-lg bg-amber-400 hover:bg-amber-300 text-emerald-950 font-bold transition-all text-xs uppercase tracking-wide">
                  {editPersSlug ? "Update Profile" : "Save Profile"}
                </button>
              </form>
              <div className="md:col-span-2 space-y-4">
                <h2 className="text-sm font-bold text-white border-b border-emerald-500/10 pb-2 uppercase tracking-wide">Profiles Directory</h2>
                <div className="space-y-2 max-h-[600px] overflow-y-auto pr-2">
                  {personalities.filter((p) => p.status !== 'pending').map((p) => (
                    <div key={p.slug} className="flex items-center justify-between p-3 rounded-xl border bg-emerald-950/20 border-emerald-500/10">
                      <div className="flex items-center gap-3">
                        <img src={p.profilePicture || p.images?.[0] || "/logo.jpg"} alt={p.name} className="w-10 h-10 rounded-full object-cover border border-emerald-500/20" />
                        <div>
                          <h4 className="font-bold text-white text-sm">{p.name}</h4>
                          <span className="text-[10px] text-neutral-400 uppercase tracking-wider">{p.category} • Approved</span>
                        </div>
                      </div>
                      <div className="flex gap-1.5">
                        <button onClick={() => startEditPersonality(p)} className="p-1.5 bg-emerald-500/10 hover:bg-emerald-500/20 rounded text-emerald-400"><Edit3 className="h-3.5 w-3.5" /></button>
                        <button onClick={async () => {
                          if (confirm("Delete profile?")) {
                            await fetch(`/api/personalities/${p.slug}`, { method: "DELETE" });
                            fetchData();
                          }
                        }} className="p-1.5 bg-rose-500/10 hover:bg-rose-500/20 rounded text-rose-400"><Trash2 className="h-3.5 w-3.5" /></button>
                      </div>
                    </div>
                  ))}
                </div>
                {/* Pagination Controls */}
                {persTotalPages > 1 && (
                  <div className="flex justify-between items-center mt-4 border-t border-emerald-500/10 pt-4">
                    <button
                      onClick={() => fetchPersonalities(persPage - 1)}
                      disabled={persPage === 1}
                      className="px-3 py-1.5 bg-emerald-950/40 border border-emerald-500/20 rounded-lg text-xs text-emerald-100 disabled:opacity-50 hover:bg-emerald-900 transition-all font-semibold"
                    >
                      Previous
                    </button>
                    <span className="text-xs text-emerald-100/50">Page {persPage} of {persTotalPages}</span>
                    <button
                      onClick={() => fetchPersonalities(persPage + 1)}
                      disabled={persPage === persTotalPages}
                      className="px-3 py-1.5 bg-emerald-950/40 border border-emerald-500/20 rounded-lg text-xs text-emerald-100 disabled:opacity-50 hover:bg-emerald-900 transition-all font-semibold"
                    >
                      Next
                    </button>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* TAB: PENDING NOMINEES */}
          {activeTab === "pending" && (
            <div className="space-y-6 animate-fadeIn max-w-4xl">
              <div className="flex items-center justify-between border-b border-emerald-500/10 pb-4">
                <div>
                  <h2 className="text-xl font-display font-extrabold text-white">Pending Nomination Submissions</h2>
                  <p className="text-xs text-emerald-100/50 mt-1">Review nominated profiles, contact details for payment verification, and publish profiles.</p>
                </div>
              </div>

              <div className="space-y-4">
                {personalities.filter(p => p.status === 'pending').length === 0 ? (
                  <div className="p-12 text-center rounded-2xl bg-emerald-950/5 border border-emerald-500/10 text-neutral-500 text-sm">
                    No pending profile nominations to review.
                  </div>
                ) : (
                  personalities.filter(p => p.status === 'pending').map((p) => (
                    <div key={p.slug} className="p-6 rounded-2xl bg-emerald-950/15 border border-emerald-500/15 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                      <div className="flex items-start gap-4 flex-grow">
                        <img src={p.profilePicture || p.images?.[0] || "/logo.jpg"} alt={p.name} className="w-16 h-16 rounded-xl object-cover border border-emerald-500/20 shrink-0" />
                        <div className="space-y-1">
                          <div className="flex items-center gap-2">
                            <h3 className="font-bold text-white text-base leading-snug">{p.name}</h3>
                            <span className="text-[9px] font-bold bg-amber-400/20 text-amber-400 px-2 py-0.5 rounded-full uppercase tracking-wider">{p.category}</span>
                          </div>
                          <p className="text-xs text-emerald-100/60 line-clamp-2">{p.biography}</p>
                          {p.socialLinks?.contact && (
                            <div className="flex items-center gap-1.5 text-xs text-amber-400 font-bold bg-amber-400/5 border border-amber-400/10 px-2.5 py-1 rounded-lg w-fit mt-2">
                              <Mail className="h-3.5 w-3.5" />
                              <span>Contact Info: {p.socialLinks.contact}</span>
                            </div>
                          )}
                        </div>
                      </div>
                      <div className="flex gap-2.5 w-full md:w-auto justify-end border-t md:border-t-0 border-emerald-500/5 pt-4 md:pt-0 shrink-0">
                        <button
                          onClick={() => {
                            fetch(`/api/personalities/${p.slug}`, {
                              method: "PUT",
                              headers: { "Content-Type": "application/json" },
                              body: JSON.stringify({ status: "approved" }),
                            }).then(fetchData);
                          }}
                          className="px-4 py-2 bg-amber-400 hover:bg-amber-300 text-emerald-950 font-bold text-xs rounded-xl uppercase tracking-wider flex items-center gap-1"
                        >
                          <CheckCircle className="h-4 w-4" /> Approve
                        </button>
                        <button
                          onClick={async () => {
                            if (confirm("Delete this nomination submission?")) {
                              await fetch(`/api/personalities/${p.slug}`, { method: "DELETE" });
                              fetchData();
                            }
                          }}
                          className="px-4 py-2 bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 font-semibold text-xs rounded-xl uppercase tracking-wider flex items-center gap-1"
                        >
                          <Trash2 className="h-4 w-4" /> Decline
                        </button>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          )}

          {/* 3. TAB: ARTICLES */}
          {activeTab === "articles" && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 animate-fadeIn">
              <form onSubmit={handleSaveArticle} className="p-6 rounded-2xl bg-emerald-950/15 border border-emerald-500/10 flex flex-col gap-4 md:col-span-1 h-fit">
                <h2 className="text-sm font-bold text-amber-400 flex items-center justify-between border-b border-emerald-500/10 pb-2 uppercase tracking-wide">
                  <span>{editArtSlug ? "Edit Article" : "Write Article"}</span>
                  {editArtSlug && <button type="button" onClick={() => { setEditArtSlug(null); setArtForm({ title: "", category: "History", subtitle: "", content: "", heroImage: "" }); }} className="text-xs text-rose-400">Cancel</button>}
                </h2>
                <input type="text" placeholder="Article Title" value={artForm.title} onChange={(e) => setArtForm({ ...artForm, title: e.target.value })} required className="w-full bg-emerald-990/60 border border-emerald-500/20 rounded-lg p-2.5 text-sm text-white" />
                <select value={artForm.category} onChange={(e) => setArtForm({ ...artForm, category: e.target.value })} className="w-full bg-emerald-990 border border-emerald-500/20 rounded-lg p-2.5 text-sm text-emerald-300">
                  <option value="History">History</option>
                  <option value="Tourism">Tourism</option>
                  <option value="Culture">Culture</option>
                  <option value="Business">Business</option>
                </select>
                <div>
                  <label className="text-xs text-neutral-300 block mb-1">Hero Image</label>
                  <div className="flex gap-2">
                    <input type="text" placeholder="Hero Image URL" value={artForm.heroImage} onChange={(e) => setArtForm({ ...artForm, heroImage: e.target.value })} className="flex-grow bg-emerald-990/60 border border-emerald-500/20 rounded-lg p-2.5 text-sm text-white" />
                    <label className="bg-emerald-950/40 hover:bg-emerald-900 border border-emerald-500/20 px-3 flex items-center rounded-lg cursor-pointer text-xs font-bold text-emerald-300">
                      {uploading === "artImg" ? <Loader2 className="h-4 w-4 animate-spin" /> : <Upload className="h-4 w-4" />}
                      <input type="file" className="hidden" onChange={(e) => uploadFile(e, "artImg", (url) => setArtForm(prev => ({ ...prev, heroImage: url })))} />
                    </label>
                  </div>
                </div>
                <textarea placeholder="Write article content..." value={artForm.content} onChange={(e) => setArtForm({ ...artForm, content: e.target.value })} required rows={6} className="w-full bg-emerald-990/60 border border-emerald-500/20 rounded-lg p-2.5 text-sm text-white" />
                <button type="submit" className="w-full py-2.5 rounded-lg bg-teal-500 hover:bg-teal-400 text-emerald-950 font-bold transition-all text-xs uppercase tracking-wide">
                  {editArtSlug ? "Update & Save" : "Publish Article"}
                </button>
              </form>
              <div className="md:col-span-2 space-y-4">
                <h2 className="text-sm font-bold text-white border-b border-emerald-500/10 pb-2 uppercase tracking-wide">Published Articles</h2>
                <div className="space-y-2 max-h-[600px] overflow-y-auto pr-2">
                  {articles.map((art) => (
                    <div key={art.slug} className="flex justify-between items-center p-3 rounded-xl bg-emerald-950/20 border border-emerald-500/10">
                      <div>
                        <h4 className="font-bold text-white text-sm">{art.title}</h4>
                        <span className="text-[10px] text-neutral-400 uppercase tracking-wider">{art.category} • Published {new Date(art.publishedAt).toLocaleDateString()}</span>
                      </div>
                      <div className="flex gap-1.5">
                        <button onClick={() => startEditArticle(art)} className="p-1.5 bg-emerald-500/10 hover:bg-emerald-500/20 rounded text-emerald-400"><Edit3 className="h-3.5 w-3.5" /></button>
                        <button onClick={async () => {
                          if (confirm("Delete article?")) {
                            await fetch(`/api/articles/${art.slug}`, { method: "DELETE" });
                            fetchData();
                          }
                        }} className="p-1.5 bg-rose-500/10 hover:bg-rose-500/20 rounded text-rose-400"><Trash2 className="h-3.5 w-3.5" /></button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
          {/* 4. TAB: EVENTS */}
          {activeTab === "events" && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 animate-fadeIn">
              <form onSubmit={handleSaveEvent} className="p-6 rounded-2xl bg-emerald-950/15 border border-emerald-500/10 flex flex-col gap-4 md:col-span-1 h-fit">
                <h2 className="text-sm font-bold text-amber-400 flex items-center justify-between border-b border-emerald-500/10 pb-2 uppercase tracking-wide">
                  <span>{editEventId ? "Edit Event" : "Create Event"}</span>
                  {editEventId && <button type="button" onClick={() => { setEditEventId(null); setEventForm({ title: "", date: "", description: "", location: "", status: "upcoming" }); }} className="text-xs text-rose-400">Cancel</button>}
                </h2>
                <input type="text" placeholder="Event Title" value={eventForm.title} onChange={(e) => setEventForm({ ...eventForm, title: e.target.value })} required className="w-full bg-emerald-990/60 border border-emerald-500/20 rounded-lg p-2.5 text-sm text-white" />
                <input type="date" value={eventForm.date} onChange={(e) => setEventForm({ ...eventForm, date: e.target.value })} required className="w-full bg-emerald-990/60 border border-emerald-500/20 rounded-lg p-2.5 text-sm text-emerald-300" />
                <select value={eventForm.status} onChange={(e) => setEventForm({ ...eventForm, status: e.target.value })} className="w-full bg-emerald-990 border border-emerald-500/20 rounded-lg p-2.5 text-sm text-emerald-300">
                  <option value="upcoming">Upcoming Event</option>
                  <option value="past">Past Event</option>
                </select>
                <button type="submit" className="w-full py-2.5 rounded-lg bg-teal-500 hover:bg-teal-400 text-emerald-950 font-bold transition-all text-xs uppercase tracking-wide">
                  {editEventId ? "Update Event" : "Schedule Event"}
                </button>
              </form>
              <div className="md:col-span-2 space-y-4">
                <h2 className="text-sm font-bold text-white border-b border-emerald-500/10 pb-2 uppercase tracking-wide">Scheduled Events</h2>
                <div className="space-y-2 max-h-[600px] overflow-y-auto pr-2">
                  {events.map((ev) => (
                    <div key={ev._id} className="flex items-center justify-between p-3 rounded-xl bg-emerald-950/20 border border-emerald-500/10">
                      <div>
                        <h4 className="font-bold text-white text-sm">{ev.title}</h4>
                        <span className="text-[10px] text-neutral-400 uppercase tracking-wider">{ev.status} • {new Date(ev.date).toLocaleDateString()}</span>
                      </div>
                      <div className="flex gap-1.5">
                        <button onClick={() => startEditEvent(ev)} className="p-1.5 bg-emerald-500/10 hover:bg-emerald-500/20 rounded text-emerald-400"><Edit3 className="h-3.5 w-3.5" /></button>
                        <button onClick={async () => {
                          if (confirm("Delete event?")) {
                            await fetch(`/api/events/${ev._id}`, { method: "DELETE" });
                            fetchData();
                          }
                        }} className="p-1.5 bg-rose-500/10 hover:bg-rose-500/20 rounded text-rose-400"><Trash2 className="h-3.5 w-3.5" /></button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
          {/* 5. TAB: GALLERY */}
          {activeTab === "gallery" && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 animate-fadeIn">
              <form onSubmit={handleSaveGallery} className="p-6 rounded-2xl bg-emerald-950/15 border border-emerald-500/10 flex flex-col gap-4 md:col-span-1 h-fit">
                <h2 className="text-sm font-bold text-amber-400 flex items-center justify-between border-b border-emerald-500/10 pb-2 uppercase tracking-wide">
                  <span>{editGalleryId ? "Edit Item" : "Upload Photo"}</span>
                  {editGalleryId && <button type="button" onClick={() => { setEditGalleryId(null); setGalleryForm({ title: "", category: "", imageUrl: "" }); }} className="text-xs text-rose-400">Cancel</button>}
                </h2>
                <input type="text" placeholder="Title" value={galleryForm.title} onChange={(e) => setGalleryForm({ ...galleryForm, title: e.target.value })} required className="w-full bg-emerald-990/60 border border-emerald-500/20 rounded-lg p-2.5 text-sm text-white" />
                <input type="text" placeholder="Category" value={galleryForm.category} onChange={(e) => setGalleryForm({ ...galleryForm, category: e.target.value })} required className="w-full bg-emerald-990/60 border border-emerald-500/20 rounded-lg p-2.5 text-sm text-white" />
                <div>
                  <label className="text-xs text-neutral-300 block mb-1">Image URL</label>
                  <div className="flex gap-2">
                    <input type="text" placeholder="Image URL" value={galleryForm.imageUrl} onChange={(e) => setGalleryForm({ ...galleryForm, imageUrl: e.target.value })} required className="flex-grow bg-emerald-990/60 border border-emerald-500/20 rounded-lg p-2.5 text-sm text-white" />
                    <label className="bg-emerald-950/40 hover:bg-emerald-900 border border-emerald-500/20 px-3 flex items-center rounded-lg cursor-pointer text-xs font-bold text-emerald-300">
                      {uploading === "gallery" ? <Loader2 className="h-4 w-4 animate-spin" /> : <Upload className="h-4 w-4" />}
                      <input type="file" className="hidden" onChange={(e) => uploadFile(e, "gallery", (url) => setGalleryForm(prev => ({ ...prev, imageUrl: url })))} />
                    </label>
                  </div>
                </div>
                <button type="submit" className="w-full py-2.5 rounded-lg bg-purple-500 hover:bg-purple-400 text-white font-bold transition-all text-xs uppercase tracking-wide">
                  {editGalleryId ? "Update Photo" : "Upload to Archive"}
                </button>
              </form>
              <div className="md:col-span-2 space-y-4">
                <h2 className="text-sm font-bold text-white border-b border-emerald-500/10 pb-2 uppercase tracking-wide">Photo Archive Gallery</h2>
                <div className="space-y-2 max-h-[600px] overflow-y-auto pr-2">
                  {gallery.map((g) => (
                    <div key={g._id} className="flex justify-between items-center p-3 rounded-xl bg-emerald-950/20 border border-emerald-500/10">
                      <div className="flex items-center gap-3">
                        <img src={g.imageUrl} alt={g.title} className="w-10 h-10 rounded object-cover border border-emerald-500/20" />
                        <div>
                          <h4 className="font-bold text-white text-sm">{g.title}</h4>
                          <span className="text-[10px] text-neutral-400 uppercase tracking-wider">{g.category}</span>
                        </div>
                      </div>
                      <div className="flex gap-1.5">
                        <button onClick={() => startEditGallery(g)} className="p-1.5 bg-emerald-500/10 hover:bg-emerald-500/20 rounded text-emerald-400"><Edit3 className="h-3.5 w-3.5" /></button>
                        <button onClick={async () => {
                          if (confirm("Delete gallery item?")) {
                            await fetch(`/api/gallery/${g._id}`, { method: "DELETE" });
                            fetchData();
                          }
                        }} className="p-1.5 bg-rose-500/10 hover:bg-rose-500/20 rounded text-rose-400"><Trash2 className="h-3.5 w-3.5" /></button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
          {/* 6. TAB: SUBSCRIBERS */}
          {activeTab === "subscribers" && (
            <div className="space-y-4 animate-fadeIn max-w-2xl">
              <h2 className="text-sm font-bold text-white border-b border-emerald-500/10 pb-2 uppercase tracking-wide">Newsletter Subscribers</h2>
              <div className="space-y-2 max-h-[600px] overflow-y-auto pr-2">
                {subscribers.length === 0 ? (
                  <p className="text-xs text-neutral-500">No active newsletter subscribers.</p>
                ) : (
                  subscribers.map((sub, idx) => (
                    <div key={idx} className="flex justify-between items-center p-3 rounded-xl bg-emerald-950/20 border border-emerald-500/10">
                      <span className="text-sm font-medium text-white">{sub.email}</span>
                      <button onClick={async () => {
                        if (confirm(`Remove subscriber: ${sub.email}?`)) {
                          await fetch("/api/newsletter", {
                            method: "DELETE",
                            headers: { "Content-Type": "application/json" },
                            body: JSON.stringify({ email: sub.email })
                          });
                          fetchData();
                        }
                      }} className="p-1.5 bg-rose-500/10 hover:bg-rose-500/20 rounded text-rose-400"><Trash2 className="h-3.5 w-3.5" /></button>
                    </div>
                  ))
                )}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
export default function AdminDashboard() {
  return (
    <Suspense fallback={
      <div className="flex justify-center items-center py-20">
        <Loader2 className="h-10 w-10 text-amber-400 animate-spin" />
      </div>
    }>
      <CMSContent />
    </Suspense>
  );
}

