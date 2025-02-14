import { FC, ReactNode, Suspense } from "react";
import UserNav from "../common/nav/UserNav";
import SessionWrapper from "../../app/components/SessionWrapper";
import { getServerSession, Session } from "next-auth";
import { SessionProvider, useSession } from "next-auth/react";

interface Props {
  title?: string;
  desc?: string;
  children?: ReactNode;
}

const DefaultLayout = async ({ title, desc, children }: Props) => {
  return (
    <>
      <div id="primary-default-container" className="h-92">
        <div
          id="secondary-default-container"
          className="min-h-screen bg-primary-light dark:bg-primary-dark transition ease-in-out"
        >
          <SessionWrapper>
            <Suspense fallback={<p>Loading...</p>}>
              <UserNav />
              <div className="h-full mr-6 ml-6 mt-6">{children}</div>
            </Suspense>
          </SessionWrapper>
        </div>
      </div>
    </>
  );
};

export default DefaultLayout;
