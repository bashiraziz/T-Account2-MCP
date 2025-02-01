export interface Entry {
  id: string;
  referenceNumber: string;
  description: string;
  amount: number;
  type: "debit" | "credit";
}

export interface TAccount {
  id: string;
  accountNumber: string;
  accountName: string;
  entries: Entry[];
  debitTotal: number;
  creditTotal: number;
  balance: number;
}

export interface Session {
  id: string;
  date: string;
  referenceNumber: string;
  description: string;
  tAccounts: TAccount[];
}

export interface Account {
  id: string;
  number: string;
  name: string;
}
