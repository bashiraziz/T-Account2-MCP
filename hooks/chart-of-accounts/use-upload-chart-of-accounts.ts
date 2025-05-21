import { useMutation } from "@tanstack/react-query";
import { axiosInstance } from "@/lib";
import { API_URLS } from "@/constants";

const uploadChartOfAccounts = async (formData: FormData) => {
  const { data } = await axiosInstance.post(
    API_URLS.CHART_OF_ACCOUNTS.UPLOAD_CHART_OF_ACCOUNTS,
    formData,
    {
      headers: { "Content-Type": "multipart/form-data" },
    }
  );
  return data;
};

export const useUploadChartOfAccounts = () => {
  return useMutation({
    mutationFn: uploadChartOfAccounts,
  });
};
