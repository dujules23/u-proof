import { NextRequest, NextResponse } from "next/server";
import dbConnect from "../../../lib/dbConnect";
import Message from "@/models/messageSchema";
import Notifications from "@/models/notificationsSchema";
import { sendApprovalNotification } from "@/utils/helper";
import {
  ApiErrorMessage,
  createSuccessResponse,
  createErrorResponse,
  handleApiError,
} from "@/utils/errorHandler";

export async function POST(request: NextRequest) {
  await dbConnect();
  console.log("Called from the Approval Endpoint");
  try {
    const { id, approved } = await request.json();

    // Check if the message has already been processed
    const existingMessage = await Message.findById(id);
    if (!existingMessage) {
      throw new Error(ApiErrorMessage.MESSAGE_NOT_FOUND);
    }

    if (existingMessage.processed) {
      throw new Error(ApiErrorMessage.ALREADY_PROCESSED);
    }

    // Update the message's approval status and mark as processed
    existingMessage.approved = approved;
    existingMessage.processed = true;
    await existingMessage.save();

    // old implementation
    // if (existingMessage.location === "2") {
    //   const otherEmail = process.env.SECONDARY_EMAIL!;

    //   const { error: notificationError } = await sendApprovalNotification(
    //     otherEmail,
    //     existingMessage.name,
    //     existingMessage.subject,
    //     existingMessage.id.toString()
    //   );

    //   if (notificationError) {
    //     console.error("Error sending notification email:", notificationError);
    //   }
    // }

    // // For Location 2, notify both reviewers about the decision
    // if (existingMessage.location === "2") {
    //   const primaryEmail = process.env.EMAIL_1!;
    //   const secondaryEmail = process.env.SECONDARY_EMAIL!;

    //   // Send to both reviewers
    //   try {
    //     await Promise.all([
    //       sendApprovalNotification(
    //         primaryEmail,
    //         existingMessage.name,
    //         existingMessage.subject,
    //         existingMessage.id.toString()
    //       ),
    //       sendApprovalNotification(
    //         secondaryEmail,
    //         existingMessage.name,
    //         existingMessage.subject,
    //         existingMessage.id.toString()
    //       ),
    //     ]);
    //   } catch (error) {
    //     console.error("Error sending notification emails:", error);
    //   }
    // }

    const locationOneEmail = process.env.EMAIL_1;
    const locationOneSecondaryEmail = process.env.SECONDARY_EMAIL;
    const locationTwoEmail = process.env.EMAIL_2;
    const locationTwoSecondaryEmail = process.env.SECONDARY_EMAIL_2;

    if (
      !locationOneEmail ||
      !locationOneSecondaryEmail ||
      !locationTwoEmail ||
      !locationTwoSecondaryEmail
    ) {
      throw new Error(
        "Missing required environment variables for notification emails"
      );
    }

    // Map of locations to their reviewer. email lists

    const reviewerEmails: Record<string, string[]> = {
      "1": [locationOneEmail, locationOneSecondaryEmail],
      "2": [locationTwoEmail, locationTwoSecondaryEmail],
    };

    const reviewers = reviewerEmails[existingMessage.location];

    if (reviewers && reviewers.length > 0) {
      try {
        await Promise.all(
          reviewers.map((email) =>
            sendApprovalNotification(
              email,
              existingMessage.name,
              existingMessage.subject,
              existingMessage.id.toString()
            )
          )
        );
      } catch (error) {
        console.error("Error sending notification emails:", error);
      }
    }

    // Create a notification
    const notificationMessage = approved
      ? `A message from ${existingMessage.name} has been approved.`
      : `A message from ${existingMessage.name} has not been approved.`;

    const messageId = existingMessage.id;

    await Notifications.create({
      messageId: messageId,
      message: notificationMessage,
      status: approved ? "approved" : "not_approved",
    });

    return createSuccessResponse(existingMessage);
  } catch (error: any) {
    const errorState = handleApiError(error);
    return createErrorResponse(errorState);
  }
}
