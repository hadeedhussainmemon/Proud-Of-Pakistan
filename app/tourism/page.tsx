"use client";

import { MapPin, Compass, Image as ImageIcon } from "lucide-react";

interface Destination {
  title: string;
  region: string;
  description: string;
  tag: string;
}

const mockDestinations: Destination[] = [
  {
    title: "Hunza Valley",
    region: "Gilgit-Baltistan",
    description: "Known for its stunning peaks, rich organic orchards, and historical Baltit and Altit forts.",
    tag: "Mountain Paradise",
  },
  {
    title: "Lahore Walled City",
    region: "Punjab",
    description: "The historical heart of the Mughal Empire featuring the Badshahi Mosque and Lahore Fort.",
    tag: "Cultural Heritage",
  },
  {
    title: "Deosai National Park",
    region: "Gilgit-Baltistan",
    description: "One of the highest alpine plateaus in the world, home to the Himalayan Brown Bear.",
    tag: "Wildlife Reserve",
  },
];

export default function TourismPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="text-center max-w-2xl mx-auto mb-12">
        <h1 className="text-4xl font-display font-extrabold tracking-tight text-white mb-4">
          Tourism & Heritage Sites
        </h1>
        <p className="text-emerald-100/60 text-sm">
          A visual guide to the breathtaking landscapes, ancient civilizations, and historic architecture of Pakistan.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {mockDestinations.map((d, idx) => (
          <div
            key={idx}
            className="group overflow-hidden rounded-2xl border border-emerald-950/20 bg-emerald-950/15 transition-all duration-300 hover:border-emerald-500/30"
          >
            {/* Aspect ratio block simulating picture card */}
            <div className="relative aspect-video bg-gradient-to-tr from-emerald-900/60 to-emerald-950/80 flex items-center justify-center text-emerald-100/30">
              <ImageIcon className="h-10 w-10 group-hover:scale-110 transition-transform" />
              <span className="absolute top-3 left-3 bg-black/40 backdrop-blur-md px-2 py-1 rounded text-xs font-semibold text-amber-400">
                {d.tag}
              </span>
            </div>
            <div className="p-6">
              <div className="flex items-center gap-1.5 text-xs text-emerald-300 font-semibold mb-2">
                <MapPin className="h-3.5 w-3.5 text-amber-400" />
                <span>{d.region}</span>
              </div>
              <h2 className="text-xl font-bold text-white mb-2">{d.title}</h2>
              <p className="text-emerald-100/60 text-sm leading-relaxed">{d.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
