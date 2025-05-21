import { useUploadChartOfAccounts } from "@/hooks";
import { UploadCoa } from "./upload-coa";
import { useUserStore } from "@/store";
import { showSuccessToast, showErrorToast } from "../common";

export const UpdateCoa = () => {
  const { user } = useUserStore();
  const uploadMutation = useUploadChartOfAccounts();

  const handleUpload = (file: File, onSuccess: () => void) => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("userId", user?.id ?? "");

    uploadMutation.mutate(formData, {
      onSuccess: () => {
        showSuccessToast("Chart of Accounts Uploaded successfully!");
        onSuccess(); // Reset selected file after successful upload
      },
      onError: (error: any) => {
        const errorMessage =
          error.response?.data?.error ||
          "Failed to Upload Chart of Accounts. Please try again.";
        showErrorToast(errorMessage);
      },
    });
  };

  return (
    <div>
      <h4 className="text-primary text-lg font-medium mb-4">Add Chart of Accounts</h4>
      <UploadCoa onUpload={handleUpload} isLoading={uploadMutation.isPending} />
    </div>
  );
};
