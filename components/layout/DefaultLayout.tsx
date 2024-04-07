import { FC, ReactNode } from "react";
import AppHead from "../common/AppHead";
import UserNav from "../common/nav/UserNav";

interface Props {
  title?: string;
  desc?: string;
  children?: ReactNode;
}

const DefaultLayout: FC<Props> = ({ title, desc, children }): JSX.Element => {
  return (
    <>
      <AppHead title={title} desc={desc} />
      <div className="h-92">
        <div className="min-h-screen dark:bg-primary-dark bg-primary transition ease-in-out">
          <UserNav />
          <div className="grid h-full mr-6 ml-6 mt-6">{children}</div>
        </div>
      </div>
    </>
  );
};

export default DefaultLayout;
