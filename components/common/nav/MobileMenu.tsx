import Notifications from "@/components/buttons/Notifications";
import Link from "next/link";
import { FC } from "react";

interface Props {
  onClick: () => void;
  isMenuOpen: boolean;
  setIsMenuOpen: (isOpen: boolean) => void;
  session: any;
  handleSignOut: () => void;
}

const MobileMenu: FC<Props> = ({
  isMenuOpen,
  session,
  setIsMenuOpen,
  handleSignOut,
  onClick,
}): JSX.Element => {
  return (
    <div className="md:hidden">
      {/* Slide-down Menu */}
      <div
        className={`absolute top-[100%] left-0 right-0 bg-nav shadow-lg transform transition-all duration-300 ease-in-out ${
          isMenuOpen
            ? "opacity-100 translate-y-0"
            : "opacity-0 -translate-y-2 pointer-events-none"
        }`}
      >
        <div className="p-4 space-y-4">
          {session.data?.user && session.status === "authenticated" && (
            <div className="text-primary-light font-semibold border-b pb-2">
              Welcome, {session.data?.user?.name || session.data?.user?.email}!
            </div>
          )}
          {session.status === "authenticated" && (
            <nav className="space-y-2">
              <Link
                href="/"
                className="block py-2 hover:text-gray-600 dark:hover:text-gray-300 text-primary-light"
                onClick={() => setIsMenuOpen(false)}
              >
                Create A Message
              </Link>
              <Link
                href="/past-messages"
                className="block py-2 hover:text-gray-600 dark:hover:text-gray-300 text-primary-light"
                onClick={() => setIsMenuOpen(false)}
              >
                Past Messages
              </Link>
              <div className="py-2">
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
            </nav>
          )}
        </div>
      </div>
    </div>
  );
};

export default MobileMenu;
