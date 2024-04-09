import * as React from "react";

interface EmailTemplateProps {
  firstName: string;
  message: string;
}

export const EmailTemplate: React.FC<Readonly<EmailTemplateProps>> = ({
  firstName,
  message,
}) => (
  <div>
    <h1>{firstName} has sent a message for review.</h1>
    <p>{message}</p>
    <p>If this message is satisfactory, click here for approval.</p>
  </div>
);
