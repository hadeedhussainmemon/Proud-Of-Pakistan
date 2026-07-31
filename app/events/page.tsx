"use client";

import { useState, useEffect } from "react";
import { Landmark, Calendar, Loader2, MapPin } from "lucide-react";

interface EventData {
  _id: string;
  title: string;
  date: string;
  description?: string;
  location?: string;
  status: string;
}

export default function EventsPage() {
  const [events, setEvents] = useState<EventData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/events")
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data)) setEvents(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const today = new Date().setHours(0, 0, 0, 0);
  const upcomingEvents = events.filter(e => e.status === "upcoming" && new Date(e.date).getTime() >= today);
  const pastEvents = events.filter(e => e.status === "past" || new Date(e.date).getTime() < today);

  return (
    <div className="mx-auto max-w-5xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="text-center mb-16">
        <h1 className="text-4xl font-display font-extrabold tracking-tight text-white mb-4">
          Events & Conventions
        </h1>
        <p className="text-emerald-100/60 text-sm">
          Keep track of our scheduled national awards ceremonies and historical gatherings.
        </p>
      </div>

      {loading ? (
        <div className="flex justify-center py-20">
          <Loader2 className="h-10 w-10 text-amber-400 animate-spin" />
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Upcoming */}
          <div>
            <h2 className="text-2xl font-display font-bold mb-6 text-amber-400 border-b border-emerald-500/20 pb-2">Upcoming Events</h2>
            <div className="space-y-4">
              {upcomingEvents.length === 0 ? <p className="text-neutral-500 text-sm">No upcoming events scheduled.</p> : upcomingEvents.map((e) => (
                <div key={e._id} className="p-6 rounded-2xl border border-amber-500/20 bg-amber-500/5 hover:bg-amber-500/10 transition-colors">
                  <span className="text-xs text-amber-400 font-bold flex items-center gap-1.5 mb-2">
                    <Calendar className="h-3.5 w-3.5" /> {new Date(e.date).toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' })}
                  </span>
                  <h3 className="font-bold text-white text-lg leading-snug mb-2">{e.title}</h3>
                  {e.location && <p className="text-xs text-emerald-100/50 flex items-center gap-1 mb-2"><MapPin className="h-3 w-3" /> {e.location}</p>}
                  {e.description && <p className="text-sm text-emerald-100/70">{e.description}</p>}
                </div>
              ))}
            </div>
          </div>

          {/* Past */}
          <div>
            <h2 className="text-2xl font-display font-bold mb-6 text-emerald-300 border-b border-emerald-500/20 pb-2">Past Events</h2>
            <div className="space-y-4">
              {pastEvents.length === 0 ? <p className="text-neutral-500 text-sm">No past events recorded.</p> : pastEvents.map((e) => (
                <div key={e._id} className="p-6 rounded-2xl border border-emerald-500/10 bg-emerald-950/20 opacity-80 hover:opacity-100 transition-opacity">
                  <span className="text-xs text-emerald-400 font-bold flex items-center gap-1.5 mb-2">
                    <Calendar className="h-3.5 w-3.5" /> {new Date(e.date).toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' })}
                  </span>
                  <h3 className="font-bold text-white text-lg leading-snug mb-2">{e.title}</h3>
                  {e.location && <p className="text-xs text-emerald-100/50 flex items-center gap-1 mb-2"><MapPin className="h-3 w-3" /> {e.location}</p>}
                  {e.description && <p className="text-sm text-emerald-100/70">{e.description}</p>}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
