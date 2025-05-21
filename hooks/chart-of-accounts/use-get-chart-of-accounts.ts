import { useInfiniteQuery } from "@tanstack/react-query";
import axios from "axios";
import { API_URLS } from "@/constants/url-config";

const fetchChartOfAccounts = async ({ pageParam = 0, queryKey }: any) => {
  const [, userId, search] = queryKey;
  const params: Record<string, string | number> = {
    userId,
    offset: pageParam,
    limit: 10,
  };
  if (search) params.query = search;

  const { data } = await axios.get(
    API_URLS.CHART_OF_ACCOUNTS.GET_CHART_OF_ACCOUNTS,
    { params }
  );
  return data;
};

export const useGetChartOfAccounts = (userId: string, query?: string) =>
  useInfiniteQuery({
    queryKey: ["chartOfAccounts", userId, query],
    queryFn: fetchChartOfAccounts,
    initialPageParam: 0,
    getNextPageParam: (lastPage, allPages) =>
      lastPage.length === 10 ? allPages.length * 10 : undefined,
    enabled: !!userId,
  });
