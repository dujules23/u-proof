"use client";

import ActionButton from "@/components/buttons/ActionButton";
import InfiniteScrollMessages from "@/components/common/InfiniteScrollMessages";
import DefaultLayout from "@/components/layout/DefaultLayout";
import SearchBar from "@/components/search/SearchBar";
import { readPostsFromDb } from "@/lib/utils";
import { MessageDetail } from "@/utils/types";
import { FC, useEffect, useState } from "react";
import { GiConsoleController } from "react-icons/gi";

interface Props {}

const PastMessages: FC<Props> = () => {
  let pageNo = 0;
  const limit = 9;
  // const messages = readPostsFromDb(limit, pageNo);

  // console.log(messages);

  // const messages = await getMessages();

  const [messagesToRender, setMessagesToRender] = useState([]);
  const [hasMoreMessages, setHasMoreMessages] = useState(
    messagesToRender.length >= limit
  );

  useEffect(() => {
    const getData = fetch("http://localhost:3000/api/message")
      .then((response) => response.json())
      .then((message) => setMessagesToRender(message))
      .catch((error) => console.log(error));
  }, []);

  return (
    <DefaultLayout>
      <div className="max-w-xxl mx-20 mt-18">
        <h1 className="text-2xl font-bold mb-6 text-primary-dark dark:text-primary-light">
          Past Messages
        </h1>
        {/* Search Bar and View Slider */}
        <div className="flex col col-start-2">
          <SearchBar />
        </div>
        {/* Messages */}
        <div className="flex justify-center mt-6">
          <InfiniteScrollMessages
            hasMore={hasMoreMessages}
            next={() => {}}
            dataLength={messagesToRender.length}
            messages={messagesToRender}
            showControls
            onMessageRemoved={() => {}}
          />
        </div>
      </div>
    </DefaultLayout>
  );
};

export default PastMessages;
