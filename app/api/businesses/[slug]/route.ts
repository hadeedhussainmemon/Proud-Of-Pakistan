import { NextResponse } from "next/server";
import dbConnect from "@/lib/db";
import Business from "@/models/Business";

export async function GET(
  req: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    await dbConnect();
    const { slug } = await params;
    const business = await Business.findOne({ slug });
    if (!business) {
      return NextResponse.json({ error: "Business not found" }, { status: 404 });
    }
    return NextResponse.json(business);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
