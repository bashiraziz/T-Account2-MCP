"use client";

import { FC, useEffect, useRef, useState } from "react";
import { TAccounts } from "./t-accounts";
import { useSession } from "next-auth/react";
import { useAccountingStore, useUserStore } from "@/store";
import { useGetUser, useSessions } from "@/hooks";
import { createNewSession, initializeSessions } from "@/utils";
import { PageLoader } from "../common";
import { Session } from "@/types";
import { NoSessionIcon } from "../svgs";

export const Home: FC = () => {
  // this page will switch between the sessions, we have the latest Session displayed right now
  const { data: session, status } = useSession();
  const { data: userDetails, isLoading: loadingUser, isError } = useGetUser();
  const { setUser, user } = useUserStore();

  // sessions from the local store
  const {
    selectedSessionId,
    setSelectedSessionId,
    sessions,
    addSessions,
    addSession,
    deleteSession,
    loadingSession,
    setLoadingSession,
  } = useAccountingStore();

  // Fetch sessions from API
  const {
    data: fetchedSessions,
    isLoading,
    refetch: rerefetchSessions,
    isRefetching,
  } = useSessions(session?.user?.id);

  const [storeReady, setStoreReady] = useState(false);
  const prevSessionsRef = useRef<Session[] | null>(null);

  // Mark store as ready when Zustand initializes
  useEffect(() => {
    if (!storeReady && sessions.length >= 0) {
      setStoreReady(true);
    }
  }, [sessions, storeReady]);

  // set user info in the store
  useEffect(() => {
    if (session?.user && userDetails) {
      setUser(userDetails);
    }
  }, [userDetails, session, setUser]);

  // Initialize sessions
  useEffect(() => {
    if (!storeReady || isLoading) return;

    const formattedSessions = fetchedSessions?.map((s) => ({
      ...s,
      userId: user?.id ?? "",
      tAccounts: [],
    }));

    // Check if sessions are actually different before updating Zustand
    if (
      JSON.stringify(prevSessionsRef.current) !==
      JSON.stringify(formattedSessions)
    ) {
      initializeSessions({
        session,
        fetchedSessions: formattedSessions,
        isLoading,
        storeReady,
        addSessions,
        setSelectedSessionId,
        sessions,
        deleteSession,
      });
      if (formattedSessions) {
        prevSessionsRef.current = formattedSessions;
      }
    }
  }, [session, fetchedSessions, isLoading, storeReady]);

  // create a new session
  const handleNewSession = () => {
    if (!user) return;
    setLoadingSession(true);

    const newSession = createNewSession(user.id);
    addSession(newSession); // Add session to Zustand store
    setSelectedSessionId(newSession.id); // Select new session

    setTimeout(() => {
      setLoadingSession(false);
    }, 500);
  };

  const selectedSession = sessions.find((s) => s.id === selectedSessionId);

  if (
    status === "loading" ||
    isLoading ||
    !storeReady ||
    loadingSession ||
    isRefetching
  ) {
    return <PageLoader />;
  }

  return (
    <div>
      {selectedSession ? (
        <TAccounts selectedSession={selectedSession} />
      ) : (
        <div className="flex flex-col items-center justify-center h-[calc(100vh-120px)]">
          <NoSessionIcon />
          <h1 className="text-3xl font-medium">No sessions found!</h1>
          <p className="text-base">
            Select a session or{" "}
            <span
              onClick={handleNewSession}
              className="text-secondary cursor-pointer hover:underline"
            >
              create
            </span>{" "}
            a new session.
          </p>
        </div>
      )}
    </div>
  );
};
