import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "sonner";
import DefaultLayout from "@/components/layout/DefaultLayout";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "uProof",
  description: "Sending Messages for Review Safely and Securely",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <DefaultLayout>
          {children}
          <Toaster />
        </DefaultLayout>
      </body>
    </html>
  );
}
