"use client";

import { Landmark, Calendar } from "lucide-react";

export default function EventsPage() {
  const upcomingEvents = [
    { date: "AUGUST 14, 2026", title: "79th Independence Day Celebration & Award Ceremony" },
    { date: "OCTOBER 10, 2026", title: "Annual Young Achievers & Pioneers Roundtable" }
  ];

  const pastEvents = [
    { date: "MARCH 23, 2026", title: "Pakistan Day Commemoration & Heritage Exhibition" },
    { date: "JANUARY 05, 2026", title: "Winter Sports Awards & Mountaineering Honors" }
  ];

  return (
    <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="text-center mb-16">
        <h1 className="text-4xl font-display font-extrabold tracking-tight text-white mb-4">
          Events & Conventions
        </h1>
        <p className="text-emerald-100/60 text-sm">
          Keep track of our scheduled national awards ceremonies and historical gatherings.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Upcoming */}
        <div>
          <h2 className="text-2xl font-display font-bold mb-6 text-amber-400">Upcoming Events</h2>
          <div className="space-y-4">
            {upcomingEvents.map((e, idx) => (
              <div key={idx} className="p-5 rounded-2xl border border-emerald-500/10 bg-emerald-950/20">
                <span className="text-xs text-amber-400 font-bold flex items-center gap-1.5 mb-2">
                  <Calendar className="h-3.5 w-3.5" /> {e.date}
                </span>
                <h3 className="font-bold text-white leading-snug">{e.title}</h3>
              </div>
            ))}
          </div>
        </div>

        {/* Past */}
        <div>
          <h2 className="text-2xl font-display font-bold mb-6 text-emerald-300">Past Events</h2>
          <div className="space-y-4">
            {pastEvents.map((e, idx) => (
              <div key={idx} className="p-5 rounded-2xl border border-emerald-500/10 bg-emerald-950/20 opacity-70">
                <span className="text-xs text-emerald-400 font-bold flex items-center gap-1.5 mb-2">
                  <Calendar className="h-3.5 w-3.5" /> {e.date}
                </span>
                <h3 className="font-bold text-white leading-snug">{e.title}</h3>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
