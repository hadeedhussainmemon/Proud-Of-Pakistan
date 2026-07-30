import { NextResponse } from "next/server";
import dbConnect from "@/lib/db";
import ArticleModel from "@/models/Article";
import EventModel from "@/models/Event";
import PersonalityModel from "@/models/Personality";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const q = searchParams.get("q") || "";

  if (!q || q.length < 2) {
    return NextResponse.json({ results: [] });
  }

  try {
    await dbConnect();

    // Run all searches in parallel
    const [articles, events, personalities] = await Promise.all([
      ArticleModel.find({
        $text: { $search: q },
      })
        .select("title category slug")
        .limit(10)
        .lean(),

      EventModel.find({
        $text: { $search: q },
      })
        .select("title date status")
        .limit(10)
        .lean(),

      PersonalityModel.find({
        status: "approved",
        $text: { $search: q },
      })
        .select("name category slug image")
        .limit(10)
        .lean(),
    ]);

    // Format results into a unified structure
    const formattedResults = [
      ...articles.map((a) => ({
        _id: a._id,
        title: a.title,
        type: "Article",
        subtitle: a.category,
        url: `/blog/${a.slug}`,
      })),
      ...events.map((e) => ({
        _id: e._id,
        title: e.title,
        type: "Event",
        subtitle: new Date(e.date).toLocaleDateString(),
        url: `/events`,
      })),
      ...personalities.map((p) => ({
        _id: p._id,
        title: p.name,
        type: "Personality",
        subtitle: p.category,
        image: p.image,
        url: `/personalities/${p.slug}`,
      })),
    ];

    return NextResponse.json({ results: formattedResults });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

