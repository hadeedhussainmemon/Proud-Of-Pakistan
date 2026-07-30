import { NextResponse } from "next/server";
import dbConnect from "@/lib/db";
import Subscriber from "@/models/Subscriber";

export async function POST(req: Request) {
  try {
    await dbConnect();
    const { email } = await req.json();
    if (!email || !email.includes("@")) {
      return NextResponse.json({ error: "Invalid email address" }, { status: 400 });
    }

    const existing = await Subscriber.findOne({ email: email.toLowerCase().trim() });
    if (existing) {
      return NextResponse.json({ error: "Email is already subscribed!" }, { status: 400 });
    }

    await Subscriber.create({ email: email.toLowerCase().trim() });
    return NextResponse.json({ success: true, message: "Thank you for subscribing!" });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
