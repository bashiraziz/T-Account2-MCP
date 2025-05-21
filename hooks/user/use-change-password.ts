import { useMutation } from "@tanstack/react-query";
import { axiosInstance } from "@/lib";
import { API_URLS } from "@/constants";

type ChangePasswordPayload = {
  currentPassword: string;
  newPassword: string;
};

export const changePassword = async (
  payload: ChangePasswordPayload
): Promise<{ success: boolean; message: string }> => {
  const response = await axiosInstance.put(
    API_URLS.USER.CHANGE_PASSWORD,
    payload
  );
  return response.data;
};

export const useChangePassword = () => {
  return useMutation({
    mutationFn: changePassword,
  });
};
