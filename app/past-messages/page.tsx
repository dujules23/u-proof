"use client";

import ActionButton from "@/components/buttons/ActionButton";
import InfiniteScrollMessages from "@/components/common/InfiniteScrollMessages";
import DefaultLayout from "@/components/layout/DefaultLayout";
import SearchBar from "@/components/search/SearchBar";
import { readMessagesFromDb } from "@/lib/utils";
import { MessageDetail } from "@/utils/types";
import { FC, useEffect, useState } from "react";
import { GiConsoleController } from "react-icons/gi";

interface Props {
  messages: MessageDetail[];
}

const PastMessages: FC<Props> = ({ messages }) => {
  let pageNo = 0;
  const limit = 9;

  const [messagesToRender, setMessagesToRender] = useState(messages || []);
  const [hasMoreMessages, setHasMoreMessages] = useState(
    messagesToRender?.length >= limit
  );

  // console.log(messages);

  // console.log(messagesToRender);

  const fetchInitialMessages = async () => {
    try {
      let pageNo = 0;
      const limit = 9;
      const messages = await readMessagesFromDb(limit, pageNo);
      console.log(messages);
      setMessagesToRender(messages);
    } catch (error) {
      console.log(error);
    }
  };

  // pagination function
  const fetchMorePosts = async () => {
    try {
      // increases page number
      pageNo++;
      // api call using page number and limit to get next page of data
      const { data } = await axios(
        `/api/posts?limit=${limit}&skip=${messagesToRender.length}`
      );
      // checks to see if the length of posts are less than 9 (limit), we ran out of posts in the database
      if (data.messages.length < limit) {
        // sets posts, as we scroll down we add the posts that were brought in through the endpoint
        setMessagesToRender([...messagesToRender, ...data.messages]);
        setHasMoreMessages(false);
      } else {
        setMessagesToRender([...messagesToRender, ...data.messages]);
      }
    } catch (error) {
      setHasMoreMessages(false);
      console.log(error);
    }
  };

  useEffect(() => {
    // const getData = fetch("http://localhost:3000/api/message")
    //   .then((response) => response.json())
    //   .then((message) => setMessagesToRender(message))
    //   .catch((error) => console.log(error));
    fetchInitialMessages();
    // try {
    //   let pageNo = 0;
    //   const limit = 9;
    //   const messages = readMessagesFromDb(limit, pageNo);
    //   setMessagesToRender(messages);
    // } catch (error) {}
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
            dataLength={messagesToRender?.length}
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
