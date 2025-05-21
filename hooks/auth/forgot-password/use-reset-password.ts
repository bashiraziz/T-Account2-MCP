// useResetPassword.ts
import { useMutation } from "@tanstack/react-query";
import { axiosInstance } from "@/lib";
import { API_URLS } from "@/constants";

interface ResetPasswordData {
  email: string;
  code: string;
  newPassword: string;
}

const resetPassword = async (data: ResetPasswordData) => {
  const response = await axiosInstance.patch(
    API_URLS.AUTH.FORGOT_PASSWORD.RESET_PASSWORD,
    data
  );
  return response.data;
};

export const useResetPassword = () => {
  return useMutation({ mutationFn: resetPassword });
};
