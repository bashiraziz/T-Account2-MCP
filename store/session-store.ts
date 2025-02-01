import { create } from "zustand";
import { v4 as uuid } from "uuid";
import type { Session, TAccount, Entry, Account } from "@/types";

interface SessionStore {
  sessions: Session[];
  currentSession: Session | null;
  chartOfAccounts: Account[];

  // Actions
  addSession: (session: Omit<Session, "id" | "tAccounts">) => void;
  setCurrentSession: (sessionId: string) => void;
  updateSession: (sessionId: string, updates: Partial<Session>) => void;
  addTAccount: (
    sessionId: string,
    account: Omit<
      TAccount,
      "id" | "entries" | "debitTotal" | "creditTotal" | "balance"
    >
  ) => void;
  updateTAccount: (
    sessionId: string,
    tAccountId: string,
    updates: Partial<TAccount>
  ) => void;
  addEntry: (
    sessionId: string,
    tAccountId: string,
    entry: Omit<Entry, "id">
  ) => void;
  updateEntry: (
    sessionId: string,
    tAccountId: string,
    entryId: string,
    updates: Partial<Entry>
  ) => void;
  calculateBalances: (sessionId: string, tAccountId: string) => void;
}

export const useSessionStore = create<SessionStore>((set, get) => ({
  sessions: [
    {
      id: uuid(),
      date: new Date().toISOString().slice(0, 10),
      referenceNumber: "DEFAULT",
      description: "Initial Session",
      tAccounts: [],
    },
  ],
  currentSession: null,
  chartOfAccounts: [
    { id: uuid(), number: "1001", name: "Cash" },
    { id: uuid(), number: "2001", name: "Accounts Receivable" },
    { id: uuid(), number: "3001", name: "Inventory" },
    { id: uuid(), number: "4001", name: "Revenue" },
    { id: uuid(), number: "5001", name: "Expenses" },
  ],

  addSession: (session) =>
    set((state) => {
      const newSession = {
        ...session,
        id: uuid(),
        tAccounts: [
          {
            id: uuid(),
            accountNumber: "",
            accountName: "",
            entries: [],
            debitTotal: 0,
            creditTotal: 0,
            balance: 0,
          },
        ],
      };
      return {
        sessions: [...state.sessions, newSession],
        currentSession: newSession,
      };
    }),

  setCurrentSession: (sessionId) =>
    set({
      currentSession: get().sessions.find((s) => s.id === sessionId) || null,
    }),

  updateSession: (sessionId, updates) =>
    set((state) => ({
      sessions: state.sessions.map((session) =>
        session.id === sessionId ? { ...session, ...updates } : session
      ),
      currentSession:
        state.currentSession?.id === sessionId
          ? { ...state.currentSession, ...updates }
          : state.currentSession,
    })),

  addTAccount: (sessionId, account) =>
    set((state) => ({
      sessions: state.sessions.map((session) =>
        session.id === sessionId
          ? {
              ...session,
              tAccounts: [
                ...session.tAccounts,
                {
                  ...account,
                  id: uuid(),
                  entries: [],
                  debitTotal: 0,
                  creditTotal: 0,
                  balance: 0,
                },
              ],
            }
          : session
      ),
    })),

  updateTAccount: (sessionId, tAccountId, updates) =>
    set((state) => ({
      sessions: state.sessions.map((session) =>
        session.id === sessionId
          ? {
              ...session,
              tAccounts: session.tAccounts.map((tAccount) =>
                tAccount.id === tAccountId
                  ? { ...tAccount, ...updates }
                  : tAccount
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
              tAccounts: session.tAccounts.map((tAccount) =>
                tAccount.id === tAccountId
                  ? {
                      ...tAccount,
                      entries: [...tAccount.entries, { ...entry, id: uuid() }],
                    }
                  : tAccount
              ),
            }
          : session
      ),
    })),

  updateEntry: (sessionId, tAccountId, entryId, updates) =>
    set((state) => ({
      sessions: state.sessions.map((session) =>
        session.id === sessionId
          ? {
              ...session,
              tAccounts: session.tAccounts.map((tAccount) =>
                tAccount.id === tAccountId
                  ? {
                      ...tAccount,
                      entries: tAccount.entries.map((entry) =>
                        entry.id === entryId ? { ...entry, ...updates } : entry
                      ),
                    }
                  : tAccount
              ),
            }
          : session
      ),
    })),

  calculateBalances: (sessionId, tAccountId) =>
    set((state) => {
      const newSessions = state.sessions.map((session) => {
        if (session.id !== sessionId) return session;

        return {
          ...session,
          tAccounts: session.tAccounts.map((tAccount) => {
            if (tAccount.id !== tAccountId) return tAccount;

            const debitTotal = tAccount.entries
              .filter((e: Entry) => e.type === "debit")
              .reduce((sum, e) => sum + e.amount, 0);

            const creditTotal = tAccount.entries
              .filter((e: Entry) => e.type === "credit")
              .reduce((sum, e) => sum + e.amount, 0);

            const balance = debitTotal - creditTotal;

            return {
              ...tAccount,
              debitTotal,
              creditTotal,
              balance: Math.abs(balance),
            };
          }),
        };
      });

      return {
        sessions: newSessions,
        currentSession: newSessions.find((s) => s.id === sessionId) || null,
      };
    }),
}));
