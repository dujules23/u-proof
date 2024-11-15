"use client";

import { FC, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import ActionButton from "@/components/buttons/ActionButton";
import { toast } from "sonner";

interface MessageDetail {
  _id: string;
  name: string;
  subject: string;
  message: string;
  createdAt: string;
  approved: boolean;
}

const Message: FC<{ params: { _id: string } }> = ({ params }): JSX.Element => {
  const router = useRouter();

  const [messageData, setMessageData] = useState<MessageDetail | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [editClick, setEditClick] = useState<boolean>(false);
  const [newMessage, setNewMessage] = useState<string>("");
  const [submitting, setSubmitting] = useState<boolean>(false);
  const [requestedEdit, setRequestedEdit] = useState<boolean>(false);

  useEffect(() => {
    const fetchMessage = async () => {
      try {
        const response = await fetch(`/api/messages/${params._id}`);
        if (!response.ok) {
          throw new Error("Failed to fetch message");
        }
        const data = await response.json();
        setMessageData(data);
      } catch (error) {
        setError((error as Error).message);
      } finally {
        setLoading(false);
      }
    };

    fetchMessage();
  }, [params._id]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!messageData) return <div>No message found</div>;

  const { _id, name, subject, message, createdAt, approved } = messageData;

  const approvedColor = approved ? "text-green-600" : "text-red-600";

  const handleSubmit = async () => {
    setSubmitting(true);

    try {
      const messageUpdated = await fetch(`/api/messages/${_id}`, {
        method: "PATCH",
        body: JSON.stringify({
          newMessage,
        }),
        headers: { "Content-Type": "application/json" },
      });

      // handles error on the frontend
      if (messageUpdated.status !== 200) {
        toast.error("Message did not get updated.", {
          classNames: {
            toast: "bg-red-300",
          },
        });
        setSubmitting(false);
        throw new Error("Failed to send message, Not Found");
      }

      setNewMessage("");

      toast.success("Message has been updated!", {
        classNames: {
          toast: "bg-green-300",
        },
      });

      setSubmitting(false);
      setEditClick(false);
    } catch (error) {
      console.log("Error: ", error);
    }
  };

  return (
    <div className="flex justify-center items-center min-w-screen m-12 space-y-6 space-x-6">
      <div className="rounded shadow-md border p-4 shadow-secondary-dark dark:shadow-grey-100 overflow-hidden bg-primary dark:bg-primary transition flex flex-col h-auto max-w-xl sm:min-w-auto md:min-w-96">
        <h1 className="text-2xl font-bold mb-2">{subject}</h1>
        <div className="text-sm text-gray-500 mb-4">
          <span>By: {name}</span> |{" "}
          <span>{new Date(createdAt).toLocaleDateString()}</span>
        </div>
        <p className="text-gray-700 mb-4">{message}</p>
        <div className="flex place-content-between">
          <div className={`place-content-center ${approvedColor}`}>
            {approved ? "Approved" : "Pending Approval"}
          </div>

          <div className="flex space-x-2">
            {approved ? null : (
              <div>
                <ActionButton
                  onClick={() => setEditClick(!editClick)}
                  title={editClick ? "Close" : "Edit"}
                />
              </div>
            )}

            <div className="">
              <ActionButton
                onClick={() => router.push("/past-messages")}
                title="Back"
              />
            </div>
          </div>
        </div>

        {editClick && (
          <div className="pt-5">
            <label
              htmlFor="message"
              className="block font-bold mb-2 text-primary-dark dark:text-primary-light"
            >
              Message:
            </label>
            <textarea
              id="message"
              value={newMessage}
              onChange={(event) => setNewMessage(event.target.value)}
              required
              className="appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline text-black dark:bg-primary-light min-h-[15rem]"
            />
            <ActionButton
              busy={submitting}
              onClick={handleSubmit}
              title="Submit Edit"
            />
          </div>
        )}
      </div>

      {requestedEdit && (
        <div className="rounded shadow-md border p-4 shadow-secondary-dark dark:shadow-grey-100 overflow-hidden bg-primary dark:bg-primary transition flex flex-col h-auto max-w-lg sm:min-w-auto md:min-w-96">
          <h1 className="text-2xl font-bold mb-2">Requested Edit</h1>
          <p className="text-gray-700 mb-4">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Mollitia,
            quasi voluptates praesentium fugit nihil quas eius ullam et
            asperiores incidunt ea nulla officiis deleniti, labore architecto
            minima enim quidem officia.
          </p>
        </div>
      )}
    </div>
  );
};

export default Message;
