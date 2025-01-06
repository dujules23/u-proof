import dbConnect from "@/lib/dbConnect";
import RequestedEdit from "@/models/requestedEditSchema";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  await dbConnect();
  console.log("Called from the Requested Edit GET Endpoint");

  try {
    // const { id } = params; // Get the message ID from the URL

    const url = new URL(req.url);
    const id = url.pathname.split("/").pop();

    console.log(id);

    // Look up the requested edit using the message ID
    const requestedEdit = await RequestedEdit.findOne({ messageId: id }).exec();

    // console.log(requestedEdit);

    if (!requestedEdit) {
      return NextResponse.json(
        { success: false, error: "Requested edit not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, data: requestedEdit });
  } catch (error: any) {
    console.error("Error in requested edit GET endpoint:", error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 400 }
    );
  }
}
