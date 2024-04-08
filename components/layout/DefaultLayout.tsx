import { FC, ReactNode } from "react";
import UserNav from "../common/nav/UserNav";

interface Props {
  title?: string;
  desc?: string;
  children?: ReactNode;
}

const DefaultLayout: FC<Props> = ({ title, desc, children }): JSX.Element => {
  return (
    <>
      <div className="h-92">
        <div className="min-h-screen bg-primary-light dark:bg-primary-dark transition ease-in-out">
          <UserNav />
          <div className="h-full mr-6 ml-6 mt-6">{children}</div>
        </div>
      </div>
    </>
  );
};

export default DefaultLayout;
