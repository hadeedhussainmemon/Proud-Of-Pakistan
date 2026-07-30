"use client";

import { Landmark, Award, Star } from "lucide-react";

interface TimelineEvent {
  year: string;
  title: string;
  description: string;
}

const timelineEvents: TimelineEvent[] = [
  {
    year: "3300 BCE",
    title: "Indus Valley Civilization",
    description: "Rise of Harappa and Mohenjo-daro, showcasing advanced urban planning, engineering, and metallurgy.",
  },
  {
    year: "1947 CE",
    title: "Independence of Pakistan",
    description: "Establishment of Pakistan as a sovereign nation state under the leadership of Quaid-e-Azam Muhammad Ali Jinnah.",
  },
  {
    year: "1998 CE",
    title: "Chagai-I Nuclear Tests",
    description: "Pakistan successfully tests nuclear devices, becoming the world's 7th nuclear-armed nation.",
  },
];

export default function HistoryPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="text-center mb-16">
        <h1 className="text-4xl font-display font-extrabold tracking-tight text-white mb-4">
          Historical Timeline
        </h1>
        <p className="text-emerald-100/60 text-sm">
          A brief journey through key milestones, from antiquity to modern sovereignty.
        </p>
      </div>

      <div className="relative border-l border-emerald-950/40 ml-4 md:ml-32 pl-8 space-y-12">
        {timelineEvents.map((event, idx) => (
          <div key={idx} className="relative">
            {/* Timeline indicator circle */}
            <span className="absolute -left-12 top-1.5 flex h-8 w-8 items-center justify-center rounded-full bg-emerald-950 border border-amber-400/50 text-amber-400">
              <Landmark className="h-4 w-4" />
            </span>
            <div className="bg-emerald-950/15 border border-emerald-950/20 rounded-2xl p-6 hover:border-emerald-500/20 transition-all duration-300">
              <span className="inline-block text-sm font-bold text-amber-400 mb-2">
                {event.year}
              </span>
              <h2 className="text-xl font-bold text-white mb-2">{event.title}</h2>
              <p className="text-emerald-100/60 text-sm leading-relaxed">{event.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
