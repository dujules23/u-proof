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
  const logo = "./logo.png";

  console.log("Message Id:--------->", messageId);

  const approveLink = `${baseUrl}/approve-page?id=${messageId}&approved=true`;

  const editLink = `${baseUrl}/request-edit?id=${messageId}&approved=true`;

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
          <Section style={{ paddingBottom: "20px" }}>
            <Row>
              <Text
                style={heading}
              >{`You've received a message from ${authorName} that needs review.`}</Text>
              <Text style={heading}>{`Here's what ${authorName} wrote:`}</Text>
              <Text style={review}>{reviewText}</Text>
              <Text style={paragraph}>
                {`Approve or request an edit for ${authorName}'s
                message below.`}
              </Text>
            </Row>
          </Section>

          <Hr style={hr} />
        </Container>
        <Container style={container2}>
          <Button style={button1} href={approveLink}>
            Approve Message
          </Button>

          <Button style={button2} href={approveLink}>
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

const buttonArea = {
  display: "flex",
  justifyContent: "space-between",
};

const container = {
  margin: "0 auto",
  padding: "20px 0 48px",
  width: "580px",
  maxWidth: "100%",
};

const container2 = {
  paddingLeft: "35px",
  justifyContent: "space-between",
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

const header = {
  display: "flex",
  alignItems: "center",
  fontSize: "40px",
  justifyContent: "space-between",
};

const icon = {
  color: "#000000",
};

const title = {
  paddingLeft: "0px",
};
