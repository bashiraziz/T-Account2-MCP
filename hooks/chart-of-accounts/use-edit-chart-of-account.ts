import { useMutation } from "@tanstack/react-query";
import { axiosInstance } from "@/lib";
import { API_URLS } from "@/constants/url-config";

const editChartOfAccount = async ({
  id,
  userId,
  accountCode,
  accountName,
  userDefined1,
  userDefined2,
  userDefined3,
}: {
  id: string;
  userId: string;
  accountCode: string;
  accountName: string;
  userDefined1: string;
  userDefined2: string;
  userDefined3?: string;
}) => {
  const { data } = await axiosInstance.put(
    `${API_URLS.CHART_OF_ACCOUNTS.EDIT_CHART_OF_ACCOUNT}/${id}`,
    {
      userId,
      accountCode,
      accountName,
      userDefined1,
      userDefined2,
      userDefined3,
    }
  );
  return data;
};

export const useEditChartOfAccount = () => {
  return useMutation({
    mutationFn: editChartOfAccount,
  });
};
