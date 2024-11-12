"use client"; // Mark the component as a client component

import { useState, useEffect } from "react";
import { MessageDetail } from "@/utils/types";
import { useSearchParams } from "next/navigation";

interface Message {
  _id: string;
  content: string;
  user: {
    _id: string;
    name: string;
    email: string;
  };
}

const RequestEditPage = () => {
  const searchParams = useSearchParams();
  const id = searchParams.get("id");
  console.log(id);
  const [editSuggestion, setEditSuggestion] = useState("");
  const [message, setMessage] = useState<MessageDetail | null>(null);
  const [isSuccess, setIsSuccess] = useState(false);

  // const messageId = params._id;

  // Fetch message and user data on the client side using useEffect
  useEffect(() => {
    const fetchMessageData = async () => {
      const response = await fetch(`/api/messages/${id}`);
      const data = await response.json();
      setMessage(data.message); // Assuming the response includes the message with user data
    };

    fetchMessageData();
  }, [id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const response = await fetch(`/api/request-edit`, {
      method: "POST",
      body: JSON.stringify({ id, editSuggestion }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.ok) {
      setIsSuccess(true);
    }
  };

  if (!message) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <h1>Request Edit for Message {message._id.toString()}</h1>
      <p>
        <strong>
          Message from {message.name} ({message.email}):
        </strong>
      </p>
      <blockquote>{message.message}</blockquote>

      {!isSuccess ? (
        <form onSubmit={handleSubmit}>
          <textarea
            value={editSuggestion}
            onChange={(e) => setEditSuggestion(e.target.value)}
            placeholder="Suggest your edit here"
            required
          />
          <button type="submit">Submit Edit Request</button>
        </form>
      ) : (
        <p>Your edit request was successfully submitted!</p>
      )}
    </div>
  );
};

export default RequestEditPage;
