import * as React from "react";
import {
  Html,
  Container,
  Heading,
  Text,
  Body,
  Section,
  Img,
} from "@react-email/components";
import { Tailwind } from "@react-email/tailwind";

interface EmailTemplateProps {
  firstName: string;
  message: string;
}

export const Email: React.FC<Readonly<EmailTemplateProps>> = ({
  firstName,
  message,
}) => (
  <Html>
    <Tailwind>
      <Body className="bg-gray-400">
        <Container>
          <Section className="mt-[32px]">
            <Img src="" />
          </Section>
          <Heading className="text-black">uProof</Heading>
          <Heading className="text-black">
            {firstName} has sent a message for review.
          </Heading>
          <Text className="prose text-black">{message}</Text>
          <Text className="text-black">
            If this message is satisfactory, click here for approval.
          </Text>
        </Container>
      </Body>
    </Tailwind>
  </Html>
);
