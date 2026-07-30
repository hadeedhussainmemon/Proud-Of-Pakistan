"use client";

import { Sparkles, FileText, Users, Eye, CheckSquare, BrainCircuit, ArrowUpRight } from "lucide-react";
import Link from "next/link";

export default function AdminDashboard() {
  const stats = [
    { label: "Total Articles", value: "142", icon: FileText, change: "+12 this week" },
    { label: "Pending Submissions", value: "18", icon: CheckSquare, change: "8 profiles, 10 businesses" },
    { label: "Registered Users", value: "1,204", icon: Users, change: "+85 new signups" },
    { label: "Monthly Page Views", value: "48.2K", icon: Eye, change: "+18% growth" },
  ];

  return (
    <div className="space-y-8">
      {/* Welcome Hero banner */}
      <div className="p-8 rounded-3xl bg-gradient-to-r from-emerald-950/40 to-emerald-900/10 border border-emerald-500/10 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div>
          <h1 className="text-3xl font-display font-extrabold text-white mb-2">Assalam-o-Alaikum, Admin</h1>
          <p className="text-emerald-100/60 text-sm">
            Manage your content archive, review community nominations, and use AI features to curate Proud of Pakistan.
          </p>
        </div>
        <div className="flex gap-3">
          <Link
            href="/admin/articles/new"
            className="px-4 py-2 rounded-xl bg-amber-400 hover:bg-amber-300 text-emerald-950 text-xs font-bold transition-all shadow-md"
          >
            Create New Article
          </Link>
          <Link
            href="/admin/ai-tools"
            className="px-4 py-2 rounded-xl bg-emerald-500/20 hover:bg-emerald-500/30 border border-emerald-500/30 text-emerald-300 text-xs font-bold transition-all flex items-center gap-1.5"
          >
            <BrainCircuit className="h-4 w-4" />
            Launch AI Assistant
          </Link>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, idx) => {
          const Icon = stat.icon;
          return (
            <div
              key={idx}
              className="p-6 rounded-2xl bg-emerald-950/15 border border-emerald-500/5 hover:border-emerald-500/15 transition-all flex flex-col justify-between"
            >
              <div className="flex justify-between items-start mb-4">
                <span className="text-xs font-bold text-emerald-100/40 uppercase tracking-widest">
                  {stat.label}
                </span>
                <span className="p-2 rounded-lg bg-emerald-500/10 text-amber-400">
                  <Icon className="h-4 w-4" />
                </span>
              </div>
              <div>
                <span className="text-3xl font-extrabold text-white block mb-1">{stat.value}</span>
                <span className="text-xs text-emerald-400 font-medium">{stat.change}</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Grid of actions / logs */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Recent Submissions */}
        <div className="lg:col-span-2 p-6 rounded-2xl bg-emerald-950/10 border border-emerald-500/5">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-sm font-bold text-white uppercase tracking-wider">
              Pending Community Submissions
            </h3>
            <Link
              href="/admin/community"
              className="text-xs font-bold text-amber-400 hover:text-white transition-colors flex items-center gap-0.5"
            >
              Moderate Queue
              <ArrowUpRight className="h-3 w-3" />
            </Link>
          </div>

          <div className="space-y-4">
            {[
              { title: "Nomination: Arshad Nadeem Profile Update", type: "Personality", user: "Zahid K." },
              { title: "Listing: TechLahore Software Hub", type: "Business", user: "Sara Khan" },
              { title: "Story Submission: The Indus River Expedition", type: "Story", user: "Imran Baig" },
            ].map((sub, idx) => (
              <div
                key={idx}
                className="p-4 rounded-xl bg-emerald-950/30 border border-emerald-500/5 flex justify-between items-center text-xs"
              >
                <div>
                  <h4 className="font-bold text-white mb-1">{sub.title}</h4>
                  <p className="text-emerald-100/40">Submitted by {sub.user}</p>
                </div>
                <span className="px-2 py-1 rounded bg-emerald-500/10 text-emerald-300 font-semibold uppercase tracking-wider scale-90">
                  {sub.type}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* AI Actions */}
        <div className="p-6 rounded-2xl bg-emerald-950/20 border border-emerald-500/10">
          <h3 className="text-sm font-bold text-white uppercase tracking-wider mb-6 flex items-center gap-2">
            <Sparkles className="h-4 w-4 text-amber-400" />
            AI Co-Pilot Hub
          </h3>

          <div className="space-y-3">
            <button className="w-full p-4 rounded-xl bg-emerald-950/40 hover:bg-emerald-950/80 border border-emerald-500/5 hover:border-amber-400/30 text-left transition-all">
              <span className="text-xs font-bold text-white block mb-1">Generate SEO Metatags</span>
              <span className="text-[11px] text-emerald-100/40">
                Instantly scan drafts and create tags/descriptions
              </span>
            </button>
            <button className="w-full p-4 rounded-xl bg-emerald-950/40 hover:bg-emerald-950/80 border border-emerald-500/5 hover:border-amber-400/30 text-left transition-all">
              <span className="text-xs font-bold text-white block mb-1">Expand Biography Drafts</span>
              <span className="text-[11px] text-emerald-100/40">
                Convert short summaries into premium wiki articles
              </span>
            </button>
            <button className="w-full p-4 rounded-xl bg-emerald-950/40 hover:bg-emerald-950/80 border border-emerald-500/5 hover:border-amber-400/30 text-left transition-all">
              <span className="text-xs font-bold text-white block mb-1">Translational pipeline</span>
              <span className="text-[11px] text-emerald-100/40">
                Translate published articles from English to Urdu
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
