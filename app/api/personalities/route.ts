import { NextResponse } from "next/server";
export const dynamic = "force-dynamic";
import dbConnect from "@/lib/db";
import Personality from "@/models/Personality";

export async function GET(req: Request) {
  try {
    await dbConnect();
    const url = new URL(req.url);
    const fetchAll = url.searchParams.get("all") === "true";
    const hasPagination = url.searchParams.has("page") || url.searchParams.has("limit");
    
    // By default only show approved. Or if status is missing (old records)
    const query = fetchAll ? {} : { $or: [{ status: 'approved' }, { status: { $exists: false } }] };
    
    if (!hasPagination) {
      const personalities = await Personality.find(query).sort({ createdAt: -1 });
      return NextResponse.json(personalities);
    }

    const page = parseInt(url.searchParams.get("page") || "1", 10);
    const limit = parseInt(url.searchParams.get("limit") || "10", 10);
    const skip = (page - 1) * limit;
    
    const total = await Personality.countDocuments(query);
    const personalities = await Personality.find(query).sort({ createdAt: -1 }).skip(skip).limit(limit);
    
    return NextResponse.json({
      data: personalities,
      total,
      page,
      totalPages: Math.ceil(total / limit)
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    await dbConnect();
    const body = await req.json();
    const newPersonality = await Personality.create(body);
    return NextResponse.json(newPersonality, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
