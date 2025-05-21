import { useMutation } from "@tanstack/react-query";
import { axiosInstance } from "@/lib";
import { API_URLS } from "@/constants";

const verifyCode = async ({ email, code }: { email: string; code: string }) => {
  const response = await axiosInstance.post(API_URLS.AUTH.VERIFY_CODE, {
    email,
    code,
  });
  return response.data;
};

export const useVerifyCode = () => {
  return useMutation({ mutationFn: verifyCode });
};
