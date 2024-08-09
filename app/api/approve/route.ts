import { NextRequest, NextResponse } from "next/server";
import dbConnect from "../../../lib/dbConnect";
import Message from "@/models/messageSchema";

export async function POST(request: NextRequest) {
  await dbConnect();

  const { id, approved } = await request.json();

  try {
    const result = await Message.findByIdAndUpdate(
      id,
      { approved },
      { new: true }
    );
    return NextResponse.json({ success: true, data: result });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 400 }
    );
  }
}
