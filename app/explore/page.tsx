"use client";

import { useState } from "react";
import Link from "next/link";
import { Compass, MapPin, Search, Sparkles, Navigation, Layers } from "lucide-react";

interface ProvinceData {
  name: string;
  slug: string;
  capital: string;
  tagline: string;
  imageBg: string;
  cities: string[];
  destinations: string[];
}

const provinces: ProvinceData[] = [
  {
    name: "Punjab",
    slug: "punjab",
    capital: "Lahore",
    tagline: "The Land of Five Rivers & Ancient Mughal Splendor",
    imageBg: "from-emerald-950/80 to-emerald-900/60",
    cities: ["Lahore", "Faisalabad", "Rawalpindi", "Multan", "Sialkot"],
    destinations: ["Badshahi Mosque", "Shalimar Gardens", "Rohtas Fort", "Katas Raj Temples"],
  },
  {
    name: "Sindh",
    slug: "sindh",
    capital: "Karachi",
    tagline: "The Cradle of the Indus Valley Civilization",
    imageBg: "from-emerald-950/80 to-emerald-800/60",
    cities: ["Karachi", "Hyderabad", "Sukkur", "Larkana", "Thatta"],
    destinations: ["Mohenjo-daro", "Gorakh Hill", "Shah Jahan Mosque", "Ranikot Fort"],
  },
  {
    name: "Khyber Pakhtunkhwa",
    slug: "khyber-pakhtunkhwa",
    capital: "Peshawar",
    tagline: "Land of Majestic Valleys & Rugged Frontiers",
    imageBg: "from-emerald-950/80 to-emerald-900/50",
    cities: ["Peshawar", "Abbottabad", "Swat", "Mardan", "Mansehra"],
    destinations: ["Kalam Valley", "Lake Saif-ul-Muluk", "Khyber Pass", "Takht-i-Bahi"],
  },
  {
    name: "Balochistan",
    slug: "balochistan",
    capital: "Quetta",
    tagline: "Stunning Coastlines, Golden Deserts & Deep Canyons",
    imageBg: "from-emerald-950/80 to-emerald-850/60",
    cities: ["Quetta", "Gwadar", "Turbat", "Khuzdar", "Chaman"],
    destinations: ["Hingol National Park", "Kund Malir Beach", "Astola Island", "Pir Ghaib"],
  },
  {
    name: "Gilgit-Baltistan",
    slug: "gilgit-baltistan",
    capital: "Gilgit",
    tagline: "Where Three Mighty Mountain Ranges Meet",
    imageBg: "from-emerald-950/80 to-emerald-700/60",
    cities: ["Gilgit", "Skardu", "Hunza", "Chilas"],
    destinations: ["Hunza Valley", "K2 Basecamp", "Attabad Lake", "Deosai Plains"],
  },
  {
    name: "Azad Kashmir",
    slug: "azad-kashmir",
    capital: "Muzaffarabad",
    tagline: "Heaven on Earth with Lush Green Meadows",
    imageBg: "from-emerald-950/80 to-emerald-750/60",
    cities: ["Muzaffarabad", "Mirpur", "Rawalakot", "Bagh"],
    destinations: ["Neelum Valley", "Ratti Gali Lake", "Banjosa Lake", "Arang Kel"],
  },
];

export default function ExplorePage() {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredProvinces = provinces.filter(
    (prov) =>
      prov.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      prov.cities.some((c) => c.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto mb-16">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-400/10 border border-amber-400/20 text-amber-400 text-xs font-semibold mb-4">
          <Sparkles className="h-3 w-3" />
          <span>Interactive Digital Encyclopedia</span>
        </div>
        <h1 className="text-4xl md:text-5xl font-display font-extrabold tracking-tight text-white mb-6 leading-tight">
          Explore Pakistan
        </h1>
        <p className="text-emerald-100/60 text-base md:text-lg leading-relaxed mb-8">
          Browse through Pakistan's provinces, historic cities, cultural landmarks, and hidden gems in one unified platform.
        </p>

        {/* Global Explore Search */}
        <div className="relative max-w-xl mx-auto">
          <Search className="absolute left-4 top-3.5 h-5 w-5 text-emerald-100/40" />
          <input
            type="text"
            placeholder="Search by province, city, or destination..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-emerald-950/40 border border-emerald-500/10 hover:border-emerald-500/25 focus:border-amber-400 focus:outline-none rounded-2xl py-3 pl-12 pr-4 text-white placeholder-emerald-100/30 transition-all text-sm backdrop-blur-md"
          />
        </div>
      </div>

      {/* Provinces Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredProvinces.map((prov, index) => (
          <div
            key={index}
            className="group flex flex-col justify-between overflow-hidden rounded-3xl border border-emerald-500/10 bg-gradient-to-br from-emerald-950/20 to-emerald-950/5 p-6 hover:border-emerald-500/30 transition-all duration-300 backdrop-blur-sm"
          >
            <div>
              {/* Card visual banner block */}
              <div className={`relative h-40 rounded-2xl bg-gradient-to-tr ${prov.imageBg} border border-emerald-500/5 mb-6 flex flex-col justify-end p-4 overflow-hidden`}>
                <div className="absolute inset-0 bg-black/20" />
                <div className="relative z-10">
                  <span className="text-xs text-amber-400 font-bold uppercase tracking-wider block mb-1">
                    Capital: {prov.capital}
                  </span>
                  <h2 className="text-2xl font-bold text-white tracking-tight">{prov.name}</h2>
                </div>
              </div>

              <p className="text-emerald-100/70 text-sm leading-relaxed mb-6 font-medium">
                {prov.tagline}
              </p>

              {/* Cities list inline */}
              <div className="mb-6">
                <h4 className="text-xs font-bold text-emerald-100/30 uppercase tracking-widest mb-2 flex items-center gap-1.5">
                  <MapPin className="h-3 w-3 text-amber-400" />
                  Key Cities
                </h4>
                <div className="flex flex-wrap gap-1.5">
                  {prov.cities.map((city) => (
                    <Link
                      key={city}
                      href={`/explore/${prov.slug}/${city.toLowerCase().replace(/\s+/g, "-")}`}
                      className="px-2.5 py-1 rounded-lg bg-emerald-950/30 border border-emerald-500/10 text-emerald-100/80 hover:border-amber-400/50 hover:text-white transition-all text-xs font-medium"
                    >
                      {city}
                    </Link>
                  ))}
                </div>
              </div>

              {/* Destinations List */}
              <div className="mb-6">
                <h4 className="text-xs font-bold text-emerald-100/30 uppercase tracking-widest mb-2 flex items-center gap-1.5">
                  <Layers className="h-3 w-3 text-amber-400" />
                  Attractions
                </h4>
                <ul className="text-xs text-emerald-100/60 space-y-1 pl-1">
                  {prov.destinations.map((d) => (
                    <li key={d} className="flex items-center gap-2">
                      <span className="h-1 w-1 rounded-full bg-amber-400" />
                      {d}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="pt-4 border-t border-emerald-500/5 flex justify-between items-center">
              <span className="text-xs text-emerald-100/40 font-mono">POP.{prov.name.substring(0, 3).toUpperCase()}</span>
              <Link
                href={`/explore/${prov.slug}`}
                className="inline-flex items-center gap-1 text-xs font-bold text-amber-400 hover:text-white transition-colors"
              >
                Explore Province &rarr;
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
