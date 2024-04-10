import dbConnect from "@/lib/dbConnect";
import Message from "@/models/messageSchema";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  // destructure items from model in to the request body
  const { name, email, message } = await req.json();
  try {
    await dbConnect();

    // put destructured items into newMessage instance
    const newMessage = await Message.create({
      name,
      email,
      message,
    });

    // return body with status 200
    return NextResponse.json({
      success: true,
      status: 200,
      data: newMessage,
    });
  } catch (error) {
    // return error if database
    console.log(error);
    return NextResponse.json({ success: false, status: 500 });
  }
}
