"use client";

import Link from "next/link";
import { FC } from "react";
import DarkModeButton from "@/components/buttons/DarkModeButton";
import Notifications from "@/components/buttons/Notifications";
import Image from "next/image";
import { signOut, useSession } from "next-auth/react";

interface Props {}

const APP_NAME = "uProof";

const UserNav: FC<Props> = (): JSX.Element => {
  const session = useSession();

  const handleSignOut = () => {
    signOut({ callbackUrl: "/" });
  };

  return (
    <div className="bg-nav sticky top-0 z-50 flex items-center justify-between p-6 text-primary">
      {/* Title */}
      <Link href="/">
        <div id="logo" className="flex items-center space-x-2">
          <Image alt="logo" src="/logo.png" width={35} height={35} />
          <span id="app-name" className="md:text-xl font-semibold">
            {APP_NAME}
          </span>
        </div>
      </Link>

      {session.status === "authenticated" && (
        <div className="font-semibold">
          Welcome, {session.data?.user?.name}!
        </div>
      )}

      {/* Dark Mode Button  and Past Messages Link*/}
      <div className="flex items-center space-x-5">
        {session.status === "authenticated" && (
          <>
            <Link
              id="logout"
              className="hover:text-black transition ease-in-out"
              href="/"
              onClick={handleSignOut}
            >
              Log Out
            </Link>
            <div className="hover:text-black transition ease-in-out">
              <Link href="/past-messages">Past Messages</Link>
            </div>
            <Notifications />
          </>
        )}
        <DarkModeButton />
      </div>
    </div>
  );
};

export default UserNav;
