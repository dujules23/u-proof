"use client";

import { SessionProvider } from "next-auth/react";

import { ReactNode } from "react";

interface Props {
  children: ReactNode;
}

const SessionWrapper = ({ children }: Props): JSX.Element => {
  return <SessionProvider>{children}</SessionProvider>;
};

export default SessionWrapper;
