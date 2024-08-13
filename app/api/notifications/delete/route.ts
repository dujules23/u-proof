import { NextRequest, NextResponse } from "next/server";
import dbConnect from "../../../../lib/dbConnect";
import Notifications from "@/models/notificationsSchema";

export async function DELETE(request: NextRequest) {
  await dbConnect();

  try {
    // Parse the request body
    let body;
    try {
      body = await request.json();
    } catch (error) {
      // If parsing fails, it might be a raw string
      console.error("Error parsing JSON:", error);
      body = await request.text(); // Attempt to read as plain text
    }

    console.log("Initial Request Body:", body);

    // Handle both JSON and raw string cases
    const id = typeof body === "string" ? body : body.id;
    console.log("Extracted ID:", id);

    // Validate input
    if (!id) {
      console.error("Invalid input: ID is missing or undefined");
      return NextResponse.json(
        { success: false, error: "Invalid input" },
        { status: 400 }
      );
    }

    // Perform the deletion
    const result = await Notifications.findByIdAndDelete(id);
    console.log("Deletion result:", result);

    if (!result) {
      console.error("Notification not found for ID:", id);
      return NextResponse.json(
        { success: false, error: "Notification not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error("Error in DELETE endpoint:", error.message);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}
