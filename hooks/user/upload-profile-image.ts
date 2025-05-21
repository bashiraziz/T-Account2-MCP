import { useMutation } from "@tanstack/react-query";
import { axiosInstance } from "@/lib";
import { API_URLS } from "@/constants";

const uploadImage = async (file: File) => {
  const formData = new FormData();
  formData.append("file", file);

  const response = await axiosInstance.post(
    API_URLS.USER.UPLOAD_PROFILE_IMAGE,
    formData,
    {
      headers: { "Content-Type": "multipart/form-data" },
    }
  );

  return response.data.url;
};

export const useUploadImage = () => {
  return useMutation({ mutationFn: uploadImage });
};
