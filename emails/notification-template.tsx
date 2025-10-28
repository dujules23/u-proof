// emails/notification-template.tsx
import {
  Body,
  Button,
  Container,
  Head,
  Hr,
  Html,
  Img,
  Preview,
  Section,
  Text,
} from "@react-email/components";
import * as React from "react";

interface NotificationEmailProps {
  authorName: string;
  status: "approved" | "edited";
  subject?: string;
  messageId: string;
}

const baseUrl =
  process.env.NODE_ENV === "production"
    ? process.env.NEXT_PUBLIC_BASE_URL_PROD
    : process.env.NEXT_PUBLIC_BASE_URL_DEV || "";

export const NotificationEmail = ({
  authorName,
  status,
  subject,
  messageId,
}: NotificationEmailProps) => {
  const previewText = `Message from ${authorName} has been ${status}`;
  const APP_NAME = "uProof";

  const viewMessageLink = `${baseUrl}/messages/${messageId}`;

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
            <Text style={heading}>Message Already Processed</Text>

            <Section style={notification}>
              <Text style={paragraph}>
                The message from <strong>{authorName}</strong> has already been{" "}
                {status}.
              </Text>
              {subject && <Text style={subjectText}>Subject: {subject}</Text>}
              <Text style={paragraph}>
                No further action is needed for this message.
              </Text>
            </Section>
          </Section>

          <Hr style={hr} />

          <Section>
            <Button style={button} href={viewMessageLink}>
              View Message Details
            </Button>
          </Section>
        </Container>
      </Body>
    </Html>
  );
};

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

const header = {
  display: "flex",
  alignItems: "center",
  fontSize: "40px",
  justifyContent: "space-between",
};

const title = {
  paddingLeft: "0px",
};

const heading = {
  fontSize: "32px",
  lineHeight: "1.3",
  fontWeight: "700",
  color: "#484848",
  textAlign: "center" as const,
};

const paragraph = {
  fontSize: "18px",
  lineHeight: "1.4",
  color: "#484848",
};

const subjectText = {
  fontSize: "16px",
  color: "#666666",
  marginTop: "10px",
};

const notification = {
  padding: "20px",
  backgroundColor: "#f8f9fa",
  borderRadius: "4px",
  border: "1px solid #e9ecef",
  marginTop: "20px",
};

const button = {
  backgroundColor: "#038C4C",
  borderRadius: "3px",
  color: "#fff",
  fontSize: "18px",
  padding: "15px 0",
  textDecoration: "none",
  textAlign: "center" as const,
  display: "block",
  width: "100%",
};

const hr = {
  borderColor: "#cccccc",
  margin: "20px 0",
};

export default NotificationEmail;
