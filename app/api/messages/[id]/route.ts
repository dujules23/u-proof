import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect"; // Your DB connection utility
import Message from "@/models/messageSchema"; // Your Message model

export async function GET(req: NextRequest) {
  await dbConnect();

  const url = new URL(req.url);
  const id = url.pathname.split("/").pop();

  try {
    // Fetch the message by ID
    const message = await Message.findById(id);
    if (!message) {
      return NextResponse.json({ error: "Message not found" }, { status: 404 });
    }
    return NextResponse.json(message);
  } catch (error) {
    console.error("Error fetching message:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch message" },
      { status: 500 }
    );
  }
}

export async function PATCH(req: NextRequest) {
  await dbConnect();

  const body = await req.json();

  const { newMessage } = body;

  const url = new URL(req.url);
  const _id = url.pathname.split("/").pop();

  if (!_id || !newMessage) {
    return NextResponse.json({
      error: "Message ID and new message are required",
    });
  }

  try {
    const updatedMessage = await Message.updateOne(
      { _id: _id },
      { $set: { message: newMessage } }
    );

    if (!updatedMessage) {
      return NextResponse.json({ error: "Message not found" }, { status: 404 });
    }
    return NextResponse.json({
      message: "Message field updated successfully.",
    });
  } catch (error) {
    console.error("Error updating message:", error);
    return NextResponse.json(
      { success: false, error: "Failed to update message" },
      { status: 500 }
    );
  }
}
