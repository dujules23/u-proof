import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "sonner";
import DefaultLayout from "@/components/layout/DefaultLayout";
import { getServerSession } from "next-auth";
import { SessionProvider } from "next-auth/react";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "uProof",
  description: "Sending Messages for Review Safely and Securely",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await getServerSession();
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
