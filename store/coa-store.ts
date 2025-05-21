import { create } from "zustand";
import { ChartOfAccountsType } from "@/types";

interface COAStore {
  accounts: ChartOfAccountsType[];
  setAccounts: (accounts: ChartOfAccountsType[]) => void;
  addAccount: (account: ChartOfAccountsType) => void;
  editAccount: (updatedAccount: ChartOfAccountsType) => void;
  deleteAccount: (id: string) => void;
  deleteAllAccounts: () => void;
  uploadAccounts: (newAccounts: ChartOfAccountsType[]) => void;
}

export const useCOAStore = create<COAStore>((set) => ({
  accounts: [],

  setAccounts: (accounts) => set({ accounts }),

  addAccount: (account) =>
    set((state) => ({
      accounts: state.accounts.some(
        (a) => a.accountCode === account.accountCode
      )
        ? state.accounts
        : [...state.accounts, account],
    })),

  editAccount: (updatedAccount) =>
    set((state) => ({
      accounts: state.accounts.map((account) =>
        account.id === updatedAccount.id ? updatedAccount : account
      ),
    })),

  deleteAccount: (id) =>
    set((state) => ({
      accounts: state.accounts.filter((account) => account.id !== id),
    })),

  deleteAllAccounts: () => set({ accounts: [] }),

  uploadAccounts: (newAccounts) =>
    set((state) => {
      const existingCodes = new Set(state.accounts.map((a) => a.accountCode));
      const mergedAccounts = [
        ...state.accounts,
        ...newAccounts.filter(
          (account) => !existingCodes.has(account.accountCode)
        ),
      ];
      return { accounts: mergedAccounts };
    }),
}));
