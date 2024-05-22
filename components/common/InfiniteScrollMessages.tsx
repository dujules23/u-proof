import { MessageDetail } from "@/utils/types";
import { FC, ReactNode, useState } from "react";
import MessageCard from "./MessageCard";
import MessageCardClient from "../client/MessageCardClient";
import { fetchMessagesWithQuery } from "@/lib/utils";
import dateFormat from "dateformat";

interface Props {
  // query: string;
  // showControls?: boolean;
  // dataLength: number;
  // loader?: ReactNode;
  // onMessageRemoved(message: MessageDetail): void;
}

const InfiniteScrollMessages = async ({ query }: { query: string }) => {
  const messages: MessageDetail[] = await fetchMessagesWithQuery(query);
  // TODO: build out functions for deleting/marking messages approved

  // filters messages from endpoint based on the query typed in the search bar
  const filteredMessages = Array.isArray(messages)
    ? messages.filter((message) => {
        return (
          (message.subject &&
            message.subject.toLowerCase().includes(query.toLowerCase())) ||
          (message.message &&
            message.message.toLowerCase().includes(query.toLowerCase())) ||
          (message.name &&
            message.name.toLowerCase().includes(query.toLowerCase())) ||
          (message.email &&
            message.email.toLowerCase().includes(query.toLowerCase())) ||
          (dateFormat(message.createdAt, "mm/dd/yy") &&
            dateFormat(message.createdAt, "mm/dd/yy")
              .toLowerCase()
              .includes(query.toLowerCase()))
        );
      })
    : [];

  // default loader
  const defaultLoader = (
    <p className="p-3 text-secondary-dark opacity-50 text-center font-semibold text-xl animate-pulse">
      Loading...
    </p>
  );

  return (
    <div className="max-w-4xl justify-center p-3">
      <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-10">
        {filteredMessages.map((message) => (
          <MessageCardClient key={message.id} messageData={message} />
        ))}
      </div>
    </div>
  );
};

export default InfiniteScrollMessages;
