import dbConnect from "@/lib/dbConnect";
import Message from "@/models/messageSchema";
import { Resend } from "resend";
import * as React from "react";
import { NextRequest, NextResponse } from "next/server";
import { sendFollowUpEmail, sendPrimaryEmail } from "@/utils/helper";

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

    // Location map of each location and their respective emails
    const locationEmailMap: { [key: string]: string | undefined } = {
      "1": process.env.EMAIL_1,
      "2": process.env.EMAIL_2,
      "3": process.env.EMAIL_3,
      "4": process.env.EMAIL_4,
    };

    let recipientEmail = locationEmailMap[location];

    // if the email isn't in this list, error
    if (!recipientEmail) {
      await transaction.abortTransaction();
      return NextResponse.json({ error: "Invalid location" }, { status: 400 });
    }

    // sending the primary email
    const { data, error: primaryError } = await sendPrimaryEmail(
      recipientEmail,
      name,
      subject,
      message,
      messageId
    );

    // if there is an error, rollback the transaction
    if (primaryError) {
      console.error("Error sending primary email:", primaryError);
      await transaction.abortTransaction();
      return NextResponse.json(
        { error: "Failed to send primary email" },
        { status: 500 }
      );
    }

    // Log email sending result
    console.log("Email send result:", { data, primaryError });

    // New logic for sending follow-up emails to SECONDARY_EMAIL and SECONDARY_EMAIL_2 for location 1 and 2

    const locationOneSecondaryEmail = process.env.SECONDARY_EMAIL;
    const locationTwoSecondaryEmail = process.env.SECONDARY_EMAIL_2;

    if (!locationOneSecondaryEmail || !locationTwoSecondaryEmail) {
      throw new Error(
        "Missing required environment variables for follow-up emails"
      );
    }

    // Map of locations to follow-up emails

    const followUpEmails: Record<string, string> = {
      "1": locationOneSecondaryEmail,
      "2": locationTwoSecondaryEmail,
    };

    const followUpEmail = followUpEmails[location];

    if (followUpEmail) {
      const { data, error: followUpError } = await sendFollowUpEmail(
        followUpEmail,
        name,
        subject,
        message,
        messageId
      );

      if (followUpError) {
        console.error("Error sending follow-up email:", followUpError);
        await transaction.abortTransaction();
        return NextResponse.json(
          { error: "Failed to send follow-up email" },
          { status: 500 }
        );
      }

      console.log("Email send result:", { data, followUpError });
    }

    // KEEP THIS COMMENTED OUT FOR NOW, this was the original logic where only location 2 got a follow-up email

    // let otherEmail: string = process.env.SECONDARY_EMAIL!;

    // // if specific location, send an additional email to another person
    // if (location === "2") {
    //   const { data, error: followUpError } = await sendFollowUpEmail(
    //     otherEmail,
    //     name,
    //     subject,
    //     message,
    //     messageId
    //   );
    //   if (followUpError) {
    //     console.error("Error sending follow-up email:", followUpError);
    //     await transaction.abortTransaction(); // Roll back if sending fails
    //     return NextResponse.json(
    //       { error: "Failed to send follow-up email" },
    //       { status: 500 }
    //     );
    //   }

    //   // Log email sending result
    //   console.log("Email send result:", { data, followUpError });
    // }

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
