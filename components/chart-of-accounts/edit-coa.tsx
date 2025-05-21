import { useState, useEffect } from "react";
import { useEditChartOfAccount } from "@/hooks";
import {
  LoadingSpinner,
  OutlinedInput,
  PrimaryBtn,
  showSuccessToast,
  showErrorToast,
} from "../common";
import { useCOAStore, useUserStore } from "@/store";
import { ChartOfAccountsType } from "@/types";
import { SelectAccount } from "./select-coa";

export const EditCoa = () => {
  const { user } = useUserStore();
  const [selectedAccount, setSelectedAccount] =
    useState<ChartOfAccountsType | null>(null);
  const [formData, setFormData] = useState<ChartOfAccountsType | null>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const { mutate: editCoa, isPending } = useEditChartOfAccount();
  const { editAccount } = useCOAStore();

  useEffect(() => {
    if (selectedAccount) {
      setFormData(selectedAccount);
      setErrors({});
    }
  }, [selectedAccount]);

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    if (!formData?.accountName)
      newErrors.accountName = "Account name is required";
    if (!formData?.accountCode)
      newErrors.accountCode = "Account code is required";
    if (!formData?.classification)
      newErrors.classification = "Classification is required";
    if (!formData?.type) newErrors.type = "Type is required";
    return newErrors;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!formData) return;
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors((prevErrors) => ({ ...prevErrors, [e.target.name]: "" }));
  };

  const handleSubmit = () => {
    if (!formData?.id) return;

    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    const payload = {
      userId: user?.id ?? "",
      ...formData,
      id: formData?.id ?? "",
      detailType: formData.detailType || undefined,
    };

    editCoa(payload, {
      onSuccess: () => {
        editAccount(payload);
        showSuccessToast("Chart of Account updated successfully!");
        setSelectedAccount(null);
        setFormData(null);
      },
      onError: (error: any) => {
        showErrorToast(
          error.response?.data?.error ||
            "Failed to update COA. Please try again."
        );
      },
    });
  };

  return (
    <div>
      <h4 className="text-primary text-lg font-medium mb-4">Edit an Account</h4>
      <div className="max-w-[680px] w-full flex flex-wrap gap-3">
        <SelectAccount
          label="Select account"
          selectedAccount={selectedAccount}
          setSelectedAccount={setSelectedAccount}
          className="w-full"
        />
        {selectedAccount && formData && (
          <>
            <OutlinedInput
              containerClassName="w-full"
              className={`!py-3 ${
                errors.accountName ? "outline outline-1 outline-red-500" : ""
              }`}
              label="Account Name"
              placeholder="e.g. Savings Account"
              error={errors.accountName}
              name="accountName"
              value={formData.accountName}
              onChange={handleChange}
            />
            <OutlinedInput
              containerClassName="w-full sm:w-[calc(50%-6px)]"
              className={`!py-3 ${
                errors.accountCode ? "outline outline-1 outline-red-500" : ""
              }`}
              label="Account Code"
              placeholder="e.g. 10003"
              error={errors.accountCode}
              name="accountCode"
              value={formData.accountCode}
              onChange={handleChange}
            />
            <OutlinedInput
              containerClassName="w-full sm:w-[calc(50%-6px)]"
              className={`!py-3 ${
                errors.classification ? "outline outline-1 outline-red-500" : ""
              }`}
              label="Classification"
              placeholder="e.g. Asset"
              error={errors.classification}
              name="classification"
              value={formData.classification}
              onChange={handleChange}
            />
            <OutlinedInput
              containerClassName="w-full sm:w-[calc(50%-6px)]"
              className={`!py-3 ${
                errors.type ? "outline outline-1 outline-red-500" : ""
              }`}
              label="Type"
              placeholder="e.g. Cash"
              error={errors.type}
              name="type"
              value={formData.type}
              onChange={handleChange}
            />
            <OutlinedInput
              containerClassName="w-full sm:w-[calc(50%-6px)]"
              className={`!py-3`}
              label="Detail Type"
              placeholder="e.g. Bank Account - Savings"
              name="detailType"
              value={formData.detailType || ""}
              onChange={handleChange}
            />
            <PrimaryBtn
              text={!isPending ? "Save" : ""}
              icon={
                isPending ? (
                  <LoadingSpinner
                    borderColor="border-white"
                    className="mx-auto"
                  />
                ) : undefined
              }
              className="w-[74px] bg-primary ml-auto mt-2"
              onClick={handleSubmit}
              disabled={isPending}
            />
          </>
        )}
      </div>
    </div>
  );
};
