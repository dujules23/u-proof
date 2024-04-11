"use client";

import { useState } from "react";
import Editor from "./editor/Editor";
import ActionButton from "./buttons/ActionButton";

export default function MessageForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [submitting, setSubmitting] = useState<boolean>(false);

  const handleSubmit = async () => {
    // event.preventDefault();
    // sends message to database
    // try {
    //   await fetch("/api/message", {
    //     method: "POST",
    //     body: JSON.stringify({ name, email, message }),
    //     headers: { "Content-Type": "application/json" },
    //   });
    // } catch (error) {
    //   console.log(error);
    // }
    setTimeout(() => {
      setSubmitting(true);
    }, 5000);

    setSubmitting(false);

    // sends message out via email
    // try {
    //   await fetch("/api/send", {
    //     method: "POST",
    //     body: JSON.stringify({ name, email, message }),
    //     headers: { "Content-Type": "application/json" },
    //   });

    //   setSuccessMessage("Message sent successfully!");
    //   setName("");
    //   setEmail("");
    //   setMessage("");
    // } catch (error) {
    //   setErrorMessage("Error sending message. Please try again later.");
    // }
  };

  return (
    <div className="max-w-lg mx-auto mt-32">
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
            onClick={handleSubmit}
            busy={submitting}
          />
        </div>
      </form>
    </div>
  );
}
