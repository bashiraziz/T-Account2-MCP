import { useMutation } from "@tanstack/react-query";
import { axiosInstance } from "@/lib";
import { API_URLS } from "@/constants/url-config";

const addChartOfAccount = async (accountData: {
  userId: string;
  accountCode: string;
  accountName: string;
  userDefined1: string;
  userDefined2: string;
  userDefined3?: string;
}) => {
  const { data } = await axiosInstance.post(
    API_URLS.CHART_OF_ACCOUNTS.ADD_CHART_OF_ACCOUNT,
    accountData
  );
  return data;
};

export const useAddChartOfAccount = () => {
  return useMutation({
    mutationFn: addChartOfAccount,
  });
};
