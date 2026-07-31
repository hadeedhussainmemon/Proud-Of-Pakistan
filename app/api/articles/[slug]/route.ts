import { NextResponse } from "next/server";
import dbConnect from "@/lib/db";
import Article from "@/models/Article";
import "@/models/User";
import "@/models/Personality";
import "@/models/Business";

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

export async function PUT(
  req: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    await dbConnect();
    const { slug } = await params;
    const body = await req.json();
    const updated = await Article.findOneAndUpdate(
      { slug },
      { $set: body },
      { new: true }
    );
    if (!updated) {
      return NextResponse.json({ error: "Article not found" }, { status: 404 });
    }
    return NextResponse.json(updated);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    await dbConnect();
    const { slug } = await params;
    const deleted = await Article.findOneAndDelete({ slug });
    if (!deleted) {
      return NextResponse.json({ error: "Article not found" }, { status: 404 });
    }
    return NextResponse.json({ success: true, message: "Article deleted successfully!" });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
