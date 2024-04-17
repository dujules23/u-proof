import { MessageDetail } from "@/utils/types";
import { FC, ReactNode, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import MessageCard from "./MessageCard";

interface Props {
  messages: MessageDetail[];
  showControls?: boolean;
  hasMore: boolean;
  next(): void;
  dataLength: number;
  loader?: ReactNode;
  onMessageRemoved(message: MessageDetail): void;
}

const InfiniteScrollMessages: FC<Props> = ({
  messages,
  showControls,
  hasMore,
  next,
  dataLength,
  loader,
  onMessageRemoved,
}): JSX.Element => {
  const [removing, setRemoving] = useState(false);
  const [messageToRemove, setMessageToRemove] = useState<MessageDetail | null>(
    null
  );

  // TODO: build out functions for deleting/marking messages approved

  // default loader
  const defaultLoader = (
    <p className="p-3 text-secondary-dark opacity-50 text-center font-semibold text-xl animate-pulse">
      Loading...
    </p>
  );

  return (
    <InfiniteScroll
      hasMore={hasMore}
      next={next}
      dataLength={dataLength}
      loader={loader || defaultLoader}
    >
      <div className="max-w-4xl justify-center p-3">
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-10">
          {messages.map((message) => (
            <MessageCard
              messageData={message}
              key={message.id}
              controls={showControls}
              onDeleteClick={() => {}}
              busy={message.id == messageToRemove?.id && removing}
            />
          ))}
        </div>
      </div>
    </InfiniteScroll>
  );
};

export default InfiniteScrollMessages;
