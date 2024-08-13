import { NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import Notifications from "@/models/notificationsSchema";

export async function GET() {
  await dbConnect();

  try {
    const notifications = await Notifications.find({}).exec();
    return NextResponse.json({ notifications });
  } catch (error: any) {
    console.error("Error fetching notifications:", error.message);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}
