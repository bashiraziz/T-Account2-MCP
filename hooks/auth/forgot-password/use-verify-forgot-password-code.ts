import { useMutation } from "@tanstack/react-query";
import { axiosInstance } from "@/lib";
import { API_URLS } from "@/constants";

const verifyForgotPasswordCode = async ({
  email,
  code,
}: {
  email: string;
  code: string;
}) => {
  const response = await axiosInstance.post(
    API_URLS.AUTH.FORGOT_PASSWORD.VERIFY_CODE,
    { email, code }
  );
  return response.data;
};

export const useVerifyForgotPasswordCode = () => {
  return useMutation({ mutationFn: verifyForgotPasswordCode });
};
