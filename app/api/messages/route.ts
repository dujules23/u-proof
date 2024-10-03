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
  location: string;
  ministry: string;
  approved: boolean;
}

const resend = new Resend(process.env.RESEND_API_KEY);
// GET for retrieving emails using query
export async function GET(req: NextRequest, perPage: number, page: number) {
  try {
    await dbConnect();
    // console.log("Getting data");
    const url = new URL(req.url);
    const searchParams = new URLSearchParams(url.searchParams);
    const query = searchParams.get("query");
    const messagesFromDb = await Message.find()
      .skip(perPage * (page - 1))
      .limit(perPage);

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
  const {
    name,
    email,
    subject,
    message,
    location,
    ministry,
    approved,
  }: EmailPayload = await req.json();
  let transaction;

  try {
    console.log("Received email payload:", {
      name,
      email,
      subject,
      message,
      location,
      ministry,
      approved,
    });

    await dbConnect();

    // Start a transaction
    transaction = await Message.startSession();
    transaction.startTransaction();

    // Storing the message in the database
    console.log("Storing message in database...");
    const newMessage = await Message.create(
      [{ name, email, subject, message, location, ministry, approved }],
      { session: transaction }
    );

    // Extracting the id from the message in the database
    const messageId = newMessage[0]._id.toString();
    console.log("Message stored with ID:", messageId);

    // let recipientEmail: string | null = null;

    // console.log(location);

    // switch (location) {
    //   // Get Domain to test, then setup env files for emails
    //   case "florence":
    //     recipientEmail = "";
    //     break;
    //   case "columbia":
    //     recipientEmail = "";
    //     break;
    //   default:
    //     return NextResponse.json(
    //       { error: "Invalid location" },
    //       { status: 400 }
    //     );
    // }

    // Sending email using Resend
    console.log("Sending email...");
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

    // Log email sending result
    console.log("Email send result:", { data, error });

    // If there's an error sending the email, rollback the transaction
    if (error) {
      console.error("Error sending email:", error);
      await transaction.abortTransaction();
      return NextResponse.json({
        success: false,
        status: 500,
        error: "Failed to send email",
      });
    }

    // Commit the transaction if both operations are successful
    console.log("Committing transaction...");
    await transaction.commitTransaction();

    return NextResponse.json({
      success: true,
      status: 200,
      data: newMessage,
    });
  } catch (error) {
    // Rollback the transaction if any operation fails
    if (transaction) {
      console.log("Aborting transaction due to error...");
      await transaction.abortTransaction();
    }
    console.error("Error processing request:", error);
    return NextResponse.json({
      success: false,
      status: 500,
      error: "An unexpected error occurred",
    });
  } finally {
    // End the transaction session
    if (transaction) {
      console.log("Ending transaction session...");
      transaction.endSession();
    }
  }
}
