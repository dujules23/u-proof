import ActionButton from "@/components/buttons/ActionButton";
import DefaultLayout from "@/components/layout/DefaultLayout";
import SearchBar from "@/components/search/SearchBar";
import { FC } from "react";

interface Props {}

const PastMessages: FC<Props> = (props): JSX.Element => {
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
        <div></div>
      </div>
    </DefaultLayout>
  );
};

export default PastMessages;
