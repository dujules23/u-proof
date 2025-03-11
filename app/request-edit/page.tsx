"use client"; // Mark the component as a client component
export const dynamic = "force-dynamic";

import { useState, useEffect } from "react";
import { MessageDetail } from "@/utils/types";
import { useSearchParams } from "next/navigation";
import ActionButton from "@/components/buttons/ActionButton";
import { toast } from "sonner";

const RequestEditPage = () => {
  const searchParams = useSearchParams();
  const id = searchParams.get("id");
  const [editSuggestion, setEditSuggestion] = useState("");
  const [message, setMessage] = useState<MessageDetail | null>(null);
  const [isSuccess, setIsSuccess] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  // const messageId = params._id;

  // Fetch message and user data on the client side using useEffect
  useEffect(() => {
    const fetchMessageData = async () => {
      const response = await fetch(`/api/messages/${id}`);
      const data = await response.json();
      setMessage(data); // Assuming the response includes the message with user data
    };

    fetchMessageData();
  }, [id]);

  const handleSubmit = async (e: React.FormEvent) => {
    try {
      e.preventDefault();
      setSubmitting(true);

      // Check if message already has a pending edit before making the request
      if (message?.needsEdit) {
        toast.error("This message is already being edited.", {
          classNames: {
            toast: "bg-red-300",
          },
        });
        return;
      }

      const response = await fetch(`/api/requestEdit`, {
        method: "POST",
        body: JSON.stringify({ id, requestedEdit: editSuggestion }),
        headers: {
          "Content-Type": "application/json",
        },
        cache: "no-store",
      });

      if (!response.ok) {
        throw new Error("Failed to send edit suggestion.");
      }

      setIsSuccess(true);
      setEditSuggestion("");
      toast.success("Edit request submitted successfully!");
    } catch (error) {
      toast.error("Failed to submit edit request. Please try again.");
      console.error("Error submitting edit:", error);
    } finally {
      setSubmitting(false);
    }
  };

  if (!message) {
    return <p>Loading...</p>;
  }

  return (
    <div className="flex justify-center items-center min-w-screen m-12 space-y-6 space-x-6">
      <div className="rounded shadow-md border p-4 shadow-secondary-dark dark:shadow-grey-100 overflow-hidden bg-primary dark:bg-primary transition flex flex-col h-auto max-w-xl sm:min-w-auto md:min-w-96">
        <h1 className="text-2xl font-bold mb-2">Request Edit</h1>
        <p className="mb-4">
          <strong>
            Message from {message.name} ({message.email}):
          </strong>
        </p>
        <p>Original Message:</p>
        <p className="text-gray-700 mb-4">{message.message}</p>

        {!isSuccess ? (
          <div>
            <textarea
              value={editSuggestion}
              onChange={(e) => setEditSuggestion(e.target.value)}
              placeholder="Suggest your edit here"
              required
              className="appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline text-black dark:bg-primary-light min-h-[15rem]"
            />
            <ActionButton
              disabled={!editSuggestion}
              onClick={handleSubmit}
              busy={submitting}
              title="Submit"
            />
          </div>
        ) : (
          <p>Your edit request was successfully submitted!</p>
        )}
      </div>
    </div>
  );
};

export default RequestEditPage;
