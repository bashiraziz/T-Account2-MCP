import { useState } from "react";
import { useAddChartOfAccount } from "@/hooks";
import {
  LoadingSpinner,
  OutlinedInput,
  PrimaryBtn,
  showSuccessToast,
  showErrorToast,
} from "../common";
import { useCOAStore, useUserStore } from "@/store";

export const AddCoa = () => {
  const { user } = useUserStore();
  const [formData, setFormData] = useState({
    accountName: "",
    accountCode: "",
    classification: "",
    type: "",
    detailType: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [apiError, setApiError] = useState<string | null>(null);

  const { mutate: addCoa, isPending } = useAddChartOfAccount();
  const { addAccount } = useCOAStore();

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.accountName)
      newErrors.accountName = "Account name is required";
    if (!formData.accountCode)
      newErrors.accountCode = "Account code is required";
    if (!formData.classification)
      newErrors.classification = "Classification is required";
    if (!formData.type) newErrors.type = "Type is required";
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
          classification: "",
          type: "",
          detailType: "",
        });
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
    <div>
      <h4 className="text-primary text-lg font-medium mb-4">Add an Account</h4>
      <div className="max-w-[680px] w-full flex flex-wrap gap-3">
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
          containerClassName="w-full sm:w-[calc(50%-6px)]"
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
          containerClassName="w-full sm:w-[calc(50%-6px)]"
          className={`!py-3 ${
            errors.classification ? "outline outline-1 outline-red-500" : ""
          }`}
          label="Classification*"
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
          label="Type*"
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
          value={formData.detailType}
          onChange={handleChange}
        />
        <PrimaryBtn
          text={!isPending ? "Save" : ""}
          icon={
            isPending ? (
              <LoadingSpinner borderColor="border-white" className="mx-auto" />
            ) : undefined
          }
          className="w-[74px] bg-primary ml-auto mt-2"
          onClick={handleSubmit}
          disabled={isPending}
        />
      </div>
    </div>
  );
};
