import dbConnect from "@/lib/dbConnect";
import Message from "@/models/messageSchema";
import { NextRequest, NextResponse } from "next/server";

interface SortedMessages {
  limit: number;
  pageNo: number;
  skip?: number;
}

export async function GET(req: NextRequest) {
  await dbConnect();
  try {
    const url = new URL(req.url);
    const limit = parseInt(url.searchParams.get("limit") || "0");
    const pageNo = parseInt(url.searchParams.get("pageNo") || "0");
    const skip = parseInt(url.searchParams.get("skip") || "0");

    // if (!limit || limit > 10) {
    //   return NextResponse.json(
    //     { error: "Please use limit under 10 and a valid page number" },
    //     { status: 400 }
    //   );
    // }

    const finalSkip = skip || limit * pageNo;

    const sortedMessages = await Message.find()
      .sort({ createdAt: "desc" })
      .select("-content")
      .skip(finalSkip)
      .limit(limit);

    return NextResponse.json(sortedMessages, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "An error occurred while fetching messages" },
      { status: 500 }
    );
  }
}
