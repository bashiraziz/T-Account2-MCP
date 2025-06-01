import { useMutation } from "@tanstack/react-query";
import { axiosInstance } from "@/lib";
import { API_URLS } from "@/constants";

const markTourSeen = async (userId: string) => {
  const response = await axiosInstance.patch(API_URLS.USER.HAS_SEEN_TOUR, {
    userId,
  });
  return response.data;
};

export const useTourSeen = () => {
  return useMutation({
    mutationFn: markTourSeen,
  });
};
