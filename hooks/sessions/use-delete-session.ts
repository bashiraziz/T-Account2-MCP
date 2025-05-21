import { useMutation, useQueryClient } from "@tanstack/react-query";
import { axiosInstance } from "@/lib";
import { API_URLS } from "@/constants/url-config";

const deleteSession = async (sessionId: string) => {
  const { data } = await axiosInstance.delete(
    `${API_URLS.SESSIONS.DELETE_SESSION}/${sessionId}`
  );
  return data;
};

export const useDeleteSession = () => {
  return useMutation({
    mutationFn: deleteSession,
  });
};
