"use client";
import { Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import { PropsWithChildren } from "react";

type Props = { session: Session };

const Provider = ({ children, session }: PropsWithChildren<Props>) => {
  return <SessionProvider session={session}>{children}</SessionProvider>;
};
export default Provider;
