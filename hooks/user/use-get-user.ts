import { useQuery } from "@tanstack/react-query";
import { axiosInstance } from "@/lib";
import { API_URLS } from "@/constants";
import { UserType } from "@/types";
import { useSession } from "next-auth/react";

export const fetchUser = async (): Promise<UserType> => {
  const response = await axiosInstance.get(API_URLS.USER.GET_USER);
  return response.data;
};

export const useGetUser = () => {
  const { data: session } = useSession();

  return useQuery({
    queryKey: ["getUser"],
    queryFn: fetchUser,
    enabled: !!session?.user,
  });
};
