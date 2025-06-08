"use client";

import { FC, useEffect, useRef, useState } from "react";
import { TAccounts } from "./t-accounts";
import { useSession } from "next-auth/react";
import { useAccountingStore, useUserStore, useTourStore } from "@/store";
import { useGetUser, useScreenSize, useSessions, useTourSeen } from "@/hooks";
import { createNewSession, getTourSteps, initializeSessions } from "@/utils";
import { PageLoader, PrimaryBtn, SecondaryBtn } from "../common";
import { Session, UserType } from "@/types";
import { NoSessionIcon } from "../svgs";
import AppTour from "@/components/app-tour/app-tour";

export const Home: FC = () => {
  // this page will switch between the sessions, we have the latest Session displayed right now
  const [hasStartedTour, setHasStartedTour] = useState(false);
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
    // if (!user) return;
    setLoadingSession(true);

    const newSession = createNewSession("guest");
    addSession(newSession); // Add session to Zustand store
    setSelectedSessionId(newSession.id); // Select new session

    setTimeout(() => {
      setLoadingSession(false);
    }, 500);
  };

  const selectedSession = sessions.find((s) => s.id === selectedSessionId);

  // app tour
  const { mutate: markTourAsSeen, isPending: isTourCompletionSaved } =
    useTourSeen();
  const { isMobile, isSm } = useScreenSize();
  const steps = getTourSteps(isMobile, isSm);

  const { isRunning, startTour, stopTour } = useTourStore();

  const handleTourEnd = () => {
    markTourAsSeen(user?.id ?? "", {
      onSuccess: () => {
        setUser({
          ...user!,
          hasSeenTour: true,
        });
        stopTour();
      },
    });
  };

  const handleTourStart = () => {
    console.log("Tour started!");
  };

  // Check if user has completed tour before
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (
        !user ||
        loadingUser ||
        hasStartedTour ||
        status === "loading" ||
        isLoading ||
        loadingSession ||
        !storeReady
      ) {
        return;
      }

      if (userDetails?.hasSeenTour) {
        if (isRunning) {
          stopTour();
        }
        return;
      }

      setHasStartedTour(true);
      startTour();
    }, 1000);

    return () => clearTimeout(timeoutId);
  }, [
    user,
    userDetails,
    loadingUser,
    hasStartedTour,
    status,
    isLoading,
    loadingSession,
    storeReady,
    startTour,
  ]);

  // loader while fetching data
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
      <AppTour
        steps={steps}
        run={isRunning}
        continuous={true}
        showProgress={true}
        showSkipButton={true}
        onTourEnd={handleTourEnd}
        onTourStart={handleTourStart}
      />
      {selectedSession ? (
        <TAccounts selectedSession={selectedSession} />
      ) : (
        <div className="flex flex-col items-center justify-center h-[calc(100vh-120px)]">
          <NoSessionIcon />
          <h1 className="text-3xl font-medium">No sessions found!</h1>
          <p className="text-base">Select a session or create a new session.</p>
          <SecondaryBtn
            onClick={handleNewSession}
            text="Create"
            className="border-primary text-primary mt-4"
          />
        </div>
      )}
    </div>
  );
};
