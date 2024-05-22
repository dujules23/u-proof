import dbConnect from "@/lib/dbConnect";
import Message from "@/models/messageSchema";
import { Resend } from "resend";
import * as React from "react";
import { NextRequest, NextResponse } from "next/server";
import { Email } from "@/emails/email-template";

interface EmailPayload {
  name: string;
  email: string;
  subject: string;
  message: string;
}

const resend = new Resend(process.env.RESEND_API_KEY);
// GET for retrieving emails using query
export async function GET(req: NextRequest) {
  try {
    await dbConnect();

    const url = new URL(req.url);
    const searchParams = new URLSearchParams(url.searchParams);
    const query = searchParams.get("query");
    const messagesFromDb = await Message.find({ query });

    return NextResponse.json(messagesFromDb, { status: 200 });
  } catch (error) {
    console.error("Error fetching messages:", error);
  }
}

// POST for sending email message to be reviewed
export async function POST(req: NextRequest): Promise<NextResponse> {
  const { name, email, subject, message }: EmailPayload = await req.json();
  let transaction;

  try {
    await dbConnect();

    // Start a transaction
    transaction = await Message.startSession();
    transaction.startTransaction();

    // Sending email using Resend
    const { data, error } = await resend.emails.send({
      from: "Acme <onboarding@resend.dev>",
      to: email,
      subject: "A new message is ready to be approved.",
      react: Email({
        firstName: name,
        message: message,
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

    // Storing the message in the database
    const newMessage = await Message.create(
      [{ name, email, subject, message }],
      {
        session: transaction,
      }
    );

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
