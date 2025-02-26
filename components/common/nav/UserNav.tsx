"use client";

import Link from "next/link";
import { FC } from "react";
import DarkModeButton from "@/components/buttons/DarkModeButton";
import Notifications from "@/components/buttons/Notifications";
import Image from "next/image";
import { signOut, useSession } from "next-auth/react";
import HamburgerMenu from "../HamburgerMenu";
import { useState } from "react";

interface Props {}

const APP_NAME = "uProof";

const UserNav: FC<Props> = (): JSX.Element => {
  const session = useSession();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleSignOut = () => {
    signOut({ callbackUrl: "/" });
  };

  return (
    <div className="bg-nav sticky top-0 z-50 flex items-center justify-between p-6 text-primary">
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
      <div className="flex items-center space-x-5">
        <div className="hidden md:flex items-center space-x-5">
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
        <DarkModeButton />
        {/* Hamburger Menu */}
        {session.status === "authenticated" && (
          <div className="md:hidden" onClick={() => setIsMenuOpen(true)}>
            <HamburgerMenu
              isOpen={isMenuOpen}
              toggle={() => setIsMenuOpen(!isMenuOpen)}
            />
          </div>
        )}

        {/* Slide-out Mobile Menu */}
        <div
          className={`fixed top-0 right-0 h-full w-64 bg-white dark:bg-gray-800 transform transition-transform duration-300 ease-in-out ${
            isMenuOpen ? "translate-x-0" : "translate-x-full"
          } md:hidden shadow-lg z-50`}
        >
          <div className="p-6">
            {/* Close Button */}
            <button
              onClick={() => setIsMenuOpen(false)}
              className="text-primary-dark dark:text-primary-light absolute top-4 right-4 p-2"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>

            {/* Mobile Menu Content */}
            <div className="mt-8 space-y-6">
              {session.data?.user && session.status === "authenticated" && (
                <div className="text-primary-dark dark:text-primary-light font-semibold border-b pb-2">
                  Welcome,{" "}
                  {session.data?.user?.name || session.data?.user?.email}!
                </div>
              )}
              {session.status === "authenticated" && (
                <>
                  <Link
                    href="/past-messages"
                    className="block py-2 hover:text-gray-600 dark:hover:text-gray-300 text-primary-dark dark:text-primary-light"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Past Messages
                  </Link>
                  <div className="dark:text-primary-light text-primary-dark py-2">
                    <Notifications />
                  </div>
                  <Link
                    href="/"
                    onClick={(e) => {
                      setIsMenuOpen(false);
                      handleSignOut();
                    }}
                    className="block py-2 text-red-500 hover:text-red-600"
                  >
                    Log Out
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>

        {/* Overlay */}
        {isMenuOpen && (
          <div
            className="fixed inset-0 bg-black bg-opacity-50 md:hidden z-40"
            onClick={() => setIsMenuOpen(false)}
          />
        )}
      </div>
    </div>
  );
};

export default UserNav;
