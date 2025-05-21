import { useMutation } from "@tanstack/react-query";
import { axiosInstance } from "@/lib";
import { API_URLS } from "@/constants";

type DeleteAccountPayload = {
  password: string;
};

export const deleteAccount = async (payload: DeleteAccountPayload) => {
  const response = await axiosInstance.delete(API_URLS.USER.DELETE_ACCOUNT, {
    data: payload,
  });
  return response.data;
};

export const useDeleteAccount = () => {
  return useMutation({
    mutationFn: deleteAccount,
  });
};
