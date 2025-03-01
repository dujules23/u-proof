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
    <>
      {/* Overlay */}
      {isMenuOpen && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm md:hidden z-40"
          onClick={() => setIsMenuOpen(false)}
        />
      )}

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
                Welcome, {session.data?.user?.name || session.data?.user?.email}
                !
              </div>
            )}
            {session.status === "authenticated" && (
              <>
                <Link
                  href="/past-messages"
                  className="block py-2 hover:text-gray-600 dark:hover:text-gray-300 text-primary-dark dark:text-primary-light"
                  onClick={onClick}
                >
                  Past Messages
                </Link>
                <div className="dark:text-primary-light text-primary-dark py-2">
                  <Notifications />
                </div>
                <Link
                  href="/"
                  onClick={(e) => {
                    onClick();
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
    </>
  );
};

export default MobileMenu;
