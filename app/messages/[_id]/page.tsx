"use client";

import { FC, useEffect, useState } from "react";
import { useRouter } from "next/router";

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
    <div className="p-4 bg-white rounded shadow-md">
      <h1 className="text-2xl font-bold mb-2">{subject}</h1>
      <p className="text-gray-700 mb-4">{message}</p>
      <div className="text-sm text-gray-500 mb-4">
        <span>By: {name}</span> |{" "}
        <span>{new Date(createdAt).toLocaleDateString()}</span>
      </div>
      <div className={`badge ${approved ? "badge-success" : "badge-warning"}`}>
        {approved ? "Approved" : "Pending Approval"}
      </div>
    </div>
  );
};

export default Message;
