"use client";

import { FormEvent, useState } from "react";
import ActionButton from "./buttons/ActionButton";
import { toast } from "sonner";
import Input from "./common/Input";
import Select from "./common/Select";
import TextArea from "./common/TextArea";

export default function MessageForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [subject, setSubject] = useState("");
  const [location, setLocation] = useState("");
  const [ministry, setMinistry] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [submitting, setSubmitting] = useState<boolean>(false);

  const locationOptions = [
    { label: "Florence", value: "1" },
    { label: "Columbia", value: "2" },
    { label: "Sumter", value: "3" },
    { label: "Georgetown", value: "4" },
  ];

  const ministryOptions = [
    { label: "Music", value: "1" },
    { label: "Media", value: "2" },
    { label: "YBY", value: "3" },
    { label: "50+", value: "4" },
    { label: "Other", value: "5" },
  ];

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitting(true);
    // sends message out via resend and sends message to database
    try {
      const messageSent = await fetch(`/api/messages`, {
        method: "POST",
        body: JSON.stringify({
          name,
          email,
          subject,
          message,
          location,
          ministry,
        }),
        headers: { "Content-Type": "application/json" },
      });

      // handles error on the frontend
      if (messageSent.status !== 200) {
        toast.error("Message did not send.", {
          classNames: {
            toast: "bg-red-300",
          },
        });
        setSubmitting(false);
        throw new Error("Failed to send message, Not Found");
      }

      setName("");
      setEmail("");
      setMessage("");
      setSubject("");
      setLocation("");
      setMinistry("");
      toast.success("Message sent for review!", {
        classNames: {
          toast: "bg-green-300",
        },
      });

      setSubmitting(false);
    } catch (error) {
      console.log("Error: ", error);
      setErrorMessage("Error sending message. Please try again later.");
    }
  };

  return (
    <div className="max-w-xl mx-auto mt-16">
      <h1 className="text-2xl font-bold mb-4 text-primary-dark dark:text-primary-light">
        Submit Your Message
      </h1>
      <p className="mb-4 text-primary-dark dark:text-primary-light">
        Please make sure to complete all fields before submitting your message.
      </p>
      <form onSubmit={handleSubmit}>
        <div className="items-center grid grid-cols-2 space-x-3 mb-4">
          <Input
            inputName="Name"
            value={name}
            onChange={(event) => setName(event.target.value)}
          />
          <Input
            inputName="Email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
          />
        </div>
        <div className="items-center grid grid-cols-2 space-x-3 mb-4">
          <Select
            selectName="Locations"
            value={location}
            onChange={(event) => setLocation(event.target.value)}
            options={locationOptions}
          />
          <Select
            selectName="Ministry"
            value={ministry}
            onChange={(event) => setMinistry(event.target.value)}
            options={ministryOptions}
          />
        </div>
        <div className="mb-4">
          <Input
            inputName="Subject"
            value={subject}
            onChange={(event) => setSubject(event.target.value)}
          />
        </div>
        <div className="mb-4 h-92">
          <TextArea
            textAreaName="Message"
            value={message}
            onChange={(event) => setMessage(event.target.value)}
          />
        </div>
        <div className="inline-block">
          <ActionButton
            title="Send Message"
            disabled={!name || !email || !message || !location || !ministry}
            // onClick={(event: FormEvent<HTMLFormElement>) => handleSubmit(event)}
            busy={submitting}
          />
        </div>
      </form>
    </div>
  );
}
