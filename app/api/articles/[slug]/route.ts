import { NextResponse } from "next/server";
import dbConnect from "@/lib/db";
import Article from "@/models/Article";

export async function GET(
  req: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    await dbConnect();
    const { slug } = await params;
    const article = await Article.findOne({ slug })
      .populate("authorId", "name")
      .populate("relatedPersonalities", "name slug")
      .populate("relatedBusinesses", "name slug");
      
    if (!article) {
      return NextResponse.json({ error: "Article not found" }, { status: 404 });
    }
    return NextResponse.json(article);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
