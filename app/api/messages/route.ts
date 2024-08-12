import dbConnect from "@/lib/dbConnect";
import Message from "@/models/messageSchema";
import { Resend } from "resend";
import * as React from "react";
import { NextRequest, NextResponse } from "next/server";
import { AirbnbReviewEmail } from "@/emails/template";

interface EmailPayload {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  approved: boolean;
}

const resend = new Resend(process.env.RESEND_API_KEY);
// GET for retrieving emails using query
export async function GET(req: NextRequest) {
  try {
    await dbConnect();
    console.log("Getting data");
    const url = new URL(req.url);
    const searchParams = new URLSearchParams(url.searchParams);
    const query = searchParams.get("query");
    const messagesFromDb = await Message.find();

    // const searchQuery = query ? query.toLowerCase() : "";
    // const messagesFromDb = await Message.find({
    //   $or: [
    //     { subject: { $regex: new RegExp(searchQuery, "i") } },
    //     { name: { $regex: new RegExp(searchQuery, "i") } },
    //     { email: { $regex: new RegExp(searchQuery, "i") } },
    //     { createdAt: { $regex: new RegExp(searchQuery, "i") } },
    //   ],
    // });

    console.log(messagesFromDb.length);
    console.log("Data Received");
    return NextResponse.json(messagesFromDb, { status: 200 });
    // return NextResponse.json([], { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch messages" },
      { status: 500 }
    );
  }
}

// POST for sending email message to be reviewed
export async function POST(req: NextRequest): Promise<NextResponse> {
  const { name, email, subject, message, approved }: EmailPayload =
    await req.json();
  let transaction;

  try {
    await dbConnect();

    // Start a transaction
    transaction = await Message.startSession();
    transaction.startTransaction();

    // Storing the message in the database
    const newMessage = await Message.create(
      [{ name, email, subject, message, approved }],
      {
        session: transaction,
      }
    );

    // grabs the id from the message in the database
    const messageId = newMessage[0]._id.toString();

    console.log(messageId);

    // Sending email using Resend
    const { data, error } = await resend.emails.send({
      from: "Acme <onboarding@resend.dev>",
      to: email,
      subject: "A new message is ready to be approved.",
      react: AirbnbReviewEmail({
        authorName: name,
        reviewText: message,
        messageId: messageId,
      }) as React.ReactElement,
    });

    // If there's an error sending the email, rollback the transaction
    if (error) {
      await transaction.abortTransaction();
      return NextResponse.json({
        success: false,
        status: 500,
        error: "Failed to send email",
      });
    }

    // Commit the transaction if both operations are successful
    await transaction.commitTransaction();

    return NextResponse.json({
      success: true,
      status: 200,
      data: newMessage,
    });
  } catch (error) {
    // Rollback the transaction if any operation fails
    if (transaction) {
      await transaction.abortTransaction();
    }
    console.error(error);
    return NextResponse.json({
      success: false,
      status: 500,
      error: "An unexpected error occurred",
    });
  } finally {
    // End the transaction session
    if (transaction) {
      transaction.endSession();
    }
  }
}
