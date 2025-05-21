import { useMutation } from "@tanstack/react-query";
import { axiosInstance } from "@/lib";
import { API_URLS } from "@/constants";

const sendVerificationCode = async (email: string) => {
  const response = await axiosInstance.post(
    API_URLS.AUTH.SEND_VERIFICATION_CODE,
    { email }
  );
  return response.data;
};

export const useSendVerificationCode = () => {
  return useMutation({ mutationFn: sendVerificationCode });
};
