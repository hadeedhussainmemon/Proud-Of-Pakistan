import { NextResponse } from "next/server";
import dbConnect from "@/lib/db";
import User, { UserRole } from "@/models/User";

export async function POST(req: Request) {
  try {
    await dbConnect();
    const { name, email, password } = await req.json();

    if (!name || !email || !password) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return NextResponse.json({ error: "Email is already registered" }, { status: 400 });
    }

    // Creating the user.
    // Note: In production you should hash the password with bcrypt before saving.
    // Since the current auth setup uses plain text comparison in credentials provider,
    // we save it as plain text here as well to match.
    const newUser = await User.create({
      name,
      email,
      password,
      role: UserRole.USER,
    });

    return NextResponse.json({ success: true, user: { id: newUser._id, email: newUser.email, name: newUser.name } }, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

