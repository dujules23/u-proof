import dbConnect from "@/lib/dbConnect";
import Message from "@/models/messageSchema";
import Notifications from "@/models/notificationsSchema";
import RequestedEdit from "@/models/requestedEditSchema";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  await dbConnect();
  console.log("Called from the Edit Request Endpoint");
  try {
    const { id, createdAt, requestedEdit, needsEdit } = await request.json();

    console.log(id, requestedEdit, createdAt, needsEdit);

    // Check if the message exists
    const existingMessage = await Message.findById(id).exec();

    if (!existingMessage) {
      return NextResponse.json(
        { success: false, error: "Message not found" },
        { status: 404 }
      );
    }

    if (existingMessage.needsEdit) {
      return NextResponse.json(
        { success: false, error: "This message is already being edited." },
        { status: 400 }
      );
    }

    // (Optional) Add logic to mark the message with a "needs_edit" status
    existingMessage.needsEdit = true; // Add this field to your schema if needed
    console.log(existingMessage);
    await existingMessage.save();

    const messageId = existingMessage.id;

    // create entry in requested edit database
    const edit = await RequestedEdit.create({
      requestedEdit,
      status: needsEdit ? "pending" : "completed",
      messageId: messageId,
      createdAt,
    });

    console.log(edit);

    // Create a notification for the edit request
    const notificationMessage = `${existingMessage.name}, An edit has been requested for your message.`;

    await Notifications.create({
      messageId: id,
      message: notificationMessage,
      status: "requested_edit",
    });

    return NextResponse.json({ success: true, data: existingMessage });
  } catch (error: any) {
    console.error("Error in edit request endpoint:", error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 400 }
    );
  }
}
