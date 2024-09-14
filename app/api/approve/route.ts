import { NextRequest, NextResponse } from "next/server";
import dbConnect from "../../../lib/dbConnect";
import Message from "@/models/messageSchema";
import Notifications from "@/models/notificationsSchema";

export async function POST(request: NextRequest) {
  await dbConnect();
  console.log("Called from the Approval Endpoint");
  try {
    const { id, approved } = await request.json();

    // Check if the message has already been processed
    const existingMessage = await Message.findById(id);
    if (!existingMessage) {
      return NextResponse.json(
        { success: false, error: "Message not found" },
        { status: 404 }
      );
    }

    if (existingMessage.processed) {
      return NextResponse.json(
        { success: false, error: "This message has already been processed." },
        { status: 400 }
      );
    }

    // Update the message's approval status and mark as processed
    existingMessage.approved = approved;
    existingMessage.processed = true;
    await existingMessage.save();

    // Create a notification
    const notificationMessage = approved
      ? `A message from ${existingMessage.name} has been approved.`
      : `A message from ${existingMessage.name} has not been approved.`;

    const messageId = existingMessage.id;

    await Notifications.create({
      messageId: messageId,
      message: notificationMessage,
      status: approved ? "approved" : "not_approved",
    });

    return NextResponse.json({ success: true, data: existingMessage });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 400 }
    );
  }
}
