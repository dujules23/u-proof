import User from "@/models/userSchema";
import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";

dbConnect();

export async function POST(request: NextRequest) {
  console.log("Called from the User Endpoint");
  try {
    const { email, name } = await request.json();

    console.log(email, name);

    // Check if the user exists
    const existingUser = await User.findOne({ email }).exec();

    if (existingUser) {
      return NextResponse.json(
        { success: false, error: "User already exists" },
        { status: 400 }
      );
    }

    // Create a new user
    const user = await User.create({
      email,
      name,
    });

    console.log(user);

    return NextResponse.json({ success: true, data: user });
  } catch (error: any) {
    console.error("Error in user endpoint:", error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 400 }
    );
  }
}
