"use client";
import { useState } from "react";
import {
  PrimaryBtn,
  SecondaryBtn,
  LoadingSpinner,
  showErrorToast,
  showSuccessToast,
  OutlinedInput,
} from "@/components";
import { PopupModal } from "./popup-modal";
import { useAddChartOfAccount } from "@/hooks";
import { useAddAccountPopupStore, useCOAStore, useUserStore } from "@/store";

export const AddAccountPopup = () => {
  const { user } = useUserStore();
  const { isAddAccountOpen, closeAddAccount } = useAddAccountPopupStore();

  const [formData, setFormData] = useState({
    accountName: "",
    accountCode: "",
    userDefined1: "",
    userDefined2: "",
    userDefined3: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const { mutate: addCoa, isPending } = useAddChartOfAccount();
  const { addAccount } = useCOAStore();

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.accountName)
      newErrors.accountName = "Account name is required";
    if (!formData.accountCode)
      newErrors.accountCode = "Account code is required";
    return newErrors;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors((prevErrors) => ({ ...prevErrors, [e.target.name]: "" }));
  };

  const handleSubmit = () => {
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    const data = {
      ...formData,
      userId: user?.id ?? "",
    };
    addCoa(data, {
      onSuccess: () => {
        addAccount(data);
        showSuccessToast("Chart of Account added successfully!");
        setFormData({
          accountName: "",
          accountCode: "",
          userDefined1: "",
          userDefined2: "",
          userDefined3: "",
        });
        closeAddAccount();
      },
      onError: (error: any) => {
        const errorMessage =
          error.response?.data?.error ||
          "Failed to add Chart of Account. Please try again.";
        showErrorToast(errorMessage);
      },
    });
  };

  return (
    <PopupModal
      isOpen={isAddAccountOpen}
      onClose={closeAddAccount}
      className="max-w-[400px] py-6"
    >
      <h4 className="text-2xl font-semibold text-center">Add an Account</h4>
      <div className="flex flex-col gap-3 mt-5">
        <div className="w-full flex flex-wrap gap-3">
          <OutlinedInput
            containerClassName="w-full"
            className={`!py-3 ${
              errors.accountCode ? "outline outline-1 outline-red-500" : ""
            }`}
            label="Account Code*"
            placeholder="e.g. 10003"
            error={errors.accountCode}
            name="accountCode"
            value={formData.accountCode}
            onChange={handleChange}
          />
          <OutlinedInput
            containerClassName="w-full"
            className={`!py-3 ${
              errors.accountName ? "outline outline-1 outline-red-500" : ""
            }`}
            label="Account Name*"
            placeholder="e.g. Savings Account"
            error={errors.accountName}
            name="accountName"
            value={formData.accountName}
            onChange={handleChange}
          />
          <OutlinedInput
            containerClassName="w-full"
            className={`!py-3`}
            label="User Defined 1"
            placeholder="e.g. Asset"
            name="userDefined1"
            value={formData.userDefined1}
            onChange={handleChange}
          />
          <OutlinedInput
            containerClassName="w-full"
            className={`!py-3`}
            label="User Defined 2"
            placeholder="e.g. Cash"
            name="userDefined2"
            value={formData.userDefined2}
            onChange={handleChange}
          />
          <OutlinedInput
            containerClassName="w-full"
            className={`!py-3`}
            label="User Defined 3"
            placeholder="e.g. Bank Account - Savings"
            name="userDefined3"
            value={formData.userDefined3}
            onChange={handleChange}
          />

          <div className="w-full flex justify-between items-center gap-3 mt-4">
            <SecondaryBtn
              onClick={closeAddAccount}
              text="Cancel"
              className="w-full justify-center border-gray-500"
            />
            <PrimaryBtn
              text={!isPending ? "Add" : ""}
              icon={
                isPending ? (
                  <LoadingSpinner
                    borderColor="border-white"
                    className="mx-auto"
                  />
                ) : undefined
              }
              className="w-full bg-primary border border-primary"
              onClick={handleSubmit}
              disabled={isPending}
            />
          </div>
        </div>
      </div>
    </PopupModal>
  );
};
