"use client";

import { useEffect, useState } from "react";
import { Loader2 } from "lucide-react";

interface CoreValue {
  name: string;
  description: string;
}

interface SiteConfig {
  aboutIntro: string;
  vision: string;
  mission: string;
  coreValues: CoreValue[];
  objectives: string;
  selectionCriteria: string;
  categories: string;
  whyUs: string;
  founderMessage: string;
  impact: string;
  joinUs: string;
}

export default function AboutPage() {
  const [config, setConfig] = useState<SiteConfig | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/config")
      .then((r) => r.json())
      .then((data) => {
        if (data && data.aboutIntro) {
          setConfig(data);
        }
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center py-40 bg-[#020805]">
        <Loader2 className="h-10 w-10 text-amber-400 animate-spin" />
      </div>
    );
  }

  const sections = [
    { title: "About Proud of Pakistan", content: config?.aboutIntro },
    { title: "Our Vision", content: config?.vision },
    { title: "Our Mission", content: config?.mission }
  ];

  return (
    <div className="mx-auto max-w-4xl px-6 py-20 text-neutral-100 bg-[#020805] font-sans selection:bg-amber-400 selection:text-[#020805]">
      <div className="space-y-16">
        
        {/* Main Header */}
        <header className="border-b border-emerald-950/40 pb-8">
          <span className="text-xs font-bold uppercase tracking-widest text-amber-500">
            Platform Ethos & Direction
          </span>
          <h1 className="text-4xl md:text-7xl font-display font-light text-white tracking-tight leading-none mt-3">
            National <br />
            <span className="font-extrabold italic text-amber-400">Statement</span>
          </h1>
        </header>

        {/* Narrative Section Loop */}
        {sections.map((sec, idx) => (
          <section key={idx} className="space-y-4">
            <h2 className="text-xs font-bold tracking-widest text-emerald-500 uppercase border-b border-emerald-950/20 pb-2">
              {sec.title}
            </h2>
            <p className="text-neutral-300 font-light leading-relaxed text-base whitespace-pre-line text-justify">
              {sec.content}
            </p>
          </section>
        ))}

        {/* Core Values Section */}
        {config?.coreValues && config.coreValues.length > 0 && (
          <section className="space-y-6">
            <h2 className="text-xs font-bold tracking-widest text-emerald-500 uppercase border-b border-emerald-950/20 pb-2">
              Our Core Values
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4 pt-2">
              {config.coreValues.map((val, idx) => (
                <div key={idx} className="space-y-1">
                  <h3 className="font-bold text-white text-base">{val.name}</h3>
                  <p className="text-sm text-neutral-400 font-light leading-relaxed">{val.description}</p>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Dynamic Secondary Sections */}
        {[
          { title: "Our Objectives", content: config?.objectives },
          { title: "Our Selection Criteria", content: config?.selectionCriteria },
          { title: "Categories of Recognition", content: config?.categories },
          { title: "Why Proud of Pakistan?", content: config?.whyUs },
          { title: "Message from the Founder", content: config?.founderMessage },
          { title: "Our Impact", content: config?.impact },
          { title: "Join Our Mission", content: config?.joinUs }
        ].map((sec, idx) => (
          <section key={idx} className="space-y-4">
            <h2 className="text-xs font-bold tracking-widest text-amber-500 uppercase border-b border-emerald-950/20 pb-2">
              {sec.title}
            </h2>
            <p className="text-neutral-300 font-light leading-relaxed text-base whitespace-pre-line text-justify">
              {sec.content}
            </p>
          </section>
        ))}

      </div>
    </div>
  );
}
