"use client";

import { useState, useEffect } from "react";
import { Image as ImageIcon, Loader2 } from "lucide-react";

interface GalleryItem {
  _id: string;
  title: string;
  category: string;
  imageUrl: string;
}

export default function GalleryPage() {
  const [gallery, setGallery] = useState<GalleryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState("All");

  useEffect(() => {
    fetch("/api/gallery")
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data)) setGallery(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const categories = ["All", ...Array.from(new Set(gallery.map(g => g.category)))];
  const filteredGallery = activeCategory === "All" ? gallery : gallery.filter(g => g.category === activeCategory);

  return (
    <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="text-center mb-16 max-w-2xl mx-auto">
        <h1 className="text-4xl font-display font-extrabold tracking-tight text-white mb-4">
          Visual Archive
        </h1>
        <p className="text-emerald-100/60 text-sm">
          Explore historical moments, rare photographs, and visual records of extraordinary achievements.
        </p>
      </div>

      <div className="flex justify-center flex-wrap gap-2 mb-12">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`px-4 py-2 rounded-full text-xs font-semibold transition-all ${
              activeCategory === cat
                ? "bg-amber-400 text-emerald-950"
                : "bg-emerald-950/40 text-emerald-100/70 hover:bg-emerald-950/70 border border-emerald-500/10"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {loading ? (
        <div className="flex justify-center py-20">
          <Loader2 className="h-10 w-10 text-amber-400 animate-spin" />
        </div>
      ) : (
        <div className="columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6">
          {filteredGallery.length === 0 ? (
            <p className="text-neutral-500 text-center col-span-full w-full py-10">No images found.</p>
          ) : filteredGallery.map((item) => (
            <div key={item._id} className="break-inside-avoid rounded-2xl overflow-hidden border border-emerald-500/10 bg-emerald-950/20 group relative">
              <img
                src={item.imageUrl}
                alt={item.title}
                className="w-full h-auto object-cover opacity-90 group-hover:opacity-100 transition-opacity duration-500 group-hover:scale-105 transform"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
                <h3 className="text-white font-bold text-lg">{item.title}</h3>
                <p className="text-amber-400 text-xs font-semibold mt-1 uppercase tracking-wider">{item.category}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
