"use client";

import Link from "next/link";
import { FC } from "react";
import DarkModeButton from "@/components/buttons/DarkModeButton";
import Notifications from "@/components/buttons/Notifications";
import Image from "next/image";
import { signOut, useSession } from "next-auth/react";
import HamburgerMenu from "../HamburgerMenu";
import { useState } from "react";
import MobileMenu from "./MobileMenu";

interface Props {}

const APP_NAME = "uProof";

const UserNav: FC<Props> = (): JSX.Element => {
  const session = useSession();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleSignOut = () => {
    signOut({ callbackUrl: "/" });
  };

  return (
    <div className="bg-nav sticky top-0 z-50 flex items-center justify-between p-3 md:p-5 text-primary">
      {/* Title */}
      <div className="flex items-center space-x-5">
        <Link href="/">
          <div id="logo" className="flex items-center space-x-2">
            <Image alt="logo" src="/logo.png" width={35} height={35} />
            <span id="app-name" className="md:text-xl font-semibold">
              {APP_NAME}
            </span>
          </div>
        </Link>
        {/* {session.data?.user && session.status === "authenticated" && (
        )} */}
      </div>

      {/* Dark Mode Button  and Past Messages Link*/}
      <div className="flex items-center space-x-3">
        <div className="hidden md:flex items-center space-x-4">
          {session.status === "authenticated" && (
            <>
              <div className="font-semibold items-center hidden md:block">
                Welcome,{" "}
                {session.data?.user?.name
                  ? session.data?.user?.name
                  : session.data?.user?.email}
                !
              </div>
              <Link
                className="hover:text-black transition ease-in-out"
                href="/past-messages"
              >
                Past Messages
              </Link>

              <Link
                id="logout"
                className="hover:text-black transition ease-in-out"
                href="/"
                onClick={handleSignOut}
              >
                Log Out
              </Link>
              <Notifications />
            </>
          )}
        </div>
        {/* Hamburger Menu */}
        {session.status === "authenticated" && (
          <div
            className="md:hidden p-2"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            <HamburgerMenu
              isOpen={isMenuOpen}
              toggle={() => setIsMenuOpen(!isMenuOpen)}
            />
          </div>
        )}
        <DarkModeButton />

        <MobileMenu
          onClick={() => setIsMenuOpen(false)}
          handleSignOut={handleSignOut}
          session={session}
          isMenuOpen={isMenuOpen}
          setIsMenuOpen={setIsMenuOpen}
        />
      </div>
    </div>
  );
};

export default UserNav;
