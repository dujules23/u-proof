import { FC, ReactNode, Suspense } from "react";
import UserNav from "../common/nav/UserNav";
import SessionWrapper from "../SessionWrapper";
import { getServerSession, Session } from "next-auth";

interface Props {
  title?: string;
  desc?: string;
  children?: ReactNode;
}

const DefaultLayout = async ({ title, desc, children }: Props) => {
  return (
    <>
      <SessionWrapper>
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
      </SessionWrapper>
    </>
  );
};

export default DefaultLayout;
