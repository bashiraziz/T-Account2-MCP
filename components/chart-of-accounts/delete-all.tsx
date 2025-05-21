import { useCOAStore, useUserStore } from "@/store";
import {
  PrimaryBtn,
  showErrorToast,
  showSuccessToast,
  WarningPopup,
} from "../common";
import { useDeleteAllChartOfAccounts } from "@/hooks";
import { useState } from "react";

export const DeleteAll = () => {
  const [isWarningModalOpen, setIsWarningModalOpen] = useState(false);

  const { user } = useUserStore();
  const { mutate: deleteAllCOAs, isPending } = useDeleteAllChartOfAccounts();
  const { deleteAllAccounts } = useCOAStore();

  const handleShowWarning = () => {
    setIsWarningModalOpen(true);
  };

  const handleDeleteAll = () => {
    const userId = user?.id ?? "";

    deleteAllCOAs(userId, {
      onSuccess: () => {
        deleteAllAccounts();
        showSuccessToast("Chart of Accounts Deleted successfully!");
        setIsWarningModalOpen(false);
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
      <div className="max-w-[680px] w-full flex items-center flex-wrap gap-3">
        <h4 className="text-primary text-lg font-medium">
          Delete all Chart of Accounts
        </h4>
        <PrimaryBtn
          onClick={handleShowWarning}
          text="Delete"
          className="bg-red-500 ml-auto"
        />
      </div>
      <WarningPopup
        isOpen={isWarningModalOpen}
        onClose={() => setIsWarningModalOpen(false)}
        handleConfirm={handleDeleteAll}
        isLoading={isPending}
        heading="Delete COA"
        description="This will permanently delete the Chart of Accounts and is irreversible."
        warningAlert="Unexpected bad things will happen."
      />
    </div>
  );
};
