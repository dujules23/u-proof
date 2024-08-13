import {
  Body,
  Button,
  Container,
  Head,
  Hr,
  Html,
  Preview,
  Row,
  Section,
  Text,
} from "@react-email/components";
import * as React from "react";

import { FaBookOpenReader } from "react-icons/fa6";

interface AirbnbReviewEmailProps {
  authorName?: string;
  authorImage?: string;
  reviewText?: string;
  messageId: string;
}

// const baseUrl = process.env.VERCEL_URL
//   ? `https://${process.env.VERCEL_URL}`
//   : "";

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "";

export const AirbnbReviewEmail = ({
  authorName,
  authorImage,
  reviewText,
  messageId,
}: AirbnbReviewEmailProps) => {
  const previewText = `${authorName} sent you a message for review.`;
  const APP_NAME = "uProof";

  console.log("Message Id:--------->", messageId);

  const approveLink = `${baseUrl}/approve-page?id=${messageId}&approved=true`;

  return (
    <Html>
      <Head />
      <Preview>{previewText}</Preview>

      <Body style={main}>
        <Container style={container}>
          <Section style={icon}>
            <FaBookOpenReader />
            {/* <svg strokeWidth="0" viewBox="0 0 512 512 height="1em">  */}
            {/* <svg
              stroke="currentColor"
              fill="currentColor"
              stroke-width="0"
              viewBox="0 0 512 512"
              height="1em"
              width="1em"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M352 96c0-53.02-42.98-96-96-96s-96 42.98-96 96 42.98 96 96 96 96-42.98 96-96zM233.59 241.1c-59.33-36.32-155.43-46.3-203.79-49.05C13.55 191.13 0 203.51 0 219.14v222.8c0 14.33 11.59 26.28 26.49 27.05 43.66 2.29 131.99 10.68 193.04 41.43 9.37 4.72 20.48-1.71 20.48-11.87V252.56c-.01-4.67-2.32-8.95-6.42-11.46zm248.61-49.05c-48.35 2.74-144.46 12.73-203.78 49.05-4.1 2.51-6.41 6.96-6.41 11.63v245.79c0 10.19 11.14 16.63 20.54 11.9 61.04-30.72 149.32-39.11 192.97-41.4 14.9-.78 26.49-12.73 26.49-27.06V219.14c-.01-15.63-13.56-28.01-29.81-27.09z"></path>
            </svg> */}

            <span style={title}>{APP_NAME}</span>
          </Section>
          <Section style={{ paddingBottom: "20px" }}>
            <Row>
              <Text
                style={heading}
              >{`You've received a message from ${authorName} that needs review.`}</Text>
              <Text style={heading}>{`Here's what ${authorName} wrote:`}</Text>
              <Text style={review}>{reviewText}</Text>
              <Text style={paragraph}>
                {`Click the button below to approve or request an edit for ${authorName}'s
                message.`}
              </Text>

              <Button style={button} href={approveLink}>
                Approve/Edit Message
              </Button>
            </Row>
          </Section>

          <Hr style={hr} />
        </Container>
      </Body>
    </Html>
  );
};

AirbnbReviewEmail.PreviewProps = {
  authorName: "Alex",
  authorImage: `${baseUrl}/static/airbnb-review-user.jpg`,
  reviewText: `“Alan was a great guest! Easy communication, the apartment was left
    in great condition, very polite, and respectful of all house rules.
    He’s welcome back anytime and would easily recommend him to any
    host!”`,
} as AirbnbReviewEmailProps;

export default AirbnbReviewEmail;

const main = {
  backgroundColor: "#ffffff",
  fontFamily:
    '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Oxygen-Sans,Ubuntu,Cantarell,"Helvetica Neue",sans-serif',
};

const container = {
  margin: "0 auto",
  padding: "20px 0 48px",
  width: "580px",
  maxWidth: "100%",
};

const userImage = {
  margin: "0 auto",
  marginBottom: "16px",
  borderRadius: "50%",
};

const heading = {
  fontSize: "32px",
  lineHeight: "1.3",
  fontWeight: "700",
  color: "#484848",
};

const paragraph = {
  fontSize: "18px",
  lineHeight: "1.4",
  color: "#484848",
};

const review = {
  ...paragraph,
  padding: "24px",
  backgroundColor: "#f2f3f3",
  borderRadius: "4px",
};

const button = {
  backgroundColor: "#038C4C",
  borderRadius: "3px",
  color: "#fff",
  fontSize: "18px",
  paddingTop: "19px",
  paddingBottom: "19px",
  textDecoration: "none",
  textAlign: "center" as const,
  display: "block",
  width: "100%",
};

const link = {
  ...paragraph,
  color: "#ff5a5f",
  display: "block",
};

const reportLink = {
  fontSize: "14px",
  color: "#9ca299",
  textDecoration: "underline",
};

const hr = {
  borderColor: "#cccccc",
  margin: "20px 0",
};

const footer = {
  color: "#9ca299",
  fontSize: "14px",
  marginBottom: "10px",
};

const icon = {
  fontSize: "40px",
  justifyContent: "space-between",
};

const title = {
  paddingLeft: "15px",
};
