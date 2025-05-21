import { useMutation, useQueryClient } from "@tanstack/react-query";
import { axiosInstance } from "@/lib";
import { API_URLS } from "@/constants/url-config";

interface Entry {
  referenceNumber: string;
  description?: string;
  amount: number;
  entryType: "DEBIT" | "CREDIT";
}

interface TAccount {
  accountNumber: string;
  accountName: string;
  entries: Entry[];
}

export interface SaveSessionData {
  id?: string; // If provided, update the session; otherwise, create a new one
  date: string;
  referenceNumber: string;
  description?: string;
  tAccounts: TAccount[];
}

const saveSession = async (sessionData: SaveSessionData) => {
  const { data } = await axiosInstance.post(
    API_URLS.SESSIONS.SAVE_SESSION,
    sessionData
  );
  return data;
};

export const useSaveSession = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: saveSession,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["sessions"] });
    },
  });
};
