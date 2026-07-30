"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Loader2, Upload, User, FileText, Link as LinkIcon, Mail } from "lucide-react";

export default function SubmitProfilePage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const [formData, setFormData] = useState({
    name: "",
    category: "Entrepreneur",
    biography: "",
    profilePicture: "",
    website: "",
    socialLinks: {
      linkedin: "",
      twitter: "",
      facebook: "",
      instagram: "",
      contact: "",
    }
  });

  const categories = ["Entrepreneur", "Technology", "Arts & Culture", "Sports", "Social Work", "Education", "Healthcare", "Other"];

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    const fData = new FormData();
    fData.append("file", file);
    try {
      const res = await fetch("/api/upload", {
        method: "POST",
        body: fData,
      });
      const data = await res.json();
      if (data.secure_url) {
        setFormData({ ...formData, profilePicture: data.secure_url });
      }
    } catch (err) {
      console.error("Upload failed", err);
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const slug = formData.name.toLowerCase().replace(/[^a-z0-9]+/g, '-') + '-' + Date.now();

    try {
      const res = await fetch("/api/personalities", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          slug,
          status: "pending",
          featured: false,
          sponsored: false,
        }),
      });
      
      if (res.ok) {
        setSuccess(true);
        setTimeout(() => router.push("/personalities"), 3000);
      } else {
        const data = await res.json();
        setError(data.error || "Submission failed");
      }
    } catch (err) {
      setError("Network error occurred");
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center px-4 text-center">
        <div className="w-20 h-20 bg-amber-400/20 rounded-full flex items-center justify-center mb-6">
          <User className="h-10 w-10 text-amber-400" />
        </div>
        <h1 className="text-3xl font-display font-bold text-white mb-4">Submission Successful!</h1>
        <p className="text-emerald-100/70 max-w-md">
          Thank you for submitting your profile. Our administration team will review your details.
          You will be redirected shortly...
        </p>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-display font-extrabold tracking-tight text-white mb-4">
          Submit Your Profile
        </h1>
        <p className="text-emerald-100/60 text-sm max-w-xl mx-auto">
          Join the digital archive of Pakistan's prominent figures. Fill out the form below to submit yourself or a nominee for a featured profile.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="bg-emerald-950/20 border border-emerald-900/50 rounded-3xl p-8 space-y-8">
        {error && (
          <div className="bg-red-500/10 border border-red-500/20 text-red-400 p-4 rounded-xl text-sm">
            {error}
          </div>
        )}

        {/* Basic Info */}
        <div className="space-y-6">
          <h3 className="text-lg font-bold text-amber-400 flex items-center gap-2 border-b border-emerald-900/50 pb-2">
            <User className="h-5 w-5" /> Basic Information
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-emerald-100/70 mb-2">Full Name *</label>
              <input 
                required 
                type="text" 
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
                className="w-full bg-emerald-990/60 border border-emerald-900/50 rounded-xl px-4 py-3 text-white focus:border-amber-400 focus:outline-none"
                placeholder="e.g. Jack Lawson"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-emerald-100/70 mb-2">Category *</label>
              <select 
                value={formData.category}
                onChange={(e) => setFormData({...formData, category: e.target.value})}
                className="w-full bg-emerald-990/60 border border-emerald-900/50 rounded-xl px-4 py-3 text-white focus:border-amber-400 focus:outline-none appearance-none"
              >
                {categories.map(c => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-emerald-100/70 mb-2">Biography / Subtitle *</label>
            <textarea 
              required
              rows={3}
              value={formData.biography}
              onChange={(e) => setFormData({...formData, biography: e.target.value})}
              className="w-full bg-emerald-990/60 border border-emerald-900/50 rounded-xl px-4 py-3 text-white focus:border-amber-400 focus:outline-none"
              placeholder="UI/UX designer focused on simple, usable, & intuitive experiences."
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-emerald-100/70 mb-2">Profile Picture</label>
            <div className="flex items-center gap-6">
              <div className="h-24 w-24 rounded-2xl bg-emerald-900/30 border-2 border-dashed border-emerald-500/20 flex flex-col items-center justify-center overflow-hidden relative">
                {formData.profilePicture ? (
                  <img src={formData.profilePicture} alt="Profile" className="w-full h-full object-cover" />
                ) : (
                  <User className="h-8 w-8 text-emerald-500/40" />
                )}
                {uploading && (
                  <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
                    <Loader2 className="h-6 w-6 text-amber-400 animate-spin" />
                  </div>
                )}
              </div>
              <div className="flex-1">
                <label className="cursor-pointer bg-emerald-950 hover:bg-emerald-900 border border-emerald-500/20 text-emerald-300 text-sm px-4 py-2 rounded-lg transition-colors inline-flex items-center gap-2">
                  <Upload className="h-4 w-4" />
                  Upload Image
                  <input type="file" className="hidden" accept="image/*" onChange={handleUpload} disabled={uploading} />
                </label>
                <p className="text-xs text-emerald-100/40 mt-2">Recommended: 800x800px, max 5MB.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Social Links */}
        <div className="space-y-6">
          <h3 className="text-lg font-bold text-amber-400 flex items-center gap-2 border-b border-emerald-900/50 pb-2">
            <LinkIcon className="h-5 w-5" /> Online Presence (Optional)
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-xs font-medium text-emerald-100/70 mb-1">LinkedIn URL</label>
              <input 
                type="url" 
                value={formData.socialLinks.linkedin}
                onChange={(e) => setFormData({...formData, socialLinks: {...formData.socialLinks, linkedin: e.target.value}})}
                className="w-full bg-emerald-990/60 border border-emerald-900/50 rounded-xl px-4 py-2.5 text-sm text-white focus:border-amber-400 focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-emerald-100/70 mb-1">Instagram URL</label>
              <input 
                type="url" 
                value={formData.socialLinks.instagram}
                onChange={(e) => setFormData({...formData, socialLinks: {...formData.socialLinks, instagram: e.target.value}})}
                className="w-full bg-emerald-990/60 border border-emerald-900/50 rounded-xl px-4 py-2.5 text-sm text-white focus:border-amber-400 focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-emerald-100/70 mb-1">X / Twitter URL</label>
              <input 
                type="url" 
                value={formData.socialLinks.twitter}
                onChange={(e) => setFormData({...formData, socialLinks: {...formData.socialLinks, twitter: e.target.value}})}
                className="w-full bg-emerald-990/60 border border-emerald-900/50 rounded-xl px-4 py-2.5 text-sm text-white focus:border-amber-400 focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-emerald-100/70 mb-1">Facebook URL</label>
              <input 
                type="url" 
                value={formData.socialLinks.facebook}
                onChange={(e) => setFormData({...formData, socialLinks: {...formData.socialLinks, facebook: e.target.value}})}
                className="w-full bg-emerald-990/60 border border-emerald-900/50 rounded-xl px-4 py-2.5 text-sm text-white focus:border-amber-400 focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-emerald-100/70 mb-1">Personal Website</label>
              <input 
                type="url" 
                value={formData.website}
                onChange={(e) => setFormData({...formData, website: e.target.value})}
                className="w-full bg-emerald-990/60 border border-emerald-900/50 rounded-xl px-4 py-2.5 text-sm text-white focus:border-amber-400 focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-emerald-100/70 mb-1">Contact Email / Phone</label>
              <input 
                type="text" 
                value={formData.socialLinks.contact}
                onChange={(e) => setFormData({...formData, socialLinks: {...formData.socialLinks, contact: e.target.value}})}
                className="w-full bg-emerald-990/60 border border-emerald-900/50 rounded-xl px-4 py-2.5 text-sm text-white focus:border-amber-400 focus:outline-none"
              />
            </div>
          </div>
        </div>

        <div className="pt-6">
          <button 
            type="submit"
            disabled={loading || uploading}
            className="w-full bg-amber-400 hover:bg-amber-300 text-emerald-950 font-bold py-4 rounded-xl transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {loading ? <Loader2 className="h-5 w-5 animate-spin" /> : <FileText className="h-5 w-5" />}
            Submit Profile for Review
          </button>
        </div>
      </form>
    </div>
  );
}

