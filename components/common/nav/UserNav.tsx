import Link from "next/link";
import { FC } from "react";
import DarkModeButton from "@/components/buttons/DarkModeButton";
import { FaBookOpenReader } from "react-icons/fa6";
import Notifications from "@/components/buttons/Notifications";
import Image from "next/image";

interface Props {}

const APP_NAME = "uProof";

const UserNav: FC<Props> = (props): JSX.Element => {
  return (
    <div className="bg-nav sticky top-0 z-50 flex items-center justify-between p-6 text-primary">
      {/* Title */}
      <Link href="/">
        <div className="flex items-center space-x-2">
          <Image alt="logo" src="/logo.png" width={35} height={35} />
          <span className="md:text-xl font-semibold">{APP_NAME}</span>
        </div>
      </Link>

      {/* Dark Mode Button  and Past Messages Link*/}
      <div className="flex items-center space-x-5">
        <div className="hover:text-black transition ease-in-out">
          <Link href="/past-messages">Past Messages</Link>
        </div>
        <DarkModeButton />
        <Notifications />
      </div>
    </div>
  );
};

export default UserNav;
