import { NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import Notifications from "@/models/notificationsSchema";

export async function GET() {
  await dbConnect();

  try {
    const notifications = await Notifications.find({}).lean();
    return NextResponse.json({ notifications });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}
