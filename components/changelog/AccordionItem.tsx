// components/AccordionItem.client.tsx
"use client";

import { useState } from "react";

type Props = {
  title: string;
  date?: string | null;
  contentHtml: string;
};

export default function AccordionItem({ title, date, contentHtml }: Props) {
  const [open, setOpen] = useState(false);

  return (
    <div className="border-primary-dark dark:border-primary-light border rounded-lg shadow-sm overflow-hidden">
      <button
        onClick={() => setOpen((s) => !s)}
        aria-expanded={open}
        className="w-full flex items-center justify-between px-4 py-3 bg-gray-500 hover:bg-gray-400 focus:outline-none"
      >
        <div>
          <div className="font-semibold">{title}</div>
          {date && (
            <div className="text-sm text-gray-500">
              {new Date(date).toLocaleDateString()}
            </div>
          )}
        </div>

        <div
          className="ml-4 transform transition-transform duration-200"
          style={{ transform: open ? "rotate(180deg)" : "rotate(0deg)" }}
        >
          {/* simple chevron */}
          <svg
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden
          >
            <path
              d="M5 7.5L10 12.5L15 7.5"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      </button>

      {open && (
        <div className="px-4 py-4 dark:bg-primary-dark bg-gray-300 text-gray-800 dark:text-primary-light prose max-w-none">
          <div dangerouslySetInnerHTML={{ __html: contentHtml }} />
        </div>
      )}
    </div>
  );
}
