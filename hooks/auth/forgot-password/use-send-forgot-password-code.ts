import { useMutation } from "@tanstack/react-query";
import { axiosInstance } from "@/lib";
import { API_URLS } from "@/constants";

const sendForgotPasswordCode = async (email: string) => {
  const response = await axiosInstance.post(
    API_URLS.AUTH.FORGOT_PASSWORD.SEND_VERIFICATION_CODE,
    { email }
  );
  return response.data;
};

export const useSendForgotPasswordCode = () => {
  return useMutation({ mutationFn: sendForgotPasswordCode });
};
