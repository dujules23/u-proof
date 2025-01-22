import { FC, ReactNode, Suspense } from "react";
import UserNav from "../common/nav/UserNav";

interface Props {
  title?: string;
  desc?: string;
  children?: ReactNode;
}

const DefaultLayout: FC<Props> = ({ title, desc, children }): JSX.Element => {
  return (
    <>
      <div id="primary-default-container" className="h-92">
        <div
          id="secondary-default-container"
          className="min-h-screen bg-primary-light dark:bg-primary-dark transition ease-in-out"
        >
          <Suspense fallback={<p>Loading...</p>}>
            <UserNav />
            <div className="h-full mr-6 ml-6 mt-6">{children}</div>
          </Suspense>
        </div>
      </div>
    </>
  );
};

export default DefaultLayout;
