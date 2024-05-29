import InfiniteScrollMessages from "@/components/common/InfiniteScrollMessages";
import SearchBar from "@/components/search/SearchBar";
import { fetchAllMessages, fetchMessagesWithQuery } from "@/lib/utils";
import { FC, Suspense } from "react";

interface Props {}

const PastMessages: FC<Props> = async ({
  searchParams,
}: {
  searchParams?: { query?: string; page?: string };
}) => {
  // console.log(messages);

  const query = searchParams?.query || "";
  const currentPage = Number(searchParams?.page) || 1;

  const totalPages = await fetchMessagesWithQuery(query);

  // console.log(totalPages);

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
          <InfiniteScrollMessages query={query} />
        </Suspense>
        {/* <Pagination totalPages={totalPages} /> */}
      </div>
    </div>
  );
};

export default PastMessages;
