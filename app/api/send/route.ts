import { EmailTemplate } from "../../../components/email-template";
import { Resend } from "resend";
import * as React from "react";
import { NextRequest } from "next/server";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: NextRequest) {
  const { name, email, message } = await req.json();
  try {
    const { data, error } = await resend.emails.send({
      from: "Acme <onboarding@resend.dev>",
      to: `${email}`,
      subject: "A new message is ready to be approved.",
      react: EmailTemplate({
        firstName: "John",
        message: message,
      }) as React.ReactElement,
    });

    if (error) {
      return Response.json({ error });
    }
    console.log(data);
    return Response.json({ data });
  } catch (error) {
    console.log(error);
    return Response.json({ error });
  }
}
