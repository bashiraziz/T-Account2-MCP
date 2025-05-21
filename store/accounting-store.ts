import { create } from "zustand";
import { persist } from "zustand/middleware";
import { AccountingStore } from "@/types";

export const useAccountingStore = create<AccountingStore>()(
  persist(
    (set) => ({
      sessions: [],
      selectedSessionId: null,
      loadingSession: false,

      setSelectedSessionId: (sessionId) =>
        set({ selectedSessionId: sessionId }),

      setLoadingSession: (loadingSession) =>
        set({ loadingSession: loadingSession }),

      addSessions: (newSessions) =>
        set(() => ({
          sessions: newSessions,
        })),

      clearSessions: () => set({ sessions: [], selectedSessionId: null }),

      addSession: (session) =>
        set((state) => ({ sessions: [...state.sessions, session] })),

      updateSession: (sessionId, updatedSession) =>
        set((state) => ({
          sessions: state.sessions.map((session) =>
            session.id === sessionId
              ? { ...session, ...updatedSession }
              : session
          ),
        })),

      deleteSession: (sessionId) =>
        set((state) => ({
          sessions: state.sessions.filter(
            (session) => session.id !== sessionId
          ),
        })),

      addTAccount: (sessionId, tAccount) =>
        set((state) => ({
          sessions: state.sessions.map((session) =>
            session.id === sessionId
              ? {
                  ...session,
                  tAccounts: [...(session.tAccounts || []), tAccount],
                }
              : session
          ),
        })),

      updateTAccount: (sessionId, tAccountId, updates) => {
        set((state) => ({
          ...state,
          sessions: state.sessions.map((s) =>
            s.id === sessionId
              ? {
                  ...s,
                  tAccounts: s.tAccounts.map((t) =>
                    t.id === tAccountId
                      ? { ...t, chartOfAccount: updates.chartOfAccount ?? null }
                      : t
                  ),
                }
              : s
          ),
        }));
      },

      deleteTAccount: (sessionId, tAccountId) =>
        set((state) => ({
          sessions: state.sessions.map((session) =>
            session.id === sessionId
              ? {
                  ...session,
                  tAccounts: session.tAccounts.filter(
                    (tAcc) => tAcc.id !== tAccountId
                  ),
                }
              : session
          ),
        })),

      addEntry: (sessionId, tAccountId, entry) =>
        set((state) => ({
          sessions: state.sessions.map((session) =>
            session.id === sessionId
              ? {
                  ...session,
                  tAccounts: session.tAccounts.map((tAcc) =>
                    tAcc.id === tAccountId
                      ? { ...tAcc, entries: [...tAcc.entries, entry] }
                      : tAcc
                  ),
                }
              : session
          ),
        })),

      updateEntry: (sessionId, tAccountId, entryId, updatedEntry) =>
        set((state) => ({
          sessions: state.sessions.map((session) =>
            session.id === sessionId
              ? {
                  ...session,
                  tAccounts: session.tAccounts.map((tAcc) =>
                    tAcc.id === tAccountId
                      ? {
                          ...tAcc,
                          entries: tAcc.entries.map((entry) =>
                            entry.id === entryId
                              ? { ...entry, ...updatedEntry }
                              : entry
                          ),
                        }
                      : tAcc
                  ),
                }
              : session
          ),
        })),

      deleteEntry: (sessionId, tAccountId, entryId) =>
        set((state) => ({
          sessions: state.sessions.map((session) =>
            session.id === sessionId
              ? {
                  ...session,
                  tAccounts: session.tAccounts.map((tAcc) =>
                    tAcc.id === tAccountId
                      ? {
                          ...tAcc,
                          entries: tAcc.entries.filter(
                            (entry) => entry.id !== entryId
                          ),
                        }
                      : tAcc
                  ),
                }
              : session
          ),
        })),
    }),
    { name: "accounting-store" } // Persist store in localStorage
  )
);
