"use client";

import { use } from "react";
import Link from "next/link";
import { ChevronLeft, Info, Users, Hotel, Utensils, GraduationCap, Briefcase, Landmark } from "lucide-react";

interface CityDetail {
  name: string;
  province: string;
  intro: string;
  history: string;
  population: string;
  hotels: string[];
  restaurants: string[];
  universities: string[];
  attractions: string[];
}

const mockCities: Record<string, CityDetail> = {
  lahore: {
    name: "Lahore",
    province: "Punjab",
    intro: "Known as the cultural capital of Pakistan, Lahore is celebrated for its historic architecture, food scene, and gardens.",
    history: "Lahore served as a capital of the Mughal Empire, Sikh Empire, and British Punjab. It is rich in historical sites dating back centuries.",
    population: "11.1 Million",
    hotels: ["PC Lahore", "Avari Express", "Luxus Grand Hotel"],
    restaurants: ["Haveli Restaurant", "Cuckoo's Den", "Andaaz Restaurant"],
    universities: ["LUMS", "Punjab University", "GCU Lahore"],
    attractions: ["Badshahi Mosque", "Lahore Fort", "Minar-e-Pakistan", "Shalimar Gardens"],
  },
  karachi: {
    name: "Karachi",
    province: "Sindh",
    intro: "The largest city in Pakistan, a industrial and financial center located on the Arabian Sea coast.",
    history: "Originating as a fortified creek town of Kolachi, it became a major commercial port under the British and the first national capital.",
    population: "14.9 Million",
    hotels: ["Mövenpick Karachi", "Marriott Hotel", "Pearl Continental"],
    restaurants: ["Kolachi", "Do Darya", "Lal Qila"],
    universities: ["Karachi University", "NED University", "IBA Karachi"],
    attractions: ["Mazar-e-Quaid", "Clifton Beach", "Mohatta Palace", "Frere Hall"],
  },
};

export default function CityDetailPage({ params }: { params: Promise<{ province: string; city: string }> }) {
  const resolvedParams = use(params);
  const cityKey = resolvedParams.city.toLowerCase();
  const city = mockCities[cityKey] || {
    name: resolvedParams.city.charAt(0).toUpperCase() + resolvedParams.city.slice(1),
    province: resolvedParams.province.charAt(0).toUpperCase() + resolvedParams.province.slice(1),
    intro: "Introduction coming soon.",
    history: "History details coming soon.",
    population: "Varies",
    hotels: [],
    restaurants: [],
    universities: [],
    attractions: [],
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      {/* Back Link */}
      <Link
        href={`/explore/${resolvedParams.province}`}
        className="inline-flex items-center gap-1.5 text-xs text-amber-400 hover:text-white font-semibold mb-8 transition-colors"
      >
        <ChevronLeft className="h-4 w-4" />
        Back to {city.province}
      </Link>

      {/* Header */}
      <div className="p-8 rounded-3xl bg-gradient-to-br from-emerald-950/20 to-emerald-950/5 border border-emerald-500/10 mb-12">
        <span className="text-xs text-emerald-400 font-bold uppercase tracking-wider block mb-2">
          Province: {city.province} • Population: {city.population}
        </span>
        <h1 className="text-4xl font-display font-extrabold tracking-tight text-white mb-4">
          Discover {city.name}
        </h1>
        <p className="text-emerald-100/70 text-sm leading-relaxed max-w-3xl">{city.intro}</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left main pane */}
        <div className="lg:col-span-2 space-y-8">
          {/* History */}
          <div className="p-6 rounded-2xl bg-emerald-950/10 border border-emerald-500/5">
            <h2 className="text-lg font-bold text-white mb-3 flex items-center gap-2">
              <Landmark className="h-4 w-4 text-amber-400" />
              History of the City
            </h2>
            <p className="text-emerald-100/70 text-sm leading-relaxed">{city.history}</p>
          </div>

          {/* Attractions */}
          <div className="p-6 rounded-2xl bg-emerald-950/10 border border-emerald-500/5">
            <h2 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
              <Info className="h-4 w-4 text-amber-400" />
              Popular Places & Attractions
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {city.attractions.map((att, idx) => (
                <div key={idx} className="p-3 rounded-xl bg-emerald-950/30 border border-emerald-500/5 text-xs text-white font-medium">
                  {att}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Directory details */}
        <div className="space-y-8">
          {/* Universities */}
          <div className="p-6 rounded-2xl bg-emerald-950/20 border border-emerald-500/10">
            <h3 className="text-sm font-bold text-white uppercase tracking-wider mb-4 flex items-center gap-2">
              <GraduationCap className="h-4 w-4 text-amber-400" />
              Education & Universities
            </h3>
            <ul className="text-xs text-emerald-100/70 space-y-2">
              {city.universities.map((uni) => (
                <li key={uni} className="flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-amber-400" />
                  {uni}
                </li>
              ))}
            </ul>
          </div>

          {/* Hotels & Restaurants */}
          <div className="p-6 rounded-2xl bg-emerald-950/20 border border-emerald-500/10">
            <h3 className="text-sm font-bold text-white uppercase tracking-wider mb-4 flex items-center gap-2">
              <Hotel className="h-4 w-4 text-amber-400" />
              Hotels & Accommodation
            </h3>
            <ul className="text-xs text-emerald-100/70 space-y-2 mb-6">
              {city.hotels.map((hotel) => (
                <li key={hotel} className="flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-amber-400" />
                  {hotel}
                </li>
              ))}
            </ul>

            <h3 className="text-sm font-bold text-white uppercase tracking-wider mb-4 flex items-center gap-2">
              <Utensils className="h-4 w-4 text-amber-400" />
              Top Restaurants
            </h3>
            <ul className="text-xs text-emerald-100/70 space-y-2">
              {city.restaurants.map((res) => (
                <li key={res} className="flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-amber-400" />
                  {res}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
