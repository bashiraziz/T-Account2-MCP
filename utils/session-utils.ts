import { nanoid } from "nanoid";
import { EntryType, Session } from "@/types";

// user will have this default session if user has no existing sessions
export const createDefaultSession = (): Session => {
  const defaultSessionId = nanoid();
  const defaultTAccountId = nanoid();

  return {
    id: defaultSessionId,
    userId: "guest",
    date: new Date().toISOString(),
    referenceNumber: "New Session",
    description: "",
    isNew: true,
    tAccounts: [
      {
        id: defaultTAccountId,
        sessionId: defaultSessionId,
        chartOfAccount: null,
        isNew: true,
        entries: [
          {
            id: nanoid(),
            tAccountId: defaultTAccountId,
            referenceNumber: "",
            description: "",
            amount: 0,
            entryType: "DEBIT" as EntryType,
          },
          {
            id: nanoid(),
            tAccountId: defaultTAccountId,
            referenceNumber: "",
            description: "",
            amount: 0,
            entryType: "CREDIT" as EntryType,
          },
        ],
      },
    ],
  };
};

// Initialize sessions
export const initializeSessions = ({
  session,
  fetchedSessions,
  isLoading,
  storeReady,
  addSessions,
  setSelectedSessionId,
  sessions,
  deleteSession,
}: {
  session: any;
  fetchedSessions?: Session[];
  isLoading: boolean;
  storeReady: boolean;
  addSessions: (sessions: Session[]) => void;
  setSelectedSessionId: (id: string) => void;
  sessions: Session[];
  deleteSession: (id: string) => void;
}) => {
  if (isLoading || !storeReady) return;
  if (session?.user) {
    if (fetchedSessions && fetchedSessions.length > 0) {
      // remove the guest session if the user already has sessions
      const guestSession = sessions.find((s) => s.userId === "guest");
      if (guestSession) {
        deleteSession(guestSession.id);
      }
      // adding user sessions
      addSessions(fetchedSessions);
      setSelectedSessionId(fetchedSessions[0].id);
    } else {
      if (sessions[0]?.userId !== "guest") {
        // adding a default session if it's not already there
        const defaultSession = createDefaultSession();
        addSessions([defaultSession]);
        setSelectedSessionId(defaultSession.id);
      }
    }
  } else {
    // adding a default session if it's not already there
    if (sessions[0]?.userId !== "guest") {
      const defaultSession = createDefaultSession();
      addSessions([defaultSession]);
      setSelectedSessionId(defaultSession.id);
    }
  }
};
