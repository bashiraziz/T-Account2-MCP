import { signOut } from "next-auth/react";
import { useAccountingStore, useUserStore } from "@/store";

export const useLogout = () => {
  const { setUser } = useUserStore();
  const { clearSessions } = useAccountingStore();

  return async () => {
    await signOut({ callbackUrl: "/login" });

    // Clear user and session data after sign out
    setUser(null);
    clearSessions();
  };
};
