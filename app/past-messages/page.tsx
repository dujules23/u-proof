import InfiniteScrollMessages from "@/components/common/InfiniteScrollMessages";
import SearchBar from "@/components/search/SearchBar";
import { fetchInitialMessages } from "@/lib/utils";
import { MessageDetail } from "@/utils/types";
import { FC, Suspense } from "react";

interface Props {}

const PastMessages: FC<Props> = async ({
  searchParams,
}: {
  searchParams?: { query?: string; page?: string };
}) => {
  const messages: MessageDetail[] = await fetchInitialMessages();
  console.log(messages);

  const query = searchParams?.query || "";

  return (
    // <div>hello</div>
    <div className="max-w-xxl mx-20 mt-18">
      <h1 className="text-2xl font-bold mb-6 text-primary-dark dark:text-primary-light">
        Past Messages
      </h1>
      {/* Search Bar and View Slider */}
      <div className="flex col col-start-2">
        <SearchBar placeholder="Search..." />
      </div>
      {/* Messages */}
      <div className="flex justify-center mt-6">
        <Suspense key={query} fallback="Loading....">
          <InfiniteScrollMessages
            query={query}
            messages={messages}
            showControls
            onMessageRemoved={() => {}}
            dataLength={0}
          />
        </Suspense>
        {/* <MessageCardClient messageData={messages} /> */}
      </div>
    </div>
  );
};

export default PastMessages;
