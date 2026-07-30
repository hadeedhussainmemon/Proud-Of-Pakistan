import { NextResponse } from "next/server";
import dbConnect from "@/lib/db";
import User from "@/models/User";

export async function POST(req: Request) {
  try {
    await dbConnect();
    const { newPassword } = await req.json();
    if (!newPassword) {
      return NextResponse.json({ error: "Password is required" }, { status: 400 });
    }

    // Find and update the default seeded admin user
    await User.findOneAndUpdate(
      { email: "admin@proudofpakistan.com" },
      { $set: { password: newPassword } }
    );

    return NextResponse.json({ success: true, message: "Admin password updated successfully!" });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
