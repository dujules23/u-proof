"use client";

import { FC } from "react";
import { usePathname, useSearchParams, useRouter } from "next/navigation";

// take a look at adding ui for this from shadcn, check ui folder for this.

interface PaginationProps {
  pageCount: number; // This is the total number of pages.
}

interface PaginationArrowProps {
  direction: "left" | "right";
  href: string;
  isDisabled: boolean;
}

const PaginationArrow: FC<PaginationArrowProps> = ({
  direction,
  href,
  isDisabled,
}) => {
  const router = useRouter();
  const isLeft = direction === "left";

  // Conditionally disable the button if isDisabled is true.
  const disabledClassName = isDisabled ? "opacity-50 cursor-not-allowed" : "";

  return !isDisabled ? (
    <button
      onClick={() => router.push(href)}
      className={`bg-nav text-primary-light enabled:hover:bg-button-light p-6 text-6xl rounded-xl ${disabledClassName}`}
      aria-disabled={isDisabled}
      disabled={isDisabled}
    >
      {isLeft ? "«" : "»"}
    </button>
  ) : (
    <span
      className={`bg-nav text-primary-light enabled:hover:bg-button-light p-6 text-6xl rounded-xl ${disabledClassName}`}
      aria-disabled={isDisabled}
    >
      {isLeft ? "«" : "»"}
    </span>
  );
};

export function PaginationComponent({ pageCount }: PaginationProps) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const currentPage = Number(searchParams.get("page")) || 1; // Get current page from search params or default to 1

  const createPageURL = (pageNumber: number | string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", pageNumber.toString()); // Set the "page" query param
    return `${pathname}?${params.toString()}`; // Create the URL with updated page number
  };

  // Handle previous and next page logic
  const prevPage = currentPage > 1 ? currentPage - 1 : 1;
  const nextPage = currentPage < pageCount ? currentPage + 1 : pageCount;

  return (
    <div className="flex mt-12 justify-evenly items-center">
      {/* Left arrow for previous page */}
      <PaginationArrow
        direction="left"
        href={createPageURL(prevPage)}
        isDisabled={currentPage <= 1}
      />

      {/* Current page indicator */}
      <div>
        <span className="p-2 font-semibold text-gray-500">
          Page {currentPage} of {pageCount}
        </span>
      </div>

      {/* Right arrow for next page */}
      <PaginationArrow
        direction="right"
        href={createPageURL(nextPage)}
        isDisabled={currentPage >= pageCount}
      />
    </div>
  );
}
