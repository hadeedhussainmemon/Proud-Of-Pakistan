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
        $or: [
          { title: { $regex: q, $options: "i" } },
          { content: { $regex: q, $options: "i" } },
          { category: { $regex: q, $options: "i" } }
        ]
      })
        .select("title category slug")
        .limit(10)
        .lean(),

      EventModel.find({
        $or: [
          { title: { $regex: q, $options: "i" } },
          { description: { $regex: q, $options: "i" } }
        ]
      })
        .select("title date status")
        .limit(10)
        .lean(),

      PersonalityModel.find({
        status: "approved",
        $or: [
          { name: { $regex: q, $options: "i" } },
          { biography: { $regex: q, $options: "i" } },
          { category: { $regex: q, $options: "i" } }
        ]
      })
        .select("name category slug profilePicture images")
        .limit(10)
        .lean(),
    ]);

    // Format results into a unified structure
    const formattedResults = [
      ...articles.map((a: any) => ({
        _id: a._id,
        title: a.title,
        type: "Article",
        subtitle: a.category,
        url: `/blog/${a.slug}`,
      })),
      ...events.map((e: any) => ({
        _id: e._id,
        title: e.title,
        type: "Event",
        subtitle: new Date(e.date).toLocaleDateString(),
        url: `/events`,
      })),
      ...personalities.map((p: any) => ({
        _id: p._id,
        title: p.name,
        type: "Personality",
        subtitle: p.category,
        image: p.profilePicture || p.images?.[0],
        url: `/personalities/${p.slug}`,
      })),
    ];

    return NextResponse.json({ results: formattedResults });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

