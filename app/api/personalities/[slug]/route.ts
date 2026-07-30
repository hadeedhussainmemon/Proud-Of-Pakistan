import { NextResponse } from "next/server";
import dbConnect from "@/lib/db";
import Personality from "@/models/Personality";

export async function GET(
  req: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    await dbConnect();
    const { slug } = await params;
    const personality = await Personality.findOne({ slug });
    if (!personality) {
      return NextResponse.json({ error: "Profile not found" }, { status: 404 });
    }
    return NextResponse.json(personality);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
