import { NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import Notifications from "@/models/notificationsSchema";

export async function GET() {
  console.log("Connecting to DB...");
  await dbConnect();

  try {
    console.log("Fetching notifications...");
    const notifications = await Notifications.find({}).exec();
    console.log(process.env.MONGO_URI_PROD);
    console.log("Notifications fetched:", notifications);
    return NextResponse.json({ notifications });
  } catch (error: any) {
    console.error("Error fetching notifications:", error.message);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}
