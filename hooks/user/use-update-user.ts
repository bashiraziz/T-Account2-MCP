import { useMutation } from "@tanstack/react-query";
import { axiosInstance } from "@/lib";
import { API_URLS } from "@/constants";

const updateUser = async (userData: {
  firstName: string;
  lastName: string;
  username: string;
  phoneNumber?: string;
  profileImage?: string;
}) => {
  const response = await axiosInstance.put(API_URLS.USER.UPDATE_USER, userData);
  return response.data;
};

export const useUpdateUser = () => {
  return useMutation({ mutationFn: updateUser });
};
