import AirbnbReviewEmail from "@/emails/template";
import { Resend } from "resend";

// function that trims text
export const trimText = (text: string, trimBy: number) => {
  if (text?.length <= trimBy) return text;
  return text?.substring(0, trimBy).trim() + "...";
};

const resend = new Resend(process.env.RESEND_API_KEY);
// helper function for sending all emails
export const sendPrimaryEmail = async (
  to: string,
  name: string,
  subject: string,
  message: string,
  messageId: string
) => {
  console.log(message);
  return resend.emails.send({
    from: "FWC <uproof@mychurchisawesome.com>",
    to,
    subject: "A new message is ready to be approved.",
    react: AirbnbReviewEmail({
      authorName: name,
      subject: subject,
      reviewText: message,
      messageId: messageId,
    }) as React.ReactElement,
  });
};

// helper function from sending following up email if at a certain location
export const sendFollowUpEmail = async (
  to: string,
  name: string,
  subject: string,
  message: string,
  messageId: string
) => {
  return resend.emails.send({
    from: "FWC <uproof@mychurchisawesome.com>",
    to,
    subject: "A new message is ready to be reviewed",
    react: AirbnbReviewEmail({
      authorName: name,
      subject: subject,
      reviewText: message,
      messageId: messageId,
    }) as React.ReactElement,
  });
};
