import { NextResponse } from "next/server";
import dbConnect from "@/lib/db";
import Personality from "@/models/Personality";

export async function GET() {
  try {
    await dbConnect();
    const personalities = await Personality.find({});
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
