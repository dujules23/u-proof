import ActionButton from "@/components/buttons/ActionButton";
import DefaultLayout from "@/components/layout/DefaultLayout";
import SearchBar from "@/components/search/SearchBar";
import { FC, useEffect, useState } from "react";

interface Props {}

const getMessages = async () => {
  const response = await fetch("http://localhost:3000/api/message");
  if (!response.ok) {
    throw new Error("Unable to get data");
  }
  return response.json();
};
const PastMessages: FC<Props> = async (props) => {
  const apiData = await getMessages();

  return (
    <DefaultLayout>
      <div className="max-w-xl mx-20 mt-24">
        <h1 className="text-2xl font-bold mb-6 text-primary-dark dark:text-primary-light">
          Past Messages
        </h1>
        {/* Search Bar and View Slider */}
        <div className="flex col col-start-2">
          <SearchBar />
        </div>
        {/* Messages */}
        <div>{}</div>
      </div>
    </DefaultLayout>
  );
};

export default PastMessages;
