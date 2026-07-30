"use client";

import { useState, useEffect } from "react";
import { 
  BarChart3, User, Calendar, FileText, PlusCircle, CheckCircle, 
  Sparkles, Loader2, Settings, Lock, Trash2, Edit3, Upload, Mail, Image as ImageIcon 
} from "lucide-react";

export default function AdminDashboard() {
  const [personalities, setPersonalities] = useState<any[]>([]);
  const [articles, setArticles] = useState<any[]>([]);
  const [subscribers, setSubscribers] = useState<any[]>([]);
  const [events, setEvents] = useState<any[]>([]);
  const [gallery, setGallery] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState<string | null>(null);
  const [persPage, setPersPage] = useState(1);
  const [persTotalPages, setPersTotalPages] = useState(1);

  // Forms
  const [persForm, setPersForm] = useState({ name: "", category: "Science", biography: "", achievements: "", images: "", profilePicture: "" });
  const [artForm, setArtForm] = useState({ title: "", category: "History", subtitle: "", content: "", heroImage: "" });
  const [eventForm, setEventForm] = useState({ title: "", date: "", description: "", location: "", status: "upcoming" });
  const [galleryForm, setGalleryForm] = useState({ title: "", category: "", imageUrl: "" });
  
  // Edit Tracking
  const [editPersSlug, setEditPersSlug] = useState<string | null>(null);
  const [editArtSlug, setEditArtSlug] = useState<string | null>(null);
  const [editEventId, setEditEventId] = useState<string | null>(null);
  const [editGalleryId, setEditGalleryId] = useState<string | null>(null);

  // Site Config & Security
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
  }, []);

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

  // --- CRUD: Personalities ---
  const handleSavePersonality = async (e: React.FormEvent) => {
    e.preventDefault();
    const achievementsArray = persForm.achievements.split(",").map((s) => s.trim()).filter(Boolean);
    const imagesArray = persForm.images.split(",").map((s) => s.trim()).filter(Boolean);
    const slug = persForm.name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");

    const payload = { ...persForm, achievements: achievementsArray, images: imagesArray, slug, featured: true, status: "approved" };

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

    setPersForm({ name: "", category: "Science", biography: "", achievements: "", images: "", profilePicture: "" });
    fetchData();
  };

  const startEditPersonality = (p: any) => {
    setEditPersSlug(p.slug);
    setPersForm({
      name: p.name,
      category: p.category,
      biography: p.biography,
      achievements: Array.isArray(p.achievements) ? p.achievements.join(", ") : "",
      images: Array.isArray(p.images) ? p.images.join(", ") : "",
      profilePicture: p.profilePicture || "",
    });
  };

  const handleDeletePersonality = async (slug: string) => {
    if (confirm("Are you sure you want to delete this profile?")) {
      await fetch(`/api/personalities/${slug}`, { method: "DELETE" });
      fetchData();
    }
  };

  const handleApprovePersonality = async (slug: string) => {
    await fetch(`/api/personalities/${slug}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status: "approved" }),
    });
    fetchData();
  };

  // --- CRUD: Articles (News) ---
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
    } else {
      await fetch("/api/articles", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
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

  // --- CRUD: Events ---
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

  const handleDeleteEvent = async (id: string) => {
    if (confirm("Delete this event?")) {
      await fetch(`/api/events/${id}`, { method: "DELETE" });
      fetchData();
    }
  };

  // --- CRUD: Gallery ---
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

  const startEditGallery = (g: any) => {
    setEditGalleryId(g._id);
    setGalleryForm({
      title: g.title,
      category: g.category,
      imageUrl: g.imageUrl,
    });
  };

  const handleDeleteGallery = async (id: string) => {
    if (confirm("Delete this gallery item?")) {
      await fetch(`/api/gallery/${id}`, { method: "DELETE" });
      fetchData();
    }
  };

  const handleDeleteSubscriber = async (email: string) => {
    if (confirm(`Remove subscriber: ${email}?`)) {
      await fetch("/api/newsletter", { method: "DELETE", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ email }) });
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
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-12">
            {[ 
              { label: "Articles", val: articles.length, icon: FileText, color: "text-blue-400" },
              { label: "Profiles", val: personalities.length, icon: User, color: "text-amber-400" },
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
                  <span className="text-2xl font-display font-extrabold">{stat.val}</span>
                </div>
              );
            })}
          </div>

          {/* Forms Section */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            
            {/* 1. Add/Edit Personality */}
            <form onSubmit={handleSavePersonality} className="p-6 rounded-2xl bg-emerald-950/15 border border-emerald-500/10 flex flex-col gap-4">
              <h2 className="text-lg font-bold text-emerald-300 flex items-center justify-between border-b border-emerald-500/10 pb-2">
                <span className="flex items-center gap-1.5"><PlusCircle className="h-5 w-5 text-amber-400" /> {editPersSlug ? "Edit Profile Feature" : "Add Featured Profile"}</span>
                {editPersSlug && <button type="button" onClick={() => { setEditPersSlug(null); setPersForm({ name: "", category: "Science", biography: "", achievements: "", images: "", profilePicture: "" }); }} className="text-xs text-rose-400">Cancel Edit</button>}
              </h2>
              <input type="text" placeholder="Full Name" value={persForm.name} onChange={(e) => setPersForm({ ...persForm, name: e.target.value })} required className="w-full bg-emerald-990/60 border border-emerald-500/20 rounded-lg p-2.5 text-sm" />
              <select value={persForm.category} onChange={(e) => setPersForm({ ...persForm, category: e.target.value })} className="w-full bg-emerald-990 border border-emerald-500/20 rounded-lg p-2.5 text-sm">
                <option value="Science">Science</option>
                <option value="Philanthropy">Philanthropy</option>
                <option value="Sports">Sports</option>
                <option value="Entrepreneurs">Entrepreneurs</option>
                <option value="Leadership">Leadership</option>
                <option value="Literature">Literature</option>
                <option value="Technology">Technology</option>
              </select>
              <textarea placeholder="Biography (Markdown/Rich text supported)" value={persForm.biography} onChange={(e) => setPersForm({ ...persForm, biography: e.target.value })} required rows={4} className="w-full bg-emerald-990/60 border border-emerald-500/20 rounded-lg p-2.5 text-sm" />
              <div>
                <label className="text-xs text-neutral-300 block mb-1">Profile Picture URL</label>
                <div className="flex gap-2">
                  <input type="text" placeholder="Profile Pic URL" value={persForm.profilePicture} onChange={(e) => setPersForm({ ...persForm, profilePicture: e.target.value })} className="flex-grow bg-emerald-990/60 border border-emerald-500/20 rounded-lg p-2.5 text-sm" />
                  <label className="bg-amber-400 hover:bg-amber-300 text-emerald-950 px-3 flex items-center rounded-lg cursor-pointer text-xs font-bold">
                    {uploading === "persPic" ? <Loader2 className="h-4 w-4 animate-spin" /> : <Upload className="h-4 w-4" />}
                    <input type="file" className="hidden" onChange={(e) => uploadFile(e, "persPic", (url) => setPersForm({ ...persForm, profilePicture: url }))} />
                  </label>
                </div>
              </div>
              <button type="submit" className="w-full py-2.5 rounded-lg bg-amber-400 hover:bg-amber-300 text-emerald-950 font-bold transition-all text-xs">
                {editPersSlug ? "Update & Save Spotlight" : "Save & Spotlight Live"}
              </button>
            </form>

            {/* 2. Add/Edit Blog Article */}
            <form onSubmit={handleSaveArticle} className="p-6 rounded-2xl bg-emerald-950/15 border border-emerald-500/10 flex flex-col gap-4">
              <h2 className="text-lg font-bold text-emerald-300 flex items-center justify-between border-b border-emerald-500/10 pb-2">
                <span className="flex items-center gap-1.5"><PlusCircle className="h-5 w-5 text-amber-400" /> {editArtSlug ? "Edit News Article" : "Write News & Article"}</span>
                {editArtSlug && <button type="button" onClick={() => { setEditArtSlug(null); setArtForm({ title: "", category: "History", subtitle: "", content: "", heroImage: "" }); }} className="text-xs text-rose-400">Cancel Edit</button>}
              </h2>
              <input type="text" placeholder="Article Title" value={artForm.title} onChange={(e) => setArtForm({ ...artForm, title: e.target.value })} required className="w-full bg-emerald-990/60 border border-emerald-500/20 rounded-lg p-2.5 text-sm" />
              <select value={artForm.category} onChange={(e) => setArtForm({ ...artForm, category: e.target.value })} className="w-full bg-emerald-990 border border-emerald-500/20 rounded-lg p-2.5 text-sm">
                <option value="History">History</option>
                <option value="Tourism">Tourism</option>
                <option value="Culture">Culture</option>
                <option value="Business">Business</option>
              </select>
              <div>
                <label className="text-xs text-neutral-300 block mb-1">Hero Image URL</label>
                <div className="flex gap-2">
                  <input type="text" placeholder="Hero Image URL" value={artForm.heroImage} onChange={(e) => setArtForm({ ...artForm, heroImage: e.target.value })} className="flex-grow bg-emerald-990/60 border border-emerald-500/20 rounded-lg p-2.5 text-sm" />
                  <label className="bg-amber-400 hover:bg-amber-300 text-emerald-950 px-3 flex items-center rounded-lg cursor-pointer text-xs font-bold">
                    {uploading === "artImg" ? <Loader2 className="h-4 w-4 animate-spin" /> : <Upload className="h-4 w-4" />}
                    <input type="file" className="hidden" onChange={(e) => uploadFile(e, "artImg", (url) => setArtForm({ ...artForm, heroImage: url }))} />
                  </label>
                </div>
              </div>
              <textarea placeholder="Write content..." value={artForm.content} onChange={(e) => setArtForm({ ...artForm, content: e.target.value })} required rows={4} className="w-full bg-emerald-990/60 border border-emerald-500/20 rounded-lg p-2.5 text-sm" />
              <button type="submit" className="w-full py-2.5 rounded-lg bg-teal-500 hover:bg-teal-400 text-emerald-950 font-bold transition-all text-xs">
                {editArtSlug ? "Update & Save Article" : "Publish Article Live"}
              </button>
            </form>

            {/* 3. Add/Edit Events */}
            <form onSubmit={handleSaveEvent} className="p-6 rounded-2xl bg-emerald-950/15 border border-emerald-500/10 flex flex-col gap-4">
              <h2 className="text-lg font-bold text-emerald-300 flex items-center justify-between border-b border-emerald-500/10 pb-2">
                <span className="flex items-center gap-1.5"><Calendar className="h-5 w-5 text-amber-400" /> {editEventId ? "Edit Event" : "Create Event"}</span>
                {editEventId && <button type="button" onClick={() => { setEditEventId(null); setEventForm({ title: "", date: "", description: "", location: "", status: "upcoming" }); }} className="text-xs text-rose-400">Cancel Edit</button>}
              </h2>
              <input type="text" placeholder="Event Title" value={eventForm.title} onChange={(e) => setEventForm({ ...eventForm, title: e.target.value })} required className="w-full bg-emerald-990/60 border border-emerald-500/20 rounded-lg p-2.5 text-sm" />
              <input type="date" value={eventForm.date} onChange={(e) => setEventForm({ ...eventForm, date: e.target.value })} required className="w-full bg-emerald-990/60 border border-emerald-500/20 rounded-lg p-2.5 text-sm" />
              <select value={eventForm.status} onChange={(e) => setEventForm({ ...eventForm, status: e.target.value })} className="w-full bg-emerald-990 border border-emerald-500/20 rounded-lg p-2.5 text-sm">
                <option value="upcoming">Upcoming Event</option>
                <option value="past">Past Event</option>
              </select>
              <button type="submit" className="w-full py-2.5 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-emerald-950 font-bold transition-all text-xs">
                {editEventId ? "Update Event" : "Create Event"}
              </button>
            </form>

            {/* 4. Add/Edit Gallery */}
            <form onSubmit={handleSaveGallery} className="p-6 rounded-2xl bg-emerald-950/15 border border-emerald-500/10 flex flex-col gap-4">
              <h2 className="text-lg font-bold text-emerald-300 flex items-center justify-between border-b border-emerald-500/10 pb-2">
                <span className="flex items-center gap-1.5"><ImageIcon className="h-5 w-5 text-amber-400" /> {editGalleryId ? "Edit Gallery Item" : "Add Gallery Item"}</span>
                {editGalleryId && <button type="button" onClick={() => { setEditGalleryId(null); setGalleryForm({ title: "", category: "", imageUrl: "" }); }} className="text-xs text-rose-400">Cancel Edit</button>}
              </h2>
              <input type="text" placeholder="Image Title (e.g., Badshahi Mosque)" value={galleryForm.title} onChange={(e) => setGalleryForm({ ...galleryForm, title: e.target.value })} required className="w-full bg-emerald-990/60 border border-emerald-500/20 rounded-lg p-2.5 text-sm" />
              <input type="text" placeholder="Category (e.g., Heritage)" value={galleryForm.category} onChange={(e) => setGalleryForm({ ...galleryForm, category: e.target.value })} required className="w-full bg-emerald-990/60 border border-emerald-500/20 rounded-lg p-2.5 text-sm" />
              <div>
                <label className="text-xs text-neutral-300 block mb-1">Image URL</label>
                <div className="flex gap-2">
                  <input type="text" placeholder="Image URL" value={galleryForm.imageUrl} onChange={(e) => setGalleryForm({ ...galleryForm, imageUrl: e.target.value })} required className="flex-grow bg-emerald-990/60 border border-emerald-500/20 rounded-lg p-2.5 text-sm" />
                  <label className="bg-amber-400 hover:bg-amber-300 text-emerald-950 px-3 flex items-center rounded-lg cursor-pointer text-xs font-bold">
                    {uploading === "gallery" ? <Loader2 className="h-4 w-4 animate-spin" /> : <Upload className="h-4 w-4" />}
                    <input type="file" className="hidden" onChange={(e) => uploadFile(e, "gallery", (url) => setGalleryForm({ ...galleryForm, imageUrl: url }))} />
                  </label>
                </div>
              </div>
              <button type="submit" className="w-full py-2.5 rounded-lg bg-purple-500 hover:bg-purple-400 text-white font-bold transition-all text-xs">
                {editGalleryId ? "Update Gallery Item" : "Upload to Gallery"}
              </button>
            </form>

          </div>

          {/* Lists Section */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 border-t border-emerald-500/10 pt-12">
            
            {/* Personalities List */}
            <div className="space-y-4">
              <h2 className="text-lg font-display font-bold text-amber-400 border-b border-emerald-500/10 pb-2">Profiles</h2>
              <div className="space-y-2 max-h-[400px] overflow-y-auto pr-2">
                {personalities.map((p) => (
                  <div key={p.slug} className={`flex flex-col p-3 rounded-xl border ${p.status === 'pending' ? 'bg-amber-500/10 border-amber-500/20' : 'bg-emerald-950/20 border-emerald-500/10'}`}>
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <h4 className="font-bold text-white text-sm">{p.name}</h4>
                        <span className="text-[10px] text-neutral-400">{p.status === 'pending' ? 'PENDING APPROVAL' : 'APPROVED'}</span>
                      </div>
                    </div>
                    <div className="flex gap-2 justify-end mt-2">
                      {p.status === 'pending' && (
                        <button onClick={() => handleApprovePersonality(p.slug)} className="flex-1 py-1 bg-amber-500 text-emerald-950 font-bold text-xs rounded">Approve</button>
                      )}
                      <button onClick={() => startEditPersonality(p)} className="p-1.5 bg-emerald-500/10 hover:bg-emerald-500/20 rounded text-emerald-400"><Edit3 className="h-3 w-3" /></button>
                      <button onClick={() => handleDeletePersonality(p.slug)} className="p-1.5 bg-rose-500/10 hover:bg-rose-500/20 rounded text-rose-400"><Trash2 className="h-3 w-3" /></button>
                    </div>
                  </div>
                ))}
              </div>
              {/* Pagination Controls */}
              {persTotalPages > 1 && (
                <div className="flex justify-between items-center mt-2 border-t border-emerald-500/10 pt-2">
                  <button 
                    onClick={() => fetchPersonalities(persPage - 1)}
                    disabled={persPage === 1}
                    className="px-2 py-1 bg-emerald-950/40 rounded text-xs text-emerald-100 disabled:opacity-50"
                  >
                    Previous
                  </button>
                  <span className="text-[10px] text-emerald-100/50">Page {persPage} of {persTotalPages}</span>
                  <button 
                    onClick={() => fetchPersonalities(persPage + 1)}
                    disabled={persPage === persTotalPages}
                    className="px-2 py-1 bg-emerald-950/40 rounded text-xs text-emerald-100 disabled:opacity-50"
                  >
                    Next
                  </button>
                </div>
              )}
            </div>

            {/* Articles List */}
            <div className="space-y-4">
              <h2 className="text-lg font-display font-bold text-blue-400 border-b border-emerald-500/10 pb-2">Articles</h2>
              <div className="space-y-2 max-h-[400px] overflow-y-auto pr-2">
                {articles.map((art) => (
                  <div key={art.slug} className="flex justify-between items-center p-3 rounded-xl bg-emerald-950/20 border border-emerald-500/10">
                    <h4 className="font-bold text-white text-xs truncate max-w-[120px]">{art.title}</h4>
                    <div className="flex gap-2">
                      <button onClick={() => startEditArticle(art)} className="p-1.5 bg-emerald-500/10 hover:bg-emerald-500/20 rounded text-emerald-400"><Edit3 className="h-3 w-3" /></button>
                      <button onClick={() => handleDeleteArticle(art.slug)} className="p-1.5 bg-rose-500/10 hover:bg-rose-500/20 rounded text-rose-400"><Trash2 className="h-3 w-3" /></button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Events List */}
            <div className="space-y-4">
              <h2 className="text-lg font-display font-bold text-teal-400 border-b border-emerald-500/10 pb-2">Events</h2>
              <div className="space-y-2 max-h-[400px] overflow-y-auto pr-2">
                {events.map((ev) => (
                  <div key={ev._id} className="flex flex-col p-3 rounded-xl bg-emerald-950/20 border border-emerald-500/10">
                    <div className="flex justify-between mb-2">
                      <h4 className="font-bold text-white text-xs truncate">{ev.title}</h4>
                      <span className="text-[9px] uppercase text-emerald-400 bg-emerald-950 px-1 rounded">{ev.status}</span>
                    </div>
                    <div className="flex justify-between items-center mt-2">
                      <span className="text-[10px] text-neutral-500">{new Date(ev.date).toLocaleDateString()}</span>
                      <div className="flex gap-2">
                        <button onClick={() => startEditEvent(ev)} className="p-1.5 bg-emerald-500/10 hover:bg-emerald-500/20 rounded text-emerald-400"><Edit3 className="h-3 w-3" /></button>
                        <button onClick={() => handleDeleteEvent(ev._id)} className="p-1.5 bg-rose-500/10 hover:bg-rose-500/20 rounded text-rose-400"><Trash2 className="h-3 w-3" /></button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Gallery List */}
            <div className="space-y-4">
              <h2 className="text-lg font-display font-bold text-purple-400 border-b border-emerald-500/10 pb-2">Gallery</h2>
              <div className="space-y-2 max-h-[400px] overflow-y-auto pr-2">
                {gallery.map((g) => (
                  <div key={g._id} className="flex flex-col p-3 rounded-xl bg-emerald-950/20 border border-emerald-500/10">
                    <div className="flex items-center gap-3">
                      <img src={g.imageUrl} alt={g.title} className="w-10 h-10 rounded object-cover" />
                      <div className="flex-1 truncate">
                        <h4 className="font-bold text-white text-xs truncate">{g.title}</h4>
                        <span className="text-[10px] text-neutral-400">{g.category}</span>
                      </div>
                      <div className="flex flex-col gap-1">
                        <button onClick={() => startEditGallery(g)} className="p-1 bg-emerald-500/10 hover:bg-emerald-500/20 rounded text-emerald-400"><Edit3 className="h-3 w-3" /></button>
                        <button onClick={() => handleDeleteGallery(g._id)} className="p-1 bg-rose-500/10 hover:bg-rose-500/20 rounded text-rose-400"><Trash2 className="h-3 w-3" /></button>
                      </div>
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

