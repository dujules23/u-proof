import Link from "next/link";
import { FC } from "react";
import DarkModeButton from "@/components/buttons/DarkModeButton";

interface Props {}

const APP_NAME = "uProof";

const UserNav: FC<Props> = (props): JSX.Element => {
  return (
    <div className="bg-nav sticky top-0 z-50 flex items-center justify-between p-6 text-primary">
      {/* Title */}
      <Link href="/">
        <div className="flex items-center space-x-2">
          <span className="md:text-xl font-semibold">{APP_NAME}</span>
        </div>
      </Link>

      {/* Dark Mode Button */}
      <div className="flex space-x-5">
        <Link href="">Past Messages</Link>
        <DarkModeButton />
      </div>
    </div>
  );
};

export default UserNav;
