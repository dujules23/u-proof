import {
  Body,
  Button,
  Column,
  Container,
  Head,
  Hr,
  Html,
  Img,
  Preview,
  Row,
  Section,
  Text,
} from "@react-email/components";
import * as React from "react";
import Image from "next/image";

import { FaBookOpenReader } from "react-icons/fa6";

interface AirbnbReviewEmailProps {
  authorName?: string;
  authorImage?: string;
  subject?: string;
  reviewText?: string;
  messageId: string;
}

// const baseUrl = process.env.VERCEL_URL
//   ? `https://${process.env.VERCEL_URL}`
//   : "";

const baseUrl =
  process.env.NODE_ENV === "production"
    ? process.env.NEXT_PUBLIC_BASE_URL_PROD
    : process.env.NEXT_PUBLIC_BASE_URL_DEV || "";

export const AirbnbReviewEmail = ({
  authorName,
  authorImage,
  subject,
  reviewText,
  messageId,
}: AirbnbReviewEmailProps) => {
  const previewText = `${authorName} sent you a message for review.`;
  const APP_NAME = "uProof";
  const logo = "./logo.png";

  console.log(reviewText);

  const approveLink = `${baseUrl}/approve-page?id=${messageId}&approved=true`;

  const editLink = `${baseUrl}/request-edit?id=${messageId}`;

  return (
    <Html>
      <Head />
      <Preview>{previewText}</Preview>

      <Body style={main}>
        <Container style={container}>
          <Section style={header}>
            <Img
              src="https://res.cloudinary.com/dufnwtwtz/image/upload/v1728185584/uProof/FWC_Logo_Icon_Black_wwns0q.png"
              alt="logo"
              width={50}
              height={50}
            />
            <span style={title}>{APP_NAME}</span>
          </Section>
          <Section style={{ paddingBottom: "5px" }}>
            <Row>
              <Text
                style={heading}
              >{`You've received a message from ${authorName} that needs review.`}</Text>
              <Text style={heading}>{`Here's what ${authorName} wrote:`}</Text>
              <Section style={review}>
                <Text style={subjectHeading}> Subject: {subject}</Text>
                <Text>{reviewText}</Text>
              </Section>
              <Text style={paragraph}>
                {`Approve this message or request an edit for ${authorName}'s
                message below.`}
              </Text>
            </Row>
          </Section>

          <Hr style={hr} />
        </Container>
        <Container style={container}>
          <Button style={button1} href={approveLink}>
            Approve Message
          </Button>

          <Button style={button2} href={editLink}>
            Request Edit
          </Button>
        </Container>
      </Body>
    </Html>
  );
};

AirbnbReviewEmail.PreviewProps = {
  authorName: "Alex",
  authorImage: `${baseUrl}/static/airbnb-review-user.jpg`,
  subject: "New Message",
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
  padding: "20px",
  width: "580px",
  maxWidth: "100%",
};

const heading = {
  fontSize: "32px",
  lineHeight: "1.3",
  fontWeight: "700",
  color: "#484848",
};

const subjectHeading = {
  fontSize: "20px",
  // lineHeight: "1",
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
  padding: "20px",
  backgroundColor: "#f2f3f3",
  borderRadius: "4px",
};

const button1 = {
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

const button2 = {
  backgroundColor: "#bb2124",
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

const hr = {
  borderColor: "#cccccc",
  margin: "20px 0",
};

const header = {
  display: "flex",
  alignItems: "center",
  fontSize: "40px",
  justifyContent: "space-between",
};

const title = {
  paddingLeft: "0px",
};
