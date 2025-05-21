import { useMutation } from "@tanstack/react-query";
import { axiosInstance } from "@/lib";
import { API_URLS } from "@/constants";

interface FeedbackData {
  firstName: string;
  lastName: string;
  email: string;
  subject?: string;
  message: string;
}

const sendFeedback = async (data: FeedbackData) => {
  const response = await axiosInstance.post(
    API_URLS.FEEDBACK.SEND_FEEDBACK,
    data
  );
  return response.data;
};

export const useSendFeedback = () => {
  return useMutation({ mutationFn: sendFeedback });
};
