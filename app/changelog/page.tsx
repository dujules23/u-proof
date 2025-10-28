// app/changelog/page.tsx
import React from "react";
import { getAllChangelogs } from "../../lib/changelog";
import dynamic from "next/dynamic";

// dynamic import client component (so it renders client-side)
const AccordionItem = dynamic(
  () => import("../../components/changelog/AccordionItem"),
  { ssr: false }
);

export const metadata = {
  title: "Changelog",
};

export default async function ChangelogPage() {
  const changelogs = await getAllChangelogs();

  const latest = changelogs[0];

  return (
    <main className="max-w-3xl mx-auto p-6">
      <header className="mb-6">
        <h1 className="text-3xl font-bold text-black dark:text-primary-light">
          Change Log
        </h1>
        {latest && (
          <div className="mt-2 flex items-center gap-3">
            <span className="text-sm text-gray-600">Latest:</span>
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-gray-500 rounded-full text-sm">
              <span className="font-medium">{latest.title ?? latest.slug}</span>
              {latest.date && (
                <span className="text-xs text-gray-500">
                  — {new Date(latest.date).toLocaleDateString()}
                </span>
              )}
            </div>
          </div>
        )}
      </header>

      <section className="space-y-4">
        {changelogs.map((c) => (
          <AccordionItem
            key={c.slug}
            title={c.title ?? c.slug}
            date={c.date}
            contentHtml={c.contentHtml}
          />
        ))}
      </section>
    </main>
  );
}
