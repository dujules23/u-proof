"use client";

import { FC } from "react";
import Link from "next/link";
import dateformat from "dateformat";
import MessageCard from "@/components/common/MessageCard";
import { useWindowSize } from "@/components/common/useWindowSize";
import { MessageModelSchema } from "@/models/messageSchema";

interface MessagesListProps {
  messages: MessageModelSchema[];
}

const MessagesList: FC<MessagesListProps> = ({ messages }) => {
  const { width } = useWindowSize();
  const isMobile = width ? width < 640 : false;
  const displayCount = isMobile ? 4 : 6;

  const displayedMessages = messages.slice(0, displayCount);

  return (
    <>
      {/* Mobile List View */}
      <div className="block sm:hidden">
        <div className="space-y-4">
          {displayedMessages.map((item) => (
            <div
              key={item._id.toString()}
              className="bg-white dark:bg-gray-800 rounded-lg shadow p-4"
            >
              <div className="flex justify-between items-start mb-2">
                <span className="font-semibold">{item.name}</span>
                <span className="text-xs text-gray-500">
                  {dateformat(item.createdAt, "mm-dd-yyyy")}
                </span>
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-300 line-clamp-2 mb-2">
                {item.message}
              </p>
              <div className="flex justify-between items-center">
                <span
                  className={`px-2 py-1 text-xs rounded-full ${
                    item.approved
                      ? "bg-green-100 text-green-800"
                      : "bg-red-100 text-red-800"
                  }`}
                >
                  {item.approved ? "Approved" : "Awaiting Approval"}
                </span>
                <Link
                  href={`/messages/${item._id}`}
                  className="text-blue-600 hover:text-blue-800"
                >
                  View
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Desktop Grid View */}
      <div
        id="message-card-container"
        className="hidden sm:grid sm:grid-cols-2 md:grid-cols-3 gap-10"
      >
        {displayedMessages.map((item, index) => (
          <div id={index.toString()} key={item._id.toString()}>
            <MessageCard messageData={item} />
          </div>
        ))}
      </div>
    </>
  );
};

export default MessagesList;
