import { useMutation } from "@tanstack/react-query";
import { axiosInstance } from "@/lib";
import { API_URLS } from "@/constants";
import { SignupData } from "@/types";

const signupUser = async (data: SignupData) => {
  const response = await axiosInstance.post(API_URLS.AUTH.SIGNUP, data);
  return response.data;
};

export const useSignup = () => {
  return useMutation({ mutationFn: signupUser });
};
