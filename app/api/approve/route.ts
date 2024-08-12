import { NextRequest, NextResponse } from "next/server";
import dbConnect from "../../../lib/dbConnect";
import Message from "@/models/messageSchema";
import Notifications from "@/models/notificationsSchema";

export async function POST(request: NextRequest) {
  await dbConnect();

  try {
    const { id, approved } = await request.json();

    console.log("Request Body:", { id, approved });

    // Validate input
    if (!id || typeof approved !== "boolean") {
      return NextResponse.json(
        { success: false, error: "Invalid input" },
        { status: 400 }
      );
    }

    // Update the message's approval status
    const result = await Message.findByIdAndUpdate(
      id, // MongoDB's findById method expects the id as a string
      { approved },
      { new: true }
    );

    if (!result) {
      return NextResponse.json(
        { success: false, error: "Message not found" },
        { status: 404 }
      );
    }

    // Create a notification
    const notificationMessage = approved
      ? `Message with ID ${id} has been approved.`
      : `Message with ID ${id} has not been approved.`;

    await Notifications.create({
      message: notificationMessage,
      status: approved ? "approved" : "not_approved",
    });

    return NextResponse.json({ success: true, data: result });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 400 }
    );
  }
}
