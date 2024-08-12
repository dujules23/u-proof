import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import Notifications from "@/models/notificationsSchema";

export async function DELETE(request: NextRequest) {
  await dbConnect();

  try {
    const { id } = await request.json();
    if (!id) {
      return NextResponse.json(
        { success: false, error: "Invalid input" },
        { status: 400 }
      );
    }

    await Notifications.deleteOne({ _id: id });

    return NextResponse.json({ success: true });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}
