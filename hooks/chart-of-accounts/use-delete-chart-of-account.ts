import { useMutation } from "@tanstack/react-query";
import { axiosInstance } from "@/lib";
import { API_URLS } from "@/constants/url-config";

const deleteChartOfAccount = async (id: string) => {
  const response = await axiosInstance.delete(
    `${API_URLS.CHART_OF_ACCOUNTS.DELETE_CHART_OF_ACCOUNT}/${id}`
  );
  return response.data;
};

export const useDeleteChartOfAccount = () => {
  return useMutation({
    mutationFn: deleteChartOfAccount,
  });
};
