import { create } from "zustand";
import { persist } from "zustand/middleware";
import { UserType } from "@/types";

interface UserState {
  user: UserType | null;
  setUser: (user: UserType | null) => void;
}

export const useUserStore = create<UserState>()(
  persist(
    (set) => ({
      user: null,
      setUser: (user) => set({ user }),
    }),
    {
      name: "user-storage", // Persisted storage key
    }
  )
);
