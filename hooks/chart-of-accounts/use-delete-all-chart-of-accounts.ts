import { useMutation } from "@tanstack/react-query";
import { axiosInstance } from "@/lib";
import { API_URLS } from "@/constants";

const deleteAllChartOfAccounts = async (userId: string) => {
  const { data } = await axiosInstance.delete(
    `${API_URLS.CHART_OF_ACCOUNTS.DELETE_ALL_CHART_OF_ACCOUNTS}?userId=${userId}`
  );
  return data;
};

export const useDeleteAllChartOfAccounts = () => {
  return useMutation({
    mutationFn: deleteAllChartOfAccounts,
  });
};
