import { useQuery } from "@tanstack/react-query";
import { axiosInstance } from "@/lib";
import { API_URLS } from "@/constants/url-config";

interface Session {
  id: string;
  date: string;
  referenceNumber: string;
  description?: string;
  createdAt: string;
  updatedAt: string;
}

const fetchSessions = async (): Promise<Session[]> => {
  const { data } = await axiosInstance.get(API_URLS.SESSIONS.GET_ALL_SESSIONS);
  return data;
};

export const useSessions = (userId?: string) => {
  return useQuery({
    queryKey: ["sessions", userId],
    queryFn: fetchSessions,
    enabled: !!userId,

    staleTime: Infinity, // Prevents automatic refetching
    refetchOnMount: false, // No refetch when component mounts
  });
};
