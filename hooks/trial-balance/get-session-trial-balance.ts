import { useQuery } from "@tanstack/react-query";
import { axiosInstance } from "@/lib";
import { API_URLS } from "@/constants/url-config";
import { TrialBalance } from "@/types";

const fetchTrialBalances = async (sessionId: string): Promise<TrialBalance> => {
  const { data } = await axiosInstance.get(
    `${API_URLS.TRIAL_BALANCE.GET_SESSION_TRIAL_BALANCE}/${sessionId}`
  );
  return data;
};

export const useTrialBalances = (sessionId: string) => {
  return useQuery({
    queryKey: ["sessionBalances", sessionId],
    queryFn: () => fetchTrialBalances(sessionId),
    enabled: !!sessionId,
  });
};
