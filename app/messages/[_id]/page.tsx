"use client";

import { FC, useEffect, useState } from "react";
import { useRouter } from "next/router";
import ActionButton from "@/components/buttons/ActionButton";

interface MessageDetail {
  _id: string;
  name: string;
  subject: string;
  message: string;
  createdAt: string;
  approved: boolean;
}

const Message: FC<{ params: { _id: string } }> = ({ params }): JSX.Element => {
  const [messageData, setMessageData] = useState<MessageDetail | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [editClick, setEditClick] = useState<boolean>(false);
  const [newMessage, setNewMessage] = useState<string>("");

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

  const { name, subject, message, createdAt, approved } = messageData;

  return (
    <div className="flex justify-center items-center min-w-screen m-20">
      <div className="rounded shadow-md border p-4 shadow-secondary-dark dark:shadow-grey-100 overflow-hidden bg-primary dark:bg-primary transition flex flex-col h-auto sm:min-w-auto md:min-w-96">
        <h1 className="text-2xl font-bold mb-2">{subject}</h1>
        <div className="text-sm text-gray-500 mb-4">
          <span>By: {name}</span> |{" "}
          <span>{new Date(createdAt).toLocaleDateString()}</span>
        </div>
        <p className="text-gray-700 mb-4">{message}</p>
        <div className="flex place-content-between">
          <div className="place-content-center">
            {approved ? "Approved" : "Pending Approval"}
          </div>

          {approved ? null : (
            <div>
              <ActionButton
                onClick={() => setEditClick(!editClick)}
                title={editClick ? "Close" : "Edit"}
              />
            </div>
          )}
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
            <ActionButton title="Submit Edit" />
          </div>
        )}
      </div>
    </div>
  );
};

export default Message;
