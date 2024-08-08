import { MessageDetail } from "@/utils/types";
import { FC, ReactNode, useState } from "react";
import MessageCard from "./MessageCard";
import MessageCardClient from "../client/MessageCardClient";
import { fetchAllMessages, fetchMessagesWithQuery } from "@/lib/utils";
import dateFormat from "dateformat";

interface Props {
  query: string;
  // showControls?: boolean;
  // dataLength: number;
  // loader?: ReactNode;
  // onMessageRemoved(message: MessageDetail): void;
}

const getData = async () => {
  const res = await fetch("http://localhost:3000/api/messages/");
  // The return value is *not* serialized
  // You can return Date, Map, Set, etc.
  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error("Failed to fetch data");
  }

  return res.json();
};

const InfiniteScrollMessages = async ({ query }: { query: string }) => {
  const messages: MessageDetail[] = await getData();
  console.log(messages.length);
  // const allMessages: MessageDetail[] = await fetchAllMessages();
  // console.log(allMessages.length);

  // TODO: build out functions for deleting/marking messages approved

  // filters messages from endpoint based on the query typed in the search bar
  const filteredMessages = Array.isArray(messages)
    ? messages.filter((message) => {
        const searchQuery = query.toLowerCase();
        const subjectMatch = message.subject
          ?.toLowerCase()
          .includes(searchQuery);
        // console.log(subjectMatch);
        const nameMatch = message.name?.toLowerCase().includes(searchQuery);
        // console.log(nameMatch);
        const emailMatch = message.email?.toLowerCase().includes(searchQuery);
        // console.log(emailMatch);
        const createdAtMatch = dateFormat(
          message.createdAt?.toLowerCase()
        ).includes(searchQuery);
        // console.log(createdAtMatch);

        return subjectMatch || nameMatch || emailMatch || createdAtMatch;
      })
    : [];

  // console.log(filteredMessages.length);

  const noMessageFound = (messages: []) => {
    if (!messages) {
      return <p>No Message Found</p>;
    }
  };

  // default loader
  const defaultLoader = (
    <p className="p-3 text-secondary-dark opacity-50 text-center font-semibold text-xl animate-pulse">
      Loading...
    </p>
  );

  return (
    <div className="max-w-4xl justify-center p-3">
      <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-10">
        {!messages && noMessageFound(messages)}
        {filteredMessages.length === 0 ? (
          <p className="flex justify-center mt-6 sm:col-span-2 md:col-span-1 md:col-start-2 text-xl">
            Message Not Found.
          </p>
        ) : (
          filteredMessages.map((message) => (
            <MessageCardClient key={message.id} messageData={message} />
          ))
        )}
      </div>
    </div>
  );
};

export default InfiniteScrollMessages;
