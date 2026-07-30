import { NextResponse } from "next/server";
import dbConnect from "@/lib/db";
import Personality from "@/models/Personality";

export async function GET(req: Request) {
  try {
    await dbConnect();
    const url = new URL(req.url);
    const fetchAll = url.searchParams.get("all") === "true";
    
    // By default only show approved. Or if status is missing (old records)
    const query = fetchAll ? {} : { $or: [{ status: 'approved' }, { status: { $exists: false } }] };
    
    const personalities = await Personality.find(query);
    return NextResponse.json(personalities);
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
