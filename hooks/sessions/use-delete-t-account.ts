import { useMutation } from "@tanstack/react-query";
import { axiosInstance } from "@/lib";
import { API_URLS } from "@/constants";

const deleteTAccount = async (tAccountId: string) => {
  const { data } = await axiosInstance.delete(
    `${API_URLS.SESSIONS.DELETE_TACCOUNT}/${tAccountId}`
  );
  return data;
};

export const useDeleteTAccount = () => {
  return useMutation({
    mutationFn: deleteTAccount,
  });
};
