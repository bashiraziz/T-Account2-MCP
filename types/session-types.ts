import { ChartOfAccountsType } from "./coa-types";

// Types
export type EntryType = "DEBIT" | "CREDIT";

export interface Entry {
  id: string;
  tAccountId: string;
  referenceNumber: string;
  description?: string;
  amount: number;
  entryType: EntryType;
}

export interface TAccount {
  id: string;
  sessionId: string;
  chartOfAccount: ChartOfAccountsType | null;
  entries: Entry[];
  isNew?: boolean;
}

export interface Session {
  id: string;
  userId: string;
  date: string;
  referenceNumber: string;
  description?: string;
  tAccounts: TAccount[];
  isNew?: boolean;
}

export interface AccountingStore {
  sessions: Session[];
  selectedSessionId: string | null;
  loadingSession?: boolean;

  setSelectedSessionId: (sessionId: string | null) => void;
  setLoadingSession: (loadingSession: boolean) => void;

  addSessions: (sessions: Session[]) => void;
  clearSessions: () => void;

  addSession: (session: Session) => void;
  updateSession: (sessionId: string, updatedSession: Partial<Session>) => void;
  deleteSession: (sessionId: string) => void;

  addTAccount: (sessionId: string, tAccount: TAccount) => void;
  updateTAccount: (
    sessionId: string,
    tAccountId: string,
    updatedTAccount: Partial<TAccount>
  ) => void;
  deleteTAccount: (sessionId: string, tAccountId: string) => void;

  addEntry: (sessionId: string, tAccountId: string, entry: Entry) => void;
  updateEntry: (
    sessionId: string,
    tAccountId: string,
    entryId: string,
    updatedEntry: Partial<Entry>
  ) => void;
  deleteEntry: (sessionId: string, tAccountId: string, entryId: string) => void;
}
