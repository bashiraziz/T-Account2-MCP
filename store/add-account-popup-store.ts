import { create } from "zustand";

interface AddAccountPopupState {
  isAddAccountOpen: boolean;
  openAddAccount: () => void;
  closeAddAccount: () => void;
}

export const useAddAccountPopupStore = create<AddAccountPopupState>((set) => ({
  isAddAccountOpen: false,
  openAddAccount: () => set({ isAddAccountOpen: true }),
  closeAddAccount: () => set({ isAddAccountOpen: false }),
}));
