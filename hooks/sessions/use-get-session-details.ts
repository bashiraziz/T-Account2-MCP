import { useQuery } from "@tanstack/react-query";
import { axiosInstance } from "@/lib";
import { API_URLS } from "@/constants/url-config";

interface Entry {
  id: string;
  referenceNumber: string;
  description?: string;
  amount: number;
  entryType: "DEBIT" | "CREDIT";
  createdAt: string;
  updatedAt: string;
}

interface TAccount {
  id: string;
  sessionId: string;
  accountNumber: string;
  accountName: string;
  entries: Entry[];
  createdAt: string;
  updatedAt: string;
}

interface SessionDetails {
  id: string;
  userId: string;
  date: string;
  referenceNumber: string;
  description?: string;
  tAccounts: TAccount[];
  createdAt: string;
  updatedAt: string;
}

const fetchSessionDetails = async (
  sessionId: string
): Promise<SessionDetails> => {
  const { data } = await axiosInstance.get(
    `${API_URLS.SESSIONS.GET_SESSION_DETAILS}/${sessionId}`
  );
  return data;
};

export const useSessionDetails = (userId: string, sessionId: string) => {
  return useQuery({
    queryKey: ["session", sessionId],
    queryFn: () => fetchSessionDetails(sessionId),
    enabled: !!userId && !!sessionId, // Prevents execution if userId or sessionId is undefined
  });
};
