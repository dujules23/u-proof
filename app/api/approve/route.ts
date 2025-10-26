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

    // For Location 2, notify both reviewers about the decision
    if (existingMessage.location === "2") {
      const primaryEmail = process.env.EMAIL_1!;
      const secondaryEmail = process.env.SECONDARY_EMAIL!;

      // Send to both reviewers
      try {
        await Promise.all([
          sendApprovalNotification(
            primaryEmail,
            existingMessage.name,
            existingMessage.subject,
            existingMessage.id.toString()
          ),
          sendApprovalNotification(
            secondaryEmail,
            existingMessage.name,
            existingMessage.subject,
            existingMessage.id.toString()
          ),
        ]);
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
