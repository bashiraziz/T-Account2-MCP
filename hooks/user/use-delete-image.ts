import { useMutation } from "@tanstack/react-query";
import { axiosInstance } from "@/lib";
import { API_URLS } from "@/constants";

const deleteImage = async (imageUrl: string) => {
  const response = await axiosInstance.delete(API_URLS.USER.DELETE_IMAGE, {
    data: { imageUrl },
  });
  return response.data;
};

export const useDeleteImage = () => {
  return useMutation({ mutationFn: deleteImage });
};
