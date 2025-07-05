"use client";

import MessageForm from "@/app/components/MessageForm";
import Login from "./login/page";
import { useSession } from "next-auth/react";

export default function Home() {
  const session = useSession();

  return (
    <div>
      {session.status === "unauthenticated" && <Login />}
      {session.status === "authenticated" && <MessageForm />}
    </div>
  );
}
