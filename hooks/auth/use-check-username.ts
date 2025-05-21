import { useMutation } from "@tanstack/react-query";
import { axiosInstance } from "@/lib";
import { API_URLS } from "@/constants";

const checkUsername = async (username: string) => {
  const response = await axiosInstance.get(API_URLS.AUTH.CHECK_USERNAME, {
    params: { username },
  });
  return response.data;
};

export const useCheckUsername = () => {
  return useMutation({ mutationFn: checkUsername });
};
