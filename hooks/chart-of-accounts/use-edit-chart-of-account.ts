import { useMutation } from "@tanstack/react-query";
import { axiosInstance } from "@/lib";
import { API_URLS } from "@/constants/url-config";

const editChartOfAccount = async ({
  id,
  userId,
  accountCode,
  accountName,
  classification,
  type,
  detailType,
}: {
  id: string;
  userId: string;
  accountCode: string;
  accountName: string;
  classification: string;
  type: string;
  detailType?: string;
}) => {
  const { data } = await axiosInstance.put(
    `${API_URLS.CHART_OF_ACCOUNTS.EDIT_CHART_OF_ACCOUNT}/${id}`,
    {
      userId,
      accountCode,
      accountName,
      classification,
      type,
      detailType,
    }
  );
  return data;
};

export const useEditChartOfAccount = () => {
  return useMutation({
    mutationFn: editChartOfAccount,
  });
};
