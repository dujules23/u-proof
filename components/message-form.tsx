"use client";

import { FormEvent, useState } from "react";
import Editor from "./editor/Editor";
import ActionButton from "./buttons/ActionButton";
import { toast } from "sonner";

export default function MessageForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [subject, setSubject] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [submitting, setSubmitting] = useState<boolean>(false);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitting(true);
    // sends message out via resend and sends message to database
    try {
      const messageSent = await fetch("/api/messages", {
        method: "POST",
        body: JSON.stringify({ name, email, subject, message }),
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
    <div className="max-w-lg mx-auto mt-16">
      <h1 className="text-2xl font-bold mb-6 text-primary-dark dark:text-primary-light">
        Submit Your Message
      </h1>
      {errorMessage && <p className="text-red-500 mb-4">{errorMessage}</p>}
      {successMessage && (
        <p className="text-green-500 mb-4">{successMessage}</p>
      )}
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label
            htmlFor="name"
            className="block font-bold mb-2 text-primary-dark dark:text-primary-light"
          >
            Your Name:
          </label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(event) => setName(event.target.value)}
            required
            className="appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline  text-black dark:bg-primary-light"
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="email"
            className="block font-bold mb-2 text-primary-dark dark:text-primary-light"
          >
            Email:
          </label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            required
            className="appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline text-black dark:bg-primary-light"
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="subject"
            className="block font-bold mb-2 text-primary-dark dark:text-primary-light"
          >
            Subject Line:
          </label>
          <input
            type="text"
            id="subject"
            value={subject}
            onChange={(event) => setSubject(event.target.value)}
            required
            className="appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline text-black dark:bg-primary-light"
          />
        </div>
        <div className="mb-4 h-92">
          <label
            htmlFor="message"
            className="block font-bold mb-2 text-primary-dark dark:text-primary-light"
          >
            Message:
          </label>
          <textarea
            id="message"
            value={message}
            onChange={(event) => setMessage(event.target.value)}
            required
            className="appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline text-black dark:bg-primary-light min-h-[15rem]"
          />
          {/* <Editor
            value={message}
            onChange={(event) => setMessage(event.target.value)}
          /> */}
        </div>
        {/* <button
          disabled={!name || !email || !message}
          type="submit"
          className="bg-nav disabled:bg-gray-600 text-white font-bold py-2 px-4 rounded hover:bg-green-900"
        >
          Send Message
        </button> */}
        <div className="inline-block">
          <ActionButton
            title="Send Message"
            disabled={!name || !email || !message}
            // onClick={(event: FormEvent<HTMLFormElement>) => handleSubmit(event)}
            busy={submitting}
          />
        </div>
      </form>
    </div>
  );
}
