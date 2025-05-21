export interface TAccountBalance {
  accountNumber: string;
  accountName: string;
  totalDebit: number;
  totalCredit: number;
  creditBalance: number;
  debitBalance: number;
}

export interface TrialBalance {
  sessionId: string;
  sessionReference: string;
  sessionDate: string;
  totalDebitAmount: number;
  totalCreditAmount: number;
  totalDebitBalance: number;
  totalCreditBalance: number;
  tAccounts: TAccountBalance[];
}
