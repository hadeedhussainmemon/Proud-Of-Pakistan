import { NextResponse } from "next/server";
import dbConnect from "@/lib/db";
import SiteConfig from "@/models/SiteConfig";

export async function GET() {
  try {
    await dbConnect();
    let config = await SiteConfig.findOne({ key: "main" });
    if (!config) {
      config = await SiteConfig.create({ key: "main" });
    }
    return NextResponse.json(config);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    await dbConnect();
    const data = await req.json();
    let config = await SiteConfig.findOneAndUpdate(
      { key: "main" },
      { $set: data },
      { new: true, upsert: true }
    );
    return NextResponse.json(config);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
