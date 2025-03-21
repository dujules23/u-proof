import { PaginationComponent } from "@/components/buttons/Pagination";
import MessageCard from "@/components/common/MessageCard";
import SearchBar from "@/components/search/SearchBar";
import { getData } from "@/lib/utils";
import Link from "next/link";
import { FC, Suspense } from "react";
import dateformat from "dateformat";
import MessagesList from "@/components/common/MessagesList";

interface Props {
  searchParams?: { page: string; query: string };
}

const PastMessages: FC<Props> = async ({
  searchParams,
}: {
  searchParams?: { query: string; page: string };
}) => {
  let page = parseInt(searchParams?.page || "1", 10);

  page = !page || page < 1 ? 1 : page;

  let perPage = 6;
  const query = searchParams?.query || "";
  const data = await getData(perPage, page, query);

  const { itemCount, messagesFromDb } = data;

  const pageCount = Math.ceil(itemCount / perPage);

  return (
    <div className="max-w-xxl md:mx-20 mx-auto mt-18">
      <h1 className="text-2xl font-bold mb-6 text-primary-dark dark:text-primary-light">
        Past Messages
      </h1>

      <div className="flex col col-start-2">
        <SearchBar placeholder="Search..." />
      </div>

      <div className="grid space-y-6 justify-center mt-6">
        <Suspense
          key={query}
          fallback={
            <p className="p-3 text-secondary-dark opacity-50 text-center font-semibold text-xl animate-pulse">
              Loading...
            </p>
          }
        >
          {messagesFromDb.length === 0 ? (
            <p className="flex justify-center mt-6 sm:col-span-2 md:col-span-1 md:col-start-2 text-xl">
              Message(s) Not Found.
            </p>
          ) : (
            // <MessagesList messages={messagesFromDb} />
            <>
              {/* Mobile List View */}
              <div className="block sm:hidden">
                <div className="space-y-4">
                  {messagesFromDb.map((item) => (
                    <div
                      key={item._id.toString()}
                      className="bg-white dark:bg-gray-800 rounded-lg shadow p-4"
                    >
                      <div className="flex justify-between items-start mb-2">
                        <span className="font-semibold text-primary-dark dark:text-primary-light">
                          {item.name}
                        </span>
                        <span className="text-xs text-gray-500">
                          {dateformat(item.createdAt, "mm/dd/yyyy")}
                        </span>
                      </div>
                      <p className="text-sm text-primary-dark dark:text-primary-light line-clamp-2 mb-2">
                        {item.message}
                      </p>
                      <div className="flex justify-between items-center">
                        <span
                          className={`px-2 py-1 text-xs rounded-full ${
                            item.approved
                              ? "bg-blue-100 text-nav"
                              : "bg-red-100 text-red-800"
                          }`}
                        >
                          {item.approved ? "Approved" : "Awaiting Approval"}
                        </span>
                        <Link
                          href={`/messages/${item._id}`}
                          className="text-blue-600 hover:text-blue-800"
                        >
                          View
                        </Link>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Desktop Grid View - Your Existing Layout */}
              <div
                id="message-card-container"
                className="hidden sm:grid sm:grid-cols-2 md:grid-cols-3 gap-10"
              >
                {messagesFromDb.map((item, index) => (
                  <div id={index.toString()} key={item._id.toString()}>
                    <MessageCard messageData={item} />
                  </div>
                ))}
              </div>
            </>
          )}
        </Suspense>
      </div>
      <PaginationComponent pageCount={pageCount} />
    </div>
  );
};

export default PastMessages;
