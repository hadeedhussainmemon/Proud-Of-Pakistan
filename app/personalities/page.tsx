"use client";

import { useState } from "react";
import { Search, Award, BookOpen } from "lucide-react";

interface Personality {
  name: string;
  field: string;
  shortDesc: string;
  achievement: string;
  slug: string;
}

const mockPersonalities: Personality[] = [
  {
    name: "Dr. Abdus Salam",
    field: "Science",
    shortDesc: "Theoretical physicist who won the Nobel Prize in Physics in 1979.",
    achievement: "First Pakistani Nobel laureate in Science.",
    slug: "abdus-salam",
  },
  {
    name: "Abdul Sattar Edhi",
    field: "Philanthropy",
    shortDesc: "Humanitarian who founded the Edhi Foundation, the world's largest volunteer ambulance network.",
    achievement: "Guinness World Record for largest volunteer ambulance service.",
    slug: "abdul-sattar-edhi",
  },
  {
    name: "Dr. Ruth Pfau",
    field: "Medicine",
    shortDesc: "German-Pakistani physician who dedicated her life to eradicating Leprosy in Pakistan.",
    achievement: "State funeral awarded for her extraordinary service.",
    slug: "ruth-pfau",
  },
  {
    name: "Jahangir Khan",
    field: "Sports",
    shortDesc: "Former World No. 1 squash player, widely considered the greatest squash player of all time.",
    achievement: "Won 555 consecutive matches, the longest winning streak in professional sports history.",
    slug: "jahangir-khan",
  },
];

export default function PersonalitiesPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeFilter, setActiveFilter] = useState("All");

  const filteredList = mockPersonalities.filter((p) => {
    const matchesSearch = p.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = activeFilter === "All" || p.field.toLowerCase() === activeFilter.toLowerCase();
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="text-center max-w-2xl mx-auto mb-12">
        <h1 className="text-4xl font-display font-extrabold tracking-tight text-white mb-4">
          Outstanding Personalities
        </h1>
        <p className="text-emerald-100/60 text-sm">
          Tributes to the legendary visionaries, scientists, and humanitarians of Pakistan.
        </p>
      </div>

      {/* Filters & Search */}
      <div className="flex flex-col md:flex-row gap-4 justify-between items-center mb-12 bg-emerald-950/20 p-4 border border-emerald-950/30 rounded-xl">
        <div className="relative w-full md:w-80">
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-emerald-100/40" />
          <input
            type="text"
            placeholder="Search personalities..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-emerald-990/60 border border-emerald-950/50 rounded-lg py-2 pl-10 pr-4 text-sm text-white placeholder-emerald-100/30 focus:outline-none focus:border-amber-400"
          />
        </div>
        <div className="flex gap-2">
          {["All", "Science", "Philanthropy", "Sports"].map((filter) => (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={`px-4 py-2 rounded-lg text-xs font-semibold transition-all ${
                activeFilter === filter
                  ? "bg-amber-400 text-emerald-950"
                  : "bg-emerald-950/40 text-emerald-100/70 hover:bg-emerald-950/70"
              }`}
            >
              {filter}
            </button>
          ))}
        </div>
      </div>

      {/* Grid List */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredList.map((p, idx) => (
          <div
            key={idx}
            className="bg-emerald-950/15 border border-emerald-950/20 rounded-2xl p-6 hover:border-emerald-500/20 transition-all duration-300 flex flex-col justify-between"
          >
            <div>
              <div className="flex justify-between items-start mb-4">
                <span className="text-xs font-bold text-amber-400 uppercase tracking-wider">
                  {p.field}
                </span>
                <span className="inline-flex items-center gap-1 rounded bg-emerald-500/10 px-2 py-0.5 text-xs text-emerald-300">
                  <Award className="h-3 w-3" />
                  Key Icon
                </span>
              </div>
              <h2 className="text-2xl font-display font-bold text-white mb-2">{p.name}</h2>
              <p className="text-emerald-100/60 text-sm mb-4 leading-relaxed">{p.shortDesc}</p>
            </div>
            <div className="border-t border-emerald-950/30 pt-4 flex gap-2 items-center text-xs text-emerald-300 bg-emerald-950/10 p-3 rounded-lg">
              <BookOpen className="h-4 w-4 text-amber-400 flex-shrink-0" />
              <span><strong>Achievement:</strong> {p.achievement}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
