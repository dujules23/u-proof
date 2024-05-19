import { MessageDetail } from "@/utils/types";
import { FC, ReactNode, useState } from "react";
import MessageCard from "./MessageCard";
import MessageCardClient from "../client/MessageCardClient";
import { fetchInitialMessages, fetchMessagesWithQuery } from "@/lib/utils";

interface Props {
  // query: string;
  // showControls?: boolean;
  // dataLength: number;
  // loader?: ReactNode;
  // onMessageRemoved(message: MessageDetail): void;
}

const InfiniteScrollMessages = async ({ query }: { query: string }) => {
  const messages: MessageDetail[] = await fetchMessagesWithQuery(query);

  console.log(messages);
  // TODO: build out functions for deleting/marking messages approved

  const filteredMessages = Array.isArray(messages)
    ? messages.filter((message) => {
        return message.subject.toLowerCase().includes(query.toLowerCase());
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
        {filteredMessages.map((message, index) => (
          <MessageCardClient key={index} messageData={message} />
        ))}
      </div>
    </div>
  );
};

export default InfiniteScrollMessages;
