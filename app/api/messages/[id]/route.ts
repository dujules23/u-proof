import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import Message from "@/models/messageSchema";
import { ObjectId } from "mongodb";

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

  const { newMessage, needsEdit } = body;

  const url = new URL(req.url);
  const _id = url.pathname.split("/").pop();

  if (!_id || !newMessage) {
    return NextResponse.json({
      error: "Message ID and new message are required",
    });
  }

  try {
    // Different update objects based on whether it's a requested edit or regular edit
    const updateData = needsEdit
      ? {
          // For requested edits
          message: newMessage,
          needsEdit: false,
          status: "approved",
          requestedEdit: null,
          processed: true,
        }
      : {
          // For regular edits
          message: newMessage,
          // Preserve existing status and other fields
        };

    const updatedMessage = await Message.findByIdAndUpdate(
      _id,
      { $set: updateData },
      { new: true }
    );

    if (!updatedMessage) {
      return NextResponse.json({ error: "Message not found" }, { status: 404 });
    }
    return NextResponse.json({
      message: "Message field updated successfully.",
      data: updatedMessage,
    });
  } catch (error) {
    console.error("Error updating message:", error);
    return NextResponse.json(
      { success: false, error: "Failed to update message" },
      { status: 500 }
    );
  }
}

export async function DELETE(req: NextRequest) {
  await dbConnect();

  const url = new URL(req.url);
  const _id = url.pathname.split("/").pop();

  // if id is not present or not a valid id (ObjectID), endpoint will fail
  // throws 405 if id is not included in the url and a delete is attempted

  if (!_id || !ObjectId.isValid(_id)) {
    return NextResponse.json(
      { error: "Invalid or missing ID" },
      { status: 400 }
    );
  }

  try {
    const result = await Message.deleteOne({ _id: _id });

    // if there is no deleted count on the message, it does not exist, so the message is not found.
    if (result.deletedCount === 0) {
      return NextResponse.json({ error: "Message not found" }, { status: 404 });
    }

    // Happy path, Message deleted successfully
    return NextResponse.json(
      { message: "Message deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
