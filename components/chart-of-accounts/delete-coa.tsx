import { useState } from "react";
import {
  LoadingSpinner,
  PrimaryBtn,
  showErrorToast,
  showSuccessToast,
} from "../common";
import { ChartOfAccountsType } from "@/types";
import { SelectAccount } from "./select-coa";
import { useDeleteChartOfAccount } from "@/hooks";
import { useCOAStore } from "@/store";

export const DeleteCoa = () => {
  const [selectedAccount, setSelectedAccount] =
    useState<ChartOfAccountsType | null>(null);

  const { mutate: deleteCoa, isPending } = useDeleteChartOfAccount();
  const { deleteAccount } = useCOAStore();

  const handleDelete = () => {
    if (!selectedAccount?.id) return;

    const Id = selectedAccount.id ?? "";

    deleteCoa(Id, {
      onSuccess: () => {
        deleteAccount(Id);
        showSuccessToast("Chart of Account deleted successfully!");
        setSelectedAccount(null);
      },
      onError: (error: any) => {
        showErrorToast(error.response?.data?.error || "Failed to delete COA.");
      },
    });
  };

  return (
    <div>
      <h4 className="text-primary text-lg font-medium mb-4">
        Delete an Account
      </h4>
      <div className="max-w-[680px] w-full flex flex-wrap gap-3">
        <SelectAccount
          label="Select account"
          selectedAccount={selectedAccount}
          setSelectedAccount={setSelectedAccount}
          className="w-full"
        />
        {selectedAccount && (
          <PrimaryBtn
            onClick={handleDelete}
            text={!isPending ? "Delete" : ""}
            icon={
              isPending ? (
                <LoadingSpinner
                  borderColor="border-white"
                  className="mx-auto"
                />
              ) : undefined
            }
            className="w-[84px] bg-red-500 ml-auto mt-2"
          />
        )}
      </div>
    </div>
  );
};
