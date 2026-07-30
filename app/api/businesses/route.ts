import { NextResponse } from "next/server";
import dbConnect from "@/lib/db";
import Business from "@/models/Business";

export async function GET() {
  try {
    await dbConnect();
    const businesses = await Business.find({});
    return NextResponse.json(businesses);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    await dbConnect();
    const body = await req.json();
    const newBusiness = await Business.create(body);
    return NextResponse.json(newBusiness, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
