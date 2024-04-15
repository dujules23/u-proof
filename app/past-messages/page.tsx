import ActionButton from "@/components/buttons/ActionButton";
import DefaultLayout from "@/components/layout/DefaultLayout";
import SearchBar from "@/components/search/SearchBar";
import { FC, useEffect, useState } from "react";

interface Props {}
const getData = async () => {
  const response = await fetch("/api/message");
  if (!response.ok) {
    throw new Error("Unable to get data");
  }
  const data = await response.json();
  return data;
};
const PastMessages: FC<Props> = async (props) => {
  const apiData = await getData();

  console.log(apiData);

  return (
    <DefaultLayout>
      <div className="max-w-xl mx-auto mt-24">
        <h1 className="text-2xl font-bold mb-6 text-primary-dark dark:text-primary-light">
          Past Messages
        </h1>
        {/* Search Bar and View Slider */}
        <div className="flex col col-start-2">
          <SearchBar />
        </div>
        {/* Messages */}
        <div>{JSON.stringify(apiData)}</div>
      </div>
    </DefaultLayout>
  );
};

export default PastMessages;
